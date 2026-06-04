"use client";

import { useState } from "react";
import { TARGET_INDUSTRIES, TARGET_LOCATIONS } from "@/lib/scraper";

type Tab = "outscraper" | "google_places";

const OUTSCRAPER_CATEGORIES = [
  "HVAC contractor",
  "Plumber",
  "Roofer",
  "Electrician",
  "Landscaper",
  "Septic service",
  "Pest control",
  "House painter",
  "Pressure washing",
  "Gutter cleaning",
  "Tree service",
  "Concrete contractor",
  "Fence contractor",
  "Deck builder",
  "Window cleaning",
  "Carpet cleaning",
  "Chimney sweep",
  "Pool service",
  "Garage door repair",
  "Handyman",
];

const LIMIT_OPTIONS = [25, 50, 100, 250];

interface ScrapeResult {
  total: number;
  newContacts: number;
  skipped: number;
  noWebsite?: number;
}

interface LogEntry {
  id: number;
  label: string;
  status: "pending" | "done" | "error";
  result?: ScrapeResult;
  error?: string;
}

export default function ScraperClient() {
  const [tab, setTab] = useState<Tab>("outscraper");

  // Outscraper state
  const [osCategory, setOsCategory] = useState(OUTSCRAPER_CATEGORIES[0]);
  const [osLocation, setOsLocation] = useState("Boston, MA");
  const [osLimit, setOsLimit] = useState(100);
  const [osRunning, setOsRunning] = useState(false);
  const [osLog, setOsLog] = useState<LogEntry[]>([]);

  // Google Places state
  const [gpIndustry, setGpIndustry] = useState(TARGET_INDUSTRIES[0]);
  const [gpCity, setGpCity] = useState(TARGET_LOCATIONS[0].city);
  const [gpState, setGpState] = useState(TARGET_LOCATIONS[0].state);
  const [gpRunning, setGpRunning] = useState(false);
  const [gpLog, setGpLog] = useState<LogEntry[]>([]);
  const [gpBulkRunning, setGpBulkRunning] = useState(false);

  // Outscraper scrape
  async function handleOutscraper(e: React.FormEvent) {
    e.preventDefault();
    const id = Date.now();
    const label = `${osCategory} — ${osLocation}`;

    setOsRunning(true);
    setOsLog((prev) => [{ id, label, status: "pending" }, ...prev]);

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: osCategory, location: osLocation, limit: osLimit }),
      });
      if (res.ok) {
        const result = await res.json();
        setOsLog((prev) => prev.map((e) => e.id === id ? { ...e, status: "done", result } : e));
      } else {
        const data = await res.json();
        throw new Error(data.error ?? "Scrape failed");
      }
    } catch (err) {
      setOsLog((prev) => prev.map((e) => e.id === id ? { ...e, status: "error", error: err instanceof Error ? err.message : "Unknown error" } : e));
    }
    setOsRunning(false);
  }

  // Google Places scrape
  async function handleGooglePlaces(ind: string, city: string, state: string, logId?: number): Promise<ScrapeResult | null> {
    const res = await fetch("/api/scraper", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ industry: ind, city, state }),
    });
    if (res.ok) return await res.json();
    const data = await res.json();
    throw new Error(data.error ?? "Scrape failed");
  }

  async function handleGpSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = Date.now();
    setGpRunning(true);
    setGpLog((prev) => [{ id, label: `${gpIndustry} — ${gpCity}, ${gpState}`, status: "pending" }, ...prev]);
    try {
      const result = await handleGooglePlaces(gpIndustry, gpCity, gpState);
      setGpLog((prev) => prev.map((e) => e.id === id ? { ...e, status: "done", result: result ?? undefined } : e));
    } catch (err) {
      setGpLog((prev) => prev.map((e) => e.id === id ? { ...e, status: "error", error: err instanceof Error ? err.message : "Unknown" } : e));
    }
    setGpRunning(false);
  }

  async function handleBulkRun() {
    setGpBulkRunning(true);
    for (const loc of TARGET_LOCATIONS) {
      for (const ind of TARGET_INDUSTRIES) {
        const id = Date.now() + Math.random();
        setGpLog((prev) => [{ id, label: `${ind} — ${loc.city}, ${loc.state}`, status: "pending" }, ...prev]);
        try {
          const result = await handleGooglePlaces(ind, loc.city, loc.state);
          setGpLog((prev) => prev.map((e) => e.id === id ? { ...e, status: "done", result: result ?? undefined } : e));
        } catch (err) {
          setGpLog((prev) => prev.map((e) => e.id === id ? { ...e, status: "error", error: err instanceof Error ? err.message : "Unknown" } : e));
        }
        await new Promise((r) => setTimeout(r, 500));
      }
    }
    setGpBulkRunning(false);
  }

  const osTotalNew = osLog.filter((e) => e.status === "done").reduce((sum, e) => sum + (e.result?.newContacts ?? 0), 0);
  const osNoWebsite = osLog.filter((e) => e.status === "done").reduce((sum, e) => sum + (e.result?.noWebsite ?? 0), 0);
  const gpTotalNew = gpLog.filter((e) => e.status === "done").reduce((sum, e) => sum + (e.result?.newContacts ?? 0), 0);

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Lead Scraper</h1>
        <p className="text-slate-400 text-sm mt-0.5">Find local businesses to target with the Makr postcard campaign</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-slate-800 border border-slate-700 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("outscraper")}
          className={`px-4 py-1.5 rounded text-sm font-medium transition ${tab === "outscraper" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"}`}
        >
          Outscraper
        </button>
        <button
          onClick={() => setTab("google_places")}
          className={`px-4 py-1.5 rounded text-sm font-medium transition ${tab === "google_places" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"}`}
        >
          Google Places
        </button>
      </div>

      {tab === "outscraper" ? (
        <div className="space-y-5">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-300">Outscraper — Google Maps</h2>
                <p className="text-xs text-slate-500 mt-0.5">Returns business name, phone, email, website, and rating. Sets hasWebsite automatically. Queues PageSpeed checks in background.</p>
              </div>
            </div>
            <form onSubmit={handleOutscraper} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                <select
                  value={osCategory}
                  onChange={(e) => setOsCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                >
                  {OUTSCRAPER_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  value={osLocation}
                  onChange={(e) => setOsLocation(e.target.value)}
                  placeholder="Boston, MA"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Limit</label>
                <select
                  value={osLimit}
                  onChange={(e) => setOsLimit(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                >
                  {LIMIT_OPTIONS.map((l) => <option key={l} value={l}>{l} results</option>)}
                </select>
              </div>
              <button
                type="submit"
                disabled={osRunning}
                className="w-full py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition"
              >
                {osRunning ? "Scraping…" : "Run Scrape"}
              </button>
            </form>
          </div>

          {osLog.length > 0 && (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-300">Run Log</h2>
                {osTotalNew > 0 && (
                  <div className="text-right text-sm">
                    <span className="text-green-400 font-medium">+{osTotalNew} new</span>
                    {osNoWebsite > 0 && <span className="text-rose-400 ml-2">({osNoWebsite} no website)</span>}
                  </div>
                )}
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {osLog.map((entry) => (
                  <div key={entry.id} className={`flex items-start justify-between rounded-lg px-3 py-2 text-sm ${entry.status === "pending" ? "bg-slate-700/50 text-slate-300" : entry.status === "done" ? "bg-green-900/20 text-green-300" : "bg-red-900/20 text-red-300"}`}>
                    <div>
                      <span className="font-medium">{entry.label}</span>
                      {entry.status === "error" && <p className="text-red-400 text-xs mt-0.5">{entry.error}</p>}
                    </div>
                    <div className="text-xs text-right shrink-0 ml-3">
                      {entry.status === "pending" && <span className="text-slate-400">Running…</span>}
                      {entry.status === "done" && entry.result && (
                        <div>
                          <p className="text-green-400">+{entry.result.newContacts} new</p>
                          {entry.result.noWebsite != null && entry.result.noWebsite > 0 && <p className="text-rose-400">{entry.result.noWebsite} no website</p>}
                          <p className="text-slate-500">{entry.result.skipped} skipped</p>
                        </div>
                      )}
                      {entry.status === "error" && <span className="text-red-400">Error</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <h2 className="text-sm font-semibold text-slate-300 mb-4">Single Scrape</h2>
              <form onSubmit={handleGpSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Industry</label>
                  <select value={gpIndustry} onChange={(e) => setGpIndustry(e.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm">
                    {TARGET_INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Location</label>
                  <select value={`${gpCity},${gpState}`} onChange={(e) => { const [c, s] = e.target.value.split(","); setGpCity(c); setGpState(s); }} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm">
                    {TARGET_LOCATIONS.map((loc) => <option key={`${loc.city},${loc.state}`} value={`${loc.city},${loc.state}`}>{loc.city}, {loc.state}</option>)}
                  </select>
                </div>
                <button type="submit" disabled={gpRunning || gpBulkRunning} className="w-full py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition">
                  {gpRunning ? "Scraping…" : "Run Scrape"}
                </button>
              </form>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <h2 className="text-sm font-semibold text-slate-300 mb-2">Bulk Scrape</h2>
              <p className="text-slate-400 text-xs mb-4">
                Runs all {TARGET_INDUSTRIES.length} industries × {TARGET_LOCATIONS.length} locations ({TARGET_INDUSTRIES.length * TARGET_LOCATIONS.length} queries).
              </p>
              <button onClick={handleBulkRun} disabled={gpRunning || gpBulkRunning} className="w-full py-2 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition">
                {gpBulkRunning ? "Running bulk scrape…" : "Run All"}
              </button>
            </div>
          </div>

          {gpLog.length > 0 && (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-300">Run Log</h2>
                {gpTotalNew > 0 && <span className="text-green-400 text-sm font-medium">+{gpTotalNew} new contacts</span>}
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {gpLog.map((entry) => (
                  <div key={entry.id} className={`flex items-start justify-between rounded-lg px-3 py-2 text-sm ${entry.status === "pending" ? "bg-slate-700/50 text-slate-300" : entry.status === "done" ? "bg-green-900/20 text-green-300" : "bg-red-900/20 text-red-300"}`}>
                    <div>
                      <span className="font-medium">{entry.label}</span>
                      {entry.status === "error" && <p className="text-red-400 text-xs mt-0.5">{entry.error}</p>}
                    </div>
                    <div className="text-xs text-right shrink-0 ml-3">
                      {entry.status === "pending" && <span className="text-slate-400">Running…</span>}
                      {entry.status === "done" && entry.result && (
                        <div>
                          <p className="text-green-400">+{entry.result.newContacts} new</p>
                          <p className="text-slate-500">{entry.result.skipped} skipped</p>
                        </div>
                      )}
                      {entry.status === "error" && <span className="text-red-400">Error</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
