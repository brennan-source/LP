import Link from "next/link";
import Nav from "@/components/Nav";

const VERTICALS = [
  {
    name: "Home Services",
    href: "/industries/home-services",
    number: "01",
    description:
      "HVAC, plumbing, roofing, electrical, restoration, landscaping, pest control. Every call is a revenue opportunity. Speed-to-lead determines who wins the job.",
    trades: ["HVAC", "Plumbing", "Roofing", "Electrical", "Restoration", "Landscaping", "Pest Control"],
    stat: "52%",
    statLabel: "average call answer rate industry-wide",
    statDetail: "Nearly half of all inbound calls go unanswered. Every missed call is a lead a competitor captured.",
    source: "Invoca 2026",
    accentBg: "bg-green-700",
    accentText: "text-green-700",
  },
  {
    name: "Professional Services",
    href: "/industries/professional-services",
    number: "02",
    description:
      "Accounting, legal, consulting, engineering. AI can compress billable work, sharpen client experience, and build measurable productivity gains across the team.",
    trades: ["Accounting & Tax", "Legal", "Consulting", "Engineering", "Architecture", "Financial Advisory"],
    stat: "18%",
    statLabel: "of professional service firms track AI ROI",
    statDetail: "Most firms are using AI tools but can't measure what they're delivering. That's the gap we close.",
    source: "Thomson Reuters 2026",
    accentBg: "bg-brass",
    accentText: "text-brass",
  },
  {
    name: "Personal Services",
    href: "/industries/personal-services",
    number: "03",
    description:
      "Dental, veterinary, wellness, med spa, fitness, beauty. Appointment-driven businesses where utilization, no-show reduction, and retention drive profitability.",
    trades: ["Dental", "Veterinary", "Med Spa", "Wellness", "Fitness", "Beauty", "Senior Services"],
    stat: "40%",
    statLabel: "average call-to-appointment conversion",
    statDetail: "Systematic follow-up and reactivation campaigns move that number meaningfully.",
    source: "Invoca 2026",
    accentBg: "bg-green-700",
    accentText: "text-green-700",
  },
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />

      {/* Header */}
      <section className="bg-white pt-28 pb-20 px-6 border-b border-brass-light">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-ink leading-none tracking-tight">
            Built for service businesses.
          </h1>
          <p className="mt-6 text-ink-mid text-xl max-w-2xl leading-relaxed">
            The economics, workflows, and growth levers are different for each market we serve.
            Our approach reflects that.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            {VERTICALS.map((v) => (
              <a key={v.name} href={`#${v.number}`} className="group flex items-center gap-3">
                <span className="font-display font-bold text-4xl md:text-5xl text-brass-light group-hover:text-brass transition-colors leading-none">{v.number}</span>
                <span className="text-ink-mid text-sm font-medium group-hover:text-ink transition-colors">{v.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* New England banner */}
      <div className="bg-ink px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-canvas-warm">
            <span className="text-brass font-semibold">Built in New England.</span>{" "}
            Serving contractors and service businesses across Massachusetts, New Hampshire, and beyond.
          </p>
        </div>
      </div>

      {/* Verticals */}
      {VERTICALS.map((v, i) => (
        <section
          key={v.name}
          id={v.number}
          className={`py-24 px-6 border-b border-brass-light ${i % 2 === 0 ? "bg-canvas" : "bg-white"}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-display font-bold text-6xl text-brass-light leading-none">{v.number}</span>
                  <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">{v.name}</h2>
                </div>
                <p className="text-ink-mid leading-relaxed mb-8 text-lg">{v.description}</p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {v.trades.map((t) => (
                    <span key={t} className="text-xs bg-canvas-warm border border-brass-light text-ink-mid px-3 py-1.5 rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={v.href}
                  className="inline-block bg-ink text-white hover:bg-green-700 transition-colors px-6 py-3 rounded-sm font-semibold text-sm"
                >
                  Learn more about {v.name} →
                </Link>
              </div>
              <div className={`${i % 2 === 1 ? "md:order-1" : ""} flex flex-col justify-start`}>
                <div className="bg-white border border-brass-light rounded-sm p-8">
                  <div className={`font-display font-extrabold text-7xl md:text-8xl ${v.accentText} leading-none mb-3`}>
                    {v.stat}
                  </div>
                  <p className="font-semibold text-ink mb-3 leading-snug">{v.statLabel}</p>
                  <p className="text-ink-mid text-sm leading-relaxed">{v.statDetail}</p>
                  <p className="text-brass text-xs mt-4 font-medium">Source: {v.source}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

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
