import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

// Web app manifest (served at /manifest.webmanifest). favicon.ico and
// apple-icon.png in this folder are picked up by the App Router file conventions.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#FAF9F5",
    theme_color: "#0A3F25",
    icons: [
      { src: "/brand/makr-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/makr-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
