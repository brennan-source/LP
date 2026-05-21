import { NextRequest, NextResponse } from "next/server";
import { stripe, AUDIT_PRICE_CENTS } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { normalizeUrl } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessName, websiteUrl, phoneNumber, industry, city, state, email } = body;

    if (!businessName || !websiteUrl || !industry || !city || !state || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create the audit job record first
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

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create Stripe checkout session
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
              images: [],
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      success_url: `${appUrl}/report/${job.id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/audit?cancelled=true`,
      metadata: {
        jobId: job.id,
      },
    });

    // Update job with session ID
    await prisma.auditJob.update({
      where: { id: job.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url, jobId: job.id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
