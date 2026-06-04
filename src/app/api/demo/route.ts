import { NextRequest, NextResponse } from "next/server";
import { runAudit } from "@/lib/audit";
import { BusinessInput } from "@/types/audit";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || req.headers.get("x-admin-key") !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: BusinessInput = await req.json();
  const results = await runAudit("demo-" + Date.now(), body);
  return NextResponse.json(results);
}
