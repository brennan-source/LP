---
name: outreach
description: Makr outreach covering prospect lists, research on a specific business, personalized first emails, follow-up sequences, LinkedIn messages and event follow-ups. Drafts only; nothing is sent without Brennan's approval. Use when preparing to contact owners.
---

# Outreach

Load the `makr-brand` skill first.

## The rule that overrides everything
**Draft, never send.** Prepare messages for Brennan to review and send. Don't send emails, connection requests or messages, and don't schedule them, unless Brennan explicitly approves that specific message in the current conversation. Anything sent is public and permanent.

## Finding and qualifying prospects
- Fit: owner-led, 5–100 employees, in one of the five markets, in or near New England.
- Use only public business information: website, Google Business Profile, reviews, LinkedIn company pages, association directories.
- Note one real, specific, observable thing about the business, such as no online booking, slow site on mobile, few recent reviews, or RFQ form buried. That observation is the reason for writing.
- **Verify every observation in a real browser before it goes in a draft.** Load the page the way a visitor would (the built-in browser, Claude in Chrome, or Playwright), at desktop width and at phone width (about 390px), and wait for scripts to finish. Click the button or link you're describing and see what actually happens. Reading raw HTML or a fetched copy is not enough: hidden elements, placeholder links (`#`) wired up by scripts, and pop-up widgets look broken in the code but work for visitors, or never show at all. If you can't load the page in a browser, mark the observation "unverified" and don't use it as the opener.
- Record for each observation: the exact URL, the date checked, desktop/phone, and what a visitor sees or what happened when you clicked. Prefer observations the owner can confirm in ten seconds on their own phone.
- Never claim something is missing (no form, no email, no booking) unless you checked the contact page, the home page, the header, the footer and the main menu. When a site already does something well, open with that genuine positive instead of inventing a gap.
- Re-check the observation on the day the message is sent; sites change.
- **No links in Gmail drafts created through the connector.** The Gmail connector rewrites every web address (linked or plain text) into a google.com redirect when it saves a draft. Leave web addresses out of the body and signature. The link to www.gomakr.ai comes from Brennan's Gmail signature, added when he sends, or he types it himself. Never let a redirect reach a prospect. If a follow-up must point to the booking page, write the draft without the link and flag it for Brennan to add.
- Don't collect personal information beyond business contact details, and respect opt-outs and do-not-contact lists.

## Writing the first message
- 60–120 words. Subject line under 7 words, specific, no clickbait.
- Open with the real observation about their business, not a compliment or "hope you're well."
- One sentence on what Makr does that relates to it.
- One easy ask: a free 20-minute Business Growth Assessment, or a yes/no question.
- Sign as Brennan, with Makr, Westford MA, and gomakr.ai.
- Never imply a referral, relationship or past conversation that didn't happen. No fake "re:" or "following up" on a first message.

## Follow-ups
Two follow-ups at most, about 4 and 10 days apart, each adding something useful (a relevant tip or a sample from the site), then stop. Honor any reply asking to stop.

## Compliance basics (US)
Commercial email needs an accurate sender and a non-deceptive subject. Brennan has decided (Nov 6, 2026) that Makr emails carry no separate opt-out line and no street address (town and state only, via his Gmail signature). The opt-out is built into the closing ask: "If it's not a fit, no hard feelings, and if you'd rather I not follow up, just say so." Never add a street address. Anyone who replies asking not to be contacted is removed the same day. Flag anything outside the US for Brennan, since rules differ.

## Output
For each prospect: business, why they fit, the observation (with where you saw it), the draft email, and follow-up drafts. Put them in a table or document for review.
