# Bron's Tier 1 contributor scope

What a design / brand / copy contributor can touch in brons-beach
without operator review, and what's gated by CODEOWNERS.

Mirrors the canonical scope rules at PAL's
`onboarding-design-contributor.md` — adapted for brons-beach paths.

## Free-merge surfaces (auto-merge once Vercel build passes)

### Page composition + components

| Path | What it is |
|---|---|
| `src/app/page.tsx` | Homepage composition |
| `src/app/layout.tsx` | Root layout (head/body/font wiring) |
| `src/app/HeroLive.tsx` | Hero with townscape, sun, type, marquee |
| `src/app/HeroMarquee.tsx` | Scrolling letterboard |
| `src/app/LiveConditionsBlock.tsx` | "Right now on the island" section |
| `src/app/LiveConditionsTile.tsx` | Visual atom for live tiles |
| `src/app/LiveConditionsWeather.tsx` | Weather client island |
| `src/app/BookingForm.tsx` | Booking form UI (Stripe submission stays in /api) |
| `src/app/SiteNav.tsx` | Sticky top nav |
| `src/app/MobileCtaBar.tsx` | Sticky bottom CTA on mobile |

### Styling

| Path | What it is |
|---|---|
| `src/app/globals.css` | Color tokens, animations, Tailwind imports |

Add / rename / tweak color tokens here. Adjust animations. Don't touch
the `@import "tailwindcss";` line — that's framework wiring.

### Content / data

| Path | What it is |
|---|---|
| `src/data/products.ts` | Beach + cart products, prices, types |
| `src/data/venue.ts` | Venue arms, hours, contact |
| `src/data/live-music.ts` | Tonight's music data (currently empty-state) |

Copy / content edits to these are free-merge. Price changes are also
free-merge — Stripe gets the values at checkout time from this file.

### Assets

| Path | What it is |
|---|---|
| `public/images/**` | Photos, illustrations, logo |
| `public/**` (non-images) | Other static assets |

Drop new photos or illustrations here. Replace existing ones. Optimize
file sizes.

### Documentation / contributor context

| Path | What it is |
|---|---|
| `README.md` | Repo readme |
| `CONTRIBUTORS.md` | Contributor list |
| `contributor-context/**` | These docs |
| `Session Notes/**` | Handoff briefs (operator-side mostly) |

### Free-merge utilities (design-adjacent)

| Path | What it is |
|---|---|
| `src/lib/openStatus.ts` | Chicago-time-aware open/close helper — feel free to adjust open hours |
| `src/lib/sunCalc.ts` | NOAA solar formula for sunrise/sunset (no API) |

## CODEOWNERS-gated surfaces (operator review required)

These paths require `@haveebot` approval before merge — see
`.github/CODEOWNERS` for the full list. Don't touch unless you've cleared
with Winston first.

| Path | Why it's gated |
|---|---|
| `src/app/api/**` | Backend routes (checkout, email, weather proxy, diagnostic) |
| `src/middleware.ts` | Admin auth gate (HTTP basic auth on `/admin/*`) |
| `src/app/admin/**` | Operator dashboard, agreement generator, why-page |
| `src/lib/sendConfirmationEmail.ts` | Resend integration — production email |
| `package.json`, lockfiles | Dependencies + scripts |
| `next.config.*`, `tsconfig.json`, `postcss.config.*` | Build config |
| `.env*` | Credentials (should be gitignored — defense-in-depth) |
| `.github/workflows/**`, `.github/CODEOWNERS` | CI + this file |

When unsure: ask Claude "is this in scope for me as a design contributor?"
— Claude knows the boundaries from `.github/CODEOWNERS`.

## Workflow norms

1. **Always work on a branch**, never commit to main directly.
2. **Open a PR for every change**, even tiny ones — preview deploys catch
   issues.
3. **Checks gate the merge, NOT humans.** Vercel build must pass. Once
   green, PR auto-merges. No waiting for Winston approval on cosmetic /
   brand / copy work.
4. **CODEOWNERS-protected paths still require operator review** — backend
   / API / auth / build-config changes need Winston to approve. Design
   contributor scope avoids these paths by default.
5. **One change per PR** when reasonable — easier to review + roll back.
6. **Enable auto-merge per PR**: after opening, run
   `gh pr merge <PR_NUMBER> --auto --squash`. Locked rule — auto-merge is
   per-PR, not repo-default.

## Tier graduation

This is **Tier 1** — branch-based, PR-required, preview-deploy validated,
agent-driven autonomy with checks-gate (no Winston bottleneck on cosmetic
work). Graduates to Tier 2 (more autonomy, owning specific brand systems
end-to-end across multiple tenants) when a track record of clean PRs
builds.

## Cross-references

- Agent-driven autonomy rule: `feedback_agent_driven_contributor_autonomy.md`
  (in workspace memory — applies cross-tenant)
- PAL canonical scope doc: PAL's `onboarding-design-contributor.md`
- HeyeDeploy brand tokens (umbrella-level): `heyedeploy/brand/tokens.md`
- Bron's brand system: [`brons-brand-system.md`](brons-brand-system.md)
