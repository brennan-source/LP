import Link from "next/link";
import Nav from "@/components/Nav";

const MARKETS = [
  {
    name: "Home Services",
    href: "/industries/home-services",
    description:
      "HVAC, plumbing, roofing, electrical, restoration, landscaping — businesses where every inbound call is a revenue opportunity.",
    stat: "52% average call answer rate industry-wide.",
    statDetail: "Nearly half of all inbound calls go unanswered. Every missed call is a lead someone else captured.",
    source: "Invoca 2026",
  },
  {
    name: "Professional Services",
    href: "/industries/professional-services",
    description:
      "Accounting, legal, consulting, engineering — firms where AI compresses billable work and sharpens client experience.",
    stat: "Only 18% of professional service firms track AI ROI.",
    statDetail: "Most firms are spending on AI tools but can't measure what they're delivering.",
    source: "Thomson Reuters 2026",
  },
  {
    name: "Personal Services",
    href: "/industries/personal-services",
    description:
      "Dental, veterinary, wellness, med spa, fitness — appointment-driven businesses where utilization and retention drive profit.",
    stat: "40% call-to-appointment conversion on average.",
    statDetail: "Systematic follow-up and reactivation campaigns move that number.",
    source: "Invoca 2026",
  },
];

const PROBLEMS = [
  { title: "Revenue left uncaptured", body: "Calls go unanswered. Web leads sit cold. After-hours inquiries disappear. Every gap is revenue someone else captured." },
  { title: "Slow speed-to-lead", body: "The business that responds first usually wins the job. Manual follow-up creates delays that cost you work." },
  { title: "Unsold proposals", body: "Estimates go out. No follow-up happens. Jobs that were close are forgotten instead of closed." },
  { title: "Manual administrative work", body: "Scheduling, data entry, billing, reporting — hours every week on tasks that could run on their own." },
  { title: "Disconnected software", body: "Your CRM, phone, scheduling, and billing tools don't talk to each other. You pay the gap in time and errors." },
  { title: "Teams underusing AI", body: "AI tools are available. Most teams haven't been shown how to use them well. Productivity gains stay theoretical." },
];

const PILLARS = [
  {
    name: "Grow", tagline: "Capture more revenue", accent: "border-green-700", label: "bg-green-700",
    capabilities: ["AI receptionist — every call answered", "Missed-call recovery", "Web chat & lead qualification", "Estimate follow-up automation", "Review generation", "Customer reactivation"],
  },
  {
    name: "Operate", tagline: "Run a more efficient business", accent: "border-green-800", label: "bg-green-800",
    capabilities: ["Scheduling & dispatch automation", "Billing & invoicing workflows", "CRM data automation", "Document processing", "Back-office reporting", "Knowledge assistant for your team"],
  },
  {
    name: "Enable", tagline: "Build AI into your team", accent: "border-brass", label: "bg-brass",
    capabilities: ["AI readiness assessment", "Team training & adoption", "Prompt frameworks for your workflows", "Tool selection & integration", "Ongoing optimization", "Quarterly performance reviews"],
  },
];

