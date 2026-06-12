import { readFileSync, writeFileSync } from "fs";

const API_KEY = "NzU0NDQ1ZmFjMzdmNGM4YTg5NjBhZDUzZjVhYjU2MmN8YmNhMmQ2MzIyYw";
const BASE_URL = "https://api.app.outscraper.com";

async function fetchReviews(businessName, city, state, limit = 6) {
  const query = `${businessName}, ${city}, ${state}`;
  const url = new URL(`${BASE_URL}/maps/reviews-v3`);
  url.searchParams.set("query", query);
  url.searchParams.set("reviewsLimit", String(limit));
  url.searchParams.set("async", "false");
  url.searchParams.set("fields", "author_title,review_rating,review_text,review_datetime_utc");
  url.searchParams.set("ignoreEmpty", "true");

  const res = await fetch(url.toString(), {
    headers: { "X-API-KEY": API_KEY, "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Outscraper error ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const reviewsData = (data.data ?? []).flat().flatMap((b) => b.reviews_data ?? []);

  return reviewsData
    .filter((r) => r.review_text && r.review_text.trim().length > 20)
    .slice(0, limit)
    .map((r) => ({
      text: r.review_text.trim().slice(0, 300),
      author: r.author_title,
      rating: r.review_rating,
    }));
}

const demos = JSON.parse(readFileSync("./agency/data/demos.json", "utf8"));
const top30 = [...demos].sort((a, b) => b.score - a.score).slice(0, 30);

let updated = 0;
let failed = 0;

for (const contact of top30) {
  // Skip presidential-hvac — already has real reviews
  if (contact.slug === "presidential-hvac") {
    console.log(`~ skipping ${contact.businessName} (already has real reviews)`);
    continue;
  }

  try {
    console.log(`Fetching reviews for ${contact.businessName} (${contact.city}, ${contact.state})...`);
    const reviews = await fetchReviews(contact.businessName, contact.city, contact.state);

    if (reviews.length === 0) {
      console.log(`  ⚠ No reviews found`);
      failed++;
      continue;
    }

    const idx = demos.findIndex((d) => d.slug === contact.slug);
    demos[idx].reviewQuotes = reviews;
    console.log(`  ✓ ${reviews.length} reviews`);
    updated++;

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 500));
  } catch (e) {
    console.error(`  ✗ ${contact.businessName}: ${e.message}`);
    failed++;
  }
}

writeFileSync("./agency/data/demos.json", JSON.stringify(demos, null, 2));
console.log(`\nDone. ${updated} updated, ${failed} failed/skipped.`);
