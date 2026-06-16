import Link from "next/link";

const GROW = [
  {
    icon: "🎁",
    title: "Free Build — Your Choice",
    description: "Sign up for any plan and pick one free build at no charge: a website, online booking system, voice agent, AI chat widget, first automation, or SEO setup. You choose what your business needs most.",
  },
  {
    icon: "📍",
    title: "Local SEO & Ads",
    description: "PE-backed brands are outranking you on Google. We close that gap — better Maps rankings, smarter ad campaigns, more calls.",
  },
];

const RUN = [
  {
    icon: "📋",
    title: "Quoting & Billing",
    description: "Automated estimates, invoices, and payment collection. Stop chasing customers and losing jobs to slow follow-up.",
  },
  {
    icon: "⚙️",
    title: "Operations & Back Office",
    description: "Scheduling, HR onboarding, payroll workflows, and reporting. Systems that run your business so you don't have to babysit it.",
  },
];

const INDUSTRIES = [
  "HVAC", "Plumbing", "Roofing", "Electrical", "Landscaping",
  "Painting", "Pressure Washing", "Pest Control", "Pool Service", "Handyman",
];

export default function HomePage() {
  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-black text-green-800 tracking-tight">Makr<span className="text-stone-400 font-medium">.ai</span></span>
          <div className="hidden md:flex items-center gap-6 text-sm text-stone-500">
            <Link href="/services" className="hover:text-stone-900 transition">Services</Link>
            <Link href="/pricing" className="hover:text-stone-900 transition">Pricing</Link>
            <Link href="/contact" className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg transition font-medium">Get Started</Link>
          </div>
          <Link href="/contact" className="md:hidden px-3 py-1.5 bg-green-700 text-white text-sm rounded-lg font-medium">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-stone-900 leading-tight tracking-tight mb-6">
            You built your business.<br />
            <span className="text-green-700">We make it grow.</span>
          </h1>
          <p className="text-xl text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            The average home service business loses $50,000 a year to missed calls and slow follow-up — then loses more to slow billing and back-office headaches. We fix both.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-lg rounded-xl transition shadow-lg shadow-green-900/20"
            >
              Claim Your Free Build
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white hover:bg-stone-50 text-stone-800 font-medium text-lg rounded-xl border border-stone-300 transition"
            >
              See Pricing
            </Link>
          </div>
          <p className="text-stone-400 text-sm mt-4">No setup fee. 4-month agreement. Cancel with 30 days notice after.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["Results in 30 Days", "No Contracts", "Transparent pricing"].map((chip) => (
              <span key={chip} className="px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-800 text-sm font-medium">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-16 px-6 bg-green-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { stat: "62%", label: "of contractor calls go unanswered", implication: "Missed calls = missed jobs" },
            { stat: "78%", label: "of customers hire the first to respond", implication: "Speed wins the job" },
            { stat: "1 in 3", label: "owners have time to do their own marketing", implication: "That's why we exist" },
          ].map((s) => (
            <div key={s.stat}>
              <p className="text-5xl font-black text-white mb-2">{s.stat}</p>
              <p className="text-green-200 text-sm mb-1">{s.label}</p>
              <p className="text-green-400 text-xs font-semibold uppercase tracking-widest">{s.implication}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="py-12 px-6 border-y border-stone-200 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-stone-400 text-sm mb-6">We work with home service businesses nationwide</p>
          <div className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((ind) => (
              <span key={ind} className="px-4 py-2 bg-white border border-stone-200 rounded-full text-stone-600 text-sm shadow-sm">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services — two value props */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Get more jobs */}
          <div className="mb-16">
            <div className="mb-8">
              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">Get more jobs</p>
              <h2 className="text-3xl font-black text-stone-900">More calls. More booked work.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GROW.map((service) => (
                <div key={service.title} className="bg-white border border-stone-200 rounded-2xl p-8 hover:border-green-300 hover:shadow-md transition shadow-sm">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{service.title}</h3>
                  <p className="text-stone-500 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Run your business */}
          <div>
            <div className="mb-8">
              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">Run your business</p>
              <h2 className="text-3xl font-black text-stone-900">Less chaos. More margin.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RUN.map((service) => (
                <div key={service.title} className="bg-white border border-stone-200 rounded-2xl p-8 hover:border-green-300 hover:shadow-md transition shadow-sm">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{service.title}</h3>
                  <p className="text-stone-500 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="text-green-700 hover:text-green-600 font-medium transition">
              See everything we do →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-green-900 border-y border-green-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">How it works</h2>
            <p className="text-green-200 text-lg">We do the work. You do the jobs.</p>
          </div>
          <div className="space-y-8">
            {[
              { step: "01", title: "You pick a free build — we deliver it", body: "Choose what your business needs most: a website, booking system, voice agent, AI chat, or first automation. Included with any plan, no setup fee." },
              { step: "02", title: "We get to work immediately", body: "From day one, Makr.ai runs your SEO, manages your Google Business Profile, and publishes content. Your plan starts, results start." },
              { step: "03", title: "You own your build after month 4", body: "After your 4-month agreement, everything we built is yours free and clear. Continue month-to-month or cancel with 30 days notice." },
              { step: "04", title: "We help you build the back end", body: "Once the leads are flowing, we build the systems — quoting, billing, scheduling, HR — so growth doesn't create new headaches." },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-green-800 border border-green-700 rounded-xl flex items-center justify-center text-green-300 font-black text-sm">{step}</div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
                  <p className="text-green-200">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-stone-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-stone-900 mb-4">Ready to claim your free build?</h2>
          <p className="text-stone-500 text-lg mb-4">Tell us about your business and we&apos;ll put together a free demo — no commitment, no setup fee.</p>
          <p className="text-stone-400 text-sm mb-8">24-hr response. No setup fee. No Contracts.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-lg rounded-xl transition shadow-lg shadow-green-900/20"
          >
            Claim Your Free Build
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-stone-400 text-sm">
          <span className="font-black text-green-800">Makr<span className="text-stone-400 font-medium">.ai</span></span>
          <div className="flex gap-6">
            <Link href="/services" className="hover:text-stone-700 transition">Services</Link>
            <Link href="/pricing" className="hover:text-stone-700 transition">Pricing</Link>
            <Link href="/contact" className="hover:text-stone-700 transition">Contact</Link>
          </div>
          <span>© {new Date().getFullYear()} Makr.ai. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
