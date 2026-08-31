import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "brennan@gomakr.ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, businessName, phone, email, industry } = body;

    if (!name || !businessName || !phone || !email || !industry) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const optionalFields = [
      body.serviceCategory && `Service category: ${body.serviceCategory}`,
      body.revenue && `Annual revenue: ${body.revenue}`,
      body.website && `Website: ${body.website}`,
      body.message && `Message: ${body.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    await resend.emails.send({
      from: "noreply@gomakr.ai",
      to: CONTACT_EMAIL,
      subject: `New assessment request: ${businessName} (${industry})`,
      text: [
        `Name: ${name}`,
        `Business: ${businessName}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Industry: ${industry}`,
        optionalFields,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send. Please email brennan@gomakr.ai directly." },
      { status: 500 }
    );
  }
}
