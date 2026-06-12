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

const OPS_TIERS = [
  {
    name: "Quick Win",
    setup: 1500,
    monthly: null,
    description: "One automation, fast. Pick the single biggest time-waster in your business and we'll fix it.",
    includes: [
      "One workflow automated",
      "Quote follow-up, invoice reminders, or booking confirmation",
      "Setup + testing included",
      "Handoff training",
    ],
  },
  {
    name: "Ops Core",
    setup: 4500,
    monthly: 299,
    description: "The full front-of-house stack. Quoting, scheduling, payment collection, and lead follow-up — all connected.",
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
    monthly: 499,
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

          {/* Operations projects */}
          <div className="mb-6">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">Operations projects</p>
            <p className="text-stone-500 text-sm">One-time build fee + optional monthly support. Can be added to any marketing plan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {OPS_TIERS.map((tier) => (
              <div key={tier.name} className="bg-white border border-stone-200 rounded-2xl p-8 flex flex-col shadow-sm hover:border-green-300 hover:shadow-md transition">
                <h2 className="text-xl font-bold text-stone-900 mb-1">{tier.name}</h2>
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-stone-900">${tier.setup.toLocaleString()}</span>
                    <span className="text-stone-400 text-sm">setup</span>
                  </div>
                  {tier.monthly && (
                    <p className="text-green-700 text-sm font-medium mt-0.5">+ ${tier.monthly}/mo support</p>
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
              <p><span className="text-stone-800 font-medium">Early exit.</span> If you leave before 4 months, the free build reverts to Makr — no cash penalty beyond the months already paid. After month 4, everything is yours free and clear.</p>
              <p><span className="text-stone-800 font-medium">Month-to-month after that.</span> Continue with 30 days notice to cancel. No tricks, no price locks.</p>
              <p><span className="text-stone-800 font-medium">Pause option.</span> Seasonal businesses can pause up to 2 months/year at a reduced rate.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
