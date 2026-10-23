// Site-wide constants shared by pages, components, metadata and schema.

export const SITE_NAME = "Makr";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gomakr.ai";
export const CONTACT_EMAIL = "brennan@gomakr.ai";

// Google Calendar appointment page. Override with NEXT_PUBLIC_BOOKING_URL.
export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://calendar.app.google/M8w86eCTsJXMGmi1A";

// GA4 Measurement ID (G-XXXXXXX). Analytics stays off until this is set.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const SITE_DESCRIPTION =
  "Makr builds websites, automated lead follow-up and practical AI workflows that help growing service and manufacturing businesses get found, capture more opportunities and operate with less manual work.";

export const LOCAL_LINE =
  "Built in New England. Serving businesses across Massachusetts, New Hampshire, and beyond.";
