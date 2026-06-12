import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ url?: string; name?: string }>;
}

export default async function PreviewPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { url, name } = await searchParams;

  const framerUrl = url ? decodeURIComponent(url) : null;
  const displayName = name ? decodeURIComponent(name) : "Your Business";

  // Mode 1: Framer URL present — iframe the actual demo with a sticky CTA banner
  if (framerUrl) {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Sticky CTA banner */}
        <div className="bg-amber-500 px-4 py-2.5 flex items-center justify-between gap-4 shrink-0">
          <p className="text-slate-900 text-sm font-medium truncate">
            This is your free website from Makr.ai — built for {displayName}
          </p>
          <Link
            href="/contact"
            className="shrink-0 bg-slate-900 text-amber-400 font-bold text-sm px-4 py-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            Claim it free →
          </Link>
        </div>
        {/* Full-height Framer iframe */}
        <iframe
          src={framerUrl}
          className="flex-1 w-full border-0"
          title={`${displayName} — preview`}
          allow="fullscreen"
        />
      </div>
    );
  }

  // Mode 2: No Framer URL — generic landing page
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* CTA banner */}
      <div className="bg-amber-500 px-6 py-3 text-center">
        <p className="text-slate-900 font-medium text-sm">
          This is your free demo site from Makr.ai — keep it, included with any plan.
          <Link href="/contact" className="underline ml-2 font-bold hover:text-slate-700 transition">
            Claim it — no setup fee →
          </Link>
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-flex items-center gap-2 bg-amber-900/30 border border-amber-800 rounded-full px-4 py-1.5 text-amber-300 text-sm mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Your website is ready
          </div>
          <h1 className="text-5xl font-black text-white mb-4">{displayName}</h1>
          <p className="text-slate-400 text-xl mb-10">
            We built a professional website for your business — included with any marketing plan, no build fee.
          </p>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 text-left">
            <h2 className="text-white font-bold text-lg mb-4">What&apos;s included:</h2>
            <ul className="space-y-3">
              {[
                "Professional website, custom-built for your business",
                "Mobile-optimized and fast-loading",
                "Google Business Profile optimization",
                "2 SEO blog posts per month",
                "Monthly rankings report",
                "Included with any marketing plan — no build fee (a $2,500 value)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300 text-sm">
                  <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition shadow-lg shadow-amber-900/50 mb-4"
          >
            Claim My Free Website
          </Link>
          <p className="text-slate-600 text-sm">
            No setup fee. 4-month agreement. You own the build after month 4.
          </p>
          <p className="text-slate-700 text-xs mt-4">ref: {slug}</p>
        </div>
      </div>

      <footer className="border-t border-slate-800 py-4 px-6 text-center">
        <p className="text-slate-600 text-sm">
          <Link href="/" className="text-amber-400 font-bold">Makr<span className="text-slate-600">.ai</span></Link> — You built your business. We make it grow.
        </p>
      </footer>
    </div>
  );
}
