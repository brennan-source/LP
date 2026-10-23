"use client";

import { useEffect, useRef } from "react";
import { BOOKING_URL } from "@/lib/site";
import { track, trackThenGo } from "@/lib/analytics";

// Shared pieces for the lead forms (/contact and the manufacturing checkup).

export const inputClass =
  "w-full border border-brass-light bg-canvas-warm rounded-sm px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder:text-ink-light";

export function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink mb-1">
        {label}
        {required ? <span aria-hidden> *</span> : <span className="text-ink-light font-normal"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

// Returns a handler that fires form_start once, on the visitor's first interaction.
export function useFormStart(form: string) {
  const started = useRef(false);
  return () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form, page: window.location.pathname });
  };
}

export async function submitLead(endpoint: string, form: string, payload: Record<string, unknown>) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Something went wrong.");
  }
  track("form_submit", { form, page: window.location.pathname });
}

// Shown after a successful submission; sends the visitor on to the scheduler.
// `inline` renders it inside a page that already has an h1 (e.g. beside a form).
export function ScheduleRedirect({ form, title, body, inline }: { form: string; title: string; body: string; inline?: boolean }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const Heading = inline ? "h2" : "h1";
  useEffect(() => {
    heading.current?.focus();
    const t = setTimeout(() => trackThenGo("schedule_click", { cta: `${form}-auto`, form }, BOOKING_URL), 2500);
    return () => clearTimeout(t);
  }, [form]);

  return (
    <div className={`${inline ? "bg-white border border-brass-light rounded-sm p-7" : "pt-32 pb-20 px-6"} text-center max-w-xl mx-auto`} role="status">
      <div className="text-5xl mb-6 text-green-700" aria-hidden>✓</div>
      <Heading ref={heading} tabIndex={-1} className="font-display font-bold text-4xl mb-4 outline-none">{title}</Heading>
      <p className="text-ink-mid text-lg">{body}</p>
      <p className="mt-6 text-ink-mid text-sm">Taking you to our calendar to pick a time…</p>
      <a href={BOOKING_URL} data-cta={`${form}-schedule`} className="mt-6 inline-block bg-green-700 hover:bg-green-800 text-white px-7 py-3.5 rounded-sm font-semibold">
        Choose a meeting time
      </a>
    </div>
  );
}
