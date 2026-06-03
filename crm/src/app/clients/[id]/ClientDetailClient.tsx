"use client";

import { useState } from "react";
import Link from "next/link";
import type { Client } from "@/types/crm";

const MONTHLY_TASKS: Record<string, string[]> = {
  starter: ["Blog post published", "GMB post", "Rankings check"],
  growth: ["Blog post published", "GMB post", "Rankings check", "Ad spend reviewed", "Social posts scheduled", "Email sent"],
  scale: ["Blog post published", "GMB post", "Rankings check", "Ad spend reviewed", "Social posts scheduled", "Email sent", "AI chat logs reviewed", "Automation health check", "CRM audit"],
};

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "churned", label: "Churned" },
];

const TIER_OPTIONS = [
  { value: "starter", label: "Starter — $499/mo" },
  { value: "growth", label: "Growth — $999/mo" },
  { value: "scale", label: "Scale — $1,499/mo" },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function monthsSince(dateStr: string): number {
  const start = new Date(dateStr);
  const now = new Date();
  return (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
}

interface Props {
  client: Client;
}

export default function ClientDetailClient({ client: initial }: Props) {
  const [client, setClient] = useState<Client>(initial);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    tier: client.tier,
    monthlyRate: client.monthlyRate,
    framerUrl: client.framerUrl ?? "",
    domain: client.domain ?? "",
    status: client.status,
    notes: client.notes ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  const tasks = MONTHLY_TASKS[client.tier] ?? [];
  const completedCount = tasks.filter((t) => checkedTasks[t]).length;
  const months = monthsSince(client.startDate);
  const contractMonthsLeft = Math.max(0, 4 - months);

  async function handleSave() {
    setSaving(true);
    setSaveError("");
    const res = await fetch(`/api/clients/${client.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      setClient(data.client);
      setEditing(false);
    } else {
      const data = await res.json();
      setSaveError(data.error ?? "Save failed");
    }
    setSaving(false);
  }

  const contact = client.contact;

  return (
    <div className="p-6 max-w-4xl">
      <Link href="/clients" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition mb-5">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to clients
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{contact?.businessName ?? "Unknown Business"}</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {contact?.city}{contact?.state ? `, ${contact.state}` : ""}
            {contact?.industry ? ` · ${contact.industry}` : ""}
          </p>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <button onClick={() => { setEditing(false); setSaveError(""); }} className="px-3 py-1.5 text-slate-300 hover:text-white text-sm transition">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition">
                {saving ? "Saving…" : "Save"}
              </button>
            </>
          ) : (
            <>
              {contact && (
                <Link href={`/contacts/${client.contactId}`} className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition">
                  View Contact
                </Link>
              )}
              <button onClick={() => setEditing(true)} className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition">
                Edit
              </button>
            </>
          )}
        </div>
      </div>

      {saveError && <div className="mb-4 px-3 py-2 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">{saveError}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: tasks + notes */}
        <div className="lg:col-span-2 space-y-5">
          {/* Monthly tasks checklist */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Monthly Tasks</h2>
              <span className={`text-xs font-medium ${completedCount === tasks.length ? "text-green-400" : "text-slate-400"}`}>
                {completedCount}/{tasks.length} done
              </span>
            </div>
            {tasks.length === 0 ? (
              <p className="text-slate-500 text-sm">No tasks configured for this tier.</p>
            ) : (
              <div className="space-y-2">
                {tasks.map((task) => (
                  <label key={task} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={!!checkedTasks[task]}
                      onChange={(e) => setCheckedTasks((prev) => ({ ...prev, [task]: e.target.checked }))}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-violet-600 focus:ring-violet-500"
                    />
                    <span className={`text-sm ${checkedTasks[task] ? "line-through text-slate-500" : "text-slate-300"}`}>{task}</span>
                  </label>
                ))}
              </div>
            )}
            <p className="text-xs text-slate-600 mt-4">Checkboxes reset each session — use notes to log completion.</p>
          </div>

          {/* Notes */}
          {editing ? (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Notes</h2>
              <textarea
                rows={5}
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm resize-y"
                placeholder="Client notes, special requirements, context…"
              />
            </div>
          ) : client.notes ? (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Notes</h2>
              <p className="text-slate-300 text-sm whitespace-pre-wrap">{client.notes}</p>
            </div>
          ) : null}
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Client info */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-4">Retainer</h2>
            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Tier</label>
                  <select value={form.tier} onChange={(e) => setForm((f) => ({ ...f, tier: e.target.value }))} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none text-sm">
                    {TIER_OPTIONS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Monthly Rate ($)</label>
                  <input type="number" value={form.monthlyRate} onChange={(e) => setForm((f) => ({ ...f, monthlyRate: parseInt(e.target.value) || 0 }))} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none text-sm">
                    {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Framer URL</label>
                  <input type="url" value={form.framerUrl} onChange={(e) => setForm((f) => ({ ...f, framerUrl: e.target.value }))} placeholder="https://..." className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Domain</label>
                  <input type="text" value={form.domain} onChange={(e) => setForm((f) => ({ ...f, domain: e.target.value }))} placeholder="theirbusiness.com" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none text-sm" />
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-500 text-xs">Monthly rate</p>
                  <p className="text-green-400 text-xl font-bold">${client.monthlyRate.toLocaleString()}<span className="text-slate-500 text-xs font-normal">/mo</span></p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Tier</p>
                  <p className="text-slate-300 capitalize">{client.tier}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Status</p>
                  <p className={`capitalize font-medium ${client.status === "active" ? "text-green-400" : client.status === "paused" ? "text-yellow-400" : "text-red-400"}`}>{client.status}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Start date</p>
                  <p className="text-slate-300">{formatDate(client.startDate)}</p>
                </div>
                {contractMonthsLeft > 0 && (
                  <div>
                    <p className="text-slate-500 text-xs">Agreement</p>
                    <p className="text-amber-400 text-xs">{contractMonthsLeft} month{contractMonthsLeft !== 1 ? "s" : ""} left on 4-month term</p>
                  </div>
                )}
                {client.framerUrl && (
                  <div>
                    <p className="text-slate-500 text-xs">Framer site</p>
                    <a href={client.framerUrl} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline text-xs break-all">{client.framerUrl}</a>
                  </div>
                )}
                {client.domain && (
                  <div>
                    <p className="text-slate-500 text-xs">Domain</p>
                    <a href={`https://${client.domain}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-xs">{client.domain}</a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Contact info summary */}
          {contact && (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Contact</h2>
              <div className="space-y-2 text-xs">
                {contact.phone && <p className="text-slate-300">{contact.phone}</p>}
                {contact.email && <p className="text-slate-400">{contact.email}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
