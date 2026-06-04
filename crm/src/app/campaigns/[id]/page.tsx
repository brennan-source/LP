import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import CampaignDetailClient from "./CampaignDetailClient";
import type { Campaign, CampaignType } from "@/types/crm";

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const raw = await prisma.campaign.findUnique({ where: { id } });
  if (!raw) notFound();

  const campaign: Campaign = {
    ...raw,
    type: (raw.type || "email") as CampaignType,
    createdAt: raw.createdAt.toISOString(),
    updatedAt: raw.updatedAt.toISOString(),
  };

  let totalEligible = 0;
  if (campaign.type === "email") {
    totalEligible = await prisma.contact.count({
      where: {
        stage: { in: ["prospect"] },
        NOT: { email: { endsWith: "@scrape.local" } },
      },
    });
  }

  return <CampaignDetailClient campaign={campaign} totalEligible={totalEligible} />;
}
