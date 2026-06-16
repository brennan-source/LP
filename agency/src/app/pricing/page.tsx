import Link from "next/link";

const TIERS = [
  {
    name: "Starter",
    price: 499,
    popular: false,
    includes: [
      "One free build included — website, booking system, voice agent, AI chat, or automation (your choice)",
      "Google Business Profile optimization",
      "2 blog posts per month",
      "Local SEO basics",
      "Monthly rankings report",
    ],
  },
  {
    name: "Growth",
    price: 999,
    popular: true,
    includes: [
      "Everything in Starter (incl. free build)",
      "Google Ads ($300 ad spend managed)",
      "Social media (2 posts/week)",
      "Monthly email newsletter",
      "Lead capture forms",
      "Competitor monitoring",
    ],
  },
  {
    name: "Scale",
    price: 1499,
    popular: false,
    includes: [
      "Everything in Growth",
      "AI chat widget on your website",
      "AI voice agent for inbound calls & booking",
      "Automated follow-up sequences",
      "CRM setup",
      "Monthly automation health check",
      "Priority support",
    ],
  },
];

const AI_TIERS = [
  {
    name: "AI Readiness Assessment",
    price: "Free",
    priceNote: "",
    badge: null,
    description: "A high-level scan of your business to spot where AI can help. We identify your biggest gaps and opportunities — no deliverable, no deep dive, just a clear-eyed first look.",
    includes: [
      "30–45 min discovery call",
      "Top 3–5 opportunity areas identified",
      "Verbal summary + next-step recommendations",
      "Zero cost, zero commitment",
    ],
  },
  {
    name: "AI Action Plan",
    price: "$299",
    priceNote: "one-time",
    badge: "Most popular first step",
    description: "A detailed, written blueprint for your business — not just what to automate, but exactly how to do it. You get a document you can hand to anyone (including us) and execute.",
    includes: [
      "Full workflow & tech stack audit",
      "Top automation opportunities with ROI estimates",
      "Specific tool recommendations (Jobber, Zapier, etc.)",
      "Step-by-step implementation roadmap",
      "60-min walkthrough call + recorded",
      "$299 credited toward any Ops project",
    ],
  },
  {
    name: "Quick Win Build",
    price: "$1,500",
    priceNote: "one-time",
    badge: null,
    description: "One automation, built and running fast. Pick the single biggest time-waster in your business and we'll eliminate it. The full $1,500 credits toward Ops Core or Back Office if you want to keep going.",
    includes: [
      "One workflow automated end-to-end",
      "Quote follow-up, invoice reminders, or booking confirmations",
      "Setup, testing & handoff training",
      "30-day post-launch check-in",
    ],
  },
];

const OPS_TIERS = [
  {
    name: "Ops Core",
    setup: 4500,
    monthly: 499,
    description: "The full front-of-house stack. Quoting, scheduling, payment collection, and lead follow-up — all connected and managed monthly.",
    includes: [
      "Digital quoting & estimate delivery",
      "Online scheduling & booking",
      "Invoice & payment automation",
      "Lead follow-up sequences",
      "Monthly support & updates",
    ],
  },
  {
    name: "Back Office",
    setup: 9500,
    monthly: 799,
    description: "Everything in Ops Core plus the systems behind the scenes — HR, payroll workflows, job costing, and reporting.",
    includes: [
      "Everything in Ops Core",
      "HR onboarding workflows",
      "Payroll integration & setup",
      "Job costing & margin reporting",
      "Document management",
      "Monthly support & updates",
    ],
  },
];

