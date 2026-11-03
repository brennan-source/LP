"use client";

import { useRef, useState } from "react";
import { SAMPLE_REPORTS } from "@/lib/content";
import { track } from "@/lib/analytics";
import SampleReport from "@/components/SampleReport";

// Hero visual: one sample week per industry, switched with accessible tabs
// (WAI-ARIA tabs pattern; arrow keys move between tabs).
export default function IndustrySwitcher() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number) {
    setActive(i);
    track("cta_click", { cta: `industry-tab-${SAMPLE_REPORTS[i].key}` });
  }

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % SAMPLE_REPORTS.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + SAMPLE_REPORTS.length) % SAMPLE_REPORTS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = SAMPLE_REPORTS.length - 1;
    else return;
    e.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  }

  return (
    <figure className="min-w-0">
      <p className="text-sm font-semibold text-ink-mid mb-2.5" id="switcher-label">What does this look like for a business like yours?</p>
      <div role="tablist" aria-labelledby="switcher-label" className="flex gap-1.5 mb-3 overflow-x-auto pb-1 sm:flex-wrap">
        {SAMPLE_REPORTS.map((r, i) => (
          <button
            key={r.key}
            ref={(el) => { tabs.current[i] = el; }}
            role="tab"
            id={`tab-${r.key}`}
            aria-selected={active === i}
            aria-controls="sample-report"
            tabIndex={active === i ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`shrink-0 whitespace-nowrap text-sm font-semibold px-3.5 py-2 rounded-full border transition-colors ${
              active === i ? "bg-ink border-ink text-white" : "bg-white border-brass-light text-ink-mid hover:text-ink"
            }`}
          >
            {r.tab}
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-labelledby={`tab-${SAMPLE_REPORTS[active].key}`}>
        <SampleReport report={SAMPLE_REPORTS[active]} id="sample-report" />
      </div>
      <figcaption className="mt-3 text-xs text-ink-light">Sample for a fictional business. Not client data or a results claim.</figcaption>
    </figure>
  );
}
