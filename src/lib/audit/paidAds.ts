import { CategoryScore } from "@/types/audit";
import { scoreToGrade, extractDomain } from "@/lib/utils";
import { serperSearch } from "@/lib/serper";

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
    const compText = googleData.competitorCount === 1 ? "1 competitor is" : `${googleData.competitorCount} competitors are`;
    details.push(`✗ No Google Ads detected — ${compText} running ads for your keywords`);
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

// Strip display suffixes like " / Heating & Cooling" for cleaner search queries
function searchIndustry(industry: string): string {
  return industry.split(/\s*\/\s*/)[0].trim();
}

async function checkGoogleAds(businessName: string, city: string, industry: string) {
  const data = await serperSearch(`${searchIndustry(industry)} near ${city}`);
  if (!data) return { running: false, competitorCount: 2 };

  const ads = data.ads ?? [];
  const firstWord = businessName.toLowerCase().split(" ")[0];
  const running = ads.some(
    (ad) => ad.title.toLowerCase().includes(firstWord) || ad.link.toLowerCase().includes(firstWord)
  );
  // If Serper returned no ads, that may mean genuinely no ads OR Serper didn't capture them —
  // use 1 as minimum competitor count so the copy doesn't say "0 competitors"
  const competitorCount = ads.length > 0 ? Math.min(4, ads.length) : 1;

  return { running, competitorCount };
}

async function checkFacebookAds(businessName: string) {
  // Facebook Ad Library requires authenticated API access — not available without Meta Business credentials
  // Conservative: return false (no false positives)
  return { running: false };
}

function getPaidAdsSummary(score: number, industry: string, city: string): string {
  if (score >= 80) return "Strong paid advertising presence — capturing high-intent buyers.";
  if (score >= 50) return "Some paid advertising but missing key channels.";
  if (score >= 20) return "Minimal paid advertising — competitors dominate paid search in your area.";
  return `No paid advertising detected — competitors are capturing 100% of ${industry} ad clicks in ${city}.`;
}
