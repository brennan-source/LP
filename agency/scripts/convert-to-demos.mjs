/**
 * Convert hvac_plumbing_top150.json (agent output) → agency/data/demos.json
 * Usage: node scripts/convert-to-demos.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SOURCE = resolve(__dirname, "../../hvac_plumbing_top150.json");
const OUT = resolve(__dirname, "../data/demos.json");

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

function normalizePhone(raw) {
  if (!raw) return null;
  const digits = String(raw).replace(/\D/g, "");
  if (digits.length === 11 && digits[0] === "1") {
    const d = digits.slice(1);
    return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  }
  return String(raw).trim();
}

function buildServiceAreas(city, state) {
  const AREAS = {
    Boston: ["Cambridge", "Somerville", "Brookline", "Newton", "Quincy", "Medford", "Malden"],
    Worcester: ["Shrewsbury", "Westborough", "Northborough", "Grafton", "Auburn", "Millbury"],
    Springfield: ["Chicopee", "Holyoke", "Agawam", "Westfield", "East Longmeadow", "Ludlow"],
    Lowell: ["Chelmsford", "Dracut", "Tewksbury", "Billerica", "Westford"],
    Cambridge: ["Somerville", "Arlington", "Belmont", "Watertown", "Waltham"],
    Roslindale: ["Jamaica Plain", "West Roxbury", "Hyde Park", "Dedham"],
    Chicopee: ["Springfield", "Holyoke", "Ludlow", "Granby", "South Hadley"],
    Providence: ["Cranston", "Pawtucket", "Warwick", "North Providence"],
    Manchester: ["Concord", "Nashua", "Bedford", "Goffstown", "Hooksett"],
    Nashua: ["Manchester", "Merrimack", "Milford", "Amherst", "Hudson"],
    Lynn: ["Saugus", "Swampscott", "Nahant", "Peabody", "Salem"],
    Quincy: ["Milton", "Braintree", "Weymouth", "Randolph", "Canton"],
    Brockton: ["Abington", "Whitman", "Stoughton", "Bridgewater", "Easton"],
    New_Bedford: ["Dartmouth", "Fairhaven", "Acushnet", "Mattapoisett"],
    Fall_River: ["Somerset", "Swansea", "Tiverton", "Westport"],
    Haverhill: ["Methuen", "Lawrence", "North Andover", "Andover"],
    Waltham: ["Watertown", "Newton", "Belmont", "Lexington", "Brookline"],
  };

  const normalizedCity = city.replace(/\s+/g, "_");
  const key = Object.keys(AREAS).find(
    (k) => city.toLowerCase().includes(k.replace(/_/g, " ").toLowerCase())
  );
  if (key) return AREAS[key];
  return [`${city} area`, `Surrounding ${state} communities`];
}

const source = JSON.parse(readFileSync(SOURCE, "utf-8"));
console.log(`Converting ${source.length} companies…`);

const usedSlugs = new Set();
const demos = source.map((r) => {
  const base = slugify(r.businessName);
  let slug = base;
  let i = 2;
  while (usedSlugs.has(slug)) { slug = `${base}-${i++}`; }
  usedSlugs.add(slug);

  return {
    slug,
    businessName: r.businessName,
    phone: normalizePhone(r.phone) || r.phone,
    email: r.email || null,
    address: r.address || "",
    city: r.city || "",
    state: (r.state || "").toUpperCase(),
    zip: r.zip || "",
    industry: r.industry,
    rating: r.rating || 0,
    reviewCount: r.reviewCount || 0,
    reviewQuotes: [],
    services: [],
    serviceAreas: buildServiceAreas(r.city || "", r.state || ""),
    tagline: null,
    yearFounded: null,
    emergencyService: true,
    facebook: r.facebook || null,
    instagram: r.instagram || null,
    hasWebsite: r.hasWebsite,
    existingWebsite: r.website || null,
    score: r.score,
  };
});

writeFileSync(OUT, JSON.stringify(demos, null, 2));
console.log(`\n✅ Wrote ${demos.length} companies to agency/data/demos.json`);
console.log(`   No website: ${demos.filter((d) => !d.hasWebsite).length}`);
console.log(`   Has website: ${demos.filter((d) => d.hasWebsite).length}`);
console.log(`   HVAC: ${demos.filter((d) => d.industry === "hvac").length}`);
console.log(`   Plumbing/Septic: ${demos.filter((d) => d.industry === "plumbing_septic").length}`);
console.log(`   Have email: ${demos.filter((d) => d.email).length}`);
