import Link from "next/link";

export function Nav({ activePath }: { activePath?: string }) {
  const links = [
    { href: "/services", label: "Solutions" },
    { href: "/industries", label: "Industries" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-brass-light">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold text-ink tracking-tight">
          Makr
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-ink-mid">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-ink transition-colors ${activePath === href ? "text-ink font-semibold" : ""}`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded font-semibold transition-colors"
          >
            Book an Assessment
          </Link>
        </div>
        <Link href="/contact" className="md:hidden px-3 py-1.5 bg-green-700 text-white text-sm rounded font-semibold">
          Book Assessment
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
