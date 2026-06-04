import Link from "next/link";

const SERVICES = [
  {
    icon: "🌐",
    title: "Website Design & Hosting",
    tagline: "Free for the first 4 months",
    body: "We build a professional, mobile-optimized website on Framer — fast, beautiful, and easy to update. You own it after month 4. Hosting included.",
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
    title: "Social Media",
    tagline: "Stay visible without the work",
    body: "2 posts per week on the platforms that matter for your industry. We handle content creation, scheduling, and community management.",
    bullets: ["Content creation", "2 posts/week", "Facebook, Instagram, or Google Business", "Seasonal promotions", "Review responses"],
  },
  {
    icon: "📧",
    title: "Email Marketing",
    tagline: "Stay top of mind with past customers",
    body: "Monthly newsletter to your customer list — seasonal offers, helpful tips, before/after photos. Turns one-time customers into repeat business.",
    bullets: ["Monthly newsletter", "List management", "Seasonal campaigns", "Review request sequences"],
  },
  {
    icon: "🤖",
    title: "AI Automation",
    tagline: "Work smarter, not harder",
    body: "AI chat widget that books appointments and answers questions 24/7. Automated follow-up for leads who don't respond. CRM setup for managing your pipeline.",
    bullets: ["AI chat widget", "Lead follow-up automation", "Booking integration", "CRM setup", "Monthly automation audit"],
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
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Everything a marketing agency does, powered by AI, at a fraction of the cost.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service) => (
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

          <div className="text-center mt-16">
            <Link href="/pricing" className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition">
              See Pricing
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
