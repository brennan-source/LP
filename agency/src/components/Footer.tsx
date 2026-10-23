import Link from "next/link";
import { INDUSTRIES, SOLUTIONS } from "@/lib/content";
import { CONTACT_EMAIL, LOCAL_LINE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-light py-14 px-6">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-display font-bold text-xl text-white mb-3">Makr</div>
          <p>Websites, lead follow-up and practical AI workflows for growing businesses.</p>
          <p className="mt-3 text-canvas-warm">{LOCAL_LINE}</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-block hover:text-white transition-colors">{CONTACT_EMAIL}</a>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-xs uppercase tracking-widest">Solutions</div>
          <ul className="space-y-2">
            {SOLUTIONS.map((s) => (
              <li key={s.id}><Link href={`/solutions#${s.id}`} className="hover:text-white transition-colors">{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-xs uppercase tracking-widest">Industries</div>
          <ul className="space-y-2">
            {INDUSTRIES.map((i) => (
              <li key={i.id}><Link href={`/industries#${i.id}`} className="hover:text-white transition-colors">{i.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-xs uppercase tracking-widest">Company</div>
          <ul className="space-y-2">
            <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            <li><Link href="/growth-score" className="hover:text-white transition-colors">Free Growth Score</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-8 border-t border-ink-mid/30 text-xs text-ink-light">
        &copy; {new Date().getFullYear()} Makr. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
