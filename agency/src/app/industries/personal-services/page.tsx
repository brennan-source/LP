import Link from "next/link";
import Nav from "@/components/Nav";

const STATS = [
  { stat: "34%", label: "Lead rate on answered calls", detail: "Roughly 1 in 3 answered calls results in a qualified lead in personal service businesses.", source: "Invoca 2026" },
  { stat: "40%", label: "Call-to-appointment conversion", detail: "4 in 10 inbound calls result in a booked appointment — with room to improve on both sides.", source: "Invoca 2026" },
];

const SEGMENTS = [
  { name: "Dental", problem: "Appointment slots go unfilled because of no-shows and poor reactivation of lapsed patients.", capabilities: ["No-show reduction workflows", "Patient reactivation campaigns", "Appointment reminder automation"] },
  { name: "Veterinary", problem: "Calls go unanswered during busy clinic hours. Missed calls mean missed appointments and frustrated clients.", capabilities: ["Overflow call capture", "Appointment booking automation", "Prescription refill and follow-up workflows"] },
  { name: "Med Spa & Aesthetics", problem: "High-value services require consistent follow-up. Most practices lose clients between treatment cycles.", capabilities: ["Treatment follow-up automation", "Client reactivation campaigns", "Booking and rescheduling workflows"] },
  { name: "Wellness & Therapy", problem: "New client intake is manual and time-consuming. Retention is relationship-driven but easily automated.", capabilities: ["Intake form automation", "Session reminder and follow-up", "Referral and review generation"] },
  { name: "Fitness", problem: "Member churn happens quietly. Proactive reactivation and renewal outreach keeps utilization high.", capabilities: ["Membership renewal automation", "Attendance-triggered outreach", "Class and appointment booking"] },
  { name: "Beauty & Salon", problem: "Rebooking at checkout is inconsistent. A systematic follow-up system keeps chairs filled.", capabilities: ["Post-appointment rebooking prompts", "Lapsed client reactivation", "Review generation automation"] },
  { name: "Senior Services", problem: "Families researching care options need fast, empathetic responses. Delays lose placement opportunities.", capabilities: ["24/7 inquiry intake", "Family communication workflows", "Assessment scheduling automation"] },
];

const LEVERS = [
  { lever: "Fill more appointment slots", detail: "Capture unanswered calls, reduce no-shows with reminders, and reactivate lapsed clients." },
  { lever: "Increase retention", detail: "Systematic follow-up after visits keeps clients returning on schedule." },
  { lever: "Reduce admin burden", detail: "Intake, reminders, billing follow-up — automate what doesn't need a human." },
  { lever: "Generate more reviews", detail: "Ask at the right moment, automatically — and build the online reputation that drives inbound." },
];

export default function PersonalServicesPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />
      <section className="bg-white pt-28 pb-16 px-6 border-b border-brass-light">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/industries" className="text-sm text-ink-light hover:text-green-700 transition">Industries</Link>
            <span className="text-brass-light">/</span>
            <span className="text-sm font-semibold text-green-700">Personal Services</span>
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-ink leading-none tracking-tight mb-6">
            Appointment-driven businesses grow when more slots are filled and more clients come back.
          </h1>
          <p className="text-ink-mid text-xl max-w-2xl leading-relaxed">Makr helps dental practices, veterinary clinics, wellness providers, med spas, fitness studios, and beauty businesses capture more appointments, reduce no-shows, and reactivate lapsed clients.</p>
          <div className="mt-8">
            <Link href="/contact" className="inline-block bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded font-semibold text-lg transition-colors">Book an AI Opportunity Assessment</Link>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-canvas">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-ink mb-2">Industry benchmarks</h2>
          <p className="text-ink-light text-sm mb-8">Source: Invoca Consumer Services Industry Benchmark Report 2026. These are industry averages — not Makr customer results.</p>
          <div className="grid md:grid-cols-2 gap-5 max-w-2xl">
            {STATS.map((s) => (
              <div key={s.stat} className="bg-white border border-brass-light rounded-sm p-6 text-center">
                <div className="font-display font-bold text-4xl text-green-700 mb-2">{s.stat}</div>
                <div className="font-semibold text-ink text-sm mb-2">{s.label}</div>
                <p className="text-ink-light text-xs">{s.detail}</p>
                <p className="text-brass text-xs mt-1">{s.source}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-light mt-4">Industry benchmarks from Invoca 2026. Individual results vary by business size, call volume, and configuration.</p>
        </div>
      </section>
      <section className="py-16 px-6 bg-white border-y border-brass-light">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-ink mb-8">Four levers Makr pulls for personal service businesses</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {LEVERS.map((l) => (
              <div key={l.lever} className="bg-canvas border-l-4 border-green-700 rounded-sm p-6">
                <h3 className="font-semibold text-ink mb-2">{l.lever}</h3>
                <p className="text-ink-mid text-sm">{l.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-canvas">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-ink mb-12">Personal service segments we work with</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SEGMENTS.map((s) => (
              <div key={s.name} className="bg-white border-l-4 border-green-700 rounded-sm p-6">
                <h3 className="font-semibold text-ink mb-2">{s.name}</h3>
                <p className="text-ink-mid text-sm mb-4">{s.problem}</p>
                <ul className="space-y-1">
                  {s.capabilities.map((c) => (
                    <li key={c} className="text-xs text-ink-mid flex items-start gap-2"><span className="text-green-600 mt-0.5 shrink-0">✓</span>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-green-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight max-w-2xl">Find out how many appointments you&apos;re leaving on the table.</h2>
          <p className="mt-6 text-green-200 text-lg max-w-lg">An AI Opportunity Assessment maps your booking flow, follow-up gaps, and reactivation opportunities — and shows you exactly what we&apos;d build.</p>
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link href="/contact" className="bg-white text-green-900 hover:bg-green-50 px-8 py-4 rounded font-bold text-lg transition-colors">Book an AI Opportunity Assessment</Link>
            <span className="text-green-400 text-sm">Complimentary for qualified service businesses.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
