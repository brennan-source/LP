import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllDemos, getDemoBySlug, resolveDemo } from "@/lib/demo-data";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const demos = await getAllDemos();
  return demos.map((d) => ({ slug: d.slug }));
}

export default async function PostcardPreviewSlugPage({ params }: Props) {
  const { slug } = await params;
  const raw = await getDemoBySlug(slug);
  if (!raw) notFound();
  const d = resolveDemo(raw);

  const trackingUrl = `https://gomakr.ai/demo/${d.slug}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(trackingUrl)}&bgcolor=ffffff&color=14532d&margin=10`;

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-10 gap-12 font-sans">
      <div className="text-center mb-2">
        <p className="text-stone-400 text-sm mb-1">
          <Link href="/postcard-preview" className="hover:text-stone-600 transition">← All Postcards</Link>
        </p>
        <h1 className="text-2xl font-black text-stone-800">Postcard — {d.businessName}</h1>
        <p className="text-stone-500 text-sm mt-1">6×4" · Printed at 900×600px by Lob · Shown at 75% scale</p>
      </div>

      {/* FRONT */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Front</p>
        <div
          className="relative overflow-hidden shadow-2xl rounded-lg"
          style={{ width: 675, height: 450, background: "#14532d" }}
        >
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="1.5" fill="#bbf7d0" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-green-400/10" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-green-400/5" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center px-16 text-center gap-5">
            <div className="flex items-baseline gap-0.5">
              <span style={{ fontSize: 52, fontWeight: 900, color: "#86efac", letterSpacing: "-2px", lineHeight: 1 }}>Makr</span>
              <span style={{ fontSize: 28, fontWeight: 500, color: "#4ade80", letterSpacing: "-1px" }}>.ai</span>
            </div>
            <div>
              <p style={{ fontSize: 26, fontWeight: 700, color: "#ffffff", lineHeight: 1.25, margin: 0 }}>
                We built a new website
              </p>
              <p style={{ fontSize: 26, fontWeight: 700, color: "#86efac", lineHeight: 1.25, margin: 0 }}>
                for your business.
              </p>
            </div>
            <p style={{ fontSize: 15, color: "#bbf7d0", margin: 0, lineHeight: 1.5, whiteSpace: "nowrap" }}>
              No setup fee.&nbsp;&nbsp;No build charge.&nbsp;&nbsp;Built to help you grow.
            </p>
            <div style={{ background: "#86efac", borderRadius: 999, paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#14532d", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Included with any plan — you choose
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BACK */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Back</p>
        <div
          className="relative overflow-hidden shadow-2xl rounded-lg"
          style={{ width: 675, height: 450, background: "#ffffff", display: "flex" }}
        >
          <div style={{ flex: 1, padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 1, marginBottom: 4 }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: "#15803d", letterSpacing: "-1px" }}>Makr</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#6b7280" }}>.ai</span>
            </div>
            <p style={{ fontSize: 22, fontWeight: 800, color: "#111827", lineHeight: 1.2, margin: 0 }}>
              {d.businessName}
            </p>
            {d.rating > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#15803d", fontSize: 14 }}>{"★".repeat(Math.round(d.rating))}</span>
                <span style={{ fontSize: 13, color: "#4b5563", fontWeight: 600 }}>
                  {d.rating.toFixed(1)} · {d.reviewCount.toLocaleString()} Google reviews
                </span>
              </div>
            )}
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.6, margin: 0 }}>
              {d.hasWebsite
                ? <>Hey — we built <strong>{d.businessName}</strong> a new SEO-optimized website. It&apos;s designed to rank higher on Google and drive more leads — at no cost to you. Scan to see it.</>
                : <>Hey — we built a professional website for <strong>{d.businessName}</strong> at no cost. Scan to see it, and claim it free for the first 4 months with any plan.</>
              }
            </p>
            <p style={{ fontSize: 13, color: "#15803d", fontWeight: 700, margin: 0 }}>
              gomakr.ai — You built your business. We make it grow.
            </p>
          </div>

          <div style={{ width: 1, background: "#e5e7eb", margin: "32px 0" }} />

          <div style={{ width: 220, padding: "36px 28px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ textAlign: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt="QR code" width={160} height={160} style={{ borderRadius: 8, border: "2px solid #e5e7eb" }} />
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Scan to see your site
              </p>
            </div>
            <div style={{ width: "100%", borderTop: "1px dashed #d1d5db", paddingTop: 14 }}>
              <p style={{ fontSize: 10, color: "#d1d5db", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Delivered to</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", margin: "0 0 2px" }}>{d.businessName}</p>
              <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{d.city}, {d.state}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 text-sm">
        <Link href={`/demo/${d.slug}`} className="text-green-700 hover:text-green-600 font-medium transition">
          View demo site →
        </Link>
        <Link href="/postcard-preview" className="text-stone-500 hover:text-stone-700 font-medium transition">
          ← All postcards
        </Link>
      </div>
    </div>
  );
}
