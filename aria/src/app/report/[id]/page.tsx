"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { AriaReport as AriaReportType } from "@/types/assessment";
import { AriaReport } from "@/components/AriaReport";
import { Loader2, AlertCircle } from "lucide-react";

interface ReportState {
  id: string;
  status: string;
  paid: boolean;
  report: AriaReportType | null;
}

export default function ReportPage() {
  const params = useParams();
  const id = params.id as string;
  const [state, setState] = useState<ReportState | null>(null);
  const [error, setError] = useState("");

  const fetchReport = useCallback(async () => {
    try {
      const res = await fetch(`/api/report/${id}`);
      if (!res.ok) throw new Error("Report not found");
      const data = await res.json();
      setState(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
      return null;
    }
  }, [id]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    async function poll() {
      const data = await fetchReport();
      if (data && (data.status === "scanning" || data.status === "awaiting_quiz" || (data.paid && data.status !== "complete" && data.status !== "failed"))) {
        timeout = setTimeout(poll, 2500);
      }
    }
    poll();
    return () => clearTimeout(timeout);
  }, [fetchReport]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <h1 className="font-bold text-slate-900 text-xl mb-2">Report not found</h1>
          <a href="/assess" className="text-violet-600 hover:underline">Start a new assessment</a>
        </div>
      </div>
    );
  }

  // Not yet paid — show teaser
  if (state && !state.paid) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
          <div className="text-6xl font-black text-violet-300 mb-2">?</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Your report is ready</h1>
          <p className="text-slate-500 mb-6">Pay $19 to unlock your full AI readiness scorecard — 8 categories scored, estimated savings, and a custom 3-phase roadmap.</p>
          <a href="/assess" className="bg-violet-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-violet-700 transition-colors inline-block">
            Complete Your Assessment
          </a>
        </div>
      </div>
    );
  }

  if (!state || state.status === "scanning" || state.status === "awaiting_quiz" || (state.paid && state.status !== "complete" && state.status !== "failed")) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <Loader2 className="w-12 h-12 text-violet-500 animate-spin mx-auto mb-4" />
          <h1 className="text-xl font-bold text-slate-900 mb-2">Generating your AI readiness report...</h1>
          <p className="text-slate-500">Analyzing your answers and calculating your savings estimates. Takes about 30 seconds.</p>
        </div>
      </div>
    );
  }

  if (state.status === "failed") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-orange-400 mx-auto mb-3" />
          <h1 className="font-bold text-slate-900 text-xl mb-2">Report generation failed</h1>
          <p className="text-slate-500 mb-4">We had a problem generating your report. We will contact you to resolve this.</p>
          <a href="mailto:hello@aria.ai" className="text-violet-600 hover:underline">Contact hello@aria.ai</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="font-black text-slate-900">Aria</span>
          <a href="/assess" className="text-sm bg-violet-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-violet-700 transition-colors">
            Assess Another Business
          </a>
        </div>
      </nav>
      {state.report && <AriaReport report={state.report} />}
    </div>
  );
}
