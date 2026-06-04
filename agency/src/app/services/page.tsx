import Link from "next/link";

const GROWTH_SERVICES = [
  {
    icon: "🌐",
    title: "Website Design & Hosting",
    tagline: "Free for the first 4 months",
    body: "We build a professional, mobile-optimized website — fast, beautiful, and easy to update. You own it after month 4. Hosting included.",
    bullets: ["Custom design", "Mobile-first", "Fast loading", "Contact forms", "Google Analytics"],
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-amber-400 tracking-tight">Makr</Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <Link href="/services" className="text-white">Services</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="/contact" className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg transition font-medium">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-white mb-4">What we do</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Two problems, one partner. We get you more jobs — then build the systems so you can actually handle them.
            </p>
          </div>

          {/* Growth services */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-slate-800">
              <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-1">Get more jobs</p>
              <h2 className="text-2xl font-black text-white">Marketing & Growth</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {GROWTH_SERVICES.map((service) => (
                <div key={service.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h2 className="text-xl font-bold text-white mb-1">{service.title}</h2>
                  <p className="text-amber-400 text-sm font-medium mb-3">{service.tagline}</p>
                  <p className="text-slate-400 mb-4 leading-relaxed">{service.body}</p>
                  <ul className="space-y-1.5">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="text-green-400 shrink-0">✓</span>
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
            <div className="mb-8 pb-4 border-b border-slate-800">
              <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-1">Run your business</p>
              <h2 className="text-2xl font-black text-white">Operations & Automation</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {OPS_SERVICES.map((service) => (
                <div key={service.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h2 className="text-xl font-bold text-white mb-1">{service.title}</h2>
                  <p className="text-amber-400 text-sm font-medium mb-3">{service.tagline}</p>
                  <p className="text-slate-400 mb-4 leading-relaxed">{service.body}</p>
                  <ul className="space-y-1.5">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="text-green-400 shrink-0">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/pricing" className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition">
              See Pricing
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
