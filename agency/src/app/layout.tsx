import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Makr.ai — You built your business. We make it grow.",
  description: "Makr.ai is the growth partner for home service businesses. We handle your website, SEO, ads, and automation so you can focus on the work you're actually good at.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}
