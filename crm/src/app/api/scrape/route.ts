import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { scrapeBusinesses } from "@/lib/outscraper";
import { checkWebsite, isWeakWebsite } from "@/lib/pagespeed";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category, location, limit } = body as {
      category?: string;
      location?: string;
      limit?: number;
    };

    if (!category || !location) {
      return NextResponse.json(
        { error: "category and location are required" },
        { status: 400 }
      );
    }

    const businesses = await scrapeBusinesses({
      category,
      location,
      limit: limit ?? 100,
    });

    let newCount = 0;
    let skipped = 0;
    let noWebsite = 0;

    for (const biz of businesses) {
      if (!biz.businessName) continue;

      const placeholderEmail = `${biz.businessName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 40)}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}@outscraper.local`;

      const emailToUse = biz.email ?? placeholderEmail;

      try {
        const existing = await prisma.contact.findFirst({
          where: {
            OR: [
              { email: emailToUse },
              ...(biz.phone ? [{ phone: biz.phone }] : []),
            ],
          },
        });

        if (existing) {
          skipped++;
          continue;
        }

        await prisma.contact.create({
          data: {
            email: emailToUse,
            businessName: biz.businessName,
            phone: biz.phone ?? null,
            website: biz.website ?? null,
            city: biz.city ?? null,
            state: biz.state ?? null,
            industry: biz.industry ?? null,
            hasWebsite: biz.hasWebsite,
            weakWebsite: false,
            stage: "prospect",
            source: "outscraper",
          },
        });

        if (!biz.hasWebsite) noWebsite++;
        newCount++;
      } catch {
        skipped++;
      }
    }

    // Queue background PageSpeed checks for contacts that have websites
    // We do this fire-and-forget — don't await the whole batch
    if (newCount > 0) {
      queuePageSpeedChecks(category, location).catch(() => {});
    }

    return NextResponse.json({
      total: businesses.length,
      newContacts: newCount,
      skipped,
      noWebsite,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function queuePageSpeedChecks(category: string, location: string) {
  const contacts = await prisma.contact.findMany({
    where: {
      hasWebsite: true,
      auditScore: null,
      website: { not: null },
      source: "outscraper",
      industry: { contains: category.split(" ")[0] },
      city: { contains: location.split(",")[0].trim() },
    },
    take: 50,
    select: { id: true, website: true },
  });

  for (const contact of contacts) {
    if (!contact.website) continue;
    try {
      const result = await checkWebsite(contact.website);
      await prisma.contact.update({
        where: { id: contact.id },
        data: {
          auditScore: result.mobileScore,
          weakWebsite: isWeakWebsite(result),
        },
      });
    } catch {
      // PageSpeed check failed — skip this contact
    }
    // Small delay to avoid rate limits
    await new Promise((r) => setTimeout(r, 1000));
  }
}
