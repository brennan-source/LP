"use client";

import Script from "next/script";
import { useEffect } from "react";
import { BOOKING_URL, GA_ID } from "@/lib/site";
import { track } from "@/lib/analytics";

// Loads GA4 (when NEXT_PUBLIC_GA_ID is set) and reports clicks on any element
// marked with data-cta="<name>", plus every click through to the scheduler.
export function Analytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cta], a[href]");
      if (!el) return;
      const cta = el.dataset.cta;
      const href = el.getAttribute("href") ?? "";
      const page = window.location.pathname;
      if (cta) track("cta_click", { cta, page, destination: href });
      if (href.startsWith(BOOKING_URL)) track("schedule_click", { cta: cta ?? "link", page });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}

export default Analytics;
