import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const a = await prisma.assessment.findUnique({ where: { id } });
  if (!a) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ status: a.status, scanResults: a.scanResults ? JSON.parse(a.scanResults) : null });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const { answers } = body;

  await prisma.assessment.update({
    where: { id },
    data: { quizAnswers: JSON.stringify(answers) },
  });

  return NextResponse.json({ ok: true });
}
