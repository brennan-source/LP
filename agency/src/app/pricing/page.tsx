import Link from "next/link";
import Nav from "@/components/Nav";

const TIERS = [
  {
    name: "Capture",
    price: 399,
    popular: false,
    tagline: "Answer every call. Qualify every lead.",
    description: "Perfect for owner-operated businesses that need the phone handled. AI answering with no booking or CRM required.",
    includes: [
      "AI voice receptionist — 24/7",
      "Lead qualification",
      "After-hours coverage",
      "Emergency call routing",
      "SMS summaries after every call",
    ],
  },
  {
    name: "Book",
    price: 699,
    popular: true,
    tagline: "Answer, qualify, and book the job.",
    description: "Our most popular plan. Everything in Capture plus appointment booking and CRM integration — the complete revenue capture engine.",
    includes: [
      "Everything in Capture",
      "Appointment booking",
      "CRM & calendar integration",
      "Missed-call text-back",
      "Lead routing",
      "Custom qualification scripts",
      "Business-hours logic",
      "Monthly reporting",
    ],
  },
  {
    name: "Grow",
    price: 1099,
    popular: false,
    tagline: "Full revenue automation — from first call to repeat customer.",
    description: "Everything in Book plus automated follow-up, reviews, reactivation, and a dedicated dashboard.",
    includes: [
      "Everything in Book",
      "Lead & estimate follow-up",
      "Review automation",
      "Customer reactivation campaigns",
      "Advanced workflows",
      "Revenue dashboard",
      "Monthly optimization call",
    ],
  },
];

const INTEGRATIONS = [
  "ServiceTitan", "Housecall Pro", "Jobber", "Custom CRM", "Advanced routing",
];

export default function PricingPage() {
  return (
    <>
      <Nav activePath="/pricing" />

      <main className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
            <h1 className="text-5xl font-black text-stone-900 mb-4">Simple, transparent pricing</h1>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto mb-2">
              Compete against missed revenue, not commodity software. Every plan includes standard setup at no extra charge.
            </p>
            <p className="text-stone-400 text-sm max-w-xl mx-auto">
              90-day launch period. Month-to-month afterward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border p-8 relative flex flex-col shadow-sm ${
                  tier.popular ? "bg-green-900 border-green-700" : "bg-white border-stone-200"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h2 className={`text-xl font-bold mb-1 ${tier.popular ? "text-white" : "text-stone-900"}`}>
                    {tier.name}
                  </h2>
                  <p className={`text-sm mb-4 ${tier.popular ? "text-green-300" : "text-green-700"}`}>
                    {tier.tagline}
                  </p>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className={`text-4xl font-black ${tier.popular ? "text-white" : "text-stone-900"}`}>
                      ${tier.price}
                    </span>
                    <span className={tier.popular ? "text-green-300" : "text-stone-400"}>/month</span>
                  </div>
                  <p className={`text-sm leading-relaxed ${tier.popular ? "text-green-200" : "text-stone-500"}`}>
                    {tier.description}
                  </p>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.includes.map((item) => (
                    <li key={item} className={`flex items-start gap-2 text-sm ${tier.popular ? "text-green-100" : "text-stone-600"}`}>
                      <span className={`mt-0.5 shrink-0 ${tier.popular ? "text-green-300" : "text-green-600"}`}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition ${
                    tier.popular
                      ? "bg-white hover:bg-green-50 text-green-900"
                      : "bg-green-700 hover:bg-green-600 text-white"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8">
              <h2 className="text-lg font-bold text-stone-900 mb-2">Setup</h2>
              <p className="text-stone-500 text-sm mb-4">Standard setup is included with every plan. We configure your AI receptionist, train it on your business, and get it live — typically within a week.</p>
              <p className="text-stone-600 text-sm font-medium">Custom integrations starting at $500:</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {INTEGRATIONS.map((i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-stone-200 rounded-full text-stone-600 text-xs">
                    {i}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8">
              <h2 className="text-lg font-bold text-stone-900 mb-2">Commitment</h2>
              <div className="space-y-3 text-sm text-stone-500">
                <p><span className="text-stone-800 font-medium">90-day launch period.</span> We invest time upfront to configure, train, and optimize your AI receptionist. The 90-day period gives us enough runway to show real results.</p>
                <p><span className="text-stone-800 font-medium">Month-to-month after that.</span> Cancel with 30 days notice. No price locks, no tricks.</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 md:p-10 mb-16">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex-1">
                <p className="text-green-700 text-xs font-bold uppercase tracking-widest mb-2">Free for qualified prospects</p>
                <h2 className="text-2xl font-black text-stone-900 mb-2">AI Readiness Assessment</h2>
                <p className="text-stone-500 leading-relaxed mb-4">
                  A detailed look at where AI can help your business — and how much revenue you&apos;re currently leaving on the table. We review your operations, identify your biggest gaps, and give you a clear roadmap.
                </p>
                <ul className="space-y-1.5">
                  {["AI maturity score", "Operations score", "Revenue opportunities identified", "Automation roadmap", "Priority recommendations"].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-stone-600">
                      <span className="text-green-600 shrink-0">✓</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0 text-center md:text-right">
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">For qualified contractors</p>
                <p className="text-3xl font-black text-green-700 mb-1">Included</p>
                <p className="text-xs text-stone-400 mb-4">For other businesses: $495</p>
                <Link href="/contact" className="inline-block px-6 py-3 bg-green-700 hover:bg-green-600 text-white rounded-xl font-semibold transition text-sm">
                  Book Your Assessment
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-1">Custom / Enterprise</h2>
              <p className="text-stone-500 text-sm max-w-xl">Multi-location businesses, complex integrations, or anything that doesn&apos;t fit neatly into a plan. Let&apos;s scope it together.</p>
            </div>
            <Link href="/contact" className="shrink-0 px-6 py-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 rounded-xl font-medium transition">
              Let&apos;s Talk
            </Link>
          </div>

        </div>
      </main>

      <footer className="border-t border-stone-200 py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-stone-400 text-sm">
          <span className="font-black text-green-800">Makr<span className="text-stone-400 font-medium">.ai</span></span>
          <div className="flex gap-6">
            <Link href="/services" className="hover:text-stone-700 transition">Solutions</Link>
            <Link href="/industries" className="hover:text-stone-700 transition">Industries</Link>
            <Link href="/resources" className="hover:text-stone-700 transition">Resources</Link>
            <Link href="/pricing" className="hover:text-stone-700 transition">Pricing</Link>
            <Link href="/about" className="hover:text-stone-700 transition">About</Link>
            <Link href="/contact" className="hover:text-stone-700 transition">Contact</Link>
          </div>
          <span>© {new Date().getFullYear()} Makr.ai. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
