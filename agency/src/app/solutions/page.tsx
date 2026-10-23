import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { CtaBand, PageHeader } from "@/components/sections";
import { SOLUTIONS } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions — Websites, Lead Follow-Up & AI Workflow Automation",
  description:
    "Website development and care, lead follow-up and revenue recovery, and AI workflow automation — three connected services that help growing businesses get found, capture opportunities and cut manual work.",
  alternates: { canonical: "/solutions" },
};

const serviceSchema = SOLUTIONS.map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  description: s.summary,
  url: `${SITE_URL}/solutions#${s.id}`,
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  areaServed: { "@type": "Place", name: "New England" },
}));

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <JsonLd data={serviceSchema} />
      <Nav activePath="/solutions" />

      <PageHeader
        title={<>One system.<br />Three connected services.</>}
        intro="Your website, your follow-up and your internal workflows are parts of the same process. We improve whichever part is holding you back first, then connect the rest."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          {SOLUTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-sm bg-canvas border border-brass-light text-ink-mid px-4 py-2 rounded-sm font-medium hover:border-brass hover:text-ink transition-colors">
              {s.number} · {s.name}
            </a>
          ))}
        </div>
      </PageHeader>

      {/* How the three fit together */}
      <section className="py-12 px-6 bg-green-800">
        <ol className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-white">
          <li><span className="text-xs font-bold uppercase tracking-widest text-green-200">Get found</span><p className="mt-2 text-lg leading-snug">A website turns visitors into inquiries.</p></li>
          <li><span className="text-xs font-bold uppercase tracking-widest text-green-200">Follow through</span><p className="mt-2 text-lg leading-snug">Follow-up turns inquiries into customers.</p></li>
          <li><span className="text-xs font-bold uppercase tracking-widest text-green-200">Run better</span><p className="mt-2 text-lg leading-snug">Workflows take the busywork off your team.</p></li>
        </ol>
      </section>

      {SOLUTIONS.map((s, i) => (
        <section key={s.id} id={s.id} className={`scroll-mt-20 py-20 px-6 border-b border-brass-light ${i % 2 === 0 ? "bg-canvas" : "bg-white"}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_20rem] gap-10 mb-10">
              <div>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-display font-bold text-5xl text-ink-light leading-none">{s.number}</span>
                  <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">{s.name}</h2>
                </div>
                <p className="text-ink-mid text-lg max-w-2xl leading-relaxed">{s.summary}</p>
                <p className="mt-4 text-ink font-semibold max-w-2xl">{s.outcome}</p>
              </div>
              <div className={`${i % 2 === 0 ? "bg-white" : "bg-canvas"} border border-brass-light rounded-sm p-6 self-start`}>
                <p className="text-xs font-bold uppercase tracking-widest text-ink-mid mb-3">A good fit if</p>
                <ul className="space-y-2">
                  {s.goodFit.map((g) => (
                    <li key={g} className="text-sm text-ink-mid flex items-start gap-2"><span className="text-green-700 mt-0.5 shrink-0" aria-hidden>✓</span>{g}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {s.includes.map((item) => (
                <div key={item.title} className={`${i % 2 === 0 ? "bg-white" : "bg-canvas"} border-l-4 border-green-700 rounded-sm p-5`}>
                  <h3 className="font-semibold text-ink mb-2">{item.title}</h3>
                  <p className="text-ink-mid text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Practical guardrails */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-ink mb-6">How we keep it practical</h2>
          <div className="space-y-5">
            {[
              { title: "Your team stays in control", body: "Automations handle repetitive steps and hand anything that needs judgment to a person. We don't promise a business that runs itself." },
              { title: "Built around your existing tools", body: "We work with what you already use wherever possible, and recommend something new only when it clearly earns its place." },
              { title: "Support after launch", body: "Every build includes testing with your team, and we stay involved to monitor, fix and improve it." },
            ].map((g) => (
              <div key={g.title} className="border-l-2 border-brass pl-5">
                <h3 className="font-semibold text-ink mb-1">{g.title}</h3>
                <p className="text-ink-mid text-sm leading-relaxed">{g.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-mid">
            Looking for costs? <Link href="/pricing" className="underline underline-offset-4 decoration-brass hover:text-ink">See pricing</Link>.
          </p>
        </div>
      </section>

      <CtaBand name="solutions-bottom" title="Not sure which piece to start with?" body="Book a short Growth Gap Review. We will look at your website, follow-up and workflows and tell you where the clearest opportunity is." />
      <Footer />
    </div>
  );
}
