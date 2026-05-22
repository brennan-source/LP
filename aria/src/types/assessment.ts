export type Grade = "A" | "B" | "C" | "D" | "F";

export type AssessmentCategory =
  | "aiLeadership"
  | "teamAdoption"
  | "salesMarketing"
  | "operations"
  | "financeAdmin"
  | "customerExperience"
  | "techStack"
  | "dataReadiness";

export interface CategoryResult {
  score: number;
  grade: Grade;
  label: string;
  summary: string;
  details: string[];
  estimatedMonthlySavings: number;
  estimatedRevenueImpact: number;
  actions: RecommendedAction[];
}

export interface RecommendedAction {
  priority: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  estimatedImpact: string;
  productRecommendation?: string;
  tier?: "course" | "workshop" | "consulting" | "fractional" | "build";
}

export interface ScanResults {
  hasAIChat: boolean;
  hasBookingSystem: boolean;
  hasCRM: boolean;
  hasEmailAutomation: boolean;
  hasAnalytics: boolean;
  hasPaymentProcessing: boolean;
  techSignals: string[];
}

export interface QuizAnswers {
  // AI literacy
  personalAIUsageFreq: "daily" | "weekly" | "monthly" | "rarely" | "never";
  aiToolsUsed: string[];
  // Team
  teamAIUsage: "all" | "some" | "few" | "none";
  aiTrainingDone: boolean;
  // Sales / marketing
  salesAutomationLevel: "none" | "partial" | "mostly" | "full";
  followUpProcess: "manual" | "partial" | "automated";
  crmUsage: "none" | "basic" | "advanced" | "ai";
  // Operations
  adminHoursPerWeek: "under5" | "5to10" | "10to20" | "over20";
  schedulingMethod: "phone" | "manual_online" | "automated" | "ai";
  biggestTimeDrain: string;
  // Finance / admin
  invoicingMethod: "manual" | "software" | "automated";
  reportingMethod: "gut" | "spreadsheets" | "software" | "realtime";
  // Context
  revenueRange: "under250k" | "250k_1m" | "1m_5m" | "5m_25m" | "over25m";
  teamSize: "solo" | "2to5" | "6to20" | "21to50" | "over50";
  topAutomationPriority: string;
}

export interface AriaReport {
  assessmentId: string;
  businessName: string;
  websiteUrl: string;
  industry: string;
  city: string;
  state: string;
  overallScore: number;
  overallGrade: Grade;
  estimatedMonthlySavings: number;
  estimatedAnnualSavings: number;
  estimatedRevenueImpact: number;
  automationOpportunityHours: number;
  categories: Record<AssessmentCategory, CategoryResult>;
  topPriorities: RecommendedAction[];
  roadmap: RoadmapPhase[];
  completedAt: string;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  timeline: string;
  actions: string[];
  estimatedROI: string;
  recommendedProduct?: string;
}
