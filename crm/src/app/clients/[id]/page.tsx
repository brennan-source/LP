import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { validateSessionToken, COOKIE_NAME } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Sidebar from "@/components/Sidebar";
import ClientDetailClient from "./ClientDetailClient";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !validateSessionToken(token)) redirect("/login");

  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id },
    include: { contact: true },
  });

  if (!client) notFound();

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <ClientDetailClient client={JSON.parse(JSON.stringify(client))} />
      </main>
    </div>
  );
}
