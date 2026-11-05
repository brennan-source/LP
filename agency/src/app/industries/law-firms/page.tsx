import type { Metadata } from "next";
import IndustryDetail from "@/components/IndustryDetail";

// Copy: Content/07-page-industries-law-firms.md (approved draft, Nov 2026).
export const metadata: Metadata = {
  title: "Law Firms — Inquiry Response, Intake & Websites for Small Firms",
  description:
    "Makr helps small law firms answer every inquiry promptly, book consultations and keep routine intake off partners' desks. Prices published. New England.",
  alternates: { canonical: "/industries/law-firms" },
};

const SEGMENTS = [
  { name: "Estate Planning & Probate", problem: "Families reach out at hard moments and often after hours. A slow or impersonal reply sends them to the next firm on the list.", capabilities: ["Calm, prompt acknowledgment of every inquiry", "Consultation booking with reminders", "Intake questions filed into your system"] },
  { name: "Business & Corporate", problem: "Owners expect the responsiveness they get from their other advisors. Inquiries that sit in a shared inbox look like a firm that's too busy.", capabilities: ["Same-day replies with a booking link", "Routing by matter type to the right attorney", "Follow-up when a prospect goes quiet"] },
  { name: "Real Estate", problem: "Closings run on deadlines, and buyers, sellers and lenders want to know someone has the file.", capabilities: ["Fast first response to new matters", "Document collection reminders", "Status updates drafted for attorney review"] },
  { name: "Family Law", problem: "Prospective clients are often stressed and comparing several firms. Tone and timing of the first reply both matter.", capabilities: ["Carefully worded, approved first replies", "Minimal intake that avoids oversharing before a consult", "Consultation reminders"] },
  { name: "Employment Law", problem: "Inquiries vary widely in fit. Screening them by hand takes attorney time every week.", capabilities: ["Structured intake questions the firm defines", "Routing and fit flags for attorney review", "Polite closing replies for matters you don't take"] },
];

const FAQS = [
  { q: "Will automated replies give legal advice?", a: "No. They acknowledge the inquiry, explain next steps, offer consultation times and collect only what your firm specifies. Your firm approves every template before it goes live." },
  { q: "We already use Clio or MyCase. Do we need new software?", a: "Usually not. We set up and run what you have, and connect it to your website and contact form so nothing sits in a shared inbox." },
  { q: "Most of our work comes from referrals. Why does this matter?", a: "Referrals still have to reach you. This is about what happens after the referral calls: whether someone answers and how quickly they hear back." },
  { q: "Do you guarantee more consultations or new matters?", a: "No. We make sure every inquiry gets a prompt, professional answer and a clear path to a consultation, and we report plainly every Monday on what happened." },
  { q: "Where do you work?", a: "Makr is based in Westford, Massachusetts, and works with firms across Massachusetts, southern New Hampshire and the rest of New England." },
];

export default function LawFirmsPage() {
  return (
    <IndustryDetail
      id="law-firms"
      reportKey="law"
      name="Law Firms"
      headline="Every inquiry answered. Intake off the partners' desks."
      intro="Makr helps 2–20 lawyer firms across Massachusetts and southern New Hampshire give every prospective client a prompt, professional reply and a clear path to a consultation, using wording your firm approves and the systems you already use."
      segments={SEGMENTS}
      applications={[
        ["Practice-area pages that explain what you do and who you help", "A consultation request that takes a minute, with booking", "A site your team can keep current without calling a developer"],
        ["Practice-area FAQs written so Google and AI tools can understand them", "Google Business Profile kept accurate for each office", "Expertise articles and a steady LinkedIn presence for partners"],
        ["A prompt, approved reply to every web, email and after-hours inquiry", "Consultation booking and reminders", "A polite check-in when a prospect doesn't book"],
        ["Structured intake that collects only what your conflict check needs", "Inquiries routed to the right attorney by practice area", "Intake answers filed into Clio, MyCase or your current system"],
      ]}
      evidence={{
        eyebrow: "What the research shows",
        line: "In Clio's 2024 secret-shopper study of 500 U.S. law firms, 40% answered the phone and 33% responded to an email.",
        source: "Source: Clio Legal Trends Report 2024, as summarized by [2Civility](https://www.2civility.org/2024-clio-legal-trends-report-fixing-the-first-impression-problem-for-law-firms/). Clio is a software vendor; the study used outside secret shoppers.",
      }}
      howWeWork={{
        title: "How we handle intake for law firms",
        items: [
          { title: "Your wording, approved first.", body: "Every message a prospective client receives is approved by your firm before it goes live." },
          { title: "No legal advice.", body: "Automated replies acknowledge, schedule, remind and collect. They never assess a matter or suggest what someone should do." },
          { title: "Only what you need.", body: "Intake collects contact details and what your firm specifies for a conflict check, and asks people not to send confidential details before a consultation." },
          { title: "A person picks up every reply.", body: "When a prospective client responds, your team takes it from there." },
          { title: "Your firm decides what's compliant.", body: "We follow your direction on professional-conduct rules and don't give ethics opinions." },
        ],
      }}
      offer={{
        eyebrow: "Where most firms start",
        title: "Lead Follow-Up & Revenue Recovery",
        price: "$1,500 setup · $999/month",
        body: "A prompt, approved reply to every inquiry, consultation booking and reminders, follow-up when a prospect doesn't book, and review requests where your firm wants them. A one-page report every Monday on what came in and what happened to it. No logins.",
        next: "Many firms add structured intake and routing next (AI Workflow Automation, from $3,000 per workflow). Read more about [what intake can be automated](/insights/law-firm-intake-automation) and [how fast to respond to a new inquiry](/insights/law-firm-response-time).",
        terms: "3-month minimum, then month-to-month; cancel with 30 days' written notice. Once a build fee is paid in full, you own your website, plus your domain, Google Business Profile, content and data. [See all pricing](/pricing)",
      }}
      faqs={FAQS}
      ctaTitle="Find out what a prospective client experiences when they contact your firm."
      ctaBody="Book a free, 20-minute Business Growth Assessment focused on intake. We'll look at how inquiries arrive, how fast they're answered and where partner time goes, and give you a recommended order of fixes whether or not you hire us."
    />
  );
}
