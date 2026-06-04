import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { contactId, outcome } = body as { contactId: string; outcome?: string };

    if (!contactId) {
      return NextResponse.json({ error: "contactId is required" }, { status: 400 });
    }

    const campaign = await prisma.campaign.findUnique({ where: { id } });
    if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

    const activityType = campaign.type === "call" ? "call" : "linkedin";
    const description =
      campaign.type === "call"
        ? `Called via campaign: ${campaign.name}${outcome ? ` — ${outcome}` : ""}`
        : `LinkedIn message sent via campaign: ${campaign.name}`;

    await prisma.contact.update({
      where: { id: contactId },
      data: { stage: "contacted" },
    });

    await prisma.activity.create({
      data: {
        contactId,
        type: activityType,
        description,
        metadata: JSON.stringify({ campaignId: id, outcome: outcome ?? null }),
      },
    });

    await prisma.campaign.update({
      where: { id },
      data: { sentCount: { increment: 1 }, status: "sent" },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
