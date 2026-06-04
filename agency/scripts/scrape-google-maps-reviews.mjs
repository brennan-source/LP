/**
 * Scrape real Google Maps reviews using Playwright (runs locally, no API key).
 *
 * Usage:
 *   npm install playwright   # first time only
 *   npx playwright install chromium  # first time only
 *   node scripts/scrape-google-maps-reviews.mjs           # all companies
 *   node scripts/scrape-google-maps-reviews.mjs --limit 20  # first 20
 *
 * Updates data/demos.json in-place. Safe to re-run (skips already-done).
 * Takes ~8 seconds/company → ~20 min for all 150, ~3 min for 20.
 */

import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/demos.json");

const limitArg = process.argv.indexOf("--limit");
const LIMIT = limitArg !== -1 ? parseInt(process.argv[limitArg + 1]) : Infinity;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function findAndScrapeReviews(page, demo) {
  const query = encodeURIComponent(`${demo.businessName} ${demo.city} ${demo.state}`);
  await page.goto(`https://www.google.com/maps/search/${query}`, {
    waitUntil: "domcontentloaded",
    timeout: 20000,
  });
  await sleep(2500);

  // Accept consent dialog if it appears (EU)
  const consent = page.locator('button:has-text("Accept all"), button:has-text("Reject all")').first();
  if (await consent.isVisible({ timeout: 2000 }).catch(() => false)) {
    await consent.click();
    await sleep(1000);
  }

  // If search returned a list, click the first result
  const firstResult = page.locator('[role="article"]').first();
  if (await firstResult.isVisible({ timeout: 3000 }).catch(() => false)) {
    await firstResult.click();
    await sleep(2500);
  }

  // Click the Reviews tab
  const reviewsTab = page.locator('button[aria-label*="review" i], button:has-text("Reviews")').first();
  if (!await reviewsTab.isVisible({ timeout: 3000 }).catch(() => false)) {
    return [];
  }
  await reviewsTab.click();
  await sleep(2000);

  // Sort by "Newest" to get recent reviews
  const sortBtn = page.locator('button[aria-label*="Sort" i], button:has-text("Sort")').first();
  if (await sortBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await sortBtn.click();
    await sleep(800);
    const newestOpt = page.locator('[role="menuitem"]:has-text("Newest"), [role="option"]:has-text("Newest")').first();
    if (await newestOpt.isVisible({ timeout: 1500 }).catch(() => false)) {
      await newestOpt.click();
      await sleep(1500);
    }
  }

  // Expand "More" links
  for (const moreBtn of await page.locator('button:has-text("More"), button[aria-label*="See more"]').all()) {
    await moreBtn.click().catch(() => {});
    await sleep(300);
  }

  // Extract review cards
  const reviewCards = await page.locator('[data-review-id], [jsaction*="review"]').all();
  const reviews = [];

  for (const card of reviewCards.slice(0, 5)) {
    try {
      // Star rating — count filled stars
      const stars = await card.locator('[aria-label*="star" i]').first().getAttribute("aria-label").catch(() => "");
      const starMatch = stars.match(/(\d)/);
      const rating = starMatch ? parseInt(starMatch[1]) : 5;
      if (rating < 4) continue;

      // Review text
      const textEl = card.locator('[class*="wiI7pd"], [data-expandable-section] span, .MyEned span').first();
      const text = (await textEl.textContent().catch(() => "")).trim();
      if (text.length < 40) continue;

      // Author name
      const authorEl = card.locator('[class*="d4r55"], .WNxzHc .al6Kxe, [class*="X43Kjb"]').first();
      const author = (await authorEl.textContent().catch(() => "Verified Customer")).trim() || "Verified Customer";

      reviews.push({
        text: text.replace(/^["'"]+|["'"]+$/g, "").trim().slice(0, 500),
        author,
        rating: Math.min(5, Math.max(1, rating)),
      });

      if (reviews.length >= 3) break;
    } catch { /* skip malformed card */ }
  }

  return reviews;
}

async function main() {
  const demos = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const todo = demos.filter(d => !d.reviewQuotes?.length).slice(0, LIMIT);
  console.log(`Scraping Google Maps reviews for ${todo.length} companies…\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  let found = 0, skipped = 0;

  for (const demo of todo) {
    try {
      const reviews = await findAndScrapeReviews(page, demo);
      const idx = demos.findIndex(d => d.slug === demo.slug);
      demos[idx].reviewQuotes = reviews;

      if (reviews.length > 0) {
        console.log(`  ✅ ${demo.businessName} — ${reviews.length} review(s)`);
        found++;
      } else {
        console.log(`  ⚪ ${demo.businessName} — none found`);
        skipped++;
      }
    } catch (err) {
      console.log(`  ❌ ${demo.businessName} — ${err.message.slice(0, 60)}`);
      skipped++;
    }

    // Polite pause between companies
    await sleep(1200);
  }

  await browser.close();
  writeFileSync(DATA_PATH, JSON.stringify(demos, null, 2));

  console.log(`\n✅ Done.`);
  console.log(`   ${found} companies now have real Google reviews`);
  console.log(`   ${skipped} not found or no qualifying reviews`);
}

main().catch(console.error);
