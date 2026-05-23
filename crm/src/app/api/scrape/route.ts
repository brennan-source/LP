import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

async function searchPlaces(query: string, location: string): Promise<PlaceResult[]> {
  if (!PLACES_API_KEY) throw new Error("GOOGLE_PLACES_API_KEY not set");
  const params = new URLSearchParams({
    query: `${query} in ${location}`,
    key: PLACES_API_KEY,
  });
  const res = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?${params}`);
  const data = await res.json() as { results: PlaceResult[] };
  return data.results ?? [];
}

interface PlaceResult {
  name: string;
  formatted_address?: string;
  formatted_phone_number?: string;
  website?: string;
  place_id?: string;
}

function parseAddress(address: string): { city: string; state: string } {
  const parts = address.split(",").map((s) => s.trim());
  const city = parts[1] ?? "Unknown";
  const stateZip = parts[2] ?? "";
  const state = stateZip.trim().split(" ")[0] ?? "Unknown";
  return { city, state };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { industry, location } = body;
    if (!industry || !location) {
      return NextResponse.json({ error: "industry and location required" }, { status: 400 });
    }

    const results = await searchPlaces(industry, location);
    const created: string[] = [];

    for (const place of results) {
      if (!place.name) continue;
      const existing = await prisma.contact.findFirst({
        where: { business: place.name },
      });
      if (existing) continue;

      const { city, state } = parseAddress(place.formatted_address ?? "");
      const contact = await prisma.contact.create({
        data: {
          name: place.name,
          business: place.name,
          phone: place.formatted_phone_number ?? null,
          website: place.website ?? null,
          industry,
          city,
          state,
          status: "prospect",
          source: "places",
        },
      });
      created.push(contact.id);
    }

    return NextResponse.json({ created: created.length, total: results.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
