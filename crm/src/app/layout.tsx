import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM — LeadPulse & Aria",
  description: "Customer relationship management for LeadPulse and Aria.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-slate-900 text-slate-100">{children}</body>
    </html>
  );
}
