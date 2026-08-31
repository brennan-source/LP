import Link from "next/link";
import Nav from "@/components/Nav";

const PILLARS = [
  {
    name: "Grow",
    body: "Capture more leads, book more jobs, and reactivate lapsed customers with AI systems that work around the clock.",
  },
  {
    name: "Operate",
    body: "Automate the repetitive administrative work that consumes hours every week — scheduling, billing, follow-up, reporting.",
  },
  {
    name: "Enable",
    body: "Build AI into how your team works — with practical training, the right tools, and prompt frameworks built for your workflows.",
  },
];

const GEOGRAPHY = [
  "Greater Boston", "North Shore MA", "Merrimack Valley", "Southern NH", "MetroWest", "Expanding across New England",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Nav />

      {/* Header */}
      <section className="bg-white pt-24 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700 mb-4">About Makr</p>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            We help service businesses grow by making AI practical.
          </h1>
          <p className="text-xl text-stone-600">
            Not AI experiments. Not generic chatbots. Not disconnected software tools.
            Business systems. Business outcomes.
          </p>
        </div>
      </section>

      {/* Built in New England */}
      <section className="py-16 px-6 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Built in New England.</h2>
          <p className="text-green-100 text-lg mb-6 max-w-2xl">
            Makr is based in New England, and that matters. We work with local contractors and service businesses
            — not as a distant SaaS vendor, but as a real partner who shows up, picks up the phone, and builds
            things that actually fit your operation.
          </p>
          <p className="text-green-200 mb-8">
            Local relationships are how we learn what works. When an HVAC company in Andover tells us something
            isn&apos;t landing the way they expected, we fix it — fast. That feedback loop is part of what we offer.
          </p>
          <div className="flex flex-wrap gap-3">
            {GEOGRAPHY.map((g) => (
              <span key={g} className="text-sm bg-green-700 text-white px-4 py-2 rounded-full">
                {g}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Brand promise */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">What we believe</h2>
          <div className="space-y-6 text-stone-600 text-lg">
            <p>
              Most service businesses aren&apos;t losing money from one big failure. They&apos;re leaking it
              across six smaller ones — unanswered calls, slow follow-up, manual admin, disconnected software,
              unsold estimates, teams underusing tools they already pay for.
            </p>
            <p>
              AI can close most of those gaps. But only if it&apos;s designed for your business, implemented
              correctly, and managed over time. That&apos;s not what most software vendors do. It&apos;s exactly
              what Makr does.
            </p>
            <p>
              We don&apos;t sell software subscriptions. We build business systems — and we measure success in
              revenue captured, hours saved, and growth generated.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 px-6 bg-stone-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Three pillars. One platform.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <div key={p.name} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="inline-block bg-green-700 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  {p.name}
                </div>
                <p className="text-stone-600 text-sm">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Who we work with</h2>
          <p className="text-stone-600 mb-4">
            Our sweet spot is established service businesses — typically $2M–$15M in revenue, 10–50 employees —
            that are ready to build AI into their operations in a serious, accountable way.
          </p>
          <p className="text-stone-600 mb-4">
            We work primarily with home service businesses (HVAC, plumbing, roofing, electrical, restoration,
            landscaping), and are expanding into professional services and personal services.
          </p>
          <p className="text-stone-600">
            If you want a real partner — not another tool to manage — we&apos;re the right fit.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-green-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to talk?</h2>
          <p className="text-green-200 mb-8">
            Book an AI Opportunity Assessment. We&apos;ll tell you honestly where AI can help your business —
            and what the opportunity looks like before you commit to anything.
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
