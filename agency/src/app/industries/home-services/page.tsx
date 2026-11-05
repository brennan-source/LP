import type { Metadata } from "next";
import IndustryDetail from "@/components/IndustryDetail";

// Copy: Content/08-page-industries-home-services-refresh.md (approved draft, Nov 2026).
export const metadata: Metadata = {
  title: "Home Services — Fast Replies & Estimate Follow-Up for Contractors",
  description:
    "Makr helps plumbing, heating, HVAC and electrical shops answer every call and web request fast and follow up on every estimate. Prices published.",
  alternates: { canonical: "/industries/home-services" },
};

const SEGMENTS = [
  { name: "Plumbing & Heating", problem: "A no-heat or leak call can't wait. If the call hits voicemail, the homeowner keeps dialing.", capabilities: ["Missed-call text back with an urgent option", "After-hours replies that say when you'll call", "Estimate follow-up on boilers and water heaters"] },
  { name: "HVAC", problem: "Peak season fills the phone while every tech is in the field, and big install quotes take weeks to decide.", capabilities: ["Fast replies to calls and web requests", "Heat pump and system quote follow-up", "Seasonal tune-up reminders to past customers"] },
  { name: "Electrical", problem: "Service calls and panel or EV-charger quotes come in while you're on a job, and open quotes pile up.", capabilities: ["Overflow call capture by text", "Quote follow-up until a decision", "Review requests after inspections pass"] },
  { name: "Roofing", problem: "Storm weeks bring a flood of calls at once. Booking estimates quickly, and following up after, takes office time you don't have.", capabilities: ["High-volume inquiry replies", "Estimate scheduling and reminders", "Follow-up on open roofing quotes"] },
  { name: "Restoration", problem: "Water and fire calls are urgent, and customers need to know someone is on the way.", capabilities: ["Immediate reply to every call and request", "Job status messages", "Photos and job details organized for the file"] },
  { name: "Landscaping & Pest Control", problem: "Recurring customers drift away when nobody reminds them, and seasonal quotes go quiet.", capabilities: ["Renewal and seasonal reminders", "Past-customer reactivation", "Seasonal quote follow-up"] },
];

const FAQS = [
  { q: "I already have Jobber (or Housecall Pro, or ServiceTitan). Do I need this?", a: "Maybe not all of it. We check what your software already does in the Business Growth Assessment, set up what you have and only add what's missing, such as estimate follow-up and review requests that actually go out." },
  { q: "I don't want a robot texting my customers.", a: "You approve every message before it goes live, and it's written to sound like your shop. When a customer replies, your team takes it from there." },
  { q: "I don't have time to set this up.", a: "Setup needs a short kickoff and a review of the message wording. After that, the Monday report is a one-page read with no logins." },
  { q: "It's heating season and we're slammed.", a: "That's when calls get missed. Book the 20-minute review now; if January is better for setup, we'll schedule it then." },
  { q: "What if I'm locked into a contract with another vendor?", a: "Our prices are on the website, and after the 3-month minimum it's month-to-month. See our [switching checklist](/switching) for how to get your domain, Google profile, phone numbers and data back." },
];

export default function HomeServicesPage() {
  return (
    <IndustryDetail
      id="home-services"
      reportKey="plumbing"
      name="Home Services"
      kicker="By tonight, they may have hired someone else."
      headline="Be the shop that calls back first."
      intro="Every call, text and web request gets a fast reply, even when you're on a job, and every open estimate gets followed up until the customer says yes or no. We set it up inside the phone and software you already use, run it for you and send a one-page report every Monday."
      segments={SEGMENTS}
      applications={[
        ["Service and town pages with click-to-call on every one", "A quote request that works on a phone in under a minute", "Site updates handled, so it stays current"],
        ["Google Business Profile kept complete and active", "Service-area pages for the towns you actually cover", "Seasonal content: heating tune-ups, heat pumps, storm prep"],
        ["Missed-call text back, day and night", "Estimate follow-up until a yes or a no", "Review requests after every completed job"],
        ["Job details captured before the callback", "Web requests sent to dispatch without re-typing", "A weekly list of open estimates and where each stands"],
      ]}
      howWeWork={{
        title: "We use the software you already have",
        body: "Already on Jobber, Housecall Pro or ServiceTitan? Good. In the Business Growth Assessment we check what your software already covers. If it handles something, we set it up properly and don't charge you to rebuild it. What usually isn't covered is estimate follow-up, review requests going out on time and someone watching it every week. Related guides: [estimate follow-up for contractors](/insights/contractor-estimate-follow-up) and [missed-call text back](/insights/missed-call-text-back-contractors).",
      }}
      offer={{
        eyebrow: "Where most shops start",
        title: "Lead Follow-Up & Revenue Recovery",
        price: "$1,500 setup · $999/month",
        body: "Missed-call text back, instant replies to web requests, estimate follow-up, review requests and past-customer reactivation. You approve every message first, and it sounds like your shop. A one-page report every Monday. No logins.",
        terms: "3-month minimum, then month-to-month; cancel with 30 days' written notice. Once a build fee is paid in full, you own your website, plus your domain, Google Business Profile, content and data. [See all pricing](/pricing) · [Switching from another vendor?](/switching)",
        promise: "We don't promise more leads, more booked jobs or a set number of reviews. We make sure every call, request and estimate gets a fast, consistent follow-up, and we show you what happened every Monday.",
      }}
      faqs={FAQS}
      ctaTitle="Find out what a customer sees when they call you after hours."
      ctaBody="Book a free, 20-minute Business Growth Assessment. We'll look at how customers find you, what happens when they call or fill out your form, and where estimates go quiet. We'll do a walk-through on the call using your own phone and inbox records."
    />
  );
}
