import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const CATEGORIES = [
  { icon: "🌐", name: "Website", desc: "Speed, mobile experience, conversion elements" },
  { icon: "🔍", name: "SEO", desc: "Local search rankings vs. your competitors" },
  { icon: "📍", name: "Digital Footprint", desc: "Google Business Profile, directories, reviews" },
  { icon: "📱", name: "Social Media", desc: "Presence across Facebook, Instagram, LinkedIn & more" },
  { icon: "☎️", name: "Lead Capture", desc: "Phone, chat, booking, and follow-up infrastructure" },
  { icon: "🎯", name: "Paid Advertising", desc: "Google & Meta ad presence vs. local competitors" },
  { icon: "🤖", name: "AI Search", desc: "Visibility in ChatGPT, Perplexity, and AI Overviews" },
];

export default function GrowthScorePage() {
  return (
    <>
      <Nav />

      <section className="pt-32 pb-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Free · Takes about 2 minutes
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-stone-900 leading-tight tracking-tight mb-6">
            Find out how many customers<br />
            <span className="text-green-700">your business is losing.</span>
          </h1>
          <p className="text-xl text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            The Makr AI Growth Score scores your website, SEO, Google presence, reviews, lead capture, and AI search visibility — benchmarked against real local competitors — and estimates the revenue you&apos;re leaving on the table.
          </p>
          <Link
            href="/growth-score/start"
            className="inline-block px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-lg rounded-xl transition shadow-lg shadow-green-900/20"
          >
            Get My Free Growth Score
          </Link>
          <p className="text-stone-400 text-sm mt-4">No credit card. No commitment. Delivered instantly.</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-stone-900 mb-3">Your complete Growth Score in 7 categories</h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              We benchmark you against your real local competitors and calculate the revenue you&apos;re leaving on the table in each area, plus a 90-day roadmap to fix it.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 flex items-start gap-4">
                <div className="text-3xl shrink-0">{cat.icon}</div>
                <div>
                  <div className="font-bold text-stone-900 mb-0.5">{cat.name}</div>
                  <div className="text-sm text-stone-500">{cat.desc}</div>
                </div>
              </div>
            ))}
            <div className="bg-green-800 rounded-2xl border border-green-700 p-5 flex items-start gap-4">
              <div className="text-3xl shrink-0">💰</div>
              <div>
                <div className="font-bold text-white mb-0.5">+ Revenue Impact & Roadmap</div>
                <div className="text-sm text-green-200">Estimated monthly loss and a 90-day plan to fix it</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-stone-900 mb-3">How it works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Tell us about your business", desc: "Business name, website, location, and industry. Takes 2 minutes." },
            { step: "2", title: "We run your Growth Score", desc: "We analyze your website, SEO, Google presence, reviews, and ad activity against real local competitors." },
            { step: "3", title: "Get your full report", desc: "Scores in 7 categories, a revenue impact estimate, and a 90-day roadmap — delivered instantly and by email." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-14 h-14 bg-green-700 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-bold text-stone-900 text-lg mb-2">{item.title}</h3>
              <p className="text-stone-500">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/growth-score/start"
            className="inline-block px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-lg rounded-xl transition shadow-lg shadow-green-900/20"
          >
            Get My Free Growth Score
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
