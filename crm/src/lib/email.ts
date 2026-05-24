const RESEND_API_KEY = () => process.env.RESEND_API_KEY;
const FROM_EMAIL = () => process.env.CRM_FROM_EMAIL ?? "outreach@leadpulse.ai";

export interface EmailContact {
  email: string;
  firstName?: string | null;
  businessName?: string | null;
  city?: string | null;
  industry?: string | null;
}

export function renderTemplate(template: string, contact: EmailContact, extra: Record<string, string> = {}): string {
  const vars: Record<string, string> = {
    firstName: contact.firstName ?? "there",
    businessName: contact.businessName ?? "your business",
    city: contact.city ?? "your area",
    industry: contact.industry ?? "your industry",
    ...extra,
  };
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`);
}

export async function sendEmail({
  to,
  subject,
  text,
  fromName = "Brennan",
}: {
  to: string;
  subject: string;
  text: string;
  fromName?: string;
}): Promise<{ id: string }> {
  const key = RESEND_API_KEY();
  if (!key) throw new Error("RESEND_API_KEY is not set");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${fromName} <${FROM_EMAIL()}>`,
      to,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error ${res.status}: ${err}`);
  }

  return res.json() as Promise<{ id: string }>;
}
