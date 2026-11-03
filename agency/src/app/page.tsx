import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import IndustrySwitcher from "@/components/IndustrySwitcher";
import SelfCheck from "@/components/SelfCheck";
import { CtaBand, SectionIntro } from "@/components/sections";
import { OWNER_LINES, PROMISES, SOLUTIONS } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Makr — Win More Work. Waste Less Time." },
  description:
    "Makr helps owner-led practices, firms, trades and manufacturers get found on Google and in AI search, answer every lead fast and take manual work off their teams.",
  alternates: { canonical: "/" },
};

const SERVICE_LABEL: Record<string, string> = {
  websites: "Websites",
  "search-content": "Search & content",
  "revenue-recovery": "Follow-up",
  "ai-workflows": "Workflows",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav activePath="/" />

      {/* Hero */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[5fr_6fr] gap-12 lg:gap-14 items-center">
          <div className="min-w-0">
            <p className="eyebrow">For practices, firms, trades and shops</p>
            <h1 className="mt-4 font-display font-extrabold uppercase text-[clamp(3rem,5vw,4.9rem)] leading-[0.92] tracking-tight">
              <span className="block sm:whitespace-nowrap">Win more work.</span>
              <span className="block sm:whitespace-nowrap text-green-700">Waste less time.</span>
            </h1>
            <p className="mt-6 text-lg text-ink-mid max-w-xl">
              Be the business customers find first, answer every lead fast, and take the manual work off your team.
              Makr builds the websites, search visibility, follow-up and AI workflows that make it happen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5 items-center">
              <Link href="/contact" data-cta="home-hero-primary" className="bg-green-700 hover:bg-green-800 text-white px-6 py-3.5 rounded-md font-bold transition-colors">
                Find Your Growth Gaps
              </Link>
              <Link href="/pricing" data-cta="home-hero-pricing" className="bg-white border border-brass-light hover:border-brass text-ink px-6 py-3.5 rounded-md font-semibold transition-colors">
                See pricing
              </Link>
            </div>
          </div>
          <IndustrySwitcher />
        </div>
      </section>

      {/* Owner types */}
      <section className="py-20 px-6 bg-green-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl leading-[0.95] max-w-3xl text-balance">
            You&apos;re great at the work. We handle getting more of it.
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-green-800 border border-green-800">
            {OWNER_LINES.map((o) => (
              <div key={o.label} className="bg-green-900 p-6 flex flex-col">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#E2C49C]">{o.label}</p>
                <p className="mt-2 text-green-100 flex-1">{o.body}</p>
                <Link href={o.href} className="mt-4 text-sm font-semibold text-white underline underline-offset-4 decoration-copper-bright hover:decoration-white">
                  {o.link} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-check */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[5fr_6fr] gap-12 items-start">
          <div className="min-w-0">
            <SectionIntro
              eyebrow="Quick self-check"
              title="How many of these sound like you?"
              intro="Tick what applies. Each answer points to the service that fixes it, and your Growth Gap Review starts from there."
            />
          </div>
          <SelfCheck />
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 bg-white border-y border-brass-light">
        <div className="max-w-6xl mx-auto">
          <SectionIntro eyebrow="What we do" title="Four services. One accountable partner." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOLUTIONS.map((s) => (
              <Link
                key={s.id}
                href={`/solutions#${s.id}`}
                className="group bg-white border border-brass-light border-t-[3px] border-t-copper-bright rounded-xl p-6 flex flex-col hover:shadow-showcase transition-shadow"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-copper">{s.number} · {SERVICE_LABEL[s.id]}</span>
                <h3 className="mt-2 font-display font-extrabold uppercase text-2xl leading-none text-ink">{s.headline}</h3>
                <p className="mt-3 text-sm text-ink-mid flex-1">{s.summary}</p>
                <span className="mt-4 text-sm font-semibold text-green-700 group-hover:text-green-800">{s.name} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl leading-[0.95] max-w-3xl text-balance">
            How we&apos;re different from the agency that burned you.
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 border-t-[3px] border-copper-bright">
            {PROMISES.map((p) => (
              <div key={p.title} className="pt-5 pr-6 pb-2">
                <h3 className="font-semibold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm text-ink-mid">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder note */}
      <section className="py-20 px-6 bg-white border-y border-brass-light">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow">A note from the founder</p>
          <div className="mt-5 space-y-4 text-xl md:text-2xl leading-relaxed text-ink text-pretty">
            <p>
              I spent 13 years helping manufacturers, financial firms, biotech companies and universities explain what they
              do. The pattern was always the same: people who were great at their work, stretched thin by everything
              around it.
            </p>
            <p>
              Calls missed while everyone was busy. A website nobody had time to fix. Good quotes that went quiet. I started
              Makr to take that off owners&apos; plates, and I answer for every project myself.
            </p>
          </div>
          <p className="mt-6 text-ink-mid">
            <span className="font-semibold text-ink">Brennan Burks</span>, founder · Westford, Massachusetts
          </p>
          <Link href="/about" className="mt-4 inline-block font-semibold text-green-700 hover:text-green-800">About Makr →</Link>
        </div>
      </section>

      <CtaBand name="home-bottom" />
      <Footer />
    </div>
  );
}
