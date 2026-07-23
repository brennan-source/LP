"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2, ArrowRight, Building2, Globe, Phone, MapPin, Mail, Briefcase, DollarSign } from "lucide-react";
import { INDUSTRY_GROUPS, REVENUE_RANGES, US_STATES } from "@/lib/growth-score/constants";

interface FormData {
  businessName: string;
  websiteUrl: string;
  phoneNumber: string;
  industry: string;
  city: string;
  state: string;
  email: string;
  revenueRange: string;
}

export function GrowthScoreForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    businessName: "",
    websiteUrl: "",
    phoneNumber: "",
    industry: "",
    city: "",
    state: "",
    email: "",
    revenueRange: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/growth-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      router.push(`/growth-score/report/${data.submissionId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start your Growth Score. Please try again.");
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" />Business Name <span className="text-green-700">*</span></span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Riverside Plumbing Co."
            value={form.businessName}
            onChange={set("businessName")}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />Website URL <span className="text-green-700">*</span></span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. www.riversideplumbing.com"
            value={form.websiteUrl}
            onChange={set("websiteUrl")}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />Industry <span className="text-green-700">*</span></span>
          </label>
          <select required value={form.industry} onChange={set("industry")} className={cn(inputClass, "cursor-pointer")}>
            <option value="">Select your industry...</option>
            {INDUSTRY_GROUPS.map((group) => (
              <optgroup key={group.group} label={group.group}>
                {group.industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" />Annual Revenue <span className="text-stone-400 font-normal">(used to estimate your revenue impact)</span></span>
          </label>
          <select required value={form.revenueRange} onChange={set("revenueRange")} className={cn(inputClass, "cursor-pointer")}>
            <option value="">Select range...</option>
            {REVENUE_RANGES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-stone-700 mb-1.5">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />City <span className="text-green-700">*</span></span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Austin"
              value={form.city}
              onChange={set("city")}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">State</label>
            <select required value={form.state} onChange={set("state")} className={cn(inputClass, "cursor-pointer")}>
              <option value="">ST</option>
              {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />Phone Number
              <span className="text-stone-400 font-normal">(optional)</span>
            </span>
          </label>
          <input
            type="tel"
            placeholder="e.g. (512) 555-0100"
            value={form.phoneNumber}
            onChange={set("phoneNumber")}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />Email — where to send your report <span className="text-green-700">*</span></span>
          </label>
          <input
            type="email"
            required
            placeholder="you@yourbusiness.com"
            value={form.email}
            onChange={set("email")}
            className={inputClass}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-700 hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-2 transition shadow-lg shadow-green-900/20"
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" />Starting your Growth Score...</>
        ) : (
          <>Get My Free Growth Score <ArrowRight className="w-5 h-5" /></>
        )}
      </button>

      <p className="text-center text-xs text-stone-400">
        100% free · Report delivered instantly
      </p>
    </form>
  );
}
