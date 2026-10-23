import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CtaBand, PageHeader } from "@/components/sections";
import { INDUSTRIES } from "@/lib/content";
import { LOCAL_LINE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries — Home, Professional, Personal, Manufacturing & B2B Services",
  description:
    "How Makr helps home services, professional services, personal services, manufacturing and B2B service businesses respond faster, follow up consistently and reduce manual work.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav activePath="/industries" />

      <PageHeader
        title="Built for businesses where responsiveness and execution matter."
        intro="Different industries lose opportunities in different places. We start with the bottleneck that matters most in yours."
      >
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          {INDUSTRIES.map((v) => (
            <a key={v.id} href={`#${v.id}`} className="group flex items-center gap-3">
              <span className="font-display font-bold text-4xl text-ink-light group-hover:text-ink-mid transition-colors leading-none">{v.number}</span>
              <span className="text-ink-mid text-sm font-medium group-hover:text-ink transition-colors">{v.name}</span>
            </a>
          ))}
        </div>
      </PageHeader>

      <div className="bg-ink px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-canvas-warm">{LOCAL_LINE}</p>
        </div>
      </div>

      {INDUSTRIES.map((v, i) => (
        <section key={v.id} id={v.id} className={`scroll-mt-20 py-20 px-6 border-b border-brass-light ${i % 2 === 0 ? "bg-canvas" : "bg-white"}`}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="flex items-baseline gap-4 mb-6 min-w-0">
                <span className="font-display font-bold text-6xl text-ink-light leading-none">{v.number}</span>
                <h2 className="min-w-0 font-display font-extrabold text-4xl lg:text-5xl text-ink leading-tight text-balance">{v.name}</h2>
              </div>
              <p className="text-ink font-semibold text-lg mb-4">{v.line}</p>
              <p className="text-ink-mid leading-relaxed mb-8">{v.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {v.examples.map((t) => (
                  <span key={t} className="text-xs bg-canvas-warm border border-brass-light text-ink-mid px-3 py-1.5 rounded-sm">{t}</span>
                ))}
              </div>
              {v.href && (
                <Link href={v.href} className="inline-block bg-ink text-white hover:bg-green-700 transition-colors px-6 py-3 rounded-sm font-semibold text-sm">
                  {v.id === "manufacturing" ? "Request a Manufacturing Growth Checkup →" : `More on ${v.name} →`}
                </Link>
              )}
            </div>
            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <div className="bg-white border border-brass-light rounded-sm p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-ink-mid mb-5">Where we often start</p>
                <ul className="space-y-4">
                  {v.workflows.map((w) => (
                    <li key={w} className="border-l-4 border-green-700 pl-4 font-display font-bold text-2xl text-ink leading-snug">{w}</li>
                  ))}
                </ul>
                <p className="text-ink-light text-xs mt-6">Examples, not a fixed package. Every business gets the improvements that fit how it actually works.</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      <CtaBand name="industries-bottom" title="Not sure if we're a fit?" body="Book a short Growth Gap Review. We'll tell you honestly whether we can help and where the clearest opportunity is for your business." />
      <Footer />
    </div>
  );
}
