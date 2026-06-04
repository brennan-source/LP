"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Contact } from "@/types/crm";

const TIERS = [
  { value: "starter", label: "Starter", price: 499, description: "Free website + SEO + 2 blog posts/mo + GMB" },
  { value: "growth", label: "Growth", price: 999, description: "Starter + Google Ads + social + email newsletter" },
  { value: "scale", label: "Scale", price: 1499, description: "Growth + AI chat + CRM + automated follow-up" },
];

export default function NewClientClient() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactSearch, setContactSearch] = useState("");
  const [form, setForm] = useState({
    contactId: "",
    tier: "starter",
    monthlyRate: 499,
    startDate: new Date().toISOString().slice(0, 10),
    framerUrl: "",
    domain: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams({ stage: "customer", limit: "200" });
    if (contactSearch) params.set("search", contactSearch);
    fetch(`/api/contacts?${params}`)
      .then((r) => r.json())
      .then((data) => setContacts(data.contacts ?? []));
  }, [contactSearch]);

  function handleTierChange(tier: string) {
    const t = TIERS.find((t) => t.value === tier);
    setForm((f) => ({ ...f, tier, monthlyRate: t?.price ?? f.monthlyRate }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/clients/${data.client.id}`);
    } else {
      const data = await res.json();
      setError(data.error ?? "Failed to create client");
    }
    setSaving(false);
  }

  const selectedContact = contacts.find((c) => c.id === form.contactId);

  return (
    <div className="p-6 max-w-2xl">
      <Link href="/clients" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition mb-5">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to clients
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Onboard Client</h1>
        <p className="text-slate-400 text-sm mt-0.5">Convert a contact to a retainer client</p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Contact search */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Contact <span className="text-violet-400">*</span></label>
            <input
              type="text"
              placeholder="Search contacts by name or business…"
              value={contactSearch}
              onChange={(e) => setContactSearch(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm mb-2"
            />
            <select
              required
              value={form.contactId}
              onChange={(e) => setForm((f) => ({ ...f, contactId: e.target.value }))}
              className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            >
              <option value="">Select a contact…</option>
              {contacts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.businessName ?? `${c.firstName ?? ""} ${c.lastName ?? ""}`.trim()} — {c.city}{c.state ? `, ${c.state}` : ""}
                </option>
              ))}
            </select>
            {selectedContact && (
              <p className="text-xs text-slate-500 mt-1">{selectedContact.email} · {selectedContact.industry}</p>
            )}
          </div>

          {/* Tier */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Service Tier <span className="text-violet-400">*</span></label>
            <div className="space-y-2">
              {TIERS.map((tier) => (
                <button
                  key={tier.value}
                  type="button"
                  onClick={() => handleTierChange(tier.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition ${
                    form.tier === tier.value
                      ? "border-violet-500 bg-violet-900/30"
                      : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white text-sm">{tier.label}</span>
                    <span className="text-green-400 font-bold">${tier.price}<span className="text-slate-500 font-normal text-xs">/mo</span></span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{tier.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Monthly rate override */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Monthly Rate ($) <span className="text-violet-400">*</span></label>
            <input
              type="number"
              required
              min={1}
              value={form.monthlyRate}
              onChange={(e) => setForm((f) => ({ ...f, monthlyRate: parseInt(e.target.value) || 0 }))}
              className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            />
          </div>

          {/* Start date */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Start Date <span className="text-violet-400">*</span></label>
            <input
              type="date"
              required
              value={form.startDate}
              onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
              className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            />
          </div>

          {/* Framer URL */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Framer Site URL</label>
            <input
              type="url"
              placeholder="https://their-site.framer.website"
              value={form.framerUrl}
              onChange={(e) => setForm((f) => ({ ...f, framerUrl: e.target.value }))}
              className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            />
          </div>

          {/* Domain */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Custom Domain</label>
            <input
              type="text"
              placeholder="theirbusiness.com"
              value={form.domain}
              onChange={(e) => setForm((f) => ({ ...f, domain: e.target.value }))}
              className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Notes</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              placeholder="Any onboarding notes, special terms, context…"
              className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm resize-y"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Link href="/clients" className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition">Cancel</Link>
            <button type="submit" disabled={saving || !form.contactId} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition">
              {saving ? "Onboarding…" : "Onboard Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
