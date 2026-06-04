"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2, ArrowRight, ArrowLeft, CheckCircle, Building2, Globe, MapPin, Mail, Briefcase, Users, DollarSign, Phone } from "lucide-react";

const AI_TOOLS_OPTIONS = [
  "ChatGPT / OpenAI", "Claude (Anthropic)", "Gemini (Google)",
  "Copilot (Microsoft)", "Midjourney / DALL-E", "Jasper / Copy.ai",
  "HubSpot AI", "Salesforce Einstein", "Zapier AI", "Make.com",
  "Notion AI", "Grammarly", "Other AI tools", "None yet",
];

const INDUSTRIES = [
  "Plumber", "Electrician", "HVAC / Heating & Cooling", "Roofer",
  "General Contractor", "Landscaper / Lawn Care", "Cleaning Service",
  "Painter", "Pest Control", "Auto Repair", "Dentist", "Chiropractor",
  "Physical Therapist", "Veterinarian", "Real Estate Agent",
  "Insurance Agent", "Financial Advisor", "Attorney / Law Firm",
  "Accountant / CPA", "Restaurant", "Salon / Barber", "Spa / Wellness",
  "Gym / Fitness", "Retail Store", "Daycare / Childcare",
  "Tutoring / Education", "Photography", "Wedding / Events", "Other",
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

interface BusinessForm {
  businessName: string; websiteUrl: string; phoneNumber: string;
  industry: string; city: string; state: string;
  teamSize: string; revenueRange: string; email: string;
}

interface QuizState {
  personalAIUsageFreq: string;
  aiToolsUsed: string[];
  teamAIUsage: string;
  aiTrainingDone: string;
  salesAutomationLevel: string;
  followUpProcess: string;
  crmUsage: string;
  adminHoursPerWeek: string;
  schedulingMethod: string;
  biggestTimeDrain: string;
  invoicingMethod: string;
  reportingMethod: string;
  topAutomationPriority: string;
}

const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 transition-all";
const selectCls = cn(inputCls, "cursor-pointer");

const RadioGroup = ({ name, value, onChange, options }: {
  name: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string; desc?: string }[];
}) => (
  <div className="space-y-2">
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        onClick={() => onChange(opt.value)}
        className={cn(
          "w-full text-left p-4 rounded-xl border-2 transition-all",
          value === opt.value
            ? "border-violet-500 bg-violet-50"
            : "border-slate-200 hover:border-slate-300 bg-white"
        )}
      >
        <div className="flex items-start gap-3">
          <div className={cn(
            "mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
            value === opt.value ? "border-violet-500 bg-violet-500" : "border-slate-300"
          )}>
            {value === opt.value && <div className="w-2 h-2 bg-white rounded-full" />}
          </div>
          <div>
            <div className="font-medium text-slate-900 text-sm">{opt.label}</div>
            {opt.desc && <div className="text-xs text-slate-500 mt-0.5">{opt.desc}</div>}
          </div>
        </div>
      </button>
    ))}
  </div>
);

