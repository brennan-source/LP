import Link from "next/link";
import Nav from "@/components/Nav";

const STEPS = [
  {
    number: "01",
    name: "Assessment",
    headline: "We map where you're losing revenue.",
    body: "A focused conversation about your call flow, follow-up process, office workflows, and team. We're looking for the gaps — the places where leads, jobs, and hours are slipping through. No obligation. No pitch. Just an honest read.",
    output: "A clear picture of your highest-value opportunities.",
  },
  {
    number: "02",
    name: "Roadmap",
    headline: "You get a plan before you commit to anything.",
    body: "We come back with a specific proposal: what we'd build, how it connects to your existing tools, what it costs, and what it should deliver. Scoped to your business — not a template.",
    output: "A written scope, timeline, and investment summary.",
  },
  {
    number: "03",
    name: "Build",
    headline: "We configure and integrate your systems.",
    body: "Our team builds and connects your AI systems — receptionist, follow-up workflows, CRM integrations, scheduling automation, whatever the roadmap calls for. You stay informed throughout. We handle the technical lift.",
    output: "Fully configured systems, tested and ready to go live.",
  },
  {
    number: "04",
    name: "Launch",
    headline: "Systems go live. We watch closely.",
    body: "Launch is the beginning, not the end. We monitor performance in the first weeks, tune responses, and make sure everything is working the way it should before we hand over the keys.",
    output: "Live systems with monitored early performance.",
  },
  {
    number: "05",
    name: "Manage",
    headline: "We run it. You run your business.",
    body: "For retainer clients, we handle ongoing optimization, performance reporting, and system management. You get a monthly report on what the systems are producing — calls captured, jobs booked, hours saved — in plain language.",
    output: "Monthly reporting. Continuous improvement. Dedicated point of contact.",
  },
  {
    number: "06",
    name: "Expand",
    headline: "As results compound, we grow the system.",
    body: "Once the foundation is producing, we identify the next layer — new automations, additional integrations, team adoption programs. The system gets more valuable over time, not less.",
    output: "A roadmap for what's next, driven by what's working.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />

      {/* Header */}
      <section className="bg-white pt-28 pb-16 px-6 border-b border-brass-light">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-ink leading-none tracking-tight">
            How an engagement works.
          </h1>
          <p className="mt-6 text-ink-mid text-xl max-w-2xl leading-relaxed">
            From first conversation to running systems — here's exactly what to expect.
            Every step connects to the next.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-canvas">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-7 top-10 bottom-10 w-px bg-brass-light hidden md:block" />

            <div className="space-y-0">
              {STEPS.map((step, i) => (
                <div key={step.number} className="relative">
                  {/* Step */}
                  <div className="md:flex gap-10 items-start">
                    {/* Number bubble */}
                    <div className="relative flex-shrink-0 hidden md:flex flex-col items-center">
                      <div className="w-14 h-14 rounded-sm bg-white border-2 border-brass-light flex items-center justify-center z-10">
                        <span className="font-display font-bold text-lg text-ink">{step.number}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 bg-white border border-brass-light rounded-sm p-8 mb-0 ${
                      i < STEPS.length - 1 ? "mb-px" : ""
                    }`}>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="md:hidden font-display font-bold text-2xl text-brass">{step.number}</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-brass">{step.name}</span>
                      </div>
                      <h2 className="font-display font-bold text-2xl md:text-3xl text-ink mb-3 leading-snug">
                        {step.headline}
                      </h2>
                      <p className="text-ink-mid leading-relaxed mb-6">{step.body}</p>
                      <div className="flex items-start gap-3 bg-canvas-warm border border-brass-light rounded-sm px-4 py-3">
                        <span className="text-brass font-bold text-sm shrink-0 mt-0.5">→</span>
                        <p className="text-ink-mid text-sm">{step.output}</p>
                      </div>
                    </div>
                  </div>

                  {/* Connector arrow between steps */}
                  {i < STEPS.length - 1 && (
                    <div className="md:ml-24 flex items-center justify-start py-3 pl-8">
                      <div className="flex items-center gap-2 text-brass-light">
                        <div className="w-px h-6 bg-brass-light" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What stays the same */}
      <section className="py-16 px-6 bg-white border-y border-brass-light">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-ink mb-10">What stays the same throughout.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "A single point of contact",
                body: "One person who knows your business, answers your questions, and is accountable for outcomes. Not a support queue.",
                accent: "border-green-700",
              },
              {
                title: "Plain-language reporting",
                body: "Monthly reports in terms that matter to you — revenue captured, jobs booked, hours saved. Not AI metrics.",
                accent: "border-green-800",
              },
              {
                title: "No surprises on cost",
                body: "Implementation fees and monthly retainers are scoped and agreed to before any work begins. No hidden fees.",
                accent: "border-brass",
              },
            ].map((item) => (
              <div key={item.title} className={`bg-canvas border-l-4 ${item.accent} rounded-sm p-6`}>
                <h3 className="font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-ink-mid text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-green-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight max-w-2xl">
            The first step is a conversation.
          </h2>
          <p className="mt-6 text-green-200 text-lg max-w-lg">
            Book an AI Opportunity Assessment. We’ll tell you honestly where AI can help your business
            and what the opportunity looks like — before you commit to anything.
          </p>
          <div className="mt-10 flex flex-wrap gap-5 items-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-green-900 hover:bg-green-50 px-8 py-4 rounded font-bold text-lg transition-colors"
            >
              Book an AI Opportunity Assessment
            </Link>
            <Link
              href="/pricing"
              className="text-green-200 hover:text-white text-sm font-medium transition-colors"
            >
              See pricing →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
