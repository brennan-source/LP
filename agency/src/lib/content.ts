// Shared marketing copy: solutions, industries, problems and process.
// Used by the homepage, /solutions, /industries and /how-it-works so the
// three offers and five markets read the same everywhere.

export type Solution = {
  id: string;
  number: string;
  name: string; // page title on /solutions
  headline: string; // short card title on the homepage
  summary: string;
  outcome: string;
  includes: { title: string; body: string }[];
  goodFit: string[];
};

export const SOLUTIONS: Solution[] = [
  {
    id: "websites",
    number: "01",
    name: "Website Development & Care",
    headline: "Websites that work harder",
    summary:
      "Fast, credible and conversion-focused websites supported by reliable maintenance and continuous improvement.",
    outcome: "More of the people who find you become inquiries, calls and booked conversations.",
    includes: [
      { title: "Design & development", body: "A site that explains what you do, who you serve and why to call you — built to load fast and work on every phone." },
      { title: "Landing pages", body: "Focused pages for a service, a location, an event or a campaign, each with one clear next step." },
      { title: "Conversion improvements", body: "Clearer calls to action, shorter forms, click-to-call and booking where they help visitors take the next step." },
      { title: "Integrations", body: "Forms and booking connected to your inbox, calendar or CRM so inquiries land where your team already works." },
      { title: "Maintenance & care", body: "Updates, backups, content changes and monitoring so the site keeps working after launch." },
      { title: "Continuous improvement", body: "Regular reviews of what visitors do on the site and small changes that make it easier to reach you." },
    ],
    goodFit: [
      "Your website is dated, slow or hard to update",
      "Visitors arrive but rarely call or fill out a form",
      "You need a page for a specific service, location or campaign",
    ],
  },
  {
    id: "revenue-recovery",
    number: "02",
    name: "Lead Follow-Up & Revenue Recovery",
    headline: "Revenue recovery that follows through",
    summary:
      "Automated responses, reminders and reactivation campaigns that help you recover opportunities already entering your business.",
    outcome: "Fewer inquiries, estimates and past customers slip away because nobody followed up.",
    includes: [
      { title: "Missed-call recovery", body: "An immediate text back when a call goes unanswered, so the caller hears from you before they try someone else." },
      { title: "Instant inquiry response", body: "Web and email inquiries get a prompt, personal-sounding reply and a way to book." },
      { title: "Estimate & proposal follow-up", body: "A consistent sequence of reminders on open quotes until the customer says yes or no." },
      { title: "Appointment reminders", body: "Confirmations and reminders that reduce no-shows and last-minute surprises." },
      { title: "Reactivation campaigns", body: "Timely outreach to past customers and old contacts who are due for service or a follow-up conversation." },
      { title: "Review requests", body: "A request sent at the right moment after good work, so satisfied customers are easy to hear from." },
    ],
    goodFit: [
      "Calls and inquiries sometimes go unanswered",
      "Follow-up depends on whoever remembers to do it",
      "You have a list of past customers or quotes that nobody revisits",
    ],
  },
  {
    id: "ai-workflows",
    number: "03",
    name: "AI Workflow Automation",
    headline: "AI workflows that remove busywork",
    summary:
      "Practical automations for intake, routing, communication, documents and reporting — designed around your team and existing tools.",
    outcome: "Your team spends less time on copying, sorting and chasing, and more time on the work only they can do.",
    includes: [
      { title: "Intake & routing", body: "New requests are read, sorted and sent to the right person with the details they need." },
      { title: "Quoting support", body: "Information gathered and organized up front so quotes and RFQ responses go out faster." },
      { title: "Document processing", body: "Key details pulled from forms, emails, purchase orders and PDFs into the systems you use." },
      { title: "Customer communication", body: "Drafted updates, answers and status messages that your team reviews and sends." },
      { title: "Internal reporting", body: "Regular summaries of leads, jobs and workload without someone building a spreadsheet each week." },
      { title: "Tool-to-tool handoffs", body: "Fewer manual re-entries between your inbox, spreadsheets, CRM and accounting tools." },
    ],
    goodFit: [
      "Work lives in spreadsheets, inboxes and manual handoffs",
      "The same information gets typed into more than one system",
      "Your team wants help without hiring a technical staff",
    ],
  },
];

export type Industry = {
  id: string;
  number: string;
  name: string;
  line: string;
  description: string;
  examples: string[];
  workflows: string[];
  href?: string; // deeper page, when one exists
};

