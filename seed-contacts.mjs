import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { createId } from "@paralleldrive/cuid2";

const client = createClient({
  url: "libsql://makr-crm-brennan-source.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODExOTQ1NDYsImlkIjoiMDE5ZWI3NzctNjAwMS03YzBhLWJjMTktYzlmOWY3ZjIyODMwIiwicmlkIjoiNTQzYWVkNDMtYWMxZi00MzZmLTllODYtM2Y3ZjkyYTFjZDMxIn0.m9Fzr2CFa2Vur8OSclGwxGqmrD6TECefIMDhN4BhsovkuJjg_vzfVfELJY7P71RCKEmrTh8ozDcsM7_pGD5ZBA",
});

const demos = JSON.parse(readFileSync("./agency/data/demos.json", "utf8"));

// Top 30 by score
const top30 = [...demos].sort((a, b) => b.score - a.score).slice(0, 30);

let inserted = 0;
let skipped = 0;

for (const d of top30) {
  const id = createId();
  const email = d.email || `noemail+${d.slug}@placeholder.makr`;
  const now = new Date().toISOString();

  try {
    await client.execute({
      sql: `INSERT INTO Contact (id, firstName, lastName, email, phone, businessName, industry, city, state, website, stage, source, hasWebsite, weakWebsite, auditScore, previewSlug, previewUrl, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        null,
        null,
        email,
        d.phone || null,
        d.businessName,
        d.industry || null,
        d.city || null,
        d.state || null,
        d.existingWebsite || null,
        "prospect",
        "scraped",
        d.hasWebsite ? 1 : 0,
        0,
        d.score || null,
        d.slug,
        `https://gomakr.ai/demo/${d.slug}`,
        now,
        now,
      ],
    });
    console.log(`✓ ${d.businessName} (${d.city})`);
    inserted++;
  } catch (e) {
    if (e.message.includes("UNIQUE constraint")) {
      console.log(`~ already exists: ${d.businessName}`);
      skipped++;
    } else {
      console.error(`✗ ${d.businessName}: ${e.message}`);
    }
  }
}

console.log(`\nDone. ${inserted} inserted, ${skipped} skipped.`);
