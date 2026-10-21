@AGENTS.md

# Makr — gomakr.ai — Project Context

This file captures everything a new Claude Code session needs to work on this codebase without losing context. Read it fully before touching any file.

---

## What Makr Is

Makr is an **AI Growth & Operations** agency for service businesses. The positioning: practical AI systems that help contractors and service businesses capture more revenue, automate operations, and build teams that use AI well. **Not** a SaaS product. Not a chatbot vendor. A managed service.

Three service pillars:
- **Grow** — Capture more revenue (AI receptionist, missed-call recovery, lead qualification, estimate follow-up, review generation, customer reactivation)
- **Operate** — Run a more efficient business (scheduling automation, billing workflows, CRM automation, back-office reporting)
- **Enable** — Build AI into your team (training, adoption, prompt frameworks, tool selection, quarterly reviews)

Three target markets:
- **Home Services** — HVAC, plumbing, roofing, electrical, restoration, landscaping, pest control
- **Professional Services** — Accounting, legal, consulting, engineering, architecture, financial advisory
- **Personal Services** — Dental, veterinary, med spa, wellness, fitness, beauty, senior services

Based in **New England**. This local angle matters — mention it where appropriate (about page, industries page, footer).

---

## Current Pricing (as of October 2026)

| Tier | Price | Notes |
|---|---|---|
| **Essentials** | $999/month | Core AI capture: receptionist, missed-call recovery, web lead capture, CRM sync, monthly report |
| **Growth** | $1,999/month | Flagship · Most Popular. Everything in Essentials + booking automation, estimate follow-up, review generation, scheduling workflows, dedicated account management, continuous optimization |
| **Implementation** | $2,500–$5,000 one-time | Applies to both retainers. Exact amount quoted after the free AI Opportunity Assessment, locked in writing before kickoff. Never leave this as open-ended. |
| **Projects** | $4,000–$10,000+ one-time | Scoped builds, no monthly commitment. CRM buildouts, AI receptionist setup, workflow automation. |
| **Enterprise** | Custom | Multi-location or complex operations. Scope after discovery. |

**Pricing rules:**
- Always show the implementation range ($2,500–$5,000), never just say "scoped per business"
- Growth always gets the green featured card treatment (bg-green-700, ring-2 ring-green-600, "Flagship · Most Popular" label)
- Essentials and Growth are the two retainers; Projects and Enterprise are one-time/custom

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
  pricing/page.tsx                  — Pricing page
  services/page.tsx                 — Services / three-pillar page
  industries/page.tsx               — Industries hub (alternating layout)
  industries/home-services/page.tsx — Home services sub-page
  industries/professional-services/page.tsx
  industries/personal-services/page.tsx
  about/page.tsx                    — About page
  contact/page.tsx                  — Contact form
  how-it-works/page.tsx             — Connected timeline (6 steps)
  insights/page.tsx                 — Resources/insights
  api/contact/route.ts              — Contact form API route
agency/src/components/
  Nav.tsx                           — Navigation component
agency/src/lib/
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
- The industries page uses an alternating two-column layout with oversized stat numbers (text-7xl/8xl) — not a flat card grid.
- How-it-works page uses a vertical connected timeline (6 steps with a connector line), not flat cards.
- Homepage pricing section shows only Essentials + Growth (2-card grid). Projects/Enterprise are on /pricing only.
- The `evidence.ts` source citations are all marked [VERIFY] and have not been confirmed. Do not add new statistics without noting they need verification.

---

## Contact Form

The contact form at `/contact` collects: name, business name, phone, email, service category (Home Services / Professional Services / Personal Services / Other), monthly revenue range, and message. There is no "free build" or "free trial" field — removed intentionally. The API route is at `agency/src/app/api/contact/route.ts`.

---

## What Still Needs Work (known gaps)

- `evidence.ts` — all 12 source citations marked [VERIFY]. Do not drive paid traffic until confirmed.
- `services/page.tsx` — may still use old palette or old pillar structure; verify before editing
- `about/page.tsx` — "Built in New England" section exists but may need prominence review
- `insights/page.tsx` — old palette, not updated to canvas/ink/brass system
- Contact API route — not verified against current form fields after recent form updates
