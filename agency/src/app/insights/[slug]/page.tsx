import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { CtaBand } from "@/components/sections";
import { FaqList, Inline, Prose, faqSchema } from "@/components/Prose";
import { ARTICLES, getArticle } from "@/lib/insights";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Only the articles in lib/insights.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.titleTag,
    description: article.description,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: { type: "article", title: article.titleTag, description: article.description },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    mainEntityOfPage: `${SITE_URL}/insights/${article.slug}`,
    author: { "@type": "Person", name: "Brennan Burks" },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />
      <JsonLd data={[articleSchema, faqSchema(article.faqs)]} />

      <header className="bg-canvas pt-28 pb-12 px-6 border-b border-brass-light">
        <div className="max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            <Link href="/insights" className="eyebrow hover:text-ink">Insights</Link>
            <span className="text-ink-light" aria-hidden>/</span>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink-mid">{article.market}</span>
          </nav>
          <h1 className="mt-4 font-display font-extrabold uppercase text-4xl md:text-6xl text-ink leading-[0.95] tracking-tight text-balance">{article.title}</h1>
          <p className="mt-6 text-ink text-xl leading-relaxed"><Inline text={article.lead} /></p>
          <p className="mt-6 text-sm text-ink-light">By Brennan Burks, founder of Makr · Westford, Massachusetts</p>
        </div>
      </header>

      <article className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <Prose source={article.body} />
        </div>
      </article>

      <section className="py-16 px-6 bg-white border-y border-brass-light">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow mb-3">Questions</p>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-ink leading-[0.95] mb-10">Frequently asked</h2>
          <FaqList faqs={article.faqs} />
        </div>
      </section>

      <section className="py-14 px-6 bg-canvas-warm">
        <div className="max-w-3xl mx-auto grid md:grid-cols-[3fr_2fr] gap-10">
          <div>
            <h2 className="eyebrow mb-4">Sources</h2>
            {article.sources.length > 0 && (
              <ol className="space-y-3 text-sm text-ink-mid list-decimal pl-5">
                {article.sources.map((s) => (
                  <li key={s.label}>
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4 decoration-brass-light hover:decoration-green-700">{s.label}</a>
                    ) : (
                      <span className="text-ink">{s.label}</span>
                    )}
                    <span className="block text-ink-light">{s.usedFor}</span>
                  </li>
                ))}
              </ol>
            )}
            {article.sourceNote && <p className="mt-3 text-sm text-ink-light">{article.sourceNote}</p>}
          </div>
          <div>
            <h2 className="eyebrow mb-4">Related</h2>
            <ul className="space-y-2 text-sm">
              {article.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="font-semibold text-green-700 hover:text-green-800 underline underline-offset-4 decoration-green-300">{r.label} →</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand name={`insights-${article.slug}`} title={article.cta.title} body={article.cta.body} cta="Get Your Free Assessment" />
      <Footer />
    </div>
  );
}
