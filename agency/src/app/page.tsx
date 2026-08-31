import Link from "next/link";
import Nav from "@/components/Nav";

const PROBLEMS = [
  {
    icon: "📵",
    title: "Revenue left uncaptured",
    body: "Calls go unanswered. Web leads sit cold. After-hours inquiries disappear. Every gap is revenue someone else captured.",
  },
  {
    icon: "⏱️",
    title: "Slow speed-to-lead",
    body: "The business that responds first usually wins. Manual follow-up creates delays that cost you jobs.",
  },
  {
    icon: "📋",
    title: "Unsold proposals",
    body: "Estimates go out. No follow-up happens. Jobs that were close are forgotten instead of closed.",
  },
  {
    icon: "🗂️",
    title: "Manual administrative work",
    body: "Scheduling, data entry, billing, reporting — hours every week spent on tasks that could run automatically.",
  },
  {
    icon: "🔌",
    title: "Disconnected software",
    body: "Your CRM, phone, scheduling, and billing tools don't talk to each other. You pay the gap in time and errors.",
  },
  {
    icon: "🧠",
    title: "Teams underusing AI",
    body: "AI tools are available. Most teams don't know how to use them well. Productivity gains stay theoretical.",
  },
];

const PILLARS = [
  {
    name: "Grow",
    tagline: "Capture more revenue",
    color: "bg-green-700",
    capabilities: [
      "AI receptionist — every call answered",
      "Missed-call recovery",
      "Web chat & lead qualification",
      "Estimate follow-up automation",
      "Review generation",
      "Customer reactivation",
    ],
  },
  {
    name: "Operate",
    tagline: "Run a more efficient business",
    color: "bg-green-800",
    capabilities: [
      "Scheduling & dispatch automation",
      "Billing & invoicing workflows",
      "CRM data automation",
      "Document processing",
      "Back-office reporting",
      "Knowledge assistant for your team",
    ],
  },
  {
    name: "Enable",
    tagline: "Build AI into your team",
    color: "bg-green-900",
    capabilities: [
      "AI readiness assessment",
      "Team training & adoption",
      "Prompt frameworks for your workflows",
      "AI tool selection & integration",
      "Ongoing optimization",
      "Quarterly performance reviews",
    ],
  },
];

const MARKETS = [
  {
    name: "Home Services",
    label: "Primary focus",
    description:
      "HVAC, plumbing, roofing, electrical, restoration, landscaping — businesses where every call is a revenue opportunity.",
    href: "/industries/home-services",
    stats: "52% average call answer rate in the industry. Every unanswered call is a lead your competitor captured.",
    source: "Invoca 2026",
  },
  {
    name: "Professional Services",
    label: "Growing focus",
    description:
      "Accounting, legal, consulting, engineering — firms where AI can compress billable work and sharpen client experience.",
    href: "/industries/professional-services",
    stats: "Only 18% of professional service firms track AI ROI. Most are spending but not measuring.",
    source: "Thomson Reuters 2026",
  },
  {
    name: "Personal Services",
    label: "Growing focus",
    description:
      "Dental, veterinary, wellness, med spa, fitness — appointment-driven businesses where utilization and retention drive profit.",
    href: "/industries/personal-services",
    stats: "40% call-to-appointment conversion in personal services. Room to grow with the right follow-up systems.",
    source: "Invoca 2026",
  },
];

