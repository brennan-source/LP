import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CheckupForm from "./CheckupForm";

export const metadata: Metadata = {
  title: "Manufacturing Growth Checkup — Complimentary Review for Manufacturers",
  description:
    "Get a complimentary Manufacturing Growth Checkup from Makr: a review of your website, inquiry and RFQ response, follow-up gaps and one automation opportunity, with a prioritized 30-day action plan.",
  alternates: { canonical: "/manufacturing-growth-checkup" },
};

const DELIVERABLES = [
  { title: "Website and conversion review", body: "How well your site explains your capabilities and turns visitors into inquiries." },
  { title: "Inquiry or RFQ response assessment", body: "What happens between a request coming in and a response going out." },
  { title: "Follow-up gap analysis", body: "Where quotes and conversations stall without a next step." },
  { title: "One recommended automation opportunity", body: "The single workflow most worth automating first, and what it would take." },
  { title: "Prioritized 30-day action plan", body: "A short, ordered list of what to fix first — whether or not you work with us." },
];

export default function ManufacturingCheckupPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />

      <section className="bg-white pt-28 pb-16 px-6 border-b border-brass-light">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_28rem] gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-ink-mid mb-4">Manufacturing Growth Checkup</p>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl text-ink leading-none tracking-tight text-balance">
              Your production process is disciplined. Is your growth process?
            </h1>
            <p className="mt-6 text-ink-mid text-xl max-w-2xl leading-relaxed">
              Get a complimentary Manufacturing Growth Checkup from Makr. We will examine how your website, inquiry
              follow-up and administrative workflows support — or slow — your growth.
            </p>
            <a href="#request" data-cta="manufacturing-hero" className="lg:hidden mt-6 inline-block bg-green-700 hover:bg-green-800 text-white px-7 py-3.5 rounded-sm font-semibold">
              Request My Checkup
            </a>

            <div className="mt-8 bg-green-800 text-white rounded-sm p-6 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-green-200 mb-2">Massachusetts Manufacturing Mash-Up · October 27</p>
              <p className="leading-relaxed">
                Attending the Massachusetts Manufacturing Mash-Up on October 27? Schedule a brief conversation at Gillette
                Stadium or request a remote review after the event.
              </p>
            </div>

            <h2 className="mt-12 font-display font-bold text-3xl text-ink mb-6">What the checkup covers</h2>
            <ol className="space-y-4 max-w-2xl">
              {DELIVERABLES.map((d, i) => (
                <li key={d.title} className="flex gap-5 bg-canvas border-l-4 border-green-700 rounded-sm p-5">
                  <span className="font-display font-bold text-2xl text-ink-light leading-none">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold text-ink">{d.title}</span>
                    <span className="block text-ink-mid text-sm mt-1">{d.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:sticky lg:top-24">
            <CheckupForm />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-canvas">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-ink mb-6">Where manufacturers often lose ground</h2>
          <ul className="space-y-4">
            {[
              "RFQs and inquiries that sit in a shared inbox before anyone responds",
              "Quotes sent without a consistent follow-up",
              "Distributor and rep questions answered one email at a time",
              "Purchase orders, spec sheets and order details re-typed between systems",
              "A website that undersells real capabilities and certifications",
            ].map((item) => (
              <li key={item} className="border-l-2 border-brass pl-5 text-ink-mid">{item}</li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-ink-mid">
            Makr works with businesses across{" "}
            <Link href="/industries" className="underline underline-offset-4 decoration-brass hover:text-ink">five industries</Link>, with{" "}
            <Link href="/solutions" className="underline underline-offset-4 decoration-brass hover:text-ink">three connected services</Link>: websites, lead follow-up and AI workflow automation.
          </p>
          <a href="#request" data-cta="manufacturing-bottom" className="mt-8 inline-block bg-green-700 hover:bg-green-800 text-white px-7 py-3.5 rounded-sm font-semibold">
            Request My Checkup
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
