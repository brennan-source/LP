"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Users, Link2, Phone, Copy, Check, PhoneCall } from "lucide-react";
import type { Campaign } from "@/types/crm";

const INDUSTRIES = ["HVAC", "Plumber", "Septic", "Roofer", "Landscaper", "Manufacturing"];
const STAGE_OPTIONS = ["prospect", "contacted", "demo_sent", "trial"];

interface QueueContact {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  businessName: string | null;
  industry: string | null;
  city: string | null;
  state: string | null;
  linkedinUrl: string | null;
  renderedMessage: string;
}

interface SendResult {
  sent: number;
  total: number;
  errors: string[];
}

export default function CampaignDetailClient({
  campaign,
  totalEligible,
}: {
  campaign: Campaign;
  totalEligible: number;
}) {
  const [stages, setStages] = useState<string[]>(["prospect"]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [limit, setLimit] = useState(50);

  // Email state
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);
  const [error, setError] = useState("");

  // LinkedIn / Call queue state
  const [queue, setQueue] = useState<QueueContact[] | null>(null);
  const [loadingQueue, setLoadingQueue] = useState(false);
  const [marked, setMarked] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  function toggleItem<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
  }

  async function handleSend() {
    setSending(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/campaigns/${campaign.id}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stages, industries: industries.length > 0 ? industries : [], limit }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Send failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Send failed");
    }
    setSending(false);
  }

  async function loadQueue() {
    setLoadingQueue(true);
    setQueue(null);
    try {
      const params = new URLSearchParams();
      stages.forEach((s) => params.append("stages", s));
      industries.forEach((i) => params.append("industries", i));
      params.set("limit", String(limit));
      const res = await fetch(`/api/campaigns/${campaign.id}/contacts?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load queue");
      setQueue(data.contacts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load queue");
    }
    setLoadingQueue(false);
  }

  async function markContact(contactId: string, outcome?: string) {
    const res = await fetch(`/api/campaigns/${campaign.id}/mark`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactId, outcome }),
    });
    if (res.ok) {
      setMarked((m) => ({ ...m, [contactId]: outcome ?? "done" }));
    }
  }

  const copyToClipboard = useCallback(async (contactId: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(contactId);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const displayName = (c: QueueContact) =>
    [c.firstName, c.lastName].filter(Boolean).join(" ") || c.email;

  return (
    <div className="p-6 max-w-5xl">
      <Link href="/campaigns" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition mb-5">
        <ArrowLeft className="w-4 h-4" /> Back to campaigns
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {campaign.type === "linkedin" && <Link2 className="w-5 h-5 text-blue-400" />}
            {campaign.type === "call" && <Phone className="w-5 h-5 text-emerald-400" />}
            {campaign.type === "email" && <Send className="w-5 h-5 text-violet-400" />}
            <h1 className="text-2xl font-bold text-white">{campaign.name}</h1>
          </div>
          <p className="text-slate-400 text-sm">
            {campaign.sentCount > 0
              ? `${campaign.type === "call" ? "Called" : campaign.type === "linkedin" ? "Messaged" : "Sent to"} ${campaign.sentCount} contacts`
              : "Draft — not yet sent"}
          </p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          campaign.status === "sent" ? "bg-green-900/50 text-green-300" : "bg-slate-700 text-slate-300"
        }`}>
          {campaign.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Left: campaign content */}
        <div className="lg:col-span-3 space-y-4">
          {campaign.type === "email" && campaign.subject && (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Subject</p>
              <p className="text-white">{campaign.subject}</p>
            </div>
          )}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">
              {campaign.type === "linkedin" ? "Message Template" : campaign.type === "call" ? "Call Script" : "Body"}
            </p>
            <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono leading-relaxed max-h-96 overflow-y-auto">{campaign.body}</pre>
          </div>
        </div>

        {/* Right: send / queue panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-white">
                {campaign.type === "linkedin" ? "LinkedIn Outreach Queue" : campaign.type === "call" ? "Call Queue" : "Send to contacts"}
              </span>
            </div>

            {/* Filters — shared across all types */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">Stages</p>
                <div className="space-y-1.5">
                  {STAGE_OPTIONS.map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={stages.includes(s)}
                        onChange={() => setStages(toggleItem(stages, s))}
                        className="rounded border-slate-600 bg-slate-700 text-violet-500"
                      />
                      <span className="text-slate-300 text-sm capitalize">{s.replace("_", " ")}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">Industries <span className="text-slate-600">(all if none selected)</span></p>
                <div className="flex flex-wrap gap-1.5">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setIndustries(toggleItem(industries, ind))}
                      className={`text-xs px-2.5 py-1 rounded-full transition ${
                        industries.includes(ind)
                          ? "bg-violet-600 text-white"
                          : "bg-slate-700 text-slate-400 hover:text-white"
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1.5">Limit</label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="pt-1 border-t border-slate-700">
                {campaign.type === "email" ? (
                  <>
                    <p className="text-xs text-slate-500 mb-3">
                      {totalEligible} contacts eligible (real emails, prospect stage)
                    </p>
                    {result ? (
                      <div className="bg-green-900/20 border border-green-800 rounded-lg p-3 text-sm text-green-300 mb-3">
                        ✓ Sent to {result.sent} of {result.total} contacts
                        {result.errors.length > 0 && (
                          <p className="text-red-400 text-xs mt-1">{result.errors.length} failed</p>
                        )}
                      </div>
                    ) : error ? (
                      <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2 mb-3">{error}</p>
                    ) : null}
                    <button
                      onClick={handleSend}
                      disabled={sending || stages.length === 0}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition"
                    >
                      <Send className="w-4 h-4" />
                      {sending ? "Sending…" : "Send Now"}
                    </button>
                  </>
                ) : (
                  <>
                    {error && (
                      <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2 mb-3">{error}</p>
                    )}
                    <button
                      onClick={loadQueue}
                      disabled={loadingQueue || stages.length === 0}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition ${
                        campaign.type === "linkedin"
                          ? "bg-blue-700 hover:bg-blue-600"
                          : "bg-emerald-700 hover:bg-emerald-600"
                      }`}
                    >
                      {campaign.type === "linkedin" ? <Link2 className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
                      {loadingQueue ? "Loading…" : "Load Queue"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Queue results (LinkedIn or Call) */}
      {queue !== null && campaign.type !== "email" && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              {queue.length} contact{queue.length !== 1 ? "s" : ""} in queue
              {campaign.type === "linkedin" && " with LinkedIn URL"}
              {campaign.type === "call" && " with phone number"}
            </h2>
            <span className="text-sm text-slate-400">
              {Object.keys(marked).length} marked
            </span>
          </div>
          {queue.length === 0 ? (
            <p className="text-slate-500 text-sm">
              No contacts found. Try adjusting the filters
              {campaign.type === "linkedin" ? " — only contacts with a LinkedIn URL are included." : " — only contacts with a phone number are included."}
            </p>
          ) : (
            <div className="space-y-3">
              {queue.map((contact) => {
                const isDone = !!marked[contact.id];
                return (
                  <div
                    key={contact.id}
                    className={`bg-slate-800 rounded-xl border p-5 transition ${
                      isDone ? "border-green-800/50 opacity-60" : "border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {isDone && <Check className="w-4 h-4 text-green-400 shrink-0" />}
                          <span className="font-medium text-white text-sm">{displayName(contact)}</span>
                          {contact.businessName && (
                            <span className="text-slate-400 text-sm">· {contact.businessName}</span>
                          )}
                          {contact.industry && (
                            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{contact.industry}</span>
                          )}
                        </div>

                        {campaign.type === "linkedin" && (
                          <div className="mb-3">
                            {contact.linkedinUrl ? (
                              <a
                                href={contact.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline text-xs flex items-center gap-1"
                              >
                                <Link2 className="w-3 h-3" />
                                {contact.linkedinUrl}
                              </a>
                            ) : (
                              <span className="text-slate-600 text-xs">No LinkedIn URL</span>
                            )}
                          </div>
                        )}

                        {campaign.type === "call" && (
                          <div className="mb-3">
                            {contact.phone ? (
                              <a
                                href={`tel:${contact.phone}`}
                                className="text-emerald-400 hover:underline text-xs flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3" />
                                {contact.phone}
                              </a>
                            ) : (
                              <span className="text-slate-600 text-xs">No phone</span>
                            )}
                          </div>
                        )}

                        <pre className="text-slate-300 text-xs whitespace-pre-wrap font-mono leading-relaxed bg-slate-900/50 rounded-lg p-3 max-h-48 overflow-y-auto">
                          {contact.renderedMessage}
                        </pre>
                      </div>

                      {!isDone && (
                        <div className="shrink-0 flex flex-col gap-2">
                          {campaign.type === "linkedin" && (
                            <>
                              <button
                                onClick={() => copyToClipboard(contact.id, contact.renderedMessage)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white text-xs font-medium rounded-lg transition"
                              >
                                {copied === contact.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied === contact.id ? "Copied!" : "Copy"}
                              </button>
                              <button
                                onClick={() => markContact(contact.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition"
                              >
                                <Check className="w-3.5 h-3.5" />
                                Sent
                              </button>
                            </>
                          )}
                          {campaign.type === "call" && (
                            <div className="flex flex-col gap-1.5">
                              {["Interested", "Left Voicemail", "No Answer", "Not Interested"].map((outcome) => (
                                <button
                                  key={outcome}
                                  onClick={() => markContact(contact.id, outcome)}
                                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${
                                    outcome === "Interested"
                                      ? "bg-emerald-700 hover:bg-emerald-600 text-white"
                                      : outcome === "Not Interested"
                                      ? "bg-slate-700 hover:bg-slate-600 text-slate-300"
                                      : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                                  }`}
                                >
                                  {outcome}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {isDone && (
                        <div className="shrink-0 text-xs text-green-400 font-medium">
                          {marked[contact.id] !== "done" ? marked[contact.id] : "✓ Done"}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
