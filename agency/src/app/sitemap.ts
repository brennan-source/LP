import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PATHS = [
  "/",
  "/solutions",
  "/industries",
  "/industries/home-services",
  "/industries/professional-services",
  "/industries/personal-services",
  "/how-it-works",
  "/about",
  "/contact",
  "/pricing",
  "/manufacturing-growth-checkup",
  "/growth-score",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
