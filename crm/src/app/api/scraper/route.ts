import { prisma } from "@/lib/db";
import { scrapeContacts } from "@/lib/scraper";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { industry, city, state } = body;

    if (!industry || !city || !state) {
      return Response.json(
        { error: "industry, city, and state are required" },
        { status: 400 }
      );
    }

    const scraped = await scrapeContacts(industry, city, state);

    let newCount = 0;

    for (const contact of scraped) {
      // Skip contacts with no email and no website — nothing useful to store
      if (!contact.email) continue;

      try {
        const existing = await prisma.contact.findUnique({
          where: { email: contact.email },
        });

        if (!existing) {
          await prisma.contact.create({
            data: {
              email: contact.email,
              businessName: contact.businessName ?? null,
              phone: contact.phone ?? null,
              website: contact.website ?? null,
              city: contact.city ?? null,
              state: contact.state ?? null,
              industry: contact.industry ?? null,
              stage: "prospect",
              source: "scraped",
              // Tag inferred emails so user knows to verify before sending
              tags: contact.emailInferred ? "email-inferred" : null,
            },
          });
          newCount++;
        }
      } catch {
        // Skip duplicates or constraint violations
      }
    }

    return Response.json({
      total: scraped.length,
      newContacts: newCount,
      skipped: scraped.length - newCount,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
