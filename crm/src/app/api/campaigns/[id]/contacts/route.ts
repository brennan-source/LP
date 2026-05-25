import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { renderTemplate } from "@/lib/email";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const { searchParams } = req.nextUrl;
    const stages = searchParams.getAll("stages");
    const industries = searchParams.getAll("industries");
    const limit = parseInt(searchParams.get("limit") ?? "50", 10);

    const campaign = await prisma.campaign.findUnique({ where: { id } });
    if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

    const where: Record<string, unknown> = {
      stage: { in: stages.length > 0 ? stages : ["prospect"] },
    };
    if (industries.length > 0) where.industry = { in: industries };

    if (campaign.type === "linkedin") {
      where.linkedinUrl = { not: null };
    } else if (campaign.type === "call") {
      where.phone = { not: null };
    }

    const contacts = await prisma.contact.findMany({
      where,
      take: limit,
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        businessName: true,
        industry: true,
        city: true,
        state: true,
        linkedinUrl: true,
      },
    });

    const rendered = contacts.map((c) => ({
      ...c,
      renderedMessage: renderTemplate(campaign.body, c),
    }));

    return NextResponse.json({ contacts: rendered, total: rendered.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
