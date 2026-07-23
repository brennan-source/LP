import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { runGrowthScoreAudit } from "@/lib/growth-score";
import { sendGrowthScoreReportEmail, sendGrowthScoreLeadNotification } from "@/lib/email";
import { normalizeUrl } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessName, websiteUrl, phoneNumber, industry, city, state, email, revenueRange } = body;

    if (!businessName || !websiteUrl || !industry || !city || !state || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const submission = await prisma.growthScoreSubmission.create({
      data: {
        businessName,
        websiteUrl: normalizeUrl(websiteUrl),
        phoneNumber: phoneNumber || null,
        industry,
        city,
        state,
        email,
        revenueRange: revenueRange || null,
        status: "running",
      },
    });

    runGrowthScoreAuditAsync({
      id: submission.id,
      businessName,
      websiteUrl: normalizeUrl(websiteUrl),
      phoneNumber: phoneNumber || undefined,
      industry,
      city,
      state,
      email,
      revenueRange: revenueRange || undefined,
    });

    return NextResponse.json({ submissionId: submission.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Growth Score submission error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function runGrowthScoreAuditAsync(input: {
  id: string;
  businessName: string;
  websiteUrl: string;
  phoneNumber?: string;
  industry: string;
  city: string;
  state: string;
  email: string;
  revenueRange?: string;
}) {
  try {
    const results = await runGrowthScoreAudit(input.id, input);
    await prisma.growthScoreSubmission.update({
      where: { id: input.id },
      data: { status: "complete", results: JSON.stringify(results) },
    });
    await Promise.all([
      sendGrowthScoreReportEmail(input.email, results),
      sendGrowthScoreLeadNotification(results),
    ]);
  } catch (error) {
    console.error("Growth Score audit failed:", error instanceof Error ? error.message : error);
    await prisma.growthScoreSubmission.update({ where: { id: input.id }, data: { status: "failed" } });
  }
}
