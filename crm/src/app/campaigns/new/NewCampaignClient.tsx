"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Link2, Phone } from "lucide-react";
import type { CampaignType } from "@/types/crm";

const STARTERS: Record<CampaignType, { subject: string; body: string }> = {
  email: {
    subject: "Quick question about {{businessName}}",
    body: `Hi {{firstName}},

I came across {{businessName}} in {{city}} and wanted to reach out.

We built a free 10-minute AI Readiness assessment that shows {{industry}} businesses exactly where they're leaving money on the table — most owners are shocked by the results.

Would you be open to taking a quick look? Here's the link: https://leadpulse.ai

— Brennan

P.S. Completely free. No pitch, no sales call required.

{{unsubscribeUrl}}`,
  },
  linkedin: {
    subject: "",
    body: `Hi {{firstName}}, I came across {{businessName}} in {{city}} and wanted to reach out. We help {{industry}} businesses automate their lead generation — same results as a marketing agency, fraction of the cost. Would love to share one quick idea specific to your setup. Worth a 10-minute chat?`,
  },
  call: {
    subject: "",
    body: `OPENING
"Hi, is this {{firstName}}? Great — this is Brennan with Aria. We help {{industry}} businesses in {{city}} automate their lead gen and operations with AI. Do you have 2 minutes?"

PAIN POINT
"Most {{industry}} owners I talk to are spending $1,500–3,000/month on marketing but not seeing consistent results. Does that ring a bell for {{businessName}}?"

OFFER
"We built a free 10-minute assessment that shows exactly which parts of your business could be generating more leads on autopilot. Would you be open to taking a look?"

CLOSE
"Great — what's the best email to send it to?"

OBJECTION: TOO BUSY
"Totally fair — it's online, takes 10 minutes at your own pace. I'll send it and you can check it whenever. Sound good?"

OBJECTION: NOT INTERESTED
"No problem at all, {{firstName}}. If your lead gen situation ever changes, feel free to reach out. Have a great day."`,
  },
};

const TYPE_OPTIONS: { value: CampaignType; label: string; icon: React.ElementType; color: string }[] = [
  { value: "email", label: "Email", icon: Mail, color: "violet" },
  { value: "linkedin", label: "LinkedIn", icon: Link2, color: "blue" },
  { value: "call", label: "Cold Call Script", icon: Phone, color: "emerald" },
];

export default function NewCampaignClient() {
  const router = useRouter();
  const [type, setType] = useState<CampaignType>("email");
  const [form, setForm] = useState({
    name: "",
    subject: STARTERS.email.subject,
    body: STARTERS.email.body,
    status: "draft",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleTypeChange(newType: CampaignType) {
    setType(newType);
    setForm((f) => ({
      ...f,
      subject: STARTERS[newType].subject,
      body: STARTERS[newType].body,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, type }),
    });

    if (res.ok) {
      router.push("/campaigns");
    } else {
      const data = await res.json();
      setError(data.error ?? "Failed to create campaign");
    }
    setSaving(false);
  }

  const colorMap: Record<string, string> = {
    violet: "border-violet-500 bg-violet-900/30 text-violet-300",
    blue: "border-blue-500 bg-blue-900/30 text-blue-300",
    emerald: "border-emerald-500 bg-emerald-900/30 text-emerald-300",
  };
  const inactiveClass = "border-slate-600 bg-slate-700/50 text-slate-400 hover:border-slate-500 hover:text-slate-300";

  return (
    <div className="p-6 max-w-2xl">
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition mb-5"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to campaigns
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">New Campaign</h1>
        <p className="text-slate-400 text-sm mt-0.5">Email, LinkedIn message, or cold call script</p>
      </div>

      {/* Type selector */}
      <div className="flex gap-3 mb-6">
        {TYPE_OPTIONS.map(({ value, label, icon: Icon, color }) => (
          <button
            key={value}
            type="button"
            onClick={() => handleTypeChange(value)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition ${
              type === value ? colorMap[color] : inactiveClass
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Campaign Name <span className="text-violet-400">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder={
                type === "email"
                  ? "e.g. HVAC Boston — May 2026 Email"
                  : type === "linkedin"
                  ? "e.g. HVAC Boston — LinkedIn Outreach"
                  : "e.g. HVAC Boston — Cold Call Script"
              }
              className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            />
          </div>

          {type === "email" && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Subject Line <span className="text-violet-400">*</span>
              </label>
              <input
                type="text"
                required={type === "email"}
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                placeholder="e.g. Quick question about your HVAC business"
                className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
              />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-slate-300">
                {type === "email" ? "Email Body" : type === "linkedin" ? "LinkedIn Message" : "Call Script"}
                {" "}<span className="text-violet-400">*</span>
              </label>
              <span className="text-xs text-slate-500">
                Variables: {"{{firstName}} {{businessName}} {{city}} {{industry}}"}
                {type === "email" && " {{unsubscribeUrl}}"}
              </span>
            </div>
            <textarea
              required
              rows={type === "call" ? 20 : 12}
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm resize-y font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            >
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="sent">Sent</option>
            </select>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Link
              href="/campaigns"
              className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition"
            >
              {saving ? "Saving…" : "Save Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
