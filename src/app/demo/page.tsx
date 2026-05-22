"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Zap } from "lucide-react";

// Pre-filled demo: roofing company in Dallas — strong candidate for lead gen audit
// Has real website signals to scan, competitive local market, review-sensitive industry
const DEMO_BIZ = {
  businessName: "Apex Roofing & Gutters",
  websiteUrl: "https://apexroofing.com",
  phoneNumber: "(214) 892-4400",
  industry: "Roofer",
  city: "Dallas",
  state: "TX",
  email: process.env.NEXT_PUBLIC_DEMO_EMAIL || "brennan@endurancelabs.ai",
};

const WHAT_WE_CHECK = [
  { emoji: "🌐", label: "Website", desc: "Speed, mobile, booking, chat, schema markup" },
  { emoji: "🔍", label: "Local SEO", desc: "Google Business Profile, citations, keywords" },
  { emoji: "⭐", label: "Reviews", desc: "Volume, recency, response rate, sentiment" },
  { emoji: "📱", label: "Social Media", desc: "Presence, posting frequency, engagement" },
  { emoji: "💰", label: "Paid Ads", desc: "Google Ads presence, competitor spend" },
  { emoji: "🤖", label: "AI Search", desc: "Visibility in ChatGPT, Perplexity, and AI answers" },
  { emoji: "🎯", label: "Lead Capture", desc: "Forms, CTAs, booking funnel analysis" },
];

type DemoStep = "ready" | "creating" | "running" | "done";

const STEPS = [
  { s: "creating", label: "Creating audit job" },
  { s: "running",  label: "Running full 7-category scan (30–60s)" },
  { s: "done",     label: "Report ready — sending to your inbox" },
];

export default function DemoPage() {
  const router = useRouter();
  const [step, setStep] = useState<DemoStep>("ready");
  const [error, setError] = useState("");

  async function runDemo() {
    setStep("creating");
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DEMO_BIZ),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error — check Vercel function logs");

      setStep("running");

      // Poll until the audit completes (or times out after ~90s)
      const reportUrl = data.url as string;
      const jobId = data.jobId as string;
      await waitForCompletion(jobId);

      setStep("done");
      setTimeout(() => router.push(reportUrl), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Demo failed");
      setStep("ready");
    }
  }

  async function waitForCompletion(jobId: string) {
    for (let i = 0; i < 45; i++) {
      const res = await fetch(`/api/audit/${jobId}`);
      const data = await res.json();
      if (data.status === "complete") return;
      if (data.status === "failed") throw new Error("Audit scan failed");
      await new Promise((r) => setTimeout(r, 2000));
    }
    throw new Error("Timed out waiting for audit to complete");
  }

  const stepIdx = STEPS.findIndex((s) => s.s === step);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start py-16 px-4">
      <div className="max-w-xl w-full">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Zap className="w-3 h-3 fill-blue-400" /> Demo Mode — Stripe bypassed
          </div>
          <h1 className="text-3xl font-black text-white mb-2">LeadPulse Audit Demo</h1>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            Runs a live 7-category lead gen audit for a sample Dallas roofing company. No payment required — report lands in your inbox.
          </p>
        </div>

        {/* Business card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Demo Business</div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-900 rounded-xl flex items-center justify-center text-2xl shrink-0">🏠</div>
            <div>
              <h2 className="font-bold text-white text-lg leading-tight">{DEMO_BIZ.businessName}</h2>
              <p className="text-slate-400 text-sm">{DEMO_BIZ.industry} · {DEMO_BIZ.city}, {DEMO_BIZ.state}</p>
              <p className="text-slate-500 text-xs mt-1">{DEMO_BIZ.websiteUrl} · {DEMO_BIZ.phoneNumber}</p>
            </div>
          </div>
        </div>

        {/* What gets scanned */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">What gets scanned</div>
          <div className="grid grid-cols-1 gap-2">
            {WHAT_WE_CHECK.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-lg w-6 text-center">{item.emoji}</span>
                <span className="font-semibold text-slate-200 w-28 shrink-0">{item.label}</span>
                <span className="text-slate-400">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        {step !== "ready" && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 mb-6">
            <div className="space-y-3">
              {STEPS.map(({ s, label }, i) => {
                const done = stepIdx > i || step === "done";
                const active = STEPS[stepIdx]?.s === s && step !== "done";
                return (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                      ${done ? "bg-emerald-500 text-white" : active ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-500"}`}>
                      {done ? "✓" : active ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : i + 1}
                    </div>
                    <span className={`text-sm ${done ? "text-emerald-400 line-through" : active ? "text-white font-medium" : "text-slate-500"}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
            {step === "running" && (
              <p className="text-slate-500 text-xs mt-4 pt-3 border-t border-slate-700">
                Scanning website, checking Google rankings, pulling review data, analyzing social presence and ad activity...
              </p>
            )}
            {step === "done" && (
              <p className="text-emerald-400 text-sm mt-4 pt-3 border-t border-slate-700 font-medium">
                ✓ Report generated — redirecting now and emailing to {DEMO_BIZ.email}
              </p>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {step === "ready" && (
          <button
            onClick={runDemo}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 transition-colors"
          >
            Run Full Audit Demo <ArrowRight className="w-5 h-5" />
          </button>
        )}

        {step === "running" && (
          <div className="text-center text-slate-500 text-sm">
            Running live scan — this takes 30–60 seconds...
          </div>
        )}

        <p className="text-center text-slate-600 text-xs mt-5">
          Report will be emailed to {DEMO_BIZ.email}
        </p>
      </div>
    </div>
  );
}
