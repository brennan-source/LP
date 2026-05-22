import { NextRequest, NextResponse } from "next/server";
import { stripe, ASSESSMENT_PRICE_CENTS } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { assessmentId, coupon } = await req.json();
    const a = await prisma.assessment.findUnique({ where: { id: assessmentId } });
    if (!a) return NextResponse.json({ error: "Assessment not found" }, { status: 404 });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

    // Bundle discount: if coupon = "LEADPULSE", apply 25% off
    const isBundleDiscount = coupon?.toUpperCase() === "LEADPULSE";
    const finalPrice = isBundleDiscount
      ? Math.round(ASSESSMENT_PRICE_CENTS * 0.75)
      : ASSESSMENT_PRICE_CENTS;

    const description = isBundleDiscount
      ? "AI Readiness Assessment — Bundle discount with LeadPulse (25% off)"
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
      cancel_url: `${appUrl}/assess/${assessmentId}?cancelled=true`,
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
