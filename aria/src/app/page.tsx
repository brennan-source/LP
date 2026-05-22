import Link from "next/link";
import { ArrowRight, Zap, TrendingUp, Clock, DollarSign, Star, CheckCircle, BarChart2, Users, Layers } from "lucide-react";

const PRODUCTS = [
  {
    tier: "Self-Study",
    color: "bg-slate-50 border-slate-200",
    headerColor: "bg-slate-800 text-white",
    items: [
      { name: "AI Readiness Assessment", price: "$19", desc: "Full scorecard with savings calculator" },
      { name: "AI Basics for Business Owners", price: "$197", desc: "Self-paced course, tools & workflow" },
      { name: "Full Course Bundle (3 courses)", price: "$497", desc: "AI for Marketing, Operations & Finance" },
    ],
  },
  {
    tier: "Workshops",
    color: "bg-violet-50 border-violet-200",
    headerColor: "bg-violet-700 text-white",
    items: [
      { name: "Monthly Group Workshop", price: "$197/seat", desc: "Virtual, live Q&A, 20-seat max" },
      { name: "Custom Team Workshop (half-day)", price: "$2,500", desc: "Built for your team, up to 15 people" },
      { name: "8-Week AI Mastery Cohort", price: "$797/seat", desc: "Group cohort, weekly calls, community" },
    ],
  },
  {
    tier: "Consulting",
    color: "bg-indigo-50 border-indigo-200",
    headerColor: "bg-indigo-700 text-white",
    items: [
      { name: "90-Day AI Quick Start", price: "$2,000/mo", desc: "Done-with-you, 3-month engagement" },
      { name: "Fractional AI Officer (entry)", price: "$3,500/mo", desc: "10-20 hrs/mo embedded AI leadership" },
      { name: "Fractional AI Officer (pro)", price: "$6,500/mo", desc: "20-40 hrs/mo, full program management" },
    ],
  },
  {
    tier: "Build for You",
    color: "bg-purple-50 border-purple-200",
    headerColor: "bg-purple-800 text-white",
    items: [
      { name: "Automation Starter Pack", price: "$6,500", desc: "1-2 workflows automated end-to-end" },
      { name: "Business AI Stack", price: "$17,500", desc: "4-6 automations across sales, ops, marketing" },
      { name: "Enterprise AI Build", price: "from $45,000", desc: "Billing, finance, HR, sales, marketing + dashboard" },
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-xl font-black text-slate-900">Aria</span>
            <span className="text-xs text-slate-400 ml-2 hidden sm:inline">AI Readiness & Implementation</span>
          </div>
          <Link href="/assess" className="bg-violet-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-violet-700 transition-colors">
            Take the Assessment
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <Zap className="w-3.5 h-3.5 fill-violet-500" />
          The AI transformation partner for small business owners
        </div>
        <h1 className="text-5xl sm:text-6xl font-black text-slate-900 leading-tight mb-6">
          Find out how much AI could<br />
          <span className="text-violet-600">save and earn your business.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
          Get your AI readiness score, see exactly where you're leaving money on the table, and get a custom roadmap to fix it — in under 10 minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <Link href="/assess" className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-10 py-4 rounded-xl text-lg flex items-center gap-2 transition-colors shadow-lg shadow-violet-200">
            Get My AI Readiness Score <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="text-slate-500 text-sm">
            <span className="font-bold text-slate-700 text-2xl mr-1">$19</span> · free to complete · pay to unlock full report
          </div>
        </div>
        <p className="text-xs text-slate-400">LeadPulse customers save 25% with code LEADPULSE</p>
      </section>

      {/* Impact metrics */}
      <section className="bg-slate-900 py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "10-15 hrs", label: "saved per week by AI-using owners", icon: <Clock className="w-5 h-5 text-violet-400" /> },
            { value: "3x", label: "higher conversion with automated follow-up", icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> },
            { value: "$28K", label: "median AI consulting engagement cost (we're less)", icon: <DollarSign className="w-5 h-5 text-yellow-400" /> },
            { value: "400%", label: "YoY growth in AI search traffic", icon: <BarChart2 className="w-5 h-5 text-blue-400" /> },
          ].map((m, i) => (
            <div key={i}>
              <div className="flex justify-center mb-2">{m.icon}</div>
              <div className="text-3xl font-black text-white">{m.value}</div>
              <div className="text-slate-400 text-sm mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What we assess */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 mb-3">Your AI Readiness Assessment covers 8 areas</h2>
          <p className="text-slate-500">We scan your website and ask 15 questions. The result is a dollar-quantified gap analysis, not a generic checklist.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Star className="w-5 h-5" />, name: "AI Leadership", desc: "Your personal AI usage and literacy" },
            { icon: <Users className="w-5 h-5" />, name: "Team Adoption", desc: "How much your team uses AI" },
            { icon: <TrendingUp className="w-5 h-5" />, name: "Sales & Marketing", desc: "Pipeline and follow-up automation" },
            { icon: <Zap className="w-5 h-5" />, name: "Operations", desc: "Manual vs. automated processes" },
            { icon: <DollarSign className="w-5 h-5" />, name: "Finance & Admin", desc: "Invoicing, billing, reporting" },
            { icon: <BarChart2 className="w-5 h-5" />, name: "Customer Experience", desc: "AI in support and engagement" },
            { icon: <Layers className="w-5 h-5" />, name: "Tech Stack", desc: "Current tools and infrastructure" },
            { icon: <CheckCircle className="w-5 h-5" />, name: "Data Readiness", desc: "Quality and accessibility of your data" },
          ].map((cat, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-3">
              <div className="w-9 h-9 bg-violet-50 rounded-lg flex items-center justify-center text-violet-600 shrink-0">{cat.icon}</div>
              <div>
                <div className="font-bold text-slate-900 text-sm">{cat.name}</div>
                <div className="text-xs text-slate-500">{cat.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products overview */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-3">Products for every stage</h2>
            <p className="text-slate-500">From a $19 assessment to a $45K custom AI build — we meet you where you are.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCTS.map((tier, i) => (
              <div key={i} className={`rounded-xl border overflow-hidden ${tier.color}`}>
                <div className={`px-5 py-3 font-bold text-sm ${tier.headerColor}`}>{tier.tier}</div>
                <div className="p-4 space-y-3">
                  {tier.items.map((item, j) => (
                    <div key={j} className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.desc}</div>
                      </div>
                      <span className="text-sm font-bold text-slate-700 whitespace-nowrap shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/products" className="text-violet-600 font-semibold hover:underline flex items-center gap-1 justify-center">
              See full pricing details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 mb-3">How the assessment works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { n: "1", t: "Enter business info", d: "Name, website, location, team size — 2 minutes." },
            { n: "2", t: "We scan your website", d: "Automated analysis of your current tech stack and tools." },
            { n: "3", t: "Answer 15 questions", d: "About your processes, AI usage, and biggest time drains." },
            { n: "4", t: "Pay $19, get your report", d: "Full scorecard + savings estimates + 3-phase roadmap." },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 bg-violet-600 text-white rounded-xl flex items-center justify-center text-xl font-black mx-auto mb-3">{s.n}</div>
              <h3 className="font-bold text-slate-900 mb-1">{s.t}</h3>
              <p className="text-slate-500 text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-violet-600 to-indigo-700 py-20 text-center text-white">
        <h2 className="text-4xl font-black mb-4">Your AI transformation starts with knowing where you stand.</h2>
        <p className="text-violet-200 text-lg max-w-xl mx-auto mb-8">
          Take the 10-minute assessment. Get a dollar-quantified readiness score and a custom roadmap for $19.
        </p>
        <Link href="/assess" className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold px-12 py-5 rounded-xl text-xl hover:bg-violet-50 transition-colors shadow-xl">
          Start My Free Assessment <ArrowRight className="w-6 h-6" />
        </Link>
        <div className="mt-4 flex justify-center gap-6 text-sm text-violet-300">
          <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" />Free to complete</span>
          <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" />$19 to unlock full report</span>
          <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" />Money-back guarantee</span>
        </div>
      </section>

      <footer className="border-t border-slate-100 px-6 py-8 text-center text-sm text-slate-400">
        <p>2025 Aria AI &middot; <a href="mailto:hello@aria.ai" className="hover:text-slate-600">hello@aria.ai</a> &middot; <a href="https://leadpulse.ai" className="hover:text-slate-600">Also check out LeadPulse →</a></p>
      </footer>
    </main>
  );
}
