/**
 * Enrich demos.json with review quotes scraped from each company's existing website.
 * Skips companies with no existing website.
 *
 * Usage:
 *   node scripts/enrich-reviews.mjs
 *
 * Updates data/demos.json in-place.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/demos.json");

const REVIEW_PATTERNS = [
  // Common testimonial selectors (regex on HTML)
  /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,
  /class="[^"]*(?:testimonial|review|quote)[^"]*"[^>]*>([\s\S]*?)<\/(?:div|p|li|article)>/gi,
  /<p[^>]*class="[^"]*(?:testimonial|review|quote)[^"]*"[^>]*>([\s\S]*?)<\/p>/gi,
];

const AUTHOR_PATTERNS = [
  /—\s*([A-Z][a-z]+ [A-Z][a-z.]+)/g,
  /–\s*([A-Z][a-z]+ [A-Z][a-z.]+)/g,
  /<(?:cite|strong|b)[^>]*>\s*([A-Z][a-z]+ [A-Z][a-z.]*)\s*<\/(?:cite|strong|b)>/g,
  /class="[^"]*(?:author|name|attribution)[^"]*"[^>]*>\s*([^<]{3,40})\s*</g,
];

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractReviews(html, maxQuotes = 3) {
  const quotes = [];
  for (const pattern of REVIEW_PATTERNS) {
    let match;
    const re = new RegExp(pattern.source, pattern.flags);
    while ((match = re.exec(html)) !== null && quotes.length < maxQuotes) {
      const text = stripHtml(match[1]);
      if (text.length > 40 && text.length < 600 && !text.toLowerCase().includes("cookie")) {
        // Try to extract author
        let author = "Verified Customer";
        for (const ap of AUTHOR_PATTERNS) {
          const am = new RegExp(ap.source, ap.flags).exec(match[0] + match[1]);
          if (am) { author = am[1].trim(); break; }
        }
        quotes.push({ text: text.replace(/^["'"]+|["'"]+$/g, "").trim(), author, rating: 5 });
      }
    }
    if (quotes.length >= maxQuotes) break;
  }
  return quotes;
}

async function fetchWithTimeout(url, ms = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Makr-Demo-Bot/1.0)" },
    });
    return await res.text();
  } finally {
    clearTimeout(id);
  }
}

async function enrichCompany(demo) {
  if (!demo.existingWebsite) return demo;
  if (demo.reviewQuotes && demo.reviewQuotes.length > 0) return demo; // already done

  let url = demo.existingWebsite;
  if (!url.startsWith("http")) url = "https://" + url;

  try {
    console.log(`  Fetching ${url}…`);
    const html = await fetchWithTimeout(url);
    const quotes = extractReviews(html);

    // Also try /testimonials or /reviews page
    if (quotes.length === 0) {
      for (const path of ["/testimonials", "/reviews", "/about"]) {
        try {
          const subHtml = await fetchWithTimeout(new URL(path, url).href);
          const subQuotes = extractReviews(subHtml);
          if (subQuotes.length > 0) { quotes.push(...subQuotes); break; }
        } catch { /* skip */ }
      }
    }

    if (quotes.length > 0) {
      console.log(`    Found ${quotes.length} review quote(s)`);
      return { ...demo, reviewQuotes: quotes.slice(0, 3) };
    }
  } catch (err) {
    console.log(`    Skipped (${err.message.slice(0, 50)})`);
  }
  return demo;
}

async function main() {
  const demos = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  console.log(`Enriching ${demos.length} demos with review quotes…\n`);

  const enriched = [];
  for (const demo of demos) {
    enriched.push(await enrichCompany(demo));
    // Polite delay between requests
    await new Promise((r) => setTimeout(r, 800));
  }

  const withQuotes = enriched.filter((d) => d.reviewQuotes.length > 0).length;
  writeFileSync(DATA_PATH, JSON.stringify(enriched, null, 2));
  console.log(`\n✅ Done. ${withQuotes}/${enriched.length} companies now have review quotes.`);
}

main().catch(console.error);