export function AssessmentFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"business" | "scanning" | "quiz" | "submitting">("business");
  const [assessmentId, setAssessmentId] = useState<string>("");
  const [quizPage, setQuizPage] = useState(0);
  const [error, setError] = useState("");
  const [coupon, setCoupon] = useState(searchParams.get("coupon") || "");
  const [loading, setLoading] = useState(false);

  const [biz, setBiz] = useState<BusinessForm>({
    businessName: "", websiteUrl: "", phoneNumber: "",
    industry: "", city: "", state: "",
    teamSize: "", revenueRange: "", email: "",
  });

  const [quiz, setQuiz] = useState<QuizState>({
    personalAIUsageFreq: "", aiToolsUsed: [], teamAIUsage: "",
    aiTrainingDone: "", salesAutomationLevel: "", followUpProcess: "",
    crmUsage: "", adminHoursPerWeek: "", schedulingMethod: "",
    biggestTimeDrain: "", invoicingMethod: "", reportingMethod: "",
    topAutomationPriority: "",
  });

  const setBizField = (f: keyof BusinessForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setBiz((p) => ({ ...p, [f]: e.target.value }));

  const setQuizField = (f: keyof QuizState) => (v: string) =>
    setQuiz((p) => ({ ...p, [f]: v }));

  const toggleTool = (tool: string) => {
    setQuiz((p) => ({
      ...p,
      aiToolsUsed: p.aiToolsUsed.includes(tool)
        ? p.aiToolsUsed.filter((t) => t !== tool)
        : [...p.aiToolsUsed, tool],
    }));
  };

  // Poll for scan completion
  useEffect(() => {
    if (step !== "scanning" || !assessmentId) return;
    let t: NodeJS.Timeout;
    async function poll() {
      const res = await fetch(`/api/assess/${assessmentId}`);
      const data = await res.json();
      if (data.status === "awaiting_quiz") {
        setStep("quiz");
      } else {
        t = setTimeout(poll, 1500);
      }
    }
    poll();
    return () => clearTimeout(t);
  }, [step, assessmentId]);

  async function handleBizSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...biz, revenueRange: biz.revenueRange || "250k_1m", teamSize: biz.teamSize || "2to5" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAssessmentId(data.assessmentId);
      setStep("scanning");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleQuizSubmit() {
    setLoading(true);
    setStep("submitting");
    try {
      // Save answers
      await fetch(`/api/assess/${assessmentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: quiz }),
      });
      // Checkout
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentId, coupon }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
      setStep("quiz");
    }
  }

  const QUIZ_PAGES = [
    {
      title: "Your personal AI usage",
      subtitle: "Let's start with how you use AI as an individual.",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">How often do you personally use AI tools?</label>
            <RadioGroup name="freq" value={quiz.personalAIUsageFreq} onChange={setQuizField("personalAIUsageFreq")} options={[
              { value: "daily", label: "Daily", desc: "Part of my everyday workflow" },
              { value: "weekly", label: "A few times a week", desc: "I use it, but not every day" },
              { value: "monthly", label: "Occasionally", desc: "A few times a month" },
              { value: "rarely", label: "Rarely", desc: "I've tried it but don't use it regularly" },
              { value: "never", label: "Never", desc: "I haven't started using AI tools yet" },
            ]} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Which AI tools do you use? <span className="font-normal text-slate-400">(select all that apply)</span></label>
            <div className="grid grid-cols-2 gap-2">
              {AI_TOOLS_OPTIONS.map((tool) => (
                <button key={tool} type="button" onClick={() => toggleTool(tool)}
                  className={cn("text-left p-3 rounded-xl border-2 text-sm transition-all",
                    quiz.aiToolsUsed.includes(tool) ? "border-violet-500 bg-violet-50 text-violet-700 font-medium" : "border-slate-200 hover:border-slate-300 text-slate-700"
                  )}>
                  {quiz.aiToolsUsed.includes(tool) && "✓ "}{tool}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      isValid: () => !!quiz.personalAIUsageFreq,
    },
    {
      title: "Your team's AI adoption",
      subtitle: "How is your team using AI in their work?",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">How many of your team members use AI tools in their work?</label>
            <RadioGroup name="team" value={quiz.teamAIUsage} onChange={setQuizField("teamAIUsage")} options={[
              { value: "all", label: "All or most of us", desc: "AI is part of our team culture" },
              { value: "some", label: "Some team members", desc: "A handful are using it" },
              { value: "few", label: "Just one or two", desc: "Only a couple people have tried it" },
              { value: "none", label: "Nobody yet", desc: "We haven't started" },
            ]} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Has your team had any formal AI training?</label>
            <RadioGroup name="training" value={quiz.aiTrainingDone} onChange={setQuizField("aiTrainingDone")} options={[
              { value: "true", label: "Yes, we've done training", desc: "At least some structured learning" },
              { value: "false", label: "No formal training", desc: "People have self-taught or not started" },
            ]} />
          </div>
        </div>
      ),
      isValid: () => !!quiz.teamAIUsage && !!quiz.aiTrainingDone,
    },
    {
      title: "Sales & marketing process",
      subtitle: "How automated is your sales and marketing pipeline?",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">How much of your sales process is automated?</label>
            <RadioGroup name="sales" value={quiz.salesAutomationLevel} onChange={setQuizField("salesAutomationLevel")} options={[
              { value: "full", label: "Fully automated", desc: "Leads flow through to booking with minimal manual work" },
              { value: "mostly", label: "Mostly automated", desc: "Most steps are automated, a few are manual" },
              { value: "partial", label: "Partially automated", desc: "Some automation but mostly manual" },
              { value: "none", label: "Almost entirely manual", desc: "We handle most things by hand" },
            ]} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">How do you handle lead follow-up?</label>
            <RadioGroup name="followup" value={quiz.followUpProcess} onChange={setQuizField("followUpProcess")} options={[
              { value: "automated", label: "Automated sequences", desc: "Emails and texts go out automatically" },
              { value: "partial", label: "Mix of automated and manual", desc: "Some automation, some personal outreach" },
              { value: "manual", label: "All manual", desc: "We follow up by hand each time" },
            ]} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">What CRM or contact system do you use?</label>
            <RadioGroup name="crm" value={quiz.crmUsage} onChange={setQuizField("crmUsage")} options={[
              { value: "ai", label: "AI-powered CRM", desc: "HubSpot, Salesforce, GoHighLevel with automation" },
              { value: "advanced", label: "Advanced CRM", desc: "Solid system with pipelines and automations" },
              { value: "basic", label: "Basic CRM or spreadsheet", desc: "Basic contact tracking" },
              { value: "none", label: "No CRM", desc: "Contacts live in email, notes, or memory" },
            ]} />
          </div>
        </div>
      ),
      isValid: () => !!quiz.salesAutomationLevel && !!quiz.followUpProcess && !!quiz.crmUsage,
    },
    {
      title: "Operations & administration",
      subtitle: "How much manual work is in your day-to-day operations?",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">How many hours per week does your team spend on administrative tasks?</label>
            <RadioGroup name="admin" value={quiz.adminHoursPerWeek} onChange={setQuizField("adminHoursPerWeek")} options={[
              { value: "under5", label: "Less than 5 hours", desc: "Operations are fairly automated" },
              { value: "5to10", label: "5-10 hours/week", desc: "Some administrative overhead" },
              { value: "10to20", label: "10-20 hours/week", desc: "Significant manual work" },
              { value: "over20", label: "20+ hours/week", desc: "Operations are mostly manual" },
            ]} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">How do you handle scheduling and booking?</label>
            <RadioGroup name="scheduling" value={quiz.schedulingMethod} onChange={setQuizField("schedulingMethod")} options={[
              { value: "ai", label: "AI-powered scheduling", desc: "Smart automation handles booking and reminders" },
              { value: "automated", label: "Online booking tool", desc: "Calendly, Acuity, or similar" },
              { value: "manual_online", label: "Manual online", desc: "Customers request, we confirm manually" },
              { value: "phone", label: "Phone only", desc: "All scheduling happens by phone" },
            ]} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">What's your biggest operational time drain?</label>
            <RadioGroup name="drain" value={quiz.biggestTimeDrain} onChange={setQuizField("biggestTimeDrain")} options={[
              { value: "admin", label: "Admin and paperwork" },
              { value: "customer_comms", label: "Customer communication and follow-up" },
              { value: "scheduling", label: "Scheduling and coordination" },
              { value: "marketing", label: "Marketing and content creation" },
              { value: "reporting", label: "Reporting and tracking metrics" },
            ]} />
          </div>
        </div>
      ),
      isValid: () => !!quiz.adminHoursPerWeek && !!quiz.schedulingMethod && !!quiz.biggestTimeDrain,
    },
    {
      title: "Finance & reporting",
      subtitle: "How are you handling invoicing, payments, and business intelligence?",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">How do you handle invoicing and billing?</label>
            <RadioGroup name="invoice" value={quiz.invoicingMethod} onChange={setQuizField("invoicingMethod")} options={[
              { value: "automated", label: "Fully automated", desc: "Invoices generate and send automatically" },
              { value: "software", label: "Accounting software", desc: "QuickBooks, FreshBooks, or similar" },
              { value: "manual", label: "Manual", desc: "We create and send invoices by hand" },
            ]} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">How do you track business performance?</label>
            <RadioGroup name="reporting" value={quiz.reportingMethod} onChange={setQuizField("reportingMethod")} options={[
              { value: "realtime", label: "Real-time dashboard", desc: "I have live visibility into my key metrics" },
              { value: "software", label: "Software reports", desc: "I pull reports from tools periodically" },
              { value: "spreadsheets", label: "Spreadsheets", desc: "Manual tracking in Excel or Google Sheets" },
              { value: "gut", label: "Intuition", desc: "I have a feel for the business but no formal tracking" },
            ]} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">If you could automate one thing immediately, what would have the biggest impact?</label>
            <RadioGroup name="priority" value={quiz.topAutomationPriority} onChange={setQuizField("topAutomationPriority")} options={[
              { value: "billing", label: "Billing & invoicing", desc: "Automate the entire payment collection process" },
              { value: "customer_followup", label: "Customer follow-up & CRM", desc: "Never lose a lead to slow follow-up again" },
              { value: "marketing", label: "Marketing & social media", desc: "Generate and post content automatically" },
              { value: "reporting", label: "Reporting & dashboards", desc: "Real-time visibility into my whole business" },
              { value: "scheduling", label: "Scheduling & bookings", desc: "Fill my calendar without manual coordination" },
            ]} />
          </div>
        </div>
      ),
      isValid: () => !!quiz.invoicingMethod && !!quiz.reportingMethod && !!quiz.topAutomationPriority,
    },
  ];

  const currentPage = QUIZ_PAGES[quizPage];
  const isLastQuizPage = quizPage === QUIZ_PAGES.length - 1;
  const progress = step === "business" ? 10 : step === "scanning" ? 25 : 25 + (quizPage / QUIZ_PAGES.length) * 65;

  if (step === "business") {
    return (
      <form onSubmit={handleBizSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" />Business Name</label>
            <input type="text" required placeholder="e.g. Riverside Plumbing Co." value={biz.businessName} onChange={setBizField("businessName")} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />Website URL</label>
            <input type="text" required placeholder="e.g. www.mysite.com" value={biz.websiteUrl} onChange={setBizField("websiteUrl")} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />Industry</label>
            <select required value={biz.industry} onChange={setBizField("industry")} className={selectCls}>
              <option value="">Select your industry...</option>
              {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />City</label>
              <input type="text" required placeholder="e.g. Austin" value={biz.city} onChange={setBizField("city")} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">State</label>
              <select required value={biz.state} onChange={setBizField("state")} className={selectCls}>
                <option value="">ST</option>
                {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />Team Size</label>
              <select required value={biz.teamSize} onChange={setBizField("teamSize")} className={selectCls}>
                <option value="">Select...</option>
                <option value="solo">Just me</option>
                <option value="2to5">2-5 people</option>
                <option value="6to20">6-20 people</option>
                <option value="21to50">21-50 people</option>
                <option value="over50">50+ people</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" />Annual Revenue</label>
              <select required value={biz.revenueRange} onChange={setBizField("revenueRange")} className={selectCls}>
                <option value="">Select...</option>
                <option value="under250k">Under $250K</option>
                <option value="250k_1m">$250K – $1M</option>
                <option value="1m_5m">$1M – $5M</option>
                <option value="5m_25m">$5M – $25M</option>
                <option value="over25m">$25M+</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />Phone <span className="font-normal text-slate-400">(optional)</span></label>
            <input type="tel" placeholder="(512) 555-0100" value={biz.phoneNumber} onChange={setBizField("phoneNumber")} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />Email</label>
            <input type="email" required placeholder="you@yourbusiness.com" value={biz.email} onChange={setBizField("email")} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">LeadPulse invite code <span className="font-normal text-slate-400">($7 instead of $9)</span></label>
            <input type="text" placeholder="e.g. LEADPULSE" value={coupon} onChange={(e) => setCoupon(e.target.value)} className={inputCls} />
          </div>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}
        <button type="submit" disabled={loading} className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 transition-colors">
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Starting...</> : <>Start Free Assessment <ArrowRight className="w-5 h-5" /></>}
        </button>
        <p className="text-center text-xs text-slate-400">Free to complete · $9 to unlock · $7 with LeadPulse invite code</p>
      </form>
    );
  }

  if (step === "scanning") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
        </div>
        <h3 className="font-bold text-slate-900 text-lg mb-2">Scanning your website...</h3>
        <p className="text-slate-500 text-sm">We're analyzing your technology stack and digital footprint. This takes about 15 seconds.</p>
      </div>
    );
  }

  if (step === "submitting") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
        </div>
        <h3 className="font-bold text-slate-900 text-lg mb-2">Saving your answers...</h3>
        <p className="text-slate-500 text-sm">Redirecting to secure payment to unlock your full report.</p>
      </div>
    );
  }

  // Quiz
  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
          <span>Question {quizPage + 1} of {QUIZ_PAGES.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-violet-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">{currentPage.title}</h3>
        <p className="text-sm text-slate-500">{currentPage.subtitle}</p>
      </div>

      {currentPage.content}

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}

      <div className="flex gap-3">
        {quizPage > 0 && (
          <button type="button" onClick={() => setQuizPage((p) => p - 1)} className="flex-1 border-2 border-slate-200 text-slate-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:border-slate-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />Back
          </button>
        )}
        {isLastQuizPage ? (
          <button
            type="button"
            disabled={!currentPage.isValid() || loading}
            onClick={handleQuizSubmit}
            className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            Get My AI Score — $9
          </button>
        ) : (
          <button
            type="button"
            disabled={!currentPage.isValid()}
            onClick={() => setQuizPage((p) => p + 1)}
            className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
