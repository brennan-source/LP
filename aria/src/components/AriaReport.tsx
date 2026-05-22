"use client";

import { AriaReport as AriaReportType, AssessmentCategory, CategoryResult } from "@/types/assessment";
import { cn, formatDollars } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, TrendingUp, Zap, Target, CheckCircle, ArrowRight } from "lucide-react";

const CATEGORY_LABELS: Record<AssessmentCategory, string> = {
  aiLeadership: "AI Leadership",
  teamAdoption: "Team Adoption",
  salesMarketing: "Sales & Marketing",
  operations: "Operations",
  financeAdmin: "Finance & Admin",
  customerExperience: "Customer Experience",
  techStack: "Tech Stack",
  dataReadiness: "Data Readiness",
};

const GRADE_RING: Record<string, string> = {
  A: "stroke-emerald-500", B: "stroke-blue-500", C: "stroke-yellow-500", D: "stroke-orange-500", F: "stroke-red-500",
};
const GRADE_TEXT: Record<string, string> = {
  A: "text-emerald-600", B: "text-blue-600", C: "text-yellow-600", D: "text-orange-600", F: "text-red-600",
};
const GRADE_BAR: Record<string, string> = {
  A: "bg-emerald-500", B: "bg-blue-500", C: "bg-yellow-500", D: "bg-orange-500", F: "bg-red-500",
};

const PRIORITY_STYLE = {
  critical: { badge: "bg-red-100 text-red-700", icon: <AlertTriangle className="w-3.5 h-3.5" /> },
  high: { badge: "bg-orange-100 text-orange-700", icon: <TrendingUp className="w-3.5 h-3.5" /> },
  medium: { badge: "bg-yellow-100 text-yellow-700", icon: <Zap className="w-3.5 h-3.5" /> },
  low: { badge: "bg-green-100 text-green-700", icon: <Target className="w-3.5 h-3.5" /> },
};

const TIER_LABEL: Record<string, string> = {
  course: "Online Course",
  workshop: "Workshop",
  consulting: "Consulting",
  fractional: "Fractional AI Officer",
  build: "Custom Build",
};

function MiniGauge({ score, grade, size = 64 }: { score: number; grade: string; size?: number }) {
  const sw = size / 12;
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const c = size / 2;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={c} cy={c} r={r} fill="none" stroke="currentColor" strokeWidth={sw} className="text-slate-100" />
        <circle cx={c} cy={c} r={r} fill="none" strokeWidth={sw} strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" className={GRADE_RING[grade] || "stroke-slate-400"} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-black leading-none", size >= 100 ? "text-4xl" : "text-lg", GRADE_TEXT[grade])}>{grade}</span>
        <span className="text-slate-400 text-xs leading-none">{score}</span>
      </div>
    </div>
  );
}

