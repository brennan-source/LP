import Link from "next/link";
import Nav from "@/components/Nav";

const REVENUE_LEAKS = [
  { icon: "📵", title: "Missed calls", body: "You're on a job. The phone rings. The lead goes to your competitor." },
  { icon: "⏱️", title: "Slow response", body: "78% of customers hire whoever calls back first. Every hour of delay costs you jobs." },
  { icon: "📋", title: "Missed follow-up", body: "Estimates sent. No response. No reminder. The job was yours — then it wasn't." },
  { icon: "📝", title: "Manual office work", body: "Hours spent on paperwork that AI could handle in minutes." },
  { icon: "💬", title: "Poor customer communication", body: "Customers don't hear back. They leave a bad review. You lose the next job too." },
  { icon: "📊", title: "No visibility", body: "You don't know which leads are slipping through the cracks until it's too late." },
];

const JOURNEY = [
  {
    stage: "Capture",
    outcome: "Never miss another opportunity.",
    goal: "Capture every opportunity.",
    capabilities: ["AI receptionist", "Missed-call recovery", "Web chat", "Lead qualification", "SMS follow-up", "After-hours coverage", "Emergency routing"],
  },
  {
    stage: "Book",
    outcome: "Convert more leads into booked jobs.",
    goal: "Increase booked revenue.",
    capabilities: ["Appointment booking", "CRM integration", "Calendar automation", "Estimate follow-up", "Review requests", "Google Business Profile optimization", "Lead routing"],
  },
  {
    stage: "Operate",
    outcome: "Run a more efficient business.",
    goal: "Reduce administrative work.",
    capabilities: ["Billing automation", "Scheduling workflows", "Document processing", "Knowledge assistant", "Reporting", "Back-office automation"],
  },
  {
    stage: "Grow",
    outcome: "Create a predictable growth engine.",
    goal: "Long-term business growth.",
    capabilities: ["Marketing automation", "Customer reactivation", "AI reporting", "Growth dashboards", "Quarterly optimization", "Continuous improvements"],
  },
];

const ROI_EXAMPLES = [
  { action: "Recover 2 missed service calls per month", result: "Makr pays for itself.", detail: "One HVAC repair or emergency plumbing call covers the subscription." },
  { action: "Reduce 10 hours of office work per week", result: "Higher productivity.", detail: "Billing, follow-up, and scheduling handled automatically." },
  { action: "Automate review requests after every job", result: "More inbound business.", detail: "More 5-star reviews means more calls from Google." },
];

