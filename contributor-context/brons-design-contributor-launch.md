# Bron's design contributor — launch (Claude-driven)

_Customer-friendly launch wrapper for the design-contributor tier on
brons-beach. Mirrors the PAL canonical at
`port-a-local/Port A Local/Memory/contributor-context/pal-design-contributor-launch.md`._

_Second canonical use of the design-contributor launch pattern.
First use: Collie Farley → PAL, 2026-05-07._

---

## What's in the email Collie receives

The contributor receives a single email containing:

1. A pre-flight checklist (5 lines — accounts she needs to have)
2. A 4-line setup sequence
3. A prompt to paste into Claude on her Mac
4. A "what to expect" summary

That's it. **No bash commands she has to type herself.** Claude on her Mac
runs anything technical via tool calls; she sees a chat conversation, not
a Terminal.

## The pre-flight (what she needs ready)

- Her own GitHub login (`colliebreah`, with 2FA device — already set up
  from PAL launch)
- Her Anthropic Claude login (already set up from PAL launch)
- ~20 minutes uninterrupted (faster than first time — tools are already
  installed from PAL launch)
- The same Mac she launched PAL on

She does NOT need:
- A Vercel account (PR previews work via Winston's Vercel project, not hers)
- Any `.env` file or secret-handling
- Any workspace-memory hydration (scoped tier)
- Any new Anthropic / GitHub / Claude setup — all carries from PAL launch

## The launch sequence (what she does)

Faster than her PAL launch because tools are already installed:

1. Open Claude on her Mac (already in Applications from PAL launch)
2. In a new chat with Projects folder already selected, paste the prompt
   below

That's it.

## The prompt she pastes

```
I'm Collie, joining the Bron's Beach project as a design contributor.

This is my second HeyeLab tenant — I already launched on Port A Local
(PAL) on 2026-05-07. Same Mac, same GitHub (colliebreah), same Claude
account. Tools already installed.

My GitHub account is colliebreah. I've already been added as a
collaborator on haveebot/brons-beach. I make brand / design / copy /
styling changes — not backend, not auth, not API code.

The contributor-context for this repo is at:
github.com/haveebot/brons-beach → contributor-context/README.md

Walk me through it in plain English — no jargon dumps, no Terminal-speak.
If something needs me to type or click, tell me clearly what and where.

Steps to do, in order:
1. Clone haveebot/brons-beach into ~/Projects/brons-beach (sibling of
   ~/Projects/port-a-local). Tools should already be installed from my
   PAL launch — if anything's missing, install quietly via your tools.
2. Read the contributor-context/ folder so you have my scope, brand
   system, and the HeyeLab tenant context.
3. Help me open my first PR — adding myself to a CONTRIBUTORS.md file at
   the root of the brons-beach repo with a one-line bio (or update the
   existing PAL bio if I want to reuse it).
4. After opening the PR, run `gh pr merge <PR_NUMBER> --auto --squash`
   to enable auto-merge. (Locked rule: auto-merge has to be enabled per
   PR; checks gate the merge once the Vercel build passes.)

Take it one step at a time. Wait for me to confirm each step worked
before moving to the next.
```

## What she should expect

- Her Claude reads `contributor-context/` from the cloned brons-beach
  repo — auto-loads Bron's brand system, the HeyeLab tenant context, the
  no-PAL-affiliation rule, and the cross-project HeyeLab discipline.
- Claude walks her through opening her first PR (the CONTRIBUTORS.md
  addition).
- PR auto-merges once Vercel preview build passes (no Winston approval
  required per `feedback_agent_driven_contributor_autonomy.md`).
- Total time: ~20 min (faster than PAL launch because tools install +
  GitHub auth + Claude install all already done).

## Architecture position

Per `feedback_hub_spoke_architecture.md`, Collie's Mac is a **spoke** in
Heye Lab's hub-and-spoke architecture. For Bron's specifically:

- **Spoke role:** Bron's design contributor — scoped to brons-beach repo
  + the curated `contributor-context/` mirror
- **Contribution path:** her PRs land in brons-beach → operator reviews
  on protected paths only → cosmetic / brand PRs auto-merge → patterns
  promote to HeyeDeploy framework templates when applicable
- **No operator-tier hooks:** she doesn't have workspace-memory mirror,
  no Stop hook, no agent tokens — by design (Tier 1 scope, same as PAL)

## What she should NOT do

- Touch backend / API / auth / admin / payment / build-config paths —
  CODEOWNERS will auto-request operator review on these and merge will
  gate (see `brons-tier-1-scope.md`)
- Run `npm install` or `npm run dev` — Tier 1 doesn't need a local dev
  server (Vercel preview is her live preview)
- Worry about being a bottleneck or waiting for approval — checks gate
  the merge, not humans

## What Claude on her Mac will need to ask her for

| Step | What Claude needs |
|---|---|
| Clone | Nothing — `gh auth login` already done from PAL launch |
| First PR | A one-line bio for CONTRIBUTORS.md (can reuse PAL bio) |

That's it. Same scoped tier, narrower scope than first launch since
tools are pre-installed.

## What's different from her PAL launch

| PAL launch (first time) | Bron's launch (this time) |
|---|---|
| Install Homebrew, git, node, gh, Claude | All already installed |
| `gh auth login` browser flow | Already auth'd as colliebreah |
| Claude folder picker setup | Projects folder already exists |
| ~30 min total | ~20 min total |
| One repo (port-a-local) | Sibling repo (brons-beach) — adds alongside |

Less work each subsequent tenant. That's the design.

## When to send the email

After Winston:
1. Reviews this runbook + the email body below
2. Confirms Collie's collaborator state on `haveebot/brons-beach` is set
   (`gh api repos/haveebot/brons-beach/collaborators --jq '.[] | {login,role_name}'`)
3. Picks a moment Collie's likely to have ~20 min uninterrupted

## The email body Collie will receive

```
Subject: Bron's design station — easy launch (round 2)

Collie —

Round two. Same Mac, same GitHub, same Claude — just adding the Bron's
Beach project as a sibling of PAL on your machine.

Plan ~20 min uninterrupted (faster than PAL launch — tools are already
installed).

Have ready:
  • Your GitHub login (colliebreah) — already auth'd from PAL launch
  • Your Mac — same one you launched PAL on
  • Claude on your Mac — same install

──────── DO THIS ────────

1) Open Claude on your Mac

2) Make sure Projects is selected as your folder (same as PAL — brons-beach
   will be a sibling of port-a-local inside it)

3) Paste THIS into a new chat:

────
I'm Collie, joining the Bron's Beach project as a design contributor.

This is my second HeyeLab tenant — I already launched on Port A Local
(PAL) on 2026-05-07. Same Mac, same GitHub (colliebreah), same Claude
account. Tools already installed.

My GitHub account is colliebreah. I've already been added as a
collaborator on haveebot/brons-beach. I make brand / design / copy /
styling changes — not backend, not auth, not API code.

The contributor-context for this repo is at:
github.com/haveebot/brons-beach → contributor-context/README.md

Walk me through it in plain English — no jargon dumps, no Terminal-speak.
If something needs me to type or click, tell me clearly what and where.

Steps:
1. Clone haveebot/brons-beach into ~/Projects/brons-beach (sibling of
   ~/Projects/port-a-local). Tools should already be installed from my
   PAL launch — if anything's missing, install quietly via your tools.
2. Read the contributor-context/ folder so you have my scope, brand
   system, and the HeyeLab tenant context.
3. Help me open my first PR — adding myself to a CONTRIBUTORS.md file at
   the root of the brons-beach repo with a one-line bio (or update the
   existing PAL bio if I want to reuse it).
4. After opening the PR, run `gh pr merge <PR_NUMBER> --auto --squash`
   to enable auto-merge. (Locked rule: auto-merge has to be enabled per
   PR; checks gate the merge once the Vercel build passes.)

Take it one step at a time. Wait for me to confirm each step worked
before moving to the next.
────

Hit send. Claude on your Mac walks you through everything from there.

When you're set up, your Claude will auto-load `contributor-context/` —
including `collie-pickup.md`, which is the prioritized queue of design
dials waiting for you. Top of the pile is the Bron mascot placement
decision (3 illustrations queued in `public/images/`, explicitly your
call), but there's a full slate of brand / mobile / type / OG card work
ready behind it. Hammer as many as you have time for.

If anything stops you, screenshot it and reply to this thread.

— Havee
```

## Cross-references

- PAL canonical: `port-a-local/Port A Local/Memory/contributor-context/pal-design-contributor-launch.md`
- Scope rules: [`brons-tier-1-scope.md`](brons-tier-1-scope.md)
- Brand system: [`brons-brand-system.md`](brons-brand-system.md)
- HeyeLab tenant context: [`brons-as-heyelab-tenant.md`](brons-as-heyelab-tenant.md)
- Memory rule (no Terminal as primary): `feedback_if_winston_cant_no_customer_can.md`

## How Winston approves + sends

When ready:
1. Re-read this runbook + email body
2. Adjust anything Collie-specific (timing, voice, anything)
3. Send via `python3 workspace/scripts/haveebot_mail.py send --to collie.breah@gmail.com --subject "Bron's design station — easy launch (round 2)" --body -` (paste body via stdin)

Or have Claude in this session send it on explicit go.
