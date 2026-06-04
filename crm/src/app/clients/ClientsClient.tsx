"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Client } from "@/types/crm";

const TIER_COLORS: Record<string, string> = {
  starter: "bg-slate-700 text-slate-300",
  growth: "bg-blue-900 text-blue-200",
  scale: "bg-violet-900 text-violet-200",
};

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-900 text-green-200",
  paused: "bg-yellow-900 text-yellow-200",
  churned: "bg-red-900 text-red-200",
};

const TIER_LABELS: Record<string, string> = {
  starter: "Starter — $499/mo",
  growth: "Growth — $999/mo",
  scale: "Scale — $1,499/mo",
};

const MONTHLY_TASKS: Record<string, string[]> = {
  starter: ["Blog post published", "GMB post", "Rankings check"],
  growth: ["Blog post published", "GMB post", "Rankings check", "Ad spend reviewed", "Social posts scheduled", "Email sent"],
  scale: ["Blog post published", "GMB post", "Rankings check", "Ad spend reviewed", "Social posts scheduled", "Email sent", "AI chat logs reviewed", "Automation health check", "CRM audit"],
};

export default function ClientsClient() {
  const [clients, setClients] = useState<Client[]>([]);
  const [totalMrr, setTotalMrr] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clients")
      .then((r) => r.json())
      .then((data) => {
        setClients(data.clients ?? []);
        setTotalMrr(data.totalMrr ?? 0);
        setLoading(false);
      });
  }, []);

  const activeCount = clients.filter((c) => c.status === "active").length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-slate-400 text-sm mt-0.5">{activeCount} active</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-slate-500">Monthly Recurring Revenue</p>
            <p className="text-2xl font-bold text-green-400">${totalMrr.toLocaleString()}</p>
          </div>
          <Link
            href="/clients/new"
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition"
          >
            + Onboard Client
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-400">Loading…</div>
      ) : clients.length === 0 ? (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-12 text-center">
          <p className="text-slate-400 mb-2">No clients yet.</p>
          <p className="text-slate-500 text-sm">Close your first retainer and onboard them here.</p>
          <Link href="/clients/new" className="inline-block mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition">
            Onboard First Client
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {clients.map((client) => (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className="bg-slate-800 rounded-xl border border-slate-700 p-5 hover:border-slate-500 transition block"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-white">{client.contact?.businessName ?? "Unknown Business"}</p>
                  <p className="text-slate-400 text-sm mt-0.5">{client.contact?.city}{client.contact?.state ? `, ${client.contact.state}` : ""}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[client.status] ?? "bg-slate-700 text-slate-300"}`}>
                  {client.status}
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TIER_COLORS[client.tier] ?? "bg-slate-700 text-slate-300"}`}>
                  {client.tier}
                </span>
                <span className="text-green-400 font-bold">${client.monthlyRate.toLocaleString()}<span className="text-slate-500 font-normal text-xs">/mo</span></span>
              </div>

              {/* Task progress */}
              <div className="mt-3 pt-3 border-t border-slate-700">
                <p className="text-xs text-slate-500 mb-1.5">This month's tasks</p>
                <div className="flex gap-1 flex-wrap">
                  {(MONTHLY_TASKS[client.tier] ?? []).slice(0, 4).map((task, i) => (
                    <span key={i} className="text-xs bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded">{task}</span>
                  ))}
                  {(MONTHLY_TASKS[client.tier] ?? []).length > 4 && (
                    <span className="text-xs text-slate-500">+{(MONTHLY_TASKS[client.tier] ?? []).length - 4} more</span>
                  )}
                </div>
              </div>

              {client.domain && (
                <p className="text-xs text-slate-500 mt-2 truncate">{client.domain}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