function CategoryCard({ catKey, cat }: { catKey: AssessmentCategory; cat: CategoryResult }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left">
        <MiniGauge score={cat.score} grade={cat.grade} size={56} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-semibold text-slate-900 text-sm">{CATEGORY_LABELS[catKey]}</span>
            {cat.actions.length > 0 && (
              <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">{cat.actions.length} action{cat.actions.length !== 1 ? "s" : ""}</span>
            )}
          </div>
          <p className="text-xs text-slate-500 truncate">{cat.summary}</p>
          {(cat.estimatedMonthlySavings > 0 || cat.estimatedRevenueImpact > 0) && (
            <div className="flex gap-3 mt-1">
              {cat.estimatedMonthlySavings > 0 && (
                <span className="text-xs font-semibold text-red-500">{formatDollars(cat.estimatedMonthlySavings)}/mo savings potential</span>
              )}
              {cat.estimatedRevenueImpact > 0 && (
                <span className="text-xs font-semibold text-emerald-600">+{formatDollars(cat.estimatedRevenueImpact)}/mo revenue potential</span>
              )}
            </div>
          )}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>
      {open && (
        <div className="border-t border-slate-100 p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Score</span><span>{cat.score}/100</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={cn("h-full rounded-full", GRADE_BAR[cat.grade])} style={{ width: `${cat.score}%` }} />
            </div>
          </div>
          <ul className="space-y-1">
            {cat.details.map((d, i) => <li key={i} className="text-sm text-slate-600">{d}</li>)}
          </ul>
          {cat.actions.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</div>
              {cat.actions.map((a, i) => {
                const st = PRIORITY_STYLE[a.priority];
                return (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded", st.badge)}>{st.icon}{a.priority.toUpperCase()}</span>
                      <span className="text-sm font-semibold text-slate-800">{a.title}</span>
                    </div>
                    <p className="text-xs text-slate-600">{a.description}</p>
                    <p className="text-xs font-medium text-slate-700 mt-1">Impact: {a.estimatedImpact}</p>
                    {a.productRecommendation && (
                      <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-xs text-violet-700 font-medium">{a.productRecommendation}</span>
                        {a.tier && <span className="text-xs bg-violet-50 text-violet-600 px-2 py-0.5 rounded-full">{TIER_LABEL[a.tier]}</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function AriaReport({ report }: { report: AriaReportType }) {
  const totalOpportunity = report.estimatedMonthlySavings + report.estimatedRevenueImpact;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-900 to-indigo-800 rounded-2xl p-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold text-violet-300 uppercase tracking-widest mb-1">Aria AI Readiness Report</div>
            <h1 className="text-2xl font-bold mb-1">{report.businessName}</h1>
            <p className="text-violet-300 text-sm">{report.industry} · {report.city}, {report.state}</p>
            <p className="text-violet-400 text-xs mt-2">
              {new Date(report.completedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <div className="text-center shrink-0">
            <MiniGauge score={report.overallScore} grade={report.overallGrade} size={130} />
            <div className="mt-2 text-xs text-violet-300">AI Readiness Score</div>
          </div>
        </div>
      </div>

      {/* Impact Banner */}
      {totalOpportunity > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-red-600">{formatDollars(report.estimatedMonthlySavings)}</div>
            <div className="text-xs text-red-700 font-medium mt-1">Est. monthly cost savings available</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-emerald-600">+{formatDollars(report.estimatedRevenueImpact)}</div>
            <div className="text-xs text-emerald-700 font-medium mt-1">Est. monthly revenue impact</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-blue-600">{report.automationOpportunityHours} hrs</div>
            <div className="text-xs text-blue-700 font-medium mt-1">Hours/month that could be automated</div>
          </div>
        </div>
      )}

      {/* Category overview */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Scores by Category</h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {(Object.entries(report.categories) as [AssessmentCategory, CategoryResult][]).map(([key, cat]) => (
            <div key={key} className="text-center">
              <MiniGauge score={cat.score} grade={cat.grade} size={52} />
              <div className="text-xs text-slate-500 mt-1 leading-tight">{CATEGORY_LABELS[key].split(" ")[0]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top priorities */}
      <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Your Top Priority Actions</h2>
        <p className="text-sm text-slate-500 mb-5">Ranked by revenue and efficiency impact.</p>
        <div className="space-y-3">
          {report.topPriorities.map((action, i) => {
            const st = PRIORITY_STYLE[action.priority];
            return (
              <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0 mt-0.5">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn("inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded", st.badge)}>{st.icon}{action.priority.toUpperCase()}</span>
                    <span className="font-semibold text-sm text-slate-900">{action.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{action.estimatedImpact}</p>
                  {action.productRecommendation && (
                    <span className="inline-block mt-1 text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full font-medium">{action.productRecommendation}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed categories */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Detailed Category Breakdown</h2>
        <div className="space-y-3">
          {(Object.entries(report.categories) as [AssessmentCategory, CategoryResult][])
            .sort(([, a], [, b]) => a.score - b.score)
            .map(([key, cat]) => (
              <CategoryCard key={key} catKey={key} cat={cat} />
            ))}
        </div>
      </div>

      {/* Roadmap */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Your AI Transformation Roadmap</h2>
        <div className="space-y-4">
          {report.roadmap.map((phase) => (
            <div key={phase.phase} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-violet-600 text-white rounded-xl flex items-center justify-center text-lg font-black shrink-0">{phase.phase}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <h3 className="font-bold text-slate-900">{phase.title}</h3>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{phase.timeline}</span>
                  </div>
                  <ul className="space-y-1 mb-2">
                    {phase.actions.map((a, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-violet-500 mt-0.5 shrink-0" />{a}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                    <span className="text-emerald-600 font-semibold">Expected ROI: {phase.estimatedROI}</span>
                    {phase.recommendedProduct && (
                      <span className="bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full font-medium">{phase.recommendedProduct}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to start your AI transformation?</h2>
        <p className="text-violet-200 mb-6 max-w-lg mx-auto">
          From a $197 online course to a full AI system build — we have the right product for where you are right now.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/products" className="bg-white text-violet-700 font-bold px-8 py-3 rounded-xl hover:bg-violet-50 transition-colors inline-flex items-center gap-2">
            See All Products & Pricing <ArrowRight className="w-4 h-4" />
          </a>
          <a href="/consult" className="border border-violet-400 text-white font-medium px-8 py-3 rounded-xl hover:bg-violet-700 transition-colors">
            Book a Free Strategy Call
          </a>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400">
        Aria AI Readiness Report · {new Date(report.completedAt).toLocaleString()} · {report.assessmentId}
      </p>
    </div>
  );
}
