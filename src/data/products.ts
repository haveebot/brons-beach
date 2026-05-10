/**
 * Bron's — full rental catalog (beach + carts).
 *
 * Pricing: simplified flat-rate per day for the staging demo. Real prices
 * land after Bron confirms his actual SKUs + rates in the walk-in.
 *
 * Revenue split: 12% to HeyeLab platform (application_fee_amount), 88%
 * to Bron's Stripe Connect connected account. Activates when env var
 * STRIPE_BRONS_CONNECTED_ACCT_ID is set on production.
 */

export type ProductCategory = "beach" | "cart";

export interface Product {
  slug: string;
  category: ProductCategory;
  label: string;
  /** Emoji fallback when imageUrl is unset. */
  emoji: string;
  /**
   * Public path under /public or absolute URL. When set, ProductCard renders
   * this image; when unset, falls back to the emoji + gradient card. Beach
   * products are emoji-only until Bron sends product photography.
   */
  imageUrl?: string;
  shortDescription: string;
  longDescription: string;
  /** Customer pays this per day. */
  dailyTotalCents: number;
}

/** HeyeLab platform fee on every transaction. Internal only — never shown. */
export const PLATFORM_FEE_PCT = 12;

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
  // -------- Beach --------
  {
    slug: "chair-umbrella",
    category: "beach",
    label: "Chair & Umbrella",
    emoji: "⛱️",
    shortDescription:
      "Two beach chairs and a 6-foot umbrella, set up where you'd like on the beach.",
    longDescription:
      "Two heavy-duty beach chairs, a 6-foot umbrella with sand anchor, and crew setup at your spot. Pickup at end of day handled by us — you just relax.",
    dailyTotalCents: 4500,
  },
  {
    slug: "cabana",
    category: "beach",
    label: "Family Cabana",
    emoji: "🏖",
    shortDescription:
      "16×16 shade cloth cabana with chairs and a cooler. The big setup.",
    longDescription:
      "16×16 shade cloth cabana, six heavy-duty chairs, and a large cooler stocked with ice. Crew sets it up at your access point and breaks it down at end of day. Made for big groups, long days.",
    dailyTotalCents: 17500,
  },
  {
    slug: "beach-tent",
    category: "beach",
    label: "Beach Shade Tent",
    emoji: "⛺",
    shortDescription: "Pop-up shade tent, sand anchors, and crew setup.",
    longDescription:
      "8×8 pop-up beach shade tent with all four sand anchors and crew setup at your spot. Smaller footprint than the cabana — perfect for a couple or small family.",
    dailyTotalCents: 6500,
  },
  {
    slug: "cooler-only",
    category: "beach",
    label: "Cooler with Ice",
    emoji: "🧊",
    shortDescription: "Large cooler, fully iced, dropped at your spot.",
    longDescription:
      "75-quart cooler with a full bag of ice, delivered to your beach access point or vacation rental. Add to any setup or rent on its own.",
    dailyTotalCents: 2500,
  },

  // -------- Carts --------
  {
    slug: "cart-4pass",
    category: "cart",
    label: "4-Passenger Golf Cart",
    emoji: "🛺",
    imageUrl: "/images/bron-design.png",
    shortDescription:
      "Cruise the island. Picks up at the shop or delivered to your rental.",
    longDescription:
      "4-seat golf cart for four. Street-legal in Port A, perfect for cruising the beach access roads, the harbor, the bars. Pick up at our shop on Avenue G or have it dropped at your rental house. Includes safety check and a full tank.",
    dailyTotalCents: 15000, // $150/day
  },
  {
    slug: "cart-6pass",
    category: "cart",
    label: "6-Passenger Golf Cart",
    emoji: "🚐",
    imageUrl: "/images/bron-cart-beach.jpg",
    shortDescription:
      "Roomier — fits six comfortably. Same delivery and pickup options.",
    longDescription:
      "6-seat golf cart for the bigger group. Plenty of room for the cooler, the chairs, and the crew. Pick up at our shop or have it delivered. Most popular cart for week-long stays.",
    dailyTotalCents: 18000, // $180/day
  },
];

export const BEACH_PRODUCTS = PRODUCTS.filter((p) => p.category === "beach");
export const CART_PRODUCTS = PRODUCTS.filter((p) => p.category === "cart");

export function getProduct(slug: string): Product | null {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

/**
 * Cart item — one rental in a multi-product checkout. Each item has its own
 * dates (so a customer can book a week-long cart + a single-day cabana in
 * one transaction).
 */
export interface CartItem {
  productSlug: string;
  pickupDate: string; // YYYY-MM-DD
  returnDate: string; // YYYY-MM-DD
  numDays: number;
}

export interface PricedCartItem extends CartItem {
  product: Product;
  itemTotalCents: number;
  itemPlatformFeeCents: number;
  itemVendorCents: number;
}

/**
 * Server-trusted pricing pass over a cart. Uses the catalog daily rate,
 * NEVER trusts client-supplied amounts. Throws on unknown product / invalid
 * days so the API route can surface a clean 400.
 */
export function priceCart(items: CartItem[]): {
  priced: PricedCartItem[];
  totalCents: number;
  platformFeeCents: number;
  vendorCents: number;
} {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Cart is empty");
  }
  if (items.length > 10) {
    throw new Error("Cart too large (max 10 items)");
  }

  const priced: PricedCartItem[] = items.map((item, idx) => {
    const product = getProduct(item.productSlug);
    if (!product) throw new Error(`Unknown product: ${item.productSlug}`);
    const days = Number(item.numDays);
    if (!Number.isFinite(days) || days < 1 || days > 30) {
      throw new Error(`Item ${idx + 1}: invalid numDays`);
    }
    if (!item.pickupDate || !item.returnDate) {
      throw new Error(`Item ${idx + 1}: missing dates`);
    }
    const itemTotalCents = product.dailyTotalCents * days;
    const split = splitTotal(itemTotalCents);
    return {
      ...item,
      numDays: days,
      product,
      itemTotalCents,
      itemPlatformFeeCents: split.platformFeeCents,
      itemVendorCents: split.vendorCents,
    };
  });

  const totalCents = priced.reduce((sum, p) => sum + p.itemTotalCents, 0);
  const platformFeeCents = priced.reduce(
    (sum, p) => sum + p.itemPlatformFeeCents,
    0,
  );
  const vendorCents = totalCents - platformFeeCents;

  return { priced, totalCents, platformFeeCents, vendorCents };
}
