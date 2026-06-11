import { createClient } from "@libsql/client";

const client = createClient({
  url: "libsql://makr-crm-brennan-source.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODExOTQ1NDYsImlkIjoiMDE5ZWI3NzctNjAwMS03YzBhLWJjMTktYzlmOWY3ZjIyODMwIiwicmlkIjoiNTQzYWVkNDMtYWMxZi00MzZmLTllODYtM2Y3ZjkyYTFjZDMxIn0.m9Fzr2CFa2Vur8OSclGwxGqmrD6TECefIMDhN4BhsovkuJjg_vzfVfELJY7P71RCKEmrTh8ozDcsM7_pGD5ZBA",
});

const statements = [
  `CREATE TABLE IF NOT EXISTS "Contact" ("id" TEXT NOT NULL PRIMARY KEY,"firstName" TEXT,"lastName" TEXT,"email" TEXT NOT NULL,"phone" TEXT,"businessName" TEXT,"industry" TEXT,"city" TEXT,"state" TEXT,"website" TEXT,"stage" TEXT NOT NULL DEFAULT 'prospect',"source" TEXT NOT NULL DEFAULT 'scraped',"tags" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" DATETIME NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS "ContactProduct" ("id" TEXT NOT NULL PRIMARY KEY,"contactId" TEXT NOT NULL,"product" TEXT NOT NULL,"status" TEXT NOT NULL DEFAULT 'prospect',"paidAt" DATETIME,"valuecents" INTEGER,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" DATETIME NOT NULL,CONSTRAINT "ContactProduct_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
  `CREATE TABLE IF NOT EXISTS "Note" ("id" TEXT NOT NULL PRIMARY KEY,"contactId" TEXT NOT NULL,"content" TEXT NOT NULL,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,CONSTRAINT "Note_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
  `CREATE TABLE IF NOT EXISTS "Activity" ("id" TEXT NOT NULL PRIMARY KEY,"contactId" TEXT NOT NULL,"type" TEXT NOT NULL,"description" TEXT,"metadata" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,CONSTRAINT "Activity_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
  `CREATE TABLE IF NOT EXISTS "Campaign" ("id" TEXT NOT NULL PRIMARY KEY,"name" TEXT NOT NULL,"subject" TEXT NOT NULL,"body" TEXT NOT NULL,"status" TEXT NOT NULL DEFAULT 'draft',"sentCount" INTEGER NOT NULL DEFAULT 0,"type" TEXT NOT NULL DEFAULT 'email',"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" DATETIME NOT NULL)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Contact_email_key" ON "Contact"("email")`,
  `ALTER TABLE "Contact" ADD COLUMN "linkedinUrl" TEXT`,
  `ALTER TABLE "Contact" ADD COLUMN "hasWebsite" INTEGER NOT NULL DEFAULT 1`,
  `ALTER TABLE "Contact" ADD COLUMN "weakWebsite" INTEGER NOT NULL DEFAULT 0`,
  `ALTER TABLE "Contact" ADD COLUMN "auditScore" INTEGER`,
  `ALTER TABLE "Contact" ADD COLUMN "previewSlug" TEXT`,
  `ALTER TABLE "Contact" ADD COLUMN "previewUrl" TEXT`,
  `ALTER TABLE "Contact" ADD COLUMN "postcardSentAt" TEXT`,
  `ALTER TABLE "Contact" ADD COLUMN "previewVisitedAt" TEXT`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Contact_previewSlug_key" ON "Contact"("previewSlug")`,
  `CREATE TABLE IF NOT EXISTS "Client" ("id" TEXT NOT NULL PRIMARY KEY,"contactId" TEXT NOT NULL UNIQUE,"tier" TEXT NOT NULL,"monthlyRate" INTEGER NOT NULL,"startDate" TEXT NOT NULL,"framerUrl" TEXT,"domain" TEXT,"status" TEXT NOT NULL DEFAULT 'active',"notes" TEXT,"createdAt" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),"updatedAt" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),CONSTRAINT "Client_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
  `CREATE TABLE IF NOT EXISTS "Review" ("id" TEXT NOT NULL PRIMARY KEY,"contactId" TEXT NOT NULL,"authorName" TEXT NOT NULL,"rating" INTEGER NOT NULL,"text" TEXT NOT NULL,"publishedAt" TEXT,"source" TEXT NOT NULL DEFAULT 'google',"createdAt" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),CONSTRAINT "Review_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
];

for (const sql of statements) {
  try {
    await client.execute(sql);
    console.log("✓", sql.slice(0, 60));
  } catch (e) {
    if (e.message.includes("already exists") || e.message.includes("duplicate column")) {
      console.log("~ already exists, skipping:", sql.slice(0, 60));
    } else {
      console.error("✗", sql.slice(0, 60));
      console.error("  ", e.message);
    }
  }
}

console.log("\nDone. Verifying tables...");
const result = await client.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
console.log("Tables:", result.rows.map(r => r.name).join(", "));
