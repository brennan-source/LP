"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { STAGES } from "@/types/crm";
import type { Contact } from "@/types/crm";

const STAGE_COLORS: Record<string, { header: string; border: string }> = {
  prospect: { header: "bg-slate-700", border: "border-slate-600" },
  contacted: { header: "bg-blue-900/60", border: "border-blue-700/40" },
  demo_sent: { header: "bg-yellow-900/60", border: "border-yellow-700/40" },
  trial: { header: "bg-orange-900/60", border: "border-orange-700/40" },
  customer: { header: "bg-green-900/60", border: "border-green-700/40" },
  churned: { header: "bg-red-900/60", border: "border-red-700/40" },
};

type Pipeline = Record<string, (Contact & { products: { id: string; product: string }[] })[]>;

export default function PipelineClient() {
  const [pipeline, setPipeline] = useState<Pipeline>({});
  const [loading, setLoading] = useState(true);

  async function fetchPipeline() {
    const res = await fetch("/api/pipeline");
    if (res.ok) {
      const data = await res.json();
      setPipeline(data.pipeline);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPipeline();
  }, []);

  async function handleMoveStage(contactId: string, newStage: string) {
    await fetch(`/api/contacts/${contactId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage: newStage }),
    });
    fetchPipeline();
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-slate-400">Loading pipeline…</div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Pipeline</h1>
        <p className="text-slate-400 text-sm mt-0.5">
          {Object.values(pipeline).flat().length} contacts across all stages
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const cards = pipeline[stage.value] ?? [];
          const colors = STAGE_COLORS[stage.value] ?? { header: "bg-slate-700", border: "border-slate-600" };

          return (
            <div
              key={stage.value}
              className={`shrink-0 w-64 rounded-xl border ${colors.border} bg-slate-800/50 flex flex-col`}
            >
              {/* Column header */}
              <div className={`px-3 py-2.5 rounded-t-xl ${colors.header} flex items-center justify-between`}>
                <span className="text-sm font-semibold text-white">{stage.label}</span>
                <span className="text-xs text-slate-300 bg-black/20 px-1.5 py-0.5 rounded-full">
                  {cards.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
                {cards.length === 0 ? (
                  <p className="text-slate-500 text-xs text-center py-4">Empty</p>
                ) : (
                  cards.map((contact) => (
                    <div
                      key={contact.id}
                      className="bg-slate-800 rounded-lg border border-slate-700 p-3 hover:border-violet-500/50 transition group"
                    >
                      <Link href={`/contacts/${contact.id}`}>
                        <div className="font-medium text-white text-sm group-hover:text-violet-300 transition">
                          {contact.firstName || contact.lastName
                            ? `${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim()
                            : <span className="italic text-slate-400">{contact.email}</span>}
                        </div>
                        {contact.businessName && (
                          <div className="text-slate-400 text-xs mt-0.5">{contact.businessName}</div>
                        )}
                        <div className="text-slate-500 text-xs mt-0.5 truncate">{contact.email}</div>
                      </Link>

                      {/* Product tags */}
                      {contact.products.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {contact.products.map((p) => (
                            <span
                              key={p.id}
                              className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                                p.product === "leadpulse"
                                  ? "bg-violet-900/60 text-violet-300"
                                  : "bg-cyan-900/60 text-cyan-300"
                              }`}
                            >
                              {p.product}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Move to stage */}
                      <div className="mt-2 pt-2 border-t border-slate-700">
                        <select
                          value={contact.stage}
                          onChange={(e) => handleMoveStage(contact.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full text-xs px-2 py-1 bg-slate-700 border border-slate-600 rounded text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                        >
                          {STAGES.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
