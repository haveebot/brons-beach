"use client";

import { useMemo, useState } from "react";
import {
  BEACH_PRODUCTS,
  CART_PRODUCTS,
  PRODUCTS,
  type Product,
} from "@/data/products";

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

interface CartItemDraft {
  /** Local row id — purely UI; not sent to server. */
  rowId: string;
  productSlug: string;
  pickupDate: string;
  /** "" until user enters or multi-day toggled on for beach */
  returnDate: string;
  /** Beach single-day toggle (cart always multi-day). */
  multiDay: boolean;
}

function makeRow(
  productSlug: string = PRODUCTS[0].slug,
  defaults?: Partial<CartItemDraft>,
): CartItemDraft {
  const product = PRODUCTS.find((p) => p.slug === productSlug)!;
  const isCart = product.category === "cart";
  return {
    rowId: Math.random().toString(36).slice(2, 9),
    productSlug,
    pickupDate: defaults?.pickupDate ?? "",
    returnDate: defaults?.returnDate ?? "",
    multiDay: defaults?.multiDay ?? isCart,
  };
}

export default function BookingForm() {
  const today = todayStr();
  const [items, setItems] = useState<CartItemDraft[]>([makeRow()]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [accessPoint, setAccessPoint] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const priced = useMemo(() => {
    return items.map((row) => {
      const product = PRODUCTS.find((p) => p.slug === row.productSlug)!;
      const isBeach = product.category === "beach";
      const effectiveReturn =
        isBeach && !row.multiDay ? row.pickupDate : row.returnDate;
      const numDays =
        row.pickupDate && effectiveReturn
          ? Math.max(
              1,
              Math.ceil(
                (new Date(effectiveReturn).getTime() -
                  new Date(row.pickupDate).getTime()) /
                  (1000 * 60 * 60 * 24),
              ) + 1,
            )
          : 1;
      const itemTotalCents = product.dailyTotalCents * numDays;
      return {
        ...row,
        product,
        effectiveReturn,
        numDays,
        itemTotalCents,
      };
    });
  }, [items]);

  const totalCents = priced.reduce((s, p) => s + p.itemTotalCents, 0);
  const totalDollars = (totalCents / 100).toFixed(2);

  const updateRow = (rowId: string, patch: Partial<CartItemDraft>) => {
    setItems((cur) =>
      cur.map((r) => {
        if (r.rowId !== rowId) return r;
        const next = { ...r, ...patch };
        // Category change: reset multi-day to category default
        if (patch.productSlug && patch.productSlug !== r.productSlug) {
          const newProduct = PRODUCTS.find((p) => p.slug === patch.productSlug)!;
          next.multiDay = newProduct.category === "cart";
          if (newProduct.category === "beach" && !next.multiDay) {
            next.returnDate = "";
          }
        }
        return next;
      }),
    );
  };

  const addRow = () => {
    setItems((cur) => {
      const last = cur[cur.length - 1];
      // Pre-seed dates from previous row so the common case (same dates)
      // doesn't require re-entering. User can override.
      return [
        ...cur,
        makeRow(PRODUCTS[0].slug, {
          pickupDate: last.pickupDate,
          returnDate: last.returnDate,
          multiDay: last.multiDay,
        }),
      ];
    });
  };

  const removeRow = (rowId: string) => {
    setItems((cur) =>
      cur.length === 1 ? cur : cur.filter((r) => r.rowId !== rowId),
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const cart = priced.map((p) => ({
        productSlug: p.productSlug,
        pickupDate: p.pickupDate,
        returnDate: p.effectiveReturn,
        numDays: p.numDays,
      }));
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          accessPoint,
          cart,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        const msg = data.detail
          ? `${data.error ?? "Error"}: ${data.detail}`
          : (data.error ?? "Something went wrong");
        setErrorMsg(msg);
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : String(err));
    }
  };

  // Access-point copy: cart-leaning vs beach-leaning
  const hasCart = priced.some((p) => p.product.category === "cart");
  const hasBeach = priced.some((p) => p.product.category === "beach");
  const accessPointPlaceholder = hasCart && !hasBeach
    ? "Pickup at shop, OR delivery address (e.g. 123 Cinnamon Shore Ln)"
    : hasBeach && !hasCart
      ? "e.g. Access Road 1A · Beach Marker 6 · in front of Cinnamon Shore"
      : "Beach access point AND/OR cart pickup or delivery address";
  const accessPointLabel = hasCart && !hasBeach
    ? "Pickup or delivery"
    : hasBeach && !hasCart
      ? "Beach access point"
      : "Where to set up / drop off";

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white text-bron-deep-blue rounded-2xl p-6 sm:p-8 shadow-lg space-y-5"
    >
      <div className="space-y-4">
        {priced.map((row, idx) => (
          <CartRow
            key={row.rowId}
            row={row}
            index={idx}
            today={today}
            canRemove={items.length > 1}
            onChange={(patch) => updateRow(row.rowId, patch)}
            onRemove={() => removeRow(row.rowId)}
          />
        ))}
        <button
          type="button"
          onClick={addRow}
          className="text-xs font-bold text-[#e8654a] uppercase tracking-widest hover:underline underline-offset-4"
        >
          + Add another rental
        </button>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
          {accessPointLabel}
        </label>
        <input
          type="text"
          name="accessPoint"
          value={accessPoint}
          onChange={(e) => setAccessPoint(e.target.value)}
          placeholder={accessPointPlaceholder}
          required
          className="w-full px-4 py-3 rounded-lg border border-bron-blue/20 focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-bron-blue/20 focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-bron-blue/20 focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg border border-bron-blue/20 focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
        />
      </div>

      <div className="bg-[#f5efe2] rounded-lg p-4">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-bron-deep-blue/60">
              Total
            </p>
            <p className="text-[11px] text-bron-deep-blue/60">
              {priced.length} item{priced.length !== 1 ? "s" : ""}
            </p>
          </div>
          <p className="font-display text-3xl font-bold text-[#e8654a]">
            ${totalDollars}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 rounded-lg bg-[#e8654a] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#d2553c] disabled:opacity-50"
      >
        {status === "loading" ? "Sending you to checkout…" : "Reserve now"}
      </button>

      {status === "error" && (
        <p className="text-sm text-[#e8654a] text-center">{errorMsg}</p>
      )}

      <p className="text-[11px] text-bron-deep-blue/60 text-center">
        Secure payment via Stripe. Free cancellation up to 24 hours before
        rental start.
      </p>
    </form>
  );
}

