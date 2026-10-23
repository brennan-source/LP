import Link from "next/link";
import { INDUSTRIES, PROCESS, SOLUTIONS } from "@/lib/content";
import { BOOKING_URL } from "@/lib/site";

// Reusable page sections for the marketing site.

export function PageHeader({ title, intro, children }: { title: React.ReactNode; intro?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="bg-white pt-28 pb-16 px-6 border-b border-brass-light">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display font-extrabold text-5xl md:text-7xl text-ink leading-none tracking-tight text-balance">{title}</h1>
        {intro && <p className="mt-6 text-ink-mid text-xl max-w-2xl leading-relaxed">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function SectionIntro({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl mb-12">
      {eyebrow && <p className="text-xs font-bold uppercase tracking-widest text-ink-mid mb-3">{eyebrow}</p>}
      <h2 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight text-balance">{title}</h2>
      {intro && <p className="mt-4 text-ink-mid text-lg leading-relaxed">{intro}</p>}
    </div>
  );
}

// The three offers as connected parts of one system.
export function SolutionCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {SOLUTIONS.map((s) => (
        <Link
          key={s.id}
          href={`/solutions#${s.id}`}
          className="group bg-white border-l-4 border-green-700 rounded-sm p-6 flex flex-col hover:shadow-sm transition-shadow"
        >
          <span className="font-display font-bold text-3xl text-ink-light leading-none mb-4">{s.number}</span>
          <h3 className="font-display font-bold text-2xl text-ink mb-3 group-hover:text-green-700 transition-colors">{s.headline}</h3>
          <p className="text-ink-mid text-sm leading-relaxed flex-1">{s.summary}</p>
          <span className="mt-5 text-sm font-semibold text-green-700">{s.name} →</span>
        </Link>
      ))}
    </div>
  );
}

export function IndustryList() {
  return (
    <ul className="divide-y divide-brass-light border-y border-brass-light">
      {INDUSTRIES.map((i) => (
        <li key={i.id}>
          <Link href={`/industries#${i.id}`} className="group grid md:grid-cols-[3rem_14rem_1fr_auto] gap-x-6 gap-y-1 items-baseline py-5">
            <span className="font-display font-bold text-xl text-ink-light">{i.number}</span>
            <span className="font-display font-bold text-2xl text-ink group-hover:text-green-700 transition-colors">{i.name}</span>
            <span className="text-ink-mid leading-relaxed">{i.line}</span>
            <span className="hidden md:inline text-ink-light group-hover:text-green-700 transition-colors" aria-hidden>→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ProcessGrid() {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {PROCESS.map((p) => (
        <li key={p.number} className="bg-white border border-brass-light rounded-sm p-6">
          <span className="font-display font-bold text-3xl text-ink-light leading-none">{p.number}</span>
          <h3 className="mt-3 font-display font-bold text-2xl text-ink">{p.name}</h3>
          <p className="mt-2 text-ink-mid text-sm leading-relaxed">{p.summary}</p>
        </li>
      ))}
    </ol>
  );
}

// Closing call to action. Every page ends with the same primary action.
export function CtaBand({
  title = "Where is your business losing leads or time?",
  body = "Book a short Growth Gap Review. We will identify the clearest opportunities across your website, follow-up process and internal workflows.",
  cta = "Book a Growth Gap Review",
  href = "/contact",
  name,
}: {
  title?: string;
  body?: string;
  cta?: string;
  href?: string;
  name: string;
}) {
  return (
    <section className="py-24 px-6 bg-green-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white leading-tight max-w-3xl text-balance">{title}</h2>
        <p className="mt-6 text-green-100 text-lg max-w-xl leading-relaxed">{body}</p>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-4 items-center">
          <Link href={href} data-cta={name} className="bg-white text-green-900 hover:bg-green-50 px-8 py-4 rounded-sm font-bold text-lg transition-colors">
            {cta}
          </Link>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta={`${name}-calendar`} className="text-green-100 hover:text-white text-sm font-medium underline underline-offset-4">
            Or pick a time on our calendar
          </a>
        </div>
      </div>
    </section>
  );
}
