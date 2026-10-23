import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Makr — Websites, Lead Follow-Up & AI Workflows for Growing Businesses",
    template: "%s | Makr",
  },
  description: SITE_DESCRIPTION,
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en_US" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  description: SITE_DESCRIPTION,
  areaServed: [
    { "@type": "State", name: "Massachusetts" },
    { "@type": "State", name: "New Hampshire" },
    { "@type": "Place", name: "New England" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${barlow.variable} ${barlowCondensed.variable} font-sans bg-canvas text-ink antialiased`}
      >
        <JsonLd data={organizationSchema} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
