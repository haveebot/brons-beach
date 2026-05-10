"use client";

import { useState } from "react";

/**
 * Bron's rental agreement — verified-verbatim liability framework
 * sourced from bronsbeachcarts.com/policies-%26-regulations on
 * 2026-05-09. Update this single const → every generated agreement
 * reflects the change.
 */
const LIABILITY_FRAMEWORK = {
  damageScale: [
    { label: "Water damage", range: "$1,000 to $8,000+" },
    { label: "Cart tipping", range: "$1,000 to $5,000" },
    { label: "Refuel fee (cart returned without fuel)", range: "$30" },
  ],
  generalLiabilityClause:
    "The person renting the cart is responsible for any replacement, repair, or loss.",
  thirdPartyClause:
    "In the event of damage involving a third party, the renter must obtain insurance and license information from that driver and file a police report.",
  driverRequirement:
    "Only people with a valid driver's license may drive the golf cart. Child car seat requirements apply if required in vehicles.",
  geographicRestrictions: [
    "No Highway 361 south of Avenue G",
    "No reckless driving (no speeding, donuts, driving in sand dunes, etc.)",
    "Don't drive past mile marker 60",
    "Don't drive in the water",
    "Stay behind the pylons",
    "No public sidewalks or pedestrian walkways",
  ],
};

