"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Users, Plus, Search, LogOut } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  business: string;
  industry: string;
  city: string;
  state: string;
  status: string;
  product?: string;
  source: string;
  updatedAt: string;
  activities: { type: string; title: string; createdAt: string }[];
};

const STATUS_LABELS: Record<string, string> = {
  prospect: "Prospect",
  lead: "Lead",
  demo: "Demo",
  customer: "Customer",
};

const STATUS_COLORS: Record<string, string> = {
  prospect: "bg-slate-700 text-slate-300",
  lead: "bg-blue-900/50 text-blue-300",
  demo: "bg-amber-900/50 text-amber-300",
  customer: "bg-green-900/50 text-green-300",
};

const PRODUCT_COLORS: Record<string, string> = {
  lp: "bg-violet-900/50 text-violet-300",
  aria: "bg-pink-900/50 text-pink-300",
  both: "bg-indigo-900/50 text-indigo-300",
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", business: "", industry: "",
    city: "", state: "", status: "prospect", notes: "",
  });

  const fetchContacts = useCallback(async () => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (statusFilter) params.set("status", statusFilter);
    const res = await fetch(`/api/contacts?${params}`);
    const data = await res.json();
    setContacts(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  async function addContact(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowAdd(false);
      setForm({ name: "", email: "", phone: "", business: "", industry: "", city: "", state: "", status: "prospect", notes: "" });
      fetchContacts();
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  const counts = contacts.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white">CRM</span>
        </div>
        <button onClick={logout} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition">
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 mb-6">
          {(["prospect", "lead", "demo", "customer"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${
                statusFilter === s
                  ? "border-violet-500 bg-violet-900/30 text-violet-300"
                  : "border-slate-700 bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {STATUS_LABELS[s]} <span className="ml-1 opacity-60">{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contacts…"
              className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
            />
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Add contact
          </button>
        </div>

        {loading ? (
          <p className="text-slate-400 text-sm">Loading…</p>
        ) : contacts.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No contacts yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {contacts.map((c) => (
              <Link
                key={c.id}
                href={`/contacts/${c.id}`}
                className="block bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-slate-500 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-medium text-white">{c.name}</span>
                      <span className="text-slate-400 text-sm">{c.business}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      {c.email && <span>{c.email}</span>}
                      <span>{c.city}, {c.state}</span>
                      <span>{c.industry}</span>
                    </div>
                    {c.activities[0] && (
                      <p className="text-xs text-slate-500 mt-1 truncate">{c.activities[0].title}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {c.product && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRODUCT_COLORS[c.product] ?? "bg-slate-700 text-slate-300"}`}>
                        {c.product.toUpperCase()}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[c.status] ?? "bg-slate-700 text-slate-300"}`}>
                      {STATUS_LABELS[c.status] ?? c.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md p-6">
            <h2 className="font-semibold text-white mb-4">Add Contact</h2>
            <form onSubmit={addContact} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name *" className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                <input required value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} placeholder="Business *" className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                <input required value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} placeholder="Industry *" className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City *" className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                <input required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="State *" className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option value="prospect">Prospect</option>
                  <option value="lead">Lead</option>
                  <option value="demo">Demo</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notes" rows={2} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-2 border border-slate-600 text-slate-300 rounded-lg text-sm hover:bg-slate-700 transition">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-medium transition">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
