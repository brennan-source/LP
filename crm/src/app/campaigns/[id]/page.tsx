import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import CampaignDetailClient from "./CampaignDetailClient";

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaign = await prisma.campaign.findUnique({ where: { id } });
  if (!campaign) notFound();

  const totalEligible = await prisma.contact.count({
    where: {
      stage: { in: ["prospect"] },
      NOT: { email: { endsWith: "@scrape.local" } },
    },
  });

  return <CampaignDetailClient campaign={campaign} totalEligible={totalEligible} />;
}
