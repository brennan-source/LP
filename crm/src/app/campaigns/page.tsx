import { prisma } from "@/lib/db";
import Sidebar from "@/components/Sidebar";
import CampaignsClient from "./CampaignsClient";

export const dynamic = "force-dynamic";

export default async function CampaignsPage() {
  const [total, campaigns] = await Promise.all([
    prisma.contact.count(),
    prisma.campaign.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="flex h-screen">
      <Sidebar contactCount={total} />
      <main className="flex-1 overflow-auto">
        <CampaignsClient campaigns={JSON.parse(JSON.stringify(campaigns))} />
      </main>
    </div>
  );
}
