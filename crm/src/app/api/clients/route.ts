import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status") ?? "";

    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const clients = await prisma.client.findMany({
      where,
      include: { contact: true },
      orderBy: { startDate: "desc" },
    });

    const totalMrr = clients
      .filter((c) => c.status === "active")
      .reduce((sum, c) => sum + c.monthlyRate, 0);

    return Response.json({ clients, totalMrr });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      contactId?: string;
      tier?: string;
      monthlyRate?: number;
      startDate?: string;
      framerUrl?: string;
      domain?: string;
      notes?: string;
    };

    if (!body.contactId || !body.tier || !body.monthlyRate || !body.startDate) {
      return Response.json(
        { error: "contactId, tier, monthlyRate, and startDate are required" },
        { status: 400 }
      );
    }

    const client = await prisma.client.create({
      data: {
        contactId: body.contactId,
        tier: body.tier,
        monthlyRate: body.monthlyRate,
        startDate: new Date(body.startDate),
        framerUrl: body.framerUrl ?? null,
        domain: body.domain ?? null,
        notes: body.notes ?? null,
        status: "active",
      },
      include: { contact: true },
    });

    // Upgrade contact to customer stage
    await prisma.contact.update({
      where: { id: body.contactId },
      data: { stage: "customer" },
    });

    await prisma.activity.create({
      data: {
        contactId: body.contactId,
        type: "stage_change",
        description: `Onboarded as ${body.tier} client at $${body.monthlyRate}/month`,
      },
    });

    return Response.json({ client }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    if (message.includes("Unique constraint")) {
      return Response.json({ error: "This contact is already a client" }, { status: 409 });
    }
    return Response.json({ error: message }, { status: 500 });
  }
}
