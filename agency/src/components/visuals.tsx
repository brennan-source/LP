// Illustrative visuals built in HTML/CSS: concept website screens, lead and
// workflow artifacts, before/after, and a sample review. Everything here is
// labeled as a concept or sample where it appears — none of it is client work
// or real performance data.

export type Concept = {
  id: string;
  industry: string;
  brand: string;
  nav: string[];
  eyebrow: string;
  headline: string;
  cta: string;
  tags: string[];
  intent: string;
  tone: "forest" | "ink" | "sage";
};

export const CONCEPTS: Concept[] = [
  {
    id: "manufacturer",
    industry: "Contract manufacturer",
    brand: "Ridgeline Precision",
    nav: ["Capabilities", "Industries", "Quality", "RFQ"],
    eyebrow: "CNC machining · Assemblies · Prototyping",
    headline: "Tight-tolerance parts, delivered when your line needs them.",
    cta: "Request a quote",
    tags: ["Website", "RFQ intake", "Quote follow-up"],
    intent: "Designed to turn capability pages into qualified RFQs and get each one answered quickly.",
    tone: "ink",
  },
  {
    id: "home-services",
    industry: "Home services",
    brand: "Brookside Heating & Air",
    nav: ["Services", "Maintenance plans", "Reviews", "Contact"],
    eyebrow: "Heating · Cooling · Same-week service",
    headline: "Comfortable again, without the runaround.",
    cta: "Book a service visit",
    tags: ["Website", "Missed-call recovery", "Estimate follow-up"],
    intent: "Designed to make booking the obvious next step and catch every call that would have gone to voicemail.",
    tone: "forest",
  },
  {
    id: "practice",
    industry: "Medical practice",
    brand: "Elm Street Family Practice",
    nav: ["Our care", "Providers", "New patients", "Portal"],
    eyebrow: "Accepting new patients",
    headline: "Care that starts with a conversation.",
    cta: "Request an appointment",
    tags: ["Website", "Online booking", "Reminders"],
    intent: "Designed to answer new-patient questions up front and make requesting an appointment simple.",
    tone: "sage",
  },
];

const TONES = {
  forest: { hero: "bg-green-800", text: "text-white", sub: "text-green-200", btn: "bg-white text-green-800" },
  ink: { hero: "bg-ink", text: "text-white", sub: "text-green-200", btn: "bg-green-600 text-white" },
  sage: { hero: "bg-sage", text: "text-ink", sub: "text-ink-mid", btn: "bg-green-700 text-white" },
};

function BrowserFrame({ url, children, className = "" }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-brass-light rounded-sm shadow-showcase overflow-hidden ${className}`}>
      <div className="flex items-center gap-1.5 px-3 h-7 border-b border-brass-light bg-canvas-warm" aria-hidden>
        <span className="w-2 h-2 rounded-full bg-brass-light" />
        <span className="w-2 h-2 rounded-full bg-brass-light" />
        <span className="w-2 h-2 rounded-full bg-brass-light" />
        <span className="ml-3 text-[10px] text-ink-light truncate">{url}</span>
      </div>
      {children}
    </div>
  );
}

// A small, legible rendering of a concept homepage.
export function ConceptScreen({ concept, size = "md" }: { concept: Concept; size?: "sm" | "md" | "lg" }) {
  const t = TONES[concept.tone];
  const head = size === "lg" ? "text-2xl md:text-3xl" : size === "md" ? "text-xl" : "text-base";
  const slug = concept.brand.toLowerCase().replace(/[^a-z]+/g, "");
  return (
    <BrowserFrame url={`${slug}.com`}>
      <div aria-hidden>
        <div className="flex items-center justify-between px-4 h-9 border-b border-brass-light">
          <span className="font-display font-bold text-[13px] text-ink truncate">{concept.brand}</span>
          <span className="hidden sm:flex gap-3 text-[10px] text-ink-mid">
            {concept.nav.map((n) => <span key={n}>{n}</span>)}
          </span>
        </div>
        <div className={`${t.hero} px-5 ${size === "sm" ? "py-5" : "py-8"}`}>
          <p className={`text-[10px] uppercase tracking-widest ${t.sub}`}>{concept.eyebrow}</p>
          <p className={`mt-2 font-display font-extrabold leading-[1.05] ${head} ${t.text} max-w-md`}>{concept.headline}</p>
          <span className={`mt-4 inline-block text-[11px] font-semibold px-3 py-1.5 rounded-sm ${t.btn}`}>{concept.cta}</span>
        </div>
        {size !== "sm" && (
          <div className="grid grid-cols-3 gap-2 p-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="border border-brass-light rounded-sm p-2">
                <div className="h-1.5 w-2/3 bg-ink/70 rounded-full" />
                <div className="mt-1.5 h-1 w-full bg-brass-light rounded-full" />
                <div className="mt-1 h-1 w-4/5 bg-brass-light rounded-full" />
              </div>
            ))}
          </div>
        )}
      </div>
    </BrowserFrame>
  );
}

export function LeadCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white border border-brass-light rounded-sm shadow-showcase p-4 w-64 ${className}`} aria-hidden>
      <p className="text-[10px] font-bold uppercase tracking-widest text-copper">New inquiry · 4:52 pm</p>
      <p className="mt-2 text-xs text-ink bg-canvas rounded-sm px-3 py-2">Need a quote for 250 brackets, 6061 aluminum. Drawings attached.</p>
      <p className="mt-2 text-xs text-white bg-green-700 rounded-sm px-3 py-2 ml-6">Thanks, Dana — we have your RFQ. Our estimator will reply by 10am tomorrow.</p>
      <p className="mt-2 text-[10px] text-ink-light text-right">Sent automatically</p>
    </div>
  );
}

