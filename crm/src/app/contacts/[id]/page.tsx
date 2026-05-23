"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

type Activity = { id: string; type: string; title: string; body?: string; createdAt: string };
type Contact = {
  id: string; name: string; email?: string; phone?: string; business: string;
  industry: string; city: string; state: string; website?: string;
  status: string; product?: string; source: string; notes?: string;
  activities: Activity[];
};

const STATUSES = ["prospect", "lead", "demo", "customer"];
const STATUS_COLORS: Record<string, string> = {
  prospect: "bg-slate-700 text-slate-300",
  lead: "bg-blue-900/50 text-blue-300",
  demo: "bg-amber-900/50 text-amber-300",
  customer: "bg-green-900/50 text-green-300",
};

export default function ContactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [contact, setContact] = useState<Contact | null>(null);
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState("");
  const [actForm, setActForm] = useState({ type: "note", title: "", body: "" });
  const [showActForm, setShowActForm] = useState(false);

  async function load() {
    const res = await fetch(`/api/contacts/${id}`);
    const data = await res.json();
    setContact(data);
    setNotes(data.notes ?? "");
  }

  useEffect(() => { load(); }, [id]);

  async function updateStatus(status: string) {
    await fetch(`/api/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function saveNotes() {
    await fetch(`/api/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    setEditing(false);
    load();
  }

  async function addActivity(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactId: id, ...actForm }),
    });
    setActForm({ type: "note", title: "", body: "" });
    setShowActForm(false);
    load();
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <Link href="/contacts" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to contacts
        </Link>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-semibold text-white">{contact.name}</h1>
                <p className="text-slate-400">{contact.business}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[contact.status] ?? "bg-slate-700 text-slate-300"}`}>
                {contact.status}
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {contact.email && (
                <><dt className="text-slate-500">Email</dt><dd className="text-slate-200">{contact.email}</dd></>
              )}
              {contact.phone && (
                <><dt className="text-slate-500">Phone</dt><dd className="text-slate-200">{contact.phone}</dd></>
              )}
              <dt className="text-slate-500">Location</dt>
              <dd className="text-slate-200">{contact.city}, {contact.state}</dd>
              <dt className="text-slate-500">Industry</dt>
              <dd className="text-slate-200">{contact.industry}</dd>
              {contact.website && (
                <><dt className="text-slate-500">Website</dt>
                <dd className="text-slate-200 truncate">
                  <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">
                    {contact.website}
                  </a>
                </dd></>
              )}
              {contact.product && (
                <><dt className="text-slate-500">Product</dt><dd className="text-slate-200">{contact.product.toUpperCase()}</dd></>
              )}
              <dt className="text-slate-500">Source</dt>
              <dd className="text-slate-200">{contact.source}</dd>
            </dl>
          </div>

          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-white">Notes</h2>
              {!editing && (
                <button onClick={() => setEditing(true)} className="text-xs text-violet-400 hover:text-violet-300">Edit</button>
              )}
            </div>
            {editing ? (
              <div className="space-y-2">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                />
                <div className="flex gap-2">
                  <button onClick={() => setEditing(false)} className="text-sm text-slate-400 hover:text-white">Cancel</button>
                  <button onClick={saveNotes} className="text-sm text-violet-400 hover:text-violet-300 font-medium">Save</button>
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-sm whitespace-pre-wrap">{contact.notes || "No notes yet."}</p>
            )}
          </div>

          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-white">Activity</h2>
              <button onClick={() => setShowActForm(!showActForm)} className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300">
                <Plus className="w-3.5 h-3.5" /> Log
              </button>
            </div>

            {showActForm && (
              <form onSubmit={addActivity} className="mb-4 space-y-2 p-3 bg-slate-700/50 rounded-lg">
                <div className="flex gap-2">
                  <select
                    value={actForm.type}
                    onChange={(e) => setActForm({ ...actForm, type: e.target.value })}
                    className="px-2 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                  >
                    <option value="note">Note</option>
                    <option value="email">Email</option>
                    <option value="call">Call</option>
                    <option value="demo">Demo</option>
                  </select>
                  <input
                    required
                    value={actForm.title}
                    onChange={(e) => setActForm({ ...actForm, title: e.target.value })}
                    placeholder="Title"
                    className="flex-1 px-2 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>
                <textarea
                  value={actForm.body}
                  onChange={(e) => setActForm({ ...actForm, body: e.target.value })}
                  placeholder="Details (optional)"
                  rows={2}
                  className="w-full px-2 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none"
                />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setShowActForm(false)} className="text-xs text-slate-400">Cancel</button>
                  <button type="submit" className="text-xs text-violet-400 font-medium">Save</button>
                </div>
              </form>
            )}

            {contact.activities.length === 0 ? (
              <p className="text-slate-500 text-sm">No activity yet.</p>
            ) : (
              <div className="space-y-3">
                {contact.activities.map((a) => (
                  <div key={a.id} className="flex gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300 font-medium">{a.title}</span>
                        <span className="text-slate-600 text-xs">{new Date(a.createdAt).toLocaleDateString()}</span>
                      </div>
                      {a.body && <p className="text-slate-500 text-xs mt-0.5 truncate">{a.body}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <h2 className="font-medium text-white mb-3 text-sm">Pipeline stage</h2>
            <div className="space-y-1.5">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    contact.status === s
                      ? "bg-violet-600 text-white"
                      : "bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600"
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
