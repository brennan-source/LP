"use client";

import Link from "next/link";
import type { Campaign } from "@/types/crm";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-slate-700 text-slate-300",
  sent: "bg-green-900 text-green-200",
  scheduled: "bg-blue-900 text-blue-200",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface Props {
  campaigns: Campaign[];
}

export default function CampaignsClient({ campaigns }: Props) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Campaigns</h1>
          <p className="text-slate-400 text-sm mt-0.5">{campaigns.length} campaigns</p>
        </div>
        <Link
          href="/campaigns/new"
          className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition"
        >
          + New Campaign
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-12 text-center">
          <p className="text-slate-400 mb-3">No campaigns yet.</p>
          <Link
            href="/campaigns/new"
            className="text-violet-400 hover:text-violet-300 text-sm transition"
          >
            Create your first campaign →
          </Link>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Campaign</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Subject</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Status</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Sent</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, i) => (
                <tr
                  key={campaign.id}
                  className={`hover:bg-slate-700/50 transition cursor-pointer ${
                    i < campaigns.length - 1 ? "border-b border-slate-700/50" : ""
                  }`}
                  onClick={() => window.location.href = `/campaigns/${campaign.id}`}
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-white">{campaign.name}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-300 max-w-xs truncate">
                    {campaign.subject}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex text-xs px-2 py-0.5 rounded-full font-medium ${
                        STATUS_COLORS[campaign.status] ?? "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{campaign.sentCount}</td>
                  <td className="px-4 py-3 text-slate-400">{formatDate(campaign.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
