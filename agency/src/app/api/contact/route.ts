import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_EMAIL ?? "brennan@gomakr.ai";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json() as {
      name?: string;
      businessName?: string;
      phone?: string;
      city?: string;
      industry?: string;
      website?: string;
      message?: string;
    };

    if (!body.name || !body.businessName || !body.phone || !body.city || !body.industry) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Makr Website <noreply@gomakr.ai>",
      to: [TO_EMAIL],
      subject: `New lead: ${body.businessName} (${body.industry}, ${body.city})`,
      text: `
New lead from gomakr.ai

Name: ${body.name}
Business: ${body.businessName}
Phone: ${body.phone}
City: ${body.city}
Industry: ${body.industry}
Website: ${body.website || "none"}

Message:
${body.message || "(none)"}
      `.trim(),
    });

    return Response.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
