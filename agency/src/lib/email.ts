import { Resend } from "resend";
import { GrowthScoreResults } from "@/types/growth-score";
import { formatDollars } from "@/lib/utils";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.FROM_EMAIL || "Makr.ai <noreply@gomakr.ai>";
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "brennan@gomakr.ai";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3003";

export async function sendGrowthScoreReportEmail(toEmail: string, results: GrowthScoreResults): Promise<void> {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping report email send");
    return;
  }

  const reportUrl = `${APP_URL}/growth-score/report/${results.submissionId}`;
  const topActions = results.topPriorities.slice(0, 3);

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
  <div style="background: linear-gradient(135deg, #14532d, #15803d); border-radius: 12px; padding: 32px; margin-bottom: 24px; text-align: center;">
    <h1 style="color: white; margin: 0 0 8px; font-size: 28px;">Your AI Growth Score</h1>
    <p style="color: #bbf7d0; margin: 0; font-size: 16px;">${results.businessName}</p>
  </div>

  <div style="background: #fafaf9; border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
    <p style="margin: 0 0 8px; color: #78716c; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Overall Growth Score</p>
    <div style="font-size: 72px; font-weight: 900; color: ${getGradeHexColor(results.overallGrade)}; line-height: 1;">${results.overallGrade}</div>
    <div style="font-size: 24px; color: #292524; font-weight: 600;">${results.overallScore}/100</div>
    ${results.estimatedMonthlyRevenueLoss > 0 ? `
    <div style="margin-top: 16px; padding: 12px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
      <p style="margin: 0; color: #dc2626; font-weight: 600;">Estimated monthly revenue being lost: ${formatDollars(results.estimatedMonthlyRevenueLoss)}</p>
    </div>
    ` : ""}
  </div>

  <h2 style="font-size: 18px; margin: 0 0 16px;">Your Top 3 Priority Actions</h2>
  ${topActions.map((action) => `
  <div style="border: 1px solid #e7e5e4; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
      <span style="background: ${getPriorityBg(action.priority)}; color: ${getPriorityColor(action.priority)}; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">${action.priority}</span>
      <strong>${action.title}</strong>
    </div>
    <p style="margin: 0; color: #78716c; font-size: 14px;">${action.description}</p>
  </div>
  `).join("")}

  <div style="text-align: center; margin-top: 32px;">
    <a href="${reportUrl}" style="background: #15803d; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">View Your Full Report →</a>
  </div>

  <div style="margin-top: 32px; background: linear-gradient(135deg, #15803d, #14532d); border-radius: 12px; padding: 24px; text-align: center;">
    <h3 style="color: white; font-size: 18px; font-weight: 800; margin: 0 0 8px;">Want help fixing these gaps?</h3>
    <p style="color: #bbf7d0; font-size: 14px; margin: 0 0 16px;">
      Book a free 1-hour strategy call and we'll walk through your 90-day roadmap together.
    </p>
    <a href="${APP_URL}/contact" style="background: white; color: #14532d; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; display: inline-block;">Book Your Free Strategy Call →</a>
  </div>

  <p style="color: #a8a29e; font-size: 12px; text-align: center; margin-top: 32px;">
    Makr.ai · AI Growth Score<br>
    <a href="${reportUrl}" style="color: #15803d;">View full report</a>
  </p>
</body>
</html>`;

  await resend.emails.send({
    from: FROM,
    to: toEmail,
    subject: `Your Makr AI Growth Score: ${results.businessName} scored ${results.overallScore}/100 (Grade ${results.overallGrade})`,
    html,
  });
}

export async function sendGrowthScoreLeadNotification(results: GrowthScoreResults): Promise<void> {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping lead notification email");
    return;
  }

  const reportUrl = `${APP_URL}/growth-score/report/${results.submissionId}`;

  await resend.emails.send({
    from: FROM,
    to: [CONTACT_EMAIL],
    subject: `New Growth Score lead: ${results.businessName} (${results.overallGrade}, ${results.industry}, ${results.city})`,
    text: `
New AI Growth Score completion from gomakr.ai

Business: ${results.businessName}
Industry: ${results.industry}
Location: ${results.city}, ${results.state}
Website: ${results.websiteUrl}
Overall score: ${results.overallScore}/100 (Grade ${results.overallGrade})
Estimated monthly revenue loss: ${formatDollars(results.estimatedMonthlyRevenueLoss)}

Full report: ${reportUrl}
    `.trim(),
  });
}

function getGradeHexColor(grade: string): string {
  const map: Record<string, string> = { A: "#10b981", B: "#3b82f6", C: "#f59e0b", D: "#f97316", F: "#ef4444" };
  return map[grade] || "#78716c";
}

function getPriorityBg(priority: string): string {
  const map: Record<string, string> = { critical: "#fef2f2", high: "#fff7ed", medium: "#fefce8", low: "#f0fdf4" };
  return map[priority] || "#fafaf9";
}

function getPriorityColor(priority: string): string {
  const map: Record<string, string> = { critical: "#dc2626", high: "#ea580c", medium: "#ca8a04", low: "#16a34a" };
  return map[priority] || "#78716c";
}