const TRAINING_OPTIONS = [
  {
    name: "1:1 Session",
    price: "$199",
    duration: "90 min · virtual",
    description: "One-on-one with the owner or a key employee. Pick a specific tool or workflow and we'll get you confident using it.",
  },
  {
    name: "Half-Day Workshop",
    price: "$999",
    duration: "4 hrs · virtual or on-site",
    description: "Covers AI chat, voice agents, scheduling tools, and quoting AI — all tailored to your trade. Great for a small team.",
  },
  {
    name: "Full-Day Workshop",
    price: "$1,499",
    duration: "8 hrs · virtual or on-site",
    description: "Deep dive into your real workflows. Build an action plan together and leave with tools running and your team trained.",
  },
  {
    name: "Multi-Day Workshop",
    price: "$2,499",
    duration: "2–3 days · virtual or on-site",
    description: "Comprehensive training plus hands-on implementation. Best for teams who want to move fast and embed AI across the whole business.",
  },
  {
    name: "On-Site Collaboration",
    price: "Custom",
    duration: "Flexible · your location",
    description: "We come to you. Shadow your team, map your operations in real time, and build systems on the spot. Ideal for growing companies ready to systematize everything.",
  },
];

export default function PricingPage() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-green-800 tracking-tight">Makr<span className="text-stone-400 font-medium">.ai</span></Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-stone-500">
            <Link href="/services" className="hover:text-stone-900 transition">Services</Link>
            <Link href="/pricing" className="text-stone-900 font-medium">Pricing</Link>
            <Link href="/contact" className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg transition font-medium">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-stone-900 mb-4">Simple, honest pricing</h1>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">One free build included with every plan — you choose. No setup fee. 4-month agreement. You own it after month 4.</p>
            <p className="text-stone-400 text-sm max-w-xl mx-auto mt-3">Everything your competitors pay $2,000–$10,000/month for elsewhere — at a price built for small businesses.</p>
          </div>

          {/* Marketing plans */}
          <div className="mb-6">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-6">Marketing plans</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {TIERS.map((tier) => (
              <div key={tier.name} className={`rounded-2xl border p-8 relative shadow-sm ${tier.popular ? "bg-green-900 border-green-700" : "bg-white border-stone-200"}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
                )}
                <h2 className={`text-xl font-bold mb-1 ${tier.popular ? "text-white" : "text-stone-900"}`}>{tier.name}</h2>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-black ${tier.popular ? "text-white" : "text-stone-900"}`}>${tier.price}</span>
                  <span className={tier.popular ? "text-green-300" : "text-stone-400"}>/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.includes.map((item) => (
                    <li key={item} className={`flex items-start gap-2 text-sm ${tier.popular ? "text-green-100" : "text-stone-600"}`}>
                      <span className={`mt-0.5 shrink-0 ${tier.popular ? "text-green-300" : "text-green-600"}`}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition ${tier.popular ? "bg-white hover:bg-green-50 text-green-900" : "bg-green-700 hover:bg-green-600 text-white"}`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* AI & Automation — entry-level */}
          <div className="mb-6 mt-4">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">AI & Automation</p>
            <p className="text-stone-500 text-sm max-w-2xl">Most home service businesses are leaving $50K/year on the table in missed calls and slow follow-up. Start free — we&apos;ll show you exactly where.</p>
          </div>

          {/* AI journey steps */}
          <div className="mb-8 bg-stone-50 border border-stone-200 rounded-2xl p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-5">How it works</p>
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              {[
                { label: "Start free", sub: "Free assessment — spot your biggest gaps, zero commitment" },
                { label: "Get your blueprint", sub: "$299 — a written action plan with ROI estimates you can actually use" },
                { label: "Build the system", sub: "Quick Win → Ops Core → Back Office, as far as you want to go" },
              ].map((s, i) => (
                <div key={s.label} className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="text-base font-bold text-green-700">{s.label}</p>
                    {i < 2 && <span className="hidden sm:block text-stone-300 font-light text-xl">→</span>}
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {AI_TIERS.map((tier) => (
              <div key={tier.name} className={`relative bg-white border rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md transition ${tier.badge ? "border-green-300 hover:border-green-400" : "border-stone-200 hover:border-green-300"}`}>
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">{tier.badge}</div>
                )}
                <h2 className="text-xl font-bold text-stone-900 mb-1">{tier.name}</h2>
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className={`font-black text-stone-900 ${tier.price === "Free" ? "text-3xl text-green-700" : "text-3xl"}`}>{tier.price}</span>
                    {tier.priceNote && <span className="text-stone-400 text-sm">{tier.priceNote}</span>}
                  </div>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">{tier.description}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.includes.map((item) => (
                    <li key={item} className={`flex items-start gap-2 text-sm ${item.includes("credited") ? "text-green-700 font-medium" : "text-stone-600"}`}>
                      <span className={`mt-0.5 shrink-0 ${item.includes("credited") ? "text-green-600" : "text-green-600"}`}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition ${tier.badge ? "bg-green-700 hover:bg-green-600 text-white" : "bg-white hover:bg-stone-50 text-stone-800 border border-stone-300"}`}
                >
                  {tier.price === "Free" ? "Get My Free Assessment" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>

          {/* Training options */}
          <div className="mb-6 mt-4">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">AI Training</p>
            <p className="text-stone-500 text-sm">Pick the format that fits your team — from a quick 1:1 to full on-site collaboration.</p>
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm mb-10">
            {TRAINING_OPTIONS.map((opt, i) => (
              <div key={opt.name} className={`flex items-start gap-6 px-8 py-6 hover:bg-stone-50 transition ${i < TRAINING_OPTIONS.length - 1 ? "border-b border-stone-100" : ""}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1">
                    <span className="text-base font-bold text-stone-900">{opt.name}</span>
                    <span className="text-xs text-stone-400 font-medium">{opt.duration}</span>
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed">{opt.description}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xl font-black text-stone-900">{opt.price}</p>
                  <Link href="/contact" className="mt-2 inline-block text-xs font-semibold text-green-700 hover:text-green-600 transition">Book →</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Operations projects */}
          <div className="mb-6 mt-4">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">Operations projects</p>
            <p className="text-stone-500 text-sm">One-time build fee + monthly management. Full systems built and maintained for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {OPS_TIERS.map((tier) => (
              <div key={tier.name} className="bg-white border border-stone-200 rounded-2xl p-8 flex flex-col shadow-sm hover:border-green-300 hover:shadow-md transition">
                <h2 className="text-xl font-bold text-stone-900 mb-1">{tier.name}</h2>
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-stone-900">${tier.setup.toLocaleString()}</span>
                    <span className="text-stone-400 text-sm">setup</span>
                  </div>
                  {tier.monthly && (
                    <p className="text-green-700 text-sm font-medium mt-0.5">+ ${tier.monthly}/mo management</p>
                  )}
                </div>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">{tier.description}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                      <span className="text-green-600 mt-0.5 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block w-full text-center py-3 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 rounded-xl font-semibold transition"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* Custom */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-1">Custom / Enterprise</h2>
              <p className="text-stone-500 text-sm max-w-xl">Multi-location businesses, ERP integrations, complex builds, or anything that doesn&apos;t fit neatly into a package. Let&apos;s scope it together.</p>
            </div>
            <Link href="/contact" className="shrink-0 px-6 py-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 rounded-xl font-medium transition">
              Let&apos;s Talk
            </Link>
          </div>

          {/* Agreement terms */}
          <div className="max-w-3xl mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-stone-900 mb-4">Service Agreement</h2>
            <div className="space-y-3 text-stone-500 text-sm">
              <p><span className="text-stone-800 font-medium">4-month minimum term.</span> We invest heavily from day one — building your free build and launching your marketing immediately. The 4-month agreement gives us enough time to show real results and covers the build we&apos;re doing at no charge.</p>
              <p><span className="text-stone-800 font-medium">Early exit.</span> If you leave before 4 months, the free build reverts to Makr.ai — no cash penalty beyond the months already paid. After month 4, everything is yours free and clear.</p>
              <p><span className="text-stone-800 font-medium">Month-to-month after that.</span> Continue with 30 days notice to cancel. No tricks, no price locks.</p>
              <p><span className="text-stone-800 font-medium">Pause option.</span> Seasonal businesses can pause up to 2 months/year at a reduced rate.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
