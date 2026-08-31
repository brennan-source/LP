import Link from "next/link";
import Nav from "@/components/Nav";

// Evidence: Invoca Consumer Services Industry Benchmark Report 2026
// URL pending verification — see agency/src/lib/evidence.ts

const STATS = [
  {
    stat: "34%",
    label: "Lead rate on answered calls",
    detail: "Roughly 1 in 3 answered calls results in a qualified lead in personal service businesses.",
    source: "Invoca 2026",
  },
  {
    stat: "40%",
    label: "Call-to-appointment conversion",
    detail: "4 in 10 inbound calls result in a booked appointment — with room to improve on both sides.",
    source: "Invoca 2026",
  },
];

const SEGMENTS = [
  {
    name: "Dental",
    icon: "🦷",
    problem: "Appointment slots go unfilled because of no-shows and poor reactivation of lapsed patients.",
    capabilities: ["No-show reduction workflows", "Patient reactivation campaigns", "Appointment reminder automation"],
  },
  {
    name: "Veterinary",
    icon: "🐾",
    problem: "Calls go unanswered during busy clinic hours. Missed calls mean missed appointments and frustrated clients.",
    capabilities: ["Overflow call capture", "Appointment booking automation", "Prescription refill and follow-up workflows"],
  },
  {
    name: "Med Spa & Aesthetics",
    icon: "✨",
    problem: "High-value services require consistent follow-up. Most practices lose clients between treatment cycles.",
    capabilities: ["Treatment follow-up automation", "Client reactivation campaigns", "Booking and rescheduling workflows"],
  },
  {
    name: "Wellness & Therapy",
    icon: "🧘",
    problem: "New client intake is manual and time-consuming. Retention is relationship-driven but easily automated.",
    capabilities: ["Intake form automation", "Session reminder and follow-up", "Referral and review generation"],
  },
  {
    name: "Fitness",
    icon: "💪",
    problem: "Member churn happens quietly. Proactive reactivation and renewal outreach keeps utilization high.",
    capabilities: ["Membership renewal automation", "Attendance-triggered outreach", "Class and appointment booking"],
  },
  {
    name: "Beauty & Salon",
    icon: "💇",
    problem: "Rebooking at checkout is inconsistent. A systematic follow-up system keeps chairs filled.",
    capabilities: ["Post-appointment rebooking prompts", "Lapsed client reactivation", "Review generation automation"],
  },
  {
    name: "Senior Services",
    icon: "🏡",
    problem: "Families researching care options need fast, empathetic responses. Delays lose placement opportunities.",
    capabilities: ["24/7 inquiry intake", "Family communication workflows", "Assessment scheduling automation"],
  },
];

const LEVERS = [
  {
    lever: "Fill more appointment slots",
    detail: "Capture unanswered calls, reduce no-shows with reminders, and reactivate lapsed clients.",
  },
  {
    lever: "Increase retention",
    detail: "Systematic follow-up after visits keeps clients returning on schedule.",
  },
  {
    lever: "Reduce admin burden",
    detail: "Intake, reminders, billing follow-up — automate what doesn't need a human.",
  },
  {
    lever: "Generate more reviews",
    detail: "Ask at the right moment, automatically — and build the online reputation that drives inbound.",
  },
];

export default function PersonalServicesPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Nav />

      {/* Header */}
      <section className="bg-white pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/industries" className="text-sm text-stone-500 hover:text-green-700 transition">
              Industries
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-sm font-semibold text-green-700">Personal Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            Appointment-driven businesses grow when more slots are filled and more clients come back.
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl">
            Makr helps dental practices, veterinary clinics, wellness providers, med spas, fitness studios,
            and beauty businesses capture more appointments, reduce no-shows, and reactivate lapsed clients.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition inline-block"
            >
              Book an AI Opportunity Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-stone-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Industry benchmarks</h2>
          <p className="text-stone-600 mb-8 text-sm">
            Source: Invoca Consumer Services Industry Benchmark Report 2026. These are industry averages — not Makr customer results.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
            {STATS.map((s) => (
              <div key={s.stat} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-4xl font-bold text-green-700 mb-2">{s.stat}</div>
                <div className="font-semibold text-stone-900 text-sm mb-2">{s.label}</div>
                <p className="text-stone-500 text-xs">{s.detail}</p>
                <p className="text-stone-400 text-xs mt-1">{s.source}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-stone-400 mt-4">
            Industry benchmarks from Invoca 2026. Individual results vary by business size, call volume, and configuration.
          </p>
        </div>
      </section>

      {/* Growth levers */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Four levers Makr pulls for personal service businesses</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {LEVERS.map((l) => (
              <div key={l.lever} className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="font-bold text-green-900 mb-2">{l.lever}</h3>
                <p className="text-stone-600 text-sm">{l.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="py-20 px-6 bg-stone-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Personal service segments we work with</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEGMENTS.map((s) => (
              <div key={s.name} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-stone-900 mb-2">{s.name}</h3>
                <p className="text-stone-600 text-sm mb-4">{s.problem}</p>
                <ul className="space-y-1">
                  {s.capabilities.map((c) => (
                    <li key={c} className="text-xs text-stone-600 flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-green-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Find out how many appointments you&apos;re leaving on the table.</h2>
          <p className="text-green-200 mb-8">
            An AI Opportunity Assessment maps your booking flow, follow-up gaps, and reactivation opportunities — and shows you exactly what we&apos;d build.
          </p>
          <Link
            href="/contact"
            className="bg-white text-green-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition inline-block"
          >
            Book an AI Opportunity Assessment
          </Link>
          <p className="text-green-300 text-sm mt-4">Complimentary for qualified service businesses.</p>
        </div>
      </section>
    </div>
  );
}
