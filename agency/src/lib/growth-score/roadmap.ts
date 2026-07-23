import { CategoryScore, RoadmapAction, RoadmapPhase, ScoreCategory } from "@/types/growth-score";

// Buckets every recommended action across all scored categories into a 3-phase,
// 90-day roadmap by priority. Critical gaps get fixed first — they're the actions
// with the clearest, fastest revenue impact — then high, then medium/low.
export function buildRoadmap(categories: Record<ScoreCategory, CategoryScore>): RoadmapPhase[] {
  const allActions: RoadmapAction[] = (Object.entries(categories) as [ScoreCategory, CategoryScore][])
    .flatMap(([category, cat]) => cat.actions.map((action) => ({ ...action, category })));

  const critical = allActions.filter((a) => a.priority === "critical");
  const high = allActions.filter((a) => a.priority === "high");
  const rest = allActions.filter((a) => a.priority === "medium" || a.priority === "low");

  const phases: RoadmapPhase[] = [
    {
      phase: 1,
      title: "Stop the bleeding",
      dayRange: "Days 1–30",
      actions: critical.slice(0, 5),
    },
    {
      phase: 2,
      title: "Build momentum",
      dayRange: "Days 31–60",
      actions: high.slice(0, 5),
    },
    {
      phase: 3,
      title: "Compound the gains",
      dayRange: "Days 61–90",
      actions: rest.slice(0, 5),
    },
  ];

  return phases.filter((phase) => phase.actions.length > 0);
}
