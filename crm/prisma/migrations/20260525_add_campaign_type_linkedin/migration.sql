-- Add campaign type (email | linkedin | call) and LinkedIn URL to Contact

ALTER TABLE "Campaign" ADD COLUMN "type" TEXT NOT NULL DEFAULT 'email';
ALTER TABLE "Contact" ADD COLUMN "linkedinUrl" TEXT;
