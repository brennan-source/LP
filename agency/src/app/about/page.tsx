import Link from "next/link";
import Nav from "@/components/Nav";

const PILLARS = [
  {
    name: "Grow",
    accent: "border-green-700",
    label: "bg-green-700",
    body: "Capture more leads, book more jobs, and reactivate lapsed customers with AI systems that work around the clock.",
  },
  {
    name: "Operate",
    accent: "border-green-800",
    label: "bg-green-800",
    body: "Automate the repetitive administrative work that consumes hours every week — scheduling, billing, follow-up, reporting.",
  },
  {
    name: "Enable",
    accent: "border-brass",
    label: "bg-brass",
    body: "Build AI into how your team works — with practical training, the right tools, and prompt frameworks built for your workflows.",
  },
];

const GEOGRAPHY = [
  "Greater Boston", "North Shore MA", "Merrimack Valley", "Southern NH", "MetroWest", "Expanding across New England",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />

      {/* Header */}
      <section className="bg-white pt-28 pb-16 px-6 border-b border-brass-light">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-ink leading-none tracking-tight">
            We help service businesses grow by making AI practical.
          </h1>
          <p className="mt-6 text-ink-mid text-xl max-w-2xl leading-relaxed">
            Not AI experiments. Not generic chatbots. Not disconnected software tools.
            Business systems. Business outcomes.
          </p>
        </div>
      </section>

      {/* Built in New England */}
      <section className="py-16 px-6 bg-green-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display font-bold text-4xl text-white mb-5">Built in New England.</h2>
            <p className="text-green-100 text-lg leading-relaxed mb-4">
              Makr is based in New England, and that matters. We work with local contractors and service businesses — not as a distant SaaS vendor, but as a real partner who shows up, picks up the phone, and builds things that actually fit your operation.
            </p>
            <p className="text-green-200 leading-relaxed">
              Local relationships are how we learn what works. When an HVAC company in Andover tells us something isn&apos;t landing the way they expected, we fix it — fast.
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {GEOGRAPHY.map((g) => (
                <span key={g} className="text-sm bg-green-700 text-white px-4 py-2 rounded-sm">
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="py-16 px-6 bg-white border-y border-brass-light">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-ink mb-8">What we believe</h2>
          <div className="space-y-6 text-ink-mid text-lg leading-relaxed">
            <p>
              Most service businesses aren&apos;t losing money from one big failure. They&apos;re leaking it across six smaller gaps — unanswered calls, slow follow-up, manual admin, disconnected software, unsold estimates, teams underusing tools they already pay for.
            </p>
            <p>
              AI can close most of those gaps. But only if it&apos;s designed for your business, implemented correctly, and managed over time. That&apos;s not what most software vendors do. It&apos;s exactly what Makr does.
            </p>
            <p>
              We don&apos;t sell software subscriptions. We build business systems — and we measure success in revenue captured, hours saved, and growth generated.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-ink mb-10">Three pillars. One platform.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {PILLARS.map((p) => (
              <div key={p.name} className={`bg-white border-l-4 ${p.accent} rounded-sm p-6`}>
                <div className={`inline-block ${p.label} text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4`}>
                  {p.name}
                </div>
                <p className="text-ink-mid text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-16 px-6 bg-white border-t border-brass-light">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-ink mb-6">Who we work with</h2>
          <div className="space-y-4 text-ink-mid leading-relaxed">
            <p>
              Our sweet spot is established service businesses — typically $2M–$15M in revenue, 10–50 employees — that are ready to build AI into their operations in a serious, accountable way.
            </p>
            <p>
              We work primarily with home service businesses (HVAC, plumbing, roofing, electrical, restoration, landscaping), and are expanding into professional services and personal services.
            </p>
            <p>
              If you want a real partner — not another tool to manage — we&apos;re the right fit.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-green-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight max-w-2xl">
            Ready to talk?
          </h2>
          <p className="mt-6 text-green-200 text-lg max-w-lg">
            Book an AI Opportunity Assessment. We&apos;ll tell you honestly where AI can help your business — and what the opportunity looks like before you commit to anything.
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
