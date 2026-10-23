import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import IndustrySelector from "@/components/IndustrySelector";
import { CtaBand } from "@/components/sections";
import { ArtifactStack, BeforeAfter, CONCEPTS, ConceptScreen, JourneyVisual, ProcessVisual } from "@/components/visuals";
import { PROCESS, SOLUTIONS } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Makr — Websites, Lead Follow-Up & AI Workflows for Growing Businesses" },
  description:
    "Turn missed opportunities and manual work into measurable growth. Makr builds high-performing websites, automated lead follow-up and practical AI workflows for service, manufacturing and B2B businesses.",
  alternates: { canonical: "/" },
};

const PROCESS_OUTPUTS = ["Growth Gap scorecard", "A finished website or workflow", "Tools connected and tested", "Regular review and next steps"];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-widest text-copper mb-4">{children}</p>;
}

export default function HomePage() {
  const featured = CONCEPTS[1];
  const others = [CONCEPTS[0], CONCEPTS[2]];
  const serviceVisuals = [<ConceptScreen key="w" concept={CONCEPTS[2]} size="md" />, <JourneyVisual key="j" />, <ProcessVisual key="p" />];

  return (
    <div className="min-h-screen bg-canvas-warm text-ink">
      <Nav activePath="/" />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 lg:min-h-[80vh] flex items-center">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 xl:grid-cols-[7fr_5fr] gap-12 lg:gap-12 xl:gap-16 items-center">
          <div>
            <h1 className="font-display font-extrabold text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.98] tracking-tight text-ink text-balance">
              Turn missed opportunities and manual work into measurable growth.
            </h1>
            <p className="mt-7 text-xl text-ink-mid max-w-xl">
              Makr builds high-performing websites, automated lead follow-up and practical AI workflows for growing
              service and manufacturing businesses.
            </p>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-4 items-center">
              <Link href="/contact" data-cta="home-hero-primary" className="bg-green-700 hover:bg-green-800 text-white px-7 py-3.5 rounded-sm font-semibold transition-colors">
                Find Your Growth Gaps
              </Link>
              <Link href="/solutions" data-cta="home-hero-secondary" className="group text-ink-mid hover:text-ink font-semibold transition-colors">
                Explore our solutions <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <ArtifactStack />
        </div>
      </section>

      {/* Selected work (concepts, labeled) */}
      <section className="py-24 px-6 bg-canvas border-y border-brass-light">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <Eyebrow>Concept work</Eyebrow>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight max-w-2xl text-balance">How we&apos;d present businesses like yours.</h2>
            </div>
            <p className="text-sm text-ink-mid max-w-sm">These are concept designs for fictional businesses, made to show our approach across industries. They are not client projects.</p>
          </div>
          <div className="grid lg:grid-cols-[3fr_2fr] gap-6">
            <article className="bg-white border border-brass-light rounded-sm p-5 flex flex-col">
              <ConceptScreen concept={featured} size="lg" />
              <ConceptMeta concept={featured} />
            </article>
            <div className="grid gap-6">
              {others.map((c) => (
                <article key={c.id} className="bg-white border border-brass-light rounded-sm p-5">
                  <ConceptScreen concept={c} size="sm" />
                  <ConceptMeta concept={c} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services as editorial rows */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight max-w-2xl text-balance">One partner. Three ways to improve growth and operations.</h2>
          <div className="mt-16 space-y-24">
            {SOLUTIONS.map((s, i) => (
              <div key={s.id} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="font-display font-bold text-2xl text-copper">{s.number}</span>
                  <h3 className="mt-2 font-display font-bold text-3xl md:text-4xl text-ink leading-tight">{s.headline}</h3>
                  <p className="mt-4 text-lg text-ink-mid max-w-[38rem]">{s.summary}</p>
                  <p className="mt-4 text-ink font-semibold max-w-[38rem]">{s.outcome}</p>
                  <Link href={`/solutions#${s.id}`} className="group mt-6 inline-block font-semibold text-green-700 hover:text-green-800">
                    {s.name} <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                  </Link>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>{serviceVisuals[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="py-24 px-6 bg-white border-y border-brass-light">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[5fr_7fr] gap-12">
          <div>
            <Eyebrow>The difference</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight text-balance">Growth gets expensive when your systems do not work together.</h2>
            <p className="mt-5 text-ink-mid max-w-md">
              A dated website, slow follow-up and repetitive administrative work quietly cost you customers and capacity.
              We find those gaps and build a practical system around the way your business actually operates.
            </p>
          </div>
          <BeforeAfter />
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Eyebrow>Who we work with</Eyebrow>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight max-w-3xl text-balance mb-10">Built for businesses where responsiveness and execution matter.</h2>
          <IndustrySelector />
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 bg-canvas border-y border-brass-light">
        <div className="max-w-6xl mx-auto">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight max-w-2xl text-balance">Start with the bottleneck — not the technology.</h2>
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brass-light border border-brass-light">
            {PROCESS.map((p, i) => (
              <li key={p.number} className="bg-canvas-warm p-6 flex flex-col">
                <span className="font-display font-bold text-xl text-copper">{p.number}</span>
                <h3 className="mt-2 font-display font-bold text-2xl text-ink">{p.name}</h3>
                <p className="mt-2 text-sm text-ink-mid flex-1">{p.summary}</p>
                <p className="mt-5 pt-4 border-t border-brass-light text-sm text-ink">
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-ink-mid mb-1">You get</span>
                  {PROCESS_OUTPUTS[i]}
                </p>
              </li>
            ))}
          </ol>
          <Link href="/how-it-works" className="group mt-8 inline-block font-semibold text-green-700 hover:text-green-800">
            How an engagement works <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[5fr_7fr] gap-12">
          <div>
            <Eyebrow>Who you work with</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight text-balance">A person accountable for the work.</h2>
          </div>
          <div className="max-w-[40rem]">
            <p className="text-xl text-ink leading-relaxed">
              &ldquo;Good businesses lose opportunities because their website undersells them, follow-up depends on memory,
              and their teams are buried in manual work. Makr fixes those basics — and I&apos;m personally responsible for
              every engagement.&rdquo;
            </p>
            <p className="mt-6 text-ink-mid">
              <span className="font-semibold text-ink">Brennan Burks</span>, founder. 13 years leading communications and
              marketing for organizations in manufacturing, financial services, biotech and higher education.
            </p>
            <Link href="/about" className="group mt-6 inline-block font-semibold text-green-700 hover:text-green-800">
              About Makr <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand name="home-bottom" />
      <Footer />
    </div>
  );
}

function ConceptMeta({ concept }: { concept: (typeof CONCEPTS)[number] }) {
  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display font-bold text-2xl text-ink">{concept.brand}</h3>
        <span className="text-xs font-bold uppercase tracking-widest text-copper">Concept · {concept.industry}</span>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {concept.tags.map((t) => (
          <li key={t} className="text-xs text-ink-mid border border-brass-light rounded-sm px-2.5 py-1">{t}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-ink-mid">{concept.intent}</p>
    </div>
  );
}
