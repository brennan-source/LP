/**
 * Process the HVAC/Plumbing leads Excel file into demo-ready JSON.
 *
 * Usage:
 *   node scripts/process-leads.mjs <path-to-xlsx> [--limit 150]
 *
 * Outputs: data/demos.json
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const XLSX = require("xlsx");
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node scripts/process-leads.mjs <path-to-xlsx>");
  process.exit(1);
}
const limit = parseInt(process.argv[process.argv.indexOf("--limit") + 1] || "150", 10);

// ── helpers ─────────────────────────────────────────────────────────────────

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

const CHAIN_KEYWORDS = [
  "roto-rooter", "roto rooter", "mr. rooter", "mr rooter",
  "mister sparky", "homeserve", "one hour", "benjamin franklin",
  "aire serv", "comfort systems", "service experts",
  "american residential", "carrier", "lennox",
];
function isChain(name) {
  const l = (name || "").toLowerCase();
  return CHAIN_KEYWORDS.some((kw) => l.includes(kw));
}

const HVAC_KEYWORDS = [
  "hvac", "heating", "cooling", "air condition", "ac ", " ac", "furnace",
  "heat pump", "refriger", "climate", "comfort", "mechanical",
];
const PLUMBING_KEYWORDS = [
  "plumb", "drain", "septic", "sewer", "rooter", "pipe", "water heater",
  "well", "hydro",
];

function classifyIndustry(name, category, type) {
  const combined = `${name} ${category} ${type}`.toLowerCase();
  const hvacScore = HVAC_KEYWORDS.filter((k) => combined.includes(k)).length;
  const plumbScore = PLUMBING_KEYWORDS.filter((k) => combined.includes(k)).length;
  if (hvacScore > plumbScore) return "hvac";
  if (plumbScore > hvacScore) return "plumbing_septic";
  // default to hvac if tie (most in this dataset are HVAC)
  return "hvac";
}

function scoreCompany(row) {
  let score = 0;
  if (!row.website) score += 3;
  const rating = parseFloat(row.rating) || 0;
  if (rating >= 4.5) score += 2;
  else if (rating >= 4.0) score += 1;
  const reviews = parseInt(row.reviews) || 0;
  if (reviews >= 50 && reviews <= 300) score += 2;
  else if ((reviews >= 25 && reviews < 50) || (reviews > 300 && reviews <= 500)) score += 1;
  if (row.email) score += 1;
  const state = (row.state || "").toUpperCase();
  if (state === "MA" || state === "RI") score += 1;
  return score;
}

function buildServiceAreas(city, state) {
  const MA_AREAS = {
    Boston: ["Cambridge", "Somerville", "Brookline", "Newton", "Quincy", "Medford", "Malden"],
    Worcester: ["Shrewsbury", "Westborough", "Northborough", "Grafton", "Auburn", "Millbury"],
    Springfield: ["Chicopee", "Holyoke", "Agawam", "Westfield", "East Longmeadow", "Ludlow"],
    Lowell: ["Chelmsford", "Dracut", "Tewksbury", "Billerica", "Westford"],
    Cambridge: ["Somerville", "Arlington", "Belmont", "Watertown", "Waltham"],
    Providence: ["Cranston", "Pawtucket", "Warwick", "North Providence"],
    Manchester: ["Concord", "Nashua", "Bedford", "Goffstown", "Hooksett"],
  };
  const key = Object.keys(MA_AREAS).find((k) => city.toLowerCase().includes(k.toLowerCase()));
  if (key) return MA_AREAS[key];
  // Generic fallback
  return [`${city} area`, `${state} surrounding towns`];
}

// ── main ─────────────────────────────────────────────────────────────────────

console.log(`Reading ${filePath}…`);
const workbook = XLSX.readFile(resolve(filePath));
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
console.log(`  ${rows.length} total rows`);

// Normalize column names (Outscraper export can vary)
const normalized = rows.map((r) => {
  const get = (...keys) => {
    for (const k of keys) {
      const found = Object.keys(r).find((rk) => rk.toLowerCase() === k.toLowerCase());
      if (found && r[found]) return String(r[found]).trim();
    }
    return "";
  };
  return {
    name:      get("name", "business_name", "company_name"),
    phone:     get("phone", "phone_number", "company_phone", "contact_phone"),
    email:     get("email", "company_email"),
    website:   get("website", "domain"),
    address:   get("street", "address", "full_address"),
    city:      get("city"),
    state:     get("state_code", "state"),
    zip:       get("postal_code", "zip", "zip_code"),
    category:  get("category", "type", "industry"),
    rating:    get("rating", "average_rating"),
    reviews:   get("reviews", "reviews_count", "review_count"),
    facebook:  get("company_facebook", "facebook"),
    instagram: get("company_instagram", "instagram"),
    yearFounded: get("founded_year", "year_founded"),
    latitude:  get("latitude"),
    longitude: get("longitude"),
  };
});

const TARGET_STATES = new Set(["MA", "NH", "RI", "ME", "CT", "VT"]);

const filtered = normalized.filter((r) => {
  if (!r.name) return false;
  if (isChain(r.name)) return false;
  if (!TARGET_STATES.has(r.state.toUpperCase())) return false;
  const rating = parseFloat(r.rating) || 0;
  if (rating > 0 && rating < 3.5) return false; // skip very low rated
  return true;
});
console.log(`  ${filtered.length} after filtering (chains, states, low ratings removed)`);

const scored = filtered.map((r) => ({ ...r, score: scoreCompany(r) }));
scored.sort((a, b) => b.score - a.score);

const top = scored.slice(0, limit);

// De-duplicate slugs
const usedSlugs = new Set();
const demos = top.map((r) => {
  const base = slugify(r.name);
  let slug = base;
  let i = 2;
  while (usedSlugs.has(slug)) { slug = `${base}-${i++}`; }
  usedSlugs.add(slug);

  const industry = classifyIndustry(r.name, r.category, "");
  const serviceAreas = buildServiceAreas(r.city, r.state);

  return {
    slug,
    businessName: r.name,
    phone: normalizePhone(r.phone) || r.phone,
    email: r.email || null,
    address: r.address,
    city: r.city,
    state: r.state.toUpperCase(),
    zip: r.zip,
    industry,
    rating: parseFloat(r.rating) || 0,
    reviewCount: parseInt(r.reviews) || 0,
    reviewQuotes: [],        // populated by enrich-reviews script
    services: [],            // defaults applied at render time
    serviceAreas,
    tagline: null,
    yearFounded: r.yearFounded ? parseInt(r.yearFounded) || null : null,
    emergencyService: true,  // assumed for HVAC/plumbing; overridden by enrich
    facebook: r.facebook || null,
    instagram: r.instagram || null,
    hasWebsite: !!r.website,
    existingWebsite: r.website || null,
    score: r.score,
  };
});

const outPath = resolve(__dirname, "../data/demos.json");
writeFileSync(outPath, JSON.stringify(demos, null, 2));
console.log(`\n✅ Wrote ${demos.length} companies to data/demos.json`);
console.log(`   No website: ${demos.filter((d) => !d.hasWebsite).length}`);
console.log(`   Has website: ${demos.filter((d) => d.hasWebsite).length}`);
console.log(`   HVAC: ${demos.filter((d) => d.industry === "hvac").length}`);
console.log(`   Plumbing/Septic: ${demos.filter((d) => d.industry === "plumbing_septic").length}`);
console.log(`   Have email: ${demos.filter((d) => d.email).length}`);
