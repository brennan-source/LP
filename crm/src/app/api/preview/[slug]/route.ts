import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  let contact: { id: string; previewUrl: string | null; businessName: string | null } | null = null;

  try {
    contact = await prisma.contact.findUnique({
      where: { previewSlug: slug },
    });

    if (contact) {
      await prisma.contact.update({
        where: { id: contact.id },
        data: {
          previewVisitedAt: new Date().toISOString(),
          stage: "preview_visited",
        },
      });

      await prisma.activity.create({
        data: {
          contactId: contact.id,
          type: "preview_visit",
          description: "Scanned QR code and visited preview",
        },
      });
    }
  } catch {
    // Don't block the redirect if DB update fails
  }

  const agencyUrl = process.env.AGENCY_URL ?? "https://gomakr.ai";
  const qs = new URLSearchParams();
  if (contact?.previewUrl) qs.set("url", contact.previewUrl);
  if (contact?.businessName) qs.set("name", contact.businessName);
  const query = qs.toString() ? `?${qs.toString()}` : "";
  redirect(`${agencyUrl}/preview/${slug}${query}`);
}
