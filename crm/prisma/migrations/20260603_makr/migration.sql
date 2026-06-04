-- Add outreach/postcard campaign fields to Contact
ALTER TABLE "Contact" ADD COLUMN "hasWebsite" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "Contact" ADD COLUMN "weakWebsite" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Contact" ADD COLUMN "auditScore" INTEGER;
ALTER TABLE "Contact" ADD COLUMN "previewSlug" TEXT UNIQUE;
ALTER TABLE "Contact" ADD COLUMN "previewUrl" TEXT;
ALTER TABLE "Contact" ADD COLUMN "postcardSentAt" TEXT;
ALTER TABLE "Contact" ADD COLUMN "previewVisitedAt" TEXT;

-- Add Client model
CREATE TABLE "Client" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "contactId" TEXT NOT NULL UNIQUE,
  "tier" TEXT NOT NULL,
  "monthlyRate" INTEGER NOT NULL,
  "startDate" TEXT NOT NULL,
  "framerUrl" TEXT,
  "domain" TEXT,
  "status" TEXT NOT NULL DEFAULT 'active',
  "notes" TEXT,
  "createdAt" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  "updatedAt" TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  CONSTRAINT "Client_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
