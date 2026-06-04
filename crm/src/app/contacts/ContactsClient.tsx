"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { STAGES } from "@/types/crm";
import type { Contact } from "@/types/crm";

const STAGE_COLORS: Record<string, string> = {
  prospect: "bg-slate-600 text-slate-200",
  contacted: "bg-blue-900 text-blue-200",
  demo_sent: "bg-yellow-900 text-yellow-200",
  postcard_sent: "bg-purple-900 text-purple-200",
  preview_visited: "bg-amber-800 text-amber-200",
  trial: "bg-orange-900 text-orange-200",
  customer: "bg-green-900 text-green-200",
  churned: "bg-red-900 text-red-200",
};

type WebsiteFilter = "" | "no_website" | "weak_website";

export default function ContactsClient() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [websiteFilter, setWebsiteFilter] = useState<WebsiteFilter>("");
  const [previewVisited, setPreviewVisited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    businessName: "",
    phone: "",
    city: "",
    state: "",
    industry: "",
  });
  const [addError, setAddError] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (stageFilter) params.set("stage", stageFilter);
    if (websiteFilter === "no_website") params.set("hasWebsite", "false");
    if (websiteFilter === "weak_website") params.set("weakWebsite", "true");
    if (previewVisited) params.set("previewVisited", "true");
    params.set("limit", "100");

    const res = await fetch(`/api/contacts?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setContacts(data.contacts);
      setTotal(data.total);
    }
    setLoading(false);
  }, [search, stageFilter, websiteFilter, previewVisited]);

  useEffect(() => {
    const timer = setTimeout(fetchContacts, 300);
    return () => clearTimeout(timer);
  }, [fetchContacts]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAddError("");
    setAddLoading(true);

    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...addForm, source: "manual" }),
    });

    if (res.ok) {
      setShowAdd(false);
      setAddForm({ email: "", firstName: "", lastName: "", businessName: "", phone: "", city: "", state: "", industry: "" });
      fetchContacts();
    } else {
      const data = await res.json();
      setAddError(data.error ?? "Failed to add contact");
    }
    setAddLoading(false);
  }

  function toggleWebsiteFilter(value: WebsiteFilter) {
    setWebsiteFilter((prev) => (prev === value ? "" : value));
    setPreviewVisited(false);
    setStageFilter("");
  }

  function togglePreviewVisited() {
    setPreviewVisited((prev) => !prev);
    setWebsiteFilter("");
    setStageFilter("");
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Contacts</h1>
          <p className="text-slate-400 text-sm mt-0.5">{total} total</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition"
        >
          + Add Contact
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-3">
        <input
          type="text"
          placeholder="Search contacts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
        />
        <select
          value={stageFilter}
          onChange={(e) => { setStageFilter(e.target.value); setWebsiteFilter(""); setPreviewVisited(false); }}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
        >
          <option value="">All stages</option>
          {STAGES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <button
          onClick={() => toggleWebsiteFilter("no_website")}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
            websiteFilter === "no_website"
              ? "bg-rose-900 border-rose-600 text-rose-200"
              : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
          }`}
        >
          No website
        </button>
        <button
          onClick={() => toggleWebsiteFilter("weak_website")}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
            websiteFilter === "weak_website"
              ? "bg-orange-900 border-orange-600 text-orange-200"
              : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
          }`}
        >
          Weak website
        </button>
        <button
          onClick={togglePreviewVisited}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
            previewVisited
              ? "bg-amber-900 border-amber-600 text-amber-200"
              : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
          }`}
        >
          Preview visited
        </button>
      </div>

      {/* Add Contact Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-lg shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Add Contact</h2>
              <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">First Name</label>
                  <input type="text" value={addForm.firstName} onChange={(e) => setAddForm((f) => ({ ...f, firstName: e.target.value }))} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Last Name</label>
                  <input type="text" value={addForm.lastName} onChange={(e) => setAddForm((f) => ({ ...f, lastName: e.target.value }))} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Email <span className="text-violet-400">*</span></label>
                <input type="email" required value={addForm.email} onChange={(e) => setAddForm((f) => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Business Name</label>
                <input type="text" value={addForm.businessName} onChange={(e) => setAddForm((f) => ({ ...f, businessName: e.target.value }))} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Phone</label>
                  <input type="text" value={addForm.phone} onChange={(e) => setAddForm((f) => ({ ...f, phone: e.target.value }))} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Industry</label>
                  <input type="text" value={addForm.industry} onChange={(e) => setAddForm((f) => ({ ...f, industry: e.target.value }))} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">City</label>
                  <input type="text" value={addForm.city} onChange={(e) => setAddForm((f) => ({ ...f, city: e.target.value }))} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">State</label>
                  <input type="text" value={addForm.state} onChange={(e) => setAddForm((f) => ({ ...f, state: e.target.value }))} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm" />
                </div>
              </div>
              {addError && <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">{addError}</p>}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition">Cancel</button>
                <button type="submit" disabled={addLoading} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition">
                  {addLoading ? "Adding…" : "Add Contact"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading…</div>
        ) : contacts.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            {search || stageFilter || websiteFilter || previewVisited
              ? "No contacts match your filters."
              : "No contacts yet. Add one or run the scraper."}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Name / Email</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium hidden md:table-cell">Business</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium hidden lg:table-cell">Location</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium hidden lg:table-cell">Website</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Stage</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, i) => (
                <tr
                  key={contact.id}
                  className={`hover:bg-slate-700/50 transition ${i < contacts.length - 1 ? "border-b border-slate-700/50" : ""}`}
                >
                  <td className="px-4 py-3">
                    <Link href={`/contacts/${contact.id}`} className="hover:text-violet-400 transition">
                      <div className="font-medium text-white">
                        {contact.firstName || contact.lastName
                          ? `${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim()
                          : <span className="text-slate-400 italic">No name</span>}
                      </div>
                      <div className="text-slate-400 text-xs mt-0.5">{contact.email}</div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-300 hidden md:table-cell">
                    {contact.businessName ?? <span className="text-slate-500">—</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-300 hidden lg:table-cell">
                    {contact.city && contact.state
                      ? `${contact.city}, ${contact.state}`
                      : contact.city ?? contact.state ?? <span className="text-slate-500">—</span>}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {!contact.hasWebsite ? (
                      <span className="inline-flex text-xs px-2 py-0.5 rounded-full font-medium bg-rose-900/60 text-rose-300">No website</span>
                    ) : contact.weakWebsite ? (
                      <span className="inline-flex text-xs px-2 py-0.5 rounded-full font-medium bg-orange-900/60 text-orange-300">
                        Weak {contact.auditScore !== null ? `(${contact.auditScore})` : ""}
                      </span>
                    ) : contact.auditScore !== null ? (
                      <span className="text-slate-400 text-xs">{contact.auditScore}/100</span>
                    ) : (
                      <span className="text-slate-500 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex text-xs px-2 py-0.5 rounded-full font-medium ${STAGE_COLORS[contact.stage] ?? "bg-slate-600 text-slate-200"}`}>
                      {STAGES.find((s) => s.value === contact.stage)?.label ?? contact.stage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
