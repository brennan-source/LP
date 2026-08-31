import Link from "next/link";
import Nav from "@/components/Nav";

export default function InsightsPage() {
  return (
    <>
      <Nav activePath="/insights" />

      <main className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-3">Insights</p>
            <h1 className="text-5xl font-black text-stone-900 mb-5">Practical AI for service businesses.</h1>
            <p className="text-stone-500 text-xl leading-relaxed max-w-2xl">
              Guides, frameworks, and analysis on how service businesses can use AI to grow revenue and run more efficiently. No hype, no jargon.
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200 border-dashed rounded-2xl p-12 text-center mb-12">
            <p className="text-stone-400 font-semibold mb-2">Coming soon</p>
            <p className="text-stone-400 text-sm max-w-md mx-auto">
              We’re building out our library of practical AI content for service businesses. Sign up to be notified when we publish.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-6 px-6 py-3 bg-green-700 hover:bg-green-600 text-white rounded-xl font-semibold transition text-sm"
            >
              Get Notified
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "How to identify your highest-value AI opportunities", category: "Strategy" },
              { title: "The service business revenue funnel: where AI creates real impact", category: "Revenue" },
              { title: "Moving from AI tools to AI systems: what the difference means for your business", category: "Operations" },
            ].map((t) => (
              <div key={t.title} className="bg-stone-50 border border-stone-100 rounded-2xl p-6">
                <p className="text-green-700 text-xs font-bold uppercase tracking-widest mb-2">{t.category}</p>
                <p className="text-stone-700 font-semibold text-sm leading-snug">{t.title}</p>
                <p className="text-stone-400 text-xs mt-3">Coming soon</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200 py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-stone-400 text-sm">
          <span className="font-black text-green-800">Makr<span className="text-stone-400 font-medium">.ai</span></span>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/services" className="hover:text-stone-700 transition">Solutions</Link>
            <Link href="/industries" className="hover:text-stone-700 transition">Industries</Link>
            <Link href="/how-it-works" className="hover:text-stone-700 transition">How It Works</Link>
            <Link href="/pricing" className="hover:text-stone-700 transition">Pricing</Link>
            <Link href="/about" className="hover:text-stone-700 transition">About</Link>
            <Link href="/insights" className="hover:text-stone-700 transition">Insights</Link>
            <Link href="/contact" className="hover:text-stone-700 transition">Contact</Link>
          </div>
          <span>© {new Date().getFullYear()} Makr.ai. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
