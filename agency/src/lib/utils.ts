import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Grade } from "@/types/growth-score";

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

export function gradeBg(grade: Grade): string {
  const map: Record<Grade, string> = {
    A: "bg-emerald-50 border-emerald-200",
    B: "bg-blue-50 border-blue-200",
    C: "bg-yellow-50 border-yellow-200",
    D: "bg-orange-50 border-orange-200",
    F: "bg-red-50 border-red-200",
  };
  return map[grade];
}

export function normalizeUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

export function extractDomain(url: string): string {
  try {
    const u = new URL(normalizeUrl(url));
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function formatDollars(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
