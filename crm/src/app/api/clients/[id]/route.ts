import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await prisma.client.findUnique({
      where: { id },
      include: { contact: true },
    });

    if (!client) {
      return Response.json({ error: "Client not found" }, { status: 404 });
    }

    return Response.json({ client });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json() as {
      tier?: string;
      monthlyRate?: number;
      framerUrl?: string;
      domain?: string;
      status?: string;
      notes?: string;
    };

    const data: Record<string, unknown> = {};
    if (body.tier !== undefined) data.tier = body.tier;
    if (body.monthlyRate !== undefined) data.monthlyRate = body.monthlyRate;
    if (body.framerUrl !== undefined) data.framerUrl = body.framerUrl;
    if (body.domain !== undefined) data.domain = body.domain;
    if (body.status !== undefined) data.status = body.status;
    if (body.notes !== undefined) data.notes = body.notes;

    const client = await prisma.client.update({
      where: { id },
      data,
      include: { contact: true },
    });

    return Response.json({ client });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
