import Link from "next/link";
import { ArrowRight, BarChart2, Search, Share2, Globe, Phone, Target, Zap, Star, CheckCircle } from "lucide-react";

const AUDIT_CATEGORIES = [
  { icon: <Globe className="w-5 h-5" />, name: "Website", desc: "Speed, mobile, conversion elements" },
  { icon: <Search className="w-5 h-5" />, name: "SEO", desc: "Local search rankings vs competitors" },
  { icon: <Share2 className="w-5 h-5" />, name: "Social Media", desc: "Presence, platforms, engagement" },
  { icon: <BarChart2 className="w-5 h-5" />, name: "Digital Footprint", desc: "Directories, reviews, citations" },
  { icon: <Phone className="w-5 h-5" />, name: "Lead Capture", desc: "Forms, chat, booking, call tracking" },
  { icon: <Target className="w-5 h-5" />, name: "Paid Ads", desc: "Google & Meta ad presence" },
  { icon: <Zap className="w-5 h-5" />, name: "AI Search", desc: "ChatGPT, Perplexity, AI Overviews" },
];

const TESTIMONIALS = [
  {
    quote: "Found out I was losing $4,200/month just because I had no Google Business Profile. Fixed it in an afternoon.",
    name: "Marcus T.",
    business: "HVAC contractor, Phoenix AZ",
  },
  {
    quote: "My competitors were running Google Ads for my exact keywords and I had no idea. This report changed everything.",
    name: "Sarah K.",
    business: "Family dentist, Atlanta GA",
  },
  {
    quote: "Scored a D on lead capture — and I was confused why my website traffic wasn't turning into calls. Now it makes sense.",
    name: "David R.",
    business: "Landscaping company, Denver CO",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xl font-black text-slate-900">LeadPulse</span>
          <Link
            href="/audit"
            className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get My Report — $6
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
          Trusted by 1,200+ small businesses
        </div>
        <h1 className="text-5xl sm:text-6xl font-black text-slate-900 leading-tight mb-6">
          Find out how much revenue<br />
          <span className="text-blue-600">your lead gen is losing you.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
          Get a complete scorecard of your lead generation vs. local competitors — SEO, website, social media, reviews, ads, and more — for just $6.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            href="/audit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-xl text-lg flex items-center gap-2 transition-colors shadow-lg shadow-blue-200"
          >
            Get My Lead Gen Report <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="text-slate-500 text-sm">
            <span className="font-bold text-slate-700 text-2xl mr-1">$6</span> one-time · no subscription · instant results
          </div>
        </div>
        <p className="text-sm text-slate-400">100% money-back guarantee if you are not satisfied</p>
      </section>

      {/* What you get */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-3">Your complete lead gen audit in 7 categories</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              We benchmark you against your top local competitors and calculate the revenue you are leaving on the table in each area.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AUDIT_CATEGORIES.map((cat, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                  {cat.icon}
                </div>
                <div>
                  <div className="font-bold text-slate-900 mb-0.5">{cat.name}</div>
                  <div className="text-sm text-slate-500">{cat.desc}</div>
                </div>
              </div>
            ))}
            <div className="bg-blue-600 rounded-xl border border-blue-700 p-5 flex items-start gap-4 col-span-full sm:col-span-1">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white shrink-0">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white mb-0.5">+ Revenue Impact</div>
                <div className="text-sm text-blue-200">Estimated monthly loss in each gap area</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 mb-3">How it works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Enter your business info", desc: "Business name, website, location, and industry. Takes 2 minutes." },
            { step: "2", title: "Pay $6 securely via Stripe", desc: "One-time payment. No subscription. No upsell required to see your full report." },
            { step: "3", title: "Get your full report", desc: "Scores in all 7 categories vs. competitors, revenue estimates, and a prioritized action plan delivered instantly." },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sample report preview */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-3">Your report looks like this</h2>
          <p className="text-slate-400 mb-10">A real scorecard with actionable data, not a generic PDF.</p>
          <div className="bg-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-left">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">SAMPLE REPORT</div>
                <div className="text-white font-bold">Riverside Plumbing Co.</div>
                <div className="text-slate-400 text-sm">Plumber · Austin, TX</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-black text-orange-400">D</div>
                <div className="text-slate-400 text-sm">42/100</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { label: "Website", grade: "C", score: 58 },
                { label: "SEO", grade: "D", score: 38 },
                { label: "Social", grade: "F", score: 20 },
                { label: "Reviews", grade: "C", score: 55 },
              ].map((item, i) => (
                <div key={i} className="bg-slate-700 rounded-lg p-2 text-center">
                  <div className={`text-lg font-black ${item.grade === "F" ? "text-red-400" : item.grade === "D" ? "text-orange-400" : "text-yellow-400"}`}>{item.grade}</div>
                  <div className="text-xs text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-red-900/40 border border-red-700 rounded-lg p-3">
              <div className="text-red-300 text-sm font-bold">Estimated monthly revenue loss: $3,850</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 mb-3">What business owners discovered</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <div className="flex gap-0.5 mb-3">
                {Array(5).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-slate-700 mb-4 italic">&quot;{t.quote}&quot;</p>
              <div>
                <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                <div className="text-slate-500 text-xs">{t.business}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black text-slate-900 text-center mb-10">Common questions</h2>
          <div className="space-y-4">
            {[
              { q: "How is this different from a free tool?", a: "Free tools give you generic scores. LeadPulse benchmarks you specifically against your local competitors in your industry and tells you the estimated dollar amount you are losing in each gap, so you know exactly what to fix first." },
              { q: "How long does the audit take?", a: "About 1-2 minutes. We run real-time checks on your website, SEO, social profiles, directory listings, and competitor data. You get your report the moment it is done." },
              { q: "Do I need to give you access to anything?", a: "No. Just your business name, website, location, and industry. We analyze your public web presence, no logins or API keys required from you." },
              { q: "What if I am not happy with the report?", a: "Full refund, no questions asked. Email us at support@leadpulse.ai within 7 days." },
              { q: "What are the Fix It products mentioned in the report?", a: "We offer a suite of AI tools that directly address each weak area: SEO optimization, AI chat, review collection, social posting, and more. They are optional, the audit stands on its own." },
            ].map((item, i) => (
              <details key={i} className="bg-white rounded-xl border border-slate-200 p-5 group">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-slate-400 text-lg">+</span>
                </summary>
                <p className="text-slate-600 mt-3 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-4">Stop guessing. Start fixing.</h2>
        <p className="text-xl text-slate-500 max-w-xl mx-auto mb-8">
          For $6 you will know exactly what is costing you customers, and what to do about it.
        </p>
        <Link
          href="/audit"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-5 rounded-xl text-xl transition-colors shadow-xl shadow-blue-200"
        >
          Get My Lead Gen Report $6 <ArrowRight className="w-6 h-6" />
        </Link>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-500" />Instant delivery</span>
          <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-500" />No subscription</span>
          <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-500" />Money-back guarantee</span>
        </div>
      </section>

      <footer className="border-t border-slate-100 px-6 py-8 text-center text-sm text-slate-400">
        <p>2025 LeadPulse &middot; <a href="mailto:support@leadpulse.ai" className="hover:text-slate-600">support@leadpulse.ai</a></p>
      </footer>
    </main>
  );
}
