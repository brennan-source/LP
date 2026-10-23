"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import { Field, ScheduleRedirect, inputClass, submitLead, useFormStart } from "@/components/forms";
import { BOOKING_URL, LOCAL_LINE } from "@/lib/site";

const BUSINESS_TYPES = [
  { value: "home-services", label: "Home Services" },
  { value: "professional-services", label: "Professional Services" },
  { value: "personal-services", label: "Personal Services" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "b2b-services", label: "B2B Services" },
  { value: "other", label: "Other" },
];

const REVENUE_RANGES = [
  { value: "under-500k", label: "Under $500K" },
  { value: "500k-1m", label: "$500K – $1M" },
  { value: "1m-3m", label: "$1M – $3M" },
  { value: "3m-10m", label: "$3M – $10M" },
  { value: "10m-30m", label: "$10M – $30M" },
  { value: "over-30m", label: "Over $30M" },
];

const FOCUS = [
  { value: "website", label: "Our website" },
  { value: "follow-up", label: "Lead follow-up" },
  { value: "workflows", label: "Manual work and workflows" },
  { value: "not-sure", label: "Not sure yet" },
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    serviceCategory: "",
    industry: "",
    revenue: "",
    focus: "",
    website: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const onStart = useFormStart("contact");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitLead("/api/contact", "contact", form);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-canvas text-ink">
        <Nav activePath="/contact" />
        <ScheduleRedirect form="contact" title="Thanks — we've got your details." body="Next, pick a time for your Growth Gap Review. If none of the times work, we'll follow up within one business day." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav activePath="/contact" />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2 pt-4">
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight mb-4">
              Book a Growth Gap Review
            </h1>
            <p className="text-ink-mid leading-relaxed mb-8">
              Tell us a little about your business, then pick a time. We&apos;ll look for the clearest opportunities across your website, follow-up process and internal workflows.
            </p>
            <div className="space-y-4 border-l-2 border-brass pl-5">
              <div>
                <p className="font-semibold text-ink text-sm">Complimentary</p>
                <p className="text-ink-mid text-sm">A short conversation, no obligation.</p>
              </div>
              <div>
                <p className="font-semibold text-ink text-sm">Based in New England</p>
                <p className="text-ink-mid text-sm">{LOCAL_LINE.replace("Built in New England. ", "")}</p>
              </div>
              <div>
                <p className="font-semibold text-ink text-sm">One business day response</p>
                <p className="text-ink-mid text-sm">We review every submission personally.</p>
              </div>
            </div>
            <p className="mt-8 text-sm text-ink-mid">
              Prefer to skip the form?{" "}
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta="contact-direct-calendar" className="underline underline-offset-4 decoration-brass hover:text-ink">
                Pick a time on our calendar
              </a>
              .
            </p>
          </div>

          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} onFocus={onStart} className="bg-white border border-brass-light rounded-sm p-7 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="name" label="Name" required>
                  <input id="name" name="name" required autoComplete="name" value={form.name} onChange={handleChange} className={inputClass} />
                </Field>
                <Field id="businessName" label="Business name" required>
                  <input id="businessName" name="businessName" required autoComplete="organization" value={form.businessName} onChange={handleChange} className={inputClass} />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="phone" label="Phone" required>
                  <input id="phone" name="phone" type="tel" required autoComplete="tel" value={form.phone} onChange={handleChange} className={inputClass} placeholder="(555) 555-5555" />
                </Field>
                <Field id="email" label="Email" required>
                  <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="you@company.com" />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="serviceCategory" label="Type of business" required>
                  <select id="serviceCategory" name="serviceCategory" required value={form.serviceCategory} onChange={handleChange} className={inputClass}>
                    <option value="">Select one</option>
                    {BUSINESS_TYPES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </Field>
                <Field id="industry" label="Industry or trade" required>
                  <input id="industry" name="industry" required value={form.industry} onChange={handleChange} className={inputClass} placeholder="e.g. HVAC, CPA firm, machine shop" />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="revenue" label="Annual revenue">
                  <select id="revenue" name="revenue" value={form.revenue} onChange={handleChange} className={inputClass}>
                    <option value="">Select range</option>
                    {REVENUE_RANGES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </Field>
                <Field id="focus" label="Where do you want help first?">
                  <select id="focus" name="focus" value={form.focus} onChange={handleChange} className={inputClass}>
                    <option value="">Select one</option>
                    {FOCUS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                  </select>
                </Field>
              </div>
              <Field id="website" label="Website">
                <input id="website" name="website" type="url" autoComplete="url" value={form.website} onChange={handleChange} className={inputClass} placeholder="https://yourcompany.com" />
              </Field>
              <Field id="message" label="Anything else?">
                <textarea id="message" name="message" rows={3} value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Your biggest challenge, or what you're hoping to accomplish." />
              </Field>
              {status === "error" && <p className="text-red-700 text-sm" role="alert">{errorMsg}</p>}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-sm font-semibold text-base transition-colors disabled:opacity-60"
              >
                {status === "loading" ? "Submitting…" : "Continue to scheduling"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
