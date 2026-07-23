import { CategoryScore } from "@/types/growth-score";
import { scoreToGrade } from "@/lib/utils";

export async function auditLeadCapture(url: string, phoneNumber?: string): Promise<CategoryScore> {
  const siteData = await analyzeLeadCapture(url);
  const details: string[] = [];
  const actions = [];
  let score = 0;

  // Phone number (25 pts)
  if (phoneNumber || siteData.hasPhone) {
    score += 25;
    details.push("✓ Phone number listed");
  } else {
    details.push("✗ No phone number found");
    actions.push({
      priority: "high" as const,
      title: "Add a visible phone number to your website",
      description: "Many customers prefer to call — make it easy. Put your number in the header, visible on every page.",
      estimatedImpact: "~25% of website visitors prefer to call",
    });
  }

  // Call tracking (15 pts)
  if (siteData.hasCallTracking) {
    score += 15;
    details.push("✓ Call tracking detected — you can measure phone lead ROI");
  } else {
    details.push("⚠ No call tracking — you can't measure which ads/pages drive calls");
    actions.push({
      priority: "medium" as const,
      title: "Add call tracking to measure and capture phone leads",
      description: "Without tracking, you can't know which marketing drives calls — and you may miss after-hours leads completely.",
      estimatedImpact: "Know exactly which marketing drives phone revenue",
    });
  }

  // Online booking (20 pts)
  if (siteData.hasBooking) {
    score += 20;
    details.push("✓ Online booking / scheduling available");
  } else {
    details.push("✗ No online booking — you lose leads who won't call");
    actions.push({
      priority: "high" as const,
      title: "Add online booking to capture leads 24/7",
      description: "40% of bookings happen outside business hours. If you don't have online booking, those leads go to a competitor who does.",
      estimatedImpact: "40% of customers book after hours",
    });
  }

  // Live chat / AI chat (20 pts)
  if (siteData.hasLiveChat) {
    score += 20;
    details.push("✓ Live chat or AI chat present");
  } else {
    details.push("✗ No chat — losing visitors who won't call or fill out forms");
    actions.push({
      priority: "high" as const,
      title: "Add AI chat to capture leads you'd otherwise lose",
      description: "Chat converts 3-5x more visitors than forms alone. An AI chatbot works 24/7 and qualifies leads before they reach you.",
      estimatedImpact: "3-5x more leads from existing traffic",
    });
  }

  // Lead nurturing / email capture (20 pts)
  if (siteData.hasEmailCapture) {
    score += 20;
    details.push("✓ Email capture / newsletter signup found");
  } else {
    details.push("⚠ No email capture — losing the 97% of visitors who aren't ready to buy today");
    actions.push({
      priority: "medium" as const,
      title: "Capture emails for long-term lead nurturing",
      description: "Only 3% of visitors are ready to buy on their first visit. Capture the other 97% with email and nurture them to purchase.",
      estimatedImpact: "Email has a 4,200% average ROI",
    });
  }

  const finalScore = Math.min(100, Math.round(score));

  return {
    score: finalScore,
    grade: scoreToGrade(finalScore),
    label: "Lead Capture",
    summary: getLeadCaptureSummary(finalScore),
    details,
    competitorAvg: 45,
    estimatedRevenueLoss: finalScore < 60 ? Math.round((70 - finalScore) * 200) : 0,
    actions,
  };
}

async function analyzeLeadCapture(url: string) {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MakrGrowthScoreBot/1.0)" },
    });
    const html = await res.text();
    const lower = html.toLowerCase();

    return {
      hasPhone: /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(html),
      hasCallTracking: lower.includes("callrail") || lower.includes("calltracking") || lower.includes("ringba") || lower.includes("twilio"),
      hasBooking: lower.includes("calendly") || lower.includes("acuity") || lower.includes("book now") || lower.includes("schedule a") || lower.includes("appointment"),
      hasLiveChat: lower.includes("tawk") || lower.includes("intercom") || lower.includes("drift") || lower.includes("crisp") || lower.includes("zendesk") || lower.includes("livechat") || lower.includes("chat"),
      hasEmailCapture: (lower.includes("subscribe") || lower.includes("newsletter") || (lower.includes("email") && lower.includes("sign up"))),
    };
  } catch {
    return { hasPhone: false, hasCallTracking: false, hasBooking: false, hasLiveChat: false, hasEmailCapture: false };
  }
}

function getLeadCaptureSummary(score: number): string {
  if (score >= 80) return "Excellent lead capture infrastructure — you're set up to convert visitors.";
  if (score >= 55) return "Decent lead capture, but gaps are costing you sales daily.";
  if (score >= 35) return "Poor lead capture — most visitors have no easy way to contact you.";
  return "Critical: you have almost no way to capture leads from your website.";
}
