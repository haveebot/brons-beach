import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  sendConfirmationEmail,
  type ConfirmationItem,
} from "@/lib/sendConfirmationEmail";
import { getProduct } from "@/data/products";

/**
 * Customer-facing trigger for the post-checkout confirmation email.
 *
 * Called from the success page after Stripe redirects the customer back.
 * Idempotent — checks Stripe session metadata for `email_sent='true'` and
 * skips if already sent. After sending, marks the session metadata so a
 * page refresh doesn't send a duplicate.
 *
 * For production-grade reliability (customer closes browser before redirect),
 * also wire a Stripe webhook handler at /api/stripe/webhook that fires on
 * checkout.session.completed and runs the same logic.
 */

const getStripe = () => {
  const key = (process.env.STRIPE_SECRET_KEY || "")
    .trim()
    .replace(/\\n$/, "");
  return new Stripe(key);
};

interface CartJsonItem {
  slug: string;
  label: string;
  pickupDate: string;
  returnDate: string;
  numDays: number;
  totalCents: number;
}

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();
  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json({ error: "sessionId required" }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 },
    );
  }

  const stripe = getStripe();
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Could not retrieve session", detail: msg },
      { status: 400 },
    );
  }

  if (session.metadata?.email_sent === "true") {
    return NextResponse.json({ alreadySent: true });
  }

  const md = session.metadata || {};
  const customerEmail =
    session.customer_details?.email || md.email || session.customer_email;

  if (!customerEmail || !md.name) {
    return NextResponse.json(
      { error: "Session missing required metadata" },
      { status: 400 },
    );
  }

  // Cart was stored in metadata.cart_json by /api/checkout
  const items = parseCartItems(md.cart_json, md);
  if (items.length === 0) {
    return NextResponse.json(
      { error: "Session has no cart items" },
      { status: 400 },
    );
  }

  const totalCents = Number(md.total_cents || session.amount_total || "0");

  const result = await sendConfirmationEmail({
    customerName: md.name,
    customerEmail,
    items,
    accessPoint: md.accessPoint || "",
    totalCents,
    sessionId,
  });

  if (result.sent) {
    try {
      await stripe.checkout.sessions.update(sessionId, {
        metadata: {
          ...md,
          email_sent: "true",
          email_sent_at: new Date().toISOString(),
          resend_id: result.id || "",
        },
      });
    } catch (err) {
      // Non-fatal — email sent, just couldn't mark idempotency. Log and continue.
      console.error(
        "[Email send] Sent but failed to mark session metadata:",
        err,
      );
    }
  }

  return NextResponse.json(result);
}

function parseCartItems(
  cartJson: string | undefined,
  legacyMd: Record<string, string>,
): ConfirmationItem[] {
  // Preferred: parse cart_json from new multi-product flow
  if (cartJson) {
    try {
      const raw = JSON.parse(cartJson) as CartJsonItem[];
      if (Array.isArray(raw)) {
        return raw
          .map((it) => ({
            productLabel: it.label || labelFromSlug(it.slug),
            pickupDate: it.pickupDate,
            returnDate: it.returnDate,
            numDays: Number(it.numDays || 1),
            itemTotalCents: Number(it.totalCents || 0),
          }))
          .filter((it) => it.productLabel && it.pickupDate);
      }
    } catch (err) {
      console.warn("[Email send] cart_json parse failed:", err);
    }
  }

  // Legacy fallback: single-product session shape
  if (legacyMd.product) {
    const product = getProduct(legacyMd.product);
    return [
      {
        productLabel: product?.label || legacyMd.product,
        pickupDate: legacyMd.pickupDate || "",
        returnDate: legacyMd.returnDate || "",
        numDays: Number(legacyMd.numDays || "1"),
        itemTotalCents: Number(legacyMd.total_cents || "0"),
      },
    ];
  }

  return [];
}

function labelFromSlug(slug: string): string {
  const product = getProduct(slug);
  return product?.label || slug;
}
