import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const campaign = await prisma.campaign.findUnique({ where: { id } });

    if (!campaign) {
      return Response.json({ error: "Campaign not found" }, { status: 404 });
    }

    return Response.json({ campaign });
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
    const body = await request.json();

    const data: Record<string, unknown> = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.type !== undefined) data.type = body.type;
    if (body.subject !== undefined) data.subject = body.subject;
    if (body.body !== undefined) data.body = body.body;
    if (body.status !== undefined) data.status = body.status;
    if (body.sentCount !== undefined) data.sentCount = body.sentCount;

    const campaign = await prisma.campaign.update({
      where: { id },
      data,
    });

    return Response.json({ campaign });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    if (message.includes("Record to update not found")) {
      return Response.json({ error: "Campaign not found" }, { status: 404 });
    }
    return Response.json({ error: message }, { status: 500 });
  }
}
