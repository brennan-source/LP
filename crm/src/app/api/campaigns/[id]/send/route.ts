import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail, renderTemplate } from "@/lib/email";

type Params = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const stages: string[] = body.stages ?? ["prospect"];
    const industries: string[] = body.industries ?? [];
    const limit: number = body.limit ?? 50;

    const campaign = await prisma.campaign.findUnique({ where: { id } });
    if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

    const where: Record<string, unknown> = {
      stage: { in: stages },
      NOT: { email: { endsWith: "@scrape.local" } },
    };
    if (industries.length > 0) where.industry = { in: industries };

    const contacts = await prisma.contact.findMany({
      where,
      take: limit,
      orderBy: { createdAt: "asc" },
    });

    const crmUrl = process.env.NEXT_PUBLIC_CRM_URL ?? "";
    let sent = 0;
    const errors: string[] = [];

    for (const contact of contacts) {
      try {
        const unsubscribeUrl = `${crmUrl}/api/unsubscribe?email=${encodeURIComponent(contact.email)}`;
        const renderedSubject = renderTemplate(campaign.subject, contact, { unsubscribeUrl });
        const renderedBody = renderTemplate(campaign.body, contact, { unsubscribeUrl });

        await sendEmail({ to: contact.email, subject: renderedSubject, text: renderedBody });

        await prisma.contact.update({ where: { id: contact.id }, data: { stage: "contacted" } });
        await prisma.activity.create({
          data: {
            contactId: contact.id,
            type: "email",
            description: `Sent campaign: ${campaign.name}`,
            metadata: JSON.stringify({ campaignId: id, subject: renderedSubject }),
          },
        });

        sent++;
        // Stay within Resend's 2 req/s free tier limit
        await new Promise((r) => setTimeout(r, 600));
      } catch (err) {
        errors.push(`${contact.email}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    await prisma.campaign.update({
      where: { id },
      data: { sentCount: { increment: sent }, status: "sent" },
    });

    return NextResponse.json({ sent, errors, total: contacts.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
