import { CategoryScore } from "@/types/audit";
import { scoreToGrade } from "@/lib/utils";

const SOCIAL_PLATFORMS = [
  { name: "Facebook", key: "facebook", urlPattern: "facebook.com", weight: 20 },
  { name: "Instagram", key: "instagram", urlPattern: "instagram.com", weight: 15 },
  { name: "LinkedIn", key: "linkedin", urlPattern: "linkedin.com", weight: 15 },
  { name: "Google Business", key: "google", urlPattern: "g.co/maps|maps.google|google.com/maps", weight: 25 },
  { name: "TikTok", key: "tiktok", urlPattern: "tiktok.com", weight: 15 },
  { name: "YouTube", key: "youtube", urlPattern: "youtube.com", weight: 10 },
];

export async function auditSocialMedia(url: string, businessName: string): Promise<CategoryScore> {
  const siteLinks = await extractSocialLinks(url);
  const details: string[] = [];
  const actions = [];
  let score = 0;

  for (const platform of SOCIAL_PLATFORMS) {
    const found = siteLinks.some((link) =>
      new RegExp(platform.urlPattern, "i").test(link)
    );
    if (found) {
      score += platform.weight;
      details.push(`✓ ${platform.name} profile linked`);
    } else {
      details.push(`✗ No ${platform.name} presence detected`);
      if (platform.key === "google") {
        actions.push({
          priority: "critical" as const,
          title: "Claim your Google Business Profile",
          description: "Google Business Profile is 100% free and directly drives local search visibility and calls. Not having one is like having no sign on your building.",
          estimatedImpact: "Free — and the #1 driver of local leads",
          tool2Upsell: "Google Business Manager",
        });
      } else if (platform.key === "facebook") {
        actions.push({
          priority: "high" as const,
          title: "Create a Facebook Business Page",
          description: "Facebook is where your local customers are. A page builds trust and drives traffic.",
          estimatedImpact: "2.9B users — highest local business discovery",
          tool2Upsell: "Social Media Auto-Poster",
        });
      } else if (platform.key === "instagram") {
        actions.push({
          priority: "medium" as const,
          title: "Set up an Instagram business account",
          description: "Visual businesses (restaurants, salons, contractors) get significant leads from Instagram.",
          estimatedImpact: "Strong for visual industries",
          tool2Upsell: "Social Media Auto-Poster",
        });
      }
    }
  }

  // Posting frequency bonus (estimated — hard to get without APIs)
  // Penalize if no social presence at all
  if (score === 0) {
    details.push("✗ No social media presence found anywhere");
    actions.push({
      priority: "critical" as const,
      title: "Establish social media presence",
      description: "You have zero social media presence. Your competitors are building audiences and trust while you are invisible.",
      estimatedImpact: "Social proof drives 62% of purchase decisions",
      tool2Upsell: "Social Media Auto-Poster",
    });
  }

  const finalScore = Math.min(100, Math.round(score));

  return {
    score: finalScore,
    grade: scoreToGrade(finalScore),
    label: "Social Media",
    summary: getSocialSummary(finalScore),
    details,
    competitorAvg: 55,
    estimatedRevenueLoss: finalScore < 50 ? Math.round((60 - finalScore) * 75) : 0,
    actions,
  };
}

async function extractSocialLinks(url: string): Promise<string[]> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LeadScoreBot/1.0)" },
    });
    const html = await res.text();
    const linkPattern = /href=["'](https?:\/\/(?:www\.)?(facebook|instagram|linkedin|twitter|tiktok|youtube|g\.co|maps\.google)[^"']+)["']/gi;
    const links: string[] = [];
    let match;
    while ((match = linkPattern.exec(html)) !== null) {
      links.push(match[1]);
    }
    return links;
  } catch {
    return [];
  }
}

function getSocialSummary(score: number): string {
  if (score >= 80) return "Strong social media presence across major platforms.";
  if (score >= 55) return "Moderate social presence — missing some key platforms.";
  if (score >= 30) return "Weak social presence — competitors are building audiences you're missing.";
  return "No meaningful social media presence detected.";
}
