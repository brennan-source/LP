import { prisma } from "@/lib/db";
import { sendPostcard } from "@/lib/lob";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json() as {
      line1?: string;
      zip?: string;
    };

    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) {
      return Response.json({ error: "Contact not found" }, { status: 404 });
    }

    if (!contact.previewSlug) {
      return Response.json(
        { error: "Set a preview URL on this contact before sending a postcard" },
        { status: 400 }
      );
    }

    const city = contact.city ?? "";
    const state = contact.state ?? "";
    if (!city || !state || !body.line1 || !body.zip) {
      return Response.json(
        { error: "Address (line1, city, state, zip) is required" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3002";
    const trackingUrl = `${appUrl}/api/preview/${contact.previewSlug}`;

    const result = await sendPostcard(
      {
        id: contact.id,
        businessName: contact.businessName,
        firstName: contact.firstName,
        lastName: contact.lastName,
        city,
        state,
        phone: contact.phone,
        previewSlug: contact.previewSlug,
      },
      { line1: body.line1, city, state, zip: body.zip },
      trackingUrl
    );

    const updated = await prisma.contact.update({
      where: { id },
      data: {
        postcardSentAt: new Date().toISOString(),
        stage: "postcard_sent",
      },
      include: {
        products: true,
        notes: { orderBy: { createdAt: "desc" } },
        activities: { orderBy: { createdAt: "desc" } },
      },
    });

    await prisma.activity.create({
      data: {
        contactId: id,
        type: "postcard",
        description: `Postcard sent via Lob (id: ${result.id})`,
        metadata: JSON.stringify({ lobId: result.id, trackingUrl }),
      },
    });

    return Response.json({ ok: true, lobId: result.id, contact: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
