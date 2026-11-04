# Makr team plugin

Makr's AI team in one package. A shared brand brief keeps everything consistent, and six roles do the work:

| Role | Skill (works everywhere) | Agent (Cowork and Claude Code) | Use it for |
|---|---|---|---|
| Brand brief | `makr-brand` | — | Who Makr is, the four services, prices, markets, voice and claim rules. Every role loads it. |
| Strategy | `strategy` | `strategist` | Positioning, offers, pricing, which market next, go/no-go decisions |
| Research | `research` | `researcher` | Markets, competitors, buyer behavior, fact-checking, with every source graded |
| Marketing | `marketing` | `marketer` | Campaigns, landing-page briefs, ads, event promotion |
| Content | `content` | `content-writer` | Articles, FAQs, industry pages, LinkedIn, newsletters (SEO, AEO, GEO) |
| Outreach | `outreach` | `outreach-drafter` | Prospect research and email drafts. **Drafts only; nothing is sent without Brennan's approval.** |
| Web development | `web-dev` | `web-developer` | Changes to gomakr.ai, checked and handed off as a pull request |

## Set up: Brennan, in Cowork (business work)
1. In the Claude desktop app or claude.ai, open **Customize → Plugins**.
2. Choose **Add marketplace** and enter `brennan-source/LP`.
3. Install **makr-team**.
4. In Cowork, ask for work in plain language ("research HVAC competitors in the Merrimack Valley"), or call a role directly, such as `/makr-team:research` or `/makr-team:outreach`. The agents appear as `makr-team:researcher`, `makr-team:outreach-drafter` and so on.

A plugin installed on your Claude account also appears in Claude Code on your computer at its next start. In plain claude.ai chat, the skills load but the agents don't; use Cowork or Claude Code for agents.

## Set up: web developer, in Claude Code
1. **Access:**
   - GitHub: Brennan adds the developer as a collaborator on `brennan-source/LP`.
   - Claude: the developer needs Claude Code. On a Claude Team plan, Brennan assigns a seat that includes Claude Code (Settings → Members); otherwise the developer uses their own Claude Pro or Max account.
2. Clone the repository and start Claude Code in it. When Claude Code asks to trust the folder and install the **makr-team** plugin from the **makr** marketplace, accept. (`.claude/settings.json` declares both.) To install by hand instead:
   ```
   claude plugin marketplace add brennan-source/LP
   claude plugin install makr-team@makr
   ```
3. Read `CLAUDE.md` at the repository root: design system, file map, publishing rules.
4. Work on branches and open pull requests. `main` deploys to gomakr.ai automatically, so only merge with Brennan's approval.

Cloud sessions at claude.ai/code don't load locally installed plugins. They still read the repository's `CLAUDE.md`, which carries the same design and publishing rules.

## Keep it current
- **Prices or services change:** update `skills/makr-brand/services-and-pricing.md` and the root `CLAUDE.md` in the same commit.
- **Release a change:** bump `version` in `.claude-plugin/plugin.json`. Installed copies update from the marketplace (`/plugin` → update, or the Customize page).
- **Check before committing:** `claude plugin validate ./plugins/makr-team` and `claude plugin validate .` from the repository root.

## Privacy note
This repository is **public**, so anyone can read these files. Keep them to information that is already public (services, prices, voice). Put client names, pipeline notes, private strategy and prospect lists in Cowork or a private location, never here. To keep plugin files private, make the repository private or move the plugin to a private repository and update the marketplace source.
