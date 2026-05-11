# Bron's as a HeyeLab tenant — the bridge doc

A short orientation doc for contributors who've worked on PAL or other
HeyeLab tenants: what makes Bron's its own thing, and where framework
discipline still applies.

## Bron's is its OWN brand

Bron's Beach is a HeyeLab tenant — but it's not a PAL listing, not a PAL
sub-brand, and not affiliated with PAL on any customer-facing surface.
The customer who lands on https://www.bronsbeach.com sees Bron's brand
alone. No "Powered by PAL." No "Listed on Port A Local." Not even a PAL
nav link.

This is locked at the framework level. See:

- `feedback_pal_self_provider_rule.md` (in this contributor-context
  folder) — the cross-project rule that HeyeLab tenant deals live on
  tenant domains, not as listings on PAL customer surfaces.

## What the rule means in practice

| Surface | Bron's brand? | PAL brand? |
|---|---|---|
| bronsbeach.com | ✅ Yes | ❌ Never |
| PAL `/rent` cart-rental customer flow | ❌ Never | ✅ Yes (PAL is the direct provider on PAL surfaces) |
| PAL `/drink/drink-brons-backyard` (affiliate / non-conflicting category) | ✅ As an editorial listing only | ✅ PAL renders it |
| PAL `/eat`, `/live-music` (affiliate categories) | ✅ As an editorial listing only | ✅ PAL renders it |
| Wheelhouse operator surfaces (operator-only) | ✅ Tenant data shows | N/A (operator-only) |

Translation for design / brand work: **anything you do on this repo is
Bron's brand**. The PAL brand system, voice, asset library, and tone
rules don't carry over. Bron's has its own — see
[`brons-brand-system.md`](brons-brand-system.md).

## What DOES carry from PAL / HeyeLab framework

Even though Bron's brand is its own, framework-level discipline applies:

- **HeyeLab brand spelling** when the umbrella is referenced (footer,
  legal, contracts). One-word `HeyeLab` for marketing; two-word
  `Heye Lab` for legal. See `feedback_heyelab_brand_spelling.md`.
- **Pre / In / Post Deploy lifecycle naming** when describing the launch
  process. See `feedback_deploy_phase_naming.md`.
- **Consumer-app feel for non-tech operators** when designing
  operator-facing surfaces (the `/admin` dashboard, agreement generator).
  See `feedback_consumer_ux_for_non_tech_operators.md`.
- **Show don't tell** — earned brand positioning is never declared on
  the site. No "Best in Port A" claims on customer surfaces. See
  `feedback_show_dont_tell_brand.md`.
- **Substance flag before grammar** when operator-drafted SMS or email
  passes through your review. See `feedback_substance_flag_before_grammar.md`.
- **No individual names on customer surfaces** — Bron's adopts the same
  no-Winston / no-Nick / no-Havee discipline as PAL. The exception is
  Bron himself, who IS the brand (Bron's caricature in About, "Meet
  Bron" framing, his voice samples).

## Where Bron's sits in the HeyeDeploy framework

The 4-layer hierarchy (locked 2026-05-01):

```
HeyeDeploy (framework + customer-facing brand action)
   ├─ Patterns          — code shapes
   ├─ Components        — bundled capabilities (<X>Deploy)
   ├─ Vertical-Deploys  — SaaS shells per customer class
   └─ Tenants           — concrete deployments
```

Bron's is a **Tenant** at the leaf of this tree. It's not yet assigned
a vertical (BeachDeploy? HospitalityDeploy?) — that decision happens
when there's a second tenant of the same shape.

PAL is the canonical for **CityDeploy** vertical. Bron's is its own
shape — a single-operator multi-arm hospitality business, not a town
guide. Don't conflate the two.

## Operator-tier context (skim only)

| Question | Answer |
|---|---|
| Who is Bron? | Bron Doyle, owner of multi-arm Port Aransas operation (beach rentals, golf carts, backyard bar, kitchen, sno-cone). Personal cell on file with operator-tier. |
| Deal status | HeyeLab is principal. Phase 1 digital-only at 12% revenue share on transactions through bronsbeach.com. In-person ops untouched. Walk-in close pending. |
| Stripe state | bronsbeach.com currently uses PAL's borrowed test Stripe keys for staging. HeyeLab's own Stripe account pending. After deal closes, Stripe Connect routes 88% to Bron's bank, 12% to HeyeLab daily. |
| Phase 2 | Post-validation extension to in-person ops. Different pricing then. Not pre-committed today. |
| What you (Collie) own end-to-end on this repo | Brand / visual / cosmetic / copy work. Mascot placement decision is explicitly yours — 3 illustrations queued in `public/images/`. See [`brons-brand-system.md`](brons-brand-system.md). |

## Cross-references

- Canonical: `~/.claude/projects/-Users-winstoncaraker-Projects-workspace/memory/project_brons.md`
- Latest tech state: `Session Notes/handoff-2026-05-10.md`
- HeyeLab framework: `heyedeploy` repo
- PAL parallel: `port-a-local/Port A Local/Memory/contributor-context/`
