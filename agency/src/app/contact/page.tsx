"use client";

import { useState } from "react";
import Nav from "@/components/Nav";

const INDUSTRIES = [
  "HVAC", "Plumbing", "Roofing", "Electrical", "Restoration",
  "Landscaping", "Pest Control", "Accounting / Tax", "Legal",
  "Consulting", "Dental", "Veterinary", "Med Spa / Aesthetics",
  "Wellness / Therapy", "Fitness", "Beauty / Salon", "Other",
];

const SERVICE_CATEGORIES = [
  { value: "home-services", label: "Home Services" },
  { value: "professional-services", label: "Professional Services" },
  { value: "personal-services", label: "Personal Services" },
];

const REVENUE_RANGES = [
  { value: "under-500k", label: "Under $500K" },
  { value: "500k-1m", label: "$500K – $1M" },
  { value: "1m-3m", label: "$1M – $3M" },
  { value: "3m-10m", label: "$3M – $10M" },
  { value: "10m-30m", label: "$10M – $30M" },
  { value: "over-30m", label: "Over $30M" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    serviceCategory: "",
    industry: "",
    revenue: "",
    website: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-stone-50 text-stone-800">
        <Nav />
        <div className="pt-32 pb-20 px-6 text-center max-w-xl mx-auto">
          <div className="text-5xl mb-6">✓</div>
          <h1 className="text-3xl font-bold mb-4">We&apos;ll be in touch soon.</h1>
          <p className="text-stone-600 text-lg">
            Thanks for reaching out. We review every request and will follow up within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Nav />
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-700 mb-4">Get Started</p>
            <h1 className="text-4xl font-bold text-stone-900 mb-4">Book an AI Opportunity Assessment</h1>
            <p className="text-stone-600 text-lg">
              Tell us about your business. We&apos;ll review your submission and follow up to schedule a conversation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Name *</label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Business Name *</label>
                <input
                  name="businessName"
                  required
                  value={form.businessName}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your company"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Phone *</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="(555) 555-5555"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Type of service business *</label>
              <select
                name="serviceCategory"
                required
                value={form.serviceCategory}
                onChange={handleChange}
                className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select category</option>
                {SERVICE_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Industry *</label>
              <select
                name="industry"
                required
                value={form.industry}
                onChange={handleChange}
                className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Annual revenue (approximate) *</label>
              <select
                name="revenue"
                required
                value={form.revenue}
                onChange={handleChange}
                className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select range</option>
                {REVENUE_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Website (optional)</label>
              <input
                name="website"
                type="url"
                value={form.website}
                onChange={handleChange}
                className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="https://yourcompany.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Anything else you&apos;d like us to know? (optional)</label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                placeholder="Tell us about your biggest challenge, or what you're hoping to accomplish."
              />
            </div>

            {status === "error" && (
              <p className="text-red-600 text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-green-700 text-white py-3.5 rounded-lg font-semibold text-base hover:bg-green-800 transition disabled:opacity-60"
            >
              {status === "loading" ? "Submitting..." : "Book My Assessment"}
            </button>

            <p className="text-center text-xs text-stone-400">
              Complimentary for qualified service businesses. Based in New England, serving contractors across MA, NH, and beyond.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
