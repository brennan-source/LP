"use client";

import { AuditResults, ScoreCategory } from "@/types/audit";
import { ScoreGauge } from "./ScoreGauge";
import { CategoryCard } from "./CategoryCard";
import { formatDollars, gradeColor } from "@/lib/utils";
import { AlertTriangle, TrendingUp, Zap, Target, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<ScoreCategory, string> = {
  website: "Website",
  seo: "SEO",
  socialMedia: "Social Media",
  digitalFootprint: "Digital Footprint",
  leadCapture: "Lead Capture",
  paidAds: "Paid Ads",
  aiSearch: "AI Search",
};

const PRIORITY_ICON = {
  critical: <AlertTriangle className="w-4 h-4 text-red-500" />,
  high: <TrendingUp className="w-4 h-4 text-orange-500" />,
  medium: <Zap className="w-4 h-4 text-yellow-500" />,
  low: <Target className="w-4 h-4 text-blue-500" />,
};

interface ReportCardProps {
  results: AuditResults;
}

export function ReportCard({ results }: ReportCardProps) {
  const vsCompetitor = results.overallScore - results.competitorAvgScore;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl p-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">LeadPulse Report</span>
            </div>
            <h1 className="text-2xl font-bold mb-1">{results.businessName}</h1>
            <p className="text-slate-400 text-sm">{results.industry} · {results.city}, {results.state}</p>
            <p className="text-slate-500 text-xs mt-2">
              Audited {new Date(results.completedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <div className="text-center">
            <ScoreGauge score={results.overallScore} grade={results.overallGrade} size="lg" showLabel={false} />
            <div className="mt-2 space-y-1">
              <div className="text-xs text-slate-400">Overall Score</div>
              <div className={cn("text-sm font-bold", vsCompetitor >= 0 ? "text-emerald-400" : "text-red-400")}>
                {vsCompetitor >= 0 ? "+" : ""}{vsCompetitor} vs competitors
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Loss Banner */}
      {results.estimatedMonthlyRevenueLoss > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5 flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h2 className="font-bold text-red-800 text-lg">
              Estimated {formatDollars(results.estimatedMonthlyRevenueLoss)}/month in missed revenue
            </h2>
            <p className="text-red-700 text-sm mt-1">
              Based on industry benchmarks for a {results.industry} business in {results.city} with your current lead generation gaps.
              Addressing your top priorities could recapture a significant portion of this revenue.
            </p>
          </div>
        </div>
      )}

      {/* Score Overview Grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Score Breakdown</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(Object.entries(results.categories) as [ScoreCategory, (typeof results.categories)[ScoreCategory]][]).map(([key, cat]) => (
            <div key={key} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <ScoreGauge score={cat.score} grade={cat.grade} size="sm" showLabel={false} />
              <div className="mt-2 text-xs font-medium text-slate-600">{CATEGORY_LABELS[key]}</div>
              <div className={cn("text-xs font-bold mt-0.5", cat.score >= cat.competitorAvg ? "text-emerald-600" : "text-red-500")}>
                {cat.score >= cat.competitorAvg ? "Above" : "Below"} avg
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 5 Priorities */}
      <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Your Top Priority Actions</h2>
        <p className="text-sm text-slate-500 mb-5">Fix these first for the highest revenue impact.</p>
        <div className="space-y-3">
          {results.topPriorities.map((action, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
              <div className="shrink-0 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {PRIORITY_ICON[action.priority]}
                  <span className="font-semibold text-sm text-slate-900">{action.title}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{action.estimatedImpact}</p>
                {action.tool2Upsell && (
                  <span className="inline-block mt-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    Fix with: {action.tool2Upsell}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Drill-downs */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Detailed Category Breakdown</h2>
        <div className="space-y-3">
          {(Object.entries(results.categories) as [ScoreCategory, (typeof results.categories)[ScoreCategory]][])
            .sort(([, a], [, b]) => a.score - b.score)
            .map(([key, cat]) => (
              <CategoryCard key={key} category={cat} />
            ))}
        </div>
      </div>

      {/* Upsell CTA */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to Fix These Gaps?</h2>
        <p className="text-blue-200 mb-6 max-w-lg mx-auto">
          We have AI-powered tools that directly address each of your weak areas — starting at $49/month.
          Most clients recoup their investment in the first week.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="bg-white text-blue-700 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            See the Fix It Plans →
          </button>
          <button className="border border-blue-400 text-white font-medium px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors">
            Talk to a Growth Advisor
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400">
        Report generated by LeadPulse · {new Date(results.completedAt).toLocaleString()} · {results.jobId}
      </p>
    </div>
  );
}
