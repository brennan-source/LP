import { Suspense } from "react";
import { AssessmentFlow } from "@/components/AssessmentFlow";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "AI Readiness Assessment — Aria",
  description: "Find out exactly where AI can save your business money and increase revenue. Free to complete, $15 to unlock your full report.",
};

export default function AssessPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-slate-500 hover:text-slate-900 text-sm transition-colors">← Back</Link>
          <span className="text-slate-200">|</span>
          <span className="font-black text-slate-900 text-lg">Aria</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-3">Your AI Readiness Assessment</h1>
          <p className="text-slate-500 text-lg">
            10 minutes. 8 scored categories. A dollar-quantified gap analysis and custom AI roadmap.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-3xl font-black text-violet-600">$15</span>
            <span className="text-slate-400 text-sm">to unlock full report · free to complete</span>
          </div>
        </div>

        {/* What's included */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {[
            "8-category scored audit",
            "Estimated monthly savings",
            "3-phase custom roadmap",
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-violet-500 shrink-0" />
              <span className="text-sm font-medium text-slate-700">{item}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <Suspense fallback={<div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-violet-500" /></div>}>
            <AssessmentFlow />
          </Suspense>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          LeadPulse report holders: enter code <strong>LEADPULSE</strong> for $12 (save $3)
        </p>
      </div>
    </div>
  );
}