const TIERS = [
  {
    name: "Essentials", price: "$1,500", period: "/month", tagline: "Core AI capture running 24/7.",
    includes: ["AI receptionist", "Missed-call recovery", "Web lead capture", "CRM sync", "Monthly performance report"],
    featured: false,
  },
  {
    name: "Growth", price: "$3,500", period: "/month", tagline: "Full revenue operations — managed.",
    includes: ["Everything in Essentials", "Appointment booking automation", "Estimate follow-up system", "Review generation", "Scheduling workflows", "Dedicated account management"],
    featured: true,
  },
  {
    name: "Projects", price: "$4,000–$10,000+", period: "per project", tagline: "One-time builds, scoped upfront.",
    includes: ["AI receptionist setup", "CRM buildout & automation", "Custom workflow builds", "System integrations", "No monthly commitment"],
    featured: false,
  },
  {
    name: "Enterprise", price: "Custom", period: "let’s scope it", tagline: "For complex or multi-location operations.",
    includes: ["Full-stack AI operations", "Custom workflow development", "Team enablement program", "Multi-location support", "Quarterly business reviews"],
    featured: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />

      {/* Hero */}
      <section className="bg-white pt-28 pb-20 px-6 border-b border-brass-light">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-extrabold text-[clamp(4rem,10vw,8.5rem)] leading-[0.92] tracking-tight text-ink text-balance">
            Grow faster.
            <br />
            Run smarter.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-ink-mid leading-relaxed max-w-xl">
            Makr designs, implements, and manages practical AI systems that help service businesses
            capture more revenue, automate operations, and build teams that use AI well.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link href="/contact" className="bg-green-700 hover:bg-green-800 text-white px-7 py-3.5 rounded font-semibold text-base transition-colors">
              Book an AI Opportunity Assessment
            </Link>
            <Link href="/services" className="text-ink-mid hover:text-ink font-semibold text-base transition-colors underline underline-offset-4 decoration-brass">
              See how we work →
            </Link>
          </div>
        </div>
      </section>

      {/* Three Service Markets */}
      <section className="py-20 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink mb-2">Three markets. One platform.</h2>
          <p className="text-ink-mid text-lg mb-12">We work with established service businesses across home, professional, and personal services.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {MARKETS.map((m) => (
              <Link key={m.name} href={m.href} className="group bg-white border border-brass-light rounded-sm p-6 hover:border-brass transition-colors flex flex-col">
                <h3 className="font-display font-bold text-2xl text-ink mb-3 group-hover:text-green-700 transition-colors">{m.name}</h3>
                <p className="text-ink-mid text-sm leading-relaxed flex-1">{m.description}</p>
                <div className="mt-5 pt-4 border-t border-brass-light">
                  <p className="text-sm text-ink font-medium">{m.stat}</p>
                  <p className="text-xs text-ink-light mt-1">{m.statDetail}</p>
                  <p className="text-xs text-ink-light mt-1">Source: {m.source}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-20 px-6 bg-white border-y border-brass-light">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-12">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight">Six ways service businesses leak revenue every month.</h2>
            <p className="mt-4 text-ink-mid">Most businesses aren&apos;t losing money from one big failure. They&apos;re leaking it across smaller gaps that compound every week.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="border-l-2 border-brass pl-5">
                <h3 className="font-semibold text-ink mb-1">{p.title}</h3>
                <p className="text-ink-mid text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge */}
      <section className="py-16 px-6 bg-green-800">
        <div className="max-w-6xl mx-auto">
          <p className="font-display font-bold text-3xl md:text-4xl text-white leading-snug max-w-2xl">
            The businesses that close these gaps grow faster than their competitors. Makr&apos;s job is to close them.
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink mb-2">Three ways Makr works.</h2>
          <p className="text-ink-mid text-lg mb-12">Every engagement draws from one or more of these capability pillars.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <div key={p.name} className={`bg-white border-l-4 ${p.accent} rounded-sm`}>
                <div className="p-6">
                  <div className={`inline-block ${p.label} text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4`}>{p.name}</div>
                  <p className="text-ink-mid text-sm mb-5">{p.tagline}</p>
                  <ul className="space-y-2">
                    {p.capabilities.map((c) => (
                      <li key={c} className="text-sm text-ink-mid flex items-start gap-2">
                        <span className="text-green-600 mt-0.5 shrink-0">✓</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-white border-t border-brass-light">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink mb-2">Transparent pricing.</h2>
            <p className="text-ink-mid text-lg">Monthly retainers, one-time projects, or custom scope — you pick the model that fits.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TIERS.map((t) => (
              <div key={t.name} className={`rounded-sm flex flex-col ${t.featured ? "bg-green-700 text-white" : "bg-canvas border border-brass-light"}`}>
                {t.featured && <div className="text-xs font-bold uppercase tracking-widest text-green-200 px-5 pt-4">Most Popular</div>}
                <div className="p-5 flex-1">
                  <h3 className={`font-display font-bold text-xl mb-1 ${t.featured ? "text-white" : "text-ink"}`}>{t.name}</h3>
                  <div className={`text-2xl font-bold mb-0.5 ${t.featured ? "text-white" : "text-green-700"}`}>{t.price}</div>
                  <div className={`text-xs mb-3 ${t.featured ? "text-green-200" : "text-ink-light"}`}>{t.period}</div>
                  <p className={`text-sm mb-4 ${t.featured ? "text-green-100" : "text-ink-mid"}`}>{t.tagline}</p>
                  <ul className="space-y-1.5">
                    {t.includes.map((item) => (
                      <li key={item} className={`text-xs flex items-start gap-2 ${t.featured ? "text-green-100" : "text-ink-mid"}`}>
                        <span className={`mt-0.5 shrink-0 ${t.featured ? "text-green-300" : "text-green-600"}`}>✓</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-5 pb-5">
                  <Link href="/contact" className={`block text-center py-2.5 rounded text-sm font-semibold transition-colors ${t.featured ? "bg-white text-green-700 hover:bg-green-50" : "bg-ink text-white hover:bg-green-700"}`}>Get started</Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center">
            <Link href="/pricing" className="text-ink-mid text-sm hover:text-ink underline underline-offset-4 decoration-brass">See full pricing details →</Link>
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 bg-green-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white leading-tight max-w-2xl">Ready to find out what AI can actually do for your business?</h2>
          <p className="mt-6 text-green-200 text-lg max-w-lg">Start with an AI Opportunity Assessment. We&apos;ll map the gaps, size the opportunity, and give you a clear roadmap — before you commit to anything.</p>
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link href="/contact" className="bg-white text-green-900 hover:bg-green-50 px-8 py-4 rounded font-bold text-lg transition-colors">Book an AI Opportunity Assessment</Link>
            <span className="text-green-400 text-sm">Complimentary for qualified service businesses.</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-ink-light py-14 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="font-display font-bold text-xl text-white mb-3">Makr</div>
            <p>AI Growth & Operations for Service Businesses.</p>
            <p className="mt-2 text-canvas-warm">Built in New England.</p>
          </div>
          <div>
            <div className="text-white font-semibold mb-3 text-xs uppercase tracking-widest">Solutions</div>
            <ul className="space-y-2">
              <li><Link href="/services#grow" className="hover:text-white transition-colors">Grow</Link></li>
              <li><Link href="/services#operate" className="hover:text-white transition-colors">Operate</Link></li>
              <li><Link href="/services#enable" className="hover:text-white transition-colors">Enable</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3 text-xs uppercase tracking-widest">Industries</div>
            <ul className="space-y-2">
              <li><Link href="/industries/home-services" className="hover:text-white transition-colors">Home Services</Link></li>
              <li><Link href="/industries/professional-services" className="hover:text-white transition-colors">Professional Services</Link></li>
              <li><Link href="/industries/personal-services" className="hover:text-white transition-colors">Personal Services</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3 text-xs uppercase tracking-widest">Company</div>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/insights" className="hover:text-white transition-colors">Insights</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-8 border-t border-ink-mid/30 text-xs text-ink-light">
          © {new Date().getFullYear()} Makr. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
