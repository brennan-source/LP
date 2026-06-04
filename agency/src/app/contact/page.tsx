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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
            <Link href="/" className="text-xl font-black text-amber-400 tracking-tight">Makr</Link>
          </div>
        </nav>
        <main className="pt-32 px-6">
          <div className="max-w-xl mx-auto text-center">
            <div className="text-5xl mb-6">🎉</div>
            <h1 className="text-3xl font-black text-white mb-4">You&apos;re on the list!</h1>
            <p className="text-slate-400 text-lg mb-6">We&apos;ll reach out within 24 hours with your free demo website. Keep an eye on your phone.</p>
            <Link href="/" className="text-amber-400 hover:text-amber-300 transition">← Back to home</Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-amber-400 tracking-tight">Makr</Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <Link href="/services" className="hover:text-white transition">Services</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white mb-3">Get your free website</h1>
            <p className="text-slate-400">Fill this out and we&apos;ll build a demo site for your business — free, no commitment required.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Your Name <span className="text-amber-400">*</span></label>
                <input type="text" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="John Smith" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Business Name <span className="text-amber-400">*</span></label>
                <input type="text" required value={form.businessName} onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))} placeholder="Smith's Plumbing" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone Number <span className="text-amber-400">*</span></label>
                <input type="tel" required value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="(617) 555-0100" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">City <span className="text-amber-400">*</span></label>
                  <input type="text" required value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} placeholder="Boston" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Industry <span className="text-amber-400">*</span></label>
                  <select required value={form.industry} onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                    <option value="">Select…</option>
                    {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Current Website (if any)</label>
                <input type="url" value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} placeholder="https://yoursite.com or leave blank" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Anything else?</label>
                <textarea rows={3} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} placeholder="Tell us about your business, goals, or any questions…" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm resize-none" />
              </div>
              {error && <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">{error}</p>}
              <button type="submit" disabled={submitting} className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-900 font-bold rounded-xl transition text-lg">
                {submitting ? "Sending…" : "Get My Free Website"}
              </button>
              <p className="text-slate-600 text-xs text-center">Free for 4 months. No contracts. You own the site after month 4.</p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
