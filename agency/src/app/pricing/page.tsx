import Link from "next/link";
import Nav from "@/components/Nav";

const RETAINERS = [
  {
    name: "Essentials",
    price: "$1,500",
    period: "/month",
    tagline: "Core AI capture running 24/7.",
    description:
      "The fundamentals: every call answered, every lead captured, your CRM kept current. The starting point for businesses ready to stop missing revenue.",
    includes: [
      "AI receptionist — 24/7 call handling",
      "Missed-call recovery automation",
      "Web chat & lead capture",
      "CRM integration & data sync",
      "Monthly performance report",
    ],
    note: "Implementation fee applies. Scoped per business.",
    featured: false,
  },
  {
    name: "Growth",
    price: "$3,500",
    period: "/month",
    tagline: "Full revenue operations, managed.",
    description:
      "Our flagship. We run your AI systems end to end — capturing leads, booking jobs, following up on estimates, generating reviews, and reporting on what it's producing.",
    includes: [
      "Everything in Essentials",
      "Appointment booking automation",
      "Estimate follow-up system",
      "Review generation & management",
      "Scheduling & dispatch workflows",
      "Back-office reporting",
      "Dedicated account management",
      "Continuous optimization",
    ],
    note: "Implementation fee applies. Scoped per business.",
    featured: true,
  },
];

const PROJECTS_AND_CUSTOM = [
  {
    name: "Projects",
    price: "$4,000–$10,000+",
    period: "one-time, per project",
    tagline: "Scoped builds. No monthly commitment.",
    description:
      "AI receptionist setups, CRM buildouts, scheduling automation, billing workflows — scoped and priced before work begins. Own it outright.",
    includes: [
      "Scoped requirements & architecture",
      "Build, configuration, and integration",
      "Testing and QA",
      "Team handoff & training",
      "30-day post-launch support",
    ],
    note: "Scope defined upfront. No surprises.",
    featured: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "let’s scope it",
    tagline: "For complex or multi-location operations.",
    description:
      "Full-stack AI operations for businesses with multiple locations, large teams, or complex workflows. Scope and pricing after discovery.",
    includes: [
      "All Growth capabilities",
      "Custom workflow development",
      "Team AI adoption program",
      "Multi-location support",
      "Quarterly business reviews",
      "Priority support",
    ],
    note: "Start with an AI Opportunity Assessment.",
    featured: false,
  },
];

