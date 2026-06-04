/**
 * Fetch real Google reviews via Places API (maps.googleapis.com — same key as PageSpeed).
 *
 * Prerequisites (one-time):
 *   1. Go to https://console.cloud.google.com/apis/library/places-backend.googleapis.com
 *   2. Enable "Places API" on the same project as your PageSpeed key
 *   3. That's it — same key works
 *
 * Usage:
 *   GOOGLE_PLACES_KEY=your_key node scripts/fetch-google-reviews.mjs
 *   GOOGLE_PLACES_KEY=your_key node scripts/fetch-google-reviews.mjs --limit 20
 *
 * Cost: ~$0.032/company (text search + details) → ~$4.80 for all 150.
 *       Free tier covers 28,500 calls/month — runs free if your project is new.
 * Safe to re-run: skips companies that already have reviews.
 *
 * Updates data/demos.json in-place.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/demos.json");

const API_KEY = process.env.GOOGLE_PLACES_KEY;
if (!API_KEY) {
  console.error("❌  Set GOOGLE_PLACES_KEY — it's the same key as PAGESPEED_API_KEY if Places API is enabled.");
  console.error("    Enable at: https://console.cloud.google.com/apis/library/places-backend.googleapis.com");
  process.exit(1);
}

const limitArg = process.argv.indexOf("--limit");
const LIMIT = limitArg !== -1 ? parseInt(process.argv[limitArg + 1]) : Infinity;
const BASE = "https://maps.googleapis.com/maps/api/place";

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function findPlaceId(businessName, city, state) {
  const query = encodeURIComponent(`${businessName} ${city} ${state}`);
  const url = `${BASE}/textsearch/json?query=${query}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    throw new Error(`textsearch: ${data.status} — ${data.error_message ?? ""}`);
  }
  return data.results?.[0]?.place_id ?? null;
}

async function fetchReviews(placeId) {
  const fields = "name,rating,reviews";
  const url = `${BASE}/details/json?place_id=${placeId}&fields=${fields}&reviews_sort=newest&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK") {
    throw new Error(`details: ${data.status} — ${data.error_message ?? ""}`);
  }
  return (data.result?.reviews ?? [])
    .filter(r => r.rating >= 4 && (r.text?.length ?? 0) > 40)
    .slice(0, 3)
    .map(r => ({
      text: r.text.replace(/\n+/g, " ").replace(/^["'"]+|["'"]+$/g, "").trim().slice(0, 500),
      author: r.author_name || "Google Reviewer",
      rating: Math.min(5, Math.max(1, r.rating)),
    }));
}

async function main() {
  const demos = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const todo = demos.filter(d => !d.reviewQuotes?.length).slice(0, LIMIT);
  console.log(`Fetching Google reviews for ${todo.length} companies…\n`);

  let found = 0, missing = 0, errors = 0;

  for (const demo of todo) {
    try {
      const placeId = await findPlaceId(demo.businessName, demo.city, demo.state);
      if (!placeId) {
        console.log(`  ⚪ Not found: ${demo.businessName}`);
        missing++;
        await sleep(200);
        continue;
      }
      const reviews = await fetchReviews(placeId);
      const idx = demos.findIndex(d => d.slug === demo.slug);
      demos[idx].reviewQuotes = reviews;

      if (reviews.length > 0) {
        console.log(`  ✅ ${demo.businessName} — ${reviews.length} review(s)`);
        found++;
      } else {
        console.log(`  ⚠️  ${demo.businessName} — no 4★+ reviews returned`);
        missing++;
      }
    } catch (err) {
      console.log(`  ❌ ${demo.businessName} — ${err.message.slice(0, 80)}`);
      errors++;
    }
    await sleep(250);
  }

  writeFileSync(DATA_PATH, JSON.stringify(demos, null, 2));
  console.log(`\n✅ Done. ${found} got reviews · ${missing} not found · ${errors} errors`);
  const cost = (todo.length * 0.032).toFixed(2);
  console.log(`   Est. cost: $${cost} (free if within monthly quota)`);
}

main().catch(console.error);
