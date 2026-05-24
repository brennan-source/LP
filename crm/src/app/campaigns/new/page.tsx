import { prisma } from "@/lib/db";
import Sidebar from "@/components/Sidebar";
import NewCampaignClient from "./NewCampaignClient";

export const dynamic = "force-dynamic";

export default async function NewCampaignPage() {
  const total = await prisma.contact.count();

  return (
    <div className="flex h-screen">
      <Sidebar contactCount={total} />
      <main className="flex-1 overflow-auto">
        <NewCampaignClient />
      </main>
    </div>
  );
}
