import Link from "next/link";
import Nav from "@/components/Nav";

const VERTICALS = [
  {
    name: "Home Services",
    href: "/industries/home-services",
    description:
      "HVAC, plumbing, roofing, electrical, restoration, landscaping, pest control — businesses where every call is a revenue opportunity and speed-to-lead determines who wins the job.",
    trades: ["HVAC", "Plumbing", "Roofing", "Electrical", "Restoration", "Landscaping", "Pest Control"],
    stat: "52% average call answer rate industry-wide.",
    statDetail: "Nearly half of all inbound calls go unanswered. Every missed call is a lead a competitor captured.",
    source: "Invoca 2026",
    primaryPillars: ["Grow", "Operate"],
    accent: "border-green-700",
  },
  {
    name: "Professional Services",
    href: "/industries/professional-services",
    description:
      "Accounting, legal, consulting, engineering — firms where AI can compress billable work, sharpen client experience, and build measurable productivity gains across the team.",
    trades: ["Accounting & Tax", "Legal", "Consulting", "Engineering", "Architecture", "Financial Advisory"],
    stat: "Only 18% of professional service firms track AI ROI.",
    statDetail: "Most firms are using AI tools but can't measure what they're delivering. That's the gap we close.",
    source: "Thomson Reuters 2026",
    primaryPillars: ["Operate", "Enable"],
    accent: "border-brass",
  },
  {
    name: "Personal Services",
    href: "/industries/personal-services",
    description:
      "Dental, veterinary, wellness, med spa, fitness, beauty, senior services — appointment-driven businesses where utilization, no-show reduction, and retention drive profitability.",
    trades: ["Dental", "Veterinary", "Med Spa", "Wellness", "Fitness", "Beauty", "Senior Services"],
    stat: "40% call-to-appointment conversion on average.",
    statDetail: "Systematic follow-up and reactivation campaigns move that number meaningfully.",
    source: "Invoca 2026",
    primaryPillars: ["Grow", "Operate"],
    accent: "border-green-700",
  },
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />

      {/* Header */}
      <section className="bg-white pt-28 pb-16 px-6 border-b border-brass-light">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-ink leading-none tracking-tight">
            Built for service businesses.
          </h1>
          <p className="mt-6 text-ink-mid text-xl max-w-2xl leading-relaxed">
            Makr works with established service businesses across three markets. Our approach is different for each — because the economics, workflows, and growth levers are different.
          </p>
        </div>
      </section>

      {/* Local banner */}
      <section className="py-5 px-6 bg-green-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-green-100 text-sm">
            <strong className="text-white">Built in New England.</strong>{" "}
            Serving contractors and service businesses across Massachusetts, New Hampshire, and beyond. Local matters. Relationships matter.
          </p>
        </div>
      </section>

      {/* Vertical cards */}
      <section className="py-16 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto space-y-6">
          {VERTICALS.map((v) => (
            <div key={v.name} className={`bg-white border-l-4 ${v.accent} rounded-sm`}>
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h2 className="font-display font-bold text-3xl text-ink mb-3">{v.name}</h2>
                    <p className="text-ink-mid leading-relaxed mb-5">{v.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {v.trades.map((t) => (
                        <span key={t} className="text-xs bg-canvas border border-brass-light text-ink-mid px-3 py-1 rounded-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-ink-light">Primary pillars:</span>
                      {v.primaryPillars.map((p) => (
                        <span key={p} className="text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-sm font-semibold">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="bg-canvas border border-brass-light rounded-sm p-5">
                      <p className="font-semibold text-ink text-sm mb-1">{v.stat}</p>
                      <p className="text-ink-mid text-xs leading-relaxed">{v.statDetail}</p>
                      <p className="text-brass text-xs mt-2 font-medium">Source: {v.source}</p>
                    </div>
                    <Link
                      href={v.href}
                      className="mt-4 text-center block py-2.5 rounded-sm bg-ink text-white text-sm font-semibold hover:bg-green-700 transition-colors"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-green-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white leading-tight max-w-2xl">
            Not sure if Makr is a fit?
          </h2>
          <p className="mt-6 text-green-200 text-lg max-w-lg">
            Book an AI Opportunity Assessment. We&apos;ll tell you honestly whether we can help — and what the opportunity looks like for your specific business.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block bg-white text-green-900 hover:bg-green-50 px-8 py-4 rounded font-bold text-lg transition-colors"
            >
              Book an AI Opportunity Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
