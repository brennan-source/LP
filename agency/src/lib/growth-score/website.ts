import { CategoryScore, ActionItem } from "@/types/growth-score";
import { scoreToGrade } from "@/lib/utils";

interface PageSpeedResult {
  score: number;
  fcp: number;
  lcp: number;
  cls: number;
  tbt: number;
  mobileScore: number;
  hasMeta: boolean;
  hasStructuredData: boolean;
  hasHttps: boolean;
}

export async function auditWebsite(url: string): Promise<CategoryScore> {
  const psi = await fetchPageSpeedData(url);
  const siteChecks = await checkSiteFeatures(url);

  let score = 0;
  const details: string[] = [];
  const actions: ActionItem[] = [];

  // Performance (40 pts)
  const perfScore = psi.score * 40;
  score += perfScore;
  if (psi.score >= 0.9) {
    details.push("✓ Excellent page speed (loads in under 2.5s)");
  } else if (psi.score >= 0.5) {
    details.push(`⚠ Moderate page speed — LCP: ${(psi.lcp / 1000).toFixed(1)}s`);
    actions.push({
      priority: "high",
      title: "Speed up your website",
      description: `Your site loads in ${(psi.lcp / 1000).toFixed(1)}s. Google penalizes slow sites — visitors leave after 3 seconds.`,
      estimatedImpact: "Up to 32% higher conversion rate",
    });
  } else {
    details.push(`✗ Poor page speed — LCP: ${(psi.lcp / 1000).toFixed(1)}s`);
    actions.push({
      priority: "critical",
      title: "Fix critical website performance",
      description: `Your site loads in ${(psi.lcp / 1000).toFixed(1)}s. This is costing you significant leads daily.`,
      estimatedImpact: "Up to 53% of mobile visitors abandon slow sites",
    });
  }

  // Mobile (20 pts)
  const mobileScore = psi.mobileScore * 20;
  score += mobileScore;
  if (psi.mobileScore >= 0.9) {
    details.push("✓ Mobile-friendly experience");
  } else if (psi.mobileScore >= 0.5) {
    details.push("⚠ Needs mobile improvements");
    actions.push({
      priority: "high",
      title: "Improve mobile experience",
      description: "Over 60% of local business searches happen on phones. A poor mobile experience loses those leads.",
      estimatedImpact: "60%+ of your traffic is on mobile",
    });
  } else {
    details.push("✗ Poor mobile experience");
    actions.push({
      priority: "critical",
      title: "Fix mobile experience immediately",
      description: "Your site is difficult to use on phones. This is your single biggest conversion killer.",
      estimatedImpact: "Potentially losing 60%+ of leads",
    });
  }

  // HTTPS (10 pts)
  if (psi.hasHttps) {
    score += 10;
    details.push("✓ Secure HTTPS connection");
  } else {
    details.push("✗ No HTTPS — browsers warn visitors your site is unsafe");
    actions.push({
      priority: "critical",
      title: "Add SSL certificate (HTTPS)",
      description: "Browsers show 'Not Secure' warnings. This destroys trust and hurts Google rankings.",
      estimatedImpact: "Immediate ranking penalty + visitor distrust",
    });
  }

  // Contact/Lead capture features (30 pts)
  let featureScore = 0;
  if (siteChecks.hasContactForm) {
    featureScore += 10;
    details.push("✓ Contact form found");
  } else {
    details.push("✗ No contact form detected");
    actions.push({
      priority: "high",
      title: "Add a contact / lead capture form",
      description: "Visitors can't easily reach you. Most won't search for your phone number.",
      estimatedImpact: "Estimated 2-4x more inbound leads",
    });
  }
  if (siteChecks.hasPhoneVisible) {
    featureScore += 10;
    details.push("✓ Phone number prominently displayed");
  } else {
    details.push("⚠ Phone number hard to find");
    actions.push({
      priority: "medium",
      title: "Make your phone number prominent",
      description: "Put your phone number in the header on every page — click-to-call on mobile.",
      estimatedImpact: "~20% more phone inquiries",
    });
  }
  if (siteChecks.hasLiveChat) {
    featureScore += 10;
    details.push("✓ Live chat or chat widget present");
  } else {
    details.push("⚠ No live chat — many visitors prefer chat to calls");
    actions.push({
      priority: "medium",
      title: "Add AI chat to your website",
      description: "Capture leads 24/7 even when you're not available. AI chat converts visitors who won't call.",
      estimatedImpact: "~30% more leads captured after hours",
    });
  }
  score += featureScore;

  const finalScore = Math.min(100, Math.round(score));

  return {
    score: finalScore,
    grade: scoreToGrade(finalScore),
    label: "Website",
    summary: getWebsiteSummary(finalScore),
    details,
    competitorAvg: 58,
    estimatedRevenueLoss: finalScore < 60 ? estimateRevenueLoss(finalScore) : 0,
    actions,
  };
}

async function fetchPageSpeedData(url: string): Promise<PageSpeedResult> {
  try {
    const key = process.env.GOOGLE_PSI_API_KEY || process.env.GOOGLE_PLACES_API_KEY || "";
    const keyParam = key ? `&key=${key}` : "";
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=PERFORMANCE${keyParam}`;
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error("PageSpeed API error");
    const data = await res.json();

    const cats = data.lighthouseResult?.categories;
    const audits = data.lighthouseResult?.audits;

    return {
      score: cats?.performance?.score ?? 0.5,
      mobileScore: cats?.performance?.score ?? 0.5,
      fcp: audits?.["first-contentful-paint"]?.numericValue ?? 3000,
      lcp: audits?.["largest-contentful-paint"]?.numericValue ?? 4000,
      cls: audits?.["cumulative-layout-shift"]?.numericValue ?? 0.25,
      tbt: audits?.["total-blocking-time"]?.numericValue ?? 400,
      hasMeta: true,
      hasStructuredData: !!audits?.["structured-data"],
      hasHttps: url.startsWith("https://"),
    };
  } catch {
    // Fallback scores if API fails
    return {
      score: 0.45,
      mobileScore: 0.4,
      fcp: 3500,
      lcp: 5000,
      cls: 0.3,
      tbt: 600,
      hasMeta: false,
      hasStructuredData: false,
      hasHttps: url.startsWith("https://"),
    };
  }
}

async function checkSiteFeatures(url: string) {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MakrGrowthScoreBot/1.0)" },
    });
    const html = await res.text();
    const lower = html.toLowerCase();

    return {
      hasContactForm: lower.includes("<form") && (lower.includes("contact") || lower.includes("email") || lower.includes("name")),
      hasPhoneVisible: /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(html),
      hasLiveChat: lower.includes("tawk") || lower.includes("intercom") || lower.includes("drift") || lower.includes("crisp") || lower.includes("zendesk") || lower.includes("livechat") || lower.includes("chat"),
      hasBooking: lower.includes("calendly") || lower.includes("acuity") || lower.includes("book now") || lower.includes("schedule"),
    };
  } catch {
    return { hasContactForm: false, hasPhoneVisible: false, hasLiveChat: false, hasBooking: false };
  }
}

function getWebsiteSummary(score: number): string {
  if (score >= 80) return "Your website is a strong lead generation asset.";
  if (score >= 60) return "Your website works but is missing key conversion elements.";
  if (score >= 40) return "Your website is losing a significant number of potential leads.";
  return "Your website is actively driving customers away — this is your top priority.";
}

function estimateRevenueLoss(score: number): number {
  const gap = 70 - score;
  return Math.round(gap * 80);
}
