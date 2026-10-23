import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "brennan@gomakr.ai";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
