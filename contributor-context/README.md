# Contributor context — brons-beach

A curated subset of HeyeLab cross-project rules + Bron's-specific brand
canonicals that Claude on a contributor's Mac auto-loads when the
brons-beach repo is opened. Lives here so contributors get consistent
design / brand / voice context without needing access to the full
operator-tier memory vault.

Mirrors the canonical PAL pattern at
`port-a-local/Port A Local/Memory/contributor-context/` (locked
2026-05-07 PM). This is the second tenant to implement it.

## What this repo is in one paragraph

Bron's Beach is a **HeyeLab tenant** — Bron Doyle's multi-arm Port Aransas
operation (beach rentals · golf carts · bar · kitchen · sno-cone). HeyeLab
is the principal at 12% revenue share on Phase 1 digital transactions.
Bron's is **not affiliated with Port A Local (PAL) on customer surfaces**
even though both operate in Port Aransas — see
`brons-as-heyelab-tenant.md` for the boundary rules.

## What's in here

### Bron's-specific docs

| File | What it covers |
|---|---|
| [`brons-design-contributor-launch.md`](brons-design-contributor-launch.md) | The Tier 1 launch ritual — what a contributor receives via email and does on their Mac (Claude-driven setup, no Terminal jargon) |
| [`brons-brand-system.md`](brons-brand-system.md) | Bron's color tokens, type system, voice samples, asset inventory |
| [`brons-tier-1-scope.md`](brons-tier-1-scope.md) | What a Tier 1 contributor can / can't touch in brons-beach (free-merge vs CODEOWNERS-gated) |
| [`brons-as-heyelab-tenant.md`](brons-as-heyelab-tenant.md) | The bridge doc — Bron's is HeyeLab principal, NOT a PAL listing; framework discipline still applies |
| [`collie-pickup.md`](collie-pickup.md) | **Living doc.** The prioritized hit list of design dials queued for the contributor. Updated each session as new work emerges. |

### Cross-project rules (mirrored from workspace memory)

| File | Why a Bron's contributor needs it |
|---|---|
| `feedback_heyelab_brand_spelling.md` | HeyeLab one-word for marketing / wordmark; Heye Lab two-word for legal / official |
| `feedback_heyedeploy_collie_validation.md` | The HeyeDeploy brand tokens (Collie-validated 2026-05-04) — applies anywhere a HeyeLab umbrella reference appears |
| `feedback_deploy_phase_naming.md` | The Pre / In / Post Deploy lifecycle naming discipline |
| `feedback_consumer_ux_for_non_tech_operators.md` | UX principle — tile launchers, hide-dev-metadata, consumer-app feel |
| `feedback_show_dont_tell_brand.md` | Earned brand positioning is never declared on the site (no "Kleenex of X" claims on customer surfaces) |
| `feedback_substance_flag_before_grammar.md` | When reviewing operator-drafted SMS / email, check substance against latest context BEFORE the grammar pass |
| `feedback_pal_self_provider_rule.md` | Tenant-domain rule — explains why Bron's lives on `bronsbeach.com` instead of `theportalocal.com/rent` |
| `feedback_launch_prompt_autonomy.md` | Launch prompts must let Claude run the full technical chain autonomously; only stop for human-judgment inputs (filed 2026-05-11 after Collie's brons-beach launch) |

## How your work is captured

Your sessions don't have a separate "truck" or end-of-session ritual —
capture is seamless and operator-side:

- **Your PR description IS your handoff brief.** Write it like an operator
  truck: what shipped, why, what's next, what to watch. The operator reads
  PR descriptions as the handoff. No separate doc to file.
- **Cross-Heye productivity is auto-aggregated.** A workspace script
  (`contributor_activity.py`) regenerates a `memory/contributor_<slug>.md`
  log from your merged PRs across every Heye Lab repo. Operator scans it
  during their start-of-session drill.
- **Pattern-promotion is operator-driven.** When you ship something
  framework-relevant, the operator catches it in the activity scan and
  promotes to `heyedeploy/patterns/`. You don't file separate pattern docs
  upfront.

Net: you ship PRs with thoughtful descriptions, the rest happens
automatically. No extra workflow.

## Maintenance

These are **curated mirrors** of files in the operator-tier workspace
memory. The canonical versions update over time (rarely — these rules are
stable once locked).

**To refresh:** Winston (or anyone with workspace-memory access) re-copies
updated files into this directory periodically. Stale-risk is low because
these rules don't churn often.

**To add a new design-relevant memory:** copy from workspace memory into
this directory + commit. The contributor's Claude will auto-load on next
session.

## Contribution back

If you (or your Claude) discover a new pattern, design observation, or
convention while working on Bron's, add a note in this directory under
`contributor-insights/<slug>.md`. These get reviewed by Winston during PR
review and promoted to HeyeDeploy framework when patterns emerge.

This is the spoke→hub contribution path — every spoke contributes back to
HeyeLab framework. Mandatory, not optional.
