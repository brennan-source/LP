---
name: web-dev
description: Makr website development on gomakr.ai (Next.js in the brennan-source/LP repository), covering new pages, landing pages, copy changes, design-system work, fixes, and checking and publishing safely. Use for any change to the website.
---

# Web development

Load the `makr-brand` skill first. Then read the repository's `CLAUDE.md` in full. It's the authority on the design system, file map and rules, and it wins over this skill where they differ.

## The site
- Repository: `brennan-source/LP`. The site lives in `agency/` (Next.js App Router, Tailwind v4, TypeScript).
- Content shared across pages is in `agency/src/lib/content.ts`. Prices are on `agency/src/app/pricing/page.tsx`.
- This Next.js version differs from older ones. Read `agency/node_modules/next/dist/docs/` before writing Next.js code.

## Design rules (summary; details in CLAUDE.md)
- Forest green is the only action color. Copper `#84592F` is for small labels, bright copper `#B87333` for lines, borders and the logo dot only, never for text.
- Headings: `font-display font-extrabold uppercase`. Section labels: the `.eyebrow` class.
- Cards: white, `rounded-xl`, bright-copper top strip. Buttons `rounded-md`.
- Text must pass WCAG 2.2 AA contrast (4.5:1 for normal text).
- Every sample business or number is labeled "Sample" and fictional.

## Workflow
1. Work on a branch, never directly on `main`.
2. Make the change, matching the surrounding code's style.
3. Check, from `agency/`:
   - `npx tsc --noEmit -p .` must be clean.
   - `npx next build` must succeed.
   - Look at the changed pages at laptop (1440px) and phone (390px) widths. No sideways scrolling.
4. Open a pull request with a plain summary and screenshots.
5. **Publishing:** Vercel deploys `main` to gomakr.ai automatically. Merge to `main` only when Brennan approves.

## Don't
- Don't add statistics, testimonials or client results that aren't verified (see `voice-and-claims.md`).
- Don't change prices without Brennan's approval, and keep `CLAUDE.md` and the `makr-brand` skill in step with any price change.
- Don't commit secrets or `.env` files.
