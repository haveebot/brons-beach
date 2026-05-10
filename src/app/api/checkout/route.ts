import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct, splitTotal } from "@/data/products";

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
 * Bron's Beach Rentals checkout — staging build.
 *
 * The 12% HeyeLab platform fee is computed server-side from the trusted
 * catalog. In production (post-Bron-Connect-onboarding), this becomes a
 * Stripe Connect Direct Charge with `application_fee_amount` and
 * `payment_intent_data.transfer_data.destination = <Bron's connected
 * account ID>` so the 88% lands in his account daily, automatically.
 *
 * For staging (no connected account, no HeyeLab Stripe yet), the split
 * is recorded in metadata only — the actual transfer becomes real when
 * STRIPE_BRONS_CONNECTED_ACCT_ID is set on production.
 */

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://bronsbeach.com";

const BRONS_CONNECTED_ACCT_ID =
  process.env.STRIPE_BRONS_CONNECTED_ACCT_ID || "";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    name,
    phone,
    email,
    product,
    pickupDate,
    returnDate,
    accessPoint,
    numDays,
  } = body;

  if (
    !name ||
    !phone ||
    !email ||
    !product ||
    !pickupDate ||
    !returnDate ||
    !accessPoint ||
    !numDays
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
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

  const catalog = getProduct(product);
  if (!catalog) {
    return NextResponse.json({ error: "Unknown product" }, { status: 400 });
  }

  const days = Number(numDays);
  if (!Number.isFinite(days) || days < 1 || days > 30) {
    return NextResponse.json({ error: "Invalid numDays" }, { status: 400 });
  }

  // SERVER-COMPUTED amounts. Never trust client.
  const totalCents = catalog.dailyTotalCents * days;
  const { platformFeeCents, vendorCents } = splitTotal(totalCents);

  try {
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: totalCents,
            product_data: {
              name: `${catalog.label} — Bron's Beach Rentals`,
              description: `${days} day${days !== 1 ? "s" : ""} · ${pickupDate} → ${returnDate} · ${accessPoint} · Free cancellation up to 24 hours before start`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "brons-beach-rental",
        name,
        phone,
        email,
        product,
        pickupDate,
        returnDate,
        accessPoint,
        numDays: String(days),
        total_cents: String(totalCents),
        platform_fee_cents: String(platformFeeCents),
        vendor_cents: String(vendorCents),
        platform_fee_pct: "12",
      },
      success_url: `${APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/`,
    };

    if (BRONS_CONNECTED_ACCT_ID) {
      // Stripe Connect Direct Charge mode — application_fee_amount is
      // HeyeLab's 12% cut; the rest auto-transfers to Bron's connected
      // account. Activates when the env var is set on production.
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
