import Link from "next/link";
import Nav from "@/components/Nav";

const STATS = [
  { stat: "~40%", label: "of firms using GenAI", detail: "Up from 22% the prior year. Adoption is accelerating — but most firms are still early.", source: "Thomson Reuters 2026" },
  { stat: ">80%", label: "of adopters use AI weekly", detail: "Among firms that have adopted AI, usage is already habitual and widespread.", source: "Thomson Reuters 2026" },
  { stat: ">90%", label: "expect AI to be central within 5 years", detail: "Near-universal expectation that AI becomes core infrastructure — not a tool, not an experiment.", source: "Thomson Reuters 2026" },
  { stat: "~18%", label: "actually track AI ROI", detail: "Most firms using AI can't measure what it's delivering. Spending without accountability.", source: "Thomson Reuters 2026" },
];

const SEGMENTS = [
  { name: "Accounting & Tax", opportunity: "Document processing, client communication workflows, and deadline-driven automation.", capabilities: ["Tax document intake automation", "Client communication drafting", "Workflow and deadline tracking"] },
  { name: "Legal", opportunity: "Research compression, document review, and client intake — without compromising judgment.", capabilities: ["Client intake automation", "Research and summarization workflows", "Document generation frameworks"] },
  { name: "Consulting", opportunity: "Proposal efficiency, research synthesis, and team productivity at scale.", capabilities: ["Proposal and deck acceleration", "Research synthesis workflows", "Team AI adoption programs"] },
  { name: "Engineering & Architecture", opportunity: "Specification review, project documentation, and client communication at volume.", capabilities: ["Project documentation workflows", "Spec and code review assistance", "Client reporting automation"] },
  { name: "Financial Advisory", opportunity: "Client reporting, portfolio commentary, and compliance documentation efficiency.", capabilities: ["Client reporting automation", "Commentary and explanation drafting", "Compliance workflow support"] },
];

export default function ProfessionalServicesPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />
      <section className="bg-white pt-28 pb-16 px-6 border-b border-brass-light">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/industries" className="text-sm text-ink-light hover:text-green-700 transition">Industries</Link>
            <span className="text-brass-light">/</span>
            <span className="text-sm font-semibold text-brass">Professional Services</span>
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-ink leading-none tracking-tight mb-6">
            Most professional service firms are using AI. Very few are measuring what it delivers.
          </h1>
          <p className="text-ink-mid text-xl max-w-2xl leading-relaxed">Makr helps accounting firms, law firms, consultancies, and other professional service businesses turn scattered AI experiments into measurable productivity gains and client outcomes.</p>
          <div className="mt-8">
            <Link href="/contact" className="inline-block bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded font-semibold text-lg transition-colors">Book an AI Opportunity Assessment</Link>
          </div>
        </div>
      </section>
      <section className="py-5 px-6 bg-canvas-warm border-b border-brass-light">
        <div className="max-w-4xl mx-auto">
          <div className="border-l-2 border-brass pl-4">
            <p className="font-semibold text-ink text-sm">A note on where we are with professional services</p>
            <p className="text-ink-mid text-sm mt-1">Home services is our primary focus today. Professional services is a growing area — we&apos;re working with a smaller number of firms and learning what creates the most value. If you want to be part of early engagements, this is a good time to start a conversation.</p>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-canvas">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-ink mb-2">Where professional services stands with AI</h2>
          <p className="text-ink-light text-sm mb-8">Source: Thomson Reuters Future of Professionals Report 2026. Industry benchmarks — not Makr customer results.</p>
          <div className="grid md:grid-cols-4 gap-5">
            {STATS.map((s) => (
              <div key={s.stat} className="bg-white border border-brass-light rounded-sm p-6 text-center">
                <div className="font-display font-bold text-4xl text-green-700 mb-2">{s.stat}</div>
                <div className="font-semibold text-ink text-sm mb-2">{s.label}</div>
                <p className="text-ink-light text-xs">{s.detail}</p>
                <p className="text-brass text-xs mt-1">{s.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-white border-y border-brass-light">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-ink mb-6">The problem isn&apos;t access to AI tools. It&apos;s accountability.</h2>
          <div className="space-y-4 text-ink-mid leading-relaxed">
            <p>More than 80% of professionals who use AI use it weekly. But only 18% of firms track whether it&apos;s actually delivering. That&apos;s a gap between activity and outcome — and it&apos;s where most professional services AI investment gets wasted.</p>
            <p>Makr&apos;s job is to close that gap. We design systems that connect AI activity to measurable productivity and revenue outcomes — so you know what it&apos;s actually worth.</p>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-canvas">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-ink mb-8">How Makr engages with professional services firms</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { pillar: "Operate", accent: "border-green-800", label: "bg-green-800", tagline: "Automate repetitive firm work", items: ["Document processing and routing", "Client communication workflows", "Billing and invoicing automation", "Internal knowledge management"] },
              { pillar: "Enable", accent: "border-brass", label: "bg-brass", tagline: "Build AI into how your team works", items: ["AI readiness assessment", "Team training and adoption", "Prompt frameworks for your workflows", "Tool selection and integration"] },
              { pillar: "Grow", accent: "border-green-700", label: "bg-green-700", tagline: "Capture more client revenue", items: ["Lead intake and qualification", "Proposal and follow-up automation", "Client reactivation", "Review and referral systems"] },
            ].map((p) => (
              <div key={p.pillar} className={`bg-white border-l-4 ${p.accent} rounded-sm p-6`}>
                <div className={`inline-block ${p.label} text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-3`}>{p.pillar}</div>
                <h3 className="font-semibold text-ink mb-3">{p.tagline}</h3>
                <ul className="space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="text-sm text-ink-mid flex items-start gap-2"><span className="text-green-600 mt-0.5 shrink-0">✓</span>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-white border-t border-brass-light">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-ink mb-12">Professional service segments we work with</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SEGMENTS.map((s) => (
              <div key={s.name} className="bg-canvas border-l-4 border-brass rounded-sm p-6">
                <h3 className="font-semibold text-ink mb-2">{s.name}</h3>
                <p className="text-ink-mid text-sm mb-4">{s.opportunity}</p>
                <ul className="space-y-1">
                  {s.capabilities.map((c) => (
                    <li key={c} className="text-xs text-ink-mid flex items-start gap-2"><span className="text-green-600 mt-0.5 shrink-0">✓</span>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-green-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight max-w-2xl">Ready to measure what AI actually delivers for your firm?</h2>
          <p className="mt-6 text-green-200 text-lg max-w-lg">Start with an AI Opportunity Assessment. We&apos;ll map your workflows, identify the highest-value opportunities, and give you a clear plan — before you commit to anything.</p>
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link href="/contact" className="bg-white text-green-900 hover:bg-green-50 px-8 py-4 rounded font-bold text-lg transition-colors">Book an AI Opportunity Assessment</Link>
            <span className="text-green-400 text-sm">Complimentary for qualified service businesses.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
