---
name: design
description: Makr design and brand review covering the visual identity (colors, type, logo use, components), social graphics, ad creative, landing-page mockups, flyers, email and newsletter templates, one-pagers and slides, plus a final brand check of any finished Makr piece. Use when something Makr publishes needs to look like Makr, or before any piece is called finished.
---

# Design and brand review

Load the `makr-brand` skill first. This skill covers two jobs: making Makr visuals, and checking that finished work is on brand.

## Where Makr's look comes from
1. **The website is the source of truth.** The gomakr.ai design system lives in the `brennan-source/LP` repository: read its `CLAUDE.md` and the shared styles and components it points to (Tailwind config, global CSS, layout and UI components). Take colors, fonts, spacing, radius, button and card styles from there. Never invent a palette.
2. **The Makr Design System artifact.** When this session's Artifact tool offers a Design System type, record Makr's identity there once (tokens, type scale, logo rules, components, example layouts) and use it for every later piece. Check `list_artifacts` with that type first; if a Makr design system already exists, use it rather than making another.
3. **Brand assets Brennan supplies** (logo files, Canva brand kit, photos) override anything inferred. If the repository and a supplied asset disagree, flag it to Brennan.
4. If none of these is available, say so and ask for the repository or the assets before producing finished visuals. Rough concepts labeled "concept, not final brand" are fine.

## Making visuals
- **Where to build:** use the Design artifact type for posters, flyers, social posts, ads, landing-page mockups and email templates when the session offers it; the Slides type for decks; the Docs type for one-pagers that are mostly text. Produce a file (PNG, PDF, PPTX) only when Brennan names that format or a channel needs it, and save it in the matching subfolder of the Makr folder (`Marketing/`, `Content/`, `Outreach/`).
- **One idea per visual.** One headline in the owner's words, one supporting line, one call to action ("Find Your Growth Gaps" or "Book a free Growth Gap Review").
- **Formats to cover by default:** LinkedIn feed 1200×1200 and 1200×627, LinkedIn/Meta ad 1080×1080 and 1200×628, Instagram story 1080×1920 if requested, US Letter flyer, 600px-wide email header.
- **Readable on a phone:** owners read between jobs and patients. Large type, strong contrast (WCAG AA 4.5:1 for body text), no more than about 20 words on a social graphic.
- **Imagery:** real-looking work settings for the market (a shop floor, a dental operatory, a service van), never stock clichés of robots, glowing brains or "AI" circuitry. Don't show identifiable real people or real client logos without Brennan's written OK. No copyrighted characters or other brands' marks.
- **Samples are labeled.** Any mock report, dashboard, number or screenshot of a "client" result is marked clearly as a sample for a fictional business, on the visual itself.
- **Hand-off notes:** for each visual, list the copy, the size, the channel, the alt text, and the UTM-tagged link it should point to.

## Brand review (run before any piece is called finished)
Check each item and report pass / fix needed, with the exact fix:
1. **Name:** "Makr", never "Makr.ai" or "MAKR". gomakr.ai only as the web address.
2. **Voice:** plain, direct, outcome first; the buyer's words; none of the banned words in `voice-and-claims.md` ("leverage", "unlock", "AI-powered", "game-changer", "synergy").
3. **Claims:** no invented results, testimonials or reviews; samples labeled; no guarantees of rankings, AI mentions, leads or revenue; every market statistic has a cited source with a strength grade, and vendor figures are framed as directional.
4. **Offer and prices:** only what's in `services-and-pricing.md`; no discounts, trials or free builds; the call to action is the Growth Gap Review.
5. **Visual consistency:** colors, fonts and components match the Makr design system; logo used correctly; contrast passes.
6. **Market fit:** one market, one pain, written in that market's words (`markets.md`); local references are real, not invented.
7. **Outreach safety:** drafts only; no implied relationship, referral or past conversation; an opt-out line in cold email.
8. **Accessibility:** alt text on images, readable sizes, links that say where they go.

Fix what you can directly. Anything that needs Brennan's decision goes in a short "needs Brennan" list.
