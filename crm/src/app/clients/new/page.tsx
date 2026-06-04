import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateSessionToken, COOKIE_NAME } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";
import NewClientClient from "./NewClientClient";

export default async function NewClientPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !validateSessionToken(token)) redirect("/login");

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <NewClientClient />
      </main>
    </div>
  );
}