function CartRow({
  row,
  index,
  today,
  canRemove,
  onChange,
  onRemove,
}: {
  row: CartItemDraft & { product: Product; numDays: number; itemTotalCents: number };
  index: number;
  today: string;
  canRemove: boolean;
  onChange: (patch: Partial<CartItemDraft>) => void;
  onRemove: () => void;
}) {
  const { product } = row;
  const isBeach = product.category === "beach";
  const isCart = product.category === "cart";
  const itemDollars = (row.itemTotalCents / 100).toFixed(0);

  return (
    <div className="border border-bron-blue/15 rounded-lg p-4 space-y-4 bg-[#f5efe2]/50">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[10px] uppercase tracking-widest text-bron-deep-blue/60 font-bold">
          Item {index + 1}
        </p>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-[10px] uppercase tracking-widest text-bron-deep-blue/60 hover:text-[#e8654a]"
          >
            Remove
          </button>
        )}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
          Rental
        </label>
        <select
          value={row.productSlug}
          onChange={(e) => onChange({ productSlug: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-bron-blue/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
        >
          <optgroup label="🏖 Beach Setups">
            {BEACH_PRODUCTS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.label} — ${(p.dailyTotalCents / 100).toFixed(0)}/day
              </option>
            ))}
          </optgroup>
          <optgroup label="🛺 Golf Carts">
            {CART_PRODUCTS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.label} — ${(p.dailyTotalCents / 100).toFixed(0)}/day
              </option>
            ))}
          </optgroup>
        </select>
        <p className="text-xs text-bron-deep-blue/70 mt-1.5">
          {product.shortDescription}
        </p>
      </div>

      {isBeach && !row.multiDay ? (
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
            Setup date
          </label>
          <input
            type="date"
            min={today}
            value={row.pickupDate}
            onChange={(e) => onChange({ pickupDate: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-lg border border-bron-blue/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
          />
          <button
            type="button"
            onClick={() => onChange({ multiDay: true })}
            className="text-xs text-[#e8654a] underline-offset-4 hover:underline mt-2"
          >
            + Need a setup for multiple days?
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
              {isCart ? "Pickup" : "Start"}
            </label>
            <input
              type="date"
              min={today}
              value={row.pickupDate}
              onChange={(e) => onChange({ pickupDate: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg border border-bron-blue/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
              {isCart ? "Return" : "End"}
            </label>
            <input
              type="date"
              min={row.pickupDate || today}
              value={row.returnDate}
              onChange={(e) => onChange({ returnDate: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg border border-bron-blue/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
            />
          </div>
          {isBeach && (
            <button
              type="button"
              onClick={() =>
                onChange({ multiDay: false, returnDate: "" })
              }
              className="col-span-2 text-xs text-bron-deep-blue/60 underline-offset-4 hover:underline justify-self-start"
            >
              ← Single day instead
            </button>
          )}
        </div>
      )}

      <div className="flex items-baseline justify-between border-t border-bron-blue/10 pt-3">
        <p className="text-[11px] text-bron-deep-blue/60">
          {row.numDays} day{row.numDays !== 1 ? "s" : ""} · $
          {(product.dailyTotalCents / 100).toFixed(0)}/day
        </p>
        <p className="font-display text-xl font-bold text-bron-deep-blue">
          ${itemDollars}
        </p>
      </div>
    </div>
  );
}
