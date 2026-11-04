// Articles for /insights. Copy is from the approved drafts in Makr's Content folder
// (01–06, November 2026). Bodies use the Markdown subset rendered by components/Prose.tsx.
// Every statistic names its source in the article and in its source list.

export type Article = {
  slug: string;
  title: string; // H1
  titleTag: string; // <title>, before the " | Makr" template
  description: string;
  market: "Home services" | "Law firms" | "All owners";
  lead: string; // the answer-first opening paragraph
  body: string;
  faqs: { q: string; a: string }[];
  cta: { title: string; body: string };
  sources: { label: string; url?: string; usedFor: string }[];
  sourceNote?: string;
  related: { href: string; label: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "who-owns-your-website",
    title: "Who owns your website when you leave your marketing company?",
    titleTag: "Who Owns Your Website When You Leave an Agency?",
    description: "Your domain, Google Business Profile, content and data should be yours. Here's how to check whose name is on each and get it back before you cancel.",
    market: "All owners",
    lead: "You should own your domain, your Google Business Profile, your content and your customer data outright, and your website once you've paid for it. Whether you actually do depends on whose name is on each account and what your contract says. Check both before you cancel, not after.",
    body: `## Why owners get caught out

Most owners don't think about this until they want to leave. A vendor set everything up years ago, it worked, and nobody looked at whose login was on what.

Then the contract comes up for renewal, or the results stop showing up, and the owner finds out the domain is registered to the agency, the website lives on the agency's own platform, and the Google profile has an agency employee listed as the owner. Our research on New England owners and national marketing vendors found the same complaint themes again and again: auto-renewing contracts, long terms that are hard to exit, and vendors who keep the website after cancellation.

None of that is hard to prevent. It just has to be checked early.

## The six things to check, one at a time

"My website" is really several separate things. Each one has its own owner and its own way out.

1. **Your domain name** (yourcompany.com). This is the address. Whoever is listed as the registrant controls it.
2. **The website itself.** The design, the pages and the files, plus the hosting account it runs on.
3. **Your Google Business Profile.** The listing that shows up in Google Maps with your hours, photos and reviews.
4. **Your phone numbers.** Your main line, plus any tracking numbers a vendor set up to measure calls.
5. **Your content and data.** Page copy, photos, blog posts, form submissions, customer lists, message history and analytics.
6. **Review and messaging platforms.** Any outside tool that collects reviews or sends texts on your behalf.

## How to check who owns each one today

**Domain.** Ask your vendor which registrar holds the domain and whose name is listed as the registrant. It should be your business, with your email address on file. If it's the agency's name, ask for it to be changed now, while things are friendly.

**Website and hosting.** Ask two questions: who pays the hosting bill, and can you get a full copy of the site files? If the site is built on the vendor's own platform, you may be able to take the text and photos but not the design or the code. Find out which before you need to know.

**Google Business Profile.** Sign in to Google Business Profile and look at the list of people with access. You want your business listed as the **Owner**. Agencies should be **Managers**, which lets them do the work without controlling the listing.

**Phone numbers.** Ask whether any number customers call (including tracking numbers on your website or ads) is in the vendor's account rather than yours.

**Data.** Ask what you can export and in what format: contacts, leads, form submissions, text and email history, and analytics access.

## How to get each one back

These rules come from the organizations that run each system, not from any vendor.

- **Domains.** To move a domain to another registrar you need an authorization code (sometimes called an Auth-Code or EPP code). Under ICANN's transfer policy, your registrar must provide it within five calendar days of your request. A transfer can be refused within 60 days of a new registration or a previous transfer, and changing the registrant name usually locks the domain for 60 days. So if the agency's name is on it, start early ([ICANN, Transferring Your Domain Name](https://www.icann.org/resources/pages/name-holder-faqs-2017-10-10-en)).
- **Google Business Profile.** If someone else owns your profile, you can request ownership through Google. The current owner is notified and has three days to respond. If they don't, you may get the option to claim it yourself, though Google says that option isn't always available ([Google Business Profile Help](https://support.google.com/business/answer/4566671?hl=en)).
- **Phone numbers.** The FCC says your old provider cannot refuse to port your number, even if you owe a balance or a termination fee. Don't cancel the old service before the new provider starts the port ([FCC, Keeping Your Phone Number](https://www.fcc.gov/guides/portability-keeping-your-phone-number-when-changing-service-providers)).
- **Website files and data.** There's no outside rule here. It comes down to your contract, which is why it's worth reading before you sign anything.

The full step-by-step list, including reviews and data export, is on our [switching page](/switching).

## What "you own your website" should mean in writing

A good contract answers these in plain language:

- When do you own the website? (On signing, on final payment, or never?)
- Can you get a complete copy of the files, or only the content?
- Is the domain registered in your business's name?
- Are you the Owner on your Google Business Profile?
- What's the minimum term, does it auto-renew, and how much notice do you need to give?
- What does the vendor hand over when you leave, and how quickly?

If a vendor won't put these answers in writing, that tells you something.

## How Makr handles it

Here are our terms, the same for every client:

- Monthly services have a **3-month minimum, then run month-to-month**. After the minimum, you can cancel with **30 days' written notice**.
- **Once your build fee is paid in full, you own your website.** Your **domain, Google Business Profile, content and data** are yours too.
- Our prices are on our [pricing page](/pricing), and builds are quoted in writing before work starts.

We'd rather keep clients because the work is useful and the Monday report shows it than because leaving is hard. We work with owner-led businesses across Massachusetts, southern New Hampshire and the rest of New England.`,
    faqs: [
      { q: "Who owns my website if my web designer built it?", a: "It depends on your contract and on whose name is on the domain and hosting accounts. Many contracts give you ownership once the build is paid. Some vendors license the site to you for as long as you pay monthly. Ask for the answer in writing, and check the domain registrant yourself." },
      { q: "Can my marketing agency keep my domain name?", a: "If the domain is registered in the agency's name, they control it until it's changed. Ask them to update the registrant to your business. Once you're the registrant, your registrar must give you the transfer code within five calendar days of your request, under ICANN's transfer policy." },
      { q: "How do I get my Google Business Profile back from an agency?", a: "First ask the agency to make your business the Owner. If they won't or can't, request ownership through Google Business Profile. The current owner has three days to respond, and if they don't, you may be able to claim the profile." },
      { q: "Can I keep my business phone number if I cancel?", a: "Usually yes. The FCC says a provider can't refuse to port your number because you owe money. Start the port with the new provider first and keep the old service active until it's done." },
      { q: "What should I do before I cancel a marketing contract?", a: "Confirm you have Owner access to your domain, Google Business Profile, analytics and any phone numbers, and export your data. Then give notice the way your contract requires. Our [switching page](/switching) has the full checklist." },
    ],
    cta: { title: "Not sure what you own right now?", body: "In a free, 20-minute Growth Gap Review, we'll check how customers find you and what happens when they reach out, and we'll tell you what to confirm about your accounts, whether or not you hire us." },
    sources: [
      { label: "ICANN, FAQs for Registrants: Transferring Your Domain Name", url: "https://www.icann.org/resources/pages/name-holder-faqs-2017-10-10-en", usedFor: "Auth-code within five calendar days; 60-day locks" },
      { label: "Google Business Profile Help, Request ownership of a Business Profile", url: "https://support.google.com/business/answer/4566671?hl=en", usedFor: "Three-day response window; claim option" },
      { label: "FCC, Portability: Keeping Your Phone Number When Changing Service Providers", url: "https://www.fcc.gov/guides/portability-keeping-your-phone-number-when-changing-service-providers", usedFor: "Providers can't refuse to port over an unpaid balance; don't cancel first" },
      { label: "Makr review of public complaints about marketing vendors on BBB, Trustpilot and Capterra", usedFor: "Recurring complaint themes, described generally; no vendors named" },
    ],
    related: [
      { href: "/switching", label: "The full switching checklist" },
      { href: "/pricing", label: "Our prices and terms" },
      { href: "/solutions#websites", label: "Website Development & Management" },
      { href: "/about", label: "About Makr" },
    ],
  },
  {
    slug: "law-firm-response-time",
    title: "How fast should a law firm respond to a new client inquiry?",
    titleTag: "How Fast Should a Law Firm Respond to a New Inquiry?",
    description: "A practical response standard for small law firms, what Clio's 2024 secret-shopper study found, and which replies can safely run without partner time.",
    market: "Law firms",
    lead: "Acknowledge every new inquiry within minutes, and give the person a real next step, usually a consultation time, the same business day. That's a practical standard, not a rule. The bar is low: in Clio's 2024 secret-shopper study of 500 U.S. law firms, only 40% answered the phone and 33% replied to an email.",
    body: `## What the research shows

Two studies are worth knowing, and both are easy to misquote, so here they are plainly.

**Clio's 2024 Legal Trends Report.** A third-party firm contacted 500 U.S. law firms posing as a prospective client. Forty percent answered the phone. Thirty-three percent responded to the email ([2Civility summary of the Clio 2024 Legal Trends Report](https://www.2civility.org/2024-clio-legal-trends-report-fixing-the-first-impression-problem-for-law-firms/)). Clio sells practice-management software, so treat it as vendor research. The method, outside secret shoppers with a stated sample, is more solid than most vendor surveys.

**"The Short Life of Online Sales Leads" (Harvard Business Review, 2011).** Researchers audited how 2,241 U.S. companies responded to a web inquiry. Companies that responded within an hour were nearly seven times as likely to qualify the lead as those that waited longer ([Oldroyd, McElheran and Elkington, HBR 2011](https://scholarsarchive.byu.edu/facpub/9711); figures as reported by [SmartCompany, 2011](https://www.smartcompany.com.au/marketing/20110704-are-you-letting-online-leads-go-cold/)). It's 15 years old and wasn't about law firms, but it remains the most traceable study of response speed.

Put together: a prompt, professional reply is uncommon enough that it sets a firm apart, and the first hour matters more than most firms assume.

## Why firms miss inquiries (it's rarely carelessness)

Small firms don't ignore prospective clients on purpose. The usual causes are structural:

- Consultation requests land in a shared inbox that everyone assumes someone else is watching.
- The person who handled intake left, or is also the receptionist, bookkeeper and paralegal.
- Calls after 5 p.m. and on weekends go to voicemail, and the voicemail gets returned "first thing," which becomes the afternoon.
- Partners are in court, in meetings or doing billable work, which is what they should be doing.

That last point is the real tension. The fix isn't for partners to answer every call. It's for the routine first reply to happen without them.

## A response standard you can write down

Here's a standard a 2–20 lawyer firm can meet without adding staff. Adjust it to your practice.

| Channel | First reply | Human follow-up |
|---|---|---|
| Web form or email | Within a few minutes, every time, with a link to book a consultation | Same business day if they haven't booked |
| Phone call during business hours | Answered, or a text or callback within the hour | Same business day |
| Call or form after hours | A prompt, polite acknowledgment that says when the firm will follow up | By mid-morning the next business day |
| Prospect who doesn't book | — | A short check-in a few days later, then close the loop |

This is Makr's recommendation, not a professional-conduct rule. The point is to decide on a standard and then measure against it.

## What can run without a lawyer, and what can't

**Safe to automate (with wording your firm approves):**
- Acknowledging the inquiry and saying what happens next
- Offering consultation times or a booking link
- Collecting contact details and only the information your firm needs for a conflict check
- Reminders before the consultation
- A check-in if someone didn't book

**Keep with a lawyer or trained staff:**
- Anything that could read as legal advice
- Deciding whether to take the matter
- Fees, engagement terms and anything about the merits

Information a prospective client shares can create obligations to them even if they never hire you. Both Massachusetts and New Hampshire have a version of Rule 1.18 (duties to prospective clients). That's a strong reason to collect only what you need up front. Your firm decides what's compliant; Makr doesn't give ethics opinions.

## A sample first reply

*Template, not legal advice. Your firm would approve the final wording.*

> Thank you for contacting [Firm Name]. We received your message and a member of our team will follow up by [time]. If you'd like to schedule a consultation now, you can choose a time here: [link]. Please don't send confidential details by email or text; we'll gather what we need when we speak.

It's short, calm and specific about what happens next. It doesn't promise an outcome or give advice.

## How to find out your own response time

Ask someone you trust to submit your web form on a weeknight and call the main line at 12:30 p.m. on a Tuesday. Note how long each takes to get a reply and what the reply says. Do it with your own firm, with your team's knowledge. Most partners are surprised by the answer, in one direction or the other.

## Where Makr fits

Makr sets up and runs inquiry response for small firms inside the tools you already use, such as Clio, MyCase or your existing phone system. Every template is approved by the firm before it goes live. You get a one-page report every Monday showing what came in and what happened to it, with no logins.

Lead Follow-Up & Revenue Recovery is $1,500 to set up and $999 a month, with a 3-month minimum and then month-to-month. Prices are on our [pricing page](/pricing). We don't promise more consultations or more matters. We make sure every inquiry gets a prompt, professional answer. We work with firms across Massachusetts and southern New Hampshire.`,
    faqs: [
      { q: "How quickly should a lawyer return a call from a prospective client?", a: "There's no single rule, but a same-business-day callback is a reasonable floor, and a prompt acknowledgment within the hour is better. In Clio's 2024 secret-shopper study, only 40% of 500 U.S. firms answered the phone, so a timely reply stands out." },
      { q: "Is it okay for a law firm to send an automated reply to an inquiry?", a: "Many firms do, as long as the reply only acknowledges the inquiry, explains next steps and offers a consultation time. It shouldn't give legal advice, and the firm should approve the wording. Check your state's rules and your bar's guidance." },
      { q: "What should a law firm do about after-hours inquiries?", a: "Send a prompt acknowledgment that says when the firm will follow up, and include a booking link if you offer one. Then follow up by mid-morning the next business day." },
      { q: "What information should we collect before a consultation?", a: "Collect contact details and only what your firm needs to run a conflict check. Ask prospective clients not to send confidential details until you've spoken, since shared information can create duties to them." },
      { q: "Does responding faster guarantee more clients?", a: "No. It removes one common reason firms lose prospective clients, but it doesn't guarantee anyone hires you. What it does is make sure you're in the conversation." },
    ],
    cta: { title: "Want to see what a prospective client experiences when they contact your firm?", body: "In a free, 20-minute Growth Gap Review focused on intake, we'll look at how inquiries arrive, how fast they're answered and where partner time goes. We'll do a walk-through on the call using your own phone and inbox records." },
    sources: [
      { label: "2Civility, summary of the Clio 2024 Legal Trends Report", url: "https://www.2civility.org/2024-clio-legal-trends-report-fixing-the-first-impression-problem-for-law-firms/", usedFor: "40% answered the phone; 33% responded to email (Clio is a software vendor)" },
      { label: "Oldroyd, McElheran and Elkington, \"The Short Life of Online Sales Leads,\" Harvard Business Review, 2011 (BYU record)", url: "https://scholarsarchive.byu.edu/facpub/9711", usedFor: "2,241 companies; response within an hour (2011 study)" },
      { label: "SmartCompany, \"Are you letting online leads go cold?\", 2011", url: "https://www.smartcompany.com.au/marketing/20110704-are-you-letting-online-leads-go-cold/", usedFor: "Figures from the HBR study as reported" },
      { label: "New Hampshire Rules of Professional Conduct, Rule 1.18: Duties to Prospective Client", url: "https://www.courts.nh.gov/new-hampshire-rules-professional-conduct/rule-118-duties-prospective-client", usedFor: "Duties to prospective clients (Massachusetts: SJC Rule 3:07, Rule 1.18)" },
    ],
    related: [
      { href: "/industries/law-firms", label: "Makr for law firms" },
      { href: "/insights/law-firm-intake-automation", label: "Law firm intake automation" },
      { href: "/solutions#revenue-recovery", label: "Lead Follow-Up & Revenue Recovery" },
      { href: "/solutions#ai-workflows", label: "AI Workflow Automation" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    slug: "contractor-estimate-follow-up",
    title: "Estimate follow-up for contractors: a simple schedule that doesn't feel pushy",
    titleTag: "Estimate Follow-Up for Contractors: A Schedule and Texts",
    description: "A simple estimate follow-up schedule for HVAC, plumbing and electrical shops, with copy-and-paste texts that don't feel pushy. Day 1 through day 30.",
    market: "Home services",
    lead: "Follow up the day after you send an estimate, then on day 3, day 7 and day 14, and close the loop around day 30. Keep each message short, make it useful (answer a question, make the next step easy) and always give the customer an easy way to say no. A clear \"no\" is worth more than silence.",
    body: `## Why good estimates go quiet

When an estimate goes quiet, it usually isn't a no. More often:

- The homeowner is comparing two or three quotes and hasn't sat down to do it.
- A spouse or a landlord needs to sign off.
- They're waiting on financing or rebate paperwork. On heat pump jobs in Massachusetts, many customers are sorting out Mass Save rebates.
- They have a question they feel awkward asking.
- Life got busy, and the furnace is limping along for now.

Every one of those is a reason to follow up. And if you don't, the shop that does gets the next conversation.

## The schedule

| When | Channel | Goal |
|---|---|---|
| **Day 1** (the morning after) | Text | Confirm they got it and offer to answer questions |
| **Day 3** | Text | Answer the most common question for that job type |
| **Day 7** | Email or call | Make the decision easy: options, timing, how to book |
| **Day 14** | Text | A short check-in that invites a yes or a no |
| **Day 30** | Text or email | Close the loop politely and keep the door open |

Stop the sequence the moment the customer replies, books or says no. A person takes it from there.

For urgent work (a no-heat call, a leak) compress it: same day, next day, day 3. For big-ticket installs with longer decisions, such as a full heat pump system or a panel upgrade, stretch the later steps.

## Messages you can copy

These are templates for a fictional shop, **Example Plumbing & Heating Co. (fictional)**. Change the wording until it sounds like you.

**Day 1**
> Hi Dana, it's Mike from Example Plumbing & Heating. Just making sure the estimate for your boiler replacement came through OK. Happy to answer any questions by text or a quick call.

**Day 3** (pick the question your customers actually ask)
> Hi Dana, a lot of folks ask how long the install takes. For a job like yours it's usually one to two days, and you'd have heat back each night. Any other questions I can answer?

> Hi Dana, if you're applying for a rebate on the heat pump, we can send you the paperwork we usually provide. Just let me know.

**Day 7** (email or a call)
> Hi Dana, a quick note on the estimate we sent last week. If timing is the question, we have openings the weeks of [date] and [date]. If you'd like to compare options, I'm happy to walk through the good/better/best versions on the phone. Reply here or call [number].

**Day 14**
> Hi Dana, checking in on the boiler estimate. If you've gone another direction, no problem at all, just let me know so I can close it out. If you're still deciding, I'm here.

**Day 30**
> Hi Dana, I'll close out the estimate on our end. If anything changes, reply to this text and we'll pick it right back up. Thanks for considering us.

What these have in common: they're short, they come from a person by name, they don't use "limited time" pressure, and two of them make it easy to say no.

## Why making "no" easy works

Owners worry that follow-up feels pushy. What feels pushy is follow-up with no exit. When you tell the customer it's fine to say they went another way, many will, and that frees your pipeline. Some will tell you why (price, timing, a relative in the trade), which is information you can use. And the ones still deciding often reply just because the question was easy to answer.

## Who should send it

Pick one approach and stick with it:

1. **The person who wrote the estimate**, if they'll actually do it. Best for trust, worst for consistency in busy season.
2. **The office**, from a shared list reviewed every morning. Works if someone owns the list.
3. **Your field-service software**, if it can schedule follow-ups from the estimate. Many can; few shops have it set up.
4. **An automated sequence that stops when the customer replies**, with replies going to a real person. This is what Makr sets up.

Whichever you choose, someone should look once a week at every open estimate and its status. That's the habit that matters most.

## A few rules for texting customers

- Only text people who gave you their number for this job, and stop when they ask.
- Send during reasonable hours.
- Use your business name in the first message so they know who it is.
- Make sure replies reach a person who will answer them.

## Where Makr fits

Makr sets up estimate follow-up inside the phone and software you already use, whether that's Jobber, Housecall Pro, ServiceTitan or a spreadsheet, and runs it for you. You approve the wording first. Every Monday you get a one-page report listing open estimates and where each one stands. No logins.

It's part of Lead Follow-Up & Revenue Recovery: $1,500 setup, $999 a month, a 3-month minimum and then month-to-month. See our [pricing page](/pricing). We don't promise more booked jobs. We make sure no estimate goes quiet because nobody followed up. We work with shops across Massachusetts and southern New Hampshire.`,
    faqs: [
      { q: "How long should I wait to follow up on an estimate?", a: "Follow up the next day to confirm they received it and offer to answer questions. Then check in on day 3, day 7 and day 14, and close the loop around day 30. Compress the schedule for urgent repairs." },
      { q: "Should I follow up on an estimate by text or phone?", a: "Use text for short check-ins, since most homeowners will reply to a text faster than they'll return a call. Use a call or email for the step where you lay out options or timing." },
      { q: "How many times should a contractor follow up on a quote?", a: "Four or five touches over about 30 days is reasonable for most residential jobs. Stop as soon as the customer replies, books or says no." },
      { q: "What do I say if the customer went with someone else?", a: "Thank them, ask (once, lightly) whether price or timing made the difference, and offer to help in the future. Then close the estimate so it doesn't clutter your list." },
      { q: "Is it pushy to follow up on an estimate?", a: "Not if each message is short, useful and gives the customer an easy way to say no. Following up without an exit is what feels pushy." },
    ],
    cta: { title: "How many of your open estimates have had a follow-up this week?", body: "In a free, 20-minute Growth Gap Review we'll look at how calls, web requests and estimates are handled at your shop and where jobs slip away. You get your top opportunities in priority order, whether or not you hire us." },
    sources: [
    ],
    sourceNote: "No statistics are used in this article. Mass Save rebates are mentioned generally, with no figures. All message examples are templates for a fictional business.",
    related: [
      { href: "/industries/home-services", label: "Makr for home services" },
      { href: "/insights/missed-call-text-back-contractors", label: "Missed-call text back for contractors" },
      { href: "/solutions#revenue-recovery", label: "Lead Follow-Up & Revenue Recovery" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    slug: "missed-call-text-back-contractors",
    title: "Missed-call text back for plumbing and HVAC companies: what it does, what it doesn't, and whether you already have it",
    titleTag: "Missed-Call Text Back for Plumbers and HVAC: What It Does",
    description: "What missed-call text back does and doesn't do for plumbing, HVAC and electrical shops, and how to check whether your software already has it.",
    market: "Home services",
    lead: "Missed-call text back sends an automatic text to anyone whose call you didn't answer, usually within a minute, so they hear from you before they call the next shop. It doesn't book the job or replace calling back. Many field-service tools already include it or sell it as an add-on, so check your software before paying for another tool.",
    body: `## How it works

1. A customer calls your business number.
2. Nobody picks up: you're under a sink, the office line is busy, or it's 9 p.m.
3. Within a minute or so, the caller gets a text from your business number: who you are, that you saw the call, and what happens next.
4. If they reply, the conversation shows up wherever your team handles texts.

That's it. The value is in step 3 happening every time, including the times nobody would have remembered to call back.

## Why the first minute matters

The idea is old and simple: the business that responds first gets the first real conversation. The most traceable research on this is a 2011 Harvard Business Review study of how 2,241 U.S. companies handled web inquiries. Companies that responded within an hour were nearly seven times as likely to qualify the lead as those that waited longer ([Oldroyd, McElheran and Elkington, HBR 2011](https://scholarsarchive.byu.edu/facpub/9711); figures as reported by [SmartCompany](https://www.smartcompany.com.au/marketing/20110704-are-you-letting-online-leads-go-cold/)). It's old, and it measured web leads rather than phone calls, but the point holds for a homeowner with water on the basement floor.

A text back doesn't win the job. It keeps you in the running while you finish what you're doing.

## What it does well

- **Stops the "next plumber on the list" call.** A caller who gets a text is less likely to keep dialing.
- **Captures after-hours calls.** The text can say when you'll call back and offer a booking link.
- **Sorts urgent from routine.** A simple question ("Is this an emergency? Reply 1 for yes") helps you decide who to call first.
- **Works when the office is short-staffed.** During a busy week or when a dispatcher leaves, it covers the gap.

## What it doesn't do

- **It doesn't book the job.** Someone still has to reply, quote and schedule.
- **It doesn't fix a slow callback.** If replies sit unread until tomorrow, the customer has already moved on.
- **It doesn't follow up on estimates.** That's a separate process (see our [estimate follow-up guide](/insights/contractor-estimate-follow-up)).
- **It can annoy people if it's set up badly.** A robotic message, texts sent to spam callers or a text arriving while you're calling them back all look sloppy.

## Do you already have it?

Possibly. Check these before you buy anything:

- **Your field-service software.** Jobber, for example, sells an AI receptionist add-on that answers calls and texts. Other field-service platforms offer texting features in some plans. Look in your plan details or ask their support: "Can you automatically text callers when we miss a call?"
- **Your phone system.** Many business VoIP providers include missed-call auto-replies.
- **Your marketing or review software**, if you already pay for one.

If you already have it, don't pay someone to rebuild it. Get it set up properly instead: good wording, the right hours, replies going to the right person, and someone checking that it works.

## Setup decisions that matter more than the tool

**Your number has to be able to text.** Some landlines and older phone setups can't send texts from the main number. Ask your provider.

**Write it like a person.** Sample wording for a fictional shop:
> Hi, this is Example Plumbing & Heating Co. (fictional). Sorry we missed your call. We're on a job and will call you back within the hour. If it's an emergency, reply URGENT and we'll call right away. You can also book here: [link]

**Set different messages by time of day.** During business hours promise a callback within the hour. After hours, say when you'll call and whether you take emergencies.

**Decide who answers replies.** Replies should go to a phone that someone actually watches.

**Keep spam out.** Filter known spam numbers so you aren't texting robocallers.

**Measure it.** Each week, count missed calls, how many got a text, how many replied and how many became jobs. If you can't see those numbers, you don't know whether it's working.

## Where Makr fits

Missed-call text back is one piece of Makr's Lead Follow-Up & Revenue Recovery service, alongside instant replies to web requests, estimate follow-up and review requests. We set it up inside the phone and software you already use, write the messages with you and run it. Every Monday you get a one-page report with the week's calls, texts and what happened to them. No logins.

It's $1,500 to set up and $999 a month, with a 3-month minimum and then month-to-month ([pricing](/pricing)). If your software already covers part of it, we use what you have and say so. We don't promise more calls or more booked jobs. We work with trades businesses across Massachusetts and southern New Hampshire.`,
    faqs: [
      { q: "What is missed-call text back?", a: "It's an automatic text sent to a caller when you don't answer, usually within a minute. It tells them you saw the call and what happens next, so they're less likely to call another business." },
      { q: "Does Jobber have missed-call text back?", a: "Jobber sells an AI receptionist add-on that answers calls and texts. Features and prices change, so check your current plan or ask Jobber support what's included." },
      { q: "Can I send texts from my business landline number?", a: "Sometimes. Some landlines can be text-enabled through your provider or a texting service, and some can't. Ask your phone provider before choosing a tool." },
      { q: "Will customers find an automatic text annoying?", a: "Not usually, if it's short, sounds like your shop and is followed by a real callback. What annoys people is a robotic message with no follow-up." },
      { q: "Is missed-call text back enough on its own?", a: "No. It only covers the first minute. You still need fast callbacks, estimate follow-up and someone checking that replies get answered." },
    ],
    cta: { title: "Want to know what a customer sees when they call your shop after hours?", body: "In a free, 20-minute Growth Gap Review, we'll check what your current software already covers and where calls and estimates slip through. We'll do a walk-through on the call using your own phone and inbox records." },
    sources: [
      { label: "Oldroyd, McElheran and Elkington, \"The Short Life of Online Sales Leads,\" Harvard Business Review, 2011 (BYU record)", url: "https://scholarsarchive.byu.edu/facpub/9711", usedFor: "Response within an hour (2011 study of web leads)" },
      { label: "SmartCompany, \"Are you letting online leads go cold?\", 2011", url: "https://www.smartcompany.com.au/marketing/20110704-are-you-letting-online-leads-go-cold/", usedFor: "Figures from the HBR study as reported" },
      { label: "Jobber pricing", url: "https://www.getjobber.com/pricing/", usedFor: "AI receptionist add-on exists (prices change; not quoted)" },
    ],
    related: [
      { href: "/industries/home-services", label: "Makr for home services" },
      { href: "/insights/contractor-estimate-follow-up", label: "Estimate follow-up for contractors" },
      { href: "/solutions#revenue-recovery", label: "Lead Follow-Up & Revenue Recovery" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    slug: "google-reviews-for-contractors",
    title: "How to get more Google reviews for a trades business, within Google's rules",
    titleTag: "How to Get More Google Reviews for a Trades Business",
    description: "How plumbing, HVAC and electrical shops can ask for more Google reviews within Google's rules and the FTC's 2024 rule, with request texts you can copy.",
    market: "Home services",
    lead: "Ask every customer, right after the job is done, with a direct link to your Google review form. Don't offer discounts or gifts for reviews, don't ask only the customers you think are happy, and don't give your techs review quotas. Google's policies prohibit all three, and the FTC's 2024 rule on fake reviews covers related practices.",
    body: `## Why reviews matter so much for trades

When a homeowner searches for a plumber or an HVAC company, the map results show your star rating and review count before they ever see your website. Reviews are also how many people decide whether to call at all. In a 2026 industry survey of U.S. consumers, nearly all said they read reviews and most said they expect owners to respond to them ([source: 2026 industry survey](https://www.brightlocal.com/research/local-consumer-review-survey/); vendor survey, treat as directional).

The good news: the method that works is also the one that follows the rules. Ask consistently.

## What's not allowed

These come straight from Google's policy for reviews on Maps and from the FTC.

**Under Google's [prohibited and restricted content policy](https://support.google.com/contributionpolicy/answer/7400114?hl=en), businesses may not:**
- Offer anything in exchange for a review, or for changing or removing a negative one. That includes discounts, gift cards, free service and contest entries.
- Discourage negative reviews or **selectively ask for positive ones**. Asking only the customers you think are happy is known as "review gating," and it's against the rules.
- Ask staff to collect a set number of reviews, or reviews with specific content.
- Pressure customers to leave a review while you're on site.
- Post reviews from employees, family or anyone with a conflict of interest.

**The FTC's rule on fake reviews and testimonials (announced August 14, 2024)** bars, among other things, incentives conditioned on a review expressing a particular sentiment, fake reviews, undisclosed reviews by company insiders, and using threats or intimidation to suppress negative reviews ([FTC press release](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials)).

This isn't legal advice. If a review practice feels like a gray area, skip it.

## What works

### 1. Ask every customer, every time

Consistency is the whole game. Make the review request part of closing out every completed job, not something a tech remembers on a good day. Asking everyone is also what keeps you within Google's rules.

### 2. Ask at the right moment

The best time is shortly after the job is finished and the customer has seen the result: the heat is back on, the leak is fixed, the panel passed inspection. Same day or the next morning works well. Wait a week and the moment has passed.

### 3. Send a direct link

Your Google Business Profile can give you a short link (and a QR code) that goes straight to the review form. On a computer, open your profile, choose "Read reviews," then "Get more reviews" ([Google Business Profile Help](https://support.google.com/business/answer/16816815?hl=en)). Use it. Every extra tap loses people.

### 4. Make the request personal and short

Messages for a fictional shop, **Example Plumbing & Heating Co. (fictional)**. Change the wording to sound like you.

**Text, same day:**
> Hi Pat, it's Example Plumbing & Heating. Thanks for having Luis out today. If you have a minute, an honest review on Google helps other homeowners find us: [link]. Thanks either way.

**Follow-up, three days later (once only):**
> Hi Pat, one quick reminder in case the last text got buried. Here's the link if you'd like to leave a review: [link]. No worries if not.

**Email version:**
> Subject: Thanks from Example Plumbing & Heating
> Hi Pat, thanks for choosing us for your furnace repair. If you have a minute, we'd appreciate an honest review on Google: [link]. If anything wasn't right, reply to this email and I'll handle it personally.

Notice "honest review." You're asking everyone for their real opinion, which is exactly what the rules require.

### 5. Respond to every review

Thank people for good reviews, briefly and specifically. For negative ones, reply calmly, don't argue about details in public, don't share customer information, and offer to talk offline. Prospective customers read your replies as closely as the reviews themselves.

### 6. Fix what the bad reviews tell you

If several reviews mention the same thing (late arrivals, surprise charges, no call-back), that's information you'd have paid a consultant for. Fix it, and the reviews tend to follow.

## What about a tech who asks in person?

That's fine, as long as it's a simple, no-pressure ask of every customer, with the link sent afterward. Don't hand the customer your phone to fill it out on the spot, and don't tie tech pay or bonuses to review counts, since Google prohibits asking staff to collect a specific number.

## Where Makr fits

Review requests are part of Makr's Lead Follow-Up & Revenue Recovery service. We set them up to go out automatically after every completed job from the software you already use, so every customer is asked the same way, at the right time, with a direct link. You approve the wording. Every Monday's one-page report shows requests sent and reviews received.

Setup is $1,500 and the service is $999 a month, with a 3-month minimum and then month-to-month ([pricing](/pricing)). We don't promise a number of reviews or a star rating; nobody honest can. We work with trades businesses across Massachusetts and southern New Hampshire.`,
    faqs: [
      { q: "Can I offer a discount for a Google review?", a: "No. Google's policy prohibits offering anything in exchange for a review, including discounts, gifts and free service. The FTC's 2024 rule also bars incentives tied to positive reviews." },
      { q: "Is it okay to only ask happy customers for reviews?", a: "No. Google prohibits selectively asking for positive reviews, a practice often called review gating. Ask every customer for an honest review." },
      { q: "Can my employees leave reviews for our business?", a: "No. Google treats reviews from employees and others with a conflict of interest as prohibited, and the FTC rule covers undisclosed insider reviews." },
      { q: "When is the best time to ask for a review?", a: "Shortly after the job is done and the customer has seen the result, usually the same day or the next morning. Send one reminder a few days later at most." },
      { q: "Can I give my techs a bonus for getting reviews?", a: "Google prohibits asking staff to solicit a set number of reviews, so avoid quotas and per-review bonuses. Encourage techs to mention reviews to every customer instead." },
    ],
    cta: { title: "Not sure how your reviews compare with the shops around you?", body: "In a free, 20-minute Growth Gap Review, we'll look at how customers find you on Google and the map, and what happens after a job is done. You get your top opportunities in priority order, whether or not you hire us." },
    sources: [
      { label: "Google Maps, Prohibited and restricted content policy", url: "https://support.google.com/contributionpolicy/answer/7400114?hl=en", usedFor: "Incentives, selective solicitation, staff quotas, on-site pressure, conflicts of interest" },
      { label: "FTC, final rule banning fake reviews and testimonials, August 14, 2024", url: "https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials", usedFor: "Sentiment-conditioned incentives, insider reviews, suppression" },
      { label: "Google Business Profile Help, Create a link or QR code to request reviews", url: "https://support.google.com/business/answer/16816815?hl=en", usedFor: "Where to find your review link" },
      { label: "A 2026 industry survey of U.S. consumers", url: "https://www.brightlocal.com/research/local-consumer-review-survey/", usedFor: "Consumers read reviews and expect responses; vendor survey, directional only" },
    ],
    related: [
      { href: "/industries/home-services", label: "Makr for home services" },
      { href: "/solutions#revenue-recovery", label: "Lead Follow-Up & Revenue Recovery" },
      { href: "/solutions#search-content", label: "Search Visibility & Content Marketing" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    slug: "law-firm-intake-automation",
    title: "Law firm intake automation: what to automate and what a lawyer should still handle",
    titleTag: "Law Firm Intake Automation: What to Automate, What Not To",
    description: "Which intake steps a small law firm can safely automate, which should stay with a lawyer, and how to start with tools like Clio or MyCase you already have.",
    market: "Law firms",
    lead: "Automate the intake steps that are the same every time: acknowledging the inquiry, collecting contact and conflict-check details, scheduling the consultation, sending reminders and following up when someone doesn't book. Keep judgment with lawyers: whether to take the matter, anything that could read as legal advice, fees and engagement terms.",
    body: `## Why intake is worth fixing first

For most small firms, intake is where partner time leaks out in small pieces: returning a voicemail, retyping a contact form into the practice-management system, emailing back and forth to find a consultation time, chasing a prospect who didn't book. None of it is billable, and all of it gets done in the gaps between billable work.

It's also where firms lose prospective clients. In Clio's 2024 secret-shopper study of 500 U.S. law firms, 40% answered the phone and 33% responded to an email ([2Civility summary of the Clio 2024 Legal Trends Report](https://www.2civility.org/2024-clio-legal-trends-report-fixing-the-first-impression-problem-for-law-firms/); Clio is a software vendor, though the study used outside secret shoppers). A firm that answers promptly and calmly is already ahead.

## Intake, step by step

| Intake step | Automate? | Who owns it |
|---|---|---|
| Acknowledge a new inquiry (web form, email, after-hours call) | Yes, with approved wording | System, reviewed weekly |
| Send a consultation booking link or times | Yes | System |
| Collect contact details and conflict-check information | Yes, limited to what the firm specifies | System collects, staff runs the check |
| Route the inquiry by practice area to the right person | Yes | System routes, person responds |
| Run the conflict check | Partly (data entry), decision stays human | Staff and lawyer |
| Consultation reminders | Yes | System |
| Follow up with prospects who didn't book | Yes, one or two gentle check-ins | System, replies go to staff |
| Decide whether to take the matter | No | Lawyer |
| Discuss fees and the engagement letter | Draft can be prepared; conversation stays human | Lawyer |
| Anything about the merits or what the person should do | No | Lawyer |
| Create the new matter and file intake answers | Yes, from the intake form | System, checked by staff |

The pattern: automation handles the logistics and the data entry, and people handle judgment and relationships.

## Guardrails that make this safe to run

**The firm approves every template.** Nothing goes to a prospective client in wording the firm hasn't signed off on.

**No legal advice, ever.** Automated messages acknowledge, schedule, remind and collect. They don't assess the matter or suggest what someone should do.

**Collect only what you need.** Information a prospective client shares can create duties to them even if they never hire you. Both Massachusetts and New Hampshire have a version of Rule 1.18, duties to prospective clients. Keep the intake form to what's needed to contact the person and run a conflict check, and ask them not to send confidential details before the consultation. Your firm decides what's compliant.

**Data stays in your systems.** Intake answers should land in the practice-management system you already use, not in a separate tool nobody checks. Whoever sets it up should document in writing what they access.

**A person answers every reply.** If a prospective client responds to an automated message, a staff member or lawyer picks it up.

## You may already have the tools

Many small firms already pay for practice-management software with intake features, such as Clio (with Clio Grow), MyCase or Lawmatics. The gap is usually not the software. It's that nobody had time to set it up properly: connecting the website form, writing the templates, setting the routing rules and checking every week that it works.

Start there before buying anything new.

## Where to start: one workflow

Don't try to automate everything at once. Pick the step that costs the most partner time or loses the most prospects. For most firms that's one of these:

1. **Instant acknowledgment plus a booking link** for every web inquiry and after-hours call.
2. **Structured intake** that collects conflict-check details and files them into your system.
3. **Follow-up for prospects who didn't book**, so a consultation request doesn't die quietly after one email.

Run it for a month, look at what happened, then add the next step.

## Sample: one week of automated intake

*Sample for a fictional firm, Example Law Group (fictional). Numbers are illustrative only.*

- Monday: 6 web inquiries arrive over the weekend. Each gets an approved acknowledgment and a booking link within minutes. Four book consultations.
- Tuesday: intake answers for those four are filed into the practice-management system and routed to the estate-planning and real-estate partners.
- Thursday: the two who didn't book get a short, polite check-in. One books.
- Friday: the managing partner reads a one-page summary of what came in and what happened to it.

## What it costs, in plain numbers

At Makr, instant response and follow-up are part of Lead Follow-Up & Revenue Recovery: $1,500 to set up and $999 a month, with a 3-month minimum and then month-to-month. Structured intake and routing is an AI Workflow Automation build, from $3,000 per workflow, with optional support at $499 a month. All prices are on our [pricing page](/pricing).

A simple way to check whether it's worth it: at an example billable rate of $300 an hour, $999 is about 3.3 hours of partner time a month. In the Growth Gap Review, we'll estimate your firm's actual intake hours with you. We don't promise more consultations or more matters.`,
    faqs: [
      { q: "Can a small law firm automate client intake?", a: "Yes, for the routine steps: acknowledging inquiries, scheduling consultations, collecting conflict-check details, sending reminders and following up. Decisions about taking the matter, fees and anything resembling advice should stay with a lawyer." },
      { q: "Is automated intake compliant with legal ethics rules?", a: "It can be, if messages don't give legal advice, the firm approves every template, and intake collects only what's needed. Your firm is responsible for deciding what's compliant under your state's rules; check your bar's guidance." },
      { q: "Do we need new software to automate intake?", a: "Often not. Many firms already have intake features in Clio, MyCase or Lawmatics that were never fully set up. Start by configuring what you have." },
      { q: "What intake information should we collect before a consultation?", a: "Contact details and what your firm needs for a conflict check. Ask prospective clients not to send confidential details until you've spoken." },
      { q: "How long does it take to set up intake automation?", a: "It depends on your tools and how many steps you automate. Starting with one workflow keeps it manageable; the timeline is set in writing before work begins." },
    ],
    cta: { title: "Where does intake time go at your firm?", body: "In a free, 20-minute Growth Gap Review focused on intake, we'll look at how inquiries arrive, how fast they're answered and which steps take partner time. You get your top opportunities in priority order, whether or not you hire us." },
    sources: [
      { label: "2Civility, summary of the Clio 2024 Legal Trends Report", url: "https://www.2civility.org/2024-clio-legal-trends-report-fixing-the-first-impression-problem-for-law-firms/", usedFor: "40% answered the phone; 33% responded to email (Clio is a software vendor)" },
      { label: "LawNext Legal Technology Directory, Clio Grow", url: "https://directory.lawnext.com/products/clio-grow/pricing/", usedFor: "Clio Grow provides intake features (no prices quoted)" },
      { label: "New Hampshire Rules of Professional Conduct, Rule 1.18: Duties to Prospective Client", url: "https://www.courts.nh.gov/new-hampshire-rules-professional-conduct/rule-118-duties-prospective-client", usedFor: "Duties to prospective clients (Massachusetts: SJC Rule 3:07, Rule 1.18)" },
    ],
    sourceNote: "The $300 hourly figure is an example billable rate used for arithmetic, not a market statistic.",
    related: [
      { href: "/industries/law-firms", label: "Makr for law firms" },
      { href: "/insights/law-firm-response-time", label: "How fast should a law firm respond?" },
      { href: "/solutions#ai-workflows", label: "AI Workflow Automation" },
      { href: "/solutions#revenue-recovery", label: "Lead Follow-Up & Revenue Recovery" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