const DECISION_CARDS = [
  {
    label: "Start with Essentials",
    accent: "border-green-700",
    badge: "bg-green-700",
    fit: "You're losing revenue from missed calls and slow follow-up, and want to prove the ROI before going deeper.",
    signs: [
      "Calls go to voicemail after hours",
      "Leads slip through without follow-up",
      "You want results before a bigger commitment",
    ],
  },
  {
    label: "Start with Growth",
    accent: "border-green-800",
    badge: "bg-green-800",
    fit: "You’re ready to run your revenue operations end to end and want a dedicated partner managing it.",
    signs: [
      "You’re already capturing leads but losing them later",
      "Estimates go unfollowed, reviews go unrequested",
      "You want someone accountable for outcomes",
    ],
  },
  {
    label: "Start with a Project",
    accent: "border-brass",
    badge: "bg-brass",
    fit: "You have a specific system to build and don’t want a monthly commitment.",
    signs: [
      "CRM buildout, scheduling automation, billing workflow",
      "You want to own it outright",
      "You’ll manage it internally after handoff",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />

      {/* Header */}
      <section className="bg-white pt-28 pb-16 px-6 border-b border-brass-light">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-ink leading-none tracking-tight">
            Transparent pricing.
            <br />
            No surprises.
          </h1>
          <p className="mt-6 text-ink-mid text-xl max-w-2xl leading-relaxed">
            We publish our numbers because you shouldn&apos;t have to get on a sales call to find out if something is in your budget. Monthly retainers, one-time projects, or custom scope — you pick the model that fits.
          </p>
        </div>
      </section>

      {/* Monthly Retainers */}
      <section className="py-16 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-brass mb-8">Monthly retainers</p>
          <div className="grid md:grid-cols-2 gap-6">
            {RETAINERS.map((t) => (
              <div
                key={t.name}
                className={`rounded-sm flex flex-col ${
                  t.featured
                    ? "bg-green-700 ring-2 ring-green-600"
                    : "bg-white border border-brass-light"
                }`}
              >
                {t.featured && (
                  <div className="px-7 pt-5 pb-0">
                    <span className="text-xs font-bold uppercase tracking-widest text-green-200">
                      Flagship &middot; Most Popular
                    </span>
                  </div>
                )}
                <div className="p-7 flex-1">
                  <div className="flex items-end justify-between mb-4">
                    <h2 className={`font-display font-bold text-3xl ${t.featured ? "text-white" : "text-ink"}`}>
                      {t.name}
                    </h2>
                    <div className="text-right">
                      <span className={`text-3xl font-bold ${t.featured ? "text-white" : "text-green-700"}`}>
                        {t.price}
                      </span>
                      <span className={`text-sm ml-1 ${t.featured ? "text-green-200" : "text-ink-light"}`}>
                        {t.period}
                      </span>
                    </div>
                  </div>
                  <p className={`font-medium mb-2 ${t.featured ? "text-green-100" : "text-green-700"}`}>
                    {t.tagline}
                  </p>
                  <p className={`text-sm leading-relaxed mb-6 ${t.featured ? "text-green-100" : "text-ink-mid"}`}>
                    {t.description}
                  </p>
                  <ul className="space-y-2">
                    {t.includes.map((item) => (
                      <li
                        key={item}
                        className={`text-sm flex items-start gap-2 ${t.featured ? "text-green-100" : "text-ink-mid"}`}
                      >
                        <span className={`mt-0.5 shrink-0 ${t.featured ? "text-green-300" : "text-green-600"}`}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {t.note && (
                    <p className={`text-xs mt-4 italic ${t.featured ? "text-green-300" : "text-ink-light"}`}>
                      {t.note}
                    </p>
                  )}
                </div>
                <div className="px-7 pb-7">
                  <Link
                    href="/contact"
                    className={`block text-center py-3 rounded font-semibold transition-colors ${
                      t.featured
                        ? "bg-white text-green-700 hover:bg-green-50"
                        : "bg-ink text-white hover:bg-green-700"
                    }`}
                  >
                    Get started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects + Enterprise */}
      <section className="py-16 px-6 bg-white border-y border-brass-light">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-brass mb-8">One-time &amp; custom</p>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS_AND_CUSTOM.map((t) => (
              <div key={t.name} className="bg-canvas border border-brass-light rounded-sm flex flex-col">
                <div className="p-7 flex-1">
                  <div className="flex items-end justify-between mb-4">
                    <h2 className="font-display font-bold text-3xl text-ink">{t.name}</h2>
                    <div className="text-right">
                      <span className="text-xl font-bold text-green-700">{t.price}</span>
                      <div className="text-xs text-ink-light mt-0.5">{t.period}</div>
                    </div>
                  </div>
                  <p className="font-medium text-green-700 mb-2">{t.tagline}</p>
                  <p className="text-sm text-ink-mid leading-relaxed mb-6">{t.description}</p>
                  <ul className="space-y-2">
                    {t.includes.map((item) => (
                      <li key={item} className="text-sm text-ink-mid flex items-start gap-2">
                        <span className="text-green-600 mt-0.5 shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {t.note && (
                    <p className="text-xs mt-4 italic text-ink-light">{t.note}</p>
                  )}
                </div>
                <div className="px-7 pb-7">
                  <Link
                    href="/contact"
                    className="block text-center py-3 rounded font-semibold bg-ink text-white hover:bg-green-700 transition-colors"
                  >
                    Get started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Which tier fits? */}
      <section className="py-16 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-ink mb-2">Which tier fits your situation?</h2>
          <p className="text-ink-mid text-sm mb-10">Most clients know within the first conversation. Here&apos;s a quick read.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {DECISION_CARDS.map((card) => (
              <div key={card.label} className={`bg-white border-l-4 ${card.accent} rounded-sm p-6`}>
                <div className={`inline-block ${card.badge} text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4`}>
                  {card.label}
                </div>
                <p className="text-ink-mid text-sm leading-relaxed mb-5">{card.fit}</p>
                <ul className="space-y-2">
                  {card.signs.map((s) => (
                    <li key={s} className="text-xs text-ink-mid flex items-start gap-2">
                      <span className="text-green-600 mt-0.5 shrink-0">→</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white border-t border-brass-light">
        <div className="max-w-3xl mx-auto space-y-7">
          {[
            {
              q: "Why publish prices publicly?",
              a: "Because you shouldn’t have to get on a sales call to know if something fits your budget. These are real numbers. Project pricing depends on scope, which we define and agree on before any work begins.",
            },
            {
              q: "What’s the implementation fee?",
              a: "Implementation fees for managed retainers are scoped per business based on what needs to be built. We quote it upfront — no surprises after you sign.",
            },
            {
              q: "Where should I start?",
              a: "Most clients start with a quick conversation. We’ll look at your business, tell you honestly where AI creates the most value, and recommend a starting point — no obligation.",
            },
          ].map((faq) => (
            <div key={faq.q} className="border-l-2 border-brass pl-5">
              <h3 className="font-semibold text-ink mb-1">{faq.q}</h3>
              <p className="text-ink-mid text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-green-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white leading-tight max-w-2xl">
            Ready to get started?
          </h2>
          <p className="mt-6 text-green-200 text-lg max-w-lg">
            Book an AI Opportunity Assessment. We’ll identify where AI creates the most value for your business and give you a clear plan.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link
              href="/contact"
              className="bg-white text-green-900 hover:bg-green-50 px-8 py-4 rounded font-bold text-lg transition-colors"
            >
              Book an AI Opportunity Assessment
            </Link>
            <span className="text-green-400 text-sm">Complimentary for qualified service businesses.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
