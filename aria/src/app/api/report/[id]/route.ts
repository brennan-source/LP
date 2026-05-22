import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const a = await prisma.assessment.findUnique({ where: { id } });
  if (!a) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    id: a.id,
    status: a.status,
    paid: a.paid,
    report: a.report ? JSON.parse(a.report) : null,
  });
}
