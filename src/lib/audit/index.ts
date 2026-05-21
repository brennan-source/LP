import { AuditResults, BusinessInput, ScoreCategory, ActionItem } from "@/types/audit";
import { scoreToGrade } from "@/lib/utils";
import { auditWebsite } from "./website";
import { auditSEO } from "./seo";
import { auditSocialMedia } from "./social";
import { auditDigitalFootprint } from "./digitalFootprint";
import { auditPaidAds } from "./paidAds";
import { auditLeadCapture } from "./leadCapture";
import { auditAISearch } from "./aiSearch";
import { normalizeUrl } from "@/lib/utils";

const CATEGORY_WEIGHTS: Record<ScoreCategory, number> = {
  website: 0.20,
  seo: 0.22,
  digitalFootprint: 0.15,
  socialMedia: 0.12,
  leadCapture: 0.16,
  paidAds: 0.10,
  aiSearch: 0.05,
};

export async function runAudit(jobId: string, input: BusinessInput): Promise<AuditResults> {
  const url = normalizeUrl(input.websiteUrl);

  // Run all audits in parallel
  const [website, seo, social, footprint, paidAds, leadCapture, aiSearch] = await Promise.all([
    auditWebsite(url),
    auditSEO(url, input.businessName, input.city, input.state, input.industry),
    auditSocialMedia(url, input.businessName),
    auditDigitalFootprint(input.businessName, input.city, input.state, input.industry),
    auditPaidAds(url, input.businessName, input.city, input.industry),
    auditLeadCapture(url, input.phoneNumber),
    auditAISearch(url, input.businessName, input.city, input.industry),
  ]);

  const categories = {
    website,
    seo,
    socialMedia: social,
    digitalFootprint: footprint,
    paidAds,
    leadCapture,
    aiSearch,
  };

  // Weighted overall score
  const overallScore = Math.round(
    Object.entries(categories).reduce((sum, [key, cat]) => {
      return sum + cat.score * CATEGORY_WEIGHTS[key as ScoreCategory];
    }, 0)
  );

  // Competitor average (slightly lower to show value)
  const competitorAvgScore = Math.round(
    Object.values(categories).reduce((sum, cat) => sum + cat.competitorAvg, 0) /
    Object.values(categories).length
  );

  // Total estimated monthly revenue loss
  const estimatedMonthlyRevenueLoss = Object.values(categories).reduce(
    (sum, cat) => sum + (cat.estimatedRevenueLoss || 0),
    0
  );

  // Collect and prioritize all actions
  const allActions: ActionItem[] = Object.values(categories)
    .flatMap((cat) => cat.actions)
    .sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const topPriorities = allActions.slice(0, 5);

  // Simulated competitor data for the report
  const competitors = generateCompetitorBenchmarks(input.industry, input.city, overallScore);

  return {
    jobId,
    businessName: input.businessName,
    websiteUrl: url,
    industry: input.industry,
    city: input.city,
    state: input.state,
    overallScore,
    overallGrade: scoreToGrade(overallScore),
    competitorAvgScore,
    estimatedMonthlyRevenueLoss,
    categories,
    competitors,
    topPriorities,
    completedAt: new Date().toISOString(),
  };
}

function generateCompetitorBenchmarks(industry: string, city: string, businessScore: number) {
  // Generate realistic competitor data based on business score
  // In production, this would use actual competitor discovery
  const spread = [-15, -8, 5, 12, 20];
  return spread.map((offset, i) => ({
    name: `${city} ${industry} Competitor ${i + 1}`,
    domain: `competitor${i + 1}.com`,
    scores: {
      website: Math.min(100, Math.max(20, businessScore + offset + Math.floor(Math.random() * 10))),
      seo: Math.min(100, Math.max(20, businessScore + offset + Math.floor(Math.random() * 10))),
      socialMedia: Math.min(100, Math.max(10, businessScore + offset - 5 + Math.floor(Math.random() * 15))),
    },
  }));
}
