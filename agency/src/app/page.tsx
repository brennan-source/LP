import Link from "next/link";
import Nav from "@/components/Nav";

const PROBLEMS = [
  { icon: "📵", title: "Missed calls while on the job", body: "You're in a crawlspace or on a roof. The phone rings. You can't answer. That lead is gone." },
  { icon: "🌙", title: "After-hours calls sent to voicemail", body: "Emergencies don't wait for business hours. If you don't answer, the next contractor will." },
  { icon: "⏱️", title: "Slow response loses jobs to competitors", body: "78% of customers hire the first business to call back. Every hour of delay costs you jobs." },
  { icon: "🔇", title: "No follow-up on unclosed leads", body: "Leads that don't book on the first call rarely hear from you again. That revenue disappears." },
];

const FLOW_STEPS = [
  "Customer calls",
  "Makr answers",
  "Qualifies the lead",
  "Books the appointment",
  "Updates your CRM",
  "You get a summary",
];

const INDUSTRIES = [
  { icon: "🌡️", name: "HVAC", hook: "Every emergency call answered, day or night" },
  { icon: "🔧", name: "Plumbing", hook: "Capture urgent calls before they call the next plumber" },
  { icon: "🏠", name: "Roofing", hook: "Qualify storm leads fast and book estimates automatically" },
  { icon: "⚡", name: "Electrical", hook: "Never lose a job because your line was busy" },
];

const RESOURCES = [
  { label: "AI Readiness Assessment", sub: "Find out where AI can help your business", href: "/resources" },
  { label: "AI Workshops", sub: "Practical training for owners and teams", href: "/resources" },
  { label: "Guides & Webinars", sub: "Free resources to help you grow", href: "/resources" },
];

export default function HomePage() {
  return (
    <>
      <Nav activePath="/" />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-stone-900 leading-tight tracking-tight mb-6">
            Never Miss Another<br />
            <span className="text-green-700">Customer Call.</span>
          </h1>
          <p className="text-xl text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Makr helps home service businesses answer every lead, book more jobs, automate follow-up, and grow revenue — with practical AI built for the trades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-lg rounded-xl transition shadow-lg shadow-green-900/20"
            >
              Book a Revenue Assessment
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 bg-white hover:bg-stone-50 text-stone-800 font-medium text-lg rounded-xl border border-stone-300 transition"
            >
              See How It Works
            </Link>
          </div>
          <p className="text-stone-400 text-sm mt-4">Free assessment. No commitment. See exactly what you&apos;re losing.</p>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-16 px-6 bg-green-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { stat: "100%", label: "of calls answered by Makr AI", implication: "No more missed revenue" },
            { stat: "62%", label: "of home service calls go unanswered industry-wide", implication: "Your competition is losing too" },
            { stat: "$50K+", label: "avg. annual revenue lost to missed calls", implication: "One fix pays for itself" },
          ].map((s) => (
            <div key={s.stat}>
              <p className="text-5xl font-black text-white mb-2">{s.stat}</p>
              <p className="text-green-200 text-sm mb-1">{s.label}</p>
              <p className="text-green-400 text-xs font-semibold uppercase tracking-widest">{s.implication}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="py-24 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">The real problem</p>
            <h2 className="text-4xl font-black text-stone-900 mb-3">Why contractors lose revenue every month</h2>
            <p className="text-stone-500 text-lg max-w-xl mx-auto">Not because they lack AI. Because the phone isn&apos;t handled.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{p.title}</h3>
                <p className="text-stone-500 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">The solution</p>
            <h2 className="text-4xl font-black text-stone-900 mb-3">The Makr AI Receptionist</h2>
            <p className="text-stone-500 text-lg max-w-xl mx-auto">One system that answers every call, qualifies every lead, and books every job — automatically.</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
            {FLOW_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm font-medium">
                  {step}
                </div>
                {i < FLOW_STEPS.length - 1 && (
                  <span className="text-stone-300 font-light text-xl">→</span>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📞", title: "Answers 24/7", body: "Live AI voice agent handles every call — business hours, after-hours, weekends, emergencies." },
              { icon: "✅", title: "Qualifies every lead", body: "Asks the right questions to understand the job, location, urgency, and budget." },
              { icon: "📅", title: "Books the job", body: "Schedules the appointment directly into your calendar. No back-and-forth." },
              { icon: "📋", title: "Sends you a summary", body: "You get a clean summary of every call — what was said, what was booked, what needs follow-up." },
            ].map((f) => (
              <div key={f.title} className="bg-stone-50 border border-stone-200 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-stone-900 mb-2">{f.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="text-green-700 hover:text-green-600 font-medium transition">
              See all solutions →
            </Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-6 bg-green-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-2">Industries</p>
            <h2 className="text-4xl font-black text-white mb-3">Built for the trades</h2>
            <p className="text-green-200 text-lg max-w-xl mx-auto">Where one missed call costs $500–$5,000.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} className="bg-green-800 border border-green-700 rounded-2xl p-6 hover:bg-green-700 transition">
                <div className="text-3xl mb-3">{ind.icon}</div>
                <h3 className="font-bold text-white mb-2">{ind.name}</h3>
                <p className="text-green-300 text-sm leading-relaxed">{ind.hook}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/industries" className="text-green-300 hover:text-white font-medium transition">
              See all industries →
            </Link>
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">Return on investment</p>
          <h2 className="text-4xl font-black text-stone-900 mb-6">How quickly does it pay for itself?</h2>
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 mb-8">
            <p className="text-stone-600 text-lg leading-relaxed mb-6">
              Recovering just <strong className="text-stone-900">2–3 missed jobs per month</strong> often covers the full monthly subscription. One HVAC repair, one roofing estimate, one emergency plumbing call — that&apos;s all it takes.
            </p>
            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                { trade: "HVAC repair", value: "$600–$3,000" },
                { trade: "Roofing estimate", value: "$8,000–$25,000" },
                { trade: "Emergency plumbing", value: "$300–$1,500" },
              ].map((r) => (
                <div key={r.trade}>
                  <p className="text-2xl font-black text-green-700">{r.value}</p>
                  <p className="text-stone-500 text-sm mt-1">{r.trade}</p>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/pricing"
            className="text-green-700 hover:text-green-600 font-medium transition"
          >
            See pricing →
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 bg-green-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to stop losing revenue to missed calls?</h2>
          <p className="text-green-200 text-lg mb-8">Book a free revenue assessment and we&apos;ll show you exactly how many calls you&apos;re missing and what they&apos;re worth.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white hover:bg-green-50 text-green-900 font-bold text-lg rounded-xl transition shadow-lg"
          >
            Book Your Revenue Assessment
          </Link>
          <p className="text-green-400 text-sm mt-4">Free. No commitment. 24-hr response.</p>
        </div>
      </section>

      {/* Resources teaser */}
      <section className="py-16 px-6 bg-stone-50 border-t border-stone-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-1">Resources</p>
              <h2 className="text-2xl font-black text-stone-900">Learn before you buy</h2>
            </div>
            <Link href="/resources" className="text-green-700 hover:text-green-600 font-medium transition text-sm">
              See all resources →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESOURCES.map((r) => (
              <Link key={r.label} href={r.href} className="bg-white border border-stone-200 rounded-xl p-5 hover:border-green-300 hover:shadow-sm transition">
                <p className="font-semibold text-stone-900 mb-1">{r.label}</p>
                <p className="text-stone-500 text-sm">{r.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
