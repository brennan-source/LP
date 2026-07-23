export interface BusinessInput {
  businessName: string;
  websiteUrl: string;
  phoneNumber?: string;
  industry: string;
  city: string;
  state: string;
  email: string;
  revenueRange?: string;
}

export interface CategoryScore {
  score: number; // 0-100
  grade: Grade;
  label: string;
  summary: string;
  details: string[];
  estimatedRevenueLoss?: number; // monthly USD
  competitorAvg: number;
  actions: ActionItem[];
}

export interface ActionItem {
  priority: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  estimatedImpact: string;
}

export interface Competitor {
  name: string;
  domain: string;
  rating?: number;
  reviewCount?: number;
}

export type ScoreCategory =
  | "website"
  | "seo"
  | "socialMedia"
  | "digitalFootprint"
  | "paidAds"
  | "aiSearch"
  | "leadCapture";

export type Grade = "A" | "B" | "C" | "D" | "F";

export interface RoadmapAction extends ActionItem {
  category: ScoreCategory;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  dayRange: string;
  actions: RoadmapAction[];
}

export interface GrowthScoreResults {
  submissionId: string;
  businessName: string;
  websiteUrl: string;
  industry: string;
  city: string;
  state: string;
  revenueRange?: string;
  overallScore: number;
  overallGrade: Grade;
  competitorAvgScore: number;
  estimatedMonthlyRevenueLoss: number;
  categories: Record<ScoreCategory, CategoryScore>;
  competitors: Competitor[];
  topPriorities: ActionItem[];
  roadmap: RoadmapPhase[];
  completedAt: string;
}

export interface GrowthScoreSubmission {
  id: string;
  status: "pending" | "running" | "complete" | "failed";
  results?: GrowthScoreResults;
}
