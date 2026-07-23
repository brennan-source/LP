"use client";

import { GrowthScoreResults, ScoreCategory } from "@/types/growth-score";
import { ScoreGauge } from "./ScoreGauge";
import { CategoryCard } from "./CategoryCard";
import { formatDollars, cn } from "@/lib/utils";
import { AlertTriangle, TrendingUp, Zap, Target, Star, CheckCircle2 } from "lucide-react";

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

const REVENUE_LABELS: Record<string, string> = {
  under250k: "under $250K/year",
  "250k_1m": "$250K–$1M/year",
  "1m_5m": "$1M–$5M/year",
  "5m_25m": "$5M–$25M/year",
  over25m: "$25M+/year",
};

interface GrowthScoreReportProps {
  results: GrowthScoreResults;
}

export function GrowthScoreReport({ results }: GrowthScoreReportProps) {
  const vsCompetitor = results.overallScore - results.competitorAvgScore;
  const revenueLabel = results.revenueRange ? REVENUE_LABELS[results.revenueRange] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-2xl p-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-green-300 uppercase tracking-widest">Makr AI Growth Score</span>
            </div>
            <h1 className="text-2xl font-bold mb-1">{results.businessName}</h1>
            <p className="text-green-200 text-sm">{results.industry} · {results.city}, {results.state}</p>
            <p className="text-green-300/70 text-xs mt-2">
              Scored {new Date(results.completedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <div className="text-center">
            <ScoreGauge score={results.overallScore} grade={results.overallGrade} size="lg" showLabel={false} />
            <div className="mt-2 space-y-1">
              <div className="text-xs text-green-300">Overall Score</div>
              <div className={cn("text-sm font-bold", vsCompetitor >= 0 ? "text-emerald-300" : "text-red-300")}>
                {vsCompetitor >= 0 ? "+" : ""}{vsCompetitor} vs local avg
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
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className="font-bold text-red-800 text-lg">
                Est. {formatDollars(results.estimatedMonthlyRevenueLoss)}/month in missed revenue
              </h2>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">Estimate</span>
            </div>
            <p className="text-red-700 text-sm">
              Projection based on industry conversion benchmarks for a {results.industry} business
              {revenueLabel ? ` doing ${revenueLabel}` : ""} in {results.city} with your specific gap profile.
              Actual impact varies — this is a directional estimate, not a guarantee.
            </p>
          </div>
        </div>
      )}

      {/* Score Overview Grid */}
      <div>
        <h2 className="text-lg font-bold text-stone-900 mb-4">Score Breakdown</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(Object.entries(results.categories) as [ScoreCategory, (typeof results.categories)[ScoreCategory]][]).map(([key, cat]) => (
            <div key={key} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 text-center">
              <ScoreGauge score={cat.score} grade={cat.grade} size="sm" showLabel={false} />
              <div className="mt-2 text-xs font-medium text-stone-600">{CATEGORY_LABELS[key]}</div>
              <div className={cn("text-xs font-bold mt-0.5", cat.score >= cat.competitorAvg ? "text-emerald-600" : "text-red-500")}>
                {cat.score >= cat.competitorAvg ? "Above" : "Below"} avg
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real Competitors */}
      {results.competitors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-stone-900">Competitors in Your Area</h2>
            <span className="text-xs text-stone-400">Via Google Places</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {results.competitors.map((comp, i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-stone-900 text-sm truncate">{comp.name}</p>
                  {comp.domain && (
                    <p className="text-xs text-stone-400 truncate">{comp.domain}</p>
                  )}
                </div>
                {comp.rating != null && (
                  <div className="shrink-0 text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-bold text-stone-900">{comp.rating.toFixed(1)}</span>
                    </div>
                    {comp.reviewCount != null && (
                      <p className="text-xs text-stone-400">{comp.reviewCount.toLocaleString()} reviews</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top 5 Priorities */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-stone-900 mb-1">Your Top Priority Actions</h2>
        <p className="text-sm text-stone-500 mb-5">Fix these first for the highest revenue impact.</p>
        <div className="space-y-3">
          {results.topPriorities.map((action, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-stone-50">
              <div className="shrink-0 w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {PRIORITY_ICON[action.priority]}
                  <span className="font-semibold text-sm text-stone-900">{action.title}</span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">{action.estimatedImpact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 90-Day Roadmap */}
      {results.roadmap.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-stone-900 mb-1">Your 90-Day Roadmap</h2>
          <p className="text-sm text-stone-500 mb-5">A phased plan to close the gaps above, ordered by impact and urgency.</p>
          <div className="space-y-4">
            {results.roadmap.map((phase) => (
              <div key={phase.phase} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="shrink-0 w-9 h-9 bg-green-700 text-white rounded-xl flex items-center justify-center font-black text-sm">
                    {phase.phase}
                  </div>
                  <div>
                    <div className="font-bold text-stone-900">{phase.title}</div>
                    <div className="text-xs text-stone-400 uppercase tracking-wide">{phase.dayRange}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {phase.actions.map((action, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>
                        <span className="font-medium">{action.title}</span>
                        <span className="text-stone-400"> — {CATEGORY_LABELS[action.category]}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Drill-downs */}
      <div>
        <h2 className="text-lg font-bold text-stone-900 mb-4">Detailed Category Breakdown</h2>
        <div className="space-y-3">
          {(Object.entries(results.categories) as [ScoreCategory, (typeof results.categories)[ScoreCategory]][])
            .sort(([, a], [, b]) => a.score - b.score)
            .map(([key, cat]) => (
              <CategoryCard key={key} category={cat} />
            ))}
        </div>
      </div>

      {/* Strategy call CTA */}
      <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to Fix These Gaps?</h2>
        <p className="text-green-200 mb-6 max-w-lg mx-auto">
          Book a free 1-hour strategy call and we&apos;ll walk through your 90-day roadmap together — no pressure, no obligation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/contact" className="bg-white text-green-800 font-bold px-8 py-4 rounded-xl hover:bg-stone-50 transition shadow-lg">
            Book Your Free Strategy Call
          </a>
          <a href="/pricing" className="border border-white/40 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 transition">
            See Pricing
          </a>
        </div>
      </div>

      <p className="text-center text-xs text-stone-400">
        Report generated by Makr.ai · {new Date(results.completedAt).toLocaleString()} · {results.submissionId}
      </p>
    </div>
  );
}
