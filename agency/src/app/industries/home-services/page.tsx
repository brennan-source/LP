import Link from "next/link";
import Nav from "@/components/Nav";

const STATS = [
  { stat: "52%", label: "Average call answer rate", detail: "Nearly half of all inbound calls go unanswered in the average home service business." },
  { stat: "38%", label: "Lead rate on answered calls", detail: "Of the calls that do get answered, less than 4 in 10 result in a qualified lead." },
  { stat: "45%", label: "Call-to-appointment conversion", detail: "Less than half of inbound calls result in a booked appointment." },
  { stat: "55%", label: "Of agents never ask the caller to book", detail: "More than half of call handlers fail to actively request the appointment during the call." },
];

const TRADES = [
  { name: "HVAC", problem: "Emergency calls during peak season go to voicemail. After-hours service requests go to competitors.", capabilities: ["24/7 AI receptionist for emergency intake", "Seasonal maintenance follow-up", "Technician scheduling automation"] },
  { name: "Plumbing", problem: "Urgent calls can't wait. If you don't answer in the first 60 seconds, the next plumber gets the job.", capabilities: ["Immediate call capture and qualification", "Emergency routing", "Estimate follow-up automation"] },
  { name: "Roofing", problem: "Storm season floods the phone. Qualifying leads fast and booking estimates before the market moves is everything.", capabilities: ["High-volume call handling", "Insurance claim lead qualification", "Estimate pipeline automation"] },
  { name: "Electrical", problem: "Busy lines and missed calls during peak periods hand jobs directly to competitors.", capabilities: ["Overflow call capture", "Service scheduling automation", "Follow-up on open estimates"] },
  { name: "Restoration", problem: "Emergency restoration leads are time-sensitive. The first responder wins the job.", capabilities: ["24/7 emergency intake", "Insurance partner integration support", "Job status communication"] },
  { name: "Landscaping", problem: "Seasonal demand spikes mean admin work piles up right when you're busiest in the field.", capabilities: ["Seasonal quote automation", "Customer reactivation campaigns", "Recurring service scheduling"] },
  { name: "Pest Control", problem: "Recurring service customers are valuable. Reactivation and renewal automation keeps them on schedule.", capabilities: ["Service renewal reminders", "Customer reactivation", "Route and scheduling efficiency"] },
];

const OUTCOMES = [
  { metric: "Answer rate", baseline: "52% industry avg", withMakr: "100% — every call captured" },
  { metric: "Speed-to-lead", baseline: "Hours or days", withMakr: "Seconds — automated follow-up" },
  { metric: "Estimate follow-up", baseline: "Manual, inconsistent", withMakr: "Systematic, automated" },
  { metric: "After-hours coverage", baseline: "Voicemail", withMakr: "AI receptionist 24/7" },
];

export default function HomeServicesPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />
      <section className="bg-white pt-28 pb-16 px-6 border-b border-brass-light">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/industries" className="text-sm text-ink-light hover:text-green-700 transition">Industries</Link>
            <span className="text-ink-light">/</span>
            <span className="text-sm font-semibold text-green-700">Home Services</span>
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-ink leading-none tracking-tight mb-6">Home service businesses lose revenue every day from unanswered calls.</h1>
          <p className="text-ink-mid text-xl max-w-2xl leading-relaxed">Makr helps HVAC, plumbing, roofing, electrical, and other home service businesses capture more leads, book more jobs, and run more efficiently — without adding headcount.</p>
          <div className="mt-8"><Link href="/contact" className="inline-block bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded font-semibold text-lg transition-colors">Book an AI Opportunity Assessment</Link></div>
        </div>
      </section>
      <section className="py-16 px-6 bg-canvas">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-ink mb-2">Industry benchmarks</h2>
          <p className="text-ink-light text-sm mb-8">Source: Invoca Home Services Industry Benchmark Report 2026. These are industry averages — not Makr customer results.</p>
          <div className="grid md:grid-cols-4 gap-5">
            {STATS.map((s) => (
              <div key={s.stat} className="bg-white border border-brass-light rounded-sm p-6 text-center">
                <div className="font-display font-bold text-4xl text-green-700 mb-2">{s.stat}</div>
                <div className="font-semibold text-ink text-sm mb-2">{s.label}</div>
                <p className="text-ink-light text-xs">{s.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-light mt-4 text-center">These figures represent industry averages. Individual results vary. Makr does not publish performance guarantees.</p>
        </div>
      </section>
      <section className="py-20 px-6 bg-white border-y border-brass-light">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-ink mb-4">Built for home service trades</h2>
          <p className="text-ink-mid mb-12">Every trade has a different revenue leak. We address the one that matters most for your business first.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRADES.map((t) => (
              <div key={t.name} className="bg-canvas border-l-4 border-green-700 rounded-sm p-6">
                <h3 className="font-semibold text-ink mb-2">{t.name}</h3>
                <p className="text-ink-mid text-sm mb-4">{t.problem}</p>
                <ul className="space-y-1">{t.capabilities.map((c) => <li key={c} className="text-xs text-ink-mid flex items-start gap-2"><span className="text-green-600 mt-0.5 shrink-0">✓</span>{c}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-green-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-8">What changes when Makr is running</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-green-600"><th className="text-left py-3 pr-6 font-semibold text-green-200">Metric</th><th className="text-left py-3 px-4 font-semibold text-green-200">Industry baseline</th><th className="text-left py-3 px-4 font-semibold text-green-100">With Makr</th></tr></thead>
              <tbody>{OUTCOMES.map((row) => <tr key={row.metric} className="border-b border-green-700"><td className="py-3 pr-6 font-medium text-white">{row.metric}</td><td className="py-3 px-4 text-green-300">{row.baseline}</td><td className="py-3 px-4 text-white font-medium">{row.withMakr}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="text-xs text-green-400 mt-4">Industry baselines from Invoca 2026. &quot;With Makr&quot; reflects system design goals — individual results depend on business size, volume, and configuration.</p>
        </div>
      </section>
      <section className="py-24 px-6 bg-green-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight max-w-2xl">Find out where your business is leaving revenue on the table.</h2>
          <p className="mt-6 text-green-200 text-lg max-w-lg">Book an AI Opportunity Assessment. We&apos;ll map your call flow, workflows, and follow-up gaps — then show you exactly what we&apos;d build.</p>
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link href="/contact" className="bg-white text-green-900 hover:bg-green-50 px-8 py-4 rounded font-bold text-lg transition-colors">Book an AI Opportunity Assessment</Link>
            <span className="text-green-400 text-sm">Complimentary for qualified service businesses.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
