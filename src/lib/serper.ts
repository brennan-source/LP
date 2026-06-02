export interface SerperOrganic {
  title: string;
  link: string;
  snippet: string;
  position: number;
}

export interface SerperAd {
  title: string;
  link: string;
  position: number;
}

export interface SerperLocalResult {
  title: string;
  address?: string;
  rating?: number;
  ratingCount?: number;
  category?: string;
  website?: string;
}

export interface SerperKnowledgeGraph {
  title?: string;
  type?: string;
  rating?: number;
  ratingCount?: number;
  description?: string;
  attributes?: Record<string, string>;
}

export interface SerperResponse {
  organic: SerperOrganic[];
  ads?: SerperAd[];
  localResults?: SerperLocalResult[];
  knowledgeGraph?: SerperKnowledgeGraph;
}

export async function serperSearch(query: string): Promise<SerperResponse | null> {
  const apiKey = process.env.SERP_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: query, num: 10, gl: "us", hl: "en" }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return null;
    return res.json() as Promise<SerperResponse>;
  } catch {
    return null;
  }
}
