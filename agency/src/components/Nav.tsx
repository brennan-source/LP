import Link from "next/link";

export default function Nav({ activePath }: { activePath?: string }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Solutions" },
    { href: "/industries", label: "Industries" },
    { href: "/resources", label: "Resources" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-black text-green-800 tracking-tight">
          Makr<span className="text-stone-400 font-medium">.ai</span>
        </Link>
        <div className="hidden md:flex items-center gap-5 text-sm text-stone-500">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-stone-900 transition ${activePath === href ? "text-stone-900 font-medium" : ""}`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg transition font-medium"
          >
            Book a Demo
          </Link>
        </div>
        <Link href="/contact" className="md:hidden px-3 py-1.5 bg-green-700 text-white text-sm rounded-lg font-medium">
          Book a Demo
        </Link>
      </div>
    </nav>
  );
}
