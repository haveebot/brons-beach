import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { priceCart, type CartItem } from "@/data/products";

// No apiVersion pinned — Stripe SDK uses the account's default API
// version. Pinning a string literal can break across SDK upgrades.
//
// .trim() defends against a known Vercel env-var paste hazard: copy-
// pasting a key from clipboard sometimes carries a trailing newline
// or whitespace, which breaks Stripe auth without a clear error
// message (Stripe SDK reports it as a connection error, not auth).
// See workspace memory: feedback_vercel_env_pull_escaped_newlines.md
const getStripe = () => {
  const key = (process.env.STRIPE_SECRET_KEY || "")
    .trim()
    .replace(/\\n$/, "");
  return new Stripe(key);
};

/**
 * Bron's Beach Rentals checkout — multi-product cart.
 *
 * Each cart item is a separate rental with its own dates. Server prices
 * every item from the trusted catalog, builds a Stripe line_item per item,
 * and sums the 12% platform fee for a single application_fee_amount on
 * the Connect Direct Charge (when STRIPE_BRONS_CONNECTED_ACCT_ID is set).
 *
 * Backwards-compatible: legacy single-product POSTs ({product, pickupDate,
 * returnDate, numDays}) get translated into a one-item cart so old clients
 * keep working during deploy windows.
 */

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://bronsbeach.com";

const BRONS_CONNECTED_ACCT_ID =
  process.env.STRIPE_BRONS_CONNECTED_ACCT_ID || "";

interface RequestBody {
  name: string;
  phone: string;
  email: string;
  accessPoint: string;
  cart?: CartItem[];
  // Legacy single-product fields:
  product?: string;
  pickupDate?: string;
  returnDate?: string;
  numDays?: number;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as RequestBody;
  const { name, phone, email, accessPoint } = body;

  if (!name || !phone || !email || !accessPoint) {
    return NextResponse.json(
      { error: "Missing required customer fields" },
      { status: 400 },
    );
  }

  // Defense: if STRIPE_SECRET_KEY isn't set on the deploy, surface that
  // explicitly instead of letting Stripe SDK throw a vague error
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("[Checkout] STRIPE_SECRET_KEY not set in environment");
    return NextResponse.json(
      { error: "Stripe not configured (env var missing)" },
      { status: 500 },
    );
  }

  // Build the cart — accept either {cart:[...]} or legacy single-product body
  let cart: CartItem[];
  if (Array.isArray(body.cart) && body.cart.length > 0) {
    cart = body.cart;
  } else if (body.product && body.pickupDate && body.returnDate) {
    cart = [
      {
        productSlug: body.product,
        pickupDate: body.pickupDate,
        returnDate: body.returnDate,
        numDays: Number(body.numDays || 1),
      },
    ];
  } else {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  let priced;
  try {
    priced = priceCart(cart);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const { priced: items, totalCents, platformFeeCents } = priced;

  try {
    const lineItems: NonNullable<
      Stripe.Checkout.SessionCreateParams["line_items"]
    > = items.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: item.itemTotalCents,
        product_data: {
          name: `${item.product.label} — Bron's Beach Rentals`,
          description: `${item.numDays} day${item.numDays !== 1 ? "s" : ""} · ${item.pickupDate}${item.pickupDate !== item.returnDate ? ` → ${item.returnDate}` : ""} · ${accessPoint}`,
        },
      },
      quantity: 1,
    }));

    // Cart JSON in metadata so we can rehydrate items on the success page
    // and in the confirmation email. Trim to fit Stripe's 500-char per-key
    // metadata limit — store as a single compact JSON string.
    const cartJson = JSON.stringify(
      items.map((it) => ({
        slug: it.productSlug,
        label: it.product.label,
        pickupDate: it.pickupDate,
        returnDate: it.returnDate,
        numDays: it.numDays,
        totalCents: it.itemTotalCents,
      })),
    );

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: lineItems,
      metadata: {
        type: "brons-beach-rental",
        name,
        phone,
        email,
        accessPoint,
        cart_json: cartJson.slice(0, 500),
        item_count: String(items.length),
        total_cents: String(totalCents),
        platform_fee_cents: String(platformFeeCents),
        platform_fee_pct: "12",
      },
      success_url: `${APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/`,
    };

    if (BRONS_CONNECTED_ACCT_ID) {
      // Single Direct Charge for the whole cart — Stripe routes
      // (totalCents - application_fee_amount) to Bron's connected account.
      sessionConfig.payment_intent_data = {
        application_fee_amount: platformFeeCents,
        transfer_data: {
          destination: BRONS_CONNECTED_ACCT_ID,
        },
      };
    }

    const session = await getStripe().checkout.sessions.create(sessionConfig);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    // Surface as much as possible to both server logs AND the client
    // response so we can diagnose without diving into Vercel logs every time
    const stripeErr = err as { message?: string; code?: string; type?: string };
    const detail = stripeErr.message || String(err);
    console.error("[Checkout] Stripe error:", {
      message: detail,
      code: stripeErr.code,
      type: stripeErr.type,
    });
    return NextResponse.json(
      {
        error: "Failed to create checkout session",
        detail,
        code: stripeErr.code,
        type: stripeErr.type,
      },
      { status: 500 },
    );
  }
}
