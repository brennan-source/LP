import Link from "next/link";
import Nav from "@/components/Nav";

const RECEPTIONIST_FEATURES = [
  { icon: "📞", title: "AI Voice Receptionist", body: "Answers every call 24/7 with a natural, professional voice. Handles after-hours, weekends, and emergencies." },
  { icon: "✅", title: "Lead Qualification", body: "Asks the right questions — job type, location, urgency, budget — so every lead is pre-qualified before you call back." },
  { icon: "📅", title: "Appointment Booking", body: "Books directly into your calendar. No back-and-forth, no double-booking, no manual entry." },
  { icon: "💬", title: "Missed-Call Text-Back", body: "If a call isn't answered, an automated text goes out within seconds to keep the lead warm." },
  { icon: "🔗", title: "CRM & Calendar Integration", body: "Syncs with ServiceTitan, Housecall Pro, Jobber, and other field service platforms." },
  { icon: "📋", title: "Call Summaries", body: "After every call you get a clean summary — what was said, what was booked, what needs follow-up." },
];

const AUTOMATION_FEATURES = [
  { icon: "🔁", title: "Lead Follow-Up", body: "Automated sequences that follow up on unclosed leads. Most booked jobs come from follow-up, not first contact." },
  { icon: "📝", title: "Estimate Follow-Up", body: "Quotes sent. No response? Automated reminders go out until the job is won or lost — not forgotten." },
  { icon: "⭐", title: "Review Automation", body: "Post-job review requests sent automatically. Your Google rating climbs without you lifting a finger." },
  { icon: "🔔", title: "Customer Reactivation", body: "Win back past customers with targeted outreach tied to seasonal demand or service intervals." },
];

export default function SolutionsPage() {
  return (
    <>
      <Nav activePath="/services" />

      <main className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-3">Solutions</p>
            <h1 className="text-5xl font-black text-stone-900 mb-4">Everything starts with the phone</h1>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              Start with call answering. Build from there. Every solution we offer is designed to capture more revenue from the leads you&apos;re already getting.
            </p>
          </div>

          {/* AI Receptionist — primary */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-stone-200 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-1">Core product</p>
                <h2 className="text-3xl font-black text-stone-900">AI Receptionist</h2>
                <p className="text-stone-500 mt-1">Answer every call. Qualify every lead. Book every job.</p>
              </div>
              <Link href="/pricing" className="text-sm text-green-700 font-medium hover:text-green-600 transition shrink-0">
                See pricing →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RECEPTIONIST_FEATURES.map((f) => (
                <div key={f.title} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:border-green-300 hover:shadow-md transition">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-stone-900 mb-2">{f.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Automation */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-stone-200">
              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-1">Grow plan</p>
              <h2 className="text-3xl font-black text-stone-900">Revenue Automation</h2>
              <p className="text-stone-500 mt-1">What happens after the call is answered — and after the job is done.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {AUTOMATION_FEATURES.map((f) => (
                <div key={f.title} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:border-green-300 hover:shadow-md transition">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-stone-900 mb-2">{f.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Readiness Assessment */}
          <div className="mb-16 bg-green-50 border border-green-200 rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex-1">
                <p className="text-green-700 text-xs font-bold uppercase tracking-widest mb-2">Education entry point</p>
                <h2 className="text-2xl font-black text-stone-900 mb-2">AI Readiness Assessment</h2>
                <p className="text-stone-500 leading-relaxed mb-4">
                  Not sure where to start? We&apos;ll audit your operations, identify your biggest gaps, and give you a clear roadmap — before you spend a dollar.
                </p>
                <ul className="space-y-1.5">
                  {["AI maturity score", "Revenue opportunity analysis", "Operations audit", "Automation roadmap", "Priority recommendations"].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-stone-600">
                      <span className="text-green-600 shrink-0">✓</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0">
                <p className="text-2xl font-black text-green-700 mb-1">Free</p>
                <p className="text-stone-400 text-xs mb-4">for qualified contractors</p>
                <Link href="/contact" className="inline-block px-5 py-2.5 bg-green-700 hover:bg-green-600 text-white rounded-xl font-semibold transition text-sm">
                  Book Assessment
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/pricing" className="inline-block px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-lg rounded-xl transition shadow-lg shadow-green-900/20">
              See Pricing
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
