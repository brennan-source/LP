import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { runAudit } from "@/lib/audit";
import { sendReportEmail } from "@/lib/email";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const jobId = session.metadata?.jobId;

    if (!jobId) {
      return NextResponse.json({ error: "No jobId in metadata" }, { status: 400 });
    }

    const job = await prisma.auditJob.findUnique({ where: { id: jobId } });
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Mark as paid and start running
    await prisma.auditJob.update({
      where: { id: jobId },
      data: { paid: true, status: "running" },
    });

    // Run audit asynchronously (fire and forget, update DB when done)
    runAuditAsync(job);
  }

  return NextResponse.json({ received: true });
}

async function runAuditAsync(job: {
  id: string;
  businessName: string;
  websiteUrl: string;
  phoneNumber: string | null;
  industry: string;
  city: string;
  state: string;
  email: string;
}) {
  try {
    const results = await runAudit(job.id, {
      businessName: job.businessName,
      websiteUrl: job.websiteUrl,
      phoneNumber: job.phoneNumber || undefined,
      industry: job.industry,
      city: job.city,
      state: job.state,
      email: job.email,
    });

    await prisma.auditJob.update({
      where: { id: job.id },
      data: {
        status: "complete",
        results: JSON.stringify(results),
      },
    });

    await sendReportEmail(job.email, results);
  } catch (error) {
    console.error(`Audit failed for job ${job.id}:`, error);
    await prisma.auditJob.update({
      where: { id: job.id },
      data: { status: "failed" },
    });
  }
}
