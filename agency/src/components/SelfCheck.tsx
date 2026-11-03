"use client";

import Link from "next/link";
import { useState } from "react";
import { SELF_CHECK, SOLUTIONS } from "@/lib/content";
import { track } from "@/lib/analytics";

const SHORT: Record<string, string> = {
  websites: "Websites",
  "search-content": "Search & content",
  "revenue-recovery": "Lead follow-up",
  "ai-workflows": "AI workflows",
};

// Owners tick what applies; each answer points to the service that fixes it.
export default function SelfCheck() {
  const [checked, setChecked] = useState<boolean[]>(() => SELF_CHECK.map(() => false));
  const count = checked.filter(Boolean).length;
  // Keep the services in SOLUTIONS order, not tick order.
  const fits = SOLUTIONS.filter((s) => SELF_CHECK.some((q, i) => checked[i] && q.solution === s.id));

  function toggle(i: number) {
    setChecked((prev) => {
      const next = prev.map((v, j) => (j === i ? !v : v));
      if (prev.every((v) => !v)) track("form_start", { form: "self-check" });
      return next;
    });
  }

  return (
    <div className="bg-white border border-brass-light rounded-xl overflow-hidden">
      <p className="px-5 py-4 border-b border-brass-light font-semibold text-ink">30-second check</p>
      <ul>
        {SELF_CHECK.map((q, i) => (
          <li key={q.text} className="border-b border-brass-light">
            <label htmlFor={`check-${i}`} className="grid grid-cols-[22px_1fr] sm:grid-cols-[22px_1fr_auto] gap-3 items-start px-5 py-3 cursor-pointer text-[15px] text-ink">
              <input id={`check-${i}`} type="checkbox" checked={checked[i]} onChange={() => toggle(i)} className="mt-1 w-[18px] h-[18px] accent-green-700" />
              <span>{q.text}</span>
              <span className="hidden sm:block text-[11px] font-bold text-ink-light whitespace-nowrap pt-1">{q.tag}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="px-5 py-4 bg-green-50 grid grid-cols-[auto_1fr] gap-4 items-center" aria-live="polite">
        <p className="font-display font-extrabold text-5xl leading-none text-ink">
          {count}<span className="text-lg text-ink-light">/{SELF_CHECK.length}</span>
        </p>
        {count === 0 ? (
          <p className="text-sm text-ink-mid"><b className="text-ink">Tick any that apply</b> to see where to start.</p>
        ) : (
          <div className="text-sm text-ink-mid">
            <p><b className="text-ink">Worth a Growth Gap Review.</b> Start here:</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {fits.map((s) => (
                <Link key={s.id} href={`/solutions#${s.id}`} className="text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-green-200 text-green-700 hover:border-green-700">
                  {SHORT[s.id]}
                </Link>
              ))}
            </div>
            <Link href="/contact" data-cta="self-check-book" className="mt-3 inline-block font-semibold text-green-700 hover:text-green-800">
              Book your Growth Gap Review →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
