import Link from "next/link";

export const dynamic = "force-dynamic";

/**
 * Bron's operator dashboard — real operating surface.
 *
 * Two streams (beach + carts), today-first framing, empty states until
 * data lands. Pitch artifacts (the comparison page, the roadmap pitch)
 * live elsewhere — this is the tool he uses every morning.
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
            ← bronsbeach.com
          </Link>
          <p className="font-display font-bold">Bron&apos;s Operations</p>
          <span className="text-[11px] text-[#f5b35a] hidden sm:inline">
            Admin
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Today's greeting */}
        <div className="rounded-xl bg-white border border-[#1a3a52]/10 px-5 py-4 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest text-[#e8654a] font-bold mb-1">
            Today
          </p>
          <p className="text-sm text-[#1a3a52]">
            <strong>{todayLabel}</strong>
          </p>
          <p className="text-[11px] text-[#1a3a52]/60 mt-1">
            Tracking your two digital streams: beach setups and cart rentals.
            In-person walk-ups, phone bookings, and bar/kitchen sales run on
            your existing systems.
          </p>
        </div>

        {/* Top stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat
            label="Today's online bookings"
            value="0"
            sub="—"
          />
          <Stat
            label="Today's online revenue"
            value="$0"
            sub="—"
          />
          <Stat
            label="This week's payout"
            value="—"
            sub="Posts after first booking"
          />
          <Stat
            label="Online conversion"
            value="—"
            sub="Visitors → bookings"
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
              <SubStat label="Bookings today" value="0" />
              <SubStat label="Revenue today" value="$0" />
              <SubStat label="Avg ticket" value="—" />
              <SubStat label="Multi-day rate" value="—" />
            </div>
            <p className="text-[11px] uppercase tracking-widest text-[#1a3a52]/60 font-semibold mb-2">
              Today&apos;s beach bookings
            </p>
            <EmptyRow message="First beach bookings land here as they come in." />
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
              <SubStat label="Bookings today" value="0" />
              <SubStat label="Revenue today" value="$0" />
              <SubStat label="Avg ticket" value="—" />
              <SubStat label="Multi-day rate" value="—" />
            </div>
            <p className="text-[11px] uppercase tracking-widest text-[#1a3a52]/60 font-semibold mb-2">
              Today&apos;s cart bookings
            </p>
            <EmptyRow message="First cart bookings land here as they come in." />
          </div>
        </section>

        {/* Stripe payouts */}
        <section className="bg-white rounded-2xl border border-[#1a3a52]/10 p-6 shadow-sm">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-display text-xl font-bold">Stripe payouts</h2>
            <span className="text-[10px] uppercase tracking-widest text-[#1a3a52]/60">
              88% to your account · daily
            </span>
          </div>
          <EmptyRow message="First payout posts the morning after your first online booking. Auto-transfers continue every weekday." />
        </section>

        {/* Quick actions */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Link
            href="/admin/agreement"
            className="bg-[#e8654a] text-white rounded-xl p-4 font-bold text-sm uppercase tracking-widest hover:bg-[#d2553c] text-center"
          >
            New agreement
          </Link>
          <Link
            href="/"
            className="bg-white border border-[#1a3a52]/15 rounded-xl p-4 font-bold text-sm hover:border-[#1a3a52]/40 text-[#1a3a52] text-center"
          >
            Customer site →
          </Link>
          <a
            href={`tel:+13612907143`}
            className="bg-white border border-[#1a3a52]/15 rounded-xl p-4 font-bold text-sm hover:border-[#1a3a52]/40 text-[#1a3a52] text-center"
          >
            Reservations line
          </a>
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

function EmptyRow({ message }: { message: string }) {
  return (
    <div className="bg-[#f5efe2]/60 border border-dashed border-[#1a3a52]/15 rounded-lg px-4 py-6 text-center">
      <p className="text-xs text-[#1a3a52]/65 leading-relaxed max-w-md mx-auto">
        {message}
      </p>
    </div>
  );
}
