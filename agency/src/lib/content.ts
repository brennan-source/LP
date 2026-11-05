// Shared marketing copy: solutions, industries, problems and process.
// Used by the homepage, /solutions, /industries and /how-it-works so the
// four offers and five markets read the same everywhere.

export type Solution = {
  id: string;
  number: string;
  name: string; // page title on /solutions
  headline: string; // short card title on the homepage
  summary: string;
  outcome: string;
  includes: { title: string; body: string }[];
  goodFit: string[];
  byIndustry?: { industry: string; focus: string }[]; // where the emphasis shifts by market
  priceLine: string; // short summary; full detail lives on /pricing
};

export const SOLUTIONS: Solution[] = [
  {
    id: "websites",
    priceLine: "$2,000–$4,000 build · $299/month",
    number: "01",
    name: "Website Development & Management",
    headline: "Websites that work harder",
    summary:
      "Fast, credible and conversion-focused websites, plus the hosting, updates and ongoing management that keep them working.",
    outcome: "More of the people who find you become inquiries, calls and booked conversations.",
    includes: [
      { title: "Design & development", body: "A site that explains what you do, who you serve and why to call you — built to load fast and work on every phone." },
      { title: "Landing pages", body: "Focused pages for a service, a location, an event or a campaign, each with one clear next step." },
      { title: "Conversion improvements", body: "Clearer calls to action, shorter forms, click-to-call and booking where they help visitors take the next step." },
      { title: "Integrations", body: "Forms and booking connected to your inbox, calendar or CRM so inquiries land where your team already works." },
      { title: "Hosting & maintenance", body: "Hosting, updates, backups, security and monitoring handled for you, so the site keeps working after launch." },
      { title: "Ongoing management", body: "Content changes made when you need them, plus regular reviews of what visitors do and small changes that make it easier to reach you." },
    ],
    goodFit: [
      "Your website is dated, slow or hard to update",
      "Visitors arrive but rarely call or fill out a form",
      "Nobody on your team has time to keep the site current",
    ],
  },
  {
    id: "search-content",
    priceLine: "$1,500 setup · $999/month",
    number: "02",
    name: "Search Visibility & Content Marketing",
    headline: "Get found on Google and in AI answers",
    summary:
      "SEO, answer engine optimization (AEO), generative engine optimization (GEO) and industry-specific content and digital marketing — so the right customers find you wherever they search.",
    outcome: "You show up when buyers search Google, check the map, or ask an AI assistant who to call.",
    includes: [
      { title: "Local & technical SEO", body: "Site structure, speed, metadata and schema fixed so search engines can read your pages, plus service and location pages built around what customers actually search." },
      { title: "Google Business Profile & listings", body: "Your profile, categories, photos, posts and directory listings kept accurate and consistent — including the industry directories that matter in your market." },
      { title: "Answer engine optimization (AEO)", body: "Clear, direct answers to the questions customers ask, structured so Google's featured answers and voice assistants can use them." },
      { title: "Generative engine optimization (GEO)", body: "Content, citations and structured data that help AI tools like ChatGPT, Perplexity and Google's AI Overviews understand your business and mention it." },
      { title: "Industry content", body: "Service pages, FAQs, project write-ups, capability pages and articles planned around your market — written for buyers first, search engines second." },
      { title: "Digital marketing", body: "Email newsletters, LinkedIn and Google posts, and paid search where it pays off, with plain monthly reporting on what's working." },
    ],
    goodFit: [
      "Competitors show up ahead of you on Google or in the map results",
      "Your business doesn't come up when people ask an AI assistant for a recommendation",
      "You know you should publish content, but nobody has time to do it",
    ],
    byIndustry: [
      { industry: "Home Services", focus: "Google Business Profile, map results and reviews, service-area pages and seasonal content." },
      { industry: "Professional Services", focus: "Expertise articles and FAQs, LinkedIn presence and being cited when prospects ask AI for a recommended firm." },
      { industry: "Personal Services", focus: "Map results and reviews, booking-ready service pages and local content that answers new-client questions." },
      { industry: "Manufacturing", focus: "Capability and specification pages that engineers and buyers search, industrial directories and technical content that leads to RFQs." },
      { industry: "B2B Services", focus: "LinkedIn and email, comparison and case pages, and content that keeps you in front of buyers through longer sales cycles." },
    ],
  },
  {
    id: "revenue-recovery",
    priceLine: "$1,500 setup · $999/month",
    number: "03",
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
    priceLine: "From $3,000 per workflow · $499/month optional support",
    number: "04",
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
  more?: { href: string; label: string }[]; // extra deeper pages within the market
};

export const INDUSTRIES: Industry[] = [
  {
    id: "home-services",
    number: "01",
    name: "Home Services",
    line: "Convert local demand and follow up on every inquiry.",
    description:
      "When a homeowner calls, the shop that answers or texts back first gets the first conversation. We help contractors answer faster, follow up on every estimate and keep past customers coming back.",
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
    more: [{ href: "/industries/law-firms", label: "Law firms" }],
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
  { title: "Customers who can't find you", body: "Buyers search Google, check the map or ask an AI assistant — and find a competitor first." },
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
    body: "We start with a short Business Growth Assessment: how people find you, what happens when they reach out and where your team spends time on repetitive work. No technology pitch — just a clear look at the bottlenecks.",
    output: "A short list of the clearest opportunities, in priority order.",
  },
  {
    number: "02",
    name: "Build",
    summary: "Implement the highest-value improvement — website, search, follow-up or automation.",
    body: "We pick the improvement most likely to matter first — a better website, stronger search visibility, a follow-up sequence or an automated workflow — scope it in writing and build it.",
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

// Sample weekly reports for fictional businesses, used on the homepage
// industry switcher and the industry pages. Always shown with a "Sample" label.
export type SampleReport = {
  key: string;
  tab: string;
  business: string;
  problem: string;
  items: { text: string; service: string; status: string; waiting?: boolean }[];
};

export const SAMPLE_REPORTS: SampleReport[] = [
  {
    key: "dental",
    tab: "Dental practice",
    business: "Example Dental Practice (fictional)",
    problem: "New-patient calls went to voicemail during procedures.",
    items: [
      { text: "New-patient FAQ page published and Google Business Profile hours updated", service: "Search & content", status: "Done" },
      { text: "New-patient call missed → text back with booking link in 1 min", service: "Lead follow-up", status: "Booked" },
      { text: "Recall reminders sent to patients due for cleanings", service: "Lead follow-up", status: "Sent" },
      { text: "Intake forms filled into the practice system automatically", service: "AI workflow", status: "Done" },
    ],
  },
  {
    key: "law",
    tab: "Law firm",
    business: "Example Law Group (fictional)",
    problem: "Consultation requests waited a day for a reply; intake was re-typed by hand.",
    items: [
      { text: "3 after-hours inquiries acknowledged within minutes", service: "Lead follow-up", status: "Sent" },
      { text: "Web inquiry answered with consult booking in 2 min", service: "Lead follow-up", status: "Booked" },
      { text: "Prospect who didn't book gets a day-4 check-in", service: "Lead follow-up", status: "Waiting", waiting: true },
      { text: "Intake answers organized into a new matter file", service: "AI workflow", status: "Done" },
    ],
  },
  {
    key: "plumbing",
    tab: "Plumbing",
    business: "Example Plumbing & Heating Co. (fictional)",
    problem: "After-hours calls went unanswered; estimates went quiet.",
    items: [
      { text: "Google Business Profile service areas and hours updated", service: "Search & content", status: "Done" },
      { text: "Missed 9pm call → text back, job booked for 8am", service: "Lead follow-up", status: "Booked" },
      { text: "Water-heater estimate reminder sent, day 3", service: "Lead follow-up", status: "Waiting", waiting: true },
      { text: "Job details sent to dispatch without re-typing", service: "AI workflow", status: "Done" },
    ],
  },
  {
    key: "manufacturing",
    tab: "Manufacturing",
    business: "Example Precision Machining Co. (fictional)",
    problem: "RFQs sat in a shared inbox; quotes were never followed up.",
    items: [
      { text: "Capability page for 5-axis CNC machining published", service: "Search & content", status: "Done" },
      { text: "RFQ acknowledged in 1 min and routed to estimating", service: "Lead follow-up", status: "Answered" },
      { text: "Quote #4471 reminder sent, day 3", service: "Lead follow-up", status: "Waiting", waiting: true },
      { text: "PO details read from email and entered automatically", service: "AI workflow", status: "Done" },
    ],
  },
];

// One line per owner type for the homepage band.
export const OWNER_LINES = [
  { label: "Dental & medical", body: "New patients get an answer while you're chairside, and recalls go out without front-desk chasing.", href: "/industries/personal-services", link: "For practices" },
  { label: "Law & accounting", body: "Intake runs itself, so partner hours go to billable work instead of paperwork.", href: "/industries/professional-services", link: "For firms" },
  { label: "Trades & home services", body: "Missed calls get a text back and every estimate gets followed up until it's a yes or no.", href: "/industries/home-services", link: "For trades" },
  { label: "Manufacturing & B2B", body: "Buyers find your capabilities, RFQs get answered fast and POs stop being re-typed.", href: "/manufacturing-growth-checkup", link: "For manufacturers" },
];

// Self-check questions. Each maps to the solution id that fixes it.
export const SELF_CHECK = [
  { text: "A competitor shows up before us on Google or in AI answers.", solution: "search-content", tag: "Search" },
  { text: "Our website is dated, or hard for us to update.", solution: "websites", tag: "Website" },
  { text: "Calls go to voicemail while we're with a customer.", solution: "revenue-recovery", tag: "Follow-up" },
  { text: "Quotes, estimates or proposals go out and nobody follows up.", solution: "revenue-recovery", tag: "Follow-up" },
  { text: "Someone re-types the same information into more than one system.", solution: "ai-workflows", tag: "Workflows" },
  { text: "I'm doing admin work at night or on weekends.", solution: "ai-workflows", tag: "Workflows" },
];

// The promises that answer agency skepticism.
export const PROMISES = [
  { title: "Prices on the website", body: "Fixed monthly prices, published. Builds quoted in writing before work starts." },
  { title: "One person accountable", body: "You work with the founder, not a support queue." },
  { title: "Your tools, not new ones", body: "We connect to the phone, calendar and software you already use." },
  { title: "A Monday report, no logins", body: "What changed and what's next, in plain language. No ranking promises." },
];
