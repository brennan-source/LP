import Link from "next/link";
import Nav from "@/components/Nav";

const PILLARS = [
  {
    id: "grow",
    name: "Grow",
    tagline: "Capture more revenue",
    description:
      "Every business has revenue it isn't capturing. Calls go unanswered. Leads go cold. Estimates go unfollowed. Makr builds the systems that close those gaps.",
    capabilities: [
      {
        title: "AI Receptionist",
        body: "Answers every call, qualifies the lead, books the appointment, and updates your CRM — 24/7.",
      },
      {
        title: "Missed-Call Recovery",
        body: "Automatically follows up with callers who didn't reach you before they find someone else.",
      },
      {
        title: "Web Chat & Lead Qualification",
        body: "Engages web visitors, asks the right questions, and routes qualified leads to your team.",
      },
      {
        title: "Estimate Follow-Up",
        body: "Systematic follow-up on open estimates so jobs don't slip through without a decision.",
      },
      {
        title: "Review Generation",
        body: "Automated requests at the right moment to grow your reputation and inbound pipeline.",
      },
      {
        title: "Customer Reactivation",
        body: "Re-engages past customers for repeat service, seasonal reminders, and referral requests.",
      },
    ],
  },
  {
    id: "operate",
    name: "Operate",
    tagline: "Run a more efficient business",
    description:
      "Manual administrative work costs your business time and money every week. Makr automates the repetitive work so your team focuses on what matters.",
    capabilities: [
      {
        title: "Scheduling & Dispatch Automation",
        body: "Streamlines appointment booking, technician assignment, and calendar management.",
      },
      {
        title: "Billing & Invoicing Workflows",
        body: "Automates invoice generation, follow-up on unpaid accounts, and payment reconciliation.",
      },
      {
        title: "CRM Data Automation",
        body: "Keeps your customer records complete and current without manual data entry.",
      },
      {
        title: "Document Processing",
        body: "Extracts, routes, and files information from forms, contracts, and work orders.",
      },
      {
        title: "Back-Office Reporting",
        body: "Automated performance reporting so you see what's working without building dashboards manually.",
      },
      {
        title: "Knowledge Assistant",
        body: "Gives your team instant access to processes, pricing, and information — reducing internal back-and-forth.",
      },
    ],
  },
  {
    id: "enable",
    name: "Enable",
    tagline: "Build AI into your team",
    description:
      "Tools don't create results — adoption does. Makr works alongside your team to make sure AI becomes part of how your business actually runs.",
    capabilities: [
      {
        title: "AI Readiness Assessment",
        body: "Identifies where AI creates the most value for your specific business and team.",
      },
      {
        title: "Team Training & Adoption",
        body: "Practical workshops that teach your team how to use AI tools effectively in their day-to-day work.",
      },
      {
        title: "Prompt Frameworks",
        body: "Custom AI prompts for your workflows — proposals, client communications, internal documentation.",
      },
      {
        title: "Tool Selection & Integration",
        body: "Evaluates and integrates the right AI tools for your business — not whatever's trending.",
      },
      {
        title: "Ongoing Optimization",
        body: "Continuous improvement of AI systems as your business grows and needs change.",
      },
      {
        title: "Quarterly Performance Reviews",
        body: "Regular reviews connecting AI activity to business outcomes — revenue, efficiency, team productivity.",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Nav />

      {/* Header */}
      <section className="bg-white pt-24 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700 mb-4">Solutions</p>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            One platform. Three ways to grow.
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Every Makr engagement draws from three capability pillars. Most clients use all three — the mix
            depends on where your biggest opportunities are.
          </p>
        </div>

        {/* Anchor nav */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {PILLARS.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="bg-green-50 border border-green-200 text-green-800 px-5 py-2 rounded-full font-semibold hover:bg-green-100 transition text-sm"
            >
              {p.name} — {p.tagline}
            </a>
          ))}
        </div>
      </section>

      {/* Pillar sections */}
      {PILLARS.map((pillar, i) => (
        <section
          key={pillar.id}
          id={pillar.id}
          className={`py-20 px-6 ${i % 2 === 0 ? "bg-stone-100" : "bg-white"}`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <div className="inline-block bg-green-700 text-white text-sm font-semibold uppercase tracking-widest px-4 py-1 rounded-full mb-4">
                {pillar.name}
              </div>
              <h2 className="text-3xl font-bold text-stone-900 mb-4">{pillar.tagline}</h2>
              <p className="text-stone-600 text-lg max-w-2xl">{pillar.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillar.capabilities.map((cap) => (
                <div key={cap.title} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-stone-900 mb-2">{cap.title}</h3>
                  <p className="text-stone-600 text-sm">{cap.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 px-6 bg-green-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Not sure where to start?</h2>
          <p className="text-green-200 mb-8">
            An AI Opportunity Audit maps your business, identifies the highest-value opportunities, and
            gives you a clear roadmap — before you commit to anything.
          </p>
          <Link
            href="/pricing"
            className="bg-white text-green-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition inline-block"
          >
            See engagement options &amp; pricing →
          </Link>
        </div>
      </section>
    </div>
  );
}
