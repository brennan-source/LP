import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, businessName, city, state, industry, jobId } = body;

    if (!email) {
      return Response.json({ error: "email is required" }, { status: 400 });
    }

    // Upsert contact
    const contact = await prisma.contact.upsert({
      where: { email },
      create: {
        email,
        businessName: businessName ?? null,
        city: city ?? null,
        state: state ?? null,
        industry: industry ?? null,
        stage: "customer",
        source: "leadpulse_webhook",
      },
      update: {
        businessName: businessName ?? undefined,
        city: city ?? undefined,
        state: state ?? undefined,
        industry: industry ?? undefined,
        stage: "customer",
      },
    });

    // Upsert ContactProduct for leadpulse
    const existingProduct = await prisma.contactProduct.findFirst({
      where: {
        contactId: contact.id,
        product: "leadpulse",
      },
    });

    if (!existingProduct) {
      await prisma.contactProduct.create({
        data: {
          contactId: contact.id,
          product: "leadpulse",
          status: "paid",
          paidAt: new Date(),
        },
      });
    } else {
      await prisma.contactProduct.update({
        where: { id: existingProduct.id },
        data: { status: "paid", paidAt: existingProduct.paidAt ?? new Date() },
      });
    }

    // Log activity
    await prisma.activity.create({
      data: {
        contactId: contact.id,
        type: "purchase",
        description: "Purchased LeadPulse audit",
        metadata: jobId ? JSON.stringify({ jobId }) : null,
      },
    });

    return Response.json({ ok: true, contactId: contact.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
