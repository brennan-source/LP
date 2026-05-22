import { QuizAnswers, ScanResults, AriaReport, AssessmentCategory } from "@/types/assessment";
import { scanWebsite } from "./scan";
import { computeCategories, buildRoadmap } from "./score";
import { scoreToGrade } from "@/lib/utils";

export { scanWebsite };

const CATEGORY_WEIGHTS: Record<AssessmentCategory, number> = {
  aiLeadership: 0.15,
  teamAdoption: 0.12,
  salesMarketing: 0.20,
  operations: 0.18,
  financeAdmin: 0.12,
  customerExperience: 0.10,
  techStack: 0.08,
  dataReadiness: 0.05,
};

export async function buildReport(
  assessmentId: string,
  businessName: string,
  websiteUrl: string,
  industry: string,
  city: string,
  state: string,
  quiz: QuizAnswers,
  scan: ScanResults
): Promise<AriaReport> {
  const categories = computeCategories(quiz, scan);

  const overallScore = Math.round(
    Object.entries(categories).reduce((sum, [key, cat]) => {
      return sum + cat.score * CATEGORY_WEIGHTS[key as AssessmentCategory];
    }, 0)
  );

  const estimatedMonthlySavings = Object.values(categories).reduce(
    (sum, cat) => sum + cat.estimatedMonthlySavings,
    0
  );

  const estimatedRevenueImpact = Object.values(categories).reduce(
    (sum, cat) => sum + cat.estimatedRevenueImpact,
    0
  );

  // Estimate automatable hours based on operations score
  const weeklyAdminHours = { under5: 3, "5to10": 7.5, "10to20": 15, over20: 25 };
  const automationOpportunityHours = Math.round(
    (weeklyAdminHours[quiz.adminHoursPerWeek as keyof typeof weeklyAdminHours] || 10) * 0.7 * 4.33
  );

  const allActions = Object.values(categories)
    .flatMap((cat) => cat.actions)
    .sort((a, b) => {
      const order = { critical: 0, high: 1, medium: 2, low: 3 };
      return order[a.priority] - order[b.priority];
    });

  return {
    assessmentId,
    businessName,
    websiteUrl,
    industry,
    city,
    state,
    overallScore,
    overallGrade: scoreToGrade(overallScore),
    estimatedMonthlySavings,
    estimatedAnnualSavings: estimatedMonthlySavings * 12,
    estimatedRevenueImpact,
    automationOpportunityHours,
    categories,
    topPriorities: allActions.slice(0, 5),
    roadmap: buildRoadmap(categories, quiz),
    completedAt: new Date().toISOString(),
  };
}
