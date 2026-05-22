import { QuizAnswers, ScanResults, CategoryResult, AssessmentCategory, RecommendedAction, RoadmapPhase } from "@/types/assessment";
import { scoreToGrade } from "@/lib/utils";

const HOURLY_RATES: Record<string, number> = {
  solo: 50,
  "2to5": 45,
  "6to20": 40,
  "21to50": 35,
  over50: 30,
};

const WEEKLY_HOURS_MAP: Record<string, number> = {
  under5: 3,
  "5to10": 7.5,
  "10to20": 15,
  over20: 25,
};

export function computeCategories(
  quiz: QuizAnswers,
  scan: ScanResults
): Record<AssessmentCategory, CategoryResult> {
  return {
    aiLeadership: scoreAILeadership(quiz),
    teamAdoption: scoreTeamAdoption(quiz),
    salesMarketing: scoreSalesMarketing(quiz, scan),
    operations: scoreOperations(quiz, scan),
    financeAdmin: scoreFinanceAdmin(quiz, scan),
    customerExperience: scoreCustomerExperience(quiz, scan),
    techStack: scoreTechStack(quiz, scan),
    dataReadiness: scoreDataReadiness(quiz),
  };
}

function scoreAILeadership(quiz: QuizAnswers): CategoryResult {
  let score = 0;
  const details: string[] = [];
  const actions: RecommendedAction[] = [];

  const freqMap = { daily: 40, weekly: 30, monthly: 15, rarely: 5, never: 0 };
  score += freqMap[quiz.personalAIUsageFreq];

  if (quiz.personalAIUsageFreq === "daily") {
    details.push("✓ You use AI tools daily — strong personal foundation");
  } else if (quiz.personalAIUsageFreq === "weekly") {
    details.push("⚠ Weekly AI usage — room to deepen your practice");
    actions.push({
      priority: "medium",
      title: "Build a daily AI habit",
      description: "The leaders pulling ahead are using AI for 1-2 tasks every single day. Start with email drafting, meeting summaries, or customer response writing.",
      estimatedImpact: "~1-2 hours/day reclaimed for strategic work",
      productRecommendation: "AI Basics for Business Owners",
      tier: "course",
    });
  } else {
    details.push("✗ Minimal personal AI usage — you're leaving significant leverage on the table");
    actions.push({
      priority: "critical",
      title: "Start using AI today — your competitors already are",
      description: "Business owners using AI daily report saving 10-15 hours/week. You're competing against people with a 10-hour productivity advantage every week.",
      estimatedImpact: "10-15 hours/week reclaimed",
      productRecommendation: "AI Basics for Business Owners",
      tier: "course",
    });
  }

  const toolCount = quiz.aiToolsUsed.length;
  if (toolCount >= 4) {
    score += 60;
    details.push(`✓ Using ${toolCount} AI tools — diversified toolkit`);
  } else if (toolCount >= 2) {
    score += 35;
    details.push(`⚠ Using ${toolCount} AI tools — expanding your stack will compound value`);
  } else if (toolCount === 1) {
    score += 15;
    details.push("⚠ Only 1 AI tool — significant opportunity to expand");
  } else {
    details.push("✗ No AI tools in your personal workflow");
  }

  return {
    score: Math.min(100, score),
    grade: scoreToGrade(Math.min(100, score)),
    label: "AI Leadership",
    summary: score >= 70
      ? "You're an AI-forward leader — now scale it to your team."
      : score >= 40
      ? "You have some AI habits but haven't made it a core practice."
      : "AI is not yet part of your leadership toolkit — this is the highest leverage change you can make.",
    details,
    estimatedMonthlySavings: score < 50 ? 1200 : 0,
    estimatedRevenueImpact: 0,
    actions,
  };
}

