import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CtaBand, PageHeader } from "@/components/sections";

export const metadata: Metadata = {
  title: "Pricing — Websites, Lead Follow-Up & Workflow Automation",
  description:
    "Transparent Makr pricing: website builds from $2,000–$4,000, lead follow-up at $999/month, workflow automation from $3,000, all three for $1,499/month, and enterprise projects from $7,500.",
  alternates: { canonical: "/pricing" },
};

type Price = { amount: string; label: string };

const SERVICES: {
  id: string;
  number: string;
  name: string;
  summary: string;
  oneTime: Price;
  monthly: Price;
  includes: string[];
}[] = [
  {
    id: "websites",
    number: "01",
    name: "Website Development & Care",
    summary: "A fast, credible website built to turn visitors into inquiries — and kept that way.",
    oneTime: { amount: "$2,000–$4,000", label: "build, depending on complexity" },
    monthly: { amount: "$299", label: "/month care plan" },
    includes: [
      "Design and development",
      "Mobile-ready, fast-loading pages",
      "Forms, click-to-call and booking connected to your tools",
      "Updates, backups and content changes",
      "Ongoing conversion improvements",
    ],
  },
  {
    id: "revenue-recovery",
    number: "02",
    name: "Lead Follow-Up & Revenue Recovery",
    summary: "Automated responses, reminders and reactivation that recover opportunities already coming in.",
    oneTime: { amount: "$1,500", label: "one-time setup" },
    monthly: { amount: "$999", label: "/month" },
    includes: [
      "Missed-call text back",
      "Instant response to web inquiries",
      "Estimate and proposal follow-up",
      "Appointment reminders",
      "Reactivation and review requests",
    ],
  },
  {
    id: "ai-workflows",
    number: "03",
    name: "AI Workflow Automation",
    summary: "Practical automations that take repetitive admin work off your team.",
    oneTime: { amount: "From $3,000", label: "per workflow" },
    monthly: { amount: "$499", label: "/month optional support" },
    includes: [
      "Intake and routing",
      "Quoting and RFQ support",
      "Document processing",
      "Customer communication drafts",
      "Internal reporting",
    ],
  },
];

const DECISION_CARDS = [
  {
    label: "Start with one service",
    fit: "You know exactly where the bottleneck is — a dated website, slow follow-up or one painful manual process.",
    signs: ["One clear problem to solve first", "You want to see results before expanding", "Add the other services later at any time"],
  },
  {
    label: "Take the full package",
    fit: "Your website, follow-up and admin work all need attention, and you want them working together.",
    signs: ["Visitors, inquiries and paperwork all slip", "You want one partner accountable for the system", "You want the bundled price"],
  },
  {
    label: "Go enterprise",
    fit: "You have multiple locations, a larger team or workflows that need custom design.",
    signs: ["Several systems or sites to connect", "Custom workflows beyond a standard build", "Ongoing support scoped to your operation"],
  },
];

