import Link from "next/link";
import Nav from "@/components/Nav";

const ENGAGEMENTS = [
  {
    name: "AI Opportunity Audit",
    price: "$2,500 – $5,000",
    type: "One-time",
    tagline: "Understand exactly where AI creates value for your business.",
    description:
      "A structured discovery engagement. We interview your team, map your workflows, and deliver a prioritized AI roadmap with clear ROI projections. No obligation to continue — but most clients do.",
    includes: [
      "Current-state workflow analysis",
      "AI opportunity identification across Grow / Operate / Enable",
      "Prioritized roadmap with effort and impact estimates",
      "Tool and integration recommendations",
      "Written summary deck",
    ],
    cta: "Start here",
    ctaHref: "/contact",
    featured: false,
  },
  {
    name: "Implementation Projects",
    price: "$5,000 – $25,000+",
    type: "Per project, scoped separately",
    tagline: "Build the AI systems your business needs.",
    description:
      "Discrete builds: AI receptionist, CRM automation, estimate follow-up systems, scheduling workflows, billing automation. Each project is scoped and priced before work begins — no surprises.",
    includes: [
      "Scoped requirements and architecture",
      "Build, configuration, and integration",
      "Testing and QA",
      "Team handoff and training",
      "30-day post-launch support",
    ],
    cta: "Tell us what you need",
    ctaHref: "/contact",
    featured: false,
  },
  {
    name: "Revenue Engine",
    price: "~$3,500 / month",
    type: "Managed — ongoing",
    tagline: "Let Makr run your AI systems so you can focus on your business.",
    description:
      "Our flagship managed engagement. We deploy, operate, and continuously optimize AI systems across your business. Monthly reporting connects AI activity to business outcomes.",
    includes: [
      "AI receptionist + lead capture systems",
      "CRM integration and automation",
      "Estimate follow-up and booking automation",
      "Review generation",
      "Monthly performance reporting",
      "Continuous optimization",
      "Dedicated account management",
    ],
    note: "Implementation fee applies. Scoped per business.",
    cta: "Book an Assessment",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Revenue OS",
    price: "From $5,000 / month",
    type: "Managed + custom implementation",
    tagline: "Full-stack AI operations for businesses building a durable advantage.",
    description:
      "Everything in Revenue Engine plus custom-built AI infrastructure, team enablement programs, and executive-level reporting. Scope and pricing determined after an Audit.",
    includes: [
      "All Revenue Engine capabilities",
      "Custom AI workflow development",
      "Team training and AI adoption program",
      "Quarterly business reviews",
      "Priority support",
      "Custom reporting and dashboards",
    ],
    note: "Custom scope required. Start with an AI Opportunity Audit.",
    cta: "Let's talk",
    ctaHref: "/contact",
    featured: false,
  },
];

const PILLAR_COVERAGE = [
  { engagement: "AI Opportunity Audit", grow: false, operate: false, enable: true },
  { engagement: "Implementation Projects", grow: true, operate: true, enable: false },
  { engagement: "Revenue Engine", grow: true, operate: true, enable: true },
  { engagement: "Revenue OS", grow: true, operate: true, enable: true },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Nav />

      {/* Header */}
      <section className="bg-white pt-24 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700 mb-4">Pricing</p>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            Transparent pricing. No surprises.
          </h1>
          <p className="text-xl text-stone-600">
            Most clients start with an AI Opportunity Audit, then move into a managed engagement.
            We publish our numbers because we think you deserve to know what you&apos;re buying before you get on a call.
          </p>
        </div>
      </section>

      {/* Engagement Cards */}
      <section className="py-16 px-6 bg-stone-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {ENGAGEMENTS.map((e) => (
            <div
              key={e.name}
              className={`rounded-xl bg-white shadow-sm overflow-hidden flex flex-col ${
                e.featured ? "ring-2 ring-green-600" : ""
              }`}
            >
              {e.featured && (
                <div className="bg-green-700 text-white text-xs font-bold uppercase tracking-widest text-center py-2">
                  Flagship — Most Common Starting Point
                </div>
              )}
              <div className="p-8 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-stone-900">{e.name}</h2>
                    <p className="text-sm text-stone-500 mt-0.5">{e.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-700">{e.price}</div>
                  </div>
                </div>
                <p className="text-green-800 font-medium text-sm mb-3">{e.tagline}</p>
                <p className="text-stone-600 text-sm mb-6">{e.description}</p>
                <ul className="space-y-2 mb-6">
                  {e.includes.map((item) => (
                    <li key={item} className="text-sm text-stone-700 flex items-start gap-2">
                      <span className="text-green-600 mt-0.5 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                {e.note && (
                  <p className="text-xs text-stone-500 italic mb-4">{e.note}</p>
                )}
              </div>
              <div className="px-8 pb-8">
                <Link
                  href={e.ctaHref}
                  className={`block text-center py-3 rounded-lg font-semibold transition ${
                    e.featured
                      ? "bg-green-700 text-white hover:bg-green-800"
                      : "bg-stone-100 text-stone-800 hover:bg-stone-200"
                  }`}
                >
                  {e.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillar coverage matrix */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">What&apos;s included across pillars</h2>
          <p className="text-center text-stone-600 text-sm mb-8">
            Makr&apos;s three capability pillars — Grow, Operate, Enable — map to different engagement types.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="text-left py-3 pr-6 font-semibold text-stone-700">Engagement</th>
                  <th className="text-center py-3 px-4 font-semibold text-green-700">Grow</th>
                  <th className="text-center py-3 px-4 font-semibold text-green-800">Operate</th>
                  <th className="text-center py-3 px-4 font-semibold text-green-900">Enable</th>
                </tr>
              </thead>
              <tbody>
                {PILLAR_COVERAGE.map((row) => (
                  <tr key={row.engagement} className="border-b border-stone-100">
                    <td className="py-3 pr-6 text-stone-800 font-medium">{row.engagement}</td>
                    <td className="text-center py-3 px-4">
                      {row.grow ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-stone-300">—</span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {row.operate ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-stone-300">—</span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {row.enable ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-stone-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ-style notes */}
      <section className="py-16 px-6 bg-stone-100">
        <div className="max-w-3xl mx-auto space-y-6 text-sm text-stone-600">
          <div>
            <h3 className="font-semibold text-stone-900 mb-1">Why publish prices?</h3>
            <p>
              Because you shouldn&apos;t have to get on a sales call to find out if something is in your budget.
              These are real numbers. Exact project pricing depends on scope, which we define before any work begins.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 mb-1">What&apos;s the implementation fee on managed engagements?</h3>
            <p>
              Implementation fees are scoped per business based on what needs to be built. We quote it upfront —
              no surprises after you sign.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 mb-1">Where should I start?</h3>
            <p>
              An AI Opportunity Audit is the right starting point for most businesses. It gives you a clear
              picture of where AI creates value before you invest in implementation or a managed engagement.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-green-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-green-200 mb-8">
            Book an AI Opportunity Assessment. We&apos;ll identify where AI creates the most value for your business
            and give you a clear roadmap.
          </p>
          <Link
            href="/contact"
            className="bg-white text-green-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition inline-block"
          >
            Book an AI Opportunity Assessment
          </Link>
          <p className="text-green-300 text-sm mt-4">Complimentary for qualified service businesses.</p>
        </div>
      </section>
    </div>
  );
}
