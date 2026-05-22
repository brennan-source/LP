-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'scanning',
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "stripeSessionId" TEXT,
    "businessName" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "industry" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "teamSize" TEXT NOT NULL,
    "revenueRange" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "scanResults" TEXT,
    "quizAnswers" TEXT,
    "report" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Assessment_stripeSessionId_key" ON "Assessment"("stripeSessionId");
