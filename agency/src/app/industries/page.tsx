import Link from "next/link";
import Nav from "@/components/Nav";

const INDUSTRIES = [
  {
    icon: "🌡️",
    name: "HVAC",
    hook: "Every emergency call answered, day or night",
    bullets: [
      "Emergency calls answered 24/7 — even at 2am",
      "Seasonal demand handled without extra staff",
      "Qualify jobs before dispatching a tech",
      "Automated follow-up on estimates",
    ],
  },
  {
    icon: "🔧",
    name: "Plumbing",
    hook: "Capture urgent calls before they call the next plumber",
    bullets: [
      "Urgent and emergency calls answered immediately",
      "Lead qualification by job type and location",
      "After-hours booking without an answering service",
      "Automated review requests after each job",
    ],
  },
  {
    icon: "🏠",
    name: "Roofing",
    hook: "Qualify storm leads fast and book estimates automatically",
    bullets: [
      "Storm surge call volume handled automatically",
      "Insurance vs. cash-pay lead qualification",
      "Estimate appointments booked on the call",
      "Follow-up sequences for unbooked estimates",
    ],
  },
  {
    icon: "⚡",
    name: "Electrical",
    hook: "Never lose a job because your line was busy",
    bullets: [
      "Residential and commercial calls handled",
      "Safety-first qualification for urgent jobs",
      "Appointment booking by service area",
      "Callback summaries sent after every call",
    ],
  },
  {
    icon: "🌿",
    name: "Landscaping",
    hook: "Book seasonal work before competitors pick up the phone",
    bullets: [
      "Seasonal inquiry handling at scale",
      "Estimate appointments booked on first contact",
      "Recurring service scheduling automated",
      "Customer reactivation for spring/fall cleanups",
    ],
  },
  {
    icon: "🐛",
    name: "Pest Control",
    hook: "Respond to urgent calls faster than any human could",
    bullets: [
      "Immediate response to infestation calls",
      "Service area and job-type qualification",
      "Recurring plan upsell built into the script",
      "Automated follow-up for booked appointments",
    ],
  },
  {
    icon: "🚪",
    name: "Garage Door",
    hook: "Turn emergency calls into same-day booked jobs",
    bullets: [
      "Emergency repair calls answered 24/7",
      "Same-day appointment booking",
      "Parts and availability questions handled",
      "Estimate follow-up for replacement jobs",
    ],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <Nav activePath="/industries" />

      <main className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-3">Industries</p>
            <h1 className="text-5xl font-black text-stone-900 mb-4">Built for the trades that run on phone calls</h1>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              Home service businesses live and die by the phone. We make sure yours never goes unanswered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm hover:border-green-300 hover:shadow-md transition flex flex-col">
                <div className="text-4xl mb-4">{ind.icon}</div>
                <h2 className="text-xl font-bold text-stone-900 mb-1">{ind.name}</h2>
                <p className="text-green-700 text-sm font-medium mb-4">{ind.hook}</p>
                <ul className="space-y-2 flex-1 mb-6">
                  {ind.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-stone-600">
                      <span className="text-green-600 shrink-0 mt-0.5">✓</span>{b}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block text-center py-2.5 border border-green-700 text-green-700 hover:bg-green-700 hover:text-white rounded-xl text-sm font-semibold transition"
                >
                  Book a Demo →
                </Link>
              </div>
            ))}
          </div>

          <div className="bg-green-900 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-black text-white mb-3">Don&apos;t see your trade?</h2>
            <p className="text-green-200 text-lg mb-6 max-w-xl mx-auto">
              If your business runs on phone calls and booked appointments, Makr can help. Reach out and we&apos;ll tell you exactly how.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white hover:bg-green-50 text-green-900 font-bold text-lg rounded-xl transition"
            >
              Book a Revenue Assessment
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
