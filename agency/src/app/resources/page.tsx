import Link from "next/link";
import Nav from "@/components/Nav";

const WORKSHOPS = [
  "10 Practical Ways Home Service Businesses Can Use AI Today",
  "How to Save 10 Hours of Office Work Every Week with AI",
  "Five Ways Contractors Lose Revenue Every Month — And How to Fix It",
  "AI for Local Businesses: What Actually Works",
  "Stop Missing Calls: A Practical Guide to AI Call Answering",
  "How to Win More Jobs Without Hiring More People",
];

const GUIDES = [
  { title: "The Revenue Leak Problem", desc: "Where home service businesses lose money — and the fastest ways to plug the gaps.", href: "/contact" },
  { title: "AI Buyer's Guide for Contractors", desc: "What to look for, what to avoid, and how to evaluate AI tools for your trade business.", href: "/contact" },
  { title: "ROI Calculator Worksheet", desc: "Estimate how much lost revenue you can recover with AI revenue operations.", href: "/contact" },
];

const CASE_STUDIES = [
  { trade: "HVAC", result: "Captured 40% more after-hours leads in the first 90 days.", status: "coming-soon" },
  { trade: "Plumbing", result: "Reduced office hours by 12/week with billing and scheduling automation.", status: "coming-soon" },
];

export default function ResourcesPage() {
  return (
    <>
      <Nav activePath="/resources" />

      <main className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-3">Resources</p>
            <h1 className="text-5xl font-black text-stone-900 mb-4">Learn before you buy</h1>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              Free workshops, guides, assessments, and events for home service business owners who want to understand AI before committing to anything.
            </p>
          </div>

          {/* AI Readiness Assessment */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 md:p-10 mb-16">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex-1">
                <p className="text-green-700 text-xs font-bold uppercase tracking-widest mb-2">Most requested</p>
                <h2 className="text-2xl font-black text-stone-900 mb-2">AI Readiness Assessment</h2>
                <p className="text-stone-500 leading-relaxed mb-4">
                  A structured audit of your business — where AI can help, how much revenue you&apos;re leaving on the table, and a clear roadmap for what to do first. Educational, not a sales pitch.
                </p>
                <ul className="space-y-1.5">
                  {[
                    "AI maturity score for your business",
                    "Operations efficiency score",
                    "Revenue opportunities identified with estimates",
                    "Automation roadmap — prioritized by ROI",
                    "30-min walkthrough call included",
                  ].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-stone-600">
                      <span className="text-green-600 shrink-0">✓</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0 text-center md:text-right">
                <div className="mb-4">
                  <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">For qualified contractors</p>
                  <p className="text-3xl font-black text-green-700">Free</p>
                  <p className="text-xs text-stone-400 mt-1">For other businesses: $495</p>
                </div>
                <Link href="/contact" className="inline-block px-6 py-3 bg-green-700 hover:bg-green-600 text-white rounded-xl font-semibold transition text-sm">
                  Book Your Assessment
                </Link>
              </div>
            </div>
          </div>

          {/* Case Studies */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-stone-200">
              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-1">Case Studies</p>
              <h2 className="text-2xl font-black text-stone-900">Real results from real contractors</h2>
              <p className="text-stone-500 mt-1 text-sm">Numbers don&apos;t lie. Here&apos;s what Makr has delivered for businesses like yours.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CASE_STUDIES.map((cs) => (
                <div key={cs.trade} className="bg-stone-50 border border-stone-200 border-dashed rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">{cs.trade}</p>
                    <p className="text-stone-500 text-sm italic">{cs.result}</p>
                  </div>
                  <p className="text-xs text-stone-400 mt-4">Full case study coming soon</p>
                </div>
              ))}
            </div>
          </div>

          {/* Workshops */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-stone-200">
              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-1">Workshops</p>
              <h2 className="text-2xl font-black text-stone-900">AI education for business owners</h2>
              <p className="text-stone-500 mt-1 text-sm">Available for chambers of commerce, trade groups, BNI chapters, and private teams.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {WORKSHOPS.map((w) => (
                <div key={w} className="flex items-start gap-3 bg-stone-50 border border-stone-200 rounded-xl p-4">
                  <span className="text-green-600 shrink-0 mt-0.5">📋</span>
                  <p className="text-stone-700 text-sm font-medium">{w}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/contact" className="inline-block px-6 py-3 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-xl font-medium transition text-sm">
                Book a Workshop for Your Group →
              </Link>
            </div>
          </div>

          {/* Lunch & Learns */}
          <div className="mb-16 bg-green-50 border border-green-200 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="text-4xl">🥗</div>
              <div className="flex-1">
                <p className="text-green-700 text-xs font-bold uppercase tracking-widest mb-1">Local events</p>
                <h2 className="text-xl font-black text-stone-900 mb-1">Lunch & Learns</h2>
                <p className="text-stone-500 text-sm leading-relaxed">Join us for a free local Lunch & Learn — a practical, no-pitch session on how AI can help your contracting business. We come to your chamber, association, or office.</p>
              </div>
              <Link href="/contact" className="shrink-0 px-5 py-2.5 bg-green-700 hover:bg-green-600 text-white rounded-xl font-semibold transition text-sm">
                Request an Event
              </Link>
            </div>
          </div>

          {/* Guides */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-stone-200">
              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-1">Guides</p>
              <h2 className="text-2xl font-black text-stone-900">Free resources</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GUIDES.map((g) => (
                <Link key={g.title} href={g.href} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:border-green-300 hover:shadow-md transition flex flex-col">
                  <h3 className="font-bold text-stone-900 mb-2">{g.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed flex-1">{g.desc}</p>
                  <p className="text-green-700 text-sm font-medium mt-4">Download →</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Blog */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-stone-200">
              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-1">Blog</p>
              <h2 className="text-2xl font-black text-stone-900">Practical AI for contractors</h2>
              <p className="text-stone-500 mt-1 text-sm">Guides, frameworks, and strategies — no hype, no jargon.</p>
            </div>
            <div className="bg-stone-50 border border-stone-200 border-dashed rounded-2xl p-10 text-center">
              <p className="text-stone-400 text-sm">Blog posts coming soon. Sign up to be notified when we publish.</p>
              <Link href="/contact" className="inline-block mt-4 px-5 py-2.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-xl font-medium transition text-sm">
                Get Notified
              </Link>
            </div>
          </div>

          {/* Webinars */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Webinars & Recordings</h2>
            <p className="text-stone-500 text-sm max-w-xl mx-auto mb-4">Live webinars and recorded sessions on AI for local businesses — coming soon.</p>
            <Link href="/contact" className="inline-block px-6 py-3 bg-green-700 hover:bg-green-600 text-white rounded-xl font-semibold transition text-sm">
              Get Notified
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
