import Link from "next/link";

const GROWTH_SERVICES = [
  {
    icon: "🎁",
    title: "Free Build — Your Choice",
    tagline: "Pick one, no setup fee, included with any plan",
    body: "Sign up for any plan and choose one free build: a professional website, online booking system, voice agent, AI chat widget, first automation, or SEO/GBP setup. We deliver it, you own it after month 4.",
    bullets: ["Professional website", "Online booking system", "AI voice agent", "AI chat widget", "First automation (quotes, invoices, or follow-up)", "Local SEO / GBP optimization"],
  },
  {
    icon: "📍",
    title: "Local SEO",
    tagline: "Get found on Google Maps",
    body: "We optimize your Google Business Profile, build local citations, and publish keyword-targeted content every month. Your competitors are doing this — you should be too.",
    bullets: ["Google Business Profile optimization", "Local keyword targeting", "Monthly blog posts", "Citation building", "Rankings tracking"],
  },
  {
    icon: "📣",
    title: "Google Ads Management",
    tagline: "Every dollar working harder",
    body: "We set up and manage your Google Ads campaigns — no wasted spend, no guesswork. $300 of your ad budget managed in the Growth plan.",
    bullets: ["Campaign setup", "Keyword research", "Ad copywriting", "Bid management", "Monthly reporting"],
  },
  {
    icon: "📱",
    title: "Social & Email",
    tagline: "Stay visible without the work",
    body: "2 social posts per week plus a monthly email newsletter to your customer list. Seasonal promotions, before/after photos, review requests — handled.",
    bullets: ["Content creation", "2 social posts/week", "Monthly email newsletter", "Seasonal promotions", "Review request sequences"],
  },
];

