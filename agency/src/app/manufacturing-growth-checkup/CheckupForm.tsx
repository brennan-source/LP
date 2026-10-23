"use client";

import { useState } from "react";
import { Field, ScheduleRedirect, inputClass, submitLead, useFormStart } from "@/components/forms";

const CHALLENGES = [
  "Website doesn't generate enough inquiries",
  "Slow or inconsistent RFQ and inquiry response",
  "Quotes that go cold without follow-up",
  "Distributor or rep communication",
  "Manual administrative work and data entry",
  "Something else",
];

export default function CheckupForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    website: "",
    challenge: "",
    meeting: "",
    consent: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const onStart = useFormStart("manufacturing-checkup");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitLead("/api/checkup", "manufacturing-checkup", form);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <ScheduleRedirect
        inline
        form="manufacturing-checkup"
        title="Your checkup request is in."
        body={
          form.meeting === "mash-up"
            ? "Next, pick a time to meet at the Mash-Up. If the calendar doesn't show the slot you want, we'll follow up within one business day."
            : "Next, pick a time for your remote review. If none of the times work, we'll follow up within one business day."
        }
      />
    );
  }

  return (
    <form id="request" onSubmit={handleSubmit} onFocus={onStart} className="bg-white border border-brass-light rounded-sm p-7 space-y-4 scroll-mt-24">
      <h2 className="font-display font-bold text-2xl text-ink">Request my checkup</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field id="name" label="Name" required>
          <input id="name" name="name" required autoComplete="name" value={form.name} onChange={handleChange} className={inputClass} />
        </Field>
        <Field id="company" label="Company" required>
          <input id="company" name="company" required autoComplete="organization" value={form.company} onChange={handleChange} className={inputClass} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field id="email" label="Email" required>
          <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="you@company.com" />
        </Field>
        <Field id="website" label="Website" required>
          <input id="website" name="website" type="url" required autoComplete="url" value={form.website} onChange={handleChange} className={inputClass} placeholder="https://yourcompany.com" />
        </Field>
      </div>
      <Field id="challenge" label="Primary challenge" required>
        <select id="challenge" name="challenge" required value={form.challenge} onChange={handleChange} className={inputClass}>
          <option value="">Select one</option>
          {CHALLENGES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>
      <fieldset>
        <legend className="block text-sm font-medium text-ink mb-2">Preferred meeting option<span aria-hidden> *</span></legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { value: "mash-up", label: "At the Mash-Up", note: "Gillette Stadium, October 27" },
            { value: "after-event", label: "After the event", note: "Remote review" },
          ].map((o) => (
            <label key={o.value} className={`flex items-start gap-3 border rounded-sm px-4 py-3 cursor-pointer ${form.meeting === o.value ? "border-green-700 bg-canvas-warm" : "border-brass-light"}`}>
              <input type="radio" name="meeting" value={o.value} required checked={form.meeting === o.value} onChange={handleChange} className="mt-1 accent-green-700" />
              <span>
                <span className="block text-sm font-semibold text-ink">{o.label}</span>
                <span className="block text-xs text-ink-mid">{o.note}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex items-start gap-3 text-sm text-ink-mid">
        <input type="checkbox" name="consent" required checked={form.consent} onChange={handleChange} className="mt-1 accent-green-700" />
        <span>I agree that Makr may contact me by email about this checkup.<span aria-hidden> *</span></span>
      </label>
      {status === "error" && <p className="text-red-700 text-sm" role="alert">{errorMsg}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-sm font-semibold text-base transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Request My Checkup"}
      </button>
    </form>
  );
}
