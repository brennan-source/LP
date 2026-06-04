import { AuditResults, BusinessInput, ScoreCategory, ActionItem, Competitor } from "@/types/audit";
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

// Scale raw revenue loss estimates (calibrated for a ~$500K/yr baseline) to actual business size
const REVENUE_MULTIPLIERS: Record<string, number> = {
  under250k: 0.35,
  "250k_1m": 1.0,
  "1m_5m": 3.2,
  "5m_25m": 9.0,
  over25m: 22.0,
};

export async function runAudit(jobId: string, input: BusinessInput): Promise<AuditResults> {
  const url = normalizeUrl(input.websiteUrl);

  const [website, seo, social, footprint, paidAds, leadCapture, aiSearch, competitors] = await Promise.all([
    auditWebsite(url),
    auditSEO(url, input.businessName, input.city, input.state, input.industry),
    auditSocialMedia(url, input.businessName, input.city, input.state, input.industry),
    auditDigitalFootprint(input.businessName, input.city, input.state, input.industry),
    auditPaidAds(url, input.businessName, input.city, input.industry),
    auditLeadCapture(url, input.phoneNumber),
    auditAISearch(url, input.businessName, input.city, input.industry),
    fetchRealCompetitors(input.industry, input.city, input.state, input.businessName),
  ]);

  const revenueMultiplier = REVENUE_MULTIPLIERS[input.revenueRange ?? "250k_1m"] ?? 1.0;

  const rawCategories = { website, seo, socialMedia: social, digitalFootprint: footprint, paidAds, leadCapture, aiSearch };

  // Scale revenue loss estimates to the actual business size
  const categories = Object.fromEntries(
    Object.entries(rawCategories).map(([k, v]) => [
      k,
      {
        ...v,
        estimatedRevenueLoss: v.estimatedRevenueLoss
          ? Math.round(v.estimatedRevenueLoss * revenueMultiplier)
          : 0,
      },
    ])
  ) as typeof rawCategories;

  const overallScore = Math.round(
    Object.entries(categories).reduce((sum, [key, cat]) => {
      return sum + cat.score * CATEGORY_WEIGHTS[key as ScoreCategory];
    }, 0)
  );

  const competitorAvgScore = Math.round(
    Object.values(categories).reduce((sum, cat) => sum + cat.competitorAvg, 0) /
    Object.values(categories).length
  );

  const estimatedMonthlyRevenueLoss = Object.values(categories).reduce(
    (sum, cat) => sum + (cat.estimatedRevenueLoss || 0),
    0
  );

  const allActions: ActionItem[] = Object.values(categories)
    .flatMap((cat) => cat.actions)
    .sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const topPriorities = allActions.slice(0, 5);

  return {
    jobId,
    businessName: input.businessName,
    websiteUrl: url,
    industry: input.industry,
    city: input.city,
    state: input.state,
    revenueRange: input.revenueRange,
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

async function fetchRealCompetitors(
  industry: string,
  city: string,
  state: string,
  excludeName: string
): Promise<Competitor[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.displayName,places.rating,places.userRatingCount,places.websiteUri",
      },
      body: JSON.stringify({
        textQuery: `${industry} in ${city}, ${state}`,
        maxResultCount: 6,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return [];
    const data = await res.json();
    const excludeLower = excludeName.toLowerCase();

    return ((data.places ?? []) as Array<{
      displayName?: { text?: string };
      rating?: number;
      userRatingCount?: number;
      websiteUri?: string;
    }>)
      .filter((p) => !p.displayName?.text?.toLowerCase().includes(excludeLower.split(" ")[0]))
      .slice(0, 4)
      .map((p) => ({
        name: p.displayName?.text ?? "Local Competitor",
        domain: p.websiteUri
          ? (() => { try { return new URL(p.websiteUri!).hostname.replace(/^www\./, ""); } catch { return ""; } })()
          : "",
        rating: p.rating,
        reviewCount: p.userRatingCount,
      }));
  } catch {
    return [];
  }
}
