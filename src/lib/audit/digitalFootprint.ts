import { CategoryScore } from "@/types/audit";
import { scoreToGrade } from "@/lib/utils";

export async function auditDigitalFootprint(
  businessName: string,
  city: string,
  state: string,
  industry: string
): Promise<CategoryScore> {
  const checks = await Promise.allSettled([
    checkDirectoryPresence(businessName, city, state),
    checkReviewPresence(businessName, city),
  ]);

  const directoryData = checks[0].status === "fulfilled" ? checks[0].value : { score: 0, details: [] };
  const reviewData = checks[1].status === "fulfilled" ? checks[1].value : { score: 0, details: [] };

  const details = [...directoryData.details, ...reviewData.details];
  const actions = [];
  let score = directoryData.score + reviewData.score;

  // Directory presence scoring (60 pts total)
  if (directoryData.score < 30) {
    actions.push({
      priority: "high" as const,
      title: "Get listed in local business directories",
      description: "Yelp, BBB, YellowPages, and 50+ other directories send you free traffic and improve local SEO. Being missing hurts your search rankings.",
      estimatedImpact: "Local citation building = #3 local ranking factor",
      tool2Upsell: "Local Citations Builder",
    });
  }

  // Review scoring (40 pts total)
  if (reviewData.score < 20) {
    actions.push({
      priority: "critical" as const,
      title: "Build your online review presence",
      description: "88% of consumers trust online reviews as much as personal recommendations. No reviews = lost sales.",
      estimatedImpact: "4-star businesses earn 28% more revenue than 3-star",
      tool2Upsell: "Review Generation Engine",
    });
  } else if (reviewData.score < 35) {
    actions.push({
      priority: "high" as const,
      title: "Systematically collect more reviews",
      description: "You have some reviews but need more. Businesses with 50+ reviews significantly outconvert those with fewer.",
      estimatedImpact: "Each additional review increases conversion rate",
      tool2Upsell: "Review Generation Engine",
    });
  }

  const finalScore = Math.min(100, Math.round(score));

  return {
    score: finalScore,
    grade: scoreToGrade(finalScore),
    label: "Digital Footprint",
    summary: getFootprintSummary(finalScore),
    details,
    competitorAvg: 50,
    estimatedRevenueLoss: finalScore < 55 ? Math.round((65 - finalScore) * 90) : 0,
    actions,
  };
}

async function checkDirectoryPresence(businessName: string, city: string, state: string) {
  const directories = [
    { name: "Google Business Profile", domain: "google.com/maps" },
    { name: "Yelp", domain: "yelp.com" },
    { name: "BBB", domain: "bbb.org" },
    { name: "YellowPages", domain: "yellowpages.com" },
    { name: "Apple Maps / Siri", domain: "maps.apple.com" },
    { name: "Bing Places", domain: "bing.com/maps" },
  ];

  const details: string[] = [];
  let score = 0;

  // We attempt a Google search for the business in each directory
  for (const dir of directories) {
    try {
      const query = encodeURIComponent(`site:${dir.domain} "${businessName}" "${city}"`);
      const res = await fetch(`https://www.google.com/search?q=${query}`, {
        signal: AbortSignal.timeout(5000),
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });
      const html = await res.text();
      const found = html.includes(dir.domain) && html.toLowerCase().includes(businessName.toLowerCase().split(" ")[0]);

      if (found) {
        score += 10;
        details.push(`✓ Found on ${dir.name}`);
      } else {
        details.push(`✗ Not found on ${dir.name}`);
      }
    } catch {
      details.push(`⚠ Could not verify ${dir.name} listing`);
      score += 3; // partial credit for uncertainty
    }
  }

  return { score: Math.min(60, score), details };
}

async function checkReviewPresence(businessName: string, city: string) {
  const details: string[] = [];
  let score = 0;

  // Check Google for reviews
  try {
    const query = encodeURIComponent(`"${businessName}" "${city}" reviews`);
    const res = await fetch(`https://www.google.com/search?q=${query}`, {
      signal: AbortSignal.timeout(8000),
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    const html = await res.text();
    const lowerHtml = html.toLowerCase();

    // Look for star ratings / review counts in SERP
    const hasStarRating = lowerHtml.includes("rating") || lowerHtml.includes("stars") || lowerHtml.includes("reviews");
    const reviewCountMatch = html.match(/(\d+)\s+reviews?/i);
    const reviewCount = reviewCountMatch ? parseInt(reviewCountMatch[1]) : 0;

    if (reviewCount > 50) {
      score += 40;
      details.push(`✓ Strong review presence (~${reviewCount} reviews found)`);
    } else if (reviewCount > 10) {
      score += 25;
      details.push(`⚠ Some reviews (~${reviewCount}) — need more to compete`);
    } else if (hasStarRating) {
      score += 15;
      details.push("⚠ Reviews exist but count is low");
    } else {
      details.push("✗ Few or no reviews found online");
    }
  } catch {
    details.push("⚠ Could not fully verify review presence");
    score += 10;
  }

  return { score: Math.min(40, score), details };
}

function getFootprintSummary(score: number): string {
  if (score >= 80) return "Strong directory and review presence across the web.";
  if (score >= 55) return "Moderate digital footprint — some key directories and reviews missing.";
  if (score >= 35) return "Weak digital footprint — significantly less visible than top competitors.";
  return "Minimal digital footprint — almost invisible outside your own website.";
}
