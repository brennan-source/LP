import { prisma } from "@/lib/db";
import Sidebar from "@/components/Sidebar";
import PipelineClient from "./PipelineClient";

export const dynamic = "force-dynamic";

export default async function PipelinePage() {
  const total = await prisma.contact.count();

  return (
    <div className="flex h-screen">
      <Sidebar contactCount={total} />
      <main className="flex-1 overflow-auto">
        <PipelineClient />
      </main>
    </div>
  );
}
