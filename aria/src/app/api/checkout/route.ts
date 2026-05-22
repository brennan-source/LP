import { NextRequest, NextResponse } from "next/server";
import { stripe, ASSESSMENT_PRICE_CENTS } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { buildReport } from "@/lib/assess";
import { sendAriaReportEmail } from "@/lib/email";
import { QuizAnswers, ScanResults } from "@/types/assessment";

const COUPON_CODE = process.env.ARIA_COUPON_CODE || "LEADPULSE";
const COUPON_DISCOUNT_CENTS = parseInt(process.env.ARIA_COUPON_DISCOUNT_CENTS || "300");
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export async function POST(req: NextRequest) {
  try {
    const { assessmentId, coupon } = await req.json();
    const a = await prisma.assessment.findUnique({ where: { id: assessmentId } });
    if (!a) return NextResponse.json({ error: "Assessment not found" }, { status: 404 });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
    const isCoupon = coupon?.toUpperCase() === COUPON_CODE.toUpperCase();
    const finalPrice = isCoupon
      ? ASSESSMENT_PRICE_CENTS - COUPON_DISCOUNT_CENTS
      : ASSESSMENT_PRICE_CENTS;

    // Demo/dev mode: skip Stripe, generate report directly
    if (DEMO_MODE) {
      await prisma.assessment.update({ where: { id: assessmentId }, data: { paid: true } });
      generateReportAsync(a);
      return NextResponse.json({ url: `${appUrl}/report/${assessmentId}?demo=1` });
    }

    const description = isCoupon
      ? `AI Readiness Assessment — LeadPulse member price ($${(finalPrice / 100).toFixed(0)})`
      : "Aria AI Readiness Assessment — full report with savings estimates and custom roadmap";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: finalPrice,
            product_data: {
              name: "Aria AI Readiness Assessment",
              description,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: a.email,
      success_url: `${appUrl}/report/${assessmentId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/assess?cancelled=true`,
      metadata: { assessmentId },
    });

    await prisma.assessment.update({
      where: { id: assessmentId },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}

async function generateReportAsync(a: {
  id: string; businessName: string; websiteUrl: string;
  industry: string; city: string; state: string; email: string;
  quizAnswers: string | null; scanResults: string | null;
}) {
  try {
    const quiz: QuizAnswers = a.quizAnswers ? JSON.parse(a.quizAnswers) : {};
    const scan: ScanResults = a.scanResults ? JSON.parse(a.scanResults) : {};
    const report = await buildReport(
      a.id, a.businessName, a.websiteUrl,
      a.industry, a.city, a.state, quiz, scan
    );
    await prisma.assessment.update({
      where: { id: a.id },
      data: { report: JSON.stringify(report), status: "complete" },
    });
    await sendAriaReportEmail(a.email, report);
  } catch (error) {
    console.error("Report generation failed:", error);
  }
}
