"use client";

import { useState } from "react";

/**
 * Live cost calculator for the close conversation.
 *
 * Operator screen-shares /admin/why during the walk-in, asks Bron for
 * his actual numbers, types them in, and the comparison snaps to his
 * reality. Numbers are intentionally editable — Bron's monthly digital
 * revenue is a guess until we run real numbers.
 */
export default function WhyCalculator() {
  const [monthlyDigitalRev, setMonthlyDigitalRev] = useState(8000);
  const [cojilioMonthly, setCojilioMonthly] = useState(300);

  const heyeLabFee = monthlyDigitalRev * 0.12;
  const heyeLabAnnual = heyeLabFee * 12;
  const cojilioAnnual = cojilioMonthly * 12;
  const monthlyDelta = heyeLabFee - cojilioMonthly;
  const annualDelta = heyeLabAnnual - cojilioAnnual;
  const breakEven = cojilioMonthly > 0 ? Math.round(cojilioMonthly / 0.12) : 0;
  const isCheaper = monthlyDelta < 0;

  return (
    <section className="bg-gradient-to-br from-[#1a3a52] via-[#2a4a63] to-[#3d6e8c] text-white rounded-2xl p-6 sm:p-8 shadow-md">
      <p className="text-[10px] uppercase tracking-[0.3em] text-[#f5b35a] font-bold mb-2">
        Run the numbers · live
      </p>
      <h3 className="font-display text-2xl font-bold mb-5">
        Plug in your real numbers, see the comparison.
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-white/85">
            Monthly digital booking revenue
          </label>
          <div className="flex items-baseline">
            <span className="text-3xl font-display font-bold text-[#f5b35a] mr-2">
              $
            </span>
            <input
              type="number"
              min={0}
              step={500}
              value={monthlyDigitalRev}
              onChange={(e) => setMonthlyDigitalRev(Number(e.target.value || 0))}
              className="bg-white/10 border-b-2 border-white/30 focus:border-[#f5b35a] text-3xl font-display font-bold text-white px-2 py-1 w-full focus:outline-none"
            />
          </div>
          <p className="text-[11px] text-white/60 mt-2">
            Best guess of digital-channel rentals per month.
          </p>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-white/85">
            Cojilio monthly cost (3 instances)
          </label>
          <div className="flex items-baseline">
            <span className="text-3xl font-display font-bold text-[#f5b35a] mr-2">
              $
            </span>
            <input
              type="number"
              min={0}
              step={25}
              value={cojilioMonthly}
              onChange={(e) => setCojilioMonthly(Number(e.target.value || 0))}
              className="bg-white/10 border-b-2 border-white/30 focus:border-[#f5b35a] text-3xl font-display font-bold text-white px-2 py-1 w-full focus:outline-none"
            />
          </div>
          <p className="text-[11px] text-white/60 mt-2">
            Total of all 3 Cojilio subscription invoices per month.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <ResultCard
          label="HeyeLab cost / mo"
          value={`$${heyeLabFee.toFixed(0)}`}
          sub="12% of digital revenue"
        />
        <ResultCard
          label="Cojilio cost / mo"
          value={`$${cojilioMonthly.toFixed(0)}`}
          sub="Fixed regardless of bookings"
        />
        <ResultCard
          label={isCheaper ? "Monthly savings" : "Monthly difference"}
          value={`${isCheaper ? "−" : "+"}$${Math.abs(monthlyDelta).toFixed(0)}`}
          sub={`${isCheaper ? "−" : "+"}$${Math.abs(annualDelta).toFixed(0)}/yr`}
          highlight={isCheaper ? "good" : "neutral"}
        />
      </div>

      <div className="bg-white/8 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-sm text-white/90 leading-relaxed">
        {isCheaper ? (
          <>
            At <strong>${monthlyDigitalRev.toLocaleString()}/mo</strong> in
            digital revenue, HeyeLab costs about{" "}
            <strong>${Math.abs(monthlyDelta).toFixed(0)}/mo less</strong> than
            your Cojilio stack — plus you get the website, dashboard, agreement
            system, and branded emails included. Break-even is around{" "}
            <strong>${breakEven.toLocaleString()}/mo</strong> in digital
            bookings.
          </>
        ) : (
          <>
            At <strong>${monthlyDigitalRev.toLocaleString()}/mo</strong> in
            digital revenue, HeyeLab&apos;s 12% adds about{" "}
            <strong>${monthlyDelta.toFixed(0)}/mo</strong> over your fixed
            Cojilio cost — but you get the website, dashboard, agreement
            system, branded emails, and the Phase 2 roadmap included. Pay-when-
            you-earn structure means slow weeks cost you nothing.
          </>
        )}
      </div>
    </section>
  );
}

function ResultCard({
  label,
  value,
  sub,
  highlight = "neutral",
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: "neutral" | "good";
}) {
  return (
    <div
      className={`rounded-xl p-4 ${
        highlight === "good"
          ? "bg-[#f5b35a]/15 border border-[#f5b35a]/40"
          : "bg-white/8 border border-white/10"
      }`}
    >
      <p
        className={`font-display text-3xl font-bold ${
          highlight === "good" ? "text-[#f5b35a]" : "text-white"
        }`}
      >
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-widest text-white/70 mt-1 font-semibold">
        {label}
      </p>
      <p className="text-[11px] text-white/50 mt-1">{sub}</p>
    </div>
  );
}