function scoreTeamAdoption(quiz: QuizAnswers): CategoryResult {
  const adoptionMap = { all: 100, some: 65, few: 30, none: 0 };
  const score = adoptionMap[quiz.teamAIUsage] + (quiz.aiTrainingDone ? 0 : 0);
  const details: string[] = [];
  const actions: RecommendedAction[] = [];

  if (quiz.teamAIUsage === "all") {
    details.push("✓ Entire team using AI tools — excellent adoption");
  } else if (quiz.teamAIUsage === "some") {
    details.push("⚠ Some team members using AI — inconsistent adoption creates uneven output");
    actions.push({
      priority: "high",
      title: "Run an AI adoption workshop for your whole team",
      description: "When only some team members use AI, you get inconsistent results and internal friction. A team-wide workshop gets everyone on the same page in one day.",
      estimatedImpact: "Uniform productivity lift across team",
      productRecommendation: "Custom Team Workshop",
      tier: "workshop",
    });
  } else if (quiz.teamAIUsage === "few") {
    details.push("✗ Only a few team members use AI — most of your team is working without AI leverage");
    actions.push({
      priority: "critical",
      title: "Build a team AI program",
      description: "Your team is working the slow way while competitors' teams work with AI assist. A structured 8-week cohort gets your whole team productive.",
      estimatedImpact: "2-4x team output on content, comms, and analysis tasks",
      productRecommendation: "8-Week AI Mastery Cohort",
      tier: "workshop",
    });
  } else {
    details.push("✗ No team AI usage — leaving enormous productivity gains on the table");
    actions.push({
      priority: "critical",
      title: "Start a team AI program immediately",
      description: "In 2026, a business where no one uses AI is a business losing hours every day to manual work that takes competitors minutes.",
      estimatedImpact: "Potentially 30-40% productivity increase across team",
      productRecommendation: "Custom Team Workshop",
      tier: "workshop",
    });
  }

  if (!quiz.aiTrainingDone) {
    details.push("⚠ No formal AI training has been done for the team");
  } else {
    details.push("✓ Team has received some AI training");
  }

  return {
    score: Math.min(100, score),
    grade: scoreToGrade(Math.min(100, score)),
    label: "Team AI Adoption",
    summary: score >= 70
      ? "Strong team AI adoption."
      : score >= 40
      ? "Partial adoption — training will unlock the full team's potential."
      : "Team is not using AI — this is your most immediate competitive disadvantage.",
    details,
    estimatedMonthlySavings: score < 50 ? estimateTeamSavings(quiz) : 0,
    estimatedRevenueImpact: 0,
    actions,
  };
}

function scoreSalesMarketing(quiz: QuizAnswers, scan: ScanResults): CategoryResult {
  let score = 0;
  const details: string[] = [];
  const actions: RecommendedAction[] = [];

  const salesMap = { full: 40, mostly: 30, partial: 15, none: 0 };
  score += salesMap[quiz.salesAutomationLevel];

  const followUpMap = { automated: 30, partial: 18, manual: 0 };
  score += followUpMap[quiz.followUpProcess];

  const crmMap = { ai: 30, advanced: 20, basic: 10, none: 0 };
  score += crmMap[quiz.crmUsage];

  if (scan.hasEmailAutomation) {
    score += 10; // bonus
    details.push("✓ Email marketing platform detected on your website");
  }
  if (scan.hasCRM) {
    details.push("✓ CRM or marketing automation tool detected");
  }

  if (quiz.followUpProcess === "manual") {
    details.push("✗ Manual follow-up — you're losing leads who don't hear back fast enough");
    actions.push({
      priority: "critical",
      title: "Automate your lead follow-up sequence",
      description: "78% of customers buy from the first business that responds. Manual follow-up means you're always second. An automated sequence responds instantly, nurtures over days, and never forgets.",
      estimatedImpact: "Up to 3x higher conversion on inbound leads",
      productRecommendation: "AI for Marketing & Sales Course",
      tier: "course",
    });
  }

  if (quiz.crmUsage === "none") {
    details.push("✗ No CRM — every lead lives in your head, a spreadsheet, or nowhere");
    actions.push({
      priority: "high",
      title: "Implement a CRM with AI workflows",
      description: "Without a CRM, you're losing deals to follow-up failures and have no visibility into your pipeline. Modern AI-powered CRMs cost under $50/month and pay for themselves in the first saved deal.",
      estimatedImpact: "Average 29% sales increase with CRM adoption",
      productRecommendation: "90-Day AI Quick Start",
      tier: "consulting",
    });
  }

  return {
    score: Math.min(100, score),
    grade: scoreToGrade(Math.min(100, score)),
    label: "Sales & Marketing",
    summary: score >= 70
      ? "Strong sales and marketing automation."
      : score >= 40
      ? "Partial automation — gaps are costing you deals."
      : "Manual sales process — you're working 3x harder for the same results competitors get automatically.",
    details,
    estimatedMonthlySavings: 0,
    estimatedRevenueImpact: score < 50 ? estimateRevenueLift(quiz) : 0,
    actions,
  };
}

