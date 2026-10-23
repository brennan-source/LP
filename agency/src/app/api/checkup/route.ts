import { NextRequest, NextResponse } from "next/server";
import { EMAIL_RE, sendLeadEmail } from "@/lib/leads";

const MEETING_LABELS: Record<string, string> = {
  "mash-up": "At the Mash-Up (Gillette Stadium, Oct 27)",
  "after-event": "After the event (remote review)",
};

// Manufacturing Growth Checkup requests from /manufacturing-growth-checkup.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, website, challenge, meeting, consent } = body;

    if (!name || !company || !email || !website || !challenge || !MEETING_LABELS[meeting]) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (consent !== true) {
      return NextResponse.json({ error: "Please confirm we may contact you." }, { status: 400 });
    }

    await sendLeadEmail(
      `Manufacturing Growth Checkup: ${company}`,
      [
        `Name: ${name}`,
        `Company: ${company}`,
        `Email: ${email}`,
        `Website: ${website}`,
        `Primary challenge: ${challenge}`,
        `Meeting preference: ${MEETING_LABELS[meeting]}`,
        `Consent to contact: yes`,
        `Source: /manufacturing-growth-checkup`,
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
