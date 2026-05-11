# Bron's brand system

Canonical: `src/app/globals.css` (color tokens + animations) and the live
site at https://www.bronsbeach.com. This doc is the contributor-facing
summary.

## Voice

Casual, friendly, island-vibes. NOT PAL editorial voice (PAL is records-
floor synthesis-journalism). Bron's is hospitality-tier — warm,
inviting, slightly playful.

Brand voice samples (preserve in any Bron's-branded surface):

- "The friendliest golf cart rental in town!"
- "Come see why Bron's Backyard is the place to be!"
- "Reserve your spot, show up, and start enjoying the island life — no
  setup required!"
- "Set you up at the beach. **See you back at the yard.**" (current
  brand promise / hero tagline)

When in doubt: warm > clever, plain-English > marketing-speak,
beach-vibes > corporate.

## Color tokens

Defined in `src/app/globals.css` under `@theme`. Use the token classes
in Tailwind (e.g. `bg-bron-pink`, `text-bron-navy`, `border-bron-coral`).

### Anchors (used everywhere)

| Token | Hex | Where it shows up |
|---|---|---|
| `bron-sand` | `#f5efe2` | Default page background, paper canvas |
| `bron-cream` | `#faf3e3` | Lighter cream surfaces |
| `bron-navy` | `#1a3a52` | Primary text, top nav background, townscape silhouette |
| `bron-coral` | `#e8654a` | Primary CTA, accents, sun rays |
| `bron-coral-dark` | `#d2553c` | Hover/pressed state on coral |
| `bron-gold` | `#f5b35a` | Sun disc highlights |
| `bron-sky` | `#3d6e8c` | Secondary navy / sky tones |

### Tropical extension (vintage marquee hero + commanding rental tiles)

| Token | Hex | Where it shows up |
|---|---|---|
| `bron-pink` | `#ff4d8b` | Beach rental tile, sun rays alt, brand-promise emphasis |
| `bron-teal` | `#2ec4b6` | Carts rental tile, eyebrow bullets alt |
| `bron-yellow` | `#f6c026` | Marquee letterboard glow bulbs, sun disc center |
| `bron-deep` | `#0d1f2c` | Marquee letterboard background, deep silhouette layer |

If you need a new color token, add it in `globals.css` under `@theme`
(free-merge surface — no CODEOWNERS review needed).

## Type system

| Family | Variable | Use |
|---|---|---|
| **Bungee Shade** | `--font-mark` | The big "BRON'S" display mark only — vintage signage with built-in 3D depth |
| **Bungee** | `--font-marquee` | Marquee letterboard text only |
| **Fraunces** | `--font-display` | Section headlines + italic taglines (set `font-optical-sizing: auto`, slight negative tracking) |
| **Inter** | `--font-sans` | Default body sans for everything else |

Don't mix display fonts. Bungee Shade is reserved exclusively for the
hero "BRON'S" mark — using it elsewhere weakens the singular mark.

## Brand assets in `public/images/`

All photos and illustrations live in `public/images/`. Inventory at
session truck 2026-05-10:

| File | What it is |
|---|---|
| `bron-halo.jpg` | Branded aerial drone shot of Bron's compound (also used as `src/app/opengraph-image.jpg`) |
| `bron-cart-beach.jpg` | Boardwalk drone shot (Private Events section background) |
| `bron-design.png` | Branded cart-on-beach photo |
| `bron-logo.png` | Circular Bron's Beach Carts logo (footer brand block) |
| `bron-caricature.jpg` | Collie's clean line drawing of Bron — currently wired in About section |
| `bron-mascot.png` | Bron with welcoming hand-gesture pose, transparent bg (saved for Collie placement decision) |
| `bron-portrait.jpg` | Chest-up portrait (saved for Collie placement decision) |
| `bron-at-beach.jpg` | Full painted beach scene with Bron, 747×1152 (saved for Collie placement decision) |

The mascot placement decision is **explicitly yours**. Three illustrations
are queued and ready. Possible spots considered but deferred:

- Dot of the "i" in BRON'S (tried, abandoned — too tight)
- About section (currently has line caricature; could swap for portrait)
- Floating peek somewhere (was tried on rental tiles, nuked because it
  competed with the magazine cover composition)
- Hero element overlay
- New "Meet Bron" full-section moment between hero and rentals
- Footer brand block

Place where it lands the brand identity best. Trust your eye.

## Page composition (locked 2026-05-10 evening)

The current site is at "professional polished v1." Page order:

1. **Hero** — `HeroLive.tsx` + `HeroMarquee.tsx`. Seaside-style Bron's
   townscape silhouette, rising sun, BRON'S in Bungee Shade with breath
   animation, segments line (Beach · Carts · Bar · Kitchen · Music),
   tagline "Set you up at the beach. See you back at the yard.", two
   CTAs, scrolling marquee letterboard below.
2. **Rental tiles** — 2 commanding tiles (Beach + Carts), solid colors
   (`bron-pink` + `bron-teal`), custom SVG icons, no photos, no emoji.
3. **Live Conditions block** — `LiveConditionsBlock.tsx` — sunset /
   weather / music / open-status. Active tiles get coral-tinted border.
4. **Booking form** — `BookingForm.tsx` — multi-product cart with
   Stripe checkout.
5. **The Yard** — bar / kitchen / sno-cone venue panel.
6. **About** — Bron's caricature centered above headline.
7. **Private Events** — boardwalk drone backdrop, "Book the yard."
8. **How rentals work** — 3-step explainer.
9. **FAQ** — 6 honest answers from Bron's real policies.
10. **Footer** — 3-column info hub (brand · Visit · Reach us).

## What's been intentionally dropped

Documenting so we don't accidentally re-add (see `Session Notes/handoff-
2026-05-10.md` for the full list):

- Demo banner + mock data in `/admin`
- "vs your stack" tile pushed in operator's face on `/admin` (still
  reachable via direct URL at `/admin/why`)
- Cart shack cupola, tiki torches, hammock, picnic table, cornhole
  boards, free-floating golf cart silhouette
- Eave fringes on roofs (each roof is now one clean curve)
- Sparkle row between BRON'S and tagline (sun rays provide the pop)
- Photo backgrounds on rental tiles (had baked-in BRON'S BEACH CARTS
  branding competing with our headlines)
- Bron mascot on rental tiles (Collie owns mascot placement)
- Emoji eyebrow icons on rental tiles (replaced with custom SVG)

## How to apply

When making brand / cosmetic / copy changes:

- Stay in the existing color + type system. If you need a new token, add
  it cleanly to `globals.css`.
- Match the voice samples above. Read existing copy for tone before
  rewriting.
- Test on mobile (sticky top nav + sticky bottom CTA bar are both
  present; verify your change doesn't break their reach).
- Vercel auto-builds a preview on every PR — the URL appears on the PR
  page ~2 min after push. That's your live preview.
