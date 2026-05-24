import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return new NextResponse("Invalid link", { status: 400 });

  try {
    await prisma.contact.updateMany({ where: { email }, data: { stage: "churned", tags: "unsubscribed" } });
  } catch {
    // ignore
  }

  return new NextResponse(
    `<!DOCTYPE html><html><body style="font-family:sans-serif;padding:40px;text-align:center">
    <h2>You've been unsubscribed</h2>
    <p>You won't receive any more emails from us.</p>
    </body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
