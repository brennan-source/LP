"use client";

import { useState } from "react";
import Link from "next/link";

const INDUSTRIES = [
  "HVAC", "Plumbing", "Roofing", "Electrical", "Landscaping",
  "Painting", "Pest Control", "Pressure Washing", "Pool Service", "Handyman", "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    phone: "",
    city: "",
    industry: "",
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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
            <Link href="/" className="text-xl font-black text-green-800 tracking-tight">Makr<span className="text-stone-400 font-medium">.ai</span></Link>
          </div>
        </nav>
        <main className="pt-32 px-6 bg-white min-h-screen">
          <div className="max-w-xl mx-auto text-center">
            <div className="text-5xl mb-6">🎉</div>
            <h1 className="text-3xl font-black text-stone-900 mb-4">You&apos;re on the list!</h1>
            <p className="text-stone-500 text-lg mb-6">We&apos;ll reach out within 24 hours with your free demo website. Keep an eye on your phone.</p>
            <Link href="/" className="text-green-700 hover:text-green-600 transition">← Back to home</Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-green-800 tracking-tight">Makr<span className="text-stone-400 font-medium">.ai</span></Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-stone-500">
            <Link href="/services" className="hover:text-stone-900 transition">Services</Link>
            <Link href="/pricing" className="hover:text-stone-900 transition">Pricing</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-stone-900 mb-3">Claim your free build</h1>
            <p className="text-stone-500">Tell us about your business and pick what you need most — website, booking system, voice agent, or automation. Included with any plan, no setup fee.</p>
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
              <p className="text-stone-400 text-xs text-center">No setup fee. 4-month agreement. You own the site after month 4.</p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
