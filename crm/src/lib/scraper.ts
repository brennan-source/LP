export interface ScrapedContact {
  businessName: string;
  phone?: string;
  website?: string;
  city?: string;
  state?: string;
  email?: string;
  emailInferred?: boolean; // true when email is a domain-based guess, not scraped
  industry?: string;
}

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const SKIP_PREFIXES = ["noreply@", "no-reply@", "donotreply@", "bounce@", "mailer-daemon@", "wordpress@", "admin@", "webmaster@"];
const SKIP_DOMAINS = ["sentry.io", "w3.org", "schema.org", "example.com", "yourdomain.com"];

// Realistic browser headers — avoids 403s from Cloudflare-protected sites
const BROWSER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "no-cache",
};

function filterEmail(email: string): boolean {
  const lower = email.toLowerCase();
  if (SKIP_PREFIXES.some((prefix) => lower.startsWith(prefix))) return false;
  if (SKIP_DOMAINS.some((d) => lower.endsWith("@" + d))) return false;
  // Skip image files, font files, etc. that regex can accidentally match
  if (/\.(png|jpg|jpeg|gif|svg|woff|ttf|eot|css|js)$/i.test(lower)) return false;
  return true;
}

const CONTACT_PATHS = [
  "/contact", "/contact-us", "/contactus", "/about", "/about-us",
  "/get-in-touch", "/reach-us", "/reach-out", "/info",
  "/get-a-quote", "/free-estimate", "/request-service", "/book",
];

// Detect obfuscated emails like "info [at] domain.com" or "info(at)domain"
function findObfuscatedEmails(html: string): string[] {
  const results: string[] = [];
  const obfPattern = /([a-zA-Z0-9._%+-]+)\s*[\[(]?\s*at\s*[\])]?\s*([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
  let m: RegExpExecArray | null;
  while ((m = obfPattern.exec(html)) !== null) {
    const candidate = `${m[1]}@${m[2]}`;
    if (filterEmail(candidate)) results.push(candidate);
  }
  return results;
}

async function fetchPageEmails(url: string): Promise<string[]> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: BROWSER_HEADERS,
    });
    if (!res.ok) return [];
    const html = await res.text();

    // mailto: links — most reliable
    const mailtoEmails = [...html.matchAll(/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g)]
      .map((m) => m[1]);

    const regexEmails = html.match(EMAIL_REGEX) ?? [];
    const obfuscated = findObfuscatedEmails(html);

    return [...new Set([...mailtoEmails, ...regexEmails, ...obfuscated].filter(filterEmail))];
  } catch {
    return [];
  }
}

async function fetchWebsiteEmails(websiteUrl: string): Promise<{ email?: string; inferred: boolean }> {
  const base = websiteUrl.replace(/\/$/, "");

  let domain: string | undefined;
  try { domain = new URL(base).hostname.replace(/^www\./, ""); } catch { /* ignore */ }

  // Fetch homepage + contact/about pages in parallel
  const pages = [base, ...CONTACT_PATHS.map((p) => base + p)];
  const results = await Promise.all(pages.map(fetchPageEmails));
  const all = results.flat();

  // Prefer emails on the business's own domain
  const onDomain = domain
    ? all.filter((e) => e.toLowerCase().endsWith("@" + domain))
    : [];

  if (onDomain.length > 0) return { email: onDomain[0], inferred: false };
  if (all.length > 0) return { email: all[0], inferred: false };

  // Fall back to info@domain — far better than @scrape.local
  if (domain) return { email: `info@${domain}`, inferred: true };
  return { inferred: true };
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
    if (comp.types?.includes("locality")) city = comp.longText;
    if (comp.types?.includes("administrative_area_level_1")) state = comp.longText;
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
    let emailInferred = false;
    if (website) {
      const result = await fetchWebsiteEmails(website);
      email = result.email;
      emailInferred = result.inferred;
    }

    results.push({
      businessName,
      phone,
      website,
      city: placeCity ?? city,
      state: placeState ?? state,
      email,
      emailInferred,
      industry,
    });
  }

  return results;
}

