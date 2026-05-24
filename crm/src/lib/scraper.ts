export interface ScrapedContact {
  businessName: string;
  phone?: string;
  website?: string;
  city?: string;
  state?: string;
  email?: string;
  industry?: string;
}

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const SKIP_PREFIXES = ["noreply@", "no-reply@", "donotreply@", "bounce@", "mailer-daemon@"];

function filterEmail(email: string): boolean {
  const lower = email.toLowerCase();
  return !SKIP_PREFIXES.some((prefix) => lower.startsWith(prefix));
}

const CONTACT_PATHS = ["/contact", "/contact-us", "/about", "/about-us", "/get-in-touch", "/reach-us"];

async function fetchPageEmails(url: string): Promise<string[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; CRMBot/1.0)" },
    });
    clearTimeout(timeout);
    if (!res.ok) return [];
    const html = await res.text();

    // mailto: links are the most reliable signal
    const mailtoEmails = [...html.matchAll(/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g)]
      .map((m) => m[1]);

    const regexEmails = html.match(EMAIL_REGEX) ?? [];
    return [...new Set([...mailtoEmails, ...regexEmails].filter(filterEmail))];
  } catch {
    return [];
  }
}

async function fetchWebsiteEmails(websiteUrl: string): Promise<string[]> {
  const base = websiteUrl.replace(/\/$/, "");

  // Check homepage and contact/about subpages in parallel
  const pages = [base, ...CONTACT_PATHS.map((p) => base + p)];
  const results = await Promise.all(pages.map(fetchPageEmails));
  const all = results.flat();

  // Prefer emails on the same domain over any generic ones
  let domain: string | undefined;
  try { domain = new URL(base).hostname.replace(/^www\./, ""); } catch { /* ignore */ }

  const onDomain = all.filter((e) => domain && e.toLowerCase().endsWith("@" + domain));
  return onDomain.length > 0 ? [...new Set(onDomain)] : [...new Set(all)];
}

interface PlaceResult {
  displayName?: { text?: string };
  nationalPhoneNumber?: string;
  websiteUri?: string;
  addressComponents?: Array<{
    longText: string;
    types: string[];
  }>;
}

interface PlacesResponse {
  places?: PlaceResult[];
}

function extractCityState(place: PlaceResult): { city?: string; state?: string } {
  const components = place.addressComponents ?? [];
  let city: string | undefined;
  let state: string | undefined;
  for (const comp of components) {
    if (comp.types.includes("locality")) city = comp.longText;
    if (comp.types.includes("administrative_area_level_1")) state = comp.longText;
  }
  return { city, state };
}

export async function scrapeContacts(
  industry: string,
  city: string,
  state: string
): Promise<ScrapedContact[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_PLACES_API_KEY is not set");

  const query = `${industry} companies in ${city} ${state}`;

  const placesRes = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "places.displayName,places.nationalPhoneNumber,places.websiteUri,places.addressComponents",
    },
    body: JSON.stringify({
      textQuery: query,
      maxResultCount: 20,
      languageCode: "en",
    }),
  });

  if (!placesRes.ok) {
    const errText = await placesRes.text();
    throw new Error(`Google Places API error: ${placesRes.status} - ${errText}`);
  }

  const data: PlacesResponse = await placesRes.json();
  const places = data.places ?? [];

  const results: ScrapedContact[] = [];

  for (const place of places) {
    const businessName = place.displayName?.text;
    if (!businessName) continue;

    const phone = place.nationalPhoneNumber;
    const website = place.websiteUri;
    const { city: placeCity, state: placeState } = extractCityState(place);

    let email: string | undefined;
    if (website) {
      const emails = await fetchWebsiteEmails(website);
      email = emails[0];
    }

    results.push({
      businessName,
      phone,
      website,
      city: placeCity ?? city,
      state: placeState ?? state,
      email,
      industry,
    });
  }

  return results;
}

export const TARGET_LOCATIONS = [
  { city: "Boston", state: "MA" },
  { city: "Worcester", state: "MA" },
  { city: "Springfield", state: "MA" },
  { city: "Lowell", state: "MA" },
  { city: "Cambridge", state: "MA" },
  { city: "Manchester", state: "NH" },
  { city: "Nashua", state: "NH" },
  { city: "Concord", state: "NH" },
  { city: "Burlington", state: "VT" },
  { city: "Montpelier", state: "VT" },
  { city: "Portland", state: "ME" },
  { city: "Bangor", state: "ME" },
  { city: "Augusta", state: "ME" },
];

export const TARGET_INDUSTRIES = [
  "HVAC",
  "Plumber",
  "Septic",
  "Roofer",
  "Landscaper",
  "Manufacturing",
];
