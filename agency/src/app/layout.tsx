import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Makr.ai — Never Miss Another Customer Call",
  description: "Makr helps home service businesses answer every lead, book more jobs, and grow revenue with practical AI. AI receptionist, lead qualification, and appointment booking — 24/7.",
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
