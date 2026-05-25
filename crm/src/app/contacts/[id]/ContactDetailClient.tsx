"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { STAGES } from "@/types/crm";
import type { Contact } from "@/types/crm";

const ACTIVITY_ICONS: Record<string, string> = {
  purchase: "💳",
  note: "📝",
  stage_change: "🔄",
  email: "📧",
  call: "📞",
  linkedin: "🔗",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface Props {
  contact: Contact;
}

export default function ContactDetailClient({ contact: initial }: Props) {
  const router = useRouter();
  const [contact, setContact] = useState<Contact>(initial);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: contact.firstName ?? "",
    lastName: contact.lastName ?? "",
    email: contact.email,
    phone: contact.phone ?? "",
    businessName: contact.businessName ?? "",
    industry: contact.industry ?? "",
    city: contact.city ?? "",
    state: contact.state ?? "",
    website: contact.website ?? "",
    linkedinUrl: contact.linkedinUrl ?? "",
    tags: contact.tags ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [noteText, setNoteText] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleSave() {
    setSaving(true);
    setSaveError("");
    const res = await fetch(`/api/contacts/${contact.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      setContact(data.contact);
      setEditing(false);
    } else {
      const data = await res.json();
      setSaveError(data.error ?? "Save failed");
    }
    setSaving(false);
  }

  async function handleStageChange(stage: string) {
    const res = await fetch(`/api/contacts/${contact.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    });
    if (res.ok) {
      const data = await res.json();
      setContact(data.contact);
    }
  }

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    if (!noteText.trim()) return;
    setAddingNote(true);
    const res = await fetch(`/api/contacts/${contact.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _addNote: noteText.trim() }),
    });
    if (res.ok) {
      setNoteText("");
      // Refresh contact data
      const refreshRes = await fetch(`/api/contacts/${contact.id}`);
      if (refreshRes.ok) {
        const data = await refreshRes.json();
        setContact(data.contact);
      }
    }
    setAddingNote(false);
  }

  async function handleDelete() {
    if (!confirm("Delete this contact permanently?")) return;
    setDeleting(true);
    const res = await fetch(`/api/contacts/${contact.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/contacts");
    } else {
      setDeleting(false);
    }
  }

  const displayName =
    (contact.firstName || contact.lastName)
      ? `${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim()
      : contact.email;

  return (
    <div className="p-6 max-w-4xl">
      {/* Back */}
      <Link
        href="/contacts"
        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition mb-5"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to contacts
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{displayName}</h1>
          <p className="text-slate-400 text-sm mt-0.5">{contact.email}</p>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                onClick={() => { setEditing(false); setSaveError(""); }}
                className="px-3 py-1.5 text-slate-300 hover:text-white text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-1.5 bg-red-900/50 hover:bg-red-800 text-red-300 hover:text-white text-sm font-medium rounded-lg transition"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </>
          )}
        </div>
      </div>

      {saveError && (
        <div className="mb-4 px-3 py-2 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">
          {saveError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Contact info */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-4">
              Contact Info
            </h2>
            {editing ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First Name">
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                      className="input"
                    />
                  </Field>
                  <Field label="Last Name">
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                      className="input"
                    />
                  </Field>
                </div>
                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="input"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="input"
                  />
                </Field>
                <Field label="Business Name">
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
                    className="input"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="City">
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                      className="input"
                    />
                  </Field>
                  <Field label="State">
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                      className="input"
                    />
                  </Field>
                </div>
                <Field label="Industry">
                  <input
                    type="text"
                    value={form.industry}
                    onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                    className="input"
                  />
                </Field>
                <Field label="Website">
                  <input
                    type="url"
                    value={form.website}
                    onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                    className="input"
                  />
                </Field>
                <Field label="LinkedIn URL">
                  <input
                    type="url"
                    value={form.linkedinUrl}
                    placeholder="https://linkedin.com/in/..."
                    onChange={(e) => setForm((f) => ({ ...f, linkedinUrl: e.target.value }))}
                    className="input"
                  />
                </Field>
                <Field label="Tags">
                  <input
                    type="text"
                    value={form.tags}
                    placeholder="comma, separated, tags"
                    onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                    className="input"
                  />
                </Field>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                <InfoRow label="First Name" value={contact.firstName} />
                <InfoRow label="Last Name" value={contact.lastName} />
                <InfoRow label="Email" value={contact.email} />
                <InfoRow label="Phone" value={contact.phone} />
                <InfoRow label="Business" value={contact.businessName} />
                <InfoRow label="Industry" value={contact.industry} />
                <InfoRow
                  label="Location"
                  value={
                    contact.city && contact.state
                      ? `${contact.city}, ${contact.state}`
                      : contact.city ?? contact.state
                  }
                />
                <InfoRow
                  label="Website"
                  value={
                    contact.website ? (
                      <a
                        href={contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-400 hover:underline"
                      >
                        {contact.website}
                      </a>
                    ) : undefined
                  }
                />
                <InfoRow
                  label="LinkedIn"
                  value={
                    contact.linkedinUrl ? (
                      <a
                        href={contact.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {contact.linkedinUrl}
                      </a>
                    ) : undefined
                  }
                />
                <InfoRow label="Source" value={contact.source} />
                <InfoRow label="Tags" value={contact.tags} />
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-4">
              Notes
            </h2>
            <form onSubmit={handleAddNote} className="flex gap-2 mb-4">
              <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note…"
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
              />
              <button
                type="submit"
                disabled={addingNote || !noteText.trim()}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white text-sm font-medium rounded-lg transition"
              >
                {addingNote ? "…" : "Add"}
              </button>
            </form>
            {contact.notes.length === 0 ? (
              <p className="text-slate-500 text-sm">No notes yet.</p>
            ) : (
              <div className="space-y-3">
                {contact.notes.map((note) => (
                  <div key={note.id} className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-white text-sm">{note.content}</p>
                    <p className="text-slate-500 text-xs mt-1">{formatDate(note.createdAt)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity Timeline */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-4">
              Activity
            </h2>
            {contact.activities.length === 0 ? (
              <p className="text-slate-500 text-sm">No activity yet.</p>
            ) : (
              <div className="space-y-3">
                {contact.activities.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="shrink-0 text-base leading-none mt-0.5">
                      {ACTIVITY_ICONS[activity.type] ?? "•"}
                    </div>
                    <div>
                      <p className="text-white text-sm">
                        {activity.description ?? activity.type}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {formatDate(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Stage */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">
              Stage
            </h2>
            <select
              value={contact.stage}
              onChange={(e) => handleStageChange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            >
              {STAGES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Products */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">
              Products
            </h2>
            {contact.products.length === 0 ? (
              <p className="text-slate-500 text-sm">No products.</p>
            ) : (
              <div className="space-y-2">
                {contact.products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between bg-slate-700/50 rounded-lg px-3 py-2"
                  >
                    <div>
                      <span
                        className={`inline-flex text-xs px-2 py-0.5 rounded-full font-medium ${
                          p.product === "leadpulse"
                            ? "bg-violet-900 text-violet-200"
                            : "bg-cyan-900 text-cyan-200"
                        }`}
                      >
                        {p.product}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">{p.status}</p>
                      {p.paidAt && (
                        <p className="text-xs text-slate-500">
                          {new Date(p.paidAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">
              Meta
            </h2>
            <div className="space-y-2 text-xs text-slate-400">
              <div>
                <span className="text-slate-500">Created</span>
                <p className="text-slate-300">{formatDate(contact.createdAt)}</p>
              </div>
              <div>
                <span className="text-slate-500">Updated</span>
                <p className="text-slate-300">{formatDate(contact.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
      <div className="[&_.input]:w-full [&_.input]:px-3 [&_.input]:py-2 [&_.input]:bg-slate-700 [&_.input]:border [&_.input]:border-slate-600 [&_.input]:rounded-lg [&_.input]:text-white [&_.input]:placeholder-slate-400 [&_.input]:focus:outline-none [&_.input]:focus:ring-2 [&_.input]:focus:ring-violet-500 [&_.input]:text-sm">
        {children}
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | null | React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-slate-500 text-xs">{label}</dt>
      <dd className="text-white mt-0.5">
        {value !== null && value !== undefined && value !== "" ? (
          typeof value === "string" ? value : value
        ) : (
          <span className="text-slate-600">—</span>
        )}
      </dd>
    </div>
  );
}
