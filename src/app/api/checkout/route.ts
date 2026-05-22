import { NextRequest, NextResponse } from "next/server";
import { stripe, AUDIT_PRICE_CENTS } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { runAudit } from "@/lib/audit";
import { sendReportEmail } from "@/lib/email";
import { normalizeUrl } from "@/lib/utils";

export async function POST(req: NextRequest) {
  // Read at request time so Vercel env vars are always current
  const demoMode = process.env.DEMO_MODE === "true";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const body = await req.json();
    const { businessName, websiteUrl, phoneNumber, industry, city, state, email } = body;

    if (!businessName || !websiteUrl || !industry || !city || !state || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const job = await prisma.auditJob.create({
      data: {
        businessName,
        websiteUrl: normalizeUrl(websiteUrl),
        phoneNumber: phoneNumber || null,
        industry,
        city,
        state,
        email,
        status: "pending",
      },
    });

    // Demo mode: skip Stripe, run audit directly
    if (demoMode) {
      await prisma.auditJob.update({
        where: { id: job.id },
        data: { paid: true, status: "running" },
      });
      runAuditAsync({ ...job, websiteUrl: normalizeUrl(websiteUrl) });
      return NextResponse.json({ url: `${appUrl}/report/${job.id}?demo=1`, jobId: job.id });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: AUDIT_PRICE_CENTS,
            product_data: {
              name: "LeadPulse Business Audit",
              description: `Complete lead generation audit for ${businessName} — scored against local competitors with a full action plan.`,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      success_url: `${appUrl}/report/${job.id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/audit?cancelled=true`,
      metadata: { jobId: job.id },
    });

    await prisma.auditJob.update({
      where: { id: job.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url, jobId: job.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Checkout error:", message);
    // Return real error message so it's visible in the UI during development/testing
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function runAuditAsync(job: {
  id: string; businessName: string; websiteUrl: string;
  phoneNumber: string | null; industry: string;
  city: string; state: string; email: string;
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
      data: { status: "complete", results: JSON.stringify(results) },
    });
    await sendReportEmail(job.email, results);
  } catch (error) {
    console.error("Demo audit failed:", error instanceof Error ? error.message : error);
    await prisma.auditJob.update({ where: { id: job.id }, data: { status: "failed" } });
  }
}
