import { Resend } from "resend";
import { cleanAttribution } from "@/lib/attribution";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "brennan@gomakr.ai";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// "Lead source" lines for the notification email, from the submitted payload.
export function sourceLines(body: Record<string, unknown>): string[] {
  const a = cleanAttribution(body);
  return [
    "--- Lead source ---",
    `UTM source: ${a.utmSource ?? "(none)"}`,
    `UTM medium: ${a.utmMedium ?? "(none)"}`,
    `UTM campaign: ${a.utmCampaign ?? "(none)"}`,
    `Landing page: ${a.landingPage ?? "(unknown)"}`,
    `Referrer: ${a.referrer ?? "(none or direct)"}`,
  ];
}

// Emails a lead notification to the team. Without RESEND_API_KEY it logs the
// lead in development and fails in production, so leads are never silently lost.
export async function sendLeadEmail(subject: string, lines: (string | false | undefined)[], replyTo?: string) {
  const text = lines.filter(Boolean).join("\n");
  if (!resend) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[lead] ${subject}\n${text}`);
      return;
    }
    throw new Error("RESEND_API_KEY is not set");
  }
  const { error } = await resend.emails.send({
    from: "noreply@gomakr.ai",
    to: CONTACT_EMAIL,
    subject,
    text,
    replyTo,
  });
  if (error) throw new Error(error.message);
}
