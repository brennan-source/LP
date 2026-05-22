import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { buildReport } from "@/lib/assess";
import { QuizAnswers, ScanResults } from "@/types/assessment";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET)
    return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const assessmentId = session.metadata?.assessmentId;
    if (!assessmentId) return NextResponse.json({ error: "No assessmentId" }, { status: 400 });

    const a = await prisma.assessment.findUnique({ where: { id: assessmentId } });
    if (!a) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.assessment.update({ where: { id: assessmentId }, data: { paid: true } });
    generateReportAsync(a);
  }

  return NextResponse.json({ received: true });
}

async function generateReportAsync(a: {
  id: string; businessName: string; websiteUrl: string;
  industry: string; city: string; state: string;
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
  } catch (error) {
    console.error("Report generation failed:", error);
    await prisma.assessment.update({ where: { id: a.id }, data: { status: "failed" } });
  }
}
