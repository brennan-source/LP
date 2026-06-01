"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2, ArrowRight, Building2, Globe, Phone, MapPin, Mail, Briefcase, DollarSign } from "lucide-react";

const INDUSTRIES = [
  "Plumber",
  "Electrician",
  "HVAC / Heating & Cooling",
  "Roofer",
  "General Contractor",
  "Landscaper / Lawn Care",
  "Cleaning Service",
  "Painter",
  "Pest Control",
  "Auto Repair",
  "Dentist",
  "Chiropractor",
  "Physical Therapist",
  "Veterinarian",
  "Real Estate Agent",
  "Insurance Agent",
  "Financial Advisor",
  "Attorney / Law Firm",
  "Accountant / CPA",
  "Restaurant",
  "Salon / Barber",
  "Spa / Wellness",
  "Gym / Fitness",
  "Retail Store",
  "Daycare / Childcare",
  "Tutoring / Education",
  "Photography",
  "Wedding / Events",
  "Other",
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY"
];

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

export function AuditForm() {
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
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start checkout. Please try again.");
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" />Business Name</span>
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

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />Website URL</span>
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

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />Industry / Business Type</span>
          </label>
          <select required value={form.industry} onChange={set("industry")} className={cn(inputClass, "cursor-pointer")}>
            <option value="">Select your industry...</option>
            {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
          </select>
        </div>

        {/* Annual Revenue */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" />Annual Revenue <span className="text-slate-400 font-normal">(used to estimate your revenue impact)</span></span>
          </label>
          <select required value={form.revenueRange} onChange={set("revenueRange")} className={cn(inputClass, "cursor-pointer")}>
            <option value="">Select range...</option>
            <option value="under250k">Under $250K</option>
            <option value="250k_1m">$250K – $1M</option>
            <option value="1m_5m">$1M – $5M</option>
            <option value="5m_25m">$5M – $25M</option>
            <option value="over25m">$25M+</option>
          </select>
        </div>

        {/* City + State */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />City</span>
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
            <label className="block text-sm font-medium text-slate-700 mb-1.5">State</label>
            <select required value={form.state} onChange={set("state")} className={cn(inputClass, "cursor-pointer")}>
              <option value="">ST</option>
              {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />Phone Number
              <span className="text-slate-400 font-normal">(optional)</span>
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

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />Email — where to send your report</span>
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
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-2 transition-colors"
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" />Processing...</>
        ) : (
          <>Get My Report for $6 <ArrowRight className="w-5 h-5" /></>
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        Secure payment via Stripe · Report delivered instantly · 100% satisfaction guarantee
      </p>
    </form>
  );
}
