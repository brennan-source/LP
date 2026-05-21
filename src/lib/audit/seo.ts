import { CategoryScore } from "@/types/audit";
import { scoreToGrade, extractDomain } from "@/lib/utils";

export async function auditSEO(url: string, businessName: string, city: string, state: string, industry: string): Promise<CategoryScore> {
  const [siteData, serpData] = await Promise.all([
    fetchSiteMetadata(url),
    checkSerpPresence(businessName, city, state, industry),
  ]);

  let score = 0;
  const details: string[] = [];
  const actions = [];

  // Title tag (10 pts)
  if (siteData.hasTitle && siteData.titleLength >= 30 && siteData.titleLength <= 60) {
    score += 10;
    details.push("✓ Good page title tag");
  } else if (siteData.hasTitle) {
    score += 5;
    details.push("⚠ Title tag exists but could be optimized");
  } else {
    details.push("✗ Missing title tag — Google doesn't know what your page is about");
    actions.push({
      priority: "critical" as const,
      title: "Add optimized title tags",
      description: "Your page has no title tag. This is one of the most important SEO elements.",
      estimatedImpact: "Direct Google ranking factor",
      tool2Upsell: "SEO Foundation Fix",
    });
  }

  // Meta description (10 pts)
  if (siteData.hasMetaDesc) {
    score += 10;
    details.push("✓ Meta description present");
  } else {
    details.push("✗ No meta description — Google may use random text in search results");
    actions.push({
      priority: "high" as const,
      title: "Write meta descriptions for all pages",
      description: "Control what searchers see about your business in Google results.",
      estimatedImpact: "Up to 30% higher click-through rate",
      tool2Upsell: "SEO Foundation Fix",
    });
  }

  // Local schema markup (15 pts)
  if (siteData.hasLocalSchema) {
    score += 15;
    details.push("✓ Local business schema markup detected");
  } else {
    details.push("✗ No local business schema — Google doesn't have structured data about your business");
    actions.push({
      priority: "high" as const,
      title: "Add LocalBusiness schema markup",
      description: "Tell Google exactly who you are, where you are, and what you do — this directly improves local search rankings.",
      estimatedImpact: "Significant local ranking improvement",
      tool2Upsell: "Local SEO Accelerator",
    });
  }

  // SERP presence (25 pts)
  if (serpData.ranksLocally) {
    score += 25;
    details.push(`✓ Ranking in Google for local ${industry} searches`);
  } else {
    details.push(`✗ Not found in top Google results for local ${industry} searches`);
    actions.push({
      priority: "critical" as const,
      title: `Rank on Google for '${industry} in ${city}'`,
      description: "Your competitors are capturing all the search traffic in your market. Every day costs you leads.",
      estimatedImpact: "The #1 Google result gets 28% of all clicks",
      tool2Upsell: "Local SEO Accelerator",
    });
  }

  // Backlinks/authority (20 pts)
  score += 10; // baseline (hard to measure without paid API)
  details.push("⚠ Domain authority analysis requires premium data (estimated baseline)");

  // Page count / content depth (20 pts)
  if (siteData.seemsContentRich) {
    score += 20;
    details.push("✓ Site appears to have solid content depth");
  } else {
    score += 5;
    details.push("⚠ Thin content — more pages and blog content would boost rankings");
    actions.push({
      priority: "medium" as const,
      title: "Build out your content and service pages",
      description: "Google rewards sites with helpful, detailed content. Add service pages, FAQs, and a blog.",
      estimatedImpact: "More pages = more entry points from Google",
      tool2Upsell: "AI Content Engine",
    });
  }

  const finalScore = Math.min(100, Math.round(score));

  return {
    score: finalScore,
    grade: scoreToGrade(finalScore),
    label: "SEO",
    summary: getSEOSummary(finalScore, city, industry),
    details,
    competitorAvg: 52,
    estimatedRevenueLoss: finalScore < 60 ? Math.round((70 - finalScore) * 120) : 0,
    actions,
  };
}

async function fetchSiteMetadata(url: string) {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LeadScoreBot/1.0)" },
    });
    const html = await res.text();

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    const hasLocalSchema = html.includes('"LocalBusiness"') || html.includes('"localBusiness"') || html.includes("LocalBusiness");

    return {
      hasTitle: !!titleMatch,
      titleLength: titleMatch ? titleMatch[1].trim().length : 0,
      hasMetaDesc: !!metaDescMatch,
      hasLocalSchema,
      seemsContentRich: html.length > 15000,
    };
  } catch {
    return { hasTitle: false, titleLength: 0, hasMetaDesc: false, hasLocalSchema: false, seemsContentRich: false };
  }
}

async function checkSerpPresence(businessName: string, city: string, state: string, industry: string) {
  // Use Google's public search — check if business appears in top results
  // In production, integrate SerpAPI or ValueSERP for reliable data
  try {
    const query = encodeURIComponent(`${industry} ${city} ${state}`);
    const res = await fetch(`https://www.google.com/search?q=${query}&num=10`, {
      signal: AbortSignal.timeout(8000),
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    const html = await res.text();
    const nameLower = businessName.toLowerCase();
    const ranksLocally = html.toLowerCase().includes(nameLower);
    return { ranksLocally };
  } catch {
    return { ranksLocally: false };
  }
}

function getSEOSummary(score: number, city: string, industry: string): string {
  if (score >= 80) return `Strong SEO presence for ${industry} searches in ${city}.`;
  if (score >= 60) return `Moderate SEO — you're visible but competitors are outranking you.`;
  if (score >= 40) return `Weak SEO — most ${city} ${industry} searches go to your competitors.`;
  return `Critical SEO gaps — you are essentially invisible on Google locally.`;
}
