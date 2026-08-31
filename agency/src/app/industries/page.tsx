import Link from "next/link";
import Nav from "@/components/Nav";

const VERTICALS = [
  {
    name: "Home Services",
    label: "Primary focus",
    href: "/industries/home-services",
    description:
      "HVAC, plumbing, roofing, electrical, restoration, landscaping, pest control — businesses where every call is a revenue opportunity and speed-to-lead determines who wins.",
    trades: ["HVAC", "Plumbing", "Roofing", "Electrical", "Restoration", "Landscaping", "Pest Control"],
    stat: "52% average call answer rate industry-wide.",
    statDetail: "Nearly half of all inbound calls go unanswered. Every missed call is a lead your competitor captured.",
    source: "Invoca 2026",
    primaryPillars: ["Grow", "Operate"],
    color: "border-green-600",
    labelColor: "bg-green-600",
  },
  {
    name: "Professional Services",
    label: "Growing focus",
    href: "/industries/professional-services",
    description:
      "Accounting, legal, consulting, engineering — firms where AI can compress billable work, sharpen client experience, and build measurable productivity gains across the team.",
    trades: ["Accounting & Tax", "Legal", "Consulting", "Engineering", "Architecture", "Financial Advisory"],
    stat: "Only 18% of professional service firms track AI ROI.",
    statDetail: "Most firms are using AI tools but can't measure what they're delivering. That's the problem we solve.",
    source: "Thomson Reuters 2026",
    primaryPillars: ["Operate", "Enable"],
    color: "border-stone-400",
    labelColor: "bg-stone-500",
  },
  {
    name: "Personal Services",
    label: "Growing focus",
    href: "/industries/personal-services",
    description:
      "Dental, veterinary, wellness, med spa, fitness, beauty, senior services — appointment-driven businesses where utilization, no-show reduction, and retention drive profitability.",
    trades: ["Dental", "Veterinary", "Med Spa", "Wellness", "Fitness", "Beauty", "Senior Services"],
    stat: "40% call-to-appointment conversion on average.",
    statDetail: "There's room to grow with better follow-up systems and reactivation campaigns.",
    source: "Invoca 2026",
    primaryPillars: ["Grow", "Operate"],
    color: "border-stone-400",
    labelColor: "bg-stone-500",
  },
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Nav />

      {/* Header */}
      <section className="bg-white pt-24 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700 mb-4">Industries</p>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            Built for service businesses.
          </h1>
          <p className="text-xl text-stone-600">
            Makr works with established service businesses across three markets. Our approach is different
            for each — because the economics, workflows, and growth levers are different.
          </p>
        </div>
      </section>

      {/* Local banner */}
      <section className="py-8 px-6 bg-green-800 text-white text-center">
        <p className="text-green-100 text-sm max-w-2xl mx-auto">
          <strong>Built in New England.</strong> Serving contractors and service businesses across
          Massachusetts, New Hampshire, and beyond. Local matters. Relationships matter.
        </p>
      </section>

      {/* Vertical cards */}
      <section className="py-20 px-6 bg-stone-100">
        <div className="max-w-5xl mx-auto space-y-8">
          {VERTICALS.map((v) => (
            <div key={v.name} className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 ${v.color}`}>
              <div className="p-8">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-stone-900">{v.name}</h2>
                      <span className={`text-xs text-white px-3 py-1 rounded-full font-semibold ${v.labelColor}`}>
                        {v.label}
                      </span>
                    </div>
                    <p className="text-stone-600 max-w-xl">{v.description}</p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-4 max-w-xs text-sm">
                    <p className="font-bold text-stone-900 mb-1">{v.stat}</p>
                    <p className="text-stone-600 text-xs">{v.statDetail}</p>
                    <p className="text-stone-400 text-xs mt-1">Source: {v.source}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {v.trades.map((t) => (
                    <span key={t} className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex gap-2">
                    <span className="text-xs text-stone-500">Primary pillars:</span>
                    {v.primaryPillars.map((p) => (
                      <span key={p} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={v.href}
                    className="text-green-700 font-semibold text-sm hover:underline"
                  >
                    Learn more about {v.name} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-green-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Not sure if Makr is a fit?</h2>
          <p className="text-green-200 mb-8">
            Book a free AI Opportunity Assessment. We&apos;ll tell you honestly whether we can help —
            and what the opportunity looks like for your specific business.
          </p>
          <Link
            href="/contact"
            className="bg-white text-green-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition inline-block"
          >
            Book an AI Opportunity Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
