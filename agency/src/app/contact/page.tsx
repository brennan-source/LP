"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";

const INDUSTRIES = [
  "HVAC", "Plumbing", "Roofing", "Electrical", "Landscaping",
  "Painting", "Pest Control", "Pressure Washing", "Pool Service", "Handyman", "Other",
];

const FREE_BUILDS = [
  "Professional website",
  "Online booking system",
  "AI voice agent",
  "AI chat widget",
  "First automation (quotes, invoices, or follow-up)",
  "Local SEO / GBP optimization",
  "Not sure yet — help me decide",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    phone: "",
    city: "",
    industry: "",
    freeBuild: "",
    website: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong. Try emailing brennan@gomakr.ai directly.");
    }
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <>
        <Nav />
        <main className="pt-32 px-6 bg-white min-h-screen">
          <div className="max-w-xl mx-auto text-center">
            <div className="text-5xl mb-6">✅</div>
            <h1 className="text-3xl font-black text-stone-900 mb-4">You&apos;re all set.</h1>
            <p className="text-stone-500 text-lg mb-6">We&apos;ll review your info and reach out within 24 hours — usually faster. Before we call, we&apos;ll pull a quick audit of your online presence so we come prepared.</p>
            <Link href="/" className="text-green-700 hover:text-green-600 transition">← Back to home</Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />

      <main className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-stone-900 mb-3">Book a Revenue Assessment</h1>
            <p className="text-stone-500">Tell us about your business and we&apos;ll show you exactly how many calls you&apos;re missing and what they&apos;re worth. Free, no commitment.</p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Your Name <span className="text-green-700">*</span></label>
                <input type="text" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="John Smith" className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Business Name <span className="text-green-700">*</span></label>
                <input type="text" required value={form.businessName} onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))} placeholder="Smith's Plumbing" className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone Number <span className="text-green-700">*</span></label>
                <input type="tel" required value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="(617) 555-0100" className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">City <span className="text-green-700">*</span></label>
                  <input type="text" required value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} placeholder="Boston" className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Industry <span className="text-green-700">*</span></label>
                  <select required value={form.industry} onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))} className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm">
                    <option value="">Select…</option>
                    {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">What free build interests you most? <span className="text-green-700">*</span></label>
                <select required value={form.freeBuild} onChange={(e) => setForm((f) => ({ ...f, freeBuild: e.target.value }))} className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm">
                  <option value="">Select…</option>
                  {FREE_BUILDS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Current Website (if any)</label>
                <input type="url" value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} placeholder="https://yoursite.com or leave blank" className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Anything else?</label>
                <textarea rows={3} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} placeholder="Tell us about your business, goals, or any questions…" className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm resize-none" />
              </div>
              {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
              <button type="submit" disabled={submitting} className="w-full py-4 bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white font-bold rounded-xl transition text-lg">
                {submitting ? "Sending…" : "Claim My Free Build"}
              </button>
              <p className="text-stone-400 text-xs text-center">No setup fee. 4-month agreement. You own the build after month 4.</p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
