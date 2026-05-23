import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM — LeadPulse & Aria",
  description: "Internal CRM for managing outreach and customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-slate-900 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