const OPS_SERVICES = [
  {
    icon: "💬",
    title: "Lead & Booking Automation",
    tagline: "Never lose a lead to slow follow-up",
    body: "AI chat widget on your site that answers questions and books appointments 24/7. Automated follow-up sequences so leads don't go cold while you're on a job.",
    bullets: ["AI chat widget", "Automated lead follow-up", "Online booking integration", "Missed call text-back", "CRM setup"],
  },
  {
    icon: "📋",
    title: "Quoting & Billing",
    tagline: "Get paid faster with less friction",
    body: "Automated estimate delivery, invoice follow-up, and payment collection. Stop manually chasing customers — the system does it.",
    bullets: ["Digital quote templates", "Automated invoice reminders", "Online payment collection", "Job approval workflows", "QuickBooks / accounting sync"],
  },
  {
    icon: "📅",
    title: "Scheduling & Dispatch",
    tagline: "Stop playing phone tag with your crew",
    body: "Job scheduling, crew assignments, and dispatch — all automated. Customers get confirmations and reminders. Your team always knows where to be.",
    bullets: ["Online customer scheduling", "Crew job assignments", "Automated confirmations & reminders", "Route optimization", "Field updates via mobile"],
  },
  {
    icon: "🏢",
    title: "Back Office & HR",
    tagline: "Run your business, not paperwork",
    body: "HR onboarding workflows, payroll integrations, time tracking, and reporting dashboards. Built for small teams that don't have an office manager.",
    bullets: ["Employee onboarding automation", "Payroll workflow setup", "Time tracking integration", "Job costing & margin reporting", "Document management"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-green-800 tracking-tight">Makr<span className="text-stone-400 font-medium">.ai</span></Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-stone-500">
            <Link href="/services" className="text-stone-900 font-medium">Services</Link>
            <Link href="/pricing" className="hover:text-stone-900 transition">Pricing</Link>
            <Link href="/contact" className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg transition font-medium">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-stone-900 mb-4">What we do</h1>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              Start with the phone. Every other system we build works better because the call is handled first. One free build included with every plan — you choose what you need most.
            </p>
          </div>

          {/* AI call answering — the wedge */}
          <div className="mb-16 bg-green-50 border border-green-200 rounded-2xl p-8 md:p-10">
            <p className="text-green-700 text-xs font-bold uppercase tracking-widest mb-3">Start here</p>
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="text-5xl shrink-0">📞</div>
              <div>
                <h2 className="text-2xl font-black text-stone-900 mb-1">AI Call Answering & Booking</h2>
                <p className="text-green-700 text-sm font-medium mb-3">Every call answered. Every lead booked. 24/7.</p>
                <p className="text-stone-600 leading-relaxed mb-4">
                  Our AI voice agent answers your phone around the clock, qualifies leads, and books appointments — even while you&apos;re on a job. Most home service businesses miss 1 in 3 calls. We make sure yours gets answered every time.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                  {["AI voice receptionist — 24/7", "Lead qualification & job booking", "Missed call text-back", "Automated confirmations & reminders", "AI chat widget for your website", "CRM setup & lead tracking"].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-stone-600">
                      <span className="text-green-600 shrink-0">✓</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Growth services */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-stone-200">
              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-1">Get more jobs</p>
              <h2 className="text-2xl font-black text-stone-900">Marketing & Growth</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {GROWTH_SERVICES.map((service) => (
                <div key={service.title} className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm hover:border-green-300 hover:shadow-md transition">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h2 className="text-xl font-bold text-stone-900 mb-1">{service.title}</h2>
                  <p className="text-green-700 text-sm font-medium mb-3">{service.tagline}</p>
                  <p className="text-stone-500 mb-4 leading-relaxed">{service.body}</p>
                  <ul className="space-y-1.5">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-stone-600">
                        <span className="text-green-600 shrink-0">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Ops services */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-stone-200">
              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-1">Run your business</p>
              <h2 className="text-2xl font-black text-stone-900">Operations & Automation</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {OPS_SERVICES.map((service) => (
                <div key={service.title} className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm hover:border-green-300 hover:shadow-md transition">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h2 className="text-xl font-bold text-stone-900 mb-1">{service.title}</h2>
                  <p className="text-green-700 text-sm font-medium mb-3">{service.tagline}</p>
                  <p className="text-stone-500 mb-4 leading-relaxed">{service.body}</p>
                  <ul className="space-y-1.5">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-stone-600">
                        <span className="text-green-600 shrink-0">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* AI journey */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-stone-200">
              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-1">The AI path</p>
              <h2 className="text-2xl font-black text-stone-900">From first look to fully automated</h2>
              <p className="text-stone-500 mt-2 text-sm max-w-2xl">Every business is at a different stage. We meet you where you are — from spotting what&apos;s costing you money to building the systems that run your whole business.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
                <p className="text-green-700 text-xs font-bold uppercase tracking-widest mb-3">Stage 1 — Understand</p>
                <h3 className="text-lg font-bold text-stone-900 mb-2">Not sure where to start?</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-3">We&apos;ll tell you exactly what&apos;s costing you money — for free. A quick scan spots your biggest gaps and gives you a clear picture before you spend a dollar.</p>
                <ul className="space-y-1.5">
                  {["Free AI scan", "AI Readiness Assessment", "Workflow audit", "Priority roadmap"].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-stone-600"><span className="text-green-600 shrink-0">✓</span>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
                <p className="text-green-700 text-xs font-bold uppercase tracking-widest mb-3">Stage 2 — Build</p>
                <h3 className="text-lg font-bold text-stone-900 mb-2">Pick one thing to fix first.</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-3">See results in days, not months. We build your first automation, train your team, and prove it works before you commit to more.</p>
                <ul className="space-y-1.5">
                  {["AI Training Workshop", "Quick Win automation build", "Ops Core (quoting, scheduling, payments)", "Back Office (HR, payroll, reporting)"].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-stone-600"><span className="text-green-600 shrink-0">✓</span>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
                <p className="text-green-700 text-xs font-bold uppercase tracking-widest mb-3">Stage 3 — Scale</p>
                <h3 className="text-lg font-bold text-stone-900 mb-2">Ready to run a fully automated business?</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-3">We build the whole stack — quoting, scheduling, payments, HR, payroll, and reporting. Custom dashboards, ERP integrations, and ongoing management so you can focus on growing.</p>
                <ul className="space-y-1.5">
                  {["Custom dashboards & reporting", "Multi-location operations", "ERP & software integrations", "Ongoing AI consulting"].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-stone-600"><span className="text-green-600 shrink-0">✓</span>{b}</li>
                  ))}
                </ul>
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
    </>
  );
}
