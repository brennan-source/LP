@AGENTS.md

# Makr — gomakr.ai — Project Context

This file captures everything a new Claude Code session needs to work on this codebase without losing context. Read it fully before touching any file.

---

## What Makr Is

Brand name is **Makr** — not "Makr.ai" or "gomakr.ai" (gomakr.ai is only the domain).

Makr is a practical **growth and automation partner for owner-led businesses**. Central promise: Makr builds the digital systems that help growing businesses get found, capture more opportunities and operate with less manual work. Not a home-services-only agency, not a generic AI consultancy. AI is an enabling capability, not the product.

Four connected services (one operating system, not four businesses) — copy lives in `agency/src/lib/content.ts`:
- **Website Development & Management** — design, development, hosting, maintenance, ongoing management, landing pages, conversion improvements, integrations
- **Search Visibility & Content Marketing** — local and technical SEO, AEO (answer engine optimization), GEO (generative engine optimization / AI search), Google Business Profile and listings, industry content, digital marketing. Emphasis by industry is in `byIndustry` on the solution. Never promise rankings or AI mentions.
- **Lead Follow-Up & Revenue Recovery** — missed-call recovery, follow-up on unconverted leads, reactivation, review requests, reminders
- **AI Workflow Automation** — intake, routing, quoting support, document processing, customer communication, internal reporting

Five target markets: Home Services, Professional Services, Personal Services, Manufacturing, B2B Services.

Primary action site-wide: **Book a Growth Gap Review** (nav CTA: "Find Your Growth Gaps") → `/contact` form → Google Calendar booking page (`BOOKING_URL` in `agency/src/lib/site.ts`).

Based in **New England**. This local angle matters — mention it where appropriate (about page, industries page, footer).

---

## Current Pricing (confirmed by the owner, November 2026)

Priced per service, plus a discounted package for all four and an enterprise option. Lives in `agency/src/app/pricing/page.tsx`.

| Offer | One-time | Monthly |
|---|---|---|
| **Website Development & Management** | $2,000–$4,000 build (by complexity) | $299 management plan |
| **Search Visibility & Content Marketing** | $1,500 setup | $999 |
| **Lead Follow-Up & Revenue Recovery** | $1,500 setup | $999 |
| **AI Workflow Automation** | From $3,000 per workflow | $499 optional support |
| **Complete Growth System** (all four) | $6,000–$7,000 (vs. $8,000–$10,000 separately) | $2,299 (vs. $2,796 separately) |
| **Enterprise** | Projects from $7,500 | Custom |

**Pricing rules:**
- Monthly prices are fixed; one-time builds are quoted within the published range after the Growth Gap Review and locked in writing before kickoff
- Keep package savings consistent with the per-service prices if any number changes