const FAQS = [
  {
    q: "Why publish prices publicly?",
    a: "Because you shouldn't have to get on a sales call to know if something fits your budget. Monthly prices are fixed. One-time builds are quoted within the published range after a short review and locked in writing before any work begins.",
  },
  {
    q: "What decides where a website lands in the $2,000–$4,000 range?",
    a: "Mostly size and complexity: the number of pages, how much content needs writing, and which forms, booking or integrations are involved. We confirm the exact price before kickoff.",
  },
  {
    q: "Can I start with one service and add more later?",
    a: "Yes. Most businesses start with the bottleneck that matters most. If you later add the other services, we'll move you to the package price.",
  },
  {
    q: "Is the AI Workflow support plan required?",
    a: "No. Each workflow is a one-time build that you own. The optional support plan covers monitoring, fixes and small improvements after launch.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav activePath="/pricing" />

      <PageHeader
        title={<>Transparent pricing.<br />No surprises.</>}
        intro="Price each service on its own, or take all three as one connected system for less. One-time builds are quoted within the published range and locked in writing before work begins."
      />

      {/* Services */}
      <section className="py-20 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-mid mb-6">By service</p>
          <div className="grid lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-white border border-brass-light rounded-sm flex flex-col">
                <div className="p-7 flex-1">
                  <span className="font-display font-bold text-2xl text-ink-light leading-none">{s.number}</span>
                  <h2 className="mt-2 font-display font-bold text-2xl text-ink leading-tight">
                    <Link href={`/solutions#${s.id}`} className="hover:text-green-700">{s.name}</Link>
                  </h2>
                  <p className="mt-2 text-sm text-ink-mid leading-relaxed">{s.summary}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-brass-light py-5">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-widest text-ink-mid mb-1">One-time</dt>
                      <dd className="text-xl font-bold text-green-700 leading-tight">{s.oneTime.amount}</dd>
                      <dd className="text-xs text-ink-light mt-1">{s.oneTime.label}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-widest text-ink-mid mb-1">Monthly</dt>
                      <dd className="text-xl font-bold text-green-700 leading-tight">{s.monthly.amount}</dd>
                      <dd className="text-xs text-ink-light mt-1">{s.monthly.label}</dd>
                    </div>
                  </dl>
                  <ul className="mt-5 space-y-2">
                    {s.includes.map((item) => (
                      <li key={item} className="text-sm text-ink-mid flex items-start gap-2">
                        <span className="text-green-700 mt-0.5 shrink-0" aria-hidden>✓</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-7 pb-7">
                  <Link href="/contact" data-cta={`pricing-${s.id}`} className="block text-center py-3 rounded-sm text-sm font-semibold transition-colors bg-ink text-white hover:bg-green-700">
                    Get started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package + enterprise */}
      <section className="py-20 px-6 bg-white border-y border-brass-light">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-mid mb-6">Packages &amp; custom</p>
          <div className="grid lg:grid-cols-[3fr_2fr] gap-6">
            <div className="bg-green-700 ring-2 ring-green-600 rounded-sm flex flex-col text-white">
              <div className="px-7 pt-5">
                <span className="text-xs font-bold uppercase tracking-widest text-green-200">Best value · All three services</span>
              </div>
              <div className="p-7 flex-1">
                <h2 className="font-display font-bold text-3xl">The Complete Growth System</h2>
                <p className="mt-2 text-green-100 leading-relaxed">
                  Your website, lead follow-up and workflow automation built and managed together — one partner, one connected system.
                </p>
                <dl className="mt-6 grid sm:grid-cols-2 gap-4 border-y border-green-600 py-5">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-green-200 mb-1">One-time</dt>
                    <dd className="text-2xl font-bold leading-tight">$5,500–$7,500</dd>
                    <dd className="text-xs text-green-200 mt-1">vs. $6,500–$8,500 separately</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-green-200 mb-1">Monthly</dt>
                    <dd className="text-2xl font-bold leading-tight">$1,499<span className="text-sm font-medium text-green-200">/month</span></dd>
                    <dd className="text-xs text-green-200 mt-1">vs. $1,797 separately</dd>
                  </div>
                </dl>
                <ul className="mt-5 grid sm:grid-cols-2 gap-2">
                  {[
                    "Website build and care plan",
                    "Full lead follow-up and recovery",
                    "Your first automated workflow",
                    "Workflow support plan",
                    "One point of contact",
                    "Regular reviews and improvements",
                  ].map((item) => (
                    <li key={item} className="text-sm text-green-100 flex items-start gap-2">
                      <span className="text-green-300 mt-0.5 shrink-0" aria-hidden>✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-7 pb-7">
                <Link href="/contact" data-cta="pricing-package" className="block text-center py-3 rounded-sm text-sm font-semibold transition-colors bg-white text-green-700 hover:bg-green-50">
                  Get started
                </Link>
              </div>
            </div>

            <div className="bg-canvas-warm border border-brass-light rounded-sm flex flex-col">
              <div className="p-7 flex-1">
                <h2 className="font-display font-bold text-3xl text-ink">Enterprise</h2>
                <p className="mt-2 text-ink-mid leading-relaxed">
                  For multi-location businesses, larger teams and complex operations that need custom implementation.
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-brass-light py-5">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-ink-mid mb-1">Projects</dt>
                    <dd className="text-2xl font-bold text-green-700 leading-tight">From $7,500</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-ink-mid mb-1">Monthly</dt>
                    <dd className="text-2xl font-bold text-green-700 leading-tight">Custom</dd>
                  </div>
                </dl>
                <ul className="mt-5 space-y-2">
                  {["Custom workflow design", "Multiple systems or locations", "Scoped support and reviews"].map((item) => (
                    <li key={item} className="text-sm text-ink-mid flex items-start gap-2">
                      <span className="text-green-700 mt-0.5 shrink-0" aria-hidden>✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-7 pb-7">
                <Link href="/contact" data-cta="pricing-enterprise" className="block text-center py-3 rounded-sm text-sm font-semibold transition-colors bg-ink text-white hover:bg-green-700">
                  Scope a project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Which fits */}
      <section className="py-20 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-ink mb-2">Which option fits your situation?</h2>
          <p className="text-ink-mid mb-10">Most businesses know within the first conversation. Here&apos;s a quick read.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {DECISION_CARDS.map((c) => (
              <div key={c.label} className="bg-white border-l-4 border-green-700 rounded-sm p-6">
                <div className="inline-block bg-green-700 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4">{c.label}</div>
                <p className="text-ink-mid text-sm leading-relaxed mb-4">{c.fit}</p>
                <ul className="space-y-2">
                  {c.signs.map((s) => (
                    <li key={s} className="text-xs text-ink-mid flex items-start gap-2"><span className="shrink-0" aria-hidden>→</span>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white border-t border-brass-light">
        <div className="max-w-3xl mx-auto space-y-6">
          {FAQS.map((faq) => (
            <div key={faq.q} className="border-l-2 border-brass pl-5">
              <h3 className="font-semibold text-ink mb-1">{faq.q}</h3>
              <p className="text-ink-mid text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand name="pricing-bottom" title="Not sure where to start?" body="Book a short Growth Gap Review. We'll point to the clearest opportunity, recommend a starting point and confirm your price before any work begins." />
      <Footer />
    </div>
  );
}
