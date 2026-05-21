"use client";

import { Grade } from "@/types/audit";
import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  grade: Grade;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const GRADE_COLORS: Record<Grade, { ring: string; text: string; bg: string }> = {
  A: { ring: "stroke-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50" },
  B: { ring: "stroke-blue-500", text: "text-blue-600", bg: "bg-blue-50" },
  C: { ring: "stroke-yellow-500", text: "text-yellow-600", bg: "bg-yellow-50" },
  D: { ring: "stroke-orange-500", text: "text-orange-600", bg: "bg-orange-50" },
  F: { ring: "stroke-red-500", text: "text-red-600", bg: "bg-red-50" },
};

const SIZE_MAP = {
  sm: { outer: 64, strokeWidth: 5, fontSize: "text-lg", gradeFontSize: "text-xs" },
  md: { outer: 96, strokeWidth: 7, fontSize: "text-2xl", gradeFontSize: "text-sm" },
  lg: { outer: 140, strokeWidth: 10, fontSize: "text-4xl", gradeFontSize: "text-base" },
};

export function ScoreGauge({ score, grade, size = "md", showLabel = true }: ScoreGaugeProps) {
  const { outer, strokeWidth, fontSize, gradeFontSize } = SIZE_MAP[size];
  const colors = GRADE_COLORS[grade];
  const radius = (outer - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;
  const center = outer / 2;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: outer, height: outer }}>
        <svg width={outer} height={outer} className="-rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className={cn("transition-all duration-700", colors.ring)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-black leading-none", fontSize, colors.text)}>{grade}</span>
          <span className={cn("font-medium text-slate-500 leading-none mt-0.5", gradeFontSize)}>{score}</span>
        </div>
      </div>
      {showLabel && (
        <span className="text-xs text-slate-500 font-medium">{score}/100</span>
      )}
    </div>
  );
}
