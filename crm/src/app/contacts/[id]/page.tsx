import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ContactDetailClient from "./ContactDetailClient";

export const dynamic = "force-dynamic";

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [contact, total] = await Promise.all([
    prisma.contact.findUnique({
      where: { id },
      include: {
        products: true,
        notes: { orderBy: { createdAt: "desc" } },
        activities: { orderBy: { createdAt: "desc" } },
        reviews: { orderBy: { publishedAt: "desc" } },
      },
    }),
    prisma.contact.count(),
  ]);

  if (!contact) {
    notFound();
  }

  return (
    <div className="flex h-screen">
      <Sidebar contactCount={total} />
      <main className="flex-1 overflow-auto">
        <ContactDetailClient contact={JSON.parse(JSON.stringify(contact))} />
      </main>
    </div>
  );
}
