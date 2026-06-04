const API_KEY = process.env.OUTSCRAPER_API_KEY;
const BASE_URL = "https://api.app.outscraper.com";

export interface OutscraperBusiness {
  name: string;
  phone: string | null;
  site: string | null;
  email: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  category: string | null;
  rating: number | null;
  reviews: number | null;
  full_address: string | null;
}

export interface NormalizedContact {
  businessName: string;
  phone: string | null;
  website: string | null;
  email: string | null;
  city: string | null;
  state: string | null;
  industry: string | null;
  hasWebsite: boolean;
  rating: number | null;
}

export async function scrapeBusinesses(params: {
  category: string;
  location: string;
  limit?: number;
}): Promise<NormalizedContact[]> {
  if (!API_KEY) throw new Error("OUTSCRAPER_API_KEY is not set");

  const query = `${params.category} in ${params.location}`;
  const url = new URL(`${BASE_URL}/maps/search-v3`);
  url.searchParams.set("query", query);
  url.searchParams.set("limit", String(params.limit ?? 100));
  url.searchParams.set("async", "false");
  url.searchParams.set("fields", "name,phone,site,email,street,city,state,postal_code,category,rating,reviews,full_address");

  const res = await fetch(url.toString(), {
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Outscraper API error ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json() as { data?: OutscraperBusiness[][] };
  const businesses: OutscraperBusiness[] = (data.data ?? []).flat();

  return businesses.map(normalize);
}

function normalize(b: OutscraperBusiness): NormalizedContact {
  return {
    businessName: b.name,
    phone: b.phone ?? null,
    website: b.site ?? null,
    email: b.email ?? null,
    city: b.city ?? null,
    state: b.state ?? null,
    industry: b.category ?? null,
    hasWebsite: !!(b.site && b.site.trim().length > 0),
    rating: b.rating ?? null,
  };
}
