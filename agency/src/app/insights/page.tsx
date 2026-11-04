import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CtaBand, PageHeader } from "@/components/sections";
import { ARTICLES, type Article } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights — Practical Guides for Owner-Led Businesses",
  description:
    "Plain-English guides for trades and small law firms: estimate follow-up, missed calls, Google reviews, intake, response times and who owns your website.",
  alternates: { canonical: "/insights" },
};

const GROUPS: { market: Article["market"]; eyebrow: string; title: string }[] = [
  { market: "Home services", eyebrow: "For trades & home services", title: "Calls, estimates and reviews" },
  { market: "Law firms", eyebrow: "For small law firms", title: "Inquiries and intake" },
  { market: "All owners", eyebrow: "For every owner", title: "Owning what you pay for" },
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav activePath="/insights" />

      <PageHeader
        eyebrow="Insights"
        title="Practical guides. No hype."
        intro="Short, sourced answers to common questions about getting found, following up and running with less manual work. Every statistic names its source."
      />

      {GROUPS.map((g, i) => {
        const articles = ARTICLES.filter((a) => a.market === g.market);
        if (articles.length === 0) return null;
        return (
          <section key={g.market} className={`py-16 px-6 border-b border-brass-light ${i % 2 === 0 ? "bg-canvas" : "bg-white"}`}>
            <div className="max-w-6xl mx-auto">
              <p className="eyebrow mb-3">{g.eyebrow}</p>
              <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-ink leading-[0.95] mb-8">{g.title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {articles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/insights/${a.slug}`}
                    className="group bg-white border border-brass-light border-t-[3px] border-t-copper-bright rounded-xl p-6 flex flex-col hover:border-brass transition-colors"
                  >
                    <h3 className="font-display font-extrabold uppercase text-2xl text-ink leading-none group-hover:text-green-700 transition-colors text-balance">{a.title}</h3>
                    <p className="mt-3 text-sm text-ink-mid leading-relaxed flex-1">{a.description}</p>
                    <span className="mt-5 text-sm font-semibold text-green-700">Read the guide →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand
        name="insights-bottom"
        title="Want this applied to your business?"
        body="Book a free, 20-minute Growth Gap Review. We'll look at how customers find you, what happens when they reach out and where time goes, and give you your top opportunities in priority order."
        cta="Find Your Growth Gaps"
      />
      <Footer />
    </div>
  );
}
