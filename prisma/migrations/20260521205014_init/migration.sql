-- CreateTable
CREATE TABLE "AuditJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "businessName" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "industry" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "stripeSessionId" TEXT,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "results" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AuditJob_stripeSessionId_key" ON "AuditJob"("stripeSessionId");
