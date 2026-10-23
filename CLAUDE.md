@AGENTS.md

# Makr — gomakr.ai — Project Context

This file captures everything a new Claude Code session needs to work on this codebase without losing context. Read it fully before touching any file.

---

## What Makr Is

Brand name is **Makr** — not "Makr.ai" or "gomakr.ai" (gomakr.ai is only the domain).

Makr is a practical **growth and automation partner for owner-led businesses**. Central promise: Makr builds the digital systems that help growing businesses get found, capture more opportunities and operate with less manual work. Not a home-services-only agency, not a generic AI consultancy. AI is an enabling capability, not the product.

Three connected services (one operating system, not three businesses) — copy lives in `agency/src/lib/content.ts`:
- **Website Development & Care** — design, development, maintenance, landing pages, conversion improvements, integrations
- **Lead Follow-Up & Revenue Recovery** — missed-call recovery, follow-up on unconverted leads, reactivation, review requests, reminders
- **AI Workflow Automation** — intake, routing, quoting support, document processing, customer communication, internal reporting

Five target markets: Home Services, Professional Services, Personal Services, Manufacturing, B2B Services.

Primary action site-wide: **Book a Growth Gap Review** (nav CTA: "Find Your Growth Gaps") → `/contact` form → Google Calendar booking page (`BOOKING_URL` in `agency/src/lib/site.ts`).

Based in **New England**. This local angle matters — mention it where appropriate (about page, industries page, footer).

---

## Current Pricing (as of October 23, 2026)

Priced per service, plus a discounted package for all three and an enterprise option. Lives in `agency/src/app/pricing/page.tsx`.

| Offer | One-time | Monthly |
|---|---|---|
| **Website Development & Care** | $2,000–$4,000 build (by complexity) | $299 care plan |
| **Lead Follow-Up & Revenue Recovery** | $1,500 setup | $999 |
| **AI Workflow Automation** | From $3,000 per workflow | $499 optional support |
| **Complete Growth System** (all three) | $5,500–$7,500 (vs. $6,500–$8,500 separately) | $1,499 (vs. $1,797 separately) |
| **Enterprise** | Projects from $7,500 | Custom |

**Pricing rules:**
- Monthly prices are fixed; one-time builds are quoted within the published range after the Growth Gap Review and locked in writing before kickoff
- Keep package savings consistent with the per-service prices if any number changes

---

## Tech Stack

- **Framework**: Next.js (App Router) — read `node_modules/next/dist/docs/` before writing any Next.js code; this version may differ from training data
- **Styling**: Tailwind v4 — uses `@import "tailwindcss"` + `@theme` directive in `agency/src/app/globals.css`. No `tailwind.config.js`. Token values defined in `@theme` block.
- **Fonts**: Barlow + Barlow Condensed via `next/font/google`. `font-display` class = Barlow Condensed. Both loaded in `agency/src/app/layout.tsx`.
- **App directory**: `agency/src/app/`
- **Components**: `agency/src/components/`

---

## Design System — Color Tokens

Defined in `agency/src/app/globals.css` under `@theme`:

```css
--color-canvas: #EDEBE4        /* warm limestone — primary page background */
--color-canvas-warm: #F5F3EE   /* slightly warmer canvas — secondary backgrounds */
--color-ink: #1C231E           /* near-black — headings, body text */
--color-ink-mid: #4A5548       /* mid-tone green-grey — secondary text */
--color-ink-light: #8A9490     /* light grey-green — captions, sources, tertiary */
--color-brass: #7A6344         /* warm brown — BORDERS AND BACKGROUNDS ONLY */
--color-brass-light: #EAE0D0   /* pale cream — BORDERS AND BACKGROUNDS ONLY */
```

### THE BRASS RULE — CRITICAL

**`text-brass` and `text-brass-light` must never be used as text colors.** Brass tokens are for borders (`border-brass`, `border-brass-light`) and backgrounds (`bg-brass`, `bg-brass-light`) only. On screen, `text-brass` reads as a warm pink/peach that is hard to read and off-brand.

