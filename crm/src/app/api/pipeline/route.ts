import { prisma } from "@/lib/db";
import { STAGES } from "@/types/crm";

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      include: {
        products: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    const grouped: Record<string, typeof contacts> = {};

    for (const stage of STAGES) {
      grouped[stage.value] = [];
    }

    for (const contact of contacts) {
      const stage = contact.stage;
      if (grouped[stage]) {
        grouped[stage].push(contact);
      } else {
        grouped["prospect"] = grouped["prospect"] ?? [];
        grouped["prospect"].push(contact);
      }
    }

    return Response.json({ pipeline: grouped });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
