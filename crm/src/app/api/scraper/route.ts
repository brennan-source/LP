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
      const email = contact.email
        ?? `${contact.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.${city.toLowerCase()}.${state.toLowerCase()}@scrape.local`;

      try {
        const existing = await prisma.contact.findUnique({
          where: { email },
        });

        if (!existing) {
          await prisma.contact.create({
            data: {
              email,
              businessName: contact.businessName ?? null,
              phone: contact.phone ?? null,
              website: contact.website ?? null,
              city: contact.city ?? null,
              state: contact.state ?? null,
              industry: contact.industry ?? null,
              stage: "prospect",
              source: "scraped",
            },
          });
          newCount++;
        }
      } catch {
        // Skip duplicates or invalid entries
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