Instead:
- Source citations, captions, labels → `text-ink-light`
- Section eyebrows, step names → `text-ink-mid`
- Text on dark (ink/green) backgrounds → `text-white` or `text-canvas-warm`
- Decorative numbers → `text-ink-light`

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
border-l-2 border-brass      — FAQ items, problem lists
```

---

## Layout & Component Patterns

- **Corner radius**: `rounded-sm` everywhere. Never `rounded-lg` or `rounded-xl` on cards.
- **Card left-border accent**: `border-l-4 border-{color} rounded-sm bg-white` — used for pillars, decision cards, capability cards
- **Section eyebrow**: `text-xs font-bold uppercase tracking-widest text-ink-mid` — labels like "Monthly retainers", "One-time & custom"
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
  solutions/page.tsx                — Three services (/services 308-redirects here)
  industries/page.tsx               — Industries hub, all five markets (alternating layout)
  industries/home-services/page.tsx — Home services sub-page
  industries/professional-services/page.tsx
  industries/personal-services/page.tsx
  about/page.tsx                    — About page
  contact/page.tsx                  — Contact form
  how-it-works/page.tsx             — Connected timeline (4 steps: Diagnose, Build, Connect, Improve)
  manufacturing-growth-checkup/     — Event landing page + form (Mash-Up, Oct 27 2026)
  api/checkup/route.ts              — Manufacturing checkup form API
  sitemap.ts                        — sitemap.xml
  insights/page.tsx                 — Resources/insights
  api/contact/route.ts              — Contact form API route
agency/src/components/
  Nav.tsx                           — Navigation (Home, Solutions, Industries, How It Works, About, Contact)
  Footer.tsx                        — Shared footer
  sections.tsx                      — PageHeader, SolutionCards, IndustryList, ProcessGrid, CtaBand
  IndustryDetail.tsx                — Layout for /industries/* sub-pages
  forms.tsx                         — Shared form fields, tracking, post-submit scheduler redirect
  Analytics.tsx                     — GA4 loader + data-cta click tracking
agency/src/lib/
  site.ts                           — Brand name, URLs, BOOKING_URL, GA_ID (NEXT_PUBLIC_GA_ID)
  content.ts                        — Shared copy: solutions, industries, problems, process
  analytics.ts                      — track(): cta_click, form_start, form_submit, schedule_click
  leads.ts                          — Lead notification email via Resend
  evidence.ts                       — Source citations (all marked [VERIFY] — not verified for paid traffic)
```

---

## Push Workflow — Important

**All changes go through `mcp__github__push_files` directly to the `main` branch on GitHub.** Do not use local git commands to push — the local working tree in remote sessions is always stale and will show "uncommitted changes" in git status. This is expected and can be ignored.

Process:
1. Fetch the current file from GitHub with `mcp__github__get_file_contents` (ref: `refs/heads/main`)
2. Make your changes
3. Push with `mcp__github__push_files` to branch `main`
4. Vercel auto-deploys from `main` → gomakr.ai

**Never push to a feature branch and expect it to appear on the live site.** Vercel deploys only from `main`.

There is also a branch `claude/optimistic-albattani-1uf2Y` — this is stale and was cut from an older state of main. Ignore it. All work goes to main.

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
- `rounded-sm` not `rounded-lg` — sharp corners are part of the brand aesthetic.
- Brass tokens are for decoration only (borders, backgrounds). This decision was made after seeing text-brass render as pink/peach on screen.
- The industries page uses an alternating two-column layout — not a flat card grid. Unverified stats were removed in the October 2026 repositioning; don't add statistics back until verified.
- How-it-works page uses a vertical connected timeline (4 steps with a connector line), not flat cards.
- Homepage has no pricing section and Pricing is not in the nav (October 2026 decision). /pricing stays public, linked from the footer and Solutions page.
- The `evidence.ts` source citations are all marked [VERIFY] and have not been confirmed. Do not add new statistics without noting they need verification.

---

## Contact Form

The contact form at `/contact` collects: name, business name, phone, email, business type (five markets + Other), industry/trade (free text), optional annual revenue, optional "where do you want help first", optional website and message. After submit it redirects to the booking calendar. There is no "free build" or "free trial" field — removed intentionally. The API route is at `agency/src/app/api/contact/route.ts`.

---

## What Still Needs Work (known gaps)

- `evidence.ts` — all 12 source citations marked [VERIFY]. Do not drive paid traffic until confirmed.
- `insights/page.tsx` — old palette, not updated to canvas/ink/brass system
- `resources/page.tsx` — old palette and home-services-focused content; not linked from nav/footer
- Website services are not reflected in /pricing tiers yet
- GA4 needs `NEXT_PUBLIC_GA_ID` set in Vercel before analytics collects anything
