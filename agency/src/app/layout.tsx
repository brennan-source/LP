import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Makr — AI Growth & Operations for Service Businesses",
  description: "Makr designs, implements, and manages practical AI systems that help service businesses grow revenue, automate operations, and enable their teams.",
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
