# Bron's Beach Rentals

Customer-facing rental booking surface for Bron's Beach Rentals (Port Aransas, TX).

**Owned by:** HeyeLab.
**Hosted at:** [bronsbeach.com](https://bronsbeach.com)
**Stack:** Next.js 16 · React 19 · Tailwind 4 · Stripe Connect

## Architecture

This is a standalone Next.js app — its own Vercel project, its own domain, its own Stripe account. Independent of [`port-a-local`](https://github.com/haveebot/port-a-local) (PAL is a separate HeyeDeploy tenant; the two operations don't share infrastructure).

Per the HeyeDeploy three-tier rule:

```
HeyeDeploy (framework)
├── PAL                   port-a-local repo · own Vercel project
├── Bron's Beach Rentals  this repo · own Vercel project
└── (future tenants)      same pattern
```

## Deal structure (Phase 1 — digital only)

- HeyeLab owns the digital surface (this app)
- 12% revenue share on every transaction routed through bronsbeach.com (`application_fee_amount` on Stripe Connect)
- 88% to Bron's connected account (auto-transferred daily)
- Bron's in-person operations (Cojilio walk-ups, Clover bar POS, phone bookings) untouched
- Phase 2 expansion to in-person ops happens after digital is performing — different conversation, undefined timeline

## Local dev

```bash
npm install
cp .env.example .env.local
# fill in test Stripe keys
npm run dev
```

Hits at `http://localhost:3000`.

## Routes

| Route | What it is |
|---|---|
| `/` | Landing + booking surface (hero, product grid, booking form) |
| `/checkout/success` | Post-checkout confirmation |
| `/api/checkout` | Stripe checkout session creation (server-trusted catalog + 12/88 split) |

## Deploying

This repo is wired to a Vercel project at `bronsbeach`. Auto-deploys on push to `main`.

Domain: `bronsbeach.com` (registered separately, configured in Vercel).