function scoreOperations(quiz: QuizAnswers, scan: ScanResults): CategoryResult {
  let score = 0;
  const details: string[] = [];
  const actions: RecommendedAction[] = [];

  const hoursMap: Record<string, number> = { under5: 80, "5to10": 55, "10to20": 30, over20: 10 };
  score += hoursMap[quiz.adminHoursPerWeek];

  const schedulingMap = { ai: 20, automated: 15, manual_online: 8, phone: 0 };
  score += schedulingMap[quiz.schedulingMethod];

  const weeklyHours = WEEKLY_HOURS_MAP[quiz.adminHoursPerWeek];
  const hourlyRate = HOURLY_RATES[quiz.teamSize] || 40;
  const monthlyAdminCost = weeklyHours * 4.33 * hourlyRate;

  if (quiz.adminHoursPerWeek === "over20") {
    details.push(`✗ 20+ hours/week in admin tasks — ~${formatHours(weeklyHours * 4.33)} hours/month in manual work`);
    actions.push({
      priority: "critical",
      title: "Automate your administrative operations",
      description: `Your team is spending ~${formatHours(weeklyHours * 4.33)} hours/month on admin. At your team's cost rate, that's ~$${Math.round(monthlyAdminCost / 100) * 100}/month that could be automated for a fraction of the cost.`,
      estimatedImpact: `Free up ~${Math.round(weeklyHours * 0.7 * 4.33)} hours/month through automation`,
      productRecommendation: "Business AI Stack",
      tier: "build",
    });
  } else if (quiz.adminHoursPerWeek === "10to20") {
    details.push(`⚠ 10-20 hours/week in admin — significant automation opportunity`);
    actions.push({
      priority: "high",
      title: "Reduce administrative time by 60-80% with automation",
      description: "10-20 hours/week in manual admin is a solvable problem. Workflow automation can handle scheduling, reminders, data entry, and reporting automatically.",
      estimatedImpact: "Free up 6-16 hours/week per employee",
      productRecommendation: "Automation Starter Pack",
      tier: "build",
    });
  } else {
    details.push(`✓ Relatively low admin time — good operational efficiency`);
  }

  if (scan.hasBookingSystem) {
    details.push("✓ Online booking system detected");
  } else if (quiz.schedulingMethod === "phone") {
    details.push("✗ Phone-only scheduling — missing 40% of potential bookings that happen after hours");
    actions.push({
      priority: "high",
      title: "Add online scheduling to capture after-hours bookings",
      description: "40% of appointments are booked outside business hours. Phone-only scheduling loses every one of those.",
      estimatedImpact: "Up to 40% more bookings",
      productRecommendation: "Automation Starter Pack",
      tier: "build",
    });
  }

  return {
    score: Math.min(100, score),
    grade: scoreToGrade(Math.min(100, score)),
    label: "Operations",
    summary: score >= 70
      ? "Well-automated operations — good foundation for growth."
      : score >= 40
      ? "Some automation gaps costing you time and money."
      : "Heavily manual operations — significant time and cost bleeding daily.",
    details,
    estimatedMonthlySavings: Math.round(monthlyAdminCost * 0.65),
    estimatedRevenueImpact: 0,
    actions,
  };
}

