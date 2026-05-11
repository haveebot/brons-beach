# Collie pickup — design dials to hammer

_Living doc. Updated each session by operator-side as new design dials emerge. Last updated: 2026-05-11._

This is your hit list. The site is at "professional polished v1" — no longer a staging surface, reads as Bron's real operating site. The design dials below are queued for you in priority order. Hammer as many as you have time for; PRs auto-merge on green Vercel build (no Winston bottleneck on cosmetic / brand work).

**Site:** https://www.bronsbeach.com
**Brand system:** [`brons-brand-system.md`](brons-brand-system.md)
**Scope (what you can/can't touch):** [`brons-tier-1-scope.md`](brons-tier-1-scope.md)
**HeyeLab tenant context:** [`brons-as-heyelab-tenant.md`](brons-as-heyelab-tenant.md)

---

## 🥇 Top of the pile — your explicit ownership

### 1. Bron mascot placement

**Three Firefly illustrations are queued in `public/images/` ready for placement:**

| File | What it is |
|---|---|
| `bron-mascot.png` | Bron with welcoming hand-gesture pose, transparent bg, 928×1152 |
| `bron-portrait.jpg` | Chest-up portrait, transparent-feel bg |
| `bron-at-beach.jpg` | Full painted beach scene with Bron, 747×1152 |
| `bron-caricature.jpg` | Your clean line drawing — already wired in the About section |

**The decision is yours.** Six placement spots were considered during yesterday's session and deferred:

1. Dot of the "i" in BRON'S — tried, abandoned (too tight at all sizes)
2. About section — currently has line caricature; could swap for portrait
3. Floating peek somewhere — was tried on rental tiles, nuked (competed with magazine-cover composition)
4. Hero element overlay
5. New "Meet Bron" full-section moment between hero and rentals
6. Footer brand block

**Files you'd be touching:**
- `src/app/HeroLive.tsx` — if hero placement
- `src/app/page.tsx` — if you introduce a "Meet Bron" section between hero and rentals
- About section is inside `src/app/page.tsx`
- Footer is inside `src/app/page.tsx`

All free-merge — no CODEOWNERS gate.

---

## 🔧 Brand dials in range

### 2. About section evolution

Currently: line caricature centered above the headline "The whole island stop, in one yard."

Could be: swap to `bron-portrait.jpg`, reposition, add subhead, etc. Your eye on whether the current treatment lands or needs another pass.

**File:** `src/app/page.tsx` (search for "Meet Bron" / "whole island stop")

### 3. Photo audit — what else should we pull?

Current `public/images/` inventory:
- `bron-halo.jpg` — branded aerial drone shot (also OG card)
- `bron-cart-beach.jpg` — boardwalk drone shot (Private Events section)
- `bron-design.png` — branded cart-on-beach photo
- `bron-logo.png` — circular logo (footer)
- 4 Bron illustrations (the caricature + 3 Firefly outputs)

**Public sources to mine if you want more:**
- `bronsbeachcarts.com` (Wix-based — agency-built marketing site)
- Bron's Backyard Facebook page (events, real shots)
- Bron's Instagram if active

Photo gaps that came up during composition:
- Real Bron's bar interior shot (for The Yard section)
- Action shots of carts in motion / beach setups
- Sno-cone & frozen margarita hero shot (for the sno-cone/to-go section)

Free to add any to `public/images/`. Then wire into the relevant section.

### 4. Color token review

Current palette in `src/app/globals.css` (full list in [`brons-brand-system.md`](brons-brand-system.md)):

- **Anchors:** sand, cream, navy, coral, coral-dark, gold, sky
- **Tropical extension** (added during marquee hero pass): pink, teal, yellow, deep

Does it feel right as one system? Add/rename/remove tokens — all free-merge.

### 5. Type scale tuning

Four families wired:
- **Bungee Shade** — display "BRON'S" mark, vintage 3D
- **Bungee** — marquee letterboard
- **Fraunces** — display serif (italic taglines, section headlines)
- **Inter** — body sans

If any tracking / weight / sizing feels off across sections, free to tune.

### 6. Mobile reach test

Sticky top nav + sticky bottom CTA bar both present. After any composition change (especially hero work), verify on real mobile (375×667 iPhone SE is the worst case):

- Bottom CTA bar shouldn't cover content above the fold
- Top nav stays readable on the cream paper hero
- Hero scales without breaking

Reference rule: `feedback_pal_mobile_nav_reach.md` (PAL had a 100dvh vs 100vh gotcha — Bron's already uses dvh, but worth verifying any new placement).

---

## 🚀 Bigger projects (if you're feeling ambitious)

### 7. "Meet Bron" full-section moment

If your mascot placement decision (item #1) is "give Bron his own section," scaffold it between hero and rentals. Tonal options:

- Magazine-spread (hero photo + pull-quote, classic editorial)
- Character intro card (illustration + 2-line intro + "Read more" link)
- Manifesto-style (single line of brand promise + portrait + signature)

Free-merge to add. Drop into `src/app/page.tsx` between `<HeroLive />` and the rental tiles section.

### 8. OG card art

Currently `src/app/opengraph-image.jpg` is a copy of `bron-halo.jpg`. Could be a designed OG card with brand mark + tagline overlay. Open Graph cards are what shows when bronsbeach.com is shared on Facebook / Messenger / SMS / iMessage.

Spec: 1200×630, JPG or PNG, under 8MB. Replace the file at `src/app/opengraph-image.jpg` — Vercel rebuilds the meta tag automatically.

### 9. Brand showcase page at `/brand`

PAL has `theportalocal.com/brand` — a public design system page showing the brand system live. Bron's could mirror the pattern: `bronsbeach.com/brand` with the color tokens rendered as swatches, type specimens, voice samples, the asset library.

New file: `src/app/brand/page.tsx`. Free-merge (it's a public page, not protected). Could be a quiet but useful brand-defense surface for any future contributor or vendor inquiry.

### 10. Email template design

When `RESEND_API_KEY` + `RESEND_FROM` env vars get wired (operator-side, pending), the booking confirmation email HTML template needs design love. Currently functional but plain — see `src/lib/sendConfirmationEmail.ts` for the current HTML/plaintext.

This one is CODEOWNERS-gated (the file is in `src/lib/` and is in the protected list). You can still draft the visual + send a PR, just expect operator review on this one. Or just spec the design in a comment/issue and operator can wire it.

---

## ❌ Not yours

Per [`brons-tier-1-scope.md`](brons-tier-1-scope.md), don't touch (or expect operator review if you do):

- `src/app/api/**` — backend (checkout, email, weather, diagnose)
- `src/middleware.ts` — admin auth gate
- `src/app/admin/**` — operator dashboard, agreement generator, why-page
- `src/lib/sendConfirmationEmail.ts` — Resend integration (you can spec the design; operator wires)
- Build config (`package.json`, `next.config.*`, `tsconfig.json`)

---

## How to ship

1. Pick a dial above
2. Create a branch (`design/<dial-slug>`)
3. Edit the relevant file(s)
4. Commit + push
5. `gh pr create` with a descriptive title + a 1-2 sentence body explaining what you decided
6. `gh pr merge <PR_NUMBER> --auto --squash` to enable auto-merge
7. Vercel builds your preview (~2 min) → checks green → auto-merge fires → live on bronsbeach.com

If your Claude needs help on any step, ask it — `contributor-context/` gives it the scope rules + brand system so it can guide you cleanly.

---

## Capture pattern

Your PR descriptions ARE your handoff. Write them like the operator's truck doc — what you decided + why + what to watch. No separate session-end ritual.

When something framework-worthy emerges (a pattern that'd apply to future tenants), drop a note in `contributor-context/contributor-insights/<slug>.md` — operator-side promotes to HeyeDeploy framework when applicable. That's the spoke→hub contribution path.

---

**Operator-side will update this doc as new dials emerge. If you ship past the queue, ask the operator for the next slate or freelance — your judgment on what the site needs.**
