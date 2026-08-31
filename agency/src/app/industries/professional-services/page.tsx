import Link from "next/link";
import Nav from "@/components/Nav";

// Evidence: Thomson Reuters Future of Professionals Report 2026
// URL pending verification — see agency/src/lib/evidence.ts

const STATS = [
  {
    stat: "~40%",
    label: "of firms using GenAI",
    detail: "Up from 22% the prior year. Adoption is accelerating — but most firms are still early.",
    source: "Thomson Reuters 2026",
  },
  {
    stat: ">80%",
    label: "of adopters use AI weekly",
    detail: "Among firms that have adopted AI, usage is already habitual and widespread.",
    source: "Thomson Reuters 2026",
  },
  {
    stat: ">90%",
    label: "expect AI to be central within 5 years",
    detail: "Near-universal expectation that AI becomes core infrastructure — not a tool, not an experiment.",
    source: "Thomson Reuters 2026",
  },
  {
    stat: "~18%",
    label: "actually track AI ROI",
    detail: "Most firms using AI can't measure what it's delivering. Spending without accountability.",
    source: "Thomson Reuters 2026",
  },
];

const SEGMENTS = [
  {
    name: "Accounting & Tax",
    icon: "📊",
    opportunity: "Document processing, client communication workflows, and deadline-driven automation.",
    capabilities: ["Tax document intake automation", "Client communication drafting", "Workflow and deadline tracking"],
  },
  {
    name: "Legal",
    icon: "⚖️",
    opportunity: "Research compression, document review, and client intake — without compromising judgment.",
    capabilities: ["Client intake automation", "Research and summarization workflows", "Document generation frameworks"],
  },
  {
    name: "Consulting",
    icon: "📈",
    opportunity: "Proposal efficiency, research synthesis, and team productivity at scale.",
    capabilities: ["Proposal and deck acceleration", "Research synthesis workflows", "Team AI adoption programs"],
  },
  {
    name: "Engineering & Architecture",
    icon: "📐",
    opportunity: "Specification review, project documentation, and client communication at volume.",
    capabilities: ["Project documentation workflows", "Spec and code review assistance", "Client reporting automation"],
  },
  {
    name: "Financial Advisory",
    icon: "💼",
    opportunity: "Client reporting, portfolio commentary, and compliance documentation efficiency.",
    capabilities: ["Client reporting automation", "Commentary and explanation drafting", "Compliance workflow support"],
  },
];

const HONEST_NOTE = {
  heading: "A note on where we are with professional services",
  body: "Home services is our primary focus today. Professional services is a growing area — we're working with a smaller number of firms and learning what creates the most value. If you want to be part of early engagements, this is a good time to start a conversation.",
};

export default function ProfessionalServicesPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Nav />

      {/* Header */}
      <section className="bg-white pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/industries" className="text-sm text-stone-500 hover:text-green-700 transition">
              Industries
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-sm font-semibold text-green-700">Professional Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            Most professional service firms are using AI. Very few are measuring what it delivers.
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl">
            Makr helps accounting firms, law firms, consultancies, and other professional service businesses
            turn scattered AI experiments into measurable productivity gains and client outcomes.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition inline-block"
            >
              Book an AI Opportunity Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Honest note */}
      <section className="py-6 px-6 bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto flex items-start gap-4">
          <span className="text-amber-600 text-xl mt-0.5">ℹ</span>
          <div>
            <p className="font-semibold text-amber-900 text-sm">{HONEST_NOTE.heading}</p>
            <p className="text-amber-800 text-sm mt-1">{HONEST_NOTE.body}</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-stone-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Where professional services stands with AI</h2>
          <p className="text-stone-600 mb-8 text-sm">
            Source: Thomson Reuters Future of Professionals Report 2026. Industry benchmarks — not Makr customer results.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.stat} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-4xl font-bold text-green-700 mb-2">{s.stat}</div>
                <div className="font-semibold text-stone-900 text-sm mb-2">{s.label}</div>
                <p className="text-stone-500 text-xs">{s.detail}</p>
                <p className="text-stone-400 text-xs mt-1">{s.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The core problem */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">The problem isn&apos;t access to AI tools. It&apos;s accountability.</h2>
          <p className="text-stone-600 text-lg mb-4">
            More than 80% of professionals who use AI use it weekly. But only 18% of firms track whether it&apos;s actually delivering.
            That&apos;s a gap between activity and outcome — and it&apos;s where most professional services AI investment gets wasted.
          </p>
          <p className="text-stone-600 text-lg">
            Makr&apos;s job is to close that gap. We design systems that connect AI activity to measurable productivity
            and revenue outcomes — so you know what it&apos;s actually worth.
          </p>
        </div>
      </section>

      {/* Primary pillars */}
      <section className="py-16 px-6 bg-stone-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">How Makr engages with professional services firms</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                pillar: "Operate",
                tagline: "Automate repetitive firm work",
                items: ["Document processing and routing", "Client communication workflows", "Billing and invoicing automation", "Internal knowledge management"],
              },
              {
                pillar: "Enable",
                tagline: "Build AI into how your team works",
                items: ["AI readiness assessment", "Team training and adoption", "Prompt frameworks for your workflows", "Tool selection and integration"],
              },
              {
                pillar: "Grow",
                tagline: "Capture more client revenue",
                items: ["Lead intake and qualification", "Proposal and follow-up automation", "Client reactivation", "Review and referral systems"],
              },
            ].map((p) => (
              <div key={p.pillar} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="inline-block bg-green-700 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  {p.pillar}
                </div>
                <h3 className="font-semibold text-stone-900 mb-3">{p.tagline}</h3>
                <ul className="space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="text-sm text-stone-600 flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Professional service segments we work with</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEGMENTS.map((s) => (
              <div key={s.name} className="bg-stone-50 rounded-xl p-6 border border-stone-100">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-stone-900 mb-2">{s.name}</h3>
                <p className="text-stone-600 text-sm mb-4">{s.opportunity}</p>
                <ul className="space-y-1">
                  {s.capabilities.map((c) => (
                    <li key={c} className="text-xs text-stone-600 flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-green-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to measure what AI actually delivers for your firm?</h2>
          <p className="text-green-200 mb-8">
            Start with an AI Opportunity Assessment. We&apos;ll map your workflows, identify the highest-value
            opportunities, and give you a clear plan — before you commit to anything.
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
