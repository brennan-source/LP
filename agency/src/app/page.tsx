import Link from "next/link";

const GROW = [
  {
    icon: "🌐",
    title: "Free Website",
    description: "We build you a professional site — yours free for the first 4 months while we prove we can grow your business.",
  },
  {
    icon: "📍",
    title: "Local SEO & Ads",
    description: "Rank higher on Google Maps, run smarter ad campaigns. Your customers are looking — we make sure they find you first.",
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-black text-amber-400 tracking-tight">Makr</span>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <Link href="/services" className="hover:text-white transition">Services</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="/contact" className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg transition font-medium">Get Started</Link>
          </div>
          <Link href="/contact" className="md:hidden px-3 py-1.5 bg-amber-500 text-slate-900 text-sm rounded-lg font-medium">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-900/30 border border-amber-800 rounded-full px-4 py-1.5 text-amber-300 text-sm mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Built for home service businesses in New England
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6">
            You built your business.<br />
            <span className="text-amber-400">We make it grow.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Makr is a growth partner for home service businesses. We get you more jobs, then build the systems — quoting, billing, scheduling, operations — so you can actually handle them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition shadow-lg shadow-amber-900/50"
            >
              Get a Free Website
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium text-lg rounded-xl border border-slate-700 transition"
            >
              See Pricing
            </Link>
          </div>
          <p className="text-slate-600 text-sm mt-4">Free for 4 months. No contracts. Cancel anytime after.</p>
        </div>
      </section>

      {/* Industries */}
      <section className="py-12 px-6 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-slate-500 text-sm mb-6">We work with home service businesses across New England</p>
          <div className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((ind) => (
              <span key={ind} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-slate-300 text-sm">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services — two value props */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Get more jobs */}
          <div className="mb-16">
            <div className="mb-8">
              <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">Get more jobs</p>
              <h2 className="text-3xl font-black text-white">More calls. More booked work.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GROW.map((service) => (
                <div key={service.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-600 transition">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Run your business */}
          <div>
            <div className="mb-8">
              <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">Run your business</p>
              <h2 className="text-3xl font-black text-white">Less chaos. More margin.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RUN.map((service) => (
                <div key={service.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-600 transition">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="text-amber-400 hover:text-amber-300 font-medium transition">
              See everything we do →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-slate-900 border-y border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">How it works</h2>
            <p className="text-slate-400 text-lg">We do the work. You do the jobs.</p>
          </div>
          <div className="space-y-8">
            {[
              { step: "01", title: "We build your site free", body: "We design and build a professional website for your business at no cost. You get to see it before committing to anything." },
              { step: "02", title: "We prove we can grow your leads", body: "For the first 4 months, Makr runs your SEO, manages your Google Business Profile, and publishes content — completely free." },
              { step: "03", title: "You decide if it's worth it", body: "After 4 months, if you've seen real results, you continue at $499/month. If not, you walk away — no fee, no hassle." },
              { step: "04", title: "We help you build the back end", body: "Once the leads are flowing, we build the systems — quoting, billing, scheduling, HR — so growth doesn't create new headaches." },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-amber-900/50 border border-amber-800 rounded-xl flex items-center justify-center text-amber-400 font-black text-sm">{step}</div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
                  <p className="text-slate-400">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to see what your new website looks like?</h2>
          <p className="text-slate-400 text-lg mb-8">Fill out the form and we&apos;ll build a demo site for your business — free, no commitment.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition shadow-lg shadow-amber-900/50"
          >
            Get My Free Website
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
          <span className="font-black text-amber-400">Makr</span>
          <div className="flex gap-6">
            <Link href="/services" className="hover:text-slate-300 transition">Services</Link>
            <Link href="/pricing" className="hover:text-slate-300 transition">Pricing</Link>
            <Link href="/contact" className="hover:text-slate-300 transition">Contact</Link>
          </div>
          <span>© {new Date().getFullYear()} Makr. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
