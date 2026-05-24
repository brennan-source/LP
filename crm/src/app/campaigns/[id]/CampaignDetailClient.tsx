"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Users } from "lucide-react";
import type { Campaign } from "@/types/crm";

const INDUSTRIES = ["HVAC", "Plumber", "Septic", "Roofer", "Landscaper", "Manufacturing"];
const STAGE_OPTIONS = ["prospect", "contacted", "demo_sent", "trial"];

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
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);
  const [error, setError] = useState("");

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

  return (
    <div className="p-6 max-w-4xl">
      <Link href="/campaigns" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition mb-5">
        <ArrowLeft className="w-4 h-4" /> Back to campaigns
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{campaign.name}</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {campaign.status === "sent"
              ? `Sent to ${campaign.sentCount} contacts`
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
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Subject</p>
            <p className="text-white">{campaign.subject}</p>
          </div>
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Body</p>
            <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono leading-relaxed max-h-96 overflow-y-auto">{campaign.body}</pre>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-white">Send to contacts</span>
            </div>

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
                <p className="text-xs text-slate-500 mb-3">
                  {totalEligible} contacts eligible (real emails, prospect stage)
                </p>

                {result ? (
                  <div className="bg-green-900/20 border border-green-800 rounded-lg p-3 text-sm text-green-300">
                    ✓ Sent to {result.sent} of {result.total} contacts
                    {result.errors.length > 0 && (
                      <p className="text-red-400 text-xs mt-1">{result.errors.length} failed</p>
                    )}
                  </div>
                ) : error ? (
                  <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">{error}</p>
                ) : null}

                <button
                  onClick={handleSend}
                  disabled={sending || stages.length === 0}
                  className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition"
                >
                  <Send className="w-4 h-4" />
                  {sending ? "Sending…" : "Send Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
