import Link from "next/link";

export const dynamic = "force-dynamic";

/**
 * Bron's operator dashboard — read-only mock for the walk-in demo.
 *
 * Phase 1 scope: digital revenue only. Two streams (beach + carts).
 * Mock data designed to look real; replaces with live queries after
 * Stripe Connect onboarding + deal sign-off.
 */
export default function AdminDashboardPage() {
  const today = new Date();
  const todayLabel = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#f5efe2] text-[#1a3a52]">
      <header className="bg-[#1a3a52] text-white border-b-4 border-[#e8654a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xs text-white/70 hover:text-[#f5b35a]"
          >
            ← Back to bronsbeach.com
          </Link>
          <p className="font-display font-bold">Bron&apos;s Operations</p>
          <span className="text-[11px] text-[#f5b35a] hidden sm:inline">
            Admin
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Demo banner */}
        <div className="rounded-xl bg-amber-50 border border-amber-300 px-4 py-3 text-amber-900 text-xs">
          <strong>Demo surface:</strong> mock data for walk-in preview.
          Live data wires up after Stripe Connect onboarding + deal sign-off.
        </div>

        {/* Phase context */}
        <div className="rounded-xl bg-white border border-[#1a3a52]/10 px-5 py-4 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest text-[#e8654a] font-bold mb-1">
            Phase 1 — Digital revenue only
          </p>
          <p className="text-sm text-[#1a3a52]">
            <strong>{todayLabel}</strong> · 2 active streams: beach setups
            + cart rentals
          </p>
          <p className="text-[11px] text-[#1a3a52]/60 mt-1">
            In-person walk-ups, phone bookings, and bar / kitchen / shaved
            ice sales aren&apos;t tracked here — those run on your existing
            systems, untouched.
          </p>
        </div>

        {/* Top stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat
            label="Today's online bookings"
            value="9"
            sub="+3 vs avg"
            tone="emerald"
          />
          <Stat
            label="Today's online revenue"
            value="$1,452"
            sub="net to you: $1,278"
          />
          <Stat
            label="This week's payout"
            value="$8,294"
            sub="Stripe → bank Mon AM"
          />
          <Stat
            label="Online conversion"
            value="11.2%"
            sub="visitors → bookings"
          />
        </section>

        {/* Two streams */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stream 1: Beach */}
          <div className="bg-white rounded-2xl border border-[#1a3a52]/10 p-6 shadow-sm">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="font-display text-xl font-bold">
                🏖 Beach rentals
              </h2>
              <span className="text-[10px] uppercase tracking-widest text-[#1a3a52]/60">
                online stream
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <SubStat label="Bookings today" value="3" />
              <SubStat label="Revenue today" value="$474" />
              <SubStat label="Avg ticket" value="$158" />
              <SubStat label="Multi-day rate" value="42%" />
            </div>
            <p className="text-[11px] uppercase tracking-widest text-[#1a3a52]/60 font-semibold mb-2">
              Today&apos;s beach bookings
            </p>
            <div className="divide-y divide-[#1a3a52]/10 text-xs">
              {SAMPLE_BEACH_BOOKINGS.map((b) => (
                <div
                  key={b.id}
                  className="py-2 flex items-baseline gap-2 flex-wrap"
                >
                  <span className="font-mono text-[#1a3a52]/60">{b.time}</span>
                  <span className="font-bold">{b.customer}</span>
                  <span className="text-[#1a3a52]/70">{b.product}</span>
                  <span className="ml-auto font-mono font-bold">${b.total}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stream 2: Carts */}
          <div className="bg-white rounded-2xl border border-[#1a3a52]/10 p-6 shadow-sm">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="font-display text-xl font-bold">🛺 Cart rentals</h2>
              <span className="text-[10px] uppercase tracking-widest text-[#1a3a52]/60">
                online stream
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <SubStat label="Bookings today" value="6" />
              <SubStat label="Revenue today" value="$978" />
              <SubStat label="Avg ticket" value="$163" />
              <SubStat label="Multi-day rate" value="68%" />
            </div>
            <p className="text-[11px] uppercase tracking-widest text-[#1a3a52]/60 font-semibold mb-2">
              Today&apos;s cart bookings
            </p>
            <div className="divide-y divide-[#1a3a52]/10 text-xs">
              {SAMPLE_CART_BOOKINGS.map((b) => (
                <div
                  key={b.id}
                  className="py-2 flex items-baseline gap-2 flex-wrap"
                >
                  <span className="font-mono text-[#1a3a52]/60">{b.time}</span>
                  <span className="font-bold">{b.customer}</span>
                  <span className="text-[#1a3a52]/70">{b.product}</span>
                  <span className="ml-auto font-mono font-bold">${b.total}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stripe payouts */}
        <section className="bg-white rounded-2xl border border-[#1a3a52]/10 p-6 shadow-sm">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-display text-xl font-bold">Stripe payouts</h2>
            <span className="text-[10px] uppercase tracking-widest text-[#1a3a52]/60">
              digital revenue · 88% to your account
            </span>
          </div>
          <div className="space-y-2">
            {SAMPLE_PAYOUTS.map((p) => (
              <div
                key={p.date}
                className="flex items-baseline justify-between border-b border-[#1a3a52]/10 pb-2"
              >
                <div>
                  <p className="text-sm font-bold">{p.date}</p>
                  <p className="text-[11px] text-[#1a3a52]/60">
                    {p.bookings} online booking
                    {p.bookings !== 1 ? "s" : ""} · gross ${p.gross}
                  </p>
                </div>
                <p className="font-mono font-bold text-emerald-700">
                  +${p.net}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#1a3a52]/60 mt-4 italic">
            Auto-transfer to your bank account every weekday morning. No
            invoices, no waiting — your 88% lands daily.
          </p>
        </section>

        {/* Phase 2 tease */}
        <section className="bg-[#1a3a52] text-white rounded-2xl p-6 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#f5b35a] font-bold mb-2">
            Phase 1 → Phase 2
          </p>
          <h2 className="font-display text-2xl font-bold mb-3">
            What we add to your digital ops over the next 60 days
          </h2>
          <p className="text-sm text-white/85 mb-5 leading-relaxed">
            Phase 1 scope is digital-only. Everything below extends what
            you see on this dashboard — no in-person changes.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <li className="flex gap-3">
              <span className="text-[#f5b35a]">→</span>
              <span>Auto-reminder text to customer the day before pickup</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#f5b35a]">→</span>
              <span>Customer-portal logins (rebook in one tap, view history)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#f5b35a]">→</span>
              <span>Brand-pack generator (logos, sheets, PDF menus on demand)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#f5b35a]">→</span>
              <span>Auto-post weekly highlights to your FB + IG</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#f5b35a]">→</span>
              <span>Email blast to past customers when peak weekends near</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#f5b35a]">→</span>
              <span>Customer e-sign for digital rental agreements</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#f5b35a]">→</span>
              <span>Multi-product cart (beach + cart in one transaction)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#f5b35a]">→</span>
              <span>Off-season promo automation (low-utilization weeks fill themselves)</span>
            </li>
          </ul>
          <p className="text-xs text-white/70 mt-6 italic border-t border-white/15 pt-4">
            <strong>Phase 2 conversation</strong> — when digital is
            performing, we talk about extending into your in-person flow.
            Different scope, different conversation. We&apos;ll have real
            numbers to inform that one.
          </p>
        </section>

        {/* Quick actions */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/admin/agreement"
            className="bg-[#e8654a] text-white rounded-xl p-4 font-bold text-sm uppercase tracking-widest hover:bg-[#d2553c] text-center"
          >
            New rental agreement
          </Link>
          <Link
            href="/"
            className="bg-white border border-[#1a3a52]/15 rounded-xl p-4 font-bold text-sm hover:border-[#1a3a52]/40 text-[#1a3a52] text-center"
          >
            View customer site →
          </Link>
          <span className="bg-white border border-[#1a3a52]/15 rounded-xl p-4 font-bold text-sm text-[#1a3a52]/60 text-center cursor-not-allowed">
            Live data sync (post-deal)
          </span>
        </section>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  sub,
  tone = "navy",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "navy" | "emerald";
}) {
  const valueClass =
    tone === "emerald" ? "text-emerald-700" : "text-[#1a3a52]";
  return (
    <div className="bg-white rounded-xl border border-[#1a3a52]/10 p-4">
      <p className={`font-display text-2xl font-bold ${valueClass}`}>
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-widest text-[#1a3a52]/60 mt-1">
        {label}
      </p>
      {sub && <p className="text-[10px] text-[#1a3a52]/50 mt-1">{sub}</p>}
    </div>
  );
}

function SubStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#f5efe2] rounded-lg px-3 py-2">
      <p className="font-display text-lg font-bold">{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-[#1a3a52]/60">
        {label}
      </p>
    </div>
  );
}

const SAMPLE_BEACH_BOOKINGS = [
  { id: 1, time: "9:00am", customer: "K. Williams", product: "Cabana setup", total: "175" },
  { id: 2, time: "9:30am", customer: "T. Patterson", product: "Chair & umbrella", total: "45" },
  { id: 3, time: "10:00am", customer: "Sandcastle group", product: "Beach tent + cooler", total: "90" },
];

const SAMPLE_CART_BOOKINGS = [
  { id: 1, time: "8:30am", customer: "Mendoza family", product: "6-pass · 3 days", total: "540" },
  { id: 2, time: "10:30am", customer: "B. Holloway", product: "4-pass · 1 day", total: "150" },
  { id: 3, time: "11:15am", customer: "Reyes party", product: "6-pass · 2 days", total: "360" },
  { id: 4, time: "1:00pm", customer: "Davis bachelor (6)", product: "6-pass · 2 days", total: "360" },
  { id: 5, time: "2:30pm", customer: "Garcia bachelorette", product: "6-pass · 1 day", total: "180" },
  { id: 6, time: "3:45pm", customer: "K. Williams", product: "4-pass · 1 day", total: "150" },
];

const SAMPLE_PAYOUTS = [
  { date: "Tomorrow (Mon)", bookings: 9, gross: "1,452", net: "1,278" },
  { date: "Last Fri", bookings: 14, gross: "2,238", net: "1,969" },
  { date: "Last Thu", bookings: 8, gross: "1,156", net: "1,017" },
  { date: "Last Wed", bookings: 6, gross: "892", net: "785" },
];
