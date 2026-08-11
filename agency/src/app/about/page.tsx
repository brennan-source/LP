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

          <div className="mb-16">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-3">About</p>
            <h1 className="text-5xl font-black text-stone-900 mb-6">We make AI work for growing businesses.</h1>
            <p className="text-xl text-stone-500 leading-relaxed mb-6">
              Makr is an AI software and services company focused on one thing: helping home service businesses capture more revenue through practical AI.
            </p>
            <p className="text-stone-500 leading-relaxed">
              We&apos;re not an AI agency. We&apos;re not a digital marketing firm. We&apos;re the AI partner for contractors who want more calls answered, more jobs booked, and more revenue — without hiring more people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-4">Our brand promise</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                <strong>Makr helps businesses grow by making AI practical.</strong>
              </p>
              <p className="text-stone-500 text-sm leading-relaxed">
                AI isn&apos;t magic. It&apos;s a tool. We focus on the specific applications that have measurable, immediate impact for home service businesses — starting with the phone.
              </p>
            </div>
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-4">Our market position</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                <strong>We help home service businesses capture more revenue through practical AI.</strong>
              </p>
              <p className="text-stone-500 text-sm leading-relaxed">
                We start with the phone — the single biggest revenue leak in home services — and expand from there into booking, billing, reviews, and back-office automation.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-black text-stone-900 mb-6">Where we work</h2>
            <p className="text-stone-500 mb-6">We currently serve home service businesses across Greater Boston and New England, with plans to expand nationally.</p>
            <div className="flex flex-wrap gap-3">
              {GEOGRAPHY.map((g) => (
                <span key={g} className="px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-800 text-sm font-medium">
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-green-900 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-black text-white mb-3">Ready to work together?</h2>
            <p className="text-green-200 text-lg mb-6 max-w-xl mx-auto">
              Book a free revenue assessment and we&apos;ll show you exactly what AI can do for your business.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white hover:bg-green-50 text-green-900 font-bold text-lg rounded-xl transition"
            >
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
