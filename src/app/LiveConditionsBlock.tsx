import LiveConditionsTile from "./LiveConditionsTile";
import LiveConditionsWeather from "./LiveConditionsWeather";
import { sunTimesFor, formatPortATime } from "@/lib/sunCalc";
import { openStatus } from "@/lib/openStatus";
import { upcomingActs, todayInPortA } from "@/data/live-music";

/**
 * "Right now on the island" — attractive live-conditions block. Sits
 * between the rental tiles and the booking form. Shows sunset, music,
 * weather, and current open-status as an editorial moment, not a
 * dashboard strip. Server-rendered for fast paint; weather hydrates as
 * a client island.
 *
 * Background: navy with an ambient sun glow off-center for atmosphere
 * (small echo of the hero rising sun without competing).
 */
export default function LiveConditionsBlock() {
  const now = new Date();
  const status = openStatus(now);
  const sun = sunTimesFor(now);

  const today = todayInPortA();
  const upcoming = upcomingActs();
  const tonight = upcoming.find((a) => a.date === today);
  const next = tonight ?? upcoming[0];

  let musicValue: string;
  let musicSub: string;
  if (tonight) {
    musicValue = tonight.artist;
    musicSub = `Tonight · ${tonight.time} · Bron's Backyard`;
  } else if (next) {
    const d = new Date(next.date + "T12:00:00");
    const dayLabel = d.toLocaleDateString("en-US", { weekday: "long" });
    musicValue = next.artist;
    musicSub = `${dayLabel} · ${next.time}`;
  } else {
    musicValue = "Returns Friday";
    musicSub = "Live music most weekends";
  }

  // Now-as-of stamp (Chicago-local) so the block visibly feels live
  const stamp = now.toLocaleString("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <section className="relative bg-bron-blue text-white overflow-hidden isolate">
      {/* Ambient sun glow off-center — atmospheric, not competing */}
      <div
        aria-hidden
        className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(246,192,38,0.32), rgba(255,77,139,0.18) 55%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-[440px] h-[440px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,139,77,0.28), transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-14 sm:py-20">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[11px] uppercase tracking-[0.35em] text-bron-orange font-bold mb-3">
            Live from Avenue G · {stamp} Port A
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            Right now on the island.
          </h2>
          <p className="text-sm sm:text-base text-white/75 max-w-xl mx-auto mt-3">
            Updates by the minute. So you know what to wear, when to head
            down, and what the yard&apos;s doing tonight.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {/* Tile colors per Collie's homepage revisions mockup:
              sunset → deep-blue, weather → pink, music → orange, yard → teal. */}
          <LiveConditionsTile
            icon="🌅"
            label="Sunset"
            value={formatPortATime(sun.sunset)}
            sub="Beach time on the Gulf"
            bgClass="bg-bron-deep-blue"
          />
          <LiveConditionsWeather />
          <LiveConditionsTile
            icon="🎶"
            label={tonight ? "Tonight" : "Next up"}
            value={musicValue}
            sub={musicSub}
            bgClass="bg-bron-orange"
          />
          <LiveConditionsTile
            icon={status.isOpen ? "🍻" : "🌙"}
            label="The yard"
            value={status.isOpen ? "Open" : "Closed"}
            sub={status.label.replace(/^Open until |^Closed — /, "")}
            bgClass="bg-bron-teal"
          />
        </div>
      </div>
    </section>
  );
}
