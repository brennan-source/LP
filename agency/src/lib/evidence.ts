export interface EvidenceItem {
  id: string;
  vertical: "home-services" | "professional-services" | "personal-services" | "general";
  stat: string;
  context: string;
  source: string;
  report: string;
  year: number;
  url: string;
  verified: string;
  pagesUsed: string[];
  notes?: string;
}

export const EVIDENCE: EvidenceItem[] = [
  // Home Services — Invoca 2026
  {
    id: "hs-answer-rate",
    vertical: "home-services",
    stat: "52% answer rate",
    context: "Home service businesses answer only about half of inbound calls on average.",
    source: "Invoca",
    report: "Home Services Industry Benchmark Report 2026",
    year: 2026,
    url: "https://www.invoca.com/blog/home-services-call-analytics-benchmarks", // [VERIFY]
    verified: "pending",
    pagesUsed: ["/industries/home-services"],
    notes: "Benchmark across home service verticals. Exact sample size not published.",
  },
  {
    id: "hs-lead-rate",
    vertical: "home-services",
    stat: "38% lead conversion rate on answered calls",
    context: "Of the calls that do get answered, only 38% result in a qualified lead.",
    source: "Invoca",
    report: "Home Services Industry Benchmark Report 2026",
    year: 2026,
    url: "https://www.invoca.com/blog/home-services-call-analytics-benchmarks", // [VERIFY]
    verified: "pending",
    pagesUsed: ["/industries/home-services"],
  },
  {
    id: "hs-call-conversion",
    vertical: "home-services",
    stat: "45% call-to-appointment conversion",
    context: "Less than half of inbound calls result in a booked appointment.",
    source: "Invoca",
    report: "Home Services Industry Benchmark Report 2026",
    year: 2026,
    url: "https://www.invoca.com/blog/home-services-call-analytics-benchmarks", // [VERIFY]
    verified: "pending",
    pagesUsed: ["/industries/home-services"],
  },
  {
    id: "hs-no-ask-to-book",
    vertical: "home-services",
    stat: "55% of agents never ask the caller to book",
    context: "More than half of call handlers fail to actively ask for the appointment.",
    source: "Invoca",
    report: "Home Services Industry Benchmark Report 2026",
    year: 2026,
    url: "https://www.invoca.com/blog/home-services-call-analytics-benchmarks", // [VERIFY]
    verified: "pending",
    pagesUsed: ["/industries/home-services"],
    notes: "Refers to human agents failing to complete the conversion step.",
  },

  // Professional Services — Thomson Reuters 2026
  {
    id: "ps-org-genai-use",
    vertical: "professional-services",
    stat: "~40% of professional service organizations using GenAI (up from 22%)",
    context: "Adoption has nearly doubled year-over-year but most firms are still early.",
    source: "Thomson Reuters",
    report: "Future of Professionals Report 2026",
    year: 2026,
    url: "https://www.thomsonreuters.com/en/reports/future-of-professionals.html", // [VERIFY]
    verified: "pending",
    pagesUsed: ["/industries/professional-services"],
  },
  {
    id: "ps-weekly-users",
    vertical: "professional-services",
    stat: ">80% of AI-using professionals use it weekly",
    context: "Among those who have adopted AI tools, usage is already habitual.",
    source: "Thomson Reuters",
    report: "Future of Professionals Report 2026",
    year: 2026,
    url: "https://www.thomsonreuters.com/en/reports/future-of-professionals.html", // [VERIFY]
    verified: "pending",
    pagesUsed: ["/industries/professional-services"],
  },
  {
    id: "ps-central-expectation",
    vertical: "professional-services",
    stat: ">90% expect AI to be central to their workflows within 5 years",
    context: "Near-universal expectation of AI becoming core infrastructure.",
    source: "Thomson Reuters",
    report: "Future of Professionals Report 2026",
    year: 2026,
    url: "https://www.thomsonreuters.com/en/reports/future-of-professionals.html", // [VERIFY]
    verified: "pending",
    pagesUsed: ["/industries/professional-services"],
  },
  {
    id: "ps-roi-tracking",
    vertical: "professional-services",
    stat: "Only ~18% of firms track AI ROI",
    context: "Most firms using AI cannot measure what it's actually delivering.",
    source: "Thomson Reuters",
    report: "Future of Professionals Report 2026",
    year: 2026,
    url: "https://www.thomsonreuters.com/en/reports/future-of-professionals.html", // [VERIFY]
    verified: "pending",
    pagesUsed: ["/industries/professional-services"],
    notes: "This is the core problem Makr solves for professional services: connecting AI to measurable outcomes.",
  },
  {
    id: "ps-agentic-adoption",
    vertical: "professional-services",
    stat: "~15% have adopted agentic AI; ~53% planning or considering it",
    context: "Agentic AI (systems that act, not just answer) is the next wave — most firms haven't started.",
    source: "Thomson Reuters",
    report: "Future of Professionals Report 2026",
    year: 2026,
    url: "https://www.thomsonreuters.com/en/reports/future-of-professionals.html", // [VERIFY]
    verified: "pending",
    pagesUsed: ["/industries/professional-services"],
  },

  // Personal Services — Invoca 2026
  {
    id: "cs-lead-rate",
    vertical: "personal-services",
    stat: "34% lead rate on answered calls",
    context: "Personal service businesses convert roughly 1 in 3 answered calls to a lead.",
    source: "Invoca",
    report: "Consumer Services Industry Benchmark Report 2026",
    year: 2026,
    url: "https://www.invoca.com/blog/consumer-services-call-analytics-benchmarks", // [VERIFY]
    verified: "pending",
    pagesUsed: ["/industries/personal-services"],
  },
  {
    id: "cs-call-conversion",
    vertical: "personal-services",
    stat: "40% call-to-appointment conversion",
    context: "4 in 10 answered calls result in a booked appointment in personal services.",
    source: "Invoca",
    report: "Consumer Services Industry Benchmark Report 2026",
    year: 2026,
    url: "https://www.invoca.com/blog/consumer-services-call-analytics-benchmarks", // [VERIFY]
    verified: "pending",
    pagesUsed: ["/industries/personal-services"],
  },
];

export function getEvidence(id: string): EvidenceItem | undefined {
  return EVIDENCE.find((e) => e.id === id);
}

export function getEvidenceByVertical(vertical: EvidenceItem["vertical"]): EvidenceItem[] {
  return EVIDENCE.filter((e) => e.vertical === vertical);
}
