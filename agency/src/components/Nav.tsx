import Link from "next/link";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-black text-green-800 tracking-tight">
          Makr<span className="text-stone-400 font-medium">.ai</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-stone-500">
          <Link href="/services" className="hover:text-stone-900 transition">Services</Link>
          <Link href="/pricing" className="hover:text-stone-900 transition">Pricing</Link>
          <Link href="/growth-score" className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg transition font-medium">Get Your Growth Score</Link>
        </div>
        <Link href="/growth-score" className="md:hidden px-3 py-1.5 bg-green-700 text-white text-sm rounded-lg font-medium">Growth Score</Link>
      </div>
    </nav>
  );
}
