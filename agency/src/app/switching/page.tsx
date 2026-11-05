import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { CtaBand, PageHeader } from "@/components/sections";
import { FaqList, Prose, faqSchema } from "@/components/Prose";

// Copy: Content/09-page-switching-from-a-locked-in-vendor.md (approved draft, Nov 2026).
// Two bullets in "If you're switching to Makr" are held back until Brennan decides them:
// whether Makr works as Manager on client accounts, and how migration work is priced.
// No competitor names anywhere on this page.
export const metadata: Metadata = {
  title: "Switching From a Locked-In Marketing Vendor: Checklist",
  description:
    "A step-by-step checklist for leaving a marketing vendor: domain, website, Google Business Profile, phone numbers, reviews and data. Do these before you cancel.",
  alternates: { canonical: "/switching" },
};

const CHECKLIST = `
## 1. Before you do anything: read your contract

Find these four answers and write them down:

- [ ] **Term and end date.** When does the current term end?
- [ ] **Auto-renewal.** Does it renew automatically, and for how long?
- [ ] **Notice.** How much notice do you need to give, in what form (email, letter, portal), and by when?
- [ ] **Ownership and handover.** What does the contract say you own (website, design, content, domain, phone numbers), and what the vendor hands over when you leave?

If the notice window is close, send written notice on time even if you're still gathering access. Missing a renewal window is usually the most expensive mistake.

*This page is general information, not legal advice. If your contract is unclear or the amounts are large, have a lawyer read it.*

## 2. The switching checklist

Work through these in order. Don't cancel any service until the step that depends on it is done.

### Domain name
- [ ] Find out which registrar holds your domain and whose name is listed as the registrant.
- [ ] If it isn't your business, ask the vendor to change the registrant to your business and your email address.
- [ ] Get your own login to the registrar account, or move the domain to an account you control.
- [ ] Ask for the transfer authorization code (also called an Auth-Code or EPP code). Under ICANN's transfer policy, your registrar must provide it within five calendar days of your request.
- [ ] Plan around the 60-day lock: a domain usually can't move to a new registrar within 60 days of a registrant change, a new registration or a previous transfer. Start early.
- [ ] Before moving anything, write down the domain's current DNS records (where the website, email and any other services point). Losing these is how email stops working during a switch.

Source: [ICANN, Transferring Your Domain Name](https://www.icann.org/resources/pages/name-holder-faqs-2017-10-10-en)

### Website and hosting
- [ ] Find out who pays for hosting and whose account the site lives in.
- [ ] Ask for a complete copy of the site: files, database, images and any forms.
- [ ] If the site runs on the vendor's own platform, ask what you can take (often text and photos, not the design). Save every page's text and images either way.
- [ ] Make a list of every page address so the new site can redirect old addresses and you don't lose links people have saved or search engines already know.
- [ ] Keep the old site live until the new one is ready and the domain points to it.

### Google Business Profile
- [ ] Sign in and check the list of people with access. Your business should be the **Owner**; vendors should be **Managers**.
- [ ] If the vendor is the owner, ask them to transfer ownership to you.
- [ ] If they won't, request ownership through Google. The current owner has three days to respond; if they don't, you may be able to claim the profile, though Google says that option isn't always available.
- [ ] Once you're the owner, remove access for anyone who no longer needs it.
- [ ] Check the phone number and website listed on the profile. If either belongs to the vendor (for example a tracking number), plan to update it.

Source: [Google Business Profile Help, Request ownership](https://support.google.com/business/answer/4566671?hl=en)

### Phone numbers
- [ ] List every number customers might call: your main line, numbers on your website, Google profile, ads, vehicles and printed materials.
- [ ] Mark which numbers are in your name and which are in the vendor's account (call-tracking numbers often are).
- [ ] For numbers you want to keep, start the port with your **new** provider. Don't cancel the old service first.
- [ ] Know your rights: the FCC says your old provider can't refuse to port your number because you owe a balance or a termination fee (you may still owe the amount).
- [ ] For tracking numbers you can't port, update every listing to your main number before the vendor turns them off.
- [ ] If you text customers from a number, confirm the new setup can text from it too.

Source: [FCC, Keeping Your Phone Number When Changing Service Providers](https://www.fcc.gov/guides/portability-keeping-your-phone-number-when-changing-service-providers)

### Reviews and review platforms
- [ ] Reviews on your **Google Business Profile** belong to the profile, not the vendor. If you control the profile, they stay.
- [ ] Reviews collected **inside a vendor's own platform or website widget** may not move with you. Export or save them (with dates and names as shown) before you cancel.
- [ ] Find every review-request link the vendor set up (in texts, emails, invoices, receipts) and replace it with your own Google review link.
- [ ] Turn off any automated review requests the old platform still sends, so customers don't get duplicates.
- [ ] Check other listing sites (Yelp, Facebook, industry directories) for accounts the vendor manages, and get owner access.

### Data export
Export everything you can, in a format you can open (CSV or spreadsheet is best):

- [ ] Customer and contact lists
- [ ] Leads and web form submissions
- [ ] Text message and email history with customers
- [ ] Estimates, quotes and job history, if stored in the vendor's system
- [ ] Email marketing lists, with unsubscribe status (you'll need to keep honoring opt-outs)
- [ ] Call recordings and call logs, if you want them
- [ ] Photos, videos and written content created for you

### Analytics, ads and other accounts
- [ ] **Google Analytics:** make sure your business is an administrator on the property, not just a viewer.
- [ ] **Google Search Console:** add yourself as an owner.
- [ ] **Ad accounts (Google, Meta):** confirm they're in your business's name with your billing, not inside the vendor's account. Ad history often can't move if it isn't.
- [ ] **Social media pages:** confirm you're an admin on every page.
- [ ] **Business email:** if your email runs through the domain, confirm who hosts it and that it won't stop when other services end.

### Then give notice
- [ ] Send written notice the way your contract requires, and keep a copy.
- [ ] Ask the vendor to confirm the end date and the date each service stops.
- [ ] After the switch, change the passwords on every account the vendor had access to.
`;

