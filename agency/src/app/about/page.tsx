import Link from "next/link";
import Nav from "@/components/Nav";

const GEOGRAPHY = [
  "Greater Boston", "North Shore", "Merrimack Valley",
  "Southern New Hampshire", "MetroWest", "Expanding across New England",
];

export default function AboutPage() {
  return (
    <>
      <Nav activePath="/about" />

      <main className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">

          <div className="mb-12">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-3">About</p>
            <h1 className="text-5xl font-black text-stone-900 mb-6">We make AI work for growing businesses.</h1>
            <p className="text-xl text-stone-500 leading-relaxed mb-6">
              Makr is an AI Revenue Operations company focused on one thing: helping home service businesses capture more revenue and operate more efficiently with practical AI.
            </p>
            <p className="text-stone-500 leading-relaxed">
              We don&apos;t sell AI. We don&apos;t sell software. We don&apos;t sell marketing. We deploy AI across your business to help you grow — and we measure success in revenue, not features.
            </p>
          </div>

          {/* Local positioning — prominent */}
          <div className="bg-green-900 rounded-2xl p-8 md:p-10 mb-12">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="text-4xl">📍</div>
              <div>
                <h2 className="text-2xl font-black text-white mb-3">Built in New England</h2>
                <p className="text-green-200 leading-relaxed mb-4">
                  We&apos;re not a remote SaaS vendor. We&apos;re a local company serving contractors across Massachusetts, New Hampshire, and beyond. We know the market, the seasons, and the customers you&apos;re trying to reach.
                </p>
                <p className="text-green-300 text-sm font-semibold">Local matters. Relationships matter.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {GEOGRAPHY.map((g) => (
                    <span key={g} className="px-3 py-1 bg-green-800 border border-green-700 rounded-full text-green-200 text-xs font-medium">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-4">Our brand promise</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                <strong>Makr helps home service businesses capture more revenue and operate more efficiently with practical AI.</strong>
              </p>
              <p className="text-stone-500 text-sm leading-relaxed">
                AI isn&apos;t magic. It&apos;s a tool. We focus on the specific applications that produce measurable, immediate impact for home service businesses.
              </p>
            </div>
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-4">Our philosophy</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                <strong>Business outcomes first. Technology second.</strong>
              </p>
              <p className="text-stone-500 text-sm leading-relaxed">
                Every capability we deploy maps to a measurable business outcome — more leads captured, more jobs booked, fewer hours wasted. If it doesn&apos;t move a number, we don&apos;t add it.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-black text-stone-900 mb-4">The four pillars</h2>
            <p className="text-stone-500 mb-6">Every capability Makr deploys fits into one of four pillars. This keeps the platform focused while allowing it to grow with your business.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Capture", desc: "Never miss an opportunity" },
                { name: "Book", desc: "Convert leads into jobs" },
                { name: "Operate", desc: "Eliminate office work" },
                { name: "Grow", desc: "Build a growth engine" },
              ].map((p) => (
                <div key={p.name} className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
                  <p className="font-black text-green-800 text-lg mb-1">{p.name}</p>
                  <p className="text-stone-500 text-xs">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-black text-stone-900 mb-3">Ready to work together?</h2>
            <p className="text-stone-500 text-lg mb-6 max-w-xl mx-auto">
              Book a free revenue assessment and we&apos;ll show you exactly where your business is leaving money on the table.
            </p>
            <Link href="/contact" className="inline-block px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-lg rounded-xl transition">
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
