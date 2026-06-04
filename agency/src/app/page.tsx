import Link from "next/link";

const SERVICES = [
  {
    icon: "🌐",
    title: "Free Website",
    description: "We build you a professional site — yours free for the first 4 months while we prove we can grow your business.",
  },
  {
    icon: "📍",
    title: "Local SEO",
    description: "Rank higher on Google Maps and local search. Your customers are looking — we make sure they find you.",
  },
  {
    icon: "📣",
    title: "Google Ads",
    description: "We manage your ad spend so every dollar works harder. No wasted budget, no guesswork.",
  },
  {
    icon: "🤖",
    title: "AI Automation",
    description: "Automated booking, follow-up, and lead capture. Work fewer hours and close more jobs.",
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
          <Link href="/contact" className="md:hidden px-3 py-1.5 bg-amber-500 text-slate-900 text-sm rounded-lg">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-900/30 border border-amber-800 rounded-full px-4 py-1.5 text-amber-300 text-sm mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Now serving home service businesses in New England
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6">
            You built your business.<br />
            <span className="text-amber-400">We make it grow.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Makr is a local marketing agency powered by AI. We build your website, run your SEO, manage your ads, and automate your follow-up — so you can focus on the work you&apos;re actually good at.
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
          <p className="text-center text-slate-500 text-sm mb-6">We work with local businesses across New England</p>
          <div className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((ind) => (
              <span key={ind} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-slate-300 text-sm">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Everything your business needs to grow</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">One partner for your website, marketing, and automation. No juggling agencies, freelancers, or software subscriptions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <div key={service.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-600 transition">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.description}</p>
              </div>
            ))}
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
              { step: "04", title: "You own everything", body: "After 4 months, the website is yours free and clear. No hostage websites, no surprise fees." },
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
