import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct, splitTotal } from "@/data/products";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-04-22.dahlia",
});

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
    console.error("[Checkout] Stripe error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
