import HeroStatusWeather from "./HeroStatusWeather";
import { upcomingActs, todayInPortA } from "@/data/live-music";
import { sunTimesFor, formatPortATime } from "@/lib/sunCalc";
import { openStatus } from "@/lib/openStatus";

/**
 * Thin live-conditions strip just below the magazine hero. Sand background
 * with navy text — visual break between hero and the rest of the page,
 * carries the "site is alive" signal without competing with the hero.
 *
 * Mobile: horizontal scroll. Desktop: 4 items spaced across.
 */
export default function HeroStatusStrip() {
  const now = new Date();
  const status = openStatus(now);
  const sun = sunTimesFor(now);

  const today = todayInPortA();
  const upcoming = upcomingActs();
  const tonight = upcoming.find((a) => a.date === today);
  const next = tonight ?? upcoming[0];

  let musicLabel: string;
  if (tonight) musicLabel = `Tonight: ${tonight.artist} · ${tonight.time}`;
  else if (next) {
    const d = new Date(next.date + "T12:00:00");
    const dayLabel = d.toLocaleDateString("en-US", { weekday: "short" });
    musicLabel = `Next up: ${next.artist} · ${dayLabel} ${next.time}`;
  } else musicLabel = "Music returns Friday";

  return (
    <div className="bg-bron-sand border-y border-bron-navy/10">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-x-6 gap-y-2 overflow-x-auto whitespace-nowrap text-bron-navy/85 text-[13px] sm:text-sm font-medium">
        <StripItem icon="🌅">Sunset {formatPortATime(sun.sunset)}</StripItem>
        <Sep />
        <HeroStatusWeather />
        <Sep />
        <StripItem icon={status.isOpen ? "🍻" : "🌙"} highlight={status.isOpen}>
          {status.label}
        </StripItem>
        <Sep />
        <StripItem icon="🎶" highlight={!!tonight}>
          {musicLabel}
        </StripItem>
      </div>
    </div>
  );
}

function StripItem({
  icon,
  children,
  highlight = false,
}: {
  icon: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${
        highlight ? "text-bron-coral font-semibold" : ""
      }`}
    >
      <span className="opacity-90">{icon}</span>
      <span>{children}</span>
    </span>
  );
}

function Sep() {
  return (
    <span aria-hidden className="text-bron-navy/30 select-none">
      •
    </span>
  );
}
