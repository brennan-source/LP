import { Resend } from "resend";
import { AuditResults } from "@/types/audit";
import { formatDollars } from "@/lib/utils";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.FROM_EMAIL || "reports@leadpulse.ai";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function sendReportEmail(toEmail: string, results: AuditResults): Promise<void> {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping email send");
    return;
  }

  const reportUrl = `${APP_URL}/report/${results.jobId}`;
  const topActions = results.topPriorities.slice(0, 3);

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
  <div style="background: linear-gradient(135deg, #1e293b, #334155); border-radius: 12px; padding: 32px; margin-bottom: 24px; text-align: center;">
    <h1 style="color: white; margin: 0 0 8px; font-size: 28px;">LeadPulse Report</h1>
    <p style="color: #94a3b8; margin: 0; font-size: 16px;">${results.businessName}</p>
  </div>

  <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
    <p style="margin: 0 0 8px; color: #64748b; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Overall Lead Gen Score</p>
    <div style="font-size: 72px; font-weight: 900; color: ${getGradeHexColor(results.overallGrade)}; line-height: 1;">${results.overallGrade}</div>
    <div style="font-size: 24px; color: #334155; font-weight: 600;">${results.overallScore}/100</div>
    ${results.estimatedMonthlyRevenueLoss > 0 ? `
    <div style="margin-top: 16px; padding: 12px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
      <p style="margin: 0; color: #dc2626; font-weight: 600;">Estimated monthly revenue being lost: ${formatDollars(results.estimatedMonthlyRevenueLoss)}</p>
    </div>
    ` : ""}
  </div>

  <h2 style="font-size: 18px; margin: 0 0 16px;">Your Top 3 Priority Actions</h2>
  ${topActions.map((action, i) => `
  <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
      <span style="background: ${getPriorityBg(action.priority)}; color: ${getPriorityColor(action.priority)}; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">${action.priority}</span>
      <strong>${action.title}</strong>
    </div>
    <p style="margin: 0; color: #64748b; font-size: 14px;">${action.description}</p>
  </div>
  `).join("")}

  <div style="text-align: center; margin-top: 32px;">
    <a href="${reportUrl}" style="background: #3b82f6; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">View Your Full Report →</a>
  </div>

  <div style="margin-top: 32px; background: linear-gradient(135deg, #4c1d95, #3730a3); border-radius: 12px; padding: 24px; text-align: center;">
    <p style="color: #c4b5fd; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Exclusive member offer</p>
    <h3 style="color: white; font-size: 18px; font-weight: 800; margin: 0 0 8px;">Your AI Readiness Score — $12</h3>
    <p style="color: #c4b5fd; font-size: 14px; margin: 0 0 16px;">
      As a LeadPulse report holder, you're invited to take the Aria AI Readiness Assessment at our member price.<br>
      Use code <strong style="color: white; background: rgba(255,255,255,0.15); padding: 2px 8px; border-radius: 4px;">LEADPULSE</strong> at checkout — normally $15, yours for $12.
    </p>
    <p style="color: #a5b4fc; font-size: 13px; margin: 0 0 16px;">8 scored categories · estimated monthly savings · custom AI roadmap</p>
    <a href="${process.env.NEXT_PUBLIC_ARIA_URL || "https://aria.ai"}/assess?coupon=LEADPULSE" style="background: white; color: #4c1d95; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; display: inline-block;">Get My AI Score for $12 →</a>
  </div>

  <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 32px;">
    LeadPulse · Your lead generation score card<br>
    <a href="${reportUrl}" style="color: #3b82f6;">View full report</a>
  </p>
</body>
</html>`;

  await resend.emails.send({
    from: FROM,
    to: toEmail,
    subject: `Your LeadPulse Report: ${results.businessName} scored ${results.overallScore}/100 (Grade ${results.overallGrade})`,
    html,
  });
}

function getGradeHexColor(grade: string): string {
  const map: Record<string, string> = { A: "#10b981", B: "#3b82f6", C: "#f59e0b", D: "#f97316", F: "#ef4444" };
  return map[grade] || "#64748b";
}

function getPriorityBg(priority: string): string {
  const map: Record<string, string> = { critical: "#fef2f2", high: "#fff7ed", medium: "#fefce8", low: "#f0fdf4" };
  return map[priority] || "#f8fafc";
}

function getPriorityColor(priority: string): string {
  const map: Record<string, string> = { critical: "#dc2626", high: "#ea580c", medium: "#ca8a04", low: "#16a34a" };
  return map[priority] || "#64748b";
}
