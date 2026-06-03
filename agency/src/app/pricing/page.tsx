import Link from "next/link";

const TIERS = [
  {
    name: "Starter",
    price: 499,
    popular: false,
    includes: [
      "Professional website (free for 4 months)",
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
      "Everything in Starter",
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
      "Automated follow-up sequences",
      "CRM setup",
      "Monthly automation health check",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-violet-400 tracking-tight">Makr</Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <Link href="/services" className="hover:text-white transition">Services</Link>
            <Link href="/pricing" className="text-white">Pricing</Link>
            <Link href="/contact" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition font-medium">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-white mb-4">Simple, honest pricing</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Free website included. Cancel anytime after your 4-month agreement. You own the site after month 4.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {TIERS.map((tier) => (
              <div key={tier.name} className={`rounded-2xl border p-8 relative ${tier.popular ? "bg-violet-900/20 border-violet-600" : "bg-slate-900 border-slate-800"}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
                )}
                <h2 className="text-xl font-bold text-white mb-1">{tier.name}</h2>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-white">${tier.price}</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition ${tier.popular ? "bg-violet-600 hover:bg-violet-500 text-white" : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"}`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* AI Ops */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">AI Ops Projects</h2>
            <p className="text-slate-400 mb-2">Custom automation projects: booking systems, CRM builds, workflow automation, AI integrations.</p>
            <p className="text-violet-400 font-bold mb-4">$5,000 – $25,000 per project</p>
            <Link href="/contact" className="inline-block px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl font-medium transition">
              Let&apos;s Talk
            </Link>
          </div>

          {/* Agreement terms */}
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-4">Service Agreement</h2>
            <div className="space-y-3 text-slate-400 text-sm">
              <p><span className="text-slate-200 font-medium">4-month minimum term.</span> We invest real time and money into your website and marketing upfront. The 4-month agreement covers our build costs and gives us enough time to show real results.</p>
              <p><span className="text-slate-200 font-medium">Early exit.</span> If you leave before 4 months, the website reverts to Makr — no cash penalty. After month 4, the site is yours free and clear.</p>
              <p><span className="text-slate-200 font-medium">Month-to-month after that.</span> Continue with 30 days notice to cancel. No tricks, no price locks.</p>
              <p><span className="text-slate-200 font-medium">Pause option.</span> Seasonal businesses can pause up to 2 months/year at a reduced rate.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
