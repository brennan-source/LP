import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SampleReport from "@/components/SampleReport";
import JsonLd from "@/components/JsonLd";
import { CtaBand } from "@/components/sections";
import { FaqList, Inline, faqSchema, type Faq } from "@/components/Prose";
import { SAMPLE_REPORTS, SOLUTIONS } from "@/lib/content";

// A segment can link to a deeper page (for example Legal → /industries/law-firms).
type Segment = { name: string; problem: string; capabilities: string[]; link?: { href: string; label: string } };

// Optional sections, rendered between "How the four services apply" and "Businesses we work with".
// Text fields accept **bold**, *italic* and [links](/path).
type Evidence = { eyebrow: string; line: string; source: string };
type HowWeWork = { title: string; body?: string; items?: { title: string; body: string }[] };
type Offer = { eyebrow: string; title: string; price: string; body: string; next?: string; terms: string; promise?: string };

const SHORT: Record<string, string> = {
  websites: "Website",
  "search-content": "Search",
  "revenue-recovery": "Follow-up",
  "ai-workflows": "Workflows",
};

// Shared layout for the deeper industry pages under /industries/*.
export function IndustryDetail({
  id,
  name,
  headline,
  intro,
  reportKey,
  segments,
  applications,
  ctaTitle,
  ctaBody,
  kicker,
  evidence,
  howWeWork,
  offer,
  faqs,
}: {
  id: string;
  name: string;
  // Short line above the headline, for pages whose full hook is too long for one H1.
  kicker?: string;
  headline: string;
  intro: string;
  // Which sample week from SAMPLE_REPORTS to show beside the headline.
  reportKey: string;
  segments: Segment[];
  // One list per solution, in SOLUTIONS order: websites, search & content, revenue recovery, AI workflows.
  applications: [string[], string[], string[], string[]];
  ctaTitle: string;
  ctaBody: string;
  evidence?: Evidence;
  howWeWork?: HowWeWork;
  offer?: Offer;
  faqs?: Faq[];
}) {
  const report = SAMPLE_REPORTS.find((r) => r.key === reportKey) ?? SAMPLE_REPORTS[0];

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav activePath="/industries" />

      <section className="pt-28 pb-16 px-6 border-b border-brass-light">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
              <Link href="/industries" className="eyebrow hover:text-ink">Industries</Link>
              <span className="text-ink-light" aria-hidden>/</span>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink-mid" aria-current="page">{name}</span>
            </nav>
            {kicker && <p className="mt-4 text-lg font-semibold text-ink-mid">{kicker}</p>}
            <h1 className={`${kicker ? "mt-2" : "mt-4"} font-display font-extrabold uppercase text-5xl md:text-6xl text-ink leading-[0.92] tracking-tight text-balance`}>{headline}</h1>
            <p className="mt-5 text-ink-mid text-lg max-w-xl leading-relaxed">{intro}</p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link href="/contact" data-cta={`${id}-hero`} className="bg-green-700 hover:bg-green-800 text-white px-6 py-3.5 rounded-md font-bold transition-colors">
                Get Your Free Assessment
              </Link>
              <Link href="/pricing" className="bg-white border border-brass-light hover:border-brass text-ink px-6 py-3.5 rounded-md font-semibold transition-colors">
                See pricing
              </Link>
            </div>
          </div>
          <figure className="min-w-0">
            <SampleReport report={report} />
            <figcaption className="mt-3 text-xs text-ink-light">Sample for a fictional business. Not client data or a results claim.</figcaption>
          </figure>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-ink leading-[0.95] mb-10">How the four services apply</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOLUTIONS.map((s, i) => (
              <div key={s.id} className="bg-white border border-brass-light border-t-[3px] border-t-copper-bright rounded-xl p-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-copper">{s.number} · {SHORT[s.id]}</p>
                <h3 className="mt-2 font-display font-extrabold uppercase text-xl leading-none">
                  <Link href={`/solutions#${s.id}`} className="text-ink hover:text-green-700">{s.name}</Link>
                </h3>
                <ul className="mt-4 space-y-2">
                  {applications[i].map((a) => (
                    <li key={a} className="text-sm text-ink-mid flex items-start gap-2"><span className="text-green-700 mt-0.5 shrink-0" aria-hidden>✓</span>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {evidence && (
        <section className="py-16 px-6 bg-green-900">
          <div className="max-w-4xl mx-auto">
            <p className="eyebrow eyebrow-on-dark mb-4">{evidence.eyebrow}</p>
            <p className="font-display font-bold text-3xl md:text-4xl text-white leading-tight text-balance">{evidence.line}</p>
            <p className="mt-5 text-sm text-green-100 [&_a]:text-white [&_a]:decoration-green-300"><Inline text={evidence.source} /></p>
          </div>
        </section>
      )}

      {howWeWork && (
        <section className="py-20 px-6 bg-canvas-warm border-t border-brass-light">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-ink leading-[0.95] max-w-3xl text-balance">{howWeWork.title}</h2>
            {howWeWork.body && <p className="mt-5 text-ink-mid text-lg leading-relaxed max-w-3xl"><Inline text={howWeWork.body} /></p>}
            {howWeWork.items && (
              <ul className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {howWeWork.items.map((it) => (
                  <li key={it.title} className="bg-white border border-brass-light border-t-[3px] border-t-copper-bright rounded-xl p-6">
                    <h3 className="font-semibold text-ink">{it.title}</h3>
                    <p className="mt-2 text-sm text-ink-mid leading-relaxed"><Inline text={it.body} /></p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {offer && (
        <section className="py-20 px-6 bg-canvas border-t border-brass-light">
          <div className="max-w-4xl mx-auto bg-white border border-brass-light border-t-[3px] border-t-copper-bright rounded-xl p-7 md:p-10">
            <p className="eyebrow mb-3">{offer.eyebrow}</p>
            <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl text-ink leading-[0.95]">{offer.title}</h2>
            <p className="mt-3 font-display font-extrabold text-3xl text-green-700 tabular-nums">{offer.price}</p>
            <p className="mt-4 text-ink-mid leading-relaxed"><Inline text={offer.body} /></p>
            {offer.next && <p className="mt-3 text-ink-mid leading-relaxed"><Inline text={offer.next} /></p>}
            <p className="mt-6 pt-5 border-t border-brass-light text-sm text-ink-mid leading-relaxed"><Inline text={offer.terms} /></p>
            {offer.promise && <p className="mt-4 text-sm text-ink-mid leading-relaxed border-l-[3px] border-copper-bright pl-4"><Inline text={offer.promise} /></p>}
            <div className="mt-7">
              <Link href="/contact" data-cta={`${id}-offer`} className="inline-block bg-green-700 hover:bg-green-800 text-white px-6 py-3.5 rounded-md font-bold transition-colors">
                Get Your Free Assessment
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-6 bg-white border-y border-brass-light">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-ink leading-[0.95]">Businesses we work with</h2>
          <p className="mt-4 text-ink-mid mb-10 max-w-2xl">Every business loses opportunities in a different place. These are common starting points, not a fixed package.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {segments.map((s) => (
              <div key={s.name} className="bg-canvas-warm border border-brass-light border-l-4 border-l-copper-bright rounded-md p-6">
                <h3 className="font-semibold text-ink mb-2">{s.name}</h3>
                <p className="text-ink-mid text-sm mb-4">{s.problem}</p>
                <ul className="space-y-1">
                  {s.capabilities.map((c) => (
                    <li key={c} className="text-sm text-ink-mid flex items-start gap-2"><span className="text-green-700 mt-0.5 shrink-0" aria-hidden>✓</span>{c}</li>
                  ))}
                </ul>
                {s.link && (
                  <Link href={s.link.href} className="mt-4 inline-block text-sm font-semibold text-green-700 hover:text-green-800 underline underline-offset-4 decoration-green-300">
                    {s.link.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {faqs && faqs.length > 0 && (
        <section className="py-20 px-6 bg-canvas">
          <JsonLd data={faqSchema(faqs)} />
          <div className="max-w-3xl mx-auto">
            <p className="eyebrow mb-3">Questions</p>
            <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-ink leading-[0.95] mb-10">Frequently asked</h2>
            <FaqList faqs={faqs} />
          </div>
        </section>
      )}

      <CtaBand name={`${id}-bottom`} title={ctaTitle} body={ctaBody} />
      <Footer />
    </div>
  );
}

export default IndustryDetail;
