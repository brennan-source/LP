import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav({ activePath }: { activePath?: string }) {
  return (
    <nav aria-label="Main" className="fixed top-0 left-0 right-0 z-50 bg-canvas-warm/95 border-b border-brass-light">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Makr home" className="font-display text-[1.75rem] leading-none font-extrabold text-ink tracking-[-0.03em]">
          Makr<span className="text-green-700">.</span>
        </Link>
        <div className="hidden lg:flex items-center gap-6 text-sm text-ink-mid">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={activePath === href ? "page" : undefined}
              className={`py-2 border-b-2 hover:text-ink transition-colors ${activePath === href ? "text-ink font-semibold border-green-700" : "border-transparent"}`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            data-cta="nav-growth-gaps"
            className="px-4 py-2 border border-green-700 text-green-700 hover:bg-green-700 hover:text-white rounded-sm font-semibold transition-colors"
          >
            Find Your Growth Gaps
          </Link>
        </div>

        {/* Mobile menu: native disclosure, no client JS */}
        <details className="lg:hidden relative group">
          <summary className="list-none cursor-pointer select-none px-3 py-1.5 border border-brass-light rounded-sm text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Close</span>
          </summary>
          <div className="absolute right-0 mt-3 w-64 bg-white border border-brass-light rounded-sm shadow-lg p-2 flex flex-col">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={activePath === href ? "page" : undefined}
                className={`px-4 py-3 text-sm rounded-sm hover:bg-canvas-warm ${activePath === href ? "text-ink font-semibold" : "text-ink-mid"}`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              data-cta="nav-growth-gaps-mobile"
              className="mt-2 px-4 py-3 bg-green-700 hover:bg-green-800 text-white text-sm text-center rounded-sm font-semibold"
            >
              Find Your Growth Gaps
            </Link>
          </div>
        </details>
      </div>
    </nav>
  );
}

export default Nav;
