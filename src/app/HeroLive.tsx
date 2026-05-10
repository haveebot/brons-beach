import HeroLiveTile from "./HeroLiveTile";
import HeroWeatherTile from "./HeroWeatherTile";
import { upcomingActs, todayInPortA } from "@/data/live-music";
import { sunTimesFor, formatPortATime } from "@/lib/sunCalc";
import { openStatus } from "@/lib/openStatus";

/**
 * Live Conditions Hero — the "wow" entry. Editorial type at the top,
 * a row of four live tiles right under it (sunset · music · weather ·
 * open-status), CTAs below. Background: time-of-day-adaptive animated
 * mesh of soft blurred color blobs drifting on a navy canvas. No photos.
 *
 * Server-rendered so sunset/music/open all populate on first paint;
 * weather is a small client island that hydrates after.
 */
export default function HeroLive() {
  const now = new Date();
  const status = openStatus(now);
  const sun = sunTimesFor(now);

  const today = todayInPortA();
  const upcoming = upcomingActs();
  const tonight = upcoming.find((a) => a.date === today);
  const next = tonight ?? upcoming[0];

  // Music tile content
  let musicValue: string;
  let musicSub: string;
  if (tonight) {
    musicValue = tonight.artist;
    musicSub = `${tonight.time} · Bron's Backyard`;
  } else if (next) {
    const d = new Date(next.date + "T12:00:00");
    const dayLabel = d.toLocaleDateString("en-US", { weekday: "short" });
    musicValue = next.artist;
    musicSub = `${dayLabel} · ${next.time}`;
  } else {
    musicValue = "Returns Friday";
    musicSub = "Live music most weekends";
  }

  return (
    <section
      className="relative bg-bron-navy text-white overflow-hidden"
      data-time={status.partOfDay}
    >
      {/* Animated mesh-blob background — pure CSS, four blurred color
          blobs drifting on the navy canvas. Time-of-day class on the
          parent rotates the palette (dawn / day / dusk / night). */}
      <div
        aria-hidden
        className={`absolute inset-0 overflow-hidden mesh-${status.partOfDay}`}
      >
        <span className="mesh-blob mesh-blob-a" />
        <span className="mesh-blob mesh-blob-b" />
        <span className="mesh-blob mesh-blob-c" />
        <span className="mesh-blob mesh-blob-d" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-14 sm:pt-32 sm:pb-20 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-bron-gold font-bold mb-4">
          Port Aransas, TX · 314 E Avenue G
        </p>

        <h1 className="font-display text-[clamp(2.6rem,8vw,5.5rem)] font-bold tracking-tight leading-[0.95] mb-3">
          Today at Bron&apos;s.
        </h1>

        <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed mb-9">
          Beach rentals, golf carts, outdoor bar, kitchen, shaved ice.
          Five spots, one yard, one place to land all day.
        </p>

        {/* Live tiles row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto mb-10 text-left">
          <HeroLiveTile
            icon="🌅"
            label="Sunset"
            value={formatPortATime(sun.sunset)}
            sub="Beach time"
          />
          <HeroLiveTile
            icon="🎶"
            label={tonight ? "Tonight" : "Next up"}
            value={musicValue}
            sub={musicSub}
            highlight={!!tonight}
          />
          <HeroWeatherTile />
          <HeroLiveTile
            icon={status.isOpen ? "🍻" : "🌙"}
            label={status.isOpen ? "The yard" : "The yard"}
            value={status.isOpen ? "Open" : "Closed"}
            sub={status.label.replace(/^Open until |^Closed — /, "")}
            highlight={status.isOpen}
          />
        </div>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href="#book"
            className="px-7 py-3.5 rounded-full bg-bron-coral text-white font-bold text-sm uppercase tracking-widest hover:bg-bron-coral-dark transition-colors shadow-xl shadow-bron-coral/20"
          >
            Reserve a rental
          </a>
          <a
            href="#yard"
            className="px-7 py-3.5 rounded-full border-2 border-white/40 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            Visit the yard
          </a>
        </div>
      </div>
    </section>
  );
}
