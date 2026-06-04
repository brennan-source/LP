/**
 * Fetch real Google reviews for each company using the Places API (New).
 *
 * Usage:
 *   GOOGLE_PLACES_KEY=your_key node scripts/fetch-google-reviews.mjs
 *   GOOGLE_PLACES_KEY=your_key node scripts/fetch-google-reviews.mjs --limit 20
 *
 * Cost: ~$0.017/place detail call → ~$2.55 for all 150 companies.
 * Only fetches companies without reviews yet (safe to re-run).
 *
 * Requires: Places API (New) enabled in Google Cloud Console.
 * Key: https://console.cloud.google.com/apis/library/places-backend.googleapis.com
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
  console.error("❌  Set GOOGLE_PLACES_KEY env var first.");
  console.error("    Get one at: https://console.cloud.google.com/apis/library/places-backend.googleapis.com");
  process.exit(1);
}

const limitArg = process.argv.indexOf("--limit");
const LIMIT = limitArg !== -1 ? parseInt(process.argv[limitArg + 1]) : Infinity;

// ── Step 1: Find Place ID by text search ────────────────────────────────────

async function findPlaceId(businessName, city, state) {
  const query = `${businessName} ${city} ${state}`;
  const url = `https://places.googleapis.com/v1/places:searchText`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
    },
    body: JSON.stringify({ textQuery: query, maxResultCount: 1 }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`searchText failed: ${res.status} ${err.slice(0, 100)}`);
  }
  const data = await res.json();
  const place = data.places?.[0];
  if (!place) return null;
  return place.id; // e.g. "places/ChIJ..."
}

// ── Step 2: Fetch reviews for a Place ID ────────────────────────────────────

async function fetchReviews(placeId, maxReviews = 3) {
  const url = `https://places.googleapis.com/v1/${placeId}`;
  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": "reviews,rating,userRatingCount",
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`getPlace failed: ${res.status} ${err.slice(0, 100)}`);
  }
  const data = await res.json();
  const raw = (data.reviews || []).slice(0, maxReviews);

  return raw
    .filter((r) => r.rating >= 4 && r.text?.text?.length > 40)
    .map((r) => ({
      text: r.text.text
        .replace(/\n+/g, " ")
        .replace(/^["'"]+|["'"]+$/g, "")
        .trim()
        .slice(0, 500),
      author: r.authorAttribution?.displayName || "Google Reviewer",
      rating: Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5,
    }));
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function main() {
  const demos = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const needsReviews = demos.filter((d) => !d.reviewQuotes || d.reviewQuotes.length === 0);
  const toProcess = needsReviews.slice(0, LIMIT);

  console.log(`${needsReviews.length} companies without reviews — processing ${toProcess.length}…\n`);

  let found = 0;
  let notFound = 0;
  let errors = 0;

  for (const demo of toProcess) {
    try {
      const placeId = await findPlaceId(demo.businessName, demo.city, demo.state);
      if (!placeId) {
        console.log(`  ⚪ Not found: ${demo.businessName}`);
        notFound++;
        await sleep(200);
        continue;
      }

      const reviews = await fetchReviews(placeId);
      const idx = demos.findIndex((d) => d.slug === demo.slug);
      demos[idx].reviewQuotes = reviews;

      if (reviews.length > 0) {
        console.log(`  ✅ ${demo.businessName} → ${reviews.length} review(s)`);
        found++;
      } else {
        console.log(`  ⚠️  ${demo.businessName} → place found but no 4+ star reviews`);
        notFound++;
      }
    } catch (err) {
      console.log(`  ❌ ${demo.businessName}: ${err.message.slice(0, 80)}`);
      errors++;
    }
    await sleep(300); // ~3 req/sec, well within quota
  }

  writeFileSync(DATA_PATH, JSON.stringify(demos, null, 2));
  console.log(`\n✅ Done.`);
  console.log(`   ${found} companies got real Google reviews`);
  console.log(`   ${notFound} not found or no qualifying reviews`);
  console.log(`   ${errors} errors`);
  console.log(`   Estimated cost: $${(toProcess.length * 0.017).toFixed(2)}`);
}

main().catch(console.error);