const MAKR = `
## 3. If you're switching to Makr

- **We go through this checklist with you** in the Business Growth Assessment, so you know what you own today and what to ask for before you give notice.
- **We don't touch anything until you have access.** The order matters: access first, notice second, move third.
- **We set things up so you stay in control.** Your domain, Google Business Profile, content and data are yours.

## 4. Our terms, in writing

- Prices are on our [pricing page](/pricing). Builds are quoted within the published range and locked in writing before work starts.
- Monthly services have a **3-month minimum, then run month-to-month**. After the minimum, cancel with **30 days' written notice**.
- **Once your build fee is paid in full, you own your website**, plus your **domain, Google Business Profile, content and data**.
- One person is accountable for your work: Brennan Burks, Makr's founder, based in Westford, Massachusetts. [More about Makr](/about).

Related: [Who owns your website when you leave your marketing company?](/insights/who-owns-your-website) · For [home services](/industries/home-services) · For [law firms](/industries/law-firms)
`;

const FAQS = [
  { q: "Should I cancel my old marketing contract before switching?", a: "No. Get owner access to your domain, Google Business Profile, analytics and phone numbers, and export your data, before you give notice. Then give notice the way your contract requires, on time." },
  { q: "Will I lose my Google reviews if I leave my marketing company?", a: "Reviews on your Google Business Profile stay with the profile, so you keep them as long as you control it. Reviews collected inside a vendor's own platform or website widget may not transfer, so save them before you cancel." },
  { q: "Can my old provider refuse to port my business phone number?", a: "According to the FCC, your old provider can't refuse to port your number because you owe a balance or a termination fee. Start the port with your new provider and keep the old service active until it's complete." },
  { q: "How long does it take to transfer a domain?", a: "Your registrar must give you the transfer code within five calendar days of your request under ICANN's policy, and the transfer itself usually follows within days. If the registrant name was recently changed, the domain may be locked for 60 days, so start early." },
  { q: "Does Makr help with the switch?", a: "Yes. We go through this checklist with you in a free Business Growth Assessment so you know what you own and what to ask for before you give notice." },
];

export default function SwitchingPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />
      <JsonLd data={faqSchema(FAQS)} />

      <PageHeader
        eyebrow="Switching vendors"
        title="Switching from a locked-in vendor"
        intro="Before you cancel any marketing contract, make sure your business is the owner of your domain, Google Business Profile, phone numbers and analytics, and export your customer data. Get access first, give notice second. The checklist below walks through each step in the order that keeps your website, calls and reviews working."
      >
        <div className="mt-8 flex flex-wrap gap-3.5">
          <Link href="/contact" data-cta="switching-hero" className="bg-green-700 hover:bg-green-800 text-white px-6 py-3.5 rounded-md font-bold transition-colors">
            Get Your Free Assessment
          </Link>
          <Link href="/pricing" className="bg-white border border-brass-light hover:border-brass text-ink px-6 py-3.5 rounded-md font-semibold transition-colors">
            See pricing
          </Link>
        </div>
      </PageHeader>

      <main className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Prose source={CHECKLIST} />
        </div>
      </main>

      <section className="py-16 px-6 bg-white border-y border-brass-light">
        <div className="max-w-3xl mx-auto">
          <Prose source={MAKR} />
        </div>
      </section>

      <section className="py-20 px-6 bg-canvas">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow mb-3">Questions</p>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-ink leading-[0.95] mb-10">Frequently asked</h2>
          <FaqList faqs={FAQS} />
        </div>
      </section>

      <CtaBand
        name="switching-bottom"
        title="Not sure what you own right now?"
        body="Book a free, 20-minute Business Growth Assessment. We'll go through your accounts with you and give you a clear list of what to secure before you make any change, whether or not you hire us."
        cta="Get Your Free Assessment"
      />
      <Footer />
    </div>
  );
}