const PRODUCT_LABELS = [
  "4-Passenger Golf Cart",
  "6-Passenger Golf Cart",
  "Chair & Umbrella Setup",
  "Family Cabana Setup",
  "Cooler with Ice",
  "Beach Shade Tent",
  "Other (custom)",
];

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function fmtDate(iso: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function AgreementGenerator() {
  const today = todayStr();
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState({
    rentalId: `BRN-${Math.floor(Math.random() * 90000) + 10000}`,
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerLicense: "",
    customerLicenseState: "TX",
    productLabel: PRODUCT_LABELS[1],
    customProduct: "",
    cartNumber: "",
    pickupDate: "",
    returnDate: "",
    totalAmount: "",
    deposit: "",
    notes: "",
  });

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (showPreview) {
    const product =
      form.productLabel === "Other (custom)"
        ? form.customProduct
        : form.productLabel;
    const isCart = product.toLowerCase().includes("cart");
    return (
      <div>
        <div className="flex items-center gap-3 mb-6 print:hidden flex-wrap">
          <button
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 rounded-lg border border-[#1a3a52]/20 hover:bg-white text-sm font-bold"
          >
            ← Edit
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-lg bg-[#e8654a] text-white hover:bg-[#d2553c] text-sm font-bold uppercase tracking-widest"
          >
            Print / Save as PDF
          </button>
          <span className="text-xs text-[#1a3a52]/60 ml-auto">
            Tip — use the browser&apos;s &ldquo;Save as PDF&rdquo; option
            in the print dialog
          </span>
        </div>

        <article className="bg-white border border-[#1a3a52]/15 rounded-2xl p-8 sm:p-12 print:border-0 print:shadow-none print:rounded-none">
          <header className="text-center mb-8 pb-6 border-b border-[#1a3a52]/15">
            <p className="text-xs uppercase tracking-[0.3em] text-[#e8654a] font-bold mb-2">
              Bron&apos;s Beach Carts &amp; Backyard
            </p>
            <h1 className="font-display text-3xl font-bold mb-2">
              Rental Agreement
            </h1>
            <p className="text-xs text-[#1a3a52]/60 font-mono">
              ID {form.rentalId} · Issued {fmtDate(today)}
            </p>
          </header>

          <section className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#1a3a52]/60 font-bold mb-2">
                Renter
              </p>
              <p className="font-bold">
                {form.customerName || "[Customer Name]"}
              </p>
              <p className="text-sm text-[#1a3a52]/85">
                {form.customerPhone || "[Phone]"}
              </p>
              <p className="text-sm text-[#1a3a52]/85">
                {form.customerEmail || "[Email]"}
              </p>
              <p className="text-sm text-[#1a3a52]/85 mt-1">
                License: {form.customerLicense || "[License #]"} ·{" "}
                {form.customerLicenseState}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#1a3a52]/60 font-bold mb-2">
                Rental
              </p>
              <p className="font-bold">{product || "[Product]"}</p>
              {form.cartNumber && (
                <p className="text-sm text-[#1a3a52]/85">
                  Unit: {form.cartNumber}
                </p>
              )}
              <p className="text-sm text-[#1a3a52]/85 mt-1">
                <strong>Start:</strong> {fmtDate(form.pickupDate)}
              </p>
              <p className="text-sm text-[#1a3a52]/85">
                <strong>Return:</strong> {fmtDate(form.returnDate)}
              </p>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-6 mb-8 bg-[#f5efe2] rounded-lg p-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#1a3a52]/60 font-bold mb-1">
                Total
              </p>
              <p className="font-display text-2xl font-bold">
                ${form.totalAmount || "0.00"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#1a3a52]/60 font-bold mb-1">
                Damage hold / deposit
              </p>
              <p className="font-display text-2xl font-bold">
                ${form.deposit || "0.00"}
              </p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-bold mb-3">
              Damage liability
            </h2>
            <p className="text-sm text-[#1a3a52]/85 mb-3 leading-relaxed">
              {LIABILITY_FRAMEWORK.generalLiabilityClause}
            </p>
            <ul className="space-y-1.5 text-sm">
              {LIABILITY_FRAMEWORK.damageScale.map((d) => (
                <li
                  key={d.label}
                  className="flex justify-between border-b border-[#1a3a52]/10 pb-1"
                >
                  <span>{d.label}</span>
                  <span className="font-mono font-bold">{d.range}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-[#1a3a52]/85 mt-3 leading-relaxed">
              {LIABILITY_FRAMEWORK.thirdPartyClause}
            </p>
          </section>

          {isCart && (
            <>
              <section className="mb-6">
                <h2 className="font-display text-lg font-bold mb-3">
                  Driver requirements
                </h2>
                <p className="text-sm text-[#1a3a52]/85 leading-relaxed">
                  {LIABILITY_FRAMEWORK.driverRequirement}
                </p>
              </section>

              <section className="mb-6">
                <h2 className="font-display text-lg font-bold mb-3">
                  Where you can drive
                </h2>
                <ul className="space-y-1 text-sm text-[#1a3a52]/85">
                  {LIABILITY_FRAMEWORK.geographicRestrictions.map((r) => (
                    <li key={r} className="flex gap-2">
                      <span className="text-[#e8654a]">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {form.notes && (
            <section className="mb-6">
              <h2 className="font-display text-lg font-bold mb-3">Notes</h2>
              <p className="text-sm text-[#1a3a52]/85 whitespace-pre-line leading-relaxed">
                {form.notes}
              </p>
            </section>
          )}

          <section className="grid grid-cols-2 gap-6 mt-12 pt-8 border-t border-[#1a3a52]/15">
            <div>
              <div className="border-b-2 border-[#1a3a52] h-16" />
              <p className="text-xs text-[#1a3a52]/85 mt-2">
                Renter signature — {form.customerName || "[Name]"}
              </p>
              <p className="text-xs text-[#1a3a52]/60">
                Date: __________________
              </p>
            </div>
            <div>
              <div className="border-b-2 border-[#1a3a52] h-16" />
              <p className="text-xs text-[#1a3a52]/85 mt-2">
                Bron&apos;s Beach Carts representative
              </p>
              <p className="text-xs text-[#1a3a52]/60">
                Date: __________________
              </p>
            </div>
          </section>

          <footer className="text-center mt-12 pt-6 border-t border-[#1a3a52]/10">
            <p className="text-[10px] uppercase tracking-widest text-[#1a3a52]/60">
              Bron&apos;s Beach Carts &amp; Backyard · 314 E Avenue G,
              Port Aransas, TX
            </p>
            <p className="text-[10px] text-[#1a3a52]/50 mt-1 font-mono">
              {form.rentalId}
            </p>
          </footer>
        </article>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">
        New rental agreement
      </h1>
      <p className="text-sm text-[#1a3a52]/70 mb-8">
        Fill in the booking-specific details. Bron&apos;s verified liability
        framework auto-merges. Result is a printable agreement ready to
        save as PDF or text to the customer.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShowPreview(true);
        }}
        className="bg-white border border-[#1a3a52]/15 rounded-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
              Rental ID
            </label>
            <input
              name="rentalId"
              value={form.rentalId}
              onChange={onChange}
              className="w-full px-4 py-2.5 rounded-lg border border-[#1a3a52]/20 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-1.5">
              Cart / unit number (optional)
            </label>
            <input
              name="cartNumber"
              value={form.cartNumber}
              onChange={onChange}
              placeholder="e.g. Cart 12"
              className="w-full px-4 py-2.5 rounded-lg border border-[#1a3a52]/20 font-mono"
            />
          </div>
        </div>

        <fieldset className="border-t border-[#1a3a52]/10 pt-6">
          <legend className="text-xs uppercase tracking-widest font-bold text-[#1a3a52]/60 mb-3">
            Customer
          </legend>
          <div className="space-y-3">
            <input
              name="customerName"
              value={form.customerName}
              onChange={onChange}
              placeholder="Full name"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-[#1a3a52]/20"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                name="customerPhone"
                type="tel"
                value={form.customerPhone}
                onChange={onChange}
                placeholder="Phone"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#1a3a52]/20"
              />
              <input
                name="customerEmail"
                type="email"
                value={form.customerEmail}
                onChange={onChange}
                placeholder="Email"
                className="w-full px-4 py-2.5 rounded-lg border border-[#1a3a52]/20"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <input
                name="customerLicense"
                value={form.customerLicense}
                onChange={onChange}
                placeholder="Driver's license #"
                className="col-span-2 w-full px-4 py-2.5 rounded-lg border border-[#1a3a52]/20 font-mono"
              />
              <input
                name="customerLicenseState"
                value={form.customerLicenseState}
                onChange={onChange}
                placeholder="State"
                maxLength={2}
                className="w-full px-4 py-2.5 rounded-lg border border-[#1a3a52]/20 font-mono uppercase"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border-t border-[#1a3a52]/10 pt-6">
          <legend className="text-xs uppercase tracking-widest font-bold text-[#1a3a52]/60 mb-3">
            Rental
          </legend>
          <div className="space-y-3">
            <select
              name="productLabel"
              value={form.productLabel}
              onChange={onChange}
              className="w-full px-4 py-2.5 rounded-lg border border-[#1a3a52]/20 bg-white"
            >
              {PRODUCT_LABELS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {form.productLabel === "Other (custom)" && (
              <input
                name="customProduct"
                value={form.customProduct}
                onChange={onChange}
                placeholder="Custom product label"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#1a3a52]/20"
              />
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 text-[#1a3a52]/60">
                  Start date
                </label>
                <input
                  name="pickupDate"
                  type="date"
                  min={today}
                  value={form.pickupDate}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-[#1a3a52]/20"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 text-[#1a3a52]/60">
                  Return date
                </label>
                <input
                  name="returnDate"
                  type="date"
                  min={form.pickupDate || today}
                  value={form.returnDate}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-[#1a3a52]/20"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 text-[#1a3a52]/60">
                  Total ($)
                </label>
                <input
                  name="totalAmount"
                  type="text"
                  value={form.totalAmount}
                  onChange={onChange}
                  placeholder="182.00"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#1a3a52]/20 font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 text-[#1a3a52]/60">
                  Damage hold / deposit ($)
                </label>
                <input
                  name="deposit"
                  type="text"
                  value={form.deposit}
                  onChange={onChange}
                  placeholder="500.00"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#1a3a52]/20 font-mono"
                />
              </div>
            </div>
            <textarea
              name="notes"
              value={form.notes}
              onChange={onChange}
              placeholder="Any custom notes for this rental (optional)"
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-[#1a3a52]/20"
            />
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full py-3.5 rounded-lg bg-[#1a3a52] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#2a4a63]"
        >
          Generate agreement →
        </button>
      </form>
    </div>
  );
}
