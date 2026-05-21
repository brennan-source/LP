import { CategoryScore } from "@/types/audit";
import { scoreToGrade, extractDomain } from "@/lib/utils";

export async function auditPaidAds(url: string, businessName: string, city: string, industry: string): Promise<CategoryScore> {
  const [googleAds, fbAds] = await Promise.allSettled([
    checkGoogleAds(businessName, city, industry),
    checkFacebookAds(businessName),
  ]);

  const googleData = googleAds.status === "fulfilled" ? googleAds.value : { running: false, competitorCount: 0 };
  const fbData = fbAds.status === "fulfilled" ? fbAds.value : { running: false };

  const details: string[] = [];
  const actions = [];
  let score = 0;

  // Google Ads (60 pts)
  if (googleData.running) {
    score += 60;
    details.push("✓ Running Google Ads — capturing active searchers");
  } else {
    details.push(`✗ No Google Ads detected — ${googleData.competitorCount} competitors are running ads for your keywords`);
    actions.push({
      priority: "high" as const,
      title: "Start Google Ads to capture in-market customers",
      description: `People searching for ${industry} in ${city} right now are seeing your competitors' ads — not you. Google Ads puts you in front of buyers the moment they search.`,
      estimatedImpact: "Paid search has an avg. 200% ROI for local services",
      tool2Upsell: "Google Ads Manager",
    });
  }

  // Facebook/Meta Ads (40 pts)
  if (fbData.running) {
    score += 40;
    details.push("✓ Running Facebook/Meta Ads — building brand awareness and retargeting");
  } else {
    details.push("✗ No Facebook/Meta Ads detected");
    actions.push({
      priority: "medium" as const,
      title: "Run Facebook/Meta Ads for brand awareness & retargeting",
      description: "Retargeting visitors who already visited your site converts at 3-5x higher rates. Facebook ads are still the most cost-effective way to reach local audiences.",
      estimatedImpact: "Retargeting = 3-5x higher conversion vs cold traffic",
      tool2Upsell: "Meta Ads Manager",
    });
  }

  const finalScore = Math.min(100, Math.round(score));

  return {
    score: finalScore,
    grade: scoreToGrade(finalScore),
    label: "Paid Advertising",
    summary: getPaidAdsSummary(finalScore, industry, city),
    details,
    competitorAvg: 40,
    estimatedRevenueLoss: finalScore < 40 ? Math.round((50 - finalScore) * 150) : 0,
    actions,
  };
}

async function checkGoogleAds(businessName: string, city: string, industry: string) {
  try {
    const query = encodeURIComponent(`${industry} ${city}`);
    const res = await fetch(`https://www.google.com/search?q=${query}`, {
      signal: AbortSignal.timeout(8000),
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    const html = await res.text();
    const lowerHtml = html.toLowerCase();
    const nameLower = businessName.toLowerCase();

    // Check for ad labels (Google ads show "Sponsored" in search results)
    const hasSponsoredLabel = lowerHtml.includes("sponsored") || lowerHtml.includes("ads·");
    const running = hasSponsoredLabel && lowerHtml.includes(nameLower.split(" ")[0]);

    // Count competitor ad count (rough)
    const sponsoredMatches = (html.match(/sponsored/gi) || []).length;
    const competitorCount = Math.min(4, sponsoredMatches);

    return { running, competitorCount };
  } catch {
    return { running: false, competitorCount: 2 };
  }
}

async function checkFacebookAds(businessName: string) {
  // Facebook Ad Library is public but requires API access for reliable data
  // For MVP, we return a conservative estimate
  try {
    const query = encodeURIComponent(businessName);
    const res = await fetch(`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=${query}&search_type=keyword_unordered`, {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LeadScoreBot/1.0)" },
    });
    const html = await res.text();
    const running = html.toLowerCase().includes(businessName.toLowerCase().split(" ")[0]) && html.includes("ad");
    return { running };
  } catch {
    return { running: false };
  }
}

function getPaidAdsSummary(score: number, industry: string, city: string): string {
  if (score >= 80) return "Strong paid advertising presence — capturing high-intent buyers.";
  if (score >= 50) return "Some paid advertising but missing key channels.";
  if (score >= 20) return "Minimal paid advertising — competitors dominate paid search in your area.";
  return `No paid advertising detected — competitors are capturing 100% of ${industry} ad clicks in ${city}.`;
}
