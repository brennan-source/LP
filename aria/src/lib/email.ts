import { Resend } from "resend";
import { AriaReport } from "@/types/assessment";
import { formatDollars } from "@/lib/utils";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.FROM_EMAIL || "reports@aria.ai";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

const GRADE_COLOR: Record<string, string> = {
  A: "#10b981", B: "#3b82f6", C: "#f59e0b", D: "#f97316", F: "#ef4444",
};
const PRIORITY_BG: Record<string, string> = {
  critical: "#fef2f2", high: "#fff7ed", medium: "#fefce8", low: "#f0fdf4",
};
const PRIORITY_COLOR: Record<string, string> = {
  critical: "#dc2626", high: "#ea580c", medium: "#ca8a04", low: "#16a34a",
};

export async function sendAriaReportEmail(toEmail: string, report: AriaReport): Promise<void> {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping Aria report email");
    return;
  }

  const reportUrl = `${APP_URL}/report/${report.assessmentId}`;
  const top3 = report.topPriorities.slice(0, 3);
  const gradeColor = GRADE_COLOR[report.overallGrade] || "#64748b";
  const totalOpportunity = report.estimatedMonthlySavings + report.estimatedRevenueImpact;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a; background: #f8fafc;">

  <div style="background: linear-gradient(135deg, #4c1d95, #3730a3); border-radius: 16px; padding: 36px; margin-bottom: 24px; text-align: center;">
    <p style="color: #c4b5fd; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">Aria AI Readiness Report</p>
    <h1 style="color: white; margin: 0 0 4px; font-size: 24px; font-weight: 900;">${report.businessName}</h1>
    <p style="color: #a5b4fc; margin: 0; font-size: 14px;">${report.industry} · ${report.city}, ${report.state}</p>
  </div>

  <div style="background: white; border-radius: 12px; padding: 28px; margin-bottom: 20px; text-align: center; border: 1px solid #e2e8f0;">
    <p style="margin: 0 0 8px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Overall AI Readiness Score</p>
    <div style="font-size: 80px; font-weight: 900; color: ${gradeColor}; line-height: 1;">${report.overallGrade}</div>
    <div style="font-size: 20px; color: #334155; font-weight: 700;">${report.overallScore}/100</div>
    ${totalOpportunity > 0 ? `
    <div style="margin-top: 20px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
      ${report.estimatedMonthlySavings > 0 ? `
      <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 12px 20px;">
        <div style="font-size: 22px; font-weight: 900; color: #dc2626;">${formatDollars(report.estimatedMonthlySavings)}/mo</div>
        <div style="font-size: 11px; color: #ef4444; font-weight: 600;">potential cost savings</div>
      </div>` : ""}
      ${report.estimatedRevenueImpact > 0 ? `
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 20px;">
        <div style="font-size: 22px; font-weight: 900; color: #16a34a;">+${formatDollars(report.estimatedRevenueImpact)}/mo</div>
        <div style="font-size: 11px; color: #16a34a; font-weight: 600;">potential revenue impact</div>
      </div>` : ""}
      ${report.automationOpportunityHours > 0 ? `
      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 20px;">
        <div style="font-size: 22px; font-weight: 900; color: #2563eb;">${report.automationOpportunityHours} hrs</div>
        <div style="font-size: 11px; color: #3b82f6; font-weight: 600;">automatable per month</div>
      </div>` : ""}
    </div>` : ""}
  </div>

  <h2 style="font-size: 16px; font-weight: 800; margin: 0 0 14px; color: #0f172a;">Your Top Priority Actions</h2>
  ${top3.map((action) => `
  <div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-bottom: 10px;">
    <div style="margin-bottom: 8px;">
      <span style="background: ${PRIORITY_BG[action.priority]}; color: ${PRIORITY_COLOR[action.priority]}; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">${action.priority}</span>
    </div>
    <div style="font-weight: 700; font-size: 14px; color: #0f172a; margin-bottom: 4px;">${action.title}</div>
    <div style="font-size: 13px; color: #64748b;">${action.estimatedImpact}</div>
    ${action.productRecommendation ? `<div style="margin-top: 8px; font-size: 12px; color: #7c3aed; font-weight: 600;">→ ${action.productRecommendation}</div>` : ""}
  </div>`).join("")}

  <div style="text-align: center; margin: 28px 0;">
    <a href="${reportUrl}" style="background: linear-gradient(135deg, #7c3aed, #4f46e5); color: white; text-decoration: none; padding: 16px 40px; border-radius: 10px; font-weight: 800; font-size: 16px; display: inline-block;">View Your Full Report →</a>
  </div>

  <div style="background: #f1f5f9; border-radius: 10px; padding: 16px; margin-bottom: 24px;">
    <p style="margin: 0 0 8px; font-size: 13px; font-weight: 700; color: #475569;">Your 3-phase roadmap is inside:</p>
    ${report.roadmap.map((phase) => `
    <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">
      <strong style="color: #334155;">Phase ${phase.phase} (${phase.timeline}):</strong> ${phase.title} — <em>${phase.estimatedROI}</em>
    </div>`).join("")}
  </div>

  <p style="color: #94a3b8; font-size: 11px; text-align: center; margin-top: 24px;">
    Aria AI Readiness &amp; Implementation · <a href="${APP_URL}" style="color: #7c3aed;">aria.ai</a><br>
    Assessment ID: ${report.assessmentId}
  </p>

</body>
</html>`;

  await resend.emails.send({
    from: FROM,
    to: toEmail,
    subject: `Your Aria AI Report: ${report.businessName} scored ${report.overallScore}/100 (Grade ${report.overallGrade})`,
    html,
  });
}
