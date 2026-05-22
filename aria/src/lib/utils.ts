import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Grade } from "@/types/assessment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scoreToGrade(score: number): Grade {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
}

export function gradeColor(grade: Grade): string {
  const map: Record<Grade, string> = {
    A: "text-emerald-500",
    B: "text-blue-500",
    C: "text-yellow-500",
    D: "text-orange-500",
    F: "text-red-500",
  };
  return map[grade];
}

export function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

export function formatDollars(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