export function WorkflowCard({ className = "" }: { className?: string }) {
  const steps = [
    { label: "Inquiry received", done: true },
    { label: "Details pulled from drawings", done: true },
    { label: "Routed to estimating", done: true },
    { label: "Quote follow-up · day 3", done: false },
  ];
  return (
    <div className={`bg-white border border-brass-light rounded-sm shadow-showcase p-4 w-60 ${className}`} aria-hidden>
      <p className="text-[10px] font-bold uppercase tracking-widest text-copper">Behind the scenes</p>
      <ol className="mt-3 space-y-2">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-xs text-ink">
            <span className={`w-4 h-4 shrink-0 rounded-full border flex items-center justify-center text-[9px] ${s.done ? "bg-green-700 border-green-700 text-white" : "border-brass-light text-ink-light"}`}>
              {s.done ? "✓" : ""}
            </span>
            <span className={s.done ? "" : "text-ink-mid"}>{s.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Hero composition: the website, the customer interaction, and the workflow behind it.
export function ArtifactStack() {
  return (
    <figure>
      <div className="animate-rise">
        <ConceptScreen concept={CONCEPTS[0]} size="lg" />
      </div>
      <div className="relative -mt-8 sm:-mt-12 mx-3 sm:mx-6 grid sm:grid-cols-2 gap-3 items-start">
        <div className="animate-rise" style={{ animationDelay: "150ms" }}><LeadCard className="w-auto" /></div>
        <div className="animate-rise sm:mt-8" style={{ animationDelay: "300ms" }}><WorkflowCard className="w-auto" /></div>
      </div>
      <figcaption className="mt-4 text-xs text-ink-light">
        Illustrative example: a website, the customer&apos;s first contact, and the workflow behind it. Fictional business.
      </figcaption>
    </figure>
  );
}

// Service visuals for the editorial rows.
export function JourneyVisual() {
  const steps = [
    { t: "0 min", label: "Missed call", note: "Customer calls after hours" },
    { t: "1 min", label: "Text back", note: "“Sorry we missed you — book here”" },
    { t: "Day 2", label: "Follow-up", note: "Reminder on the open estimate" },
    { t: "Day 4", label: "Booked", note: "Appointment on the calendar" },
  ];
  return (
    <figure className="bg-white border border-brass-light rounded-sm shadow-showcase p-6">
      <ol className="grid sm:grid-cols-4 gap-4 relative">
        {steps.map((s, i) => (
          <li key={s.label} className="relative">
            <p className="text-[11px] font-bold uppercase tracking-widest text-copper">{s.t}</p>
            <p className="mt-1 font-semibold text-ink text-sm">{s.label}</p>
            <p className="mt-1 text-xs text-ink-mid">{s.note}</p>
            {i < steps.length - 1 && <span className="hidden sm:block absolute top-2 -right-3 text-ink-light" aria-hidden>→</span>}
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 text-xs text-ink-light">Illustrative follow-up sequence. Timing is set for each business.</figcaption>
    </figure>
  );
}

export function ProcessVisual() {
  return (
    <figure className="bg-white border border-brass-light rounded-sm shadow-showcase p-6">
      <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div className="border border-brass-light rounded-sm p-3 bg-canvas-warm">
          <p className="text-[11px] font-bold uppercase tracking-widest text-copper">Incoming email</p>
          <p className="mt-2 text-xs text-ink">“PO 4471 attached — 500 units, ship to Lowell by the 14th.”</p>
        </div>
        <span className="text-ink-light text-center" aria-hidden>→</span>
        <dl className="border border-brass-light rounded-sm p-3 text-xs grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
          <dt className="text-ink-light">PO</dt><dd className="text-ink">4471</dd>
          <dt className="text-ink-light">Qty</dt><dd className="text-ink">500</dd>
          <dt className="text-ink-light">Ship to</dt><dd className="text-ink">Lowell</dd>
          <dt className="text-ink-light">Routed</dt><dd className="text-green-700 font-semibold">Order desk ✓</dd>
        </dl>
      </div>
      <figcaption className="mt-5 text-xs text-ink-light">Illustrative example: details read from an email, entered and routed — your team reviews before anything is sent.</figcaption>
    </figure>
  );
}

const BEFORE_AFTER = [
  ["Website that only describes", "Website built to start conversations"],
  ["Slow response to new inquiries", "Immediate acknowledgment"],
  ["Manual handoffs between people", "Automated routing to the right person"],
  ["Follow-up when someone remembers", "Structured follow-up on every quote"],
  ["Information scattered across tools", "One shared view of what's open"],
];

export function BeforeAfter() {
  return (
    <table className="w-full text-left">
      <caption className="sr-only">How a business changes after working with Makr</caption>
      <thead>
        <tr className="border-b border-brass-light">
          <th scope="col" className="w-1/2 pb-3 text-xs font-bold uppercase tracking-widest text-ink-mid">Before</th>
          <th scope="col" className="w-1/2 pb-3 pl-6 text-xs font-bold uppercase tracking-widest text-green-700">After Makr</th>
        </tr>
      </thead>
      <tbody>
        {BEFORE_AFTER.map(([b, a]) => (
          <tr key={b} className="border-b border-brass-light align-top">
            <td className="py-4 pr-6 text-ink-mid">{b}</td>
            <td className="py-4 pl-6 text-ink font-semibold border-l-2 border-green-700">
              <span className="sr-only">becomes </span>{a}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// What a Growth Gap Review produces. Fictional sample, labeled as such.
export function AssessmentPreview() {
  const scores = [
    { area: "Website", rating: "Needs work", width: "w-2/5" },
    { area: "Lead follow-up", rating: "Gap", width: "w-1/5" },
    { area: "Workflows", rating: "Solid", width: "w-4/5" },
  ];
  return (
    <figure className="bg-white text-ink border border-brass-light rounded-sm shadow-showcase p-6">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-display font-bold text-xl">Growth Gap Review</p>
        <span className="text-[11px] font-bold uppercase tracking-widest text-copper">Sample</span>
      </div>
      <div className="mt-5 space-y-3">
        {scores.map((s) => (
          <div key={s.area}>
            <div className="flex justify-between text-sm"><span>{s.area}</span><span className="text-ink-mid">{s.rating}</span></div>
            <div className="mt-1 h-1.5 bg-canvas rounded-full" aria-hidden><div className={`h-1.5 bg-green-700 rounded-full ${s.width}`} /></div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid sm:grid-cols-2 gap-5 text-sm">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-ink-mid mb-2">Priority opportunities</p>
          <ol className="space-y-1 text-ink-mid list-decimal list-inside">
            <li>Text back missed calls</li>
            <li>Follow up on open quotes</li>
            <li>Add a clear quote form</li>
          </ol>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-ink-mid mb-2">Recommended sequence</p>
          <ol className="space-y-1 text-ink-mid">
            <li><span className="text-copper font-semibold">Weeks 1–2</span> · Follow-up</li>
            <li><span className="text-copper font-semibold">Weeks 3–6</span> · Website</li>
            <li><span className="text-copper font-semibold">Then</span> · Intake workflow</li>
          </ol>
        </div>
      </div>
      <figcaption className="mt-5 text-xs text-ink-light">Sample review for a fictional business. Yours is based on your website, follow-up and workflows.</figcaption>
    </figure>
  );
}
