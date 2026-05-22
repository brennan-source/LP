import { ScanResults } from "@/types/assessment";

const AI_CHAT_SIGNALS = ["tawk", "intercom", "drift", "crisp", "zendesk", "chatbot", "tidio", "livechat", "freshchat", "hubspot"];
const BOOKING_SIGNALS = ["calendly", "acuity", "booksy", "mindbody", "vagaro", "schedulicity", "simplybook", "appointy", "square appointments", "housecall", "servicetitan"];
const CRM_SIGNALS = ["hubspot", "salesforce", "pipedrive", "zoho", "monday.com", "highlevel", "keap", "activecampaign", "constantcontact"];
const EMAIL_AUTO_SIGNALS = ["mailchimp", "klaviyo", "activecampaign", "convertkit", "omnisend", "drip", "sendinblue", "brevo", "beehiiv"];
const ANALYTICS_SIGNALS = ["googletagmanager", "gtag", "segment", "mixpanel", "hotjar", "clarity", "fullstory", "datadog"];
const PAYMENT_SIGNALS = ["stripe", "square", "paypal", "braintree", "clover", "authorize.net", "shopify"];

export async function scanWebsite(url: string): Promise<ScanResults> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(12000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AriaBot/1.0)" },
    });
    const html = await res.text();
    const lower = html.toLowerCase();

    const hasAIChat = AI_CHAT_SIGNALS.some((s) => lower.includes(s));
    const hasBookingSystem = BOOKING_SIGNALS.some((s) => lower.includes(s));
    const hasCRM = CRM_SIGNALS.some((s) => lower.includes(s));
    const hasEmailAutomation = EMAIL_AUTO_SIGNALS.some((s) => lower.includes(s));
    const hasAnalytics = ANALYTICS_SIGNALS.some((s) => lower.includes(s));
    const hasPaymentProcessing = PAYMENT_SIGNALS.some((s) => lower.includes(s));

    const techSignals: string[] = [];
    if (hasAIChat) techSignals.push("Live chat or AI chat");
    if (hasBookingSystem) techSignals.push("Online booking system");
    if (hasCRM) techSignals.push("CRM or marketing automation");
    if (hasEmailAutomation) techSignals.push("Email marketing platform");
    if (hasAnalytics) techSignals.push("Analytics tracking");
    if (hasPaymentProcessing) techSignals.push("Online payment processing");
    if (lower.includes("wordpress")) techSignals.push("WordPress CMS");
    if (lower.includes("shopify")) techSignals.push("Shopify e-commerce");
    if (lower.includes("quickbooks") || lower.includes("xero") || lower.includes("freshbooks")) techSignals.push("Accounting software");

    return {
      hasAIChat,
      hasBookingSystem,
      hasCRM,
      hasEmailAutomation,
      hasAnalytics,
      hasPaymentProcessing,
      techSignals,
    };
  } catch {
    return {
      hasAIChat: false,
      hasBookingSystem: false,
      hasCRM: false,
      hasEmailAutomation: false,
      hasAnalytics: false,
      hasPaymentProcessing: false,
      techSignals: [],
    };
  }
}
