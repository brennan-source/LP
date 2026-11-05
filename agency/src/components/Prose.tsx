import Link from "next/link";
import { Fragment } from "react";

// A small renderer for the subset of Markdown our long-form copy uses:
// ## and ### headings, paragraphs, "- " lists, "- [ ] " checklists, "1. " lists,
// "> " quotes, pipe tables, and inline **bold**, *italic* and [links](/path).
// Kept in-house so articles and guides can be stored as plain text in lib/.

const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*)/g;

export function Inline({ text }: { text: string }) {
  const parts = text.split(INLINE).filter((p) => p !== "");
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold text-ink"><Inline text={part.slice(2, -2)} /></strong>;
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (link) {
          const [, label, href] = link;
          const cls = "text-green-700 font-medium underline underline-offset-4 decoration-green-300 hover:decoration-green-700";
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={cls}>{label}</Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{label}</a>
          );
        }
        if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}><Inline text={part.slice(1, -1)} /></em>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

// Plain text for structured data (FAQPage answers): drops the Markdown markers.
export function plainText(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .trim();
}

type Block =
  | { kind: "h2" | "h3" | "p" | "note"; text: string }
  | { kind: "ul" | "ol" | "check"; items: string[] }
  | { kind: "quote"; lines: string[] }
  | { kind: "table"; head: string[]; rows: string[][] };

function cells(line: string) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}

export function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r/g, "").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (!t) { i++; continue; }
    if (t.startsWith("### ")) { blocks.push({ kind: "h3", text: t.slice(4) }); i++; continue; }
    if (t.startsWith("## ")) { blocks.push({ kind: "h2", text: t.slice(3) }); i++; continue; }
    if (t.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const row = cells(lines[i]);
        if (!row.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(row);
        i++;
      }
      blocks.push({ kind: "table", head: rows[0] ?? [], rows: rows.slice(1) });
      continue;
    }
    if (t.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ kind: "quote", lines: quote });
      continue;
    }
    if (/^- \[ \] /.test(t)) {
      const items: string[] = [];
      while (i < lines.length && /^- \[ \] /.test(lines[i].trim())) { items.push(lines[i].trim().slice(6)); i++; }
      blocks.push({ kind: "check", items });
      continue;
    }
    if (t.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) { items.push(lines[i].trim().slice(2)); i++; }
      blocks.push({ kind: "ul", items });
      continue;
    }
    if (/^\d+\. /.test(t)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^\d+\. /, "")); i++; }
      blocks.push({ kind: "ol", items });
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3} |\||>|- |\d+\. )/.test(lines[i].trim())) {
      para.push(lines[i].trim());
      i++;
    }
    const text = para.join(" ");
    const isNote = text.startsWith("*") && text.endsWith("*") && !text.startsWith("**");
    blocks.push(isNote ? { kind: "note", text: text.slice(1, -1) } : { kind: "p", text });
  }
  return blocks;
}

// Renders long-form copy in the house style. Headings get ids so they can be linked.
export function Prose({ source }: { source: string }) {
  return (
    <div className="space-y-5 text-ink-mid leading-relaxed">
      {parseBlocks(source).map((b, i) => {
        switch (b.kind) {
          case "h2":
            return <h2 key={i} className="pt-6 font-display font-extrabold uppercase text-3xl md:text-4xl text-ink leading-[0.95] text-balance"><Inline text={b.text} /></h2>;
          case "h3":
            return <h3 key={i} className="pt-3 font-display font-bold text-2xl text-ink leading-tight"><Inline text={b.text} /></h3>;
          case "note":
            return <p key={i} className="text-sm italic text-ink-light"><Inline text={b.text} /></p>;
          case "p":
            // "Source: ..." lines read as captions.
            return b.text.startsWith("Source:") ? (
              <p key={i} className="text-sm text-ink-light"><Inline text={b.text} /></p>
            ) : (
              <p key={i}><Inline text={b.text} /></p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2">
                {b.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-3"><span className="mt-[0.7em] w-1.5 h-1.5 rounded-full bg-copper-bright shrink-0" aria-hidden /><span><Inline text={it} /></span></li>
                ))}
              </ul>
            );
          case "check":
            return (
              <ul key={i} className="space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-3"><span className="mt-1 w-4 h-4 border-2 border-green-700 rounded-[3px] shrink-0" aria-hidden /><span><Inline text={it} /></span></li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-3">
                {b.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-md bg-green-200 text-green-700 grid place-items-center font-display font-extrabold shrink-0" aria-hidden>{j + 1}</span>
                    <span className="pt-0.5"><Inline text={it} /></span>
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i} className="bg-white border border-brass-light border-l-4 border-l-copper-bright rounded-md px-5 py-4 text-ink space-y-1">
                {b.lines.filter(Boolean).map((l, j) => <p key={j}><Inline text={l} /></p>)}
              </blockquote>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto bg-white border border-brass-light rounded-xl">
                <table className="w-full text-sm text-left">
                  <thead className="bg-canvas-warm">
                    <tr>{b.head.map((h, j) => <th key={j} scope="col" className="px-4 py-3 font-semibold text-ink align-bottom">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-brass-light">
                        {r.map((c, k) => <td key={k} className="px-4 py-3 align-top min-w-[8rem]"><Inline text={c} /></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}

// FAQ list in the house style (copper left border), plus the matching FAQPage schema.
export type Faq = { q: string; a: string };

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: plainText(f.q),
      acceptedAnswer: { "@type": "Answer", text: plainText(f.a) },
    })),
  };
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-6">
      {faqs.map((f) => (
        <div key={f.q} className="border-l-[3px] border-copper-bright pl-5">
          <h3 className="font-semibold text-ink mb-1"><Inline text={f.q} /></h3>
          <p className="text-ink-mid text-sm leading-relaxed"><Inline text={f.a} /></p>
        </div>
      ))}
    </div>
  );
}

export default Prose;
