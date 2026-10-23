import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CtaBand, PageHeader } from "@/components/sections";
import { SOLUTIONS } from "@/lib/content";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — A Practical Growth & Automation Partner Built in New England",
  description:
    "Makr is a New England growth and automation partner for owner-led businesses: websites, lead follow-up and practical AI workflows, implemented and supported for the long term.",
  alternates: { canonical: "/about" },
};

const GEOGRAPHY = [
  "Greater Boston", "North Shore MA", "Merrimack Valley", "Southern NH", "MetroWest", "Expanding across New England",
];

const IDEAL = [
  "Rely on a steady flow of inquiries, estimates or appointments",
  "Lose opportunities because follow-up is inconsistent",
  "Depend on spreadsheets, inboxes or manual handoffs",
  "Have an outdated or underperforming website",
  "Want practical automation without hiring a technical team",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav activePath="/about" />

      <PageHeader
        title="A practical growth and automation partner for owner-led businesses."
        intro="We build the digital systems that help growing businesses get found, capture more opportunities and operate with less manual work."
      />

      {/* Founder */}
      <section className="py-20 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[16rem_1fr] gap-x-12 gap-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-ink-mid">Founder</p>
            <h2 className="mt-3 font-display font-bold text-4xl text-ink leading-tight">A person accountable for the work.</h2>
          </div>
          <div className="max-w-2xl space-y-5 text-ink-mid text-lg leading-relaxed">
            <p>
              I&apos;m Brennan Burks, founder of Makr. For 13 years I&apos;ve led communications and marketing for organizations
              in manufacturing, financial services, biotech and higher education — including corporate communications for a
              $1B division of a global paper manufacturer, and an independent practice advising founders on how to explain
              what they do and win the right customers.
            </p>
            <p>
              The pattern is the same everywhere: good businesses lose opportunities because their website undersells them,
              follow-up depends on memory, and their teams are buried in manual work. Makr fixes those basics — and I&apos;m
              personally responsible for every engagement.
            </p>
            <p className="text-base">
              <span className="font-semibold text-ink">Brennan Burks</span> · Westford, Massachusetts ·{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 decoration-brass hover:text-ink">{CONTACT_EMAIL}</a>
            </p>
          </div>
        </div>
      </section>

      {/* Built in New England */}
      <section className="py-16 px-6 bg-green-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display font-bold text-4xl text-white mb-5">Built in New England.</h2>
            <p className="text-green-100 text-lg leading-relaxed mb-4">
              Makr is based in New England and works with businesses across Massachusetts, New Hampshire and beyond — not as a distant software vendor, but as a partner who picks up the phone and builds things that fit how your operation actually runs.
            </p>
            <p className="text-green-100 leading-relaxed">
              Working close to our clients is how we learn what works, and it means problems get fixed quickly.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {GEOGRAPHY.map((g) => (
              <span key={g} className="text-sm bg-green-700 text-white px-4 py-2 rounded-sm">{g}</span>
            ))}
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="py-16 px-6 bg-white border-b border-brass-light">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-ink mb-8">What we believe</h2>
          <div className="space-y-6 text-ink-mid text-lg leading-relaxed">
            <p>
              Most growing businesses aren&apos;t held back by one big failure. They lose ground in small gaps: a website that doesn&apos;t convert, an inquiry nobody followed up on, a quote that went cold, hours of copying information between tools.
            </p>
            <p>
              Closing those gaps is less about technology than about getting the basics to work together. AI is a useful tool for that — but it is one capability, not the whole answer.
            </p>
            <p>
              So we start with the bottleneck, build the fix that matters most, connect it to the tools you already use and stay involved to keep improving it.
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-ink mb-10">Three services. One connected system.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {SOLUTIONS.map((s) => (
              <Link key={s.id} href={`/solutions#${s.id}`} className="group bg-white border-l-4 border-green-700 rounded-sm p-6">
                <h3 className="font-semibold text-ink mb-2 group-hover:text-green-700">{s.name}</h3>
                <p className="text-ink-mid text-sm leading-relaxed">{s.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-16 px-6 bg-white border-t border-brass-light">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-ink mb-6">Who we work with</h2>
          <p className="text-ink-mid leading-relaxed mb-6">
            Owner-led and operationally complex businesses across{" "}
            <Link href="/industries" className="underline underline-offset-4 decoration-brass hover:text-ink">home services, professional services, personal services, manufacturing and B2B services</Link>{" "}
            that:
          </p>
          <ul className="space-y-3">
            {IDEAL.map((item) => (
              <li key={item} className="border-l-2 border-brass pl-5 text-ink-mid">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand name="about-bottom" title="Ready to talk?" body="Book a short Growth Gap Review. We'll tell you honestly where we can help and what we'd do first." />
      <Footer />
    </div>
  );
}
