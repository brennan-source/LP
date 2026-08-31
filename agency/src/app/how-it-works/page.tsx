import Link from "next/link";
import Nav from "@/components/Nav";

const STEPS = [
  {
    step: "01",
    name: "Discover",
    tagline: "Find where AI creates the most value.",
    body: "We start with an AI Opportunity Audit — a structured analysis of your business. We identify revenue leakage, repetitive manual work, customer communication gaps, workflow bottlenecks, and high-ROI AI opportunities. The output is a prioritized AI roadmap, not a generic AI overview.",
    deliverable: "AI Opportunity Audit + prioritized roadmap",
    price: "$2,500 – $5,000",
  },
  {
    step: "02",
    name: "Design",
    tagline: "Plan exactly what to build.",
    body: "Based on the audit, we design the specific systems to implement — what they'll do, how they'll integrate with your existing software, and what outcomes to expect. We work with the tools you already use wherever practical, rather than pushing unnecessary software replacement.",
    deliverable: "Implementation plan + integration design",
    price: "Included in project scope",
  },
  {
    step: "03",
    name: "Build",
    tagline: "Implement systems that actually work.",
    body: "We build the AI systems — phone agents, automation workflows, CRM integrations, internal AI tools, or custom agents — configured specifically to your business, your team, and your existing processes. Each implementation is scoped and priced as a discrete project.",
    deliverable: "Implemented AI systems",
    price: "$5,000 – $25,000+ per project",
  },
  {
    step: "04",
    name: "Integrate",
    tagline: "Connect to how your business already runs.",
    body: "New AI systems are integrated with your existing CRM, scheduling software, phone system, and other tools. We avoid creating isolated islands of automation. Everything is connected so data flows without manual intervention.",
    deliverable: "Fully integrated AI systems",
    price: "Included in project scope",
  },
  {
    step: "05",
    name: "Manage",
    tagline: "Keep systems running and improving.",
    body: "For ongoing engagements, we monitor performance, handle optimization, manage updates, and ensure AI systems continue improving as your business evolves. This is what separates a managed AI system from a software subscription that sits unused.",
    deliverable: "Monthly optimization + performance reporting",
    price: "Included in Revenue Engine / Revenue OS",
  },
  {
    step: "06",
    name: "Expand",
    tagline: "Grow the system as value is proven.",
    body: "As results are established in one area, we identify the next highest-impact opportunities and expand the AI system into them. The goal is a business where AI is genuinely embedded into revenue generation and operations — not a one-time project.",
    deliverable: "Expanded AI capabilities over time",
    price: "Scoped per expansion",
  },
];

const ENGAGEMENTS = [
  { name: "AI Opportunity Audit", price: "$2,500 – $5,000", href: "/pricing" },
  { name: "Implementation Projects", price: "$5,000 – $25,000+", href: "/pricing" },
  { name: "Revenue Engine", price: "~$3,500/month", href: "/pricing" },
  { name: "Revenue OS", price: "From $5,000/month", href: "/pricing" },
];

export default function HowItWorksPage() {
  return (
    <>
      <Nav activePath="/how-it-works" />

      <main className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">

          <div className="mb-16">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-3">How Makr Works</p>
            <h1 className="text-5xl font-black text-stone-900 mb-5">From audit to expansion.</h1>
            <p className="text-stone-500 text-xl leading-relaxed max-w-2xl">
              Makr follows a structured process: identify the highest-value opportunities first, implement them properly, then expand from there. We don’t start with a sales pitch for a large retainer.
            </p>
          </div>

          <div className="space-y-8 mb-20">
            {STEPS.map((s, i) => (
              <div key={s.step} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-1 flex md:flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-700 text-white text-sm font-black flex items-center justify-center shrink-0">
                    {s.step}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block w-px h-full min-h-12 bg-stone-200 mx-auto mt-2" />
                  )}
                </div>
                <div className="md:col-span-11 bg-stone-50 border border-stone-200 rounded-2xl p-7">
                  <h2 className="text-2xl font-black text-stone-900 mb-1">{s.name}</h2>
                  <p className="text-green-700 font-semibold text-sm mb-4">{s.tagline}</p>
                  <p className="text-stone-600 leading-relaxed mb-5">{s.body}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="bg-white border border-stone-200 rounded-xl px-4 py-3">
                      <p className="text-stone-400 text-xs uppercase tracking-widest mb-0.5">Deliverable</p>
                      <p className="text-stone-700 text-sm font-medium">{s.deliverable}</p>
                    </div>
                    <div className="bg-white border border-stone-200 rounded-xl px-4 py-3">
                      <p className="text-stone-400 text-xs uppercase tracking-widest mb-0.5">Investment</p>
                      <p className="text-green-700 text-sm font-semibold">{s.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 mb-16">
            <h2 className="text-xl font-bold text-stone-900 mb-2">A note on where we start</h2>
            <p className="text-stone-500 leading-relaxed">
              Most engagements begin with an AI Opportunity Audit. It surfaces the highest-value opportunities in your specific business and creates a roadmap we can execute against. Starting with an audit means your first implementation investment is directed at the problems most likely to produce measurable ROI — not a generic AI package.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-black text-stone-900 mb-6">Engagement options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ENGAGEMENTS.map((e) => (
                <Link key={e.name} href={e.href} className="bg-white border border-stone-200 rounded-xl p-5 hover:border-green-300 hover:shadow-sm transition">
                  <p className="font-bold text-stone-900 mb-1">{e.name}</p>
                  <p className="text-green-700 font-semibold text-sm">{e.price}</p>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/pricing" className="text-green-700 hover:text-green-600 font-medium transition text-sm">
                Full pricing and engagement details →
              </Link>
            </div>
          </div>

          <div className="bg-green-900 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-black text-white mb-3">Start with the audit.</h2>
            <p className="text-green-200 text-lg mb-6 max-w-xl mx-auto">
              Book a complimentary AI Opportunity Assessment and we’ll identify where AI can create the most value in your business.
            </p>
            <Link href="/contact" className="inline-block px-8 py-4 bg-white hover:bg-green-50 text-green-900 font-bold text-lg rounded-xl transition">
              Book an AI Opportunity Assessment
            </Link>
          </div>

        </div>
      </main>

      <footer className="border-t border-stone-200 py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-stone-400 text-sm">
          <span className="font-black text-green-800">Makr<span className="text-stone-400 font-medium">.ai</span></span>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/services" className="hover:text-stone-700 transition">Solutions</Link>
            <Link href="/industries" className="hover:text-stone-700 transition">Industries</Link>
            <Link href="/how-it-works" className="hover:text-stone-700 transition">How It Works</Link>
            <Link href="/pricing" className="hover:text-stone-700 transition">Pricing</Link>
            <Link href="/about" className="hover:text-stone-700 transition">About</Link>
            <Link href="/insights" className="hover:text-stone-700 transition">Insights</Link>
            <Link href="/contact" className="hover:text-stone-700 transition">Contact</Link>
          </div>
          <span>© {new Date().getFullYear()} Makr.ai. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
