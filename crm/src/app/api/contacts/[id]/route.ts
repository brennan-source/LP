import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contact = await prisma.contact.findUnique({
      where: { id },
      include: {
        products: true,
        notes: { orderBy: { createdAt: "desc" } },
        activities: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!contact) {
      return Response.json({ error: "Contact not found" }, { status: 404 });
    }

    return Response.json({ contact });
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

    // Handle note creation
    if (body._addNote) {
      const note = await prisma.note.create({
        data: {
          contactId: id,
          content: body._addNote,
        },
      });
      await prisma.activity.create({
        data: {
          contactId: id,
          type: "note",
          description: "Added a note",
        },
      });
      return Response.json({ note });
    }

    // Update contact fields
    const {
      firstName,
      lastName,
      email,
      phone,
      businessName,
      industry,
      city,
      state,
      website,
      linkedinUrl,
      stage,
      tags,
    } = body;

    const data: Record<string, unknown> = {};
    if (firstName !== undefined) data.firstName = firstName;
    if (lastName !== undefined) data.lastName = lastName;
    if (email !== undefined) data.email = email;
    if (phone !== undefined) data.phone = phone;
    if (businessName !== undefined) data.businessName = businessName;
    if (industry !== undefined) data.industry = industry;
    if (city !== undefined) data.city = city;
    if (state !== undefined) data.state = state;
    if (website !== undefined) data.website = website;
    if (linkedinUrl !== undefined) data.linkedinUrl = linkedinUrl;
    if (stage !== undefined) data.stage = stage;
    if (tags !== undefined) data.tags = tags;

    const contact = await prisma.contact.update({
      where: { id },
      data,
      include: {
        products: true,
        notes: { orderBy: { createdAt: "desc" } },
        activities: { orderBy: { createdAt: "desc" } },
      },
    });

    // Log stage change activity
    if (stage !== undefined) {
      await prisma.activity.create({
        data: {
          contactId: id,
          type: "stage_change",
          description: `Stage changed to ${stage}`,
        },
      });
    }

    return Response.json({ contact });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    if (message.includes("Record to update not found")) {
      return Response.json({ error: "Contact not found" }, { status: 404 });
    }
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.contact.delete({ where: { id } });
    return Response.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    if (message.includes("Record to delete does not exist")) {
      return Response.json({ error: "Contact not found" }, { status: 404 });
    }
    return Response.json({ error: message }, { status: 500 });
  }
}
