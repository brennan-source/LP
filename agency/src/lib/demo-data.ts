export type Industry = "hvac" | "plumbing_septic";

export interface ReviewQuote {
  text: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface DemoCompany {
  slug: string;
  businessName: string;
  phone: string;
  email: string | null;
  address: string;
  city: string;
  state: string;
  zip: string;
  industry: Industry;
  rating: number;
  reviewCount: number;
  reviewQuotes: ReviewQuote[];
  services: string[];
  serviceAreas: string[];
  tagline?: string;
  yearFounded?: number;
  emergencyService: boolean;
  facebook?: string;
  instagram?: string;
  hasWebsite?: boolean;
  existingWebsite?: string | null;
  description?: string;
  brands?: string[];
}

const DEFAULT_SERVICES: Record<Industry, string[]> = {
  hvac: [
    "Air Conditioning Installation & Replacement",
    "AC Repair & Service",
    "Furnace Installation & Replacement",
    "Heating Repair & Service",
    "Heat Pump Systems",
    "Ductwork Installation & Repair",
    "Mini-Split Systems",
    "Indoor Air Quality",
    "Preventive Maintenance Plans",
    "Emergency HVAC Service",
  ],
  plumbing_septic: [
    "Drain Cleaning & Unclogging",
    "Water Heater Installation & Repair",
    "Leak Detection & Repair",
    "Pipe Installation & Replacement",
    "Septic System Service & Pumping",
    "Sewer Line Repair & Replacement",
    "Emergency Plumbing",
    "Fixture Installation",
    "Water Quality & Filtration",
    "Bathroom & Kitchen Plumbing",
  ],
};

const DEFAULT_TAGLINES: Record<Industry, string> = {
  hvac: "Keeping __CITY__ Comfortable Year-Round",
  plumbing_septic: "Trusted Plumbing & Septic Service in __CITY__",
};

let cache: DemoCompany[] | null = null;

export async function getAllDemos(): Promise<DemoCompany[]> {
  if (cache) return cache;
  try {
    const { readFile } = await import("fs/promises");
    const raw = await readFile(process.cwd() + "/data/demos.json", "utf-8");
    cache = JSON.parse(raw) as DemoCompany[];
  } catch {
    cache = [];
  }
  return cache;
}

export function bustDemoCache() {
  cache = null;
}

export async function getDemoBySlug(slug: string): Promise<DemoCompany | null> {
  const all = await getAllDemos();
  return all.find((d) => d.slug === slug) ?? null;
}

export function resolveDemo(raw: DemoCompany): DemoCompany {
  return {
    ...raw,
    services: raw.services.length ? raw.services : DEFAULT_SERVICES[raw.industry],
    tagline: raw.tagline ?? DEFAULT_TAGLINES[raw.industry].replace("__CITY__", raw.city),
    emergencyService: raw.emergencyService ?? true,
  };
}
