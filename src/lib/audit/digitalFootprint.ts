import { CategoryScore } from "@/types/audit";
import { scoreToGrade } from "@/lib/utils";
import { serperSearch } from "@/lib/serper";

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
    { name: "Google Business Profile", domains: ["google.com/maps", "maps.google", "g.co"] },
    { name: "Yelp", domains: ["yelp.com"] },
    { name: "BBB", domains: ["bbb.org"] },
    { name: "YellowPages", domains: ["yellowpages.com"] },
    { name: "Angi / HomeAdvisor", domains: ["angi.com", "homeadvisor.com"] },
    { name: "Facebook", domains: ["facebook.com"] },
  ];

  const details: string[] = [];
  let score = 0;

  // Two queries: one for reviews/directories (surfaces Yelp, BBB), one for local pack (surfaces GBP)
  const [reviewData, localData] = await Promise.all([
    serperSearch(`${businessName} ${city} ${state} reviews`),
    serperSearch(`${businessName} ${city} ${state}`),
  ]);

  if (!reviewData && !localData) {
    directories.forEach((d) => details.push(`⚠ Could not verify ${d.name} listing`));
    return { score: 18, details };
  }

  const allLinks = [
    ...(reviewData?.organic ?? []),
    ...(localData?.organic ?? []),
  ].map((r) => r.link.toLowerCase());

  // GBP appears in local results of the unquoted business name query
  const firstWord = businessName.toLowerCase().split(" ")[0];
  const hasGBP = [
    ...(reviewData?.localResults ?? []),
    ...(localData?.localResults ?? []),
  ].some((r) => r.title.toLowerCase().includes(firstWord));

  for (const dir of directories) {
    const found =
      dir.name === "Google Business Profile"
        ? hasGBP
        : allLinks.some((link) => dir.domains.some((d) => link.includes(d)));

    if (found) {
      score += 10;
      details.push(`✓ Found on ${dir.name}`);
    } else {
      details.push(`✗ Not found on ${dir.name}`);
    }
  }

  return { score: Math.min(60, score), details };
}

async function checkReviewPresence(businessName: string, city: string) {
  const details: string[] = [];
  let score = 0;

  const data = await serperSearch(`${businessName} ${city} reviews`);

  if (!data) {
    details.push("⚠ Could not fully verify review presence");
    return { score: 10, details };
  }

  // Prefer structured local results (Google Business Profile data)
  const firstWord = businessName.toLowerCase().split(" ")[0];
  const localMatch = (data.localResults ?? []).find((r) =>
    r.title.toLowerCase().includes(firstWord)
  );

  if (localMatch?.ratingCount) {
    const count = localMatch.ratingCount;
    const rating = localMatch.rating ?? 0;
    if (count > 100) {
      score += 40;
      details.push(`✓ Strong review presence — ${count.toLocaleString()} Google reviews (${rating}★)`);
    } else if (count > 25) {
      score += 28;
      details.push(`⚠ ${count} Google reviews (${rating}★) — need more to compete`);
    } else {
      score += 15;
      details.push(`⚠ Only ${count} Google reviews — well below competitive threshold`);
    }
    return { score: Math.min(40, score), details };
  }

  // Fall back to organic snippet parsing — require business name nearby to avoid false positives
  const nameLower = businessName.toLowerCase();
  const snippets = data.organic
    .filter((r) => r.snippet.toLowerCase().includes(firstWord) || r.title.toLowerCase().includes(firstWord))
    .map((r) => r.snippet)
    .join(" ");

  const reviewCountMatch = snippets.match(/(\d[\d,]+)\s+(?:Google\s+)?reviews?/i);
  const rawCount = reviewCountMatch ? parseInt(reviewCountMatch[1].replace(/,/g, "")) : 0;
  // Cap at 5000 to reject aggregate directory counts (e.g. "10,796 Yelp reviews in Lowell")
  const reviewCount = rawCount > 5000 ? 0 : rawCount;

  if (reviewCount > 50) {
    score += 40;
    details.push(`✓ Strong review presence (~${reviewCount} reviews found)`);
  } else if (reviewCount > 10) {
    score += 25;
    details.push(`⚠ Some reviews (~${reviewCount}) — need more to compete`);
  } else if (nameLower && data.organic.some((r) => r.snippet.toLowerCase().includes("review"))) {
    score += 15;
    details.push("⚠ Reviews exist but count is low");
  } else {
    details.push("✗ Few or no reviews found online");
  }

  return { score: Math.min(40, score), details };
}

function getFootprintSummary(score: number): string {
  if (score >= 80) return "Strong directory and review presence across the web.";
  if (score >= 55) return "Moderate digital footprint — some key directories and reviews missing.";
  if (score >= 35) return "Weak digital footprint — significantly less visible than top competitors.";
  return "Minimal digital footprint — almost invisible outside your own website.";
}
