import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CtaBand } from "@/components/sections";
import { SOLUTIONS } from "@/lib/content";

type Segment = { name: string; problem: string; capabilities: string[] };

// Shared layout for the deeper industry pages under /industries/*.
export function IndustryDetail({
  id,
  name,
  headline,
  intro,
  segments,
  applications,
  ctaTitle,
  ctaBody,
}: {
  id: string;
  name: string;
  headline: string;
  intro: string;
  segments: Segment[];
  // One list per solution, in SOLUTIONS order: websites, revenue recovery, AI workflows.
  applications: [string[], string[], string[]];
  ctaTitle: string;
  ctaBody: string;
}) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav activePath="/industries" />

      <section className="bg-white pt-28 pb-16 px-6 border-b border-brass-light">
        <div className="max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 mb-6 text-sm">
            <Link href="/industries" className="text-ink-light hover:text-green-700 transition">Industries</Link>
            <span className="text-ink-light" aria-hidden>/</span>
            <span className="font-semibold text-ink-mid" aria-current="page">{name}</span>
          </nav>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-ink leading-none tracking-tight mb-6 text-balance">{headline}</h1>
          <p className="text-ink-mid text-xl max-w-2xl leading-relaxed">{intro}</p>
          <div className="mt-8">
            <Link href="/contact" data-cta={`${id}-hero`} className="inline-block bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-sm font-semibold text-lg transition-colors">
              Book a Growth Gap Review
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-canvas">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-8">How the three services apply</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {SOLUTIONS.map((s, i) => (
              <div key={s.id} className="bg-white border-l-4 border-green-700 rounded-sm p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-ink-mid mb-2">{s.number}</p>
                <h3 className="font-semibold text-ink mb-3">
                  <Link href={`/solutions#${s.id}`} className="hover:text-green-700">{s.name}</Link>
                </h3>
                <ul className="space-y-2">
                  {applications[i].map((a) => (
                    <li key={a} className="text-sm text-ink-mid flex items-start gap-2"><span className="text-green-700 mt-0.5 shrink-0" aria-hidden>✓</span>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white border-y border-brass-light">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-4">Businesses we work with</h2>
          <p className="text-ink-mid mb-10 max-w-2xl">Every business loses opportunities in a different place. These are common starting points, not a fixed package.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {segments.map((s) => (
              <div key={s.name} className="bg-canvas border-l-4 border-brass rounded-sm p-6">
                <h3 className="font-semibold text-ink mb-2">{s.name}</h3>
                <p className="text-ink-mid text-sm mb-4">{s.problem}</p>
                <ul className="space-y-1">
                  {s.capabilities.map((c) => (
                    <li key={c} className="text-xs text-ink-mid flex items-start gap-2"><span className="text-green-700 mt-0.5 shrink-0" aria-hidden>✓</span>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand name={`${id}-bottom`} title={ctaTitle} body={ctaBody} />
      <Footer />
    </div>
  );
}

export default IndustryDetail;
