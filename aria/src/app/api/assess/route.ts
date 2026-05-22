import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { scanWebsite } from "@/lib/assess";
import { normalizeUrl } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessName, websiteUrl, phoneNumber, industry, city, state, teamSize, revenueRange, email } = body;

    if (!businessName || !websiteUrl || !industry || !city || !state || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const url = normalizeUrl(websiteUrl);

    const assessment = await prisma.assessment.create({
      data: {
        businessName,
        websiteUrl: url,
        phoneNumber: phoneNumber || null,
        industry,
        city,
        state,
        teamSize: teamSize || "2to5",
        revenueRange: revenueRange || "250k_1m",
        email,
        status: "scanning",
      },
    });

    // Run scan asynchronously, don't block the response
    runScanAsync(assessment.id, url);

    return NextResponse.json({ assessmentId: assessment.id });
  } catch (error) {
    console.error("Assess error:", error);
    return NextResponse.json({ error: "Failed to start assessment" }, { status: 500 });
  }
}

async function runScanAsync(id: string, url: string) {
  try {
    const scan = await scanWebsite(url);
    await prisma.assessment.update({
      where: { id },
      data: {
        scanResults: JSON.stringify(scan),
        status: "awaiting_quiz",
      },
    });
  } catch {
    await prisma.assessment.update({
      where: { id },
      data: { status: "awaiting_quiz", scanResults: JSON.stringify({}) },
    });
  }
}
