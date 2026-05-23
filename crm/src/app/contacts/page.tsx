import { prisma } from "@/lib/db";
import Sidebar from "@/components/Sidebar";
import ContactsClient from "./ContactsClient";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const total = await prisma.contact.count();

  return (
    <div className="flex h-screen">
      <Sidebar contactCount={total} />
      <main className="flex-1 overflow-auto">
        <ContactsClient />
      </main>
    </div>
  );
}
