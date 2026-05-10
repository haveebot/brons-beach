"use client";

import { useState } from "react";
import { BEACH_PRODUCTS, CART_PRODUCTS, PRODUCTS } from "@/data/products";

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

export default function BookingForm() {
  const today = todayStr();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    product: PRODUCTS[0].slug,
    pickupDate: "",
    returnDate: "",
    accessPoint: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const selected = PRODUCTS.find((p) => p.slug === form.product)!;
  const numDays =
    form.pickupDate && form.returnDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(form.returnDate).getTime() -
              new Date(form.pickupDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ) + 1,
        )
      : 1;
  const totalDollars = ((selected.dailyTotalCents * numDays) / 100).toFixed(2);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, numDays }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong");
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : String(err));
    }
  };

  // Category-aware placeholder for the "where" field
  const accessPointPlaceholder =
    selected.category === "cart"
      ? "Pickup at shop, OR delivery address (e.g. 123 Cinnamon Shore Ln)"
      : "e.g. Access Road 1A · Beach Marker 6 · in front of Cinnamon Shore";
  const accessPointLabel =
    selected.category === "cart" ? "Pickup or delivery" : "Beach access point";

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white text-[#1a3a52] rounded-2xl p-6 sm:p-8 shadow-lg space-y-5"
    >
      <div>
        <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
          What you&apos;re renting
        </label>
        <select
          name="product"
          value={form.product}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-[#1a3a52]/20 bg-[#f5efe2] focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
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
        <p className="text-xs text-[#1a3a52]/70 mt-1.5">
          {selected.shortDescription}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
            Start
          </label>
          <input
            type="date"
            name="pickupDate"
            min={today}
            value={form.pickupDate}
            onChange={onChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-[#1a3a52]/20 focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
            End
          </label>
          <input
            type="date"
            name="returnDate"
            min={form.pickupDate || today}
            value={form.returnDate}
            onChange={onChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-[#1a3a52]/20 focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
          {accessPointLabel}
        </label>
        <input
          type="text"
          name="accessPoint"
          value={form.accessPoint}
          onChange={onChange}
          placeholder={accessPointPlaceholder}
          required
          className="w-full px-4 py-3 rounded-lg border border-[#1a3a52]/20 focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
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
            value={form.name}
            onChange={onChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-[#1a3a52]/20 focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-[#1a3a52]/20 focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
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
          value={form.email}
          onChange={onChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-[#1a3a52]/20 focus:outline-none focus:ring-2 focus:ring-[#e8654a]"
        />
      </div>

      <div className="bg-[#f5efe2] rounded-lg p-4 flex items-baseline justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#1a3a52]/60">
            Total
          </p>
          <p className="text-[11px] text-[#1a3a52]/60">
            {numDays} day{numDays !== 1 ? "s" : ""} · $
            {(selected.dailyTotalCents / 100).toFixed(0)}/day
          </p>
        </div>
        <p className="font-display text-3xl font-bold text-[#e8654a]">
          ${totalDollars}
        </p>
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

      <p className="text-[11px] text-[#1a3a52]/60 text-center">
        Secure payment via Stripe. Free cancellation up to 24 hours before
        rental start.
      </p>
    </form>
  );
}
