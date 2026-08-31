// Makr Evidence Library
// All statistics displayed on the website, with full sourcing.
// Review and update at least every 6–12 months.
// URLs marked [VERIFY] should be confirmed before publication.

export interface EvidenceItem {
  id: string;
  vertical: "home-services" | "professional-services" | "personal-services" | "general";
  industry?: string;
  stat: string;
  context: string;
  source: string;
  report: string;
  year: number;
  url: string;
  verified: string; // ISO date last verified
  pagesUsed: string[];
  notes?: string;
}

export const EVIDENCE: EvidenceItem[] = [
  // ─── HOME SERVICES ──────────────────────────────────────────────────────
  {
    id: "hs-answer-rate",
    vertical: "home-services",
    stat: "52% of callers to home-service businesses speak with a person",
    context: "Nearly half of all inbound calls go unanswered — direct revenue leakage at the top of the funnel.",
    source: "Invoca",
    report: "2026 Home Services Lead Conversion Benchmarks",
    year: 2026,
    url: "https://www.invoca.com/resources/home-services-lead-conversion-benchmarks", // [VERIFY]
    verified: "2026-08-31",
    pagesUsed: ["/industries/home-services"],
    notes: "Based on analysis of more than 70 million calls and 600 million minutes of conversation.",
  },
  {
    id: "hs-lead-rate",
    vertical: "home-services",
    stat: "38% of answered calls to home-service businesses are qualified leads",
    context: "More than one in three answered calls represents a genuine revenue opportunity.",
    source: "Invoca",
    report: "2026 Home Services Lead Conversion Benchmarks",
    year: 2026,
    url: "https://www.invoca.com/resources/home-services-lead-conversion-benchmarks", // [VERIFY]
    verified: "2026-08-31",
    pagesUsed: ["/industries/home-services"],
  },
  {
    id: "hs-call-conversion",
    vertical: "home-services",
    stat: "45% of qualified home-service leads convert on the call",
    context: "More than half of qualified leads don't convert on first contact — systematic follow-up is essential.",
    source: "Invoca",
    report: "2026 Home Services Lead Conversion Benchmarks",
    year: 2026,
    url: "https://www.invoca.com/resources/home-services-lead-conversion-benchmarks", // [VERIFY]
    verified: "2026-08-31",
    pagesUsed: ["/industries/home-services"],
  },
  {
    id: "hs-no-ask",
    vertical: "home-services",
    stat: "55% of home-service businesses don't ask leads to buy or book on the call",
    context: "More than half of answered calls end without any attempt to convert — a structural conversion failure.",
    source: "Invoca",
    report: "2026 Home Services Lead Conversion Benchmarks",
    year: 2026,
    url: "https://www.invoca.com/resources/home-services-lead-conversion-benchmarks", // [VERIFY]
    verified: "2026-08-31",
    pagesUsed: ["/industries/home-services"],
  },
  {
    id: "hs-5pp-model",
    vertical: "home-services",
    stat: "Improving answer rate, lead rate, and call conversion each by 5 percentage points produces approximately 38% more conversions",
    context: "Small, compounding improvements across the call funnel produce significant revenue impact.",
    source: "Invoca",
    report: "2026 Home Services Lead Conversion Benchmarks",
    year: 2026,
    url: "https://www.invoca.com/resources/home-services-lead-conversion-benchmarks", // [VERIFY]
    verified: "2026-08-31",
    pagesUsed: ["/industries/home-services"],
    notes: "Modeled benchmark scenario from Invoca data. Not a guaranteed customer result.",
  },

  // ─── PROFESSIONAL SERVICES ──────────────────────────────────────────────
  {
    id: "ps-genai-adoption",
    vertical: "professional-services",
    stat: "Organization-wide GenAI use in professional services reached approximately 40% in 2026, up from 22% the prior year",
    context: "AI adoption is accelerating rapidly — but most firms are still in early deployment.",
    source: "Thomson Reuters",
    report: "2026 AI in Professional Services Report",
    year: 2026,
    url: "https://www.thomsonreuters.com/en/reports/ai-in-professional-services.html", // [VERIFY]
    verified: "2026-08-31",
    pagesUsed: ["/industries/professional-services"],
    notes: "Research covers more than 1,500 professionals across legal, tax, accounting, risk, fraud, and government.",
  },
  {
    id: "ps-weekly-use",
    vertical: "professional-services",
    stat: "More than 80% of professional-services GenAI users use it weekly",
    context: "Those who have adopted AI rely on it consistently — the gap is between adopters and the rest of the firm.",
    source: "Thomson Reuters",
    report: "2026 AI in Professional Services Report",
    year: 2026,
    url: "https://www.thomsonreuters.com/en/reports/ai-in-professional-services.html", // [VERIFY]
    verified: "2026-08-31",
    pagesUsed: ["/industries/professional-services"],
  },
  {
    id: "ps-central-to-workflows",
    vertical: "professional-services",
    stat: "More than 90% of professional-services GenAI users expect AI to become central to workflows within five years",
    context: "AI is becoming core infrastructure in professional services — not a passing experiment.",
    source: "Thomson Reuters",
    report: "2026 AI in Professional Services Report",
    year: 2026,
    url: "https://www.thomsonreuters.com/en/reports/ai-in-professional-services.html", // [VERIFY]
    verified: "2026-08-31",
    pagesUsed: ["/industries/professional-services"],
  },
  {
    id: "ps-roi-tracking",
    vertical: "professional-services",
    stat: "Only approximately 18% of professional-services organizations track AI ROI",
    context: "Most firms are spending on AI without measuring its impact — a significant governance and value-realization gap.",
    source: "Thomson Reuters",
    report: "2026 AI in Professional Services Report",
    year: 2026,
    url: "https://www.thomsonreuters.com/en/reports/ai-in-professional-services.html", // [VERIFY]
    verified: "2026-08-31",
    pagesUsed: ["/industries/professional-services"],
  },
  {
    id: "ps-agentic-adoption",
    vertical: "professional-services",
    stat: "Agentic AI adoption in professional services is approximately 15%; another 53% are planning or considering it",
    context: "Most professional-services firms see agentic AI as a priority but have not yet implemented it.",
    source: "Thomson Reuters",
    report: "2026 AI in Professional Services Report",
    year: 2026,
    url: "https://www.thomsonreuters.com/en/reports/ai-in-professional-services.html", // [VERIFY]
    verified: "2026-08-31",
    pagesUsed: ["/industries/professional-services"],
  },

  // ─── PERSONAL / CONSUMER SERVICES ───────────────────────────────────────
  {
    id: "cs-lead-rate",
    vertical: "personal-services",
    stat: "34% of answered calls in consumer services are qualified leads",
    context: "More than one in three answered calls represents a genuine booking opportunity.",
    source: "Invoca",
    report: "2026 Consumer Services Lead Conversion Benchmarks",
    year: 2026,
    url: "https://www.invoca.com/resources/consumer-services-lead-conversion-benchmarks", // [VERIFY]
    verified: "2026-08-31",
    pagesUsed: ["/industries/personal-services"],
    notes: "Covers veterinary, tutoring/childcare, legal, storage, funeral services, and waste treatment.",
  },
  {
    id: "cs-call-conversion",
    vertical: "personal-services",
    stat: "40% of qualified leads in consumer services convert on the call",
    context: "60% of qualified leads don't book on first contact — follow-up and reactivation systems are critical.",
    source: "Invoca",
    report: "2026 Consumer Services Lead Conversion Benchmarks",
    year: 2026,
    url: "https://www.invoca.com/resources/consumer-services-lead-conversion-benchmarks", // [VERIFY]
    verified: "2026-08-31",
    pagesUsed: ["/industries/personal-services"],
  },
];

export function getEvidence(id: string): EvidenceItem | undefined {
  return EVIDENCE.find((e) => e.id === id);
}

export function getEvidenceByVertical(
  vertical: EvidenceItem["vertical"]
): EvidenceItem[] {
  return EVIDENCE.filter((e) => e.vertical === vertical);
}