function scoreFinanceAdmin(quiz: QuizAnswers, scan: ScanResults): CategoryResult {
  let score = 0;
  const details: string[] = [];
  const actions: RecommendedAction[] = [];

  const invoiceMap = { automated: 50, software: 30, manual: 0 };
  score += invoiceMap[quiz.invoicingMethod];

  const reportingMap = { realtime: 50, software: 35, spreadsheets: 15, gut: 0 };
  score += reportingMap[quiz.reportingMethod];

  if (scan.hasPaymentProcessing) {
    details.push("✓ Online payment processing detected");
  }

  if (quiz.invoicingMethod === "manual") {
    details.push("✗ Manual invoicing — delayed payments and time-consuming process");
    actions.push({
      priority: "high",
      title: "Automate invoicing and payment collection",
      description: "Manual invoicing delays cash flow and takes hours per week. Automated invoicing gets paid faster (avg 3x faster) and takes minutes vs. hours.",
      estimatedImpact: "60-80% faster payment cycles, ~3 hours/week saved",
      productRecommendation: "AI for Operations & Finance Course",
      tier: "course",
    });
  }

  if (quiz.reportingMethod === "gut" || quiz.reportingMethod === "spreadsheets") {
    details.push(`✗ ${quiz.reportingMethod === "gut" ? "No formal reporting — decisions made on instinct" : "Spreadsheet-based reporting — manual, error-prone, and days behind"}`);
    actions.push({
      priority: "high",
      title: "Build a real-time business intelligence dashboard",
      description: "Owners running on gut feel or outdated spreadsheets are making decisions with bad information. A real-time dashboard gives you the CEO view your business needs.",
      estimatedImpact: "Better decisions = compounding ROI over 12 months",
      productRecommendation: "Enterprise AI Build (Executive Dashboard)",
      tier: "build",
    });
  } else {
    details.push(`✓ ${quiz.reportingMethod === "realtime" ? "Real-time reporting and analytics" : "Software-based reporting"}`);
  }

  return {
    score: Math.min(100, score),
    grade: scoreToGrade(Math.min(100, score)),
    label: "Finance & Admin",
    summary: score >= 70
      ? "Strong financial systems and reporting."
      : score >= 40
      ? "Functional but manual — automation would improve cash flow and decision speed."
      : "Manual finance and admin is a growth bottleneck — and a significant cost.",
    details,
    estimatedMonthlySavings: quiz.invoicingMethod === "manual" ? 800 : 200,
    estimatedRevenueImpact: 0,
    actions,
  };
}

function scoreCustomerExperience(quiz: QuizAnswers, scan: ScanResults): CategoryResult {
  let score = 0;
  const details: string[] = [];
  const actions: RecommendedAction[] = [];

  if (scan.hasAIChat) {
    score += 40;
    details.push("✓ Live chat or AI chat on your website");
  } else {
    details.push("✗ No AI chat — visitors who won't call are leaving without a way to reach you");
    actions.push({
      priority: "high",
      title: "Add AI-powered chat to handle customer inquiries 24/7",
      description: "An AI chat agent answers questions, qualifies leads, and books appointments 24/7. Every after-hours inquiry currently goes unanswered.",
      estimatedImpact: "3-5x more after-hours leads captured",
      productRecommendation: "Automation Starter Pack",
      tier: "build",
    });
  }

  if (quiz.followUpProcess === "automated") {
    score += 35;
    details.push("✓ Automated follow-up sequences in place");
  } else if (quiz.followUpProcess === "partial") {
    score += 20;
    details.push("⚠ Partial follow-up automation");
  } else {
    details.push("✗ Manual follow-up — customers who don't hear back quickly go to competitors");
  }

  if (scan.hasBookingSystem) {
    score += 25;
    details.push("✓ Online booking available for customers");
  } else {
    details.push("⚠ No self-serve booking for customers");
  }

  return {
    score: Math.min(100, score),
    grade: scoreToGrade(Math.min(100, score)),
    label: "Customer Experience",
    summary: score >= 70
      ? "Strong customer experience automation."
      : score >= 40
      ? "Gaps in customer communication are costing you reviews and repeat business."
      : "Poor automated customer experience — customers feel ignored and go elsewhere.",
    details,
    estimatedMonthlySavings: 0,
    estimatedRevenueImpact: score < 50 ? 1500 : 0,
    actions,
  };
}

