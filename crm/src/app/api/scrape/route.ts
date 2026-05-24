import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

interface PlaceResult {
  name: string;
  formatted_address?: string;
  formatted_phone_number?: string;
  website?: string;
  place_id?: string;
}

async function searchPlaces(query: string, city: string, state: string): Promise<PlaceResult[]> {
  if (!PLACES_API_KEY) throw new Error("GOOGLE_PLACES_API_KEY not set");
  const params = new URLSearchParams({
    query: `${query} in ${city}, ${state}`,
    key: PLACES_API_KEY,
  });
  const res = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?${params}`);
  const data = await res.json() as { results: PlaceResult[] };
  return data.results ?? [];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { industry, city, state } = body;
    if (!industry || !city || !state) {
      return NextResponse.json({ error: "industry, city, and state are required" }, { status: 400 });
    }

    const results = await searchPlaces(industry, city, state);
    let newCount = 0;

    for (const place of results) {
      if (!place.name || !place.place_id) continue;

      const placeholderEmail = `${place.place_id}@places.local`;

      try {
        const existing = await prisma.contact.findUnique({
          where: { email: placeholderEmail },
        });
        if (existing) continue;

        await prisma.contact.create({
          data: {
            email: placeholderEmail,
            businessName: place.name,
            phone: place.formatted_phone_number ?? null,
            website: place.website ?? null,
            city,
            state,
            industry,
            stage: "prospect",
            source: "scraped",
          },
        });
        newCount++;
      } catch {
        // skip duplicates
      }
    }

    return NextResponse.json({ total: results.length, newContacts: newCount, skipped: results.length - newCount });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
