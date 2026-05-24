"use client";

import { useState } from "react";
import { TARGET_INDUSTRIES, TARGET_LOCATIONS } from "@/lib/scraper";

interface ScrapeResult {
  total: number;
  newContacts: number;
  skipped: number;
}

interface LogEntry {
  id: number;
  industry: string;
  city: string;
  state: string;
  status: "pending" | "done" | "error";
  result?: ScrapeResult;
  error?: string;
}

export default function ScraperClient() {
  const [industry, setIndustry] = useState(TARGET_INDUSTRIES[0]);
  const [city, setCity] = useState(TARGET_LOCATIONS[0].city);
  const [state, setState] = useState(TARGET_LOCATIONS[0].state);
  const [customCity, setCustomCity] = useState("");
  const [customState, setCustomState] = useState("");
  const [useCustomLocation, setUseCustomLocation] = useState(false);
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [bulkRunning, setBulkRunning] = useState(false);

  async function handleScrape(
    ind: string,
    c: string,
    s: string,
    logId?: number
  ): Promise<ScrapeResult | null> {
    const res = await fetch("/api/scraper", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ industry: ind, city: c, state: s }),
    });

    if (res.ok) {
      return await res.json();
    } else {
      const data = await res.json();
      throw new Error(data.error ?? "Scrape failed");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const effectiveCity = useCustomLocation ? customCity : city;
    const effectiveState = useCustomLocation ? customState : state;

    setRunning(true);
    const id = Date.now();

    setLog((prev) => [
      {
        id,
        industry,
        city: effectiveCity,
        state: effectiveState,
        status: "pending",
      },
      ...prev,
    ]);

    try {
      const result = await handleScrape(industry, effectiveCity, effectiveState);
      setLog((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, status: "done", result: result ?? undefined } : entry
        )
      );
    } catch (err) {
      setLog((prev) =>
        prev.map((entry) =>
          entry.id === id
            ? { ...entry, status: "error", error: err instanceof Error ? err.message : "Unknown error" }
            : entry
        )
      );
    }
    setRunning(false);
  }

  async function handleBulkRun() {
    setBulkRunning(true);

    for (const loc of TARGET_LOCATIONS) {
      for (const ind of TARGET_INDUSTRIES) {
        const id = Date.now() + Math.random();

        setLog((prev) => [
          {
            id,
            industry: ind,
            city: loc.city,
            state: loc.state,
            status: "pending",
          },
          ...prev,
        ]);

        try {
          const result = await handleScrape(ind, loc.city, loc.state);
          setLog((prev) =>
            prev.map((entry) =>
              entry.id === id ? { ...entry, status: "done", result: result ?? undefined } : entry
            )
          );
        } catch (err) {
          setLog((prev) =>
            prev.map((entry) =>
              entry.id === id
                ? { ...entry, status: "error", error: err instanceof Error ? err.message : "Unknown error" }
                : entry
            )
          );
        }

        // Small delay to avoid rate limits
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    setBulkRunning(false);
  }

  const totalNew = log
    .filter((e) => e.status === "done")
    .reduce((sum, e) => sum + (e.result?.newContacts ?? 0), 0);

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Lead Scraper</h1>
        <p className="text-slate-400 text-sm mt-0.5">
          Scrape Google Places for business contacts by industry and location
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Single scrape form */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Single Scrape</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
              >
                {TARGET_INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                <input
                  type="checkbox"
                  checked={useCustomLocation}
                  onChange={(e) => setUseCustomLocation(e.target.checked)}
                  className="mr-1.5"
                />
                Custom location
              </label>
              {useCustomLocation ? (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    placeholder="City"
                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                  />
                  <input
                    type="text"
                    value={customState}
                    onChange={(e) => setCustomState(e.target.value)}
                    placeholder="State"
                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                  />
                </div>
              ) : (
                <select
                  value={`${city},${state}`}
                  onChange={(e) => {
                    const [c, s] = e.target.value.split(",");
                    setCity(c);
                    setState(s);
                  }}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                >
                  {TARGET_LOCATIONS.map((loc) => (
                    <option key={`${loc.city},${loc.state}`} value={`${loc.city},${loc.state}`}>
                      {loc.city}, {loc.state}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <button
              type="submit"
              disabled={running || bulkRunning}
              className="w-full py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition"
            >
              {running ? "Scraping…" : "Run Scrape"}
            </button>
          </form>
        </div>

        {/* Bulk run */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <h2 className="text-sm font-semibold text-slate-300 mb-2">Bulk Scrape</h2>
          <p className="text-slate-400 text-xs mb-4">
            Runs all {TARGET_INDUSTRIES.length} industries across all {TARGET_LOCATIONS.length} locations
            ({TARGET_INDUSTRIES.length * TARGET_LOCATIONS.length} total queries).
          </p>
          <div className="space-y-3">
            <div className="bg-slate-700/50 rounded-lg p-3 text-sm">
              <p className="text-slate-300 font-medium mb-1">Industries</p>
              <div className="flex flex-wrap gap-1">
                {TARGET_INDUSTRIES.map((ind) => (
                  <span key={ind} className="text-xs bg-violet-900/60 text-violet-300 px-2 py-0.5 rounded">
                    {ind}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3 text-sm">
              <p className="text-slate-300 font-medium mb-1">Locations</p>
              <div className="flex flex-wrap gap-1">
                {TARGET_LOCATIONS.map((loc) => (
                  <span key={`${loc.city},${loc.state}`} className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded">
                    {loc.city}, {loc.state}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleBulkRun}
            disabled={running || bulkRunning}
            className="w-full mt-4 py-2 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition"
          >
            {bulkRunning ? "Running bulk scrape…" : "Run All"}
          </button>
        </div>
      </div>

      {/* Log */}
      {log.length > 0 && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-300">Run Log</h2>
            {totalNew > 0 && (
              <span className="text-green-400 text-sm font-medium">
                +{totalNew} new contacts
              </span>
            )}
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {log.map((entry) => (
              <div
                key={entry.id}
                className={`flex items-start justify-between rounded-lg px-3 py-2 text-sm ${
                  entry.status === "pending"
                    ? "bg-slate-700/50 text-slate-300"
                    : entry.status === "done"
                    ? "bg-green-900/20 text-green-300"
                    : "bg-red-900/20 text-red-300"
                }`}
              >
                <div>
                  <span className="font-medium">{entry.industry}</span>
                  <span className="text-slate-400 mx-1">—</span>
                  {entry.city}, {entry.state}
                  {entry.status === "error" && (
                    <p className="text-red-400 text-xs mt-0.5">{entry.error}</p>
                  )}
                </div>
                <div className="text-xs text-right shrink-0 ml-3">
                  {entry.status === "pending" && (
                    <span className="text-slate-400">Running…</span>
                  )}
                  {entry.status === "done" && entry.result && (
                    <div>
                      <p className="text-green-400">+{entry.result.newContacts} new</p>
                      <p className="text-slate-500">{entry.result.skipped} skipped</p>
                    </div>
                  )}
                  {entry.status === "error" && (
                    <span className="text-red-400">Error</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
