# Makr team plugin

Makr's AI team in one package. A shared brand brief keeps everything consistent, and eight roles do the work:

| Role | Skill (works everywhere) | Agent (Cowork and Claude Code) | Use it for |
|---|---|---|---|
| Brand brief | `makr-brand` | — | Who Makr is, the four services, prices, markets, voice and claim rules. Every role loads it. |
| Strategy | `strategy` | `strategist` | Positioning, offers, pricing, which market next, go/no-go decisions |
| Research | `research` | `researcher` | Markets, competitors, buyer behavior, fact-checking, with every source graded |
| Marketing | `marketing` | `marketer` | Campaigns, landing-page briefs, ads, event promotion |
| Content | `content` | `content-writer` | Articles, FAQs, industry pages, LinkedIn, newsletters (SEO, AEO, GEO) |
| Outreach | `outreach` | `outreach-drafter` | Prospect research and email drafts. **Drafts only; nothing is sent without Brennan's approval.** |
| Design and brand review | `design` | `designer` | Makr design system, social graphics, ad creative, mockups, flyers, email templates; final brand check of every finished piece |
| House editing | `editor` | `editor` | Makes every piece sound like Brennan, owner to owner, never like AI; keeps the house style and approved outreach style |
| Web development | `web-dev` | `web-developer` | Changes to gomakr.ai, checked and handed off as a pull request (runs in Claude Code) |

## Set up: Brennan, in Cowork (business work)
1. In the Claude desktop app or claude.ai, open **Customize → Plugins**.
2. Choose **Add marketplace** and enter `brennan-source/LP`.
3. Install **makr-team**.
4. In Cowork, ask for work in plain language ("research HVAC competitors in the Merrimack Valley"), or call a role directly, such as `/makr-team:research` or `/makr-team:outreach`. The agents appear as `makr-team:researcher`, `makr-team:outreach-drafter` and so on.

In Claude Code you can also install it in one step: `/plugin install makr-team --marketplace brennan-source/LP`.

A plugin installed on your Claude account also appears in Claude Code on your computer at its next start. In plain claude.ai chat, the skills load but the agents don't; use Cowork or Claude Code for agents.

## Use the web developer agent (Claude Code)
Website changes need commands and Git, which Cowork can't run, so the web developer agent works in **Claude Code**. Either place works:

- **On your computer:** the **Code** tab in the Claude desktop app. Open the folder where `brennan-source/LP` is cloned. If Claude Code offers the **makr-team** plugin from the **makr** marketplace, accept.
- **In the cloud:** start a session at claude.ai/code with the `brennan-source/LP` repository. Nothing to install.

Then ask in plain language, for example "Use the web-developer agent to add an FAQ section to the pricing page." The agent:
1. reads `CLAUDE.md` and the brand brief
2. makes the change on a branch
3. runs the type check and production build, and screenshots the pages at laptop and phone width
4. opens a pull request for you to review

**It never publishes on its own.** Merging to `main` puts changes live on gomakr.ai, so it waits for your explicit go-ahead.

There are two copies of this agent. The repository's own copy (`.claude/agents/web-developer.md`) loads in every Claude Code session on this repository, including cloud sessions, which don't load plugins. The plugin copy (`makr-team:web-developer`) is there wherever the plugin is installed. Both follow the same rules.

If you bring on a human developer later: add them as a GitHub collaborator, give them Claude Code access (a Team plan seat that includes Claude Code, or their own Pro or Max account), and point them to `CLAUDE.md`. The same agent and rules apply to them.

## Keep it current
- **Prices or services change:** update `skills/makr-brand/services-and-pricing.md` and the root `CLAUDE.md` in the same commit.
- **Release a change:** bump `version` in `.claude-plugin/plugin.json`. Installed copies update from the marketplace (`/plugin` → update, or the Customize page).
- **Check before committing:** `claude plugin validate ./plugins/makr-team` and `claude plugin validate .` from the repository root.

## Privacy note
This repository is **public**, so anyone can read these files. Keep them to information that is already public (services, prices, voice). Put client names, pipeline notes, private strategy and prospect lists in Cowork or a private location, never here. To keep plugin files private, make the repository private or move the plugin to a private repository and update the marketplace source.
