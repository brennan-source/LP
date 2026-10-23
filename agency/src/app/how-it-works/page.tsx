import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CtaBand, PageHeader } from "@/components/sections";
import { PROCESS } from "@/lib/content";

export const metadata: Metadata = {
  title: "How It Works — Diagnose, Build, Connect, Improve",
  description:
    "Makr starts with the bottleneck, not the technology: diagnose where leads and time are lost, build the highest-value fix, connect it to your tools and keep improving it.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav activePath="/how-it-works" />
      <PageHeader
        title="Start with the bottleneck — not the technology."
        intro="Four steps, from the first conversation to a system that keeps getting better. Each one connects to the next."
      />
      <section className="py-20 px-6 bg-canvas">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
          <div className="absolute left-7 top-10 bottom-10 w-px bg-brass-light hidden md:block" aria-hidden />
          <ol>
            {PROCESS.map((step, i) => (
              <li key={step.number} className="relative">
                <div className="md:flex gap-10 items-start">
                  <div className="relative flex-shrink-0 hidden md:flex flex-col items-center">
                    <div className="w-14 h-14 rounded-sm bg-white border-2 border-brass-light flex items-center justify-center z-10">
                      <span className="font-display font-bold text-lg text-ink">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-white border border-brass-light rounded-sm p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="md:hidden font-display font-bold text-2xl text-ink-mid">{step.number}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-ink-mid">{step.name}</span>
                    </div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl text-ink mb-3 leading-snug">{step.summary}</h2>
                    <p className="text-ink-mid leading-relaxed mb-6">{step.body}</p>
                    <div className="flex items-start gap-3 bg-canvas-warm border border-brass-light rounded-sm px-4 py-3">
                      <span className="text-ink-mid font-bold text-sm shrink-0 mt-0.5" aria-hidden>→</span>
                      <p className="text-ink-mid text-sm">{step.output}</p>
                    </div>
                  </div>
                </div>
                {i < PROCESS.length - 1 && (
                  <div className="md:ml-24 flex items-center justify-start py-3 pl-8" aria-hidden>
                    <div className="w-px h-6 bg-brass-light" />
                  </div>
                )}
              </li>
            ))}
          </ol>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-white border-y border-brass-light">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-ink mb-10">What stays the same throughout.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "A single point of contact", body: "One person who knows your business, answers your questions and is accountable for the work. Not a support queue.", accent: "border-green-700" },
              { title: "Plain-language updates", body: "We report in terms that matter to you — inquiries, follow-ups, bookings and time saved — not technical jargon.", accent: "border-green-800" },
              { title: "No surprises on cost", body: "Scope and fees are agreed in writing before any work begins.", accent: "border-brass" },
            ].map((item) => (
              <div key={item.title} className={`bg-canvas border-l-4 ${item.accent} rounded-sm p-6`}>
                <h3 className="font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-ink-mid text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand name="how-it-works-bottom" title="The first step is a short conversation." />
      <Footer />
    </div>
  );
}
