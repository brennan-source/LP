import Link from "next/link";
import Nav from "@/components/Nav";

const TIERS = [
  {
    name: "Essential",
    price: 399,
    popular: false,
    outcome: "Never miss another opportunity.",
    description: "For owner-operators who need the phone handled. Capture every lead that comes your way — calls answered, leads qualified, after-hours covered.",
    includes: [
      "AI receptionist — 24/7 call answering",
      "Lead qualification",
      "After-hours & emergency coverage",
      "Missed-call text-back",
      "SMS call summaries",
    ],
  },
  {
    name: "Growth",
    price: 699,
    popular: true,
    outcome: "The complete revenue loop.",
    description: "Capture the lead, book the job, automate follow-up, report the result. Everything you need to run a tighter revenue operation — without adding headcount.",
    includes: [
      "Everything in Essential",
      "Appointment booking",
      "CRM & calendar integration",
      "Estimate & lead follow-up",
      "Review request automation",
      "Google Business Profile optimization",
      "Lead routing",
      "Selected back-office workflows",
      "Monthly reporting",
    ],
  },
  {
    name: "Revenue Ops",
    price: 1099,
    popular: false,
    outcome: "Full revenue operations.",
    description: "Advanced automation across all four pillars — deeper operations, customer reactivation, marketing, and a dedicated optimization partner to keep the system growing.",
    includes: [
      "Everything in Growth",
      "Advanced booking & CRM workflows",
      "Full back-office automation",
      "Billing automation",
      "Customer reactivation campaigns",
      "Marketing automation",
      "Revenue dashboard",
      "AI reporting",
      "Monthly optimization call",
      "Quarterly strategy session",
    ],
  },
];

const MATRIX = [
  {
    pillar: "Capture",
    description: "Answer every call. Qualify every lead.",
    essential: "Core",
    growth: "Advanced",
    revenueOps: "Advanced",
  },
  {
    pillar: "Book",
    description: "Convert leads into booked jobs.",
    essential: null,
    growth: "Core",
    revenueOps: "Advanced",
  },
  {
    pillar: "Operate",
    description: "Eliminate repetitive office work.",
    essential: null,
    growth: "Selected workflows",
    revenueOps: "Advanced",
  },
  {
    pillar: "Grow",
    description: "Build a predictable growth engine.",
    essential: null,
    growth: "Core",
    revenueOps: "Advanced",
  },
];

const INTEGRATIONS = [
  "ServiceTitan", "Housecall Pro", "Jobber", "Custom CRM", "Advanced routing",
];

function MatrixCell({ value }: { value: string | null }) {
  if (!value) {
    return <td className="px-6 py-4 text-center text-stone-300 text-lg">—</td>;
  }
  const color = value === "Advanced"
    ? "text-green-700 font-bold"
    : value === "Core"
    ? "text-stone-700 font-semibold"
    : "text-stone-500 font-medium";
  return (
    <td className="px-6 py-4 text-center">
      <span className={`text-sm ${color}`}>{value}</span>
    </td>
  );
}

export default function PricingPage() {
  return (
    <>
      <Nav activePath="/pricing" />

      <main className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
            <h1 className="text-5xl font-black text-stone-900 mb-4">Stop paying for software.<br />Start investing in outcomes.</h1>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto mb-2">
              Makr works across four parts of your revenue operation — Capture, Book, Operate, and Grow — with three plans based on how much support your business needs.
            </p>
            <p className="text-stone-400 text-sm">Standard setup included. 90-day launch period. Month-to-month afterward.</p>
          </div>

          {/* Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
                  <p className={`text-sm font-semibold mb-4 ${tier.popular ? "text-green-300" : "text-green-700"}`}>
                    {tier.outcome}
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

          {/* Pillar comparison matrix */}
          <div className="mb-16">
            <div className="text-center mb-6">
              <p className="text-stone-500 text-sm">The <strong className="text-stone-700">Makr Revenue System</strong> works across four pillars. Here’s how each plan covers them.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="px-6 py-4 text-left text-stone-500 font-semibold w-1/3">Pillar</th>
                    <th className="px-6 py-4 text-center text-stone-700 font-bold">Essential<br /><span className="text-green-700 font-black">$399</span></th>
                    <th className="px-6 py-4 text-center text-white font-bold bg-green-900 rounded-t-none">Growth<br /><span className="text-green-300 font-black">$699</span></th>
                    <th className="px-6 py-4 text-center text-stone-700 font-bold">Revenue Ops<br /><span className="text-green-700 font-black">$1,099</span></th>
                  </tr>
                </thead>
                <tbody>
                  {MATRIX.map((row, i) => (
                    <tr key={row.pillar} className={i < MATRIX.length - 1 ? "border-b border-stone-100" : ""}>
                      <td className="px-6 py-4">
                        <p className="font-bold text-stone-900">{row.pillar}</p>
                        <p className="text-stone-400 text-xs mt-0.5">{row.description}</p>
                      </td>
                      <MatrixCell value={row.essential} />
                      <td className="px-6 py-4 text-center bg-green-50">
                        {row.growth ? (
                          <span className={`text-sm ${
                            row.growth === "Advanced" ? "text-green-700 font-bold" :
                            row.growth === "Core" ? "text-stone-700 font-semibold" :
                            "text-stone-500 font-medium"
                          }`}>{row.growth}</span>
                        ) : (
                          <span className="text-stone-300 text-lg">—</span>
                        )}
                      </td>
                      <MatrixCell value={row.revenueOps} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Setup & commitment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8">
              <h2 className="text-lg font-bold text-stone-900 mb-2">Setup</h2>
              <p className="text-stone-500 text-sm mb-4">Standard setup is included with every plan. We configure your systems, train the AI on your business, and get everything live — typically within a week.</p>
              <p className="text-stone-600 text-sm font-medium">Custom integrations starting at $500:</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {INTEGRATIONS.map((i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-stone-200 rounded-full text-stone-600 text-xs">{i}</span>
                ))}
              </div>
            </div>
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8">
              <h2 className="text-lg font-bold text-stone-900 mb-2">Commitment</h2>
              <div className="space-y-3 text-sm text-stone-500">
                <p><span className="text-stone-800 font-medium">90-day launch period.</span> We invest time upfront to configure, train, and optimize your systems. The 90-day period gives us enough runway to show real results.</p>
                <p><span className="text-stone-800 font-medium">Month-to-month after that.</span> Cancel with 30 days notice. No price locks, no tricks.</p>
              </div>
            </div>
          </div>

          {/* AI Readiness Assessment */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 md:p-10 mb-16">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex-1">
                <p className="text-green-700 text-xs font-bold uppercase tracking-widest mb-2">Free for qualified contractors</p>
                <h2 className="text-2xl font-black text-stone-900 mb-2">AI Readiness Assessment</h2>
                <p className="text-stone-500 leading-relaxed mb-4">
                  Not sure which plan fits? We’ll audit your business, identify your biggest revenue gaps, and recommend exactly where to start.
                </p>
                <ul className="space-y-1.5">
                  {["AI maturity score", "Operations score", "Revenue opportunities identified", "Automation roadmap", "Plan recommendation"].map((b) => (
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

          {/* Custom */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-1">Custom / Enterprise</h2>
              <p className="text-stone-500 text-sm max-w-xl">Multi-location businesses, complex integrations, or anything beyond the standard plans. Let’s scope it together.</p>
            </div>
            <Link href="/contact" className="shrink-0 px-6 py-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 rounded-xl font-medium transition">
              Let’s Talk
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
