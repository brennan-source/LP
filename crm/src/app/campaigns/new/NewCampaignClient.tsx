"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Link2, Phone } from "lucide-react";
import type { CampaignType } from "@/types/crm";

type TemplateKey = "no_website" | "preview_built" | "warm_call" | "general_email" | "linkedin" | "call";

const TEMPLATE_OPTIONS: { value: TemplateKey; label: string; type: CampaignType; description: string }[] = [
  { value: "no_website", label: "No Website Hook", type: "email", description: "Free website offer — target businesses with no site" },
  { value: "preview_built", label: "Preview Built", type: "email", description: "\"We built a site for you\" — send after setting preview URL" },
  { value: "warm_call", label: "Warm Call Script", type: "call", description: "For contacts who visited their preview — skip the pitch" },
  { value: "general_email", label: "General Outreach", type: "email", description: "Standard intro email" },
  { value: "linkedin", label: "LinkedIn", type: "linkedin", description: "LinkedIn connection message" },
  { value: "call", label: "Cold Call Script", type: "call", description: "Standard cold call script" },
];

const TEMPLATES: Record<TemplateKey, { subject: string; body: string }> = {
  no_website: {
    subject: "We want to build a free website for {{businessName}}",
    body: `Hi {{firstName}},

I came across {{businessName}} in {{city}} and noticed you don't have a website yet.

We're a local marketing agency — Makr — and we build free websites for {{industry}} businesses in {{city}}. No catch: it's free for the first 4 months while we prove we can grow your leads. After that, it's $499/month to keep everything running.

We've already built a demo site for your business. Can I send you the link?

— Brennan at Makr
gomakr.ai

{{unsubscribeUrl}}`,
  },
  preview_built: {
    subject: "We built a website for {{businessName}} — here it is",
    body: `Hi {{firstName}},

We built a free website for {{businessName}} — no strings attached.

Here's the preview: [paste preview URL]

It's ready to go live with your domain. We're offering this free for the first 4 months to {{industry}} businesses in {{city}}. After that it's $499/month if you want us to keep running the SEO and marketing.

Worth a quick 10-minute call to walk through it?

— Brennan at Makr
gomakr.ai

{{unsubscribeUrl}}`,
  },
  warm_call: {
    subject: "",
    body: `[WARM CALL — they scanned the QR code and saw their preview]

OPENING
"Hi, is this {{firstName}}? This is Brennan from Makr — we're the ones who built the website preview for {{businessName}}. Did you get a chance to check it out?"

[IF YES]
"Great — what did you think? We built it specifically for {{industry}} businesses in {{city}}."

OFFER
"We'd love to launch it for real. It's completely free for the first 4 months — we just want to prove we can grow your leads before you pay us anything. After 4 months it's $499/month, and you own the site free and clear."

CLOSE
"Can we get it live this week? I just need your domain name, or we can set one up for you."

OBJECTION: WHAT'S THE CATCH?
"No catch — we built it on spec because we're confident we can grow your business. If after 4 months you don't see the results, you walk away, no fee. We keep the site, you keep your money."

OBJECTION: TOO BUSY
"Totally fair. I'll email you the link and you can check it at your own pace. What's the best email for {{businessName}}?"`,
  },
  general_email: {
    subject: "Quick question about {{businessName}}",
    body: `Hi {{firstName}},

I came across {{businessName}} in {{city}} and wanted to reach out.

We're Makr — a local marketing agency that helps {{industry}} businesses grow with SEO, ads, and AI tools. Most of the businesses we work with see 20–40% more leads within 90 days.

Would you be open to a quick 10-minute call to see if we'd be a fit?

— Brennan at Makr
gomakr.ai

{{unsubscribeUrl}}`,
  },
  linkedin: {
    subject: "",
    body: `Hi {{firstName}}, I came across {{businessName}} in {{city}} and wanted to connect. We're Makr — we help {{industry}} businesses grow their leads with websites, SEO, and AI automation. Would love to share one quick idea specific to your setup. Worth a 10-minute chat?`,
  },
  call: {
    subject: "",
    body: `OPENING
"Hi, is this {{firstName}}? Great — this is Brennan with Makr. We help {{industry}} businesses in {{city}} grow their leads with websites, SEO, and AI automation. Do you have 2 minutes?"

PAIN POINT
"Most {{industry}} owners I talk to are spending $1,500–3,000/month on marketing but not seeing consistent results. Does that ring a bell for {{businessName}}?"

OFFER
"We built a free website for your business — no cost for the first 4 months while we prove we can grow your leads. Would you be open to seeing it?"

CLOSE
"Great — what's the best email to send it to?"

OBJECTION: TOO BUSY
"Totally fair — I'll send a link to your preview and you can check it at your own pace. Sound good?"

OBJECTION: NOT INTERESTED
"No problem at all, {{firstName}}. If things change, we're at gomakr.ai. Have a great day."`,
  },
};

const TYPE_OPTIONS: { value: CampaignType; label: string; icon: React.ElementType; color: string }[] = [
  { value: "email", label: "Email", icon: Mail, color: "violet" },
  { value: "linkedin", label: "LinkedIn", icon: Link2, color: "blue" },
  { value: "call", label: "Cold Call Script", icon: Phone, color: "emerald" },
];

export default function NewCampaignClient() {
  const router = useRouter();
  const [templateKey, setTemplateKey] = useState<TemplateKey>("no_website");
  const [type, setType] = useState<CampaignType>("email");
  const [form, setForm] = useState({
    name: "",
    subject: TEMPLATES.no_website.subject,
    body: TEMPLATES.no_website.body,
    status: "draft",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleTemplateChange(key: TemplateKey) {
    const tpl = TEMPLATE_OPTIONS.find((t) => t.value === key)!;
    setTemplateKey(key);
    setType(tpl.type);
    setForm((f) => ({
      ...f,
      subject: TEMPLATES[key].subject,
      body: TEMPLATES[key].body,
    }));
  }

  function handleTypeChange(newType: CampaignType) {
    setType(newType);
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
        <p className="text-slate-400 text-sm mt-0.5">Pick a template to start from</p>
      </div>

      {/* Template selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
        {TEMPLATE_OPTIONS.map((tpl) => (
          <button
            key={tpl.value}
            type="button"
            onClick={() => handleTemplateChange(tpl.value)}
            className={`text-left px-4 py-3 rounded-xl border-2 text-sm transition ${
              templateKey === tpl.value
                ? "border-violet-500 bg-violet-900/30 text-violet-300"
                : "border-slate-600 bg-slate-700/50 text-slate-400 hover:border-slate-500 hover:text-slate-300"
            }`}
          >
            <p className="font-medium">{tpl.label}</p>
            <p className="text-xs mt-0.5 opacity-70">{tpl.description}</p>
          </button>
        ))}
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
