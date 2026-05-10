/**
 * Bron's Beach Rentals — product catalog.
 *
 * Pricing: simplified flat-rate per day for the staging demo. Real prices
 * land after Bron confirms his actual SKUs + rates.
 *
 * Revenue split: 12% to HeyeLab platform (application_fee_amount), 88%
 * to Bron's Stripe Connect connected account. In production this happens
 * automatically via Stripe Connect Direct Charges with the platform fee
 * auto-deposited daily. For staging (no connected account yet), the split
 * is recorded in metadata; actual transfer activates when env var
 * STRIPE_BRONS_CONNECTED_ACCT_ID is set.
 */

export interface Product {
  slug: string;
  label: string;
  shortDescription: string;
  longDescription: string;
  /** Customer pays this per day. */
  dailyTotalCents: number;
}

/** HeyeLab platform fee on every Bron's transaction. Internal only. */
export const PLATFORM_FEE_PCT = 12;

/** Compute platform fee + vendor portion from total. Server-side only. */
export function splitTotal(totalCents: number): {
  platformFeeCents: number;
  vendorCents: number;
} {
  const platformFeeCents = Math.round((totalCents * PLATFORM_FEE_PCT) / 100);
  return {
    platformFeeCents,
    vendorCents: totalCents - platformFeeCents,
  };
}

export const PRODUCTS: Product[] = [
  {
    slug: "chair-umbrella",
    label: "Chair & Umbrella",
    shortDescription:
      "Two beach chairs and a 6-foot umbrella, set up where you'd like on the beach.",
    longDescription:
      "Two heavy-duty beach chairs, a 6-foot umbrella with sand anchor, and crew setup at your spot. Pickup at end of day handled by us — you just relax.",
    dailyTotalCents: 4500,
  },
  {
    slug: "cabana",
    label: "Family Cabana",
    shortDescription:
      "16×16 shade cloth cabana with chairs and a cooler. The big setup.",
    longDescription:
      "16×16 shade cloth cabana, six heavy-duty chairs, and a large cooler stocked with ice. Crew sets it up at your access point and breaks it down at end of day. Made for big groups, long days.",
    dailyTotalCents: 17500,
  },
  {
    slug: "cooler-only",
    label: "Cooler with Ice",
    shortDescription: "Large cooler, fully iced, dropped at your spot.",
    longDescription:
      "75-quart cooler with a full bag of ice, delivered to your beach access point or vacation rental. Add to any setup or rent on its own.",
    dailyTotalCents: 2500,
  },
  {
    slug: "beach-tent",
    label: "Beach Shade Tent",
    shortDescription: "Pop-up shade tent, sand anchors, and crew setup.",
    longDescription:
      "8×8 pop-up beach shade tent with all four sand anchors and crew setup at your spot. Smaller footprint than the cabana — perfect for a couple or small family.",
    dailyTotalCents: 6500,
  },
];

export function getProduct(slug: string): Product | null {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}
