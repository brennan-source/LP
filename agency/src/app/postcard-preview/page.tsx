import Link from "next/link";
import { getAllDemos, resolveDemo } from "@/lib/demo-data";

export default async function PostcardPreviewIndexPage() {
  const allDemos = await getAllDemos();
  const top30 = [...allDemos].sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, 30).map(resolveDemo);

  return (
    <div className="min-h-screen bg-stone-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-green-700 hover:text-green-600 text-sm font-medium transition">← Back to Makr.ai</Link>
          <h1 className="text-3xl font-black text-stone-800 mt-3">Postcard & Demo Directory</h1>
          <p className="text-stone-500 mt-1">Top 30 targets — postcard preview and live demo site for each.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {top30.map((d, i) => (
            <div key={d.slug} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">#{i + 1}</span>
                  <h2 className="font-bold text-stone-900 text-base leading-tight mt-0.5">{d.businessName}</h2>
                  <p className="text-stone-500 text-sm">{d.city}, {d.state}</p>
                </div>
                <div className="shrink-0 text-right">
                  {d.rating > 0 && (
                    <p className="text-sm font-bold text-green-700">★ {d.rating.toFixed(1)}</p>
                  )}
                  <p className="text-xs text-stone-400">{d.reviewCount > 0 ? `${d.reviewCount} reviews` : "No reviews"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.hasWebsite ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>
                  {d.hasWebsite ? "Has website" : "No website"}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-stone-100 text-stone-600">
                  {d.industry === "hvac" ? "HVAC" : "Plumbing / Septic"}
                </span>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/demo/${d.slug}`}
                  className="flex-1 text-center text-sm font-semibold text-white bg-green-700 hover:bg-green-600 px-3 py-2 rounded-lg transition"
                >
                  View Demo
                </Link>
                <Link
                  href={`/postcard-preview/${d.slug}`}
                  className="flex-1 text-center text-sm font-semibold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 px-3 py-2 rounded-lg transition"
                >
                  View Postcard
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