export default function HomePage() {
  return (
    <>
      <Nav activePath="/" />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-black text-stone-900 leading-tight tracking-tight mb-5">
            More revenue.<br />
            <span className="text-green-700">Less busywork.</span>
          </h1>
          <p className="text-xl text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            The AI Revenue Operations platform built for home service businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-lg rounded-xl transition shadow-lg shadow-green-900/20">
              Book a Revenue Assessment
            </Link>
            <Link href="/services" className="px-8 py-4 bg-white hover:bg-stone-50 text-stone-800 font-medium text-lg rounded-xl border border-stone-300 transition">
              See How It Works
            </Link>
          </div>
          <p className="text-stone-400 text-sm mt-4">Free assessment. No commitment. See exactly where you&apos;re leaving money on the table.</p>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-16 px-6 bg-green-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { stat: "62%", label: "of home service calls go unanswered industry-wide", implication: "Your competition is losing too" },
            { stat: "78%", label: "of customers hire whoever responds first", implication: "Speed wins jobs" },
            { stat: "$50K+", label: "avg. annual revenue lost to missed opportunities", implication: "One fix pays for itself" },
          ].map((s) => (
            <div key={s.stat}>
              <p className="text-5xl font-black text-white mb-2">{s.stat}</p>
              <p className="text-green-200 text-sm mb-1">{s.label}</p>
              <p className="text-green-400 text-xs font-semibold uppercase tracking-widest">{s.implication}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Revenue Leaks */}
      <section className="py-24 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">The real problem</p>
            <h2 className="text-4xl font-black text-stone-900 mb-3">Home service companies lose revenue every month.</h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">Not because they lack technology. Because of gaps in how their business captures and converts opportunities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVENUE_LEAKS.map((leak) => (
              <div key={leak.title} className="bg-white border border-stone-200 rounded-2xl p-7 shadow-sm">
                <div className="text-3xl mb-3">{leak.icon}</div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{leak.title}</h3>
                <p className="text-stone-500 leading-relaxed text-sm">{leak.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform intro */}
      <section className="py-20 px-6 bg-white border-y border-stone-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-3">The platform</p>
          <h2 className="text-4xl font-black text-stone-900 mb-4">Your AI Revenue Operations Platform</h2>
          <p className="text-stone-500 text-lg leading-relaxed">
            Makr deploys practical AI across your business to help capture more leads, convert more customers, and reduce administrative work — so you can focus on the work, not the office.
          </p>
        </div>
      </section>

      {/* Revenue Journey */}
      <section className="py-24 px-6 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">How it works</p>
            <h2 className="text-4xl font-black text-stone-900">The Revenue Journey</h2>
          </div>

          <div className="space-y-6">
            {JOURNEY.map((stage, i) => (
              <div key={stage.stage}>
                <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-green-700 text-white font-black text-lg flex items-center justify-center">
                        {i + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-1">
                        <h3 className="text-2xl font-black text-stone-900">{stage.stage}</h3>
                        <span className="text-green-700 font-semibold text-sm md:ml-3">{stage.outcome}</span>
                      </div>
                      <p className="text-stone-400 text-xs uppercase tracking-widest mb-4">Goal: {stage.goal}</p>
                      <div className="flex flex-wrap gap-2">
                        {stage.capabilities.map((cap) => (
                          <span key={cap} className="px-3 py-1 bg-stone-50 border border-stone-200 rounded-full text-stone-600 text-xs font-medium">
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {i < JOURNEY.length - 1 && (
                  <div className="flex justify-center my-2">
                    <span className="text-green-300 text-2xl font-light">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="text-green-700 hover:text-green-600 font-medium transition">
              Explore all capabilities →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Makr */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">Why Makr</p>
            <h2 className="text-4xl font-black text-stone-900 mb-4">We Deploy AI That Produces Business Results</h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              Not AI experiments. Not generic chatbots. Not disconnected software.<br />
              Business systems. Business outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🔧", title: "Practical, not theoretical", body: "Every capability we deploy has a clear business outcome. We don't add AI for its own sake." },
              { icon: "📍", title: "Local, not remote", body: "Built in New England. We know your market, your seasonality, your customers. Relationships matter." },
              { icon: "📈", title: "Measured in revenue", body: "We track what matters — calls captured, jobs booked, hours saved. Not dashboards full of vanity metrics." },
            ].map((w) => (
              <div key={w.title} className="bg-stone-50 border border-stone-200 rounded-2xl p-7">
                <div className="text-3xl mb-3">{w.icon}</div>
                <h3 className="font-bold text-stone-900 mb-2">{w.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-24 px-6 bg-green-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-2">Return on investment</p>
            <h2 className="text-4xl font-black text-white mb-3">It pays for itself fast.</h2>
            <p className="text-green-200 text-lg max-w-xl mx-auto">Two or three recovered jobs per month typically covers the full subscription. Everything after that is profit.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROI_EXAMPLES.map((ex) => (
              <div key={ex.action} className="bg-green-800 border border-green-700 rounded-2xl p-7">
                <p className="text-green-300 text-sm mb-3">{ex.action}</p>
                <p className="text-white font-black text-xl mb-2">→ {ex.result}</p>
                <p className="text-green-300 text-xs leading-relaxed">{ex.detail}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/pricing" className="text-green-300 hover:text-white font-medium transition">
              See pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 bg-stone-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to stop losing revenue?</h2>
          <p className="text-stone-400 text-lg mb-8">Book a free revenue assessment and we&apos;ll show you exactly where your business is leaking money — and how to fix it.</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-lg rounded-xl transition shadow-lg">
            Book Your Revenue Assessment
          </Link>
          <p className="text-stone-500 text-sm mt-4">Free. No commitment. We&apos;ll reach out within 24 hours.</p>
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
