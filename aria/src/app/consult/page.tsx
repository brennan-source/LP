import Link from "next/link";
import { ArrowRight, Calendar, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Book a Free Strategy Call — Aria",
  description: "Talk through your AI readiness results and find the right next step for your business.",
};

export default function ConsultPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-black text-slate-900 text-xl">Aria</Link>
          <Link href="/assess" className="bg-violet-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-violet-700 transition-colors">
            Get Your Scorecard — $15
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-xl w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-100 mb-6">
            <Calendar className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4">Let's talk through your results</h1>
          <p className="text-lg text-slate-500 mb-10">
            30 minutes. No pitch. We'll walk through your scorecard together and I'll tell you exactly what I'd do first if I were you.
          </p>

          <div className="space-y-4">
            <a
              href="mailto:brennan@teamaria.ai?subject=Aria Strategy Call Request"
              className="flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              <MessageSquare className="w-5 h-5" />
              Email Brennan to Book
            </a>
            <p className="text-slate-400 text-sm">
              Or send a message directly to{" "}
              <a href="mailto:brennan@teamaria.ai" className="text-violet-600 hover:underline">
                brennan@teamaria.ai
              </a>
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <p className="text-slate-500 text-sm mb-4">Haven't taken the assessment yet?</p>
            <Link
              href="/assess"
              className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:text-violet-700 transition-colors"
            >
              Get your AI Readiness Scorecard first — $15 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
