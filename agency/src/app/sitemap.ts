import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { ARTICLES } from "@/lib/insights";

const PATHS = [
  "/",
  "/solutions",
  "/industries",
  "/industries/home-services",
  "/industries/law-firms",
  "/industries/professional-services",
  "/industries/personal-services",
  "/how-it-works",
  "/about",
  "/contact",
  "/pricing",
  "/switching",
  "/manufacturing-growth-checkup",
  "/insights",
  ...ARTICLES.map((a) => `/insights/${a.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
