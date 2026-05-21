"use client";

import { useState } from "react";
import { CategoryScore } from "@/types/audit";
import { ScoreGauge } from "./ScoreGauge";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, AlertTriangle, TrendingUp, Zap } from "lucide-react";
import { formatDollars } from "@/lib/utils";

interface CategoryCardProps {
  category: CategoryScore;
  className?: string;
}

const PRIORITY_STYLES = {
  critical: { bg: "bg-red-50 border-red-200", badge: "bg-red-100 text-red-700", icon: <AlertTriangle className="w-3 h-3" /> },
  high: { bg: "bg-orange-50 border-orange-200", badge: "bg-orange-100 text-orange-700", icon: <TrendingUp className="w-3 h-3" /> },
  medium: { bg: "bg-yellow-50 border-yellow-200", badge: "bg-yellow-100 text-yellow-700", icon: <Zap className="w-3 h-3" /> },
  low: { bg: "bg-green-50 border-green-200", badge: "bg-green-100 text-green-700", icon: <Zap className="w-3 h-3" /> },
};

export function CategoryCard({ category, className }: CategoryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const vsCompetitor = category.score - category.competitorAvg;

  return (
    <div className={cn("bg-white rounded-xl border border-slate-200 overflow-hidden", className)}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left"
      >
        <ScoreGauge score={category.score} grade={category.grade} size="sm" showLabel={false} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-slate-900">{category.label}</h3>
            {category.actions.length > 0 && (
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {category.actions.length} action{category.actions.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 truncate">{category.summary}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* vs competitor */}
          <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-400 mb-0.5">vs competitors</div>
            <div className={cn("text-sm font-bold", vsCompetitor >= 0 ? "text-emerald-600" : "text-red-500")}>
              {vsCompetitor >= 0 ? "+" : ""}{vsCompetitor}
            </div>
          </div>

          {category.estimatedRevenueLoss && category.estimatedRevenueLoss > 0 ? (
            <div className="text-right hidden md:block">
              <div className="text-xs text-slate-400 mb-0.5">est. loss/mo</div>
              <div className="text-sm font-bold text-red-500">{formatDollars(category.estimatedRevenueLoss)}</div>
            </div>
          ) : null}

          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 p-5 space-y-5">
          {/* Score bar vs competitor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Your score</span>
              <span className="font-medium text-slate-700">{category.score}/100</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all", {
                  "bg-emerald-500": category.grade === "A",
                  "bg-blue-500": category.grade === "B",
                  "bg-yellow-500": category.grade === "C",
                  "bg-orange-500": category.grade === "D",
                  "bg-red-500": category.grade === "F",
                })}
                style={{ width: `${category.score}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Competitor average</span>
              <span className="font-medium text-slate-700">{category.competitorAvg}/100</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-slate-300" style={{ width: `${category.competitorAvg}%` }} />
            </div>
          </div>

          {/* Details */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Audit Findings</h4>
            <ul className="space-y-1">
              {category.details.map((detail, i) => (
                <li key={i} className="text-sm text-slate-600">{detail}</li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          {category.actions.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Recommended Actions</h4>
              <div className="space-y-3">
                {category.actions.map((action, i) => {
                  const styles = PRIORITY_STYLES[action.priority];
                  return (
                    <div key={i} className={cn("border rounded-lg p-3", styles.bg)}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded", styles.badge)}>
                          {styles.icon}
                          {action.priority.toUpperCase()}
                        </span>
                        <span className="text-sm font-semibold text-slate-800">{action.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-1">{action.description}</p>
                      <p className="text-xs font-medium text-slate-700">Impact: {action.estimatedImpact}</p>
                      {action.tool2Upsell && (
                        <div className="mt-2 pt-2 border-t border-slate-200">
                          <span className="text-xs text-blue-600 font-medium">
                            Fix this with: {action.tool2Upsell} →
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
