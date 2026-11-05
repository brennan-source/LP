// Lead source tracking. On arrival we note the UTM tags and the landing page for
// this browser session, and every lead form sends them with the submission, so the
// lead email says where the person came from (for example a LinkedIn post or an email).

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingPage?: string; // path + query of the first page seen this session (or the last UTM-tagged one)
  referrer?: string;
};

const KEY = "makr_attribution";
const MAX = 300;

function clip(v: string | null | undefined) {
  const t = (v ?? "").trim();
  return t ? t.slice(0, MAX) : undefined;
}

// Call once per page view (client only). UTM-tagged visits replace what's stored,
// so the most recent campaign wins; untagged visits keep the first landing page.
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const tagged = ["utm_source", "utm_medium", "utm_campaign"].some((k) => params.get(k));
    if (!tagged && window.sessionStorage.getItem(KEY)) return;
    let referrer: string | undefined;
    if (document.referrer) {
      const ref = new URL(document.referrer);
      if (ref.host !== window.location.host) referrer = clip(ref.origin + ref.pathname);
    }
    const data: Attribution = {
      utmSource: clip(params.get("utm_source")),
      utmMedium: clip(params.get("utm_medium")),
      utmCampaign: clip(params.get("utm_campaign")),
      landingPage: clip(window.location.pathname + window.location.search),
      referrer,
    };
    window.sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Storage can be blocked (private mode, strict settings). Tracking is best-effort.
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

// Server side: keep only short strings from the submitted payload.
export function cleanAttribution(body: Record<string, unknown>): Attribution {
  const pick = (k: keyof Attribution) => (typeof body[k] === "string" ? clip(body[k] as string) : undefined);
  return {
    utmSource: pick("utmSource"),
    utmMedium: pick("utmMedium"),
    utmCampaign: pick("utmCampaign"),
    landingPage: pick("landingPage"),
    referrer: pick("referrer"),
  };
}
