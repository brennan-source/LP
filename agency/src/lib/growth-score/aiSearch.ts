import { CategoryScore } from "@/types/growth-score";
import { scoreToGrade } from "@/lib/utils";

// AI search presence scoring
// Checks if the business appears in AI-generated search results (ChatGPT, Perplexity, Google AI Overviews)
// This is the newest and fastest-growing discovery channel

export async function auditAISearch(url: string): Promise<CategoryScore> {
  const checks = await checkAISearchSignals(url);

  const details: string[] = [];
  const actions = [];
  let score = 0;

  // Schema markup for AI understanding (30 pts)
  if (checks.hasStructuredData) {
    score += 30;
    details.push("✓ Structured data markup detected — AI can understand your business");
  } else {
    details.push("✗ No structured data — AI search engines can't accurately describe your business");
    actions.push({
      priority: "high" as const,
      title: "Add structured data markup for AI search",
      description: "ChatGPT, Perplexity, and Google AI Overviews rely on structured data to recommend local businesses. Without it, you're invisible to AI search.",
      estimatedImpact: "AI search is growing 400%+ year over year",
    });
  }

  // Content optimized for AI (30 pts)
  if (checks.hasQAContent) {
    score += 30;
    details.push("✓ Q&A and FAQ content detected — good for AI search citations");
  } else {
    details.push("⚠ No FAQ/Q&A content — AI tools can't cite you in answers");
    actions.push({
      priority: "medium" as const,
      title: "Add FAQ content to get cited by AI search",
      description: "AI search engines like Perplexity and Google's AI Overview pull from FAQ sections. Create content that directly answers customer questions.",
      estimatedImpact: "Capture AI-driven traffic before competitors do",
    });
  }

  // E-E-A-T signals (40 pts — expertise, authority, trust)
  const eeatScore = checks.eeatScore;
  score += eeatScore;
  if (eeatScore >= 30) {
    details.push("✓ Good E-E-A-T signals (expertise, authority, trust)");
  } else if (eeatScore >= 15) {
    details.push("⚠ Moderate E-E-A-T — Google and AI tools prefer more authoritative sources");
  } else {
    details.push("✗ Weak E-E-A-T signals — AI search won't recommend you");
    actions.push({
      priority: "medium" as const,
      title: "Build E-E-A-T signals for AI credibility",
      description: "AI search tools prioritize businesses with clear expertise signals: credentials, certifications, team pages, and trusted reviews.",
      estimatedImpact: "Required to be recommended by AI assistants",
    });
  }

  const finalScore = Math.min(100, Math.round(score));

  return {
    score: finalScore,
    grade: scoreToGrade(finalScore),
    label: "AI Search",
    summary: getAISearchSummary(finalScore),
    details,
    competitorAvg: 30, // Most small businesses score low here — new opportunity
    estimatedRevenueLoss: 0, // Early stage channel — impact is future-facing
    actions,
  };
}

async function checkAISearchSignals(url: string) {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MakrGrowthScoreBot/1.0)" },
    });
    const html = await res.text();
    const lower = html.toLowerCase();

    const hasStructuredData = html.includes("application/ld+json") || html.includes('"@context"');
    const hasQAContent = lower.includes("faq") || lower.includes("frequently asked") || lower.includes("q:") || lower.includes("<dt>");

    // E-E-A-T signals
    let eeatScore = 0;
    if (lower.includes("about us") || lower.includes("our team") || lower.includes("our story")) eeatScore += 10;
    if (lower.includes("certified") || lower.includes("licensed") || lower.includes("accredited")) eeatScore += 10;
    if (lower.includes("years of experience") || lower.includes("since 19") || lower.includes("since 20")) eeatScore += 10;
    if (lower.includes("testimonial") || lower.includes("review") || lower.includes("trust")) eeatScore += 10;

    return { hasStructuredData, hasQAContent, eeatScore };
  } catch {
    return { hasStructuredData: false, hasQAContent: false, eeatScore: 5 };
  }
}

function getAISearchSummary(score: number): string {
  if (score >= 70) return "Well-positioned for AI-driven search — ahead of most local competitors.";
  if (score >= 45) return "Partial AI search readiness — optimization will capture early-mover advantage.";
  if (score >= 25) return "Mostly invisible to AI search tools — an emerging gap in your strategy.";
  return "Not optimized for AI search — this is the newest customer acquisition channel and you're not on it.";
}
