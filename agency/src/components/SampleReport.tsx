import type { SampleReport as Report } from "@/lib/content";

// A fictional business's week, in plain language. Always labeled as a sample.
export function SampleReport({ report, id }: { report: Report; id?: string }) {
  return (
    <div id={id} className="bg-white border border-brass-light rounded-xl shadow-showcase overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-brass-light">
        <div>
          <p className="font-semibold text-ink text-[15px]">{report.business} · Last week</p>
          <p className="text-xs text-ink-light">Last week, in plain language</p>
        </div>
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-[#7F4400] bg-[#F6ECDA] px-2 py-1 rounded">Sample</span>
      </div>
      <div className="px-5 py-3.5 bg-canvas-warm border-b border-brass-light">
        <p className="text-[11px] font-bold uppercase tracking-wider text-copper mb-1">The problem we started with</p>
        <p className="text-sm text-ink">{report.problem}</p>
      </div>
      <ol className="px-5 py-1">
        {report.items.map((item, i) => (
          <li key={item.text} className="grid grid-cols-[28px_1fr_auto] gap-3 items-center py-3 border-b border-brass-light last:border-b-0">
            <span className="w-7 h-7 rounded-md bg-green-200 text-green-700 grid place-items-center font-display font-extrabold" aria-hidden>{i + 1}</span>
            <span className="text-sm text-ink leading-snug">
              {item.text}
              <span className="block text-xs text-ink-light mt-0.5">{item.service}</span>
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${item.waiting ? "bg-[#F6ECDA] text-[#7F4400]" : "bg-green-200 text-green-700"}`}>
              {item.status}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default SampleReport;
