"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { GrowthScoreSubmission } from "@/types/growth-score";
import { GrowthScoreReport } from "@/components/growth-score/GrowthScoreReport";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Loader2, AlertCircle } from "lucide-react";

export default function GrowthScoreReportPage() {
  const params = useParams();
  const id = params.id as string;

  const [submission, setSubmission] = useState<GrowthScoreSubmission | null>(null);
  const [error, setError] = useState("");

  const fetchSubmission = useCallback(async () => {
    try {
      const res = await fetch(`/api/growth-score/${id}`);
      if (!res.ok) throw new Error("Report not found");
      const data = await res.json();
      setSubmission(data);
      return data.status;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load report");
      return "failed";
    }
  }, [id]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    async function poll() {
      const status = await fetchSubmission();
      if (status === "pending" || status === "running") {
        timeout = setTimeout(poll, 3000);
      }
    }

    poll();
    return () => clearTimeout(timeout);
  }, [fetchSubmission]);

  if (error) {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8 pt-32">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-xl font-bold text-stone-900 mb-2">Report Not Found</h1>
            <p className="text-stone-500 mb-6">{error}</p>
            <a href="/growth-score/start" className="bg-green-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition">
              Start a New Growth Score
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!submission || submission.status === "pending" || submission.status === "running") {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8 pt-32">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-stone-900 mb-2">Calculating Your Growth Score...</h1>
            <p className="text-stone-500 mb-8">
              We&apos;re analyzing your website, SEO, social media, and competitor data. This takes 1–2 minutes.
            </p>
            <div className="space-y-2 text-left bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
              {[
                "Scanning website performance & SEO",
                "Analyzing local competitor rankings",
                "Checking digital directory presence",
                "Reviewing social media footprint",
                "Assessing lead capture infrastructure",
                "Calculating revenue impact estimates",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-stone-600">
                  <Loader2 className="w-3.5 h-3.5 text-green-500 animate-spin shrink-0" />
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (submission.status === "failed") {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8 pt-32">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-xl font-bold text-stone-900 mb-2">We Ran Into an Issue</h1>
            <p className="text-stone-500 mb-6">
              We couldn&apos;t finish scoring your business. This can happen with certain website configurations — contact us and we&apos;ll take care of it.
            </p>
            <a href="/contact" className="bg-stone-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-stone-800 transition">
              Contact Us
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-stone-50 pt-16">
        {submission.results && <GrowthScoreReport results={submission.results} />}
      </div>
      <Footer />
    </>
  );
}
