import Link from "next/link";

const INDUSTRIES = [
  "HVAC", "Plumbing", "Roofing", "Electrical", "Pest Control",
  "Garage Door", "Landscaping", "Painting", "Pool Service",
  "Pressure Washing", "Handyman", "Cleaning Service",
];

const REVENUE_ENGINE = [
  {
    icon: "📞",
    title: "Every call answered",
    description: "Our AI voice agent answers 24/7, qualifies the lead, and books the appointment — even while you're on a job. No more missed calls, no more lost revenue.",
  },
  {
    icon: "📅",
    title: "Every job booked",
    description: "Automated confirmations, reminders, and no-show follow-up. Zero leads lost to slow response. The job is locked in before you hang up.",
  },
  {
    icon: "💵",
    title: "Get paid faster",
    description: "Automated quotes, invoices, and payment collection sent the moment the job is done. Stop chasing customers for money you already earned.",
  },
  {
    icon: "⭐",
    title: "Reviews on autopilot",
    description: "Post-job review requests go out automatically. Your Google rating climbs without you lifting a finger. More reviews, more trust, more calls.",
  },
  {
    icon: "📍",
    title: "Stay #1 on Google",
    description: "Local SEO, Google Business Profile management, and monthly content — so you're the first result when someone in your area needs a contractor.",
  },
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
            Home service businesses lose an average of $50,000 a year to missed calls and slow follow-up. We answer every call, book every job, and automate everything after.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/growth-score"
              className="px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-lg rounded-xl transition shadow-lg shadow-green-900/20"
            >
              Get Your Free Growth Score
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white hover:bg-stone-50 text-stone-800 font-medium text-lg rounded-xl border border-stone-300 transition"
            >
              See Pricing
            </Link>
          </div>
          <p className="text-stone-400 text-sm mt-4">Free assessment. No commitment. See exactly what you&apos;re losing.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["Every Call Answered", "Results in 30 Days", "No Setup Fee"].map((chip) => (
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
            { stat: "62%", label: "of home service calls go unanswered", implication: "Missed calls = missed revenue" },
            { stat: "78%", label: "of customers hire the first to respond", implication: "Speed wins the job" },
            { stat: "$50K", label: "avg. annual revenue lost to missed calls", implication: "One fix pays for itself" },
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
          <p className="text-center text-stone-900 font-bold text-base mb-1">Built for home service businesses</p>
          <p className="text-center text-stone-400 text-sm mb-6">The trades where one missed call costs $500–$5,000.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((ind) => (
              <span key={ind} className="px-4 py-2 bg-white border border-stone-200 rounded-full text-stone-600 text-sm shadow-sm">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue engine */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">How it works</p>
            <h2 className="text-4xl font-black text-stone-900">One call. One engine. More revenue.</h2>
            <p className="text-stone-500 mt-3 max-w-xl mx-auto">Every service we build connects to a single goal: turn more calls into booked, paid, reviewed jobs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVENUE_ENGINE.map((step) => (
              <div key={step.title} className="bg-white border border-stone-200 rounded-2xl p-8 hover:border-green-300 hover:shadow-md transition shadow-sm">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">{step.title}</h3>
                <p className="text-stone-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="text-green-700 hover:text-green-600 font-medium transition">
              See everything we do →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works — steps */}
      <section className="py-24 px-6 bg-green-900 border-y border-green-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">From first call to fully automated</h2>
            <p className="text-green-200 text-lg">We do the work. You do the jobs.</p>
          </div>
          <div className="space-y-8">
            {[
              { step: "01", title: "A call comes in — we answer it", body: "Our AI receptionist picks up 24/7, asks the right questions, and books the job. You stop losing work to voicemail." },
              { step: "02", title: "The job gets confirmed automatically", body: "Automated confirmations, reminders, and follow-ups go out. No-shows drop. Your schedule fills." },
              { step: "03", title: "You get paid without chasing", body: "Quotes go out the moment the job is done. Invoice reminders run on autopilot. Payment lands in your account." },
              { step: "04", title: "Your reputation grows while you sleep", body: "Post-job review requests, Google Business Profile management, and local SEO compound month after month." },
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
          <h2 className="text-4xl font-black text-stone-900 mb-4">Find out what you&apos;re losing</h2>
          <p className="text-stone-500 text-lg mb-4">Our free AI Growth Score audits your business and tells you exactly how much revenue you&apos;re leaving on the table — and how to fix it.</p>
          <p className="text-stone-400 text-sm mb-8">Free. No commitment. Results in minutes.</p>
          <Link
            href="/growth-score"
            className="inline-block px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-lg rounded-xl transition shadow-lg shadow-green-900/20"
          >
            Get Your Free Growth Score
          </Link>
          <p className="text-stone-400 text-xs mt-4">Or <Link href="/contact" className="underline underline-offset-2 hover:text-stone-600 transition">talk to us directly</Link> — 24-hr response, no setup fee.</p>
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
