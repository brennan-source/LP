import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contactId, type, description, metadata } = body;
    if (!contactId || !type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const activity = await prisma.activity.create({
      data: { contactId, type, description: description || null, metadata: metadata || null },
    });
    return NextResponse.json(activity, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
