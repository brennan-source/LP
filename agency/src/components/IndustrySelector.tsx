"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { CONCEPTS, ConceptScreen } from "@/components/visuals";

const AUDIENCES = [
  {
    id: "service",
    tab: "Service businesses",
    title: "Home services, practices and appointment-driven businesses",
    body: "When someone calls or books, the first business to respond usually wins. We make the next step obvious, catch the calls that would have gone to voicemail and keep customers coming back.",
    starts: ["Missed-call text back", "Online booking and reminders", "Estimate follow-up", "Review requests"],
    links: [
      { href: "/industries/home-services", label: "Home services" },
      { href: "/industries/personal-services", label: "Personal services and practices" },
    ],
    concept: "home-services",
  },
  {
    id: "professional",
    tab: "Professional & B2B",
    title: "Firms that win on responsiveness and trust",
    body: "Accounting, legal, consulting, engineering and B2B service firms lose prospects to slow replies and forgotten proposals. We help you respond quickly, follow up consistently and spend less time on intake.",
    starts: ["Fast first response to inquiries", "Consultation booking", "Proposal follow-up", "Intake and document collection"],
    links: [
      { href: "/industries/professional-services", label: "Professional services" },
      { href: "/industries#b2b-services", label: "B2B services" },
    ],
    concept: "practice",
  },
  {
    id: "manufacturers",
    tab: "Manufacturers",
    title: "Manufacturers with a disciplined production process",
    body: "Your website should show real capabilities, and RFQs shouldn't wait in a shared inbox. We help you turn interest into qualified quotes and cut the paperwork around orders.",
    starts: ["RFQ intake and routing", "Quote follow-up", "Distributor and rep communication", "PO and document processing"],
    links: [
      { href: "/manufacturing-growth-checkup", label: "Manufacturing Growth Checkup" },
      { href: "/industries#manufacturing", label: "Manufacturing" },
    ],
    concept: "manufacturer",
  },
];

// Accessible tabs (WAI-ARIA tabs pattern): arrow keys move between audiences.
export default function IndustrySelector() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const a = AUDIENCES[active];
  const concept = CONCEPTS.find((c) => c.id === a.concept)!;

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % AUDIENCES.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + AUDIENCES.length) % AUDIENCES.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = AUDIENCES.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Choose your type of business" className="flex flex-wrap gap-2 border-b border-brass-light">
        {AUDIENCES.map((aud, i) => (
          <button
            key={aud.id}
            ref={(el) => { tabs.current[i] = el; }}
            role="tab"
            id={`tab-${aud.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${aud.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`min-h-11 px-4 py-3 -mb-px border-b-2 text-sm font-semibold transition-colors ${i === active ? "border-green-700 text-ink" : "border-transparent text-ink-mid hover:text-ink"}`}
          >
            {aud.tab}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${a.id}`} aria-labelledby={`tab-${a.id}`} tabIndex={0} className="pt-10 grid lg:grid-cols-[5fr_7fr] gap-10 items-start">
        <div>
          <h3 className="font-display font-bold text-3xl text-ink leading-tight">{a.title}</h3>
          <p className="mt-4 text-ink-mid">{a.body}</p>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-ink-mid">Where we often start</p>
          <ul className="mt-3 space-y-2">
            {a.starts.map((s) => (
              <li key={s} className="border-l-2 border-green-700 pl-4 text-ink">{s}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {a.links.map((l) => (
              <Link key={l.href} href={l.href} className="inline-block py-2 font-semibold text-green-700 hover:text-green-800 underline underline-offset-4 decoration-brass-light">
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
        <figure>
          <ConceptScreen concept={concept} size="md" />
          <figcaption className="mt-3 text-xs text-ink-light">Concept design for a fictional {concept.industry.toLowerCase()} — not a client project.</figcaption>
        </figure>
      </div>
    </div>
  );
}
