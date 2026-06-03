const API_KEY = process.env.PAGESPEED_API_KEY;

export interface PageSpeedResult {
  performanceScore: number;
  mobileScore: number;
  seoScore: number;
  url: string;
}

export async function checkWebsite(rawUrl: string): Promise<PageSpeedResult> {
  const url = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
  const params = new URLSearchParams({
    url,
    strategy: "mobile",
    category: ["performance", "seo"].join("&category="),
  });
  if (API_KEY) params.set("key", API_KEY);

  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=PERFORMANCE&category=SEO${API_KEY ? `&key=${API_KEY}` : ""}`;

  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error(`PageSpeed API error ${res.status}`);
  }

  const data = await res.json() as {
    lighthouseResult?: {
      categories?: {
        performance?: { score?: number };
        seo?: { score?: number };
      };
    };
  };

  const cats = data.lighthouseResult?.categories ?? {};
  const perf = Math.round((cats.performance?.score ?? 0) * 100);
  const seo = Math.round((cats.seo?.score ?? 0) * 100);

  return {
    performanceScore: perf,
    mobileScore: perf,
    seoScore: seo,
    url,
  };
}

export function isWeakWebsite(result: PageSpeedResult): boolean {
  return result.mobileScore < 50 || result.performanceScore < 50;
}
