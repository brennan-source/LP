import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, customer } = body;
    if (!customer?.email) {
      return NextResponse.json({ error: "Missing customer data" }, { status: 400 });
    }

    let contact = await prisma.contact.findFirst({ where: { email: customer.email } });

    if (!contact) {
      contact = await prisma.contact.create({
        data: {
          name: customer.name ?? customer.email,
          email: customer.email,
          phone: customer.phone ?? null,
          business: customer.business ?? "Unknown",
          industry: customer.industry ?? "Unknown",
          city: customer.city ?? "Unknown",
          state: customer.state ?? "Unknown",
          status: event === "purchase" ? "customer" : "lead",
          source: "webhook",
          product: "lp",
        },
      });
    } else if (event === "purchase") {
      await prisma.contact.update({
        where: { id: contact.id },
        data: { status: "customer", product: contact.product === "aria" ? "both" : "lp" },
      });
    }

    await prisma.activity.create({
      data: {
        contactId: contact.id,
        type: event ?? "webhook",
        title: `LeadPulse: ${event ?? "event"}`,
        body: JSON.stringify(body),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
