"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { AuditJob } from "@/types/audit";
import { ReportCard } from "@/components/ReportCard";
import { Loader2, AlertCircle } from "lucide-react";

export default function ReportPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const sessionId = searchParams.get("session_id");

  const [job, setJob] = useState<AuditJob | null>(null);
  const [error, setError] = useState("");

  const fetchJob = useCallback(async () => {
    try {
      const res = await fetch(`/api/audit/${id}`);
      if (!res.ok) throw new Error("Report not found");
      const data = await res.json();
      setJob(data);
      return data.status;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load report");
      return "failed";
    }
  }, [id]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    async function poll() {
      const status = await fetchJob();
      if (status === "pending" || status === "running") {
        timeout = setTimeout(poll, 3000);
      }
    }

    poll();
    return () => clearTimeout(timeout);
  }, [fetchJob]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Report Not Found</h1>
          <p className="text-slate-500 mb-6">{error}</p>
          <a href="/audit" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
            Start a New Audit
          </a>
        </div>
      </div>
    );
  }

  if (!job || job.status === "pending" || job.status === "running") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {job?.status === "running" ? "Auditing Your Business..." : "Payment confirmed — starting audit..."}
          </h1>
          <p className="text-slate-500 mb-8">
            We're analyzing your website, SEO, social media, and competitor data. This takes 1–2 minutes.
          </p>
          <div className="space-y-2 text-left bg-white rounded-xl border border-slate-200 p-5">
            {[
              "Scanning website performance & SEO",
              "Analyzing local competitor rankings",
              "Checking digital directory presence",
              "Reviewing social media footprint",
              "Assessing lead capture infrastructure",
              "Calculating revenue impact estimates",
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                <Loader2 className="w-3.5 h-3.5 text-blue-400 animate-spin shrink-0" />
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (job.status === "failed") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Audit Encountered an Issue</h1>
          <p className="text-slate-500 mb-2">
            We ran into a problem auditing your business. This can happen with certain website configurations.
          </p>
          <p className="text-slate-500 mb-6">
            We'll email you when it's resolved, or contact us for a full refund.
          </p>
          <a href="mailto:support@leadpulse.ai" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="font-bold text-slate-900">LeadPulse</span>
          <a
            href="/audit"
            className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Audit Another Business
          </a>
        </div>
      </nav>
      {job.results && <ReportCard results={job.results} />}
    </div>
  );
}
