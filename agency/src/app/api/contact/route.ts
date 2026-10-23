import { NextRequest, NextResponse } from "next/server";
import { EMAIL_RE, sendLeadEmail } from "@/lib/leads";

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
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    await sendLeadEmail(
      `New Growth Gap Review request: ${businessName} (${industry})`,
      [
        `Name: ${name}`,
        `Business: ${businessName}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Industry: ${industry}`,
        body.serviceCategory && `Business type: ${body.serviceCategory}`,
        body.revenue && `Annual revenue: ${body.revenue}`,
        body.focus && `Wants help first with: ${body.focus}`,
        body.website && `Website: ${body.website}`,
        body.message && `Message: ${body.message}`,
      ],
      email
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send. Please email brennan@gomakr.ai directly." },
      { status: 500 }
    );
  }
}