const ENGAGEMENTS = [
  {
    name: "AI Opportunity Audit",
    price: "$2,500 – $5,000",
    type: "One-time",
    description:
      "A structured discovery engagement. We map your business, identify where AI creates the most value, and deliver a prioritized roadmap.",
    cta: "Start here",
  },
  {
    name: "Implementation Projects",
    price: "$5,000 – $25,000+",
    type: "Per project",
    description:
      "Scoped builds: AI receptionist, CRM automation, scheduling systems, billing workflows. Priced per project, not per month.",
    cta: "See what we build",
  },
  {
    name: "Revenue Engine",
    price: "~$3,500 / month",
    type: "Managed — our flagship",
    featured: true,
    description:
      "Ongoing AI operations management. We run your systems, optimize continuously, and report on what it's generating for your business.",
    cta: "Most common starting point",
  },
  {
    name: "Revenue OS",
    price: "From $5,000 / month",
    type: "Managed + custom implementation",
    description:
      "Full-stack AI operations for businesses ready to build a durable competitive advantage. Custom scope, dedicated support.",
    cta: "For larger operations",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Nav />

      {/* Hero */}
      <section className="bg-white pt-24 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700 mb-4">
            AI Growth &amp; Operations for Service Businesses
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 leading-tight mb-6">
            Grow faster.
            <br />
            Run smarter.
          </h1>
          <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto">
            Makr designs, implements, and manages practical AI systems that help service businesses
            capture more revenue, automate operations, and build teams that use AI well.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition"
            >
              Book an AI Opportunity Assessment
            </Link>
            <Link
              href="/services"
              className="border border-stone-300 text-stone-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-green-700 hover:text-green-700 transition"
            >
              See How We Work
            </Link>
          </div>
        </div>
      </section>

      {/* Three Service Markets */}
      <section className="py-20 px-6 bg-stone-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Three types of service businesses. One platform.</h2>
          <p className="text-center text-stone-600 mb-12">
            We work with established service businesses across three markets.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {MARKETS.map((m) => (
              <Link key={m.name} href={m.href} className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-lg text-stone-900 group-hover:text-green-700 transition">{m.name}</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">{m.label}</span>
                </div>
                <p className="text-stone-600 text-sm mb-4">{m.description}</p>
                <div className="border-t pt-3 mt-3">
                  <p className="text-sm text-stone-500 italic">{m.stats}</p>
                  <p className="text-xs text-stone-400 mt-1">Source: {m.source}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Where service businesses lose revenue</h2>
          <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
            Most businesses aren&apos;t losing money from one big failure. They&apos;re leaking it across six smaller ones.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="bg-stone-50 rounded-xl p-6 border border-stone-100">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-semibold text-stone-900 mb-2">{p.title}</h3>
                <p className="text-stone-600 text-sm">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunity bridge */}
      <section className="py-16 px-6 bg-green-800 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            The businesses that close these gaps grow faster than their competitors.
          </h2>
          <p className="text-green-200 text-lg">
            Makr&apos;s job is to close them — with practical AI systems designed for your business, not generic software.
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-6 bg-stone-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Three ways Makr helps your business</h2>
          <p className="text-center text-stone-600 mb-12">
            Every engagement draws from one or more of these capability pillars.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <div key={p.name} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className={`${p.color} text-white p-6`}>
                  <div className="text-2xl font-bold mb-1">{p.name}</div>
                  <div className="text-green-200 text-sm">{p.tagline}</div>
                </div>
                <ul className="p-6 space-y-2">
                  {p.capabilities.map((c) => (
                    <li key={c} className="text-sm text-stone-700 flex items-start gap-2">
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

      {/* Engagement Options */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Transparent pricing. Four ways to engage.</h2>
          <p className="text-center text-stone-600 mb-12">
            Most clients start with an Audit, then move into a managed engagement.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {ENGAGEMENTS.map((e) => (
              <div
                key={e.name}
                className={`rounded-xl p-6 border-2 ${
                  e.featured
                    ? "border-green-600 bg-green-50"
                    : "border-stone-100 bg-stone-50"
                }`}
              >
                {e.featured && (
                  <div className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2">
                    Flagship
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-stone-900 text-lg">{e.name}</h3>
                  <div className="text-right">
                    <div className="font-bold text-green-700">{e.price}</div>
                    <div className="text-xs text-stone-500">{e.type}</div>
                  </div>
                </div>
                <p className="text-stone-600 text-sm">{e.description}</p>
                {e.cta && (
                  <p className="text-xs text-stone-500 mt-3 italic">{e.cta}</p>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/pricing"
              className="text-green-700 font-semibold hover:underline"
            >
              See full pricing details →
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 bg-green-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to find out what AI can actually do for your business?</h2>
          <p className="text-green-200 mb-8 text-lg">
            Start with an AI Opportunity Audit. We&apos;ll map the gaps, size the opportunity, and give you a clear roadmap.
          </p>
          <Link
            href="/contact"
            className="bg-white text-green-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition inline-block"
          >
            Book an AI Opportunity Assessment
          </Link>
          <p className="text-green-300 text-sm mt-4">
            Complimentary for qualified service businesses.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="text-white font-bold text-lg mb-2">Makr</div>
            <p>AI Growth &amp; Operations for Service Businesses.</p>
            <p className="mt-2">Built in New England.</p>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Solutions</div>
            <ul className="space-y-2">
              <li><Link href="/services" className="hover:text-white transition">Grow</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Operate</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Enable</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Industries</div>
            <ul className="space-y-2">
              <li><Link href="/industries/home-services" className="hover:text-white transition">Home Services</Link></li>
              <li><Link href="/industries/professional-services" className="hover:text-white transition">Professional Services</Link></li>
              <li><Link href="/industries/personal-services" className="hover:text-white transition">Personal Services</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Company</div>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="/insights" className="hover:text-white transition">Insights</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-8 border-t border-stone-800 text-xs text-stone-500">
          © {new Date().getFullYear()} Makr. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
