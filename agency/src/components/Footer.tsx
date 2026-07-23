import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 py-8 px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-stone-400 text-sm">
        <span className="font-black text-green-800">Makr<span className="text-stone-400 font-medium">.ai</span></span>
        <div className="flex gap-6">
          <Link href="/services" className="hover:text-stone-700 transition">Services</Link>
          <Link href="/pricing" className="hover:text-stone-700 transition">Pricing</Link>
          <Link href="/contact" className="hover:text-stone-700 transition">Contact</Link>
        </div>
        <span>© {new Date().getFullYear()} Makr.ai. All rights reserved.</span>
      </div>
    </footer>
  );
}
