import Link from "next/link";
import Nav from "@/components/Nav";

const PILLARS = [
  {
    name: "Capture",
    outcome: "Never miss another opportunity.",
    description: "Every call answered, every lead followed up, every after-hours inquiry handled — automatically.",
    features: [
      { icon: "📞", title: "AI Receptionist", body: "Answers every call 24/7. Qualifies the lead, captures the info, keeps the customer engaged." },
      { icon: "💬", title: "Missed-Call Recovery", body: "Missed a call? An automated text goes out within seconds so the lead doesn't go cold." },
      { icon: "🌐", title: "Web Chat", body: "Capture website visitors who aren't ready to call. Qualify and route them automatically." },
      { icon: "✅", title: "Lead Qualification", body: "Every lead pre-screened by job type, location, urgency, and budget before it reaches you." },
      { icon: "📱", title: "SMS Follow-Up", body: "Automated texts keep leads warm between first contact and booking." },
      { icon: "🌙", title: "After-Hours & Emergency", body: "After-hours calls handled. Emergency jobs routed immediately. No lead left behind." },
    ],
  },
  {
    name: "Book",
    outcome: "Convert more leads into booked jobs.",
    description: "From first contact to signed estimate — streamlined, automated, and connected to your existing systems.",
    features: [
      { icon: "📅", title: "Appointment Booking", body: "Leads book directly into your calendar. No phone tag, no double-booking." },
      { icon: "🔗", title: "CRM Integration", body: "Works with ServiceTitan, Housecall Pro, Jobber, and other field service platforms." },
      { icon: "🗓️", title: "Calendar Automation", body: "Schedule confirmations, reminders, and updates handled without staff involvement." },
      { icon: "📝", title: "Estimate Follow-Up", body: "Quotes sent. No response? Automated reminders follow up until the job is won or lost." },
      { icon: "⭐", title: "Review Requests", body: "Post-job review requests sent automatically. Your Google rating grows without lifting a finger." },
      { icon: "📍", title: "Google Business Profile Optimization", body: "More visibility in local search where your customers are already looking." },
    ],
  },
  {
    name: "Operate",
    outcome: "Run a more efficient business.",
    description: "Replace hours of manual office work with AI systems that handle the administrative side of your business.",
    features: [
      { icon: "💳", title: "Billing Automation", body: "Invoices generated, sent, and followed up on automatically. Get paid faster." },
      { icon: "🗂️", title: "Scheduling Workflows", body: "Dispatch, routing, and scheduling logic handled without constant back-office intervention." },
      { icon: "📄", title: "Document Processing", body: "Contracts, permits, and paperwork processed and filed automatically." },
      { icon: "🤖", title: "Knowledge Assistant", body: "An AI that knows your business — answers team questions, finds info, reduces interruptions." },
      { icon: "📊", title: "Reporting", body: "Know what's working. Revenue, leads, jobs, response times — clear and actionable." },
      { icon: "⚙️", title: "Back-Office Automation", body: "Custom workflows that eliminate repetitive tasks specific to how your business runs." },
    ],
  },
  {
    name: "Grow",
    outcome: "Create a predictable growth engine.",
    description: "Long-term systems that turn satisfied customers into repeat business and referrals — automatically.",
    features: [
      { icon: "📣", title: "Marketing Automation", body: "Targeted campaigns that reach the right customers at the right time — without a marketing team." },
      { icon: "🔔", title: "Customer Reactivation", body: "Win back past customers with outreach tied to seasonal demand and service intervals." },
      { icon: "📈", title: "AI Reporting", body: "Understand your revenue, lead sources, and growth trends at a glance." },
      { icon: "🎯", title: "Growth Dashboards", body: "A clear view of your business performance — updated automatically." },
      { icon: "📆", title: "Quarterly Strategy", body: "Regular optimization sessions to review performance and expand what's working." },
      { icon: "🔁", title: "Continuous Improvement", body: "Your AI systems get better over time as we learn what works for your business." },
    ],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Nav activePath="/services" />

      <main className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-3">Solutions</p>
            <h1 className="text-5xl font-black text-stone-900 mb-4">One platform. Four ways to grow.</h1>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              Every capability Makr deploys maps to one of four pillars — each designed to produce a measurable business outcome.
            </p>
          </div>

          {/* Pillar nav */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {PILLARS.map((p) => (
              <a key={p.name} href={`#${p.name.toLowerCase()}`} className="px-5 py-2 bg-stone-50 border border-stone-200 hover:border-green-400 hover:bg-green-50 rounded-full text-stone-700 text-sm font-semibold transition">
                {p.name}
              </a>
            ))}
          </div>

          {PILLARS.map((pillar, idx) => (
            <div key={pillar.name} id={pillar.name.toLowerCase()} className={`mb-20 ${idx > 0 ? "pt-4" : ""}`}>
              <div className="mb-8 pb-5 border-b border-stone-200">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                  <div>
                    <p className="text-green-700 text-xs font-bold uppercase tracking-widest mb-1">Pillar {idx + 1}</p>
                    <h2 className="text-3xl font-black text-stone-900">{pillar.name}</h2>
                    <p className="text-green-700 font-semibold mt-1">{pillar.outcome}</p>
                    <p className="text-stone-500 text-sm mt-2 max-w-xl">{pillar.description}</p>
                  </div>
                  <Link href="/pricing" className="text-sm text-green-700 font-medium hover:text-green-600 transition shrink-0">
                    See pricing →
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {pillar.features.map((f) => (
                  <div key={f.title} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:border-green-300 hover:shadow-md transition">
                    <div className="text-3xl mb-3">{f.icon}</div>
                    <h3 className="font-bold text-stone-900 mb-2">{f.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{f.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-green-900 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-black text-white mb-3">Not sure where to start?</h2>
            <p className="text-green-200 text-lg mb-6 max-w-xl mx-auto">
              Book a free revenue assessment and we&apos;ll identify exactly which capabilities will have the biggest impact on your business.
            </p>
            <Link href="/contact" className="inline-block px-8 py-4 bg-white hover:bg-green-50 text-green-900 font-bold text-lg rounded-xl transition">
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
