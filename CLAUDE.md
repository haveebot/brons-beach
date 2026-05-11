# CLAUDE.md — brons-beach

This file auto-loads when a Claude session opens the brons-beach repo. It
points the session at the right context for whoever is sitting at the
keyboard.

## What this repo is

**Bron's Beach** is a HeyeLab tenant — the public-facing site + admin
operating tool for Bron Doyle's multi-arm operation in Port Aransas, TX
(beach rentals · golf carts · backyard bar · kitchen · sno-cone). Phase 1
scope is digital-only with HeyeLab as principal at 12% revenue share on
transactions through the platform. In-person ops (Cojilio walk-ups, Clover
bar POS, phone bookings) untouched in Phase 1.

Live at https://www.bronsbeach.com.

## If you are a design / brand / copy contributor

Your first stop is [`contributor-context/`](contributor-context/). Read
`contributor-context/README.md` first — it orients you on what's in scope,
how PRs auto-merge, the brand system, and the launch ritual. Cross-project
HeyeLab rules are mirrored there so your Claude session has the right
context without operator-tier memory access.

## If you are operator-tier (Winston / Nick)

The standing project memory lives at:
`~/.claude/projects/-Users-winstoncaraker-Projects-workspace/memory/project_brons.md`

The latest session truck is at:
`Session Notes/handoff-<date>.md` — read the newest one first.

## Repo conventions

- **Branch protection**: status checks (Vercel build) required, 0 general
  approving review required, code-owner review required on protected paths
  per `.github/CODEOWNERS`. Auto-merge enabled per PR.
- **Free-merge surfaces** (cosmetic / brand / copy): `src/app/*.tsx`,
  `src/app/globals.css`, `src/data/**`, `public/**`, docs, content
- **Operator-protected paths**: `src/app/api/`, `src/middleware.ts`,
  `src/app/admin/`, `src/lib/sendConfirmationEmail.ts`, build/deps config
- **Commit convention**: lowercase imperative subject (`feat:`, `fix:`,
  `chore:`, `copy:`, `polish:` are all fine — match existing tone)

## Cross-references

- HeyeLab framework: `~/Projects/workspace/heyedeploy/` (or
  github.com/haveebot/heyedeploy — private)
- Sibling tenant: `~/Projects/workspace/port-a-local/` (PAL — first
  canonical Tier 1 design contributor onboarding 2026-05-07)
- Workspace memory canonical: `~/.claude/projects/-Users-winstoncaraker-Projects-workspace/memory/`