export const TARGET_LOCATIONS = [
  // Greater Boston
  { city: "Boston", state: "MA" },
  { city: "Cambridge", state: "MA" },
  { city: "Somerville", state: "MA" },
  { city: "Quincy", state: "MA" },
  { city: "Braintree", state: "MA" },
  { city: "Dedham", state: "MA" },
  { city: "Milton", state: "MA" },
  { city: "Weymouth", state: "MA" },
  { city: "Waltham", state: "MA" },
  { city: "Newton", state: "MA" },
  { city: "Brookline", state: "MA" },
  { city: "Watertown", state: "MA" },
  { city: "Woburn", state: "MA" },
  { city: "Malden", state: "MA" },
  { city: "Medford", state: "MA" },
  { city: "Everett", state: "MA" },
  { city: "Chelsea", state: "MA" },
  { city: "Revere", state: "MA" },
  // North Shore
  { city: "Lynn", state: "MA" },
  { city: "Salem", state: "MA" },
  { city: "Beverly", state: "MA" },
  { city: "Peabody", state: "MA" },
  { city: "Gloucester", state: "MA" },
  { city: "Newburyport", state: "MA" },
  { city: "Amesbury", state: "MA" },
  // Merrimack Valley / Lowell Area
  { city: "Lowell", state: "MA" },
  { city: "Lawrence", state: "MA" },
  { city: "Haverhill", state: "MA" },
  { city: "Methuen", state: "MA" },
  { city: "Andover", state: "MA" },
  { city: "Billerica", state: "MA" },
  { city: "Chelmsford", state: "MA" },
  { city: "Dracut", state: "MA" },
  { city: "Tewksbury", state: "MA" },
  // Metro West
  { city: "Framingham", state: "MA" },
  { city: "Natick", state: "MA" },
  { city: "Marlborough", state: "MA" },
  { city: "Milford", state: "MA" },
  { city: "Wellesley", state: "MA" },
  { city: "Needham", state: "MA" },
  { city: "Norwood", state: "MA" },
  { city: "Westborough", state: "MA" },
  { city: "Hudson", state: "MA" },
  { city: "Hopkinton", state: "MA" },
  // South Shore
  { city: "Brockton", state: "MA" },
  { city: "Taunton", state: "MA" },
  { city: "Plymouth", state: "MA" },
  { city: "Marshfield", state: "MA" },
  { city: "Rockland", state: "MA" },
  { city: "Abington", state: "MA" },
  { city: "Bridgewater", state: "MA" },
  { city: "Attleboro", state: "MA" },
  // Southeast / Cape Cod
  { city: "New Bedford", state: "MA" },
  { city: "Fall River", state: "MA" },
  { city: "Barnstable", state: "MA" },
  { city: "Falmouth", state: "MA" },
  { city: "Yarmouth", state: "MA" },
  // Central MA
  { city: "Worcester", state: "MA" },
  { city: "Leominster", state: "MA" },
  { city: "Fitchburg", state: "MA" },
  { city: "Gardner", state: "MA" },
  { city: "Milford", state: "MA" },
  { city: "Shrewsbury", state: "MA" },
  { city: "Northborough", state: "MA" },
  // Pioneer Valley / Western MA
  { city: "Springfield", state: "MA" },
  { city: "Chicopee", state: "MA" },
  { city: "Holyoke", state: "MA" },
  { city: "Westfield", state: "MA" },
  { city: "Northampton", state: "MA" },
  { city: "Amherst", state: "MA" },
  { city: "Pittsfield", state: "MA" },
  // New Hampshire
  { city: "Manchester", state: "NH" },
  { city: "Nashua", state: "NH" },
  { city: "Concord", state: "NH" },
  { city: "Derry", state: "NH" },
  { city: "Dover", state: "NH" },
  { city: "Rochester", state: "NH" },
  // Vermont & Maine
  { city: "Burlington", state: "VT" },
  { city: "Montpelier", state: "VT" },
  { city: "Portland", state: "ME" },
  { city: "Bangor", state: "ME" },
  { city: "Augusta", state: "ME" },
  { city: "Lewiston", state: "ME" },
];

export const TARGET_INDUSTRIES = [
  "HVAC",
  "Plumber",
  "Septic",
  "Roofer",
  "Landscaper",
  "Manufacturing",
];
