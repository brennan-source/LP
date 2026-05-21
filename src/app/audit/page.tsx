import { AuditForm } from "@/components/AuditForm";
import { Shield, Clock, BarChart2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Get Your Lead Gen Audit — LeadPulse",
  description: "Fill in your business details. We'll audit your entire lead generation system against local competitors and deliver a full report in minutes.",
};

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-sm transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />Back
          </Link>
          <span className="text-slate-200">|</span>
          <span className="font-bold text-slate-900 text-lg">LeadPulse</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-3">
            Get Your Free Lead Gen Audit
          </h1>
          <p className="text-slate-500 text-lg">
            We score your business against local competitors across 7 key areas and show you exactly where you're losing revenue.
          </p>
          <div className="mt-4 flex items-center justify-center gap-1">
            <span className="text-3xl font-black text-blue-600">$6</span>
            <span className="text-slate-400 text-sm ml-1">one-time · no subscription</span>
          </div>
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: <Clock className="w-5 h-5 text-blue-500" />, label: "Report in minutes" },
            { icon: <BarChart2 className="w-5 h-5 text-blue-500" />, label: "7-category deep audit" },
            { icon: <Shield className="w-5 h-5 text-blue-500" />, label: "100% money-back guarantee" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-3 text-center">
              <div className="flex justify-center mb-1.5">{item.icon}</div>
              <div className="text-xs font-medium text-slate-600">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <AuditForm />
        </div>

        {/* What's included */}
        <div className="mt-8 bg-blue-50 rounded-xl border border-blue-100 p-5">
          <h3 className="font-bold text-slate-800 mb-3 text-sm">What's included in your $6 audit:</h3>
          <ul className="space-y-1.5 text-sm text-slate-600">
            {[
              "Website performance & conversion analysis",
              "SEO audit vs top local competitors",
              "Social media & Google Business presence check",
              "Digital footprint (directories, reviews, citations)",
              "Lead capture infrastructure assessment",
              "Paid advertising competitive gap analysis",
              "AI search readiness score",
              "Estimated monthly revenue loss by category",
              "Prioritized action plan (top 5 fixes)",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