function scoreTechStack(quiz: QuizAnswers, scan: ScanResults): CategoryResult {
  let score = 0;
  const details: string[] = [];
  const actions: RecommendedAction[] = [];

  const toolCount = scan.techSignals.length;
  score = Math.min(80, toolCount * 15);

  if (toolCount >= 5) {
    details.push(`✓ Solid tech stack detected (${toolCount} tools found)`);
  } else if (toolCount >= 2) {
    details.push(`⚠ Basic tech stack (${toolCount} tools found) — gaps limiting automation potential`);
    actions.push({
      priority: "medium",
      title: "Audit and upgrade your technology stack",
      description: "Your current tech limits what can be automated. A proper stack assessment will identify the highest-ROI additions.",
      estimatedImpact: "Each right tool can save 5-15 hours/week",
      productRecommendation: "90-Day AI Quick Start",
      tier: "consulting",
    });
  } else {
    details.push("✗ Minimal technology infrastructure — almost no automation is possible");
    actions.push({
      priority: "critical",
      title: "Build your technology foundation",
      description: "Without a proper tech stack, you can't automate anything. We can design and implement the right stack for your business in 90 days.",
      estimatedImpact: "Enables all future automation",
      productRecommendation: "90-Day AI Quick Start",
      tier: "consulting",
    });
  }

  scan.techSignals.forEach((s) => details.push(`✓ ${s} detected`));

  return {
    score: Math.min(100, score),
    grade: scoreToGrade(Math.min(100, score)),
    label: "Tech Stack",
    summary: score >= 70
      ? "Good technology foundation for AI implementation."
      : score >= 40
      ? "Partial tech stack — missing tools are creating manual bottlenecks."
      : "Minimal technology in place — almost everything is manual.",
    details,
    estimatedMonthlySavings: 0,
    estimatedRevenueImpact: 0,
    actions,
  };
}

function scoreDataReadiness(quiz: QuizAnswers): CategoryResult {
  let score = 0;
  const details: string[] = [];
  const actions: RecommendedAction[] = [];

  const reportingMap = { realtime: 80, software: 55, spreadsheets: 25, gut: 5 };
  score = reportingMap[quiz.reportingMethod];

  if (quiz.reportingMethod === "realtime") {
    details.push("✓ Real-time data access — AI can act on current information");
  } else if (quiz.reportingMethod === "software") {
    details.push("⚠ Software-based data — good foundation, AI readiness could be higher");
  } else if (quiz.reportingMethod === "spreadsheets") {
    details.push("✗ Spreadsheet data — manual, siloed, and not AI-ready");
    actions.push({
      priority: "high",
      title: "Migrate from spreadsheets to a connected data system",
      description: "Spreadsheets can't feed AI tools in real time. Connected systems allow AI to monitor, alert, and act on your business data automatically.",
      estimatedImpact: "Unlocks AI automation across all business areas",
      productRecommendation: "Fractional AI Officer",
      tier: "fractional",
    });
  } else {
    details.push("✗ No systematic data tracking — AI needs data to work");
    actions.push({
      priority: "critical",
      title: "Start capturing structured business data",
      description: "AI is only as powerful as the data behind it. Without structured data, you can't automate or optimize anything. This is step one.",
      estimatedImpact: "Foundation for all AI ROI",
      productRecommendation: "90-Day AI Quick Start",
      tier: "consulting",
    });
  }

  if (quiz.crmUsage === "ai" || quiz.crmUsage === "advanced") {
    score = Math.min(100, score + 20);
    details.push("✓ Advanced CRM in use — good customer data foundation");
  }

  return {
    score: Math.min(100, score),
    grade: scoreToGrade(Math.min(100, score)),
    label: "Data Readiness",
    summary: score >= 70
      ? "Data is organized and accessible — strong AI foundation."
      : score >= 40
      ? "Some data infrastructure but gaps limit what AI can do."
      : "Minimal data structure — AI implementation requires this as a first step.",
    details,
    estimatedMonthlySavings: 0,
    estimatedRevenueImpact: 0,
    actions,
  };
}

