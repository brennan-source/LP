// Target verticals for the Growth Score: established local service businesses —
// home services, healthcare practices, and professional services. Trimmed from a
// broader industry list to match Makr's positioning (5-100 employees, $1M-$20M revenue).
export const INDUSTRY_GROUPS: { group: string; industries: string[] }[] = [
  {
    group: "Home Services",
    industries: [
      "Plumber",
      "Electrician",
      "HVAC / Heating & Cooling",
      "Roofer",
      "General Contractor",
      "Landscaper / Lawn Care",
      "Cleaning Service",
      "Painter",
      "Pest Control",
    ],
  },
  {
    group: "Healthcare Practices",
    industries: [
      "Dentist",
      "Chiropractor",
      "Physical Therapist",
      "Veterinarian",
    ],
  },
  {
    group: "Professional Services",
    industries: [
      "Attorney / Law Firm",
      "Accountant / CPA",
      "Real Estate Agent",
      "Insurance Agent",
      "Financial Advisor",
    ],
  },
];

export const INDUSTRIES: string[] = INDUSTRY_GROUPS.flatMap((g) => g.industries);

export const REVENUE_RANGES: { value: string; label: string }[] = [
  { value: "under250k", label: "Under $250K" },
  { value: "250k_1m", label: "$250K – $1M" },
  { value: "1m_5m", label: "$1M – $5M" },
  { value: "5m_25m", label: "$5M – $25M" },
  { value: "over25m", label: "$25M+" },
];

export const US_STATES: string[] = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
  "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT",
  "VA", "WA", "WV", "WI", "WY",
];
