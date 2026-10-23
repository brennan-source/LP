import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CtaBand, IndustryList, ProcessGrid, SectionIntro, SolutionCards } from "@/components/sections";
import { PROBLEMS } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Makr — Websites, Lead Follow-Up & AI Workflows for Growing Businesses" },
  description:
    "Turn missed opportunities and manual work into measurable growth. Makr builds high-performing websites, automated lead follow-up and practical AI workflows for service, manufacturing and B2B businesses.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav activePath="/" />

      {/* Hero */}
      <section className="bg-white pt-28 pb-20 px-6 border-b border-brass-light">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-extrabold text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.95] tracking-tight text-ink text-balance max-w-5xl">
            Turn missed opportunities and manual work into measurable growth.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-ink-mid leading-relaxed max-w-2xl">
            Makr builds high-performing websites, automated lead follow-up and practical AI workflows for growing
            service and manufacturing businesses.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link href="/contact" data-cta="home-hero-primary" className="bg-green-700 hover:bg-green-800 text-white px-7 py-3.5 rounded-sm font-semibold text-base transition-colors">
              Find Your Growth Gaps
            </Link>
            <Link href="/solutions" data-cta="home-hero-secondary" className="text-ink-mid hover:text-ink font-semibold text-base transition-colors underline underline-offset-4 decoration-brass">
              Explore Our Solutions →
            </Link>
          </div>
          <p className="mt-10 text-ink-mid max-w-2xl border-l-2 border-brass pl-5">
            From the first website visit to the final customer follow-up, we connect the systems that help your business
            respond faster and run better.
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">
          <SectionIntro
            title="Growth gets expensive when your systems do not work together."
            intro="A dated website, slow follow-up and repetitive administrative work can quietly cost you customers and capacity. Makr identifies those gaps and builds a practical system around the way your business actually operates."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="border-l-2 border-brass pl-5">
                <h3 className="font-semibold text-ink mb-1">{p.title}</h3>
                <p className="text-ink-mid text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three solutions */}
      <section className="py-20 px-6 bg-white border-y border-brass-light">
        <div className="max-w-6xl mx-auto">
          <SectionIntro
            title="One partner. Three ways to improve growth and operations."
            intro="Each piece works on its own and works better together: the website brings in the inquiry, follow-up turns it into business and workflows take the busywork off your team."
          />
          <SolutionCards />
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">
          <SectionIntro title="Built for businesses where responsiveness and execution matter." />
          <IndustryList />
          <p className="mt-6">
            <Link href="/industries" className="text-ink-mid text-sm hover:text-ink underline underline-offset-4 decoration-brass">
              See how we work with each industry →
            </Link>
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-white border-t border-brass-light">
        <div className="max-w-6xl mx-auto">
          <SectionIntro title="Start with the bottleneck — not the technology." />
          <ProcessGrid />
          <p className="mt-6">
            <Link href="/how-it-works" className="text-ink-mid text-sm hover:text-ink underline underline-offset-4 decoration-brass">
              How an engagement works →
            </Link>
          </p>
        </div>
      </section>

      <CtaBand name="home-bottom" />
      <Footer />
    </div>
  );
}
