"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Zap } from "lucide-react";

// Pre-filled demo: a real-feeling plumbing company in Austin, TX
// Deliberately chosen to score mid-range so the report shows both strengths and gaps
const DEMO_BIZ = {
  businessName: "Lone Star Plumbing Co.",
  websiteUrl: "https://lonestaplumbing.com",  // fictional but plausible
  phoneNumber: "(512) 448-7200",
  industry: "Plumber",
  city: "Austin",
  state: "TX",
  teamSize: "6to20",
  revenueRange: "1m_5m",
  email: "brennan@endurancelabs.ai",
};

const DEMO_QUIZ = {
  personalAIUsageFreq: "weekly",
  aiToolsUsed: ["ChatGPT / OpenAI", "Grammarly"],
  teamAIUsage: "few",
  aiTrainingDone: "false",
  salesAutomationLevel: "partial",
  followUpProcess: "manual",
  crmUsage: "basic",
  adminHoursPerWeek: "10to20",
  schedulingMethod: "manual_online",
  biggestTimeDrain: "customer_comms",
  invoicingMethod: "software",
  reportingMethod: "spreadsheets",
  topAutomationPriority: "customer_followup",
};

type DemoStep = "ready" | "starting" | "scanning" | "quiz" | "submitting";

const QUIZ_SUMMARY = [
  { q: "Personal AI usage", a: "A few times a week (ChatGPT, Grammarly)" },
  { q: "Team AI usage", a: "Just one or two people — no formal training" },
  { q: "Sales automation", a: "Partial — mostly manual process" },
  { q: "Lead follow-up", a: "All manual" },
  { q: "CRM", a: "Basic CRM" },
  { q: "Admin hours/week", a: "10-20 hours" },
  { q: "Scheduling", a: "Manual online — customers request, we confirm" },
  { q: "Biggest time drain", a: "Customer communication & follow-up" },
  { q: "Invoicing", a: "Accounting software (QuickBooks)" },
  { q: "Reporting", a: "Spreadsheets" },
  { q: "Top automation priority", a: "Customer follow-up & CRM" },
];

export default function DemoPage() {
  const router = useRouter();
  const [step, setStep] = useState<DemoStep>("ready");
  const [assessmentId, setAssessmentId] = useState("");
  const [error, setError] = useState("");

  async function runDemo() {
    setStep("starting");
    setError("");

    try {
      // 1. Create assessment with pre-filled biz data
      const bizRes = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DEMO_BIZ),
      });
      const bizData = await bizRes.json();
      if (!bizRes.ok) throw new Error(bizData.error);
      const id = bizData.assessmentId;
      setAssessmentId(id);
      setStep("scanning");

      // 2. Poll for scan to finish
      await waitForScan(id);
      setStep("quiz");

      // 3. Submit quiz answers
      const quizRes = await fetch(`/api/assess/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: DEMO_QUIZ }),
      });
      if (!quizRes.ok) throw new Error("Failed to submit quiz");
      setStep("submitting");

      // 4. Checkout (demo mode skips Stripe, returns report URL directly)
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentId: id, coupon: "" }),
      });
      const checkoutData = await checkoutRes.json();
      if (!checkoutRes.ok) throw new Error(checkoutData.error);

      // 5. Navigate to report
      router.push(checkoutData.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Demo failed");
      setStep("ready");
    }
  }

  async function waitForScan(id: string) {
    for (let i = 0; i < 20; i++) {
      const res = await fetch(`/api/assess/${id}`);
      const data = await res.json();
      if (data.status === "awaiting_quiz") return;
      await new Promise((r) => setTimeout(r, 1200));
    }
  }

  const STEPS: DemoStep[] = ["starting", "scanning", "quiz", "submitting"];
  const stepIdx = STEPS.indexOf(step);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start py-16 px-4">
      <div className="max-w-xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-violet-900/50 border border-violet-700 text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Zap className="w-3 h-3 fill-violet-400" /> Demo Mode — Stripe bypassed
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Aria Assessment Demo</h1>
          <p className="text-slate-400 text-sm">
            Runs a full assessment for a sample Austin plumbing company — website scan, pre-filled quiz, and a real generated report. No payment required.
          </p>
        </div>

        {/* Business card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Demo Business</div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center text-2xl shrink-0">🔧</div>
            <div>
              <h2 className="font-bold text-white text-lg leading-tight">{DEMO_BIZ.businessName}</h2>
              <p className="text-slate-400 text-sm">{DEMO_BIZ.industry} · {DEMO_BIZ.city}, {DEMO_BIZ.state}</p>
              <p className="text-slate-500 text-xs mt-1">{DEMO_BIZ.websiteUrl} · 6-20 employees · $1M–$5M revenue</p>
            </div>
          </div>
        </div>

        {/* Quiz preview */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Pre-filled quiz answers</div>
          <div className="space-y-2">
            {QUIZ_SUMMARY.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-slate-500 shrink-0 w-4">{i + 1}.</span>
                <span className="text-slate-400 shrink-0 w-44 leading-snug">{item.q}</span>
                <span className="text-slate-200 leading-snug">{item.a}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-3 pt-3 border-t border-slate-700">
            Deliberately mid-range: some AI usage, partial automation, significant manual ops — produces a C/D grade with concrete savings estimates and a 3-phase roadmap.
          </p>
        </div>

        {/* Progress */}
        {step !== "ready" && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 mb-6">
            <div className="space-y-3">
              {[
                { s: "starting", label: "Creating assessment record" },
                { s: "scanning", label: "Scanning website for tech stack signals" },
                { s: "quiz", label: "Submitting quiz answers" },
                { s: "submitting", label: "Generating report (no Stripe in demo)" },
              ].map(({ s, label }, i) => {
                const done = stepIdx > i;
                const active = STEPS[stepIdx] === s;
                return (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${done ? "bg-emerald-500 text-white" : active ? "bg-violet-500 text-white" : "bg-slate-700 text-slate-500"}`}>
                      {done ? "✓" : active ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : i + 1}
                    </div>
                    <span className={`text-sm ${done ? "text-emerald-400 line-through" : active ? "text-white font-medium" : "text-slate-500"}`}>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>
        )}

        {step === "ready" && (
          <button
            onClick={runDemo}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 transition-colors"
          >
            Run Full Demo <ArrowRight className="w-5 h-5" />
          </button>
        )}

        {step !== "ready" && step !== "submitting" && (
          <div className="text-center text-slate-500 text-sm">Running automatically...</div>
        )}
      </div>
    </div>
  );
}