export const INDUSTRIES: Industry[] = [
  {
    id: "home-services",
    number: "01",
    name: "Home Services",
    line: "Convert local demand and follow up on every inquiry.",
    description:
      "When a homeowner calls, the first business to respond usually gets the job. We help contractors answer faster, follow up on every estimate and keep past customers coming back.",
    examples: ["HVAC", "Plumbing", "Roofing", "Electrical", "Restoration", "Landscaping", "Pest Control"],
    workflows: ["Missed-call text back", "Estimate follow-up", "Seasonal maintenance reminders", "Review requests after completed jobs"],
    href: "/industries/home-services",
  },
  {
    id: "professional-services",
    number: "02",
    name: "Professional Services",
    line: "Streamline intake, nurture prospects and improve client communication.",
    description:
      "Firms win on responsiveness and trust. We help you turn inquiries into consultations, collect what you need from clients without chasing, and keep prospects warm until they are ready.",
    examples: ["Accounting & Tax", "Legal", "Consulting", "Engineering", "Architecture", "Financial Advisory"],
    workflows: ["Inquiry intake and routing", "Consultation booking", "Prospect nurture", "Document collection reminders"],
    href: "/industries/professional-services",
  },
  {
    id: "personal-services",
    number: "03",
    name: "Personal Services",
    line: "Increase bookings, reduce no-shows and reactivate past customers.",
    description:
      "Appointment-driven businesses live on a full calendar. We help you make booking easy, remind clients before they forget and bring back the ones who have drifted away.",
    examples: ["Dental", "Veterinary", "Med Spa", "Wellness", "Fitness", "Beauty", "Senior Services"],
    workflows: ["Online booking and reminders", "No-show follow-up", "Lapsed-client reactivation", "Review requests"],
    href: "/industries/personal-services",
  },
  {
    id: "manufacturing",
    number: "04",
    name: "Manufacturing",
    line: "Improve inquiry handling, RFQ coordination, distributor communication and administrative workflows.",
    description:
      "Your production process is disciplined; your growth process should be too. We help manufacturers respond to inquiries and RFQs faster, keep quotes moving and cut the administrative work around orders.",
    examples: ["Contract Manufacturing", "Machine Shops", "Fabrication", "Industrial Products", "Component Suppliers"],
    workflows: ["RFQ intake and routing", "Quote follow-up", "Distributor and rep communication", "PO and document processing"],
    href: "/manufacturing-growth-checkup",
  },
  {
    id: "b2b-services",
    number: "05",
    name: "B2B Services",
    line: "Shorten response times and build a more consistent sales process.",
    description:
      "When you sell to other businesses, a slow reply or a forgotten proposal costs real revenue. We help you respond quickly, follow up consistently and see your pipeline without building reports by hand.",
    examples: ["IT & Managed Services", "Staffing", "Marketing Agencies", "Commercial Cleaning", "Facilities Services", "Logistics"],
    workflows: ["Fast first response to new leads", "Discovery call booking", "Proposal follow-up", "Pipeline reporting"],
  },
];

export const PROBLEMS = [
  { title: "Visitors who never become leads", body: "People find your website, can't quickly tell what to do next and leave without calling or filling out a form." },
  { title: "Calls and inquiries with no follow-up", body: "A missed call or an unanswered form is often a customer who hired someone else." },
  { title: "Estimates and proposals that go cold", body: "Quotes go out, nobody follows up and work that was close to closing quietly disappears." },
  { title: "Repetitive work consuming staff time", body: "Data entry, copying information between tools and chasing paperwork take hours every week." },
  { title: "Information trapped across disconnected tools", body: "Inboxes, spreadsheets and software that don't talk to each other slow down every handoff." },
];

export const PROCESS = [
  {
    number: "01",
    name: "Diagnose",
    summary: "Identify where leads, time or information are being lost.",
    body: "We start with a short Growth Gap Review: how people find you, what happens when they reach out and where your team spends time on repetitive work. No technology pitch — just a clear look at the bottlenecks.",
    output: "A short list of the clearest opportunities, in priority order.",
  },
  {
    number: "02",
    name: "Build",
    summary: "Implement the highest-value website or automation improvement.",
    body: "We pick the improvement most likely to matter first — a better website, a follow-up sequence or an automated workflow — scope it in writing and build it.",
    output: "A working improvement, tested with your team before it goes live.",
  },
  {
    number: "03",
    name: "Connect",
    summary: "Integrate the workflow with the tools the business already uses.",
    body: "New systems should fit how your business already runs. We connect them to your inbox, calendar, phone, CRM or spreadsheets wherever that is possible, and show your team how it works.",
    output: "One connected process instead of another disconnected tool.",
  },
  {
    number: "04",
    name: "Improve",
    summary: "Monitor results and refine the system over time.",
    body: "After launch we watch what happens, fix what isn't working and decide together what to improve next. Support continues after the build.",
    output: "Regular check-ins and a running list of next improvements.",
  },
];
