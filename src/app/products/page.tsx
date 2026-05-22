import Link from "next/link";
import { CheckCircle, ArrowRight, Star } from "lucide-react";

export const metadata = {
  title: "LeadPulse Products — Lead Gen Tools for Small Businesses",
  description: "AI-powered tools that fix every weak area in your lead generation. From $29/month.",
};

const TOOLS = [
  {
    id: "listing-sync",
    name: "Listing Sync",
    price: 29,
    tagline: "Get found everywhere your customers are looking",
    features: [
      "Sync your business info across 50+ directories automatically",
      "Google Business Profile management and posts",
      "NAP (name, address, phone) consistency monitoring",
      "Citation error detection and correction",
      "Weekly directory health reports",
    ],
    cta: "Fix Your Listings",
    category: "Digital Footprint",
    color: "border-blue-200 bg-blue-50",
    badge: "bg-blue-600",
  },
  {
    id: "review-engine",
    name: "Review Engine",
    price: 49,
    tagline: "Turn happy customers into 5-star reviews automatically",
    features: [
      "Automated review request SMS and email sequences",
      "AI-drafted response templates for every review",
      "Review monitoring across Google, Yelp, Facebook",
      "Negative review early-warning alerts",
      "Monthly reputation report",
    ],
    cta: "Build Your Reviews",
    category: "Digital Footprint",
    color: "border-yellow-200 bg-yellow-50",
    badge: "bg-yellow-600",
  },
  {
    id: "social-autopilot",
    name: "Social Autopilot",
    price: 59,
    tagline: "Post consistently to every platform without lifting a finger",
    features: [
      "AI-generated posts tailored to your industry and brand voice",
      "Auto-scheduling across Facebook, Instagram, LinkedIn, GMB",
      "Content calendar with 30 days of posts ready to go",
      "Hashtag and caption optimization",
      "Monthly engagement report",
    ],
    cta: "Automate Social",
    category: "Social Media",
    color: "border-pink-200 bg-pink-50",
    badge: "bg-pink-600",
  },
  {
    id: "seo-pro",
    name: "Local SEO Pro",
    price: 79,
    tagline: "Rank above your competitors for local searches",
    features: [
      "Keyword rank tracking for your city and industry",
      "AI-generated page optimizations and meta tags",
      "Monthly Google Business Profile posts",
      "Local competitor ranking comparisons",
      "Schema markup auto-installation",
    ],
    cta: "Rank Higher",
    category: "SEO",
    color: "border-emerald-200 bg-emerald-50",
    badge: "bg-emerald-600",
  },
  {
    id: "booking-assistant",
    name: "AI Booking Assistant",
    price: 79,
    tagline: "Fill your calendar 24/7 — even when you're not there",
    features: [
      "Smart booking widget embedded on your website",
      "Automated appointment reminders via SMS and email",
      "No-show reduction sequences",
      "Calendar sync with Google and Outlook",
      "Follow-up sequences post-appointment",
    ],
    cta: "Automate Bookings",
    category: "Lead Capture",
    color: "border-teal-200 bg-teal-50",
    badge: "bg-teal-600",
  },
  {
    id: "ai-chat",
    name: "24/7 AI Chat Agent",
    price: 99,
    tagline: "Capture and qualify leads around the clock",
    features: [
      "AI chat trained on your business, services, and FAQs",
      "Lead qualification and routing",
      "Appointment booking directly from chat",
      "Instant lead notification to your phone",
      "Chat history and lead analytics dashboard",
    ],
    cta: "Add AI Chat",
    category: "Lead Capture",
    color: "border-violet-200 bg-violet-50",
    badge: "bg-violet-600",
    popular: true,
  },
  {
    id: "google-ads",
    name: "Google Ads AI Manager",
    price: 149,
    tagline: "Be at the top of Google when customers are searching",
    features: [
      "AI-managed Google Ads campaigns for your keywords",
      "Monthly ad spend optimization and waste reduction",
      "Competitor ad monitoring",
      "Landing page performance recommendations",
      "ROI reporting (cost per lead tracking)",
    ],
    cta: "Start Running Ads",
    category: "Paid Ads",
    note: "+ your ad spend budget",
    color: "border-orange-200 bg-orange-50",
    badge: "bg-orange-600",
  },
];

const BUNDLES = [
  {
    name: "Starter Bundle",
    price: 59,
    saves: "Save 25%",
    includes: ["Listing Sync ($29)", "Review Engine ($49)"],
    desc: "Get found and get reviewed — the two highest-ROI fixes for any local business.",
    color: "border-slate-200",
    tag: null,
  },
  {
    name: "Growth Bundle",
    price: 179,
    saves: "Save 35%",
    includes: ["Listing Sync", "Review Engine", "Social Autopilot", "AI Chat Agent"],
    desc: "Everything you need to dominate local visibility and capture more leads.",
    color: "border-blue-300 bg-blue-50/50",
    tag: "Most Popular",
  },
  {
    name: "Complete Bundle",
    price: 299,
    saves: "Save 45%+",
    includes: ["All 7 tools included"],
    desc: "The full LeadPulse stack — every weak area fixed, running on autopilot.",
    color: "border-violet-300 bg-violet-50/50",
    tag: "Best Value",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-black text-slate-900 text-xl">LeadPulse</Link>
          <Link href="/audit" className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Get My Report — $6
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-black text-slate-900 mb-3">Fix every lead gen gap with AI tools</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Each tool directly addresses one of your scorecard weak areas — starting at $29/month.
            Cancel anytime.
          </p>
        </div>

        {/* Bundles */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Bundles — best value</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BUNDLES.map((bundle) => (
              <div key={bundle.name} className={`relative rounded-2xl border-2 p-6 ${bundle.color}`}>
                {bundle.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {bundle.tag}
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="font-bold text-slate-900 text-lg">{bundle.name}</h3>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-3xl font-black text-slate-900">${bundle.price}</span>
                    <span className="text-slate-500 text-sm pb-1">/month</span>
                    <span className="text-emerald-600 text-sm font-bold pb-1">{bundle.saves}</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-4">{bundle.desc}</p>
                <ul className="space-y-1 mb-5">
                  {bundle.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5">
                  Get Started <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Individual tools */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Individual tools — pick what you need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TOOLS.map((tool) => (
              <div key={tool.id} className={`relative rounded-2xl border-2 p-6 ${tool.color}`}>
                {tool.popular && (
                  <div className="absolute -top-3 right-5 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />Most Requested
                  </div>
                )}
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div>
                    <span className={`inline-block text-xs font-bold text-white px-2 py-0.5 rounded-full mb-2 ${tool.badge}`}>
                      {tool.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-lg">{tool.name}</h3>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-black text-slate-900">${tool.price}<span className="text-sm font-normal text-slate-500">/mo</span></div>
                    {tool.note && <div className="text-xs text-slate-400">{tool.note}</div>}
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-4">{tool.tagline}</p>
                <ul className="space-y-1.5 mb-5">
                  {tool.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
                  {tool.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center bg-slate-50 rounded-2xl border border-slate-200 p-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Not sure which tools you need?</h2>
          <p className="text-slate-500 mb-6">
            Run a $6 audit first — we'll show you exactly which categories are hurting you most, and the tools will make sense instantly.
          </p>
          <Link href="/audit" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors">
            Get My $6 Scorecard First <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