export function buildRoadmap(
  categories: Record<AssessmentCategory, CategoryResult>,
  quiz: QuizAnswers
): RoadmapPhase[] {
  const overallScore =
    Object.values(categories).reduce((sum, c) => sum + c.score, 0) /
    Object.values(categories).length;

  if (overallScore >= 70) {
    return [
      {
        phase: 1,
        title: "Optimize & Scale",
        timeline: "Month 1-2",
        actions: ["Audit current AI tools for ROI", "Identify 2-3 automation gaps", "Upgrade to AI-native versions of key tools"],
        estimatedROI: "20-40% efficiency gain",
        recommendedProduct: "90-Day AI Quick Start",
      },
      {
        phase: 2,
        title: "Build Advanced Systems",
        timeline: "Month 3-5",
        actions: ["Implement predictive analytics", "Build automated reporting dashboard", "Deploy AI in customer experience"],
        estimatedROI: "30-60% cost reduction in targeted areas",
        recommendedProduct: "Business AI Stack",
      },
      {
        phase: 3,
        title: "AI-Native Operations",
        timeline: "Month 6+",
        actions: ["Full sales and marketing automation", "AI-driven decision support for leadership", "Continuous optimization loop"],
        estimatedROI: "2-4x output with same team size",
        recommendedProduct: "Fractional AI Officer",
      },
    ];
  } else if (overallScore >= 45) {
    return [
      {
        phase: 1,
        title: "Foundation & Quick Wins",
        timeline: "Month 1",
        actions: ["Personal AI training for owner", "Set up CRM if not present", "Automate follow-up sequences"],
        estimatedROI: "10-20 hours/week reclaimed",
        recommendedProduct: "AI Basics for Business Owners",
      },
      {
        phase: 2,
        title: "Team Enablement",
        timeline: "Month 2-3",
        actions: ["Team AI workshop", "Standardize AI tools across business", "Automate top 2-3 manual processes"],
        estimatedROI: "30-50% reduction in manual work",
        recommendedProduct: "Custom Team Workshop",
      },
      {
        phase: 3,
        title: "System Building",
        timeline: "Month 4-6",
        actions: ["Implement booking and scheduling automation", "Set up real-time reporting", "Launch email and follow-up automation"],
        estimatedROI: "Compounding ROI across all business functions",
        recommendedProduct: "90-Day AI Quick Start",
      },
    ];
  } else {
    return [
      {
        phase: 1,
        title: "AI Literacy (You & Your Team)",
        timeline: "Week 1-4",
        actions: ["Start using AI tools daily (ChatGPT, Claude)", "Identify your 3 biggest time drains", "Take AI Basics for Business Owners course"],
        estimatedROI: "5-10 hours/week immediately",
        recommendedProduct: "AI Basics for Business Owners",
      },
      {
        phase: 2,
        title: "Basic Automation",
        timeline: "Month 2-3",
        actions: ["Set up online booking", "Implement email follow-up automation", "Add AI chat to website"],
        estimatedROI: "20-30% more leads captured",
        recommendedProduct: "Automation Starter Pack",
      },
      {
        phase: 3,
        title: "Business Transformation",
        timeline: "Month 4-9",
        actions: ["Full sales and marketing automation", "Finance and admin automation", "Real-time executive dashboard"],
        estimatedROI: "Full ROI on AI investment typically within 90 days",
        recommendedProduct: "Business AI Stack or Fractional AI Officer",
      },
    ];
  }
}

function estimateTeamSavings(quiz: QuizAnswers): number {
  const teamMultiplier: Record<string, number> = { solo: 1, "2to5": 3, "6to20": 10, "21to50": 30, over50: 50 };
  return (teamMultiplier[quiz.teamSize] || 3) * 300;
}

function estimateRevenueLift(quiz: QuizAnswers): number {
  const revenueMap: Record<string, number> = {
    under250k: 2000,
    "250k_1m": 5000,
    "1m_5m": 12000,
    "5m_25m": 30000,
    over25m: 75000,
  };
  return revenueMap[quiz.revenueRange] || 5000;
}

function formatHours(hours: number): string {
  return `${Math.round(hours)} hrs`;
}
