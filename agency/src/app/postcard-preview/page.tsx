import Link from "next/link";

const SAMPLE = {
  businessName: "Trethewey Brothers Inc.",
  city: "Watertown",
  state: "MA",
  phone: "(617) 926-3434",
  rating: 4.8,
  reviewCount: 312,
  trackingUrl: "https://gomakr.ai/preview/tbros-trethewey-brothers-inc",
};

const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(SAMPLE.trackingUrl)}&bgcolor=ffffff&color=0f172a&margin=10`;

export default function PostcardPreviewPage() {
  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center justify-center p-10 gap-12 font-sans">
      <div className="text-center mb-2">
        <h1 className="text-2xl font-black text-slate-800">Postcard Mockup — 6×4"</h1>
        <p className="text-slate-500 text-sm mt-1">Printed at 900×600px by Lob. Shown at 75% scale.</p>
      </div>

      {/* ── FRONT ── */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Front</p>
        {/* 900×600 → 675×450 at 75% */}
        <div
          className="relative overflow-hidden shadow-2xl rounded-lg"
          style={{ width: 675, height: 450, background: "#0f172a" }}
        >
          {/* Subtle dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="1.5" fill="#f59e0b" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>

          {/* Decorative amber arc */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-500/10" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-amber-500/5" />

          {/* Content — centered */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-16 text-center gap-5">
            {/* Logo */}
            <div className="flex items-baseline gap-0.5">
              <span style={{ fontSize: 52, fontWeight: 900, color: "#f59e0b", letterSpacing: "-2px", lineHeight: 1 }}>Makr</span>
              <span style={{ fontSize: 28, fontWeight: 500, color: "#64748b", letterSpacing: "-1px" }}>.ai</span>
            </div>

            {/* Headline */}
            <div>
              <p style={{ fontSize: 26, fontWeight: 700, color: "#ffffff", lineHeight: 1.25, margin: 0 }}>
                We built a free website
              </p>
              <p style={{ fontSize: 26, fontWeight: 700, color: "#fbbf24", lineHeight: 1.25, margin: 0 }}>
                for your business.
              </p>
            </div>

            {/* Sub */}
            <p style={{ fontSize: 15, color: "#94a3b8", margin: 0, lineHeight: 1.5, whiteSpace: "nowrap" }}>
              No setup fee.&nbsp;&nbsp;No build charge.&nbsp;&nbsp;Built to help you grow.
            </p>

            {/* Divider tag */}
            <div style={{ background: "#f59e0b", borderRadius: 999, paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Included with any marketing plan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── BACK ── */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Back</p>
        <div
          className="relative overflow-hidden shadow-2xl rounded-lg"
          style={{ width: 675, height: 450, background: "#ffffff", display: "flex" }}
        >
          {/* Left: message column */}
          <div style={{ flex: 1, padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
            {/* Logo small */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 1, marginBottom: 4 }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: "#f59e0b", letterSpacing: "-1px" }}>Makr</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#94a3b8" }}>.ai</span>
            </div>

            {/* Business name */}
            <p style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", lineHeight: 1.2, margin: 0 }}>
              {SAMPLE.businessName}
            </p>

            {/* Stars + review count */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#f59e0b", fontSize: 14 }}>{"★".repeat(Math.round(SAMPLE.rating))}</span>
              <span style={{ fontSize: 13, color: "#475569", fontWeight: 600 }}>{SAMPLE.rating} · {SAMPLE.reviewCount.toLocaleString()} Google reviews</span>
            </div>

            {/* Message */}
            <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.6, margin: 0 }}>
              Hey — we built a professional website for <strong>{SAMPLE.businessName}</strong> at no cost.
              Scan to see it, and claim it free for the first 4 months with any plan.
            </p>

            {/* CTA line */}
            <p style={{ fontSize: 13, color: "#f59e0b", fontWeight: 700, margin: 0 }}>
              gomakr.ai — You built your business. We make it grow.
            </p>
          </div>

          {/* Divider */}
          <div style={{ width: 1, background: "#e2e8f0", margin: "32px 0" }} />

          {/* Right: QR + address block */}
          <div style={{ width: 220, padding: "36px 28px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ textAlign: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt="QR code" width={160} height={160} style={{ borderRadius: 8, border: "2px solid #e2e8f0" }} />
              <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Scan to see your site
              </p>
            </div>

            {/* Address area placeholder (Lob fills this) */}
            <div style={{ width: "100%", borderTop: "1px dashed #cbd5e1", paddingTop: 14 }}>
              <p style={{ fontSize: 10, color: "#cbd5e1", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Delivered to</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: "0 0 2px" }}>{SAMPLE.businessName}</p>
              <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>{SAMPLE.city}, {SAMPLE.state}</p>
            </div>
          </div>
        </div>
      </div>

      <Link href="/" className="text-amber-500 hover:text-amber-400 text-sm font-medium transition">
        ← Back to Makr.ai
      </Link>
    </div>
  );
}
