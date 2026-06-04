import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Aria Products & Pricing — AI Implementation for Small Businesses",
  description: "From a $9 scorecard to full AI implementation. Choose the level of support that fits your business.",
};

const TIERS = [
  {
    tier: "Self-Study",
    color: "border-slate-200",
    headerColor: "bg-slate-800",
    items: [
      { name: "AI Readiness Scorecard", price: "$9", desc: "Full 8-category assessment with savings calculator and custom roadmap", cta: "Get Your Scorecard", href: "/assess" },
      { name: "AI Basics for Business Owners", price: "$197", desc: "Self-paced course — tools, prompts, and workflows for non-technical owners", cta: "Coming Soon", href: "mailto:brennan@teamaria.ai?subject=AI Basics Course Waitlist" },
      { name: "Full Course Bundle", price: "$497", desc: "AI for Marketing, Operations & Finance — 3 courses, lifetime access", cta: "Coming Soon", href: "mailto:brennan@teamaria.ai?subject=Course Bundle Waitlist" },
    ],
  },
  {
    tier: "Workshops",
    color: "border-violet-200",
    headerColor: "bg-violet-700",
    items: [
      { name: "Monthly Group Workshop", price: "$197/seat", desc: "Virtual, live Q&A, 20-seat max — practical AI tools for your business", cta: "Reserve a Seat", href: "mailto:brennan@teamaria.ai?subject=Workshop Interest" },
      { name: "Custom Team Workshop", price: "$2,500", desc: "Half-day session built for your team and industry, up to 15 people", cta: "Book a Workshop", href: "mailto:brennan@teamaria.ai?subject=Team Workshop" },
      { name: "8-Week AI Mastery Cohort", price: "$797/seat", desc: "Group cohort with weekly calls, community, and implementation accountability", cta: "Join Waitlist", href: "mailto:brennan@teamaria.ai?subject=Cohort Waitlist" },
    ],
  },
  {
    tier: "Consulting",
    color: "border-indigo-200",
    headerColor: "bg-indigo-700",
    highlight: true,
    items: [
      { name: "90-Day AI Quick Start", price: "$2,000/mo", desc: "Done-with-you engagement — we build your AI stack together over 3 months", cta: "Book a Call", href: "/consult" },
      { name: "Fractional AI Officer", price: "$3,500/mo", desc: "10–20 hrs/month embedded AI leadership for growing businesses", cta: "Book a Call", href: "/consult" },
      { name: "Fractional AI Officer Pro", price: "$6,500/mo", desc: "20–40 hrs/month — full program management and team training", cta: "Book a Call", href: "/consult" },
    ],
  },
  {
    tier: "Build for You",
    color: "border-purple-200",
    headerColor: "bg-purple-800",
    items: [
      { name: "Automation Starter Pack", price: "$6,500", desc: "1–2 workflows automated end-to-end — lead follow-up, scheduling, or invoicing", cta: "Get a Quote", href: "/consult" },
      { name: "Business AI Stack", price: "$17,500", desc: "4–6 automations across sales, ops, and marketing", cta: "Get a Quote", href: "/consult" },
      { name: "Enterprise AI Build", price: "from $25,000", desc: "Billing, finance, HR, sales, marketing + custom dashboard", cta: "Get a Quote", href: "/consult" },
    ],
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-black text-slate-900 text-xl">Aria</Link>
          <Link href="/assess" className="bg-violet-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-violet-700 transition-colors">
            Start with $9 Scorecard
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-black text-slate-900 mb-3">Every level of AI support, in one place</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Start with a $9 scorecard to find your biggest opportunities. Then choose the level of help that matches your budget and timeline.
          </p>
        </div>

        <div className="space-y-10">
          {TIERS.map((tier) => (
            <div key={tier.tier} className={`rounded-2xl border-2 overflow-hidden ${tier.color}`}>
              <div className={`${tier.headerColor} text-white px-6 py-3`}>
                <h2 className="font-bold text-lg">{tier.tier}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {tier.items.map((item) => (
                  <div key={item.name} className="p-6 flex flex-col">
                    <div className="mb-3">
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-2xl font-black text-slate-900 mt-1">{item.price}</p>
                    </div>
                    <p className="text-slate-500 text-sm flex-1 mb-5">{item.desc}</p>
                    <a
                      href={item.href}
                      className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
                    >
                      {item.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-violet-50 border-2 border-violet-200 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Not sure where to start?</h2>
          <p className="text-slate-500 mb-6 max-w-xl mx-auto">
            Run the $9 AI Readiness Scorecard first — it takes 10 minutes and tells you exactly which tier makes sense for your business right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/assess" className="inline-flex items-center gap-2 bg-violet-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-violet-700 transition-colors">
              Get My Scorecard — $9 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/consult" className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 text-slate-900 font-bold px-8 py-3 rounded-xl hover:border-slate-400 transition-colors">
              Talk to Brennan First
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
