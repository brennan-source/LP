import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("q") ?? "";
  const status = req.nextUrl.searchParams.get("status") ?? "";
  const contacts = await prisma.contact.findMany({
    where: {
      AND: [
        status ? { status } : {},
        search ? {
          OR: [
            { name: { contains: search } },
            { business: { contains: search } },
            { email: { contains: search } },
          ],
        } : {},
      ],
    },
    orderBy: { updatedAt: "desc" },
    include: { activities: { orderBy: { createdAt: "desc" }, take: 1 } },
  });
  return NextResponse.json(contacts);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, business, industry, city, state, website, status, source, product, notes } = body;
    if (!name || !business || !industry || !city || !state) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const contact = await prisma.contact.create({
      data: { name, email: email || null, phone: phone || null, business, industry, city, state, website: website || null, status: status || "prospect", source: source || "manual", product: product || null, notes: notes || null },
    });
    return NextResponse.json(contact, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
