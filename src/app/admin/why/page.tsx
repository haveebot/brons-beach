import Link from "next/link";
import WhyCalculator from "./WhyCalculator";

export const dynamic = "force-dynamic";

/**
 * Operator-facing "why HeyeLab vs Cojilio" showcase. Behind /admin/* basic
 * auth — never exposed to customers. Live screen-share artifact for the
 * close conversation: enter Bron's actual monthly digital revenue + his
 * actual Cojilio cost, see the comparison snap into place.
 */
export default function WhyPage() {
  return (
    <main className="min-h-screen bg-[#f5efe2] text-[#1a3a52]">
      <header className="bg-[#1a3a52] text-white border-b-4 border-[#e8654a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link
            href="/admin"
            className="text-xs text-white/70 hover:text-[#f5b35a]"
          >
            ← Dashboard
          </Link>
          <p className="font-display font-bold">
            Why HeyeLab vs your booking stack
          </p>
          <span className="text-[11px] text-[#f5b35a] hidden sm:inline">
            Internal
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <section className="bg-white rounded-2xl border border-[#1a3a52]/10 p-6 sm:p-8 shadow-sm">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#e8654a] font-bold mb-2">
            The shape of the deal
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Subscription out, percentage in.
          </h2>
          <p className="text-base text-[#1a3a52]/80 leading-relaxed">
            Today you pay <strong>three Cojilio subscriptions</strong> every
            month — whether you book one rental or two hundred. With HeyeLab,
            you pay <strong>nothing until a customer books</strong>, then 12%
            comes off the top. We earn when you earn. And you get the website
            + dashboard + agreement system + branded emails included, not as
            extra plans.
          </p>
        </section>

        <WhyCalculator />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ComparePanel
            title="Cojilio · today"
            tone="muted"
            costShape="$ Fixed monthly subscription · 3 instances"
            rows={[
              { label: "Booking infrastructure", yes: true },
              { label: "Customer pays via Clover", yes: true },
              { label: "Customer-facing website", yes: false, note: "Bring your own" },
              { label: "Operator dashboard", yes: true, note: "Cojilio's UI" },
              { label: "Branded customer site", yes: false },
              { label: "Auto-doc rental agreements", yes: false, note: "You print + write" },
              { label: "Branded email confirmations", yes: false, note: "Generic Cojilio emails" },
              { label: "Cross-promote bar / kitchen / sno-ice", yes: false },
              { label: "Phase 2 add-ons (social, brand pack, customer portal)", yes: false, note: "Not on roadmap" },
            ]}
          />
          <ComparePanel
            title="HeyeLab · proposed"
            tone="bright"
            costShape="$0 fixed · 12% of digital revenue only"
            rows={[
              { label: "Booking infrastructure", yes: true },
              { label: "Stripe direct (88% to your bank, daily)", yes: true },
              { label: "Customer-facing website (bronsbeach.com)", yes: true, note: "Live now" },
              { label: "Operator dashboard", yes: true, note: "Custom-branded" },
              { label: "Branded customer site", yes: true },
              { label: "Auto-doc rental agreements", yes: true, note: "Print to PDF in 30 sec" },
              { label: "Branded email confirmations", yes: true, note: "Bron's-branded HTML" },
              { label: "Cross-promote bar / kitchen / sno-ice", yes: true, note: "On every page" },
              { label: "Phase 2 add-ons (social, brand pack, customer portal)", yes: true, note: "Roadmapped" },
            ]}
          />
        </section>

        <section className="bg-[#1a3a52] text-white rounded-2xl p-6 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#f5b35a] font-bold mb-2">
            The value swap
          </p>
          <h3 className="font-display text-2xl font-bold mb-4">
            We take a cut on rentals; we promote everything you do for free.
          </h3>
          <p className="text-sm text-white/85 mb-5 leading-relaxed">
            12% on bookable rentals (carts + beach setups). Zero on the bar,
            kitchen, sno-ice, and to-go bar — but they get promoted on every
            Bron&rsquo;s URL we ship. Cart customers learn about the bar; bar
            visitors see the carts. Cross-promotion is the marketing engine
            you don&rsquo;t pay for separately.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/95">
            <li className="flex gap-2">
              <span className="text-[#f5b35a]">→</span>
              <span>Replace 3 Cojilio subscriptions on day one</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f5b35a]">→</span>
              <span>Branded website at bronsbeach.com (live)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f5b35a]">→</span>
              <span>Daily 88% payouts to your bank account</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f5b35a]">→</span>
              <span>One agreement system across all rentals</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f5b35a]">→</span>
              <span>In-person ops untouched — Phase 2 conversation</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f5b35a]">→</span>
              <span>You can walk away anytime — no annual contracts</span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-[#1a3a52]/10 p-6 sm:p-8 shadow-sm">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#e8654a] font-bold mb-2">
            What we&apos;re not touching
          </p>
          <h3 className="font-display text-xl font-bold mb-3">
            Phase 1 leaves your in-person flow alone.
          </h3>
          <ul className="space-y-2 text-sm text-[#1a3a52]/85">
            <li>• Walk-up cart rentals at the shop — keep doing what you do</li>
            <li>• Bar Clover POS — untouched</li>
            <li>• Phone bookings — keep them coming, just point bookings to bronsbeach.com when natural</li>
            <li>• Paper rental agreements — still work; we add an option, we don&rsquo;t replace</li>
            <li>• Vacation properties — not in scope for this deal</li>
          </ul>
          <p className="mt-4 text-xs text-[#1a3a52]/60 italic">
            Phase 2 is a separate conversation, after we&apos;ve got real
            digital revenue numbers to inform the structure of it.
          </p>
        </section>

        <section className="text-center pb-6">
          <p className="text-xs text-[#1a3a52]/60 italic">
            This page is for Bron&apos;s eyes only — internal walk-in artifact.
          </p>
        </section>
      </div>
    </main>
  );
}

interface CompareRow {
  label: string;
  yes: boolean;
  note?: string;
}

function ComparePanel({
  title,
  tone,
  costShape,
  rows,
}: {
  title: string;
  tone: "muted" | "bright";
  costShape: string;
  rows: CompareRow[];
}) {
  const isBright = tone === "bright";
  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 shadow-sm ${
        isBright
          ? "bg-white border-2 border-[#e8654a]"
          : "bg-white border border-[#1a3a52]/15 opacity-95"
      }`}
    >
      <p
        className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-1 ${
          isBright ? "text-[#e8654a]" : "text-[#1a3a52]/60"
        }`}
      >
        {title}
      </p>
      <p
        className={`text-sm font-bold mb-4 ${
          isBright ? "text-[#1a3a52]" : "text-[#1a3a52]/70"
        }`}
      >
        {costShape}
      </p>
      <ul className="space-y-2 text-sm">
        {rows.map((r) => (
          <li
            key={r.label}
            className="flex items-start gap-3 border-t border-[#1a3a52]/5 pt-2"
          >
            <span
              className={`mt-0.5 inline-block w-5 text-center font-bold ${
                r.yes ? "text-emerald-700" : "text-[#1a3a52]/30"
              }`}
            >
              {r.yes ? "✓" : "✕"}
            </span>
            <span className="flex-1">
              <span className={r.yes ? "text-[#1a3a52]" : "text-[#1a3a52]/60"}>
                {r.label}
              </span>
              {r.note && (
                <span className="block text-[11px] text-[#1a3a52]/55 mt-0.5">
                  {r.note}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
