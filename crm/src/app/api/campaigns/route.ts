import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: "desc" },
    });
    return Response.json({ campaigns });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const campaignType: string = body.type ?? "email";
    if (!body.name || !body.body) {
      return Response.json(
        { error: "name and body are required" },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.create({
      data: {
        name: body.name,
        type: campaignType,
        subject: body.subject ?? "",
        body: body.body,
        status: body.status ?? "draft",
      },
    });

    return Response.json({ campaign }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
