// Thin wrapper around GA4's gtag. Safe to call when analytics is not loaded.

export type ConversionEvent =
  | "cta_click"
  | "form_start"
  | "form_submit"
  | "schedule_click";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: ConversionEvent, params: Params = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}

// Sends an event, then navigates once GA confirms (or after a short timeout),
// so the hit is not lost when the visitor leaves the site.
export function trackThenGo(event: ConversionEvent, params: Params, url: string) {
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    window.location.assign(url);
  };
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, { ...params, event_callback: go });
  }
  setTimeout(go, 800);
}