**Contract and ownership terms (Brennan's decision, November 4, 2026):**
- Monthly services: 3-month minimum, then month-to-month. After the minimum, cancel with 30 days' written notice.
- Ownership: once the build fee is paid in full, the client owns the website. The client's domain, Google Business Profile, content and data are theirs too.
- These terms appear in the "Our terms" block on `/pricing`, on `/switching`, in the industry-page offer blocks and in the articles. Change them everywhere together, plus `plugins/makr-team/skills/makr-brand/services-and-pricing.md`.

---

## Tech Stack

- **Framework**: Next.js (App Router) — read `node_modules/next/dist/docs/` before writing any Next.js code; this version may differ from training data
- **Styling**: Tailwind v4 — uses `@import "tailwindcss"` + `@theme` directive in `agency/src/app/globals.css`. No `tailwind.config.js`. Token values defined in `@theme` block.
- **Fonts**: Barlow + Barlow Condensed via `next/font/google`. `font-display` class = Barlow Condensed. Both loaded in `agency/src/app/layout.tsx`.
- **App directory**: `agency/src/app/`
- **Components**: `agency/src/components/`

---

## Design System — Color Tokens

Defined in `agency/src/app/globals.css` under `@theme` (live values, checked November 2026):

```css
--color-canvas: #EEECE5        /* stone — primary page background, section differentiation */
--color-canvas-warm: #FAF9F5   /* warm white — secondary backgrounds */
--color-ink: #19211C           /* near-black — headings, body text */
--color-ink-mid: #566058       /* muted green-grey — secondary text (AA on white, warm white, stone) */
--color-ink-light: #626B64     /* captions, sources (AA on stone and lighter) */
--color-brass: #84592F         /* same value as copper — use for borders and backgrounds */
--color-brass-light: #D8D6CE   /* warm neutral — card borders and dividers */
--color-copper: #84592F        /* small label text only (passes AA) */
--color-copper-bright: #B87333 /* lines, borders, logo dot, active nav underline — NEVER text */
--color-sage: #DCE7DE          /* soft green background */
/* green-50…green-900 are overridden with the forest-green scale; green-700 #076B3A is the action color */
```

### Text color rules — CRITICAL

- **Never use `text-brass`, `text-brass-light` or `text-copper-bright` as text colors.** Brass tokens are for borders (`border-brass`, `border-brass-light`) and backgrounds only. (Historically `text-brass` rendered as a hard-to-read pink/peach; `copper-bright` fails contrast.)
- **Copper label text** (section labels, small numbered labels) uses the `.eyebrow` class or `text-copper`. This is the one approved copper text color.
- Body and secondary text → `text-ink` / `text-ink-mid`
- Source citations and captions → `text-xs text-ink-light`
- Text on dark (ink/green) backgrounds → `text-white`, `text-canvas-warm` or `text-green-100`; labels on green-900 use `.eyebrow eyebrow-on-dark` (#E2C49C)
- Decorative numbers → `text-ink-light` or `text-copper`

### Approved color usage patterns

```
bg-canvas           — primary page sections
bg-white            — card interiors, alternate sections
bg-canvas-warm      — secondary card backgrounds
bg-ink              — dark sections, footer, CTA buttons
bg-green-700        — primary action buttons, featured card
bg-green-800        — bridge sections, dark accents
bg-green-900        — bottom CTA sections
border-brass-light  — card borders, dividers (fine)
border-brass        — hover borders, left-accent borders (fine)
border-l-4 border-green-700  — pillar/capability cards
border-l-[3px] border-copper-bright — FAQ items, problem lists, quotes
```

---

## Design System — November 2026 redesign (Concept 5, "house colors")

Supersedes older color guidance below where they conflict. Tokens live in `agency/src/app/globals.css`.

- **Forest green is the only action color**: primary buttons, the second line of the hero headline, checkmarks, status chips. Don't use it for decoration.
- **Copper has two shades.** `copper` (#84592F) is for small label text only (passes AA). `copper-bright` (#B87333) is for lines, borders, the logo dot and the active nav underline only. Never use `copper-bright` for text: it fails contrast.
- **Section labels** use the `.eyebrow` class (small copper caps with a bright-copper rule). Use `.eyebrow eyebrow-on-dark` on green-900 bands.
- **Headings**: `font-display font-extrabold uppercase` (Barlow Condensed) with tight leading (`leading-[0.92]`–`[0.95]`). `PageHeader` and `SectionIntro` in `sections.tsx` already do this.
- **Cards**: white, `border-brass-light`, `rounded-xl`, with a `border-t-[3px] border-t-copper-bright` top strip. List items and FAQ use a copper-bright left border.
- **Dark bands**: `bg-green-900` with labels in #E2C49C and body text in green-100.
- **Font loading**: the Barlow font variables must sit on `<html>` (see `layout.tsx`), or `font-display` silently falls back to regular Barlow.
- **Homepage structure**: hero + `IndustrySwitcher` (tabs, sample weekly reports from `SAMPLE_REPORTS` in `content.ts`) → owner-type band → `SelfCheck` → four service cards → promises → founder note (first person, no photo or initials) → `CtaBand`.
- **Industry pages** (`IndustryDetail`) take a `reportKey` to show the matching sample week. Every sample report is labeled "Sample" and is for a fictional business.
- Pricing is still not in the main nav (October 2026 decision).

## Layout & Component Patterns

- **Corner radius**: buttons `rounded-md`, cards `rounded-xl` (November 2026 redesign; replaces the old `rounded-sm`-only rule).
- **Card left-border accent**: `border-l-4 border-{color} rounded-sm bg-white` — used for pillars, decision cards, capability cards
- **Section eyebrow**: the `.eyebrow` class (copper #84592F caps with a bright-copper rule), as in the November 2026 redesign above. Plain `text-xs font-bold uppercase tracking-widest text-ink-mid` is fine for in-card field labels (e.g. "One-time", "Monthly").
- **Display headings**: `font-display font-extrabold` (Barlow Condensed) for hero/section headlines
- **Body headings**: `font-display font-bold` for section titles
- **Source/caption text**: `text-xs text-ink-light` — never text-brass
- **Featured pill**: `text-xs font-bold uppercase tracking-widest` inside a colored bg div
- **Max widths**: `max-w-6xl mx-auto` for full-width sections, `max-w-3xl mx-auto` for text-heavy sections
- **Section padding**: `py-16 px-6` standard, `py-20 px-6` generous, `py-24 px-6` hero/CTA
- **Nav**: `<Nav />` from `@/components/Nav` — always the first child in the page div

---

## File Map

```
agency/src/app/
  page.tsx                          — Homepage
  globals.css                       — Tailwind v4 theme tokens
  layout.tsx                        — Root layout, font loading, metadata
  pricing/page.tsx                  — Pricing page (linked from footer/solutions, not the nav)
  solutions/page.tsx                — Four services (/services 308-redirects here)
  industries/page.tsx               — Industries hub, all five markets (alternating layout)
  industries/home-services/page.tsx — Home services sub-page (trades campaign copy, offer, FAQ)
  industries/law-firms/page.tsx     — Small law firms (2–20 lawyers); linked from the hub and professional services
  industries/professional-services/page.tsx
  industries/personal-services/page.tsx
  about/page.tsx                    — About page
  contact/page.tsx                  — Contact form
  how-it-works/page.tsx             — Connected timeline (4 steps: Diagnose, Build, Connect, Improve)
  manufacturing-growth-checkup/     — Event landing page + form (Mash-Up, Oct 27 2026)
  api/checkup/route.ts              — Manufacturing checkup form API
  sitemap.ts                        — sitemap.xml
  insights/page.tsx                 — Insights index (house design), grouped by market
  insights/[slug]/page.tsx          — Article template: FAQPage + Article JSON-LD, sources, related links, CTA
  switching/page.tsx                — Switching-from-a-locked-in-vendor checklist (FAQPage JSON-LD)
  api/contact/route.ts              — Contact form API route
  favicon.ico, apple-icon.png       — Browser and Apple touch icons (App Router file conventions)
  manifest.ts                       — Web app manifest; icons in agency/public/brand/makr-icon-192/512.png
agency/public/brand/                — Approved wordmark (direction B, Nov 2026): makr-wordmark-on-light.svg (Nav), makr-wordmark-on-dark.svg (Footer)
agency/src/components/
  Nav.tsx                           — Navigation (Home, Solutions, Industries, How It Works, About, Contact)
  Footer.tsx                        — Shared footer
  sections.tsx                      — PageHeader, SolutionCards, IndustryList, ProcessGrid, CtaBand
  IndustryDetail.tsx                — Layout for /industries/* sub-pages; optional kicker, evidence, howWeWork, offer, faqs
  Prose.tsx                         — Markdown-subset renderer for long-form copy, FaqList, faqSchema()
  forms.tsx                         — Shared form fields, tracking, post-submit scheduler redirect
  Analytics.tsx                     — GA4 loader + data-cta click tracking
agency/src/lib/
  site.ts                           — Brand name, URLs, BOOKING_URL, GA_ID (NEXT_PUBLIC_GA_ID)
  content.ts                        — Shared copy: solutions, industries, problems, process
  analytics.ts                      — track(): cta_click, form_start, form_submit, schedule_click
  leads.ts                          — Lead notification email via Resend, incl. "Lead source" lines
  attribution.ts                    — UTM source/medium/campaign, landing page and referrer per session
  insights.ts                       — The six articles (copy from the approved drafts) and their sources
  evidence.ts                       — Source citations (all marked [VERIFY] — not verified for paid traffic)
```

---

### Retired pages (November 2026)

`/preview/[slug]` (free-website previews, 4-month agreement, rankings language) and `/growth-score` (plus its report pages, API routes, components and `lib/growth-score`) were removed. `next.config.ts` 308-redirects `/preview/*` and `/growth-score/*` to `/contact`. Don't bring back free builds, trials or ranking reports. The Prisma schema and dependencies that only served Growth Score are still in `agency/`; remove them in a separate change. `/demo/[slug]` and `/postcard-preview` still carry the old free-website offer and are unlinked; they need Brennan's decision.

---

## Publishing Workflow — Important

Vercel deploys the `main` branch to gomakr.ai automatically. Anything merged to `main` goes live within a few minutes.

1. Branch from the latest `main` (`git fetch origin main && git checkout -b <branch> origin/main`).
2. Make the change. From `agency/`, run `npx tsc --noEmit -p .` and `npx next build`; both must pass. Check changed pages at 1440px and 390px wide.
3. Push the branch and open a pull request with a plain summary and screenshots.
4. Merge to `main` only when Brennan approves. Vercel posts deployment status on the commit.

Branch `claude/optimistic-albattani-1uf2Y` is stale (cut from an older `main`); ignore it.

---

## AI Team (Claude plugin)

The `makr-team` plugin in `plugins/makr-team/` holds Makr's shared brand brief plus strategy, research, marketing, content, outreach and web-dev skills and agents. The repository root is also the plugin marketplace (`.claude-plugin/marketplace.json`, name `makr`), and `.claude/settings.json` offers the plugin to anyone who opens this repo in Claude Code. Setup steps for Cowork and Claude Code are in `plugins/makr-team/README.md`.

- **Web developer agent:** `.claude/agents/web-developer.md` loads in every Claude Code session on this repo, including cloud sessions. It works on a branch, runs the checks, opens a pull request and never merges to `main` without Brennan's explicit approval.

- When prices or services change, update `plugins/makr-team/skills/makr-brand/services-and-pricing.md` in the same commit as this file.
- This repository is public. Never put client names, prospect lists, pipeline notes or private strategy in the plugin or anywhere in this repo.

---

## Messaging Rules

| Instead of | Use |
|---|---|
| "We build AI" | "We help contractors capture more revenue" |
| "AI-powered workflows" | "Save hours every week" |
| "We automate businesses" | "We eliminate repetitive office work" |
| "AI receptionist" (as brand identity) | "AI Revenue Operations" / "capture more leads" |
| Feature lists first | Outcome statements first, features second |
| "AI-powered X" | Just "X" or "automated X" |

**Brand voice**: Direct, contractor-friendly, no hype. Write like a trusted advisor who charges real money and delivers real results. Never claim outcomes Makr hasn't produced. Never add case studies, testimonials, or performance guarantees that don't already exist on the site.

**Local positioning**: "Built in New England. Serving contractors and service businesses across Massachusetts, New Hampshire, and beyond." — use on about page, industries page ribbon, and footer.

---

## Key Decisions Made (don't re-litigate)

- Pricing is public and fixed. This is intentional positioning — contractors shouldn't need a sales call to know if it fits their budget.
- The pillar coverage matrix (Grow/Operate/Enable checkboxes) was removed from the pricing page and replaced with "Which tier fits your situation?" decision cards. Keep it this way.
- Corner radius changed in the November 2026 redesign: `rounded-md` buttons, `rounded-xl` cards.
- Brass tokens are for decoration only (borders, backgrounds). This decision was made after seeing text-brass render as pink/peach on screen.
- The industries page uses an alternating two-column layout — not a flat card grid. Unverified stats were removed in the October 2026 repositioning; don't add statistics back until verified.
- How-it-works page uses a vertical connected timeline (4 steps with a connector line), not flat cards.
- Homepage has no pricing section and Pricing is not in the nav (October 2026 decision). /pricing stays public, linked from the footer and Solutions page.
- The `evidence.ts` source citations are all marked [VERIFY] and have not been confirmed. Do not add new statistics without noting they need verification.

---

## Contact Form

The contact form at `/contact` collects: name, business name, phone, email, business type (five markets + Other), industry/trade (free text), optional annual revenue, optional "where do you want help first", optional website and message. After submit it redirects to the booking calendar. There is no "free build" or "free trial" field — removed intentionally. The API route is at `agency/src/app/api/contact/route.ts`.

Lead source: `Analytics.tsx` stores the UTM tags (`utm_source`, `utm_medium`, `utm_campaign`), the landing page and the referrer for the browser session (`lib/attribution.ts`). `submitLead()` in `forms.tsx` adds them to every form payload, and both lead APIs add a "Lead source" block to the notification email. Tag campaign links with UTMs so leads can be traced.

---

## What Still Needs Work (known gaps)

- `evidence.ts` — all 12 source citations marked [VERIFY]. Do not drive paid traffic until confirmed.
- `resources/page.tsx` — old palette and home-services-focused content; not linked from nav/footer
- Website services are not reflected in /pricing tiers yet
- GA4 needs `NEXT_PUBLIC_GA_ID` set in Vercel before analytics collects anything
