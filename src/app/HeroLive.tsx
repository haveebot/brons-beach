/**
 * Vintage tropical marquee hero. Cream paper canvas, slow-spinning sunburst
 * behind a massive Bungee Shade "BRON'S" mark, scalloped marquee canopy
 * pulled in from the bottom, and a live-data letterboard scrolling across
 * the bottom of the hero. References: coastal Texas honkytonk signage,
 * Margaritaville-era tiki marquees, midcentury motel cards.
 */

import HeroMarquee from "./HeroMarquee";
import { sunTimesFor, formatPortATime } from "@/lib/sunCalc";
import { openStatus } from "@/lib/openStatus";
import { upcomingActs, todayInPortA } from "@/data/live-music";

export default function HeroLive() {
  const now = new Date();
  const status = openStatus(now);
  const sun = sunTimesFor(now);

  const today = todayInPortA();
  const upcoming = upcomingActs();
  const tonight = upcoming.find((a) => a.date === today);
  const next = tonight ?? upcoming[0];

  // Live tokens for the marquee strip
  let musicLine: string;
  if (tonight) musicLine = `Tonight · ${tonight.artist.toUpperCase()} at ${tonight.time}`;
  else if (next) {
    const d = new Date(next.date + "T12:00:00");
    const dayLabel = d.toLocaleDateString("en-US", { weekday: "long" });
    musicLine = `Live music returns ${dayLabel} · ${next.artist.toUpperCase()}`;
  } else musicLine = "Live music returns Friday";

  const marqueeItems = [
    "★ Now showing on Avenue G",
    musicLine,
    status.label,
    `Sunset at ${formatPortATime(sun.sunset)}`,
    "Beach setups delivered to your sand",
    "Carts ready when you are",
    "Cold beer · hot food · walk-up shaved ice",
    "Private events booking now",
  ];

  // Time stamp for the corner
  const stamp = now.toLocaleString("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <section className="relative bg-bron-cream text-bron-navy overflow-hidden isolate">
      {/* Paper grain — subtle texture overlay across the whole hero */}
      <div
        aria-hidden
        className="absolute inset-0 paper-noise opacity-50 pointer-events-none mix-blend-multiply"
      />

      {/* Top corner stamp — current local Port A time */}
      <div className="absolute top-20 right-5 sm:top-24 sm:right-8 z-20 text-[10px] uppercase tracking-[0.25em] font-bold text-bron-navy/75 bg-bron-cream/85 backdrop-blur-sm rounded-full px-3 py-1.5 border border-bron-navy/15">
        {stamp} · Port A
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 sm:pt-32 pb-20 sm:pb-28 text-center">
        {/* Eyebrow with alternating tropical bullet dots */}
        <p className="flex items-center justify-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.4em] text-bron-coral font-bold mb-6 sm:mb-8">
          <Bullet color="bg-bron-teal" />
          <Bullet color="bg-bron-coral" />
          <span>The yard on Avenue G</span>
          <Bullet color="bg-bron-coral" />
          <Bullet color="bg-bron-teal" />
        </p>

        {/* Sunburst + mark composition. Sunburst sits behind the type
            in the same flow so they scale together. */}
        <div className="relative inline-block mx-auto">
          <Sunburst />
          <h1
            className="relative font-[family-name:var(--font-mark)] leading-none text-bron-navy text-[clamp(4.5rem,16vw,13rem)] tracking-tight mark-breath"
            style={{ wordSpacing: "-0.05em" }}
          >
            Bron&apos;s
          </h1>
        </div>

        {/* Tropical decorative row — visible-palette pop between mark and tagline */}
        <div className="mt-12 sm:mt-16 flex items-center justify-center gap-3 text-base sm:text-lg">
          <Sparkle color="#F6C026" />
          <Sparkle color="#2EC4B6" />
          <Sparkle color="#FF4D8B" />
          <Sparkle color="#F6C026" />
          <Sparkle color="#2EC4B6" />
        </div>

        {/* Tagline — captures the real operating model: beach delivery
            + yard hangouts. Yard gets the brand-color emphasis. */}
        <p className="mt-5 sm:mt-6 font-display italic text-xl sm:text-3xl text-bron-navy/85 max-w-2xl mx-auto leading-snug">
          Set you up at the beach.{" "}
          <span className="text-bron-pink not-italic font-bold">
            See you back at the yard.
          </span>
        </p>

        {/* CTAs */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-3 flex-wrap">
          <a
            href="#book"
            className="px-8 py-4 rounded-full bg-bron-coral text-white font-bold text-sm uppercase tracking-widest hover:bg-bron-coral-dark transition-colors shadow-xl shadow-bron-coral/30"
          >
            Reserve a rental
          </a>
          <a
            href="#yard"
            className="px-8 py-4 rounded-full border-2 border-bron-navy text-bron-navy font-bold text-sm uppercase tracking-widest hover:bg-bron-navy hover:text-bron-cream transition-colors"
          >
            Visit the yard
          </a>
        </div>
      </div>

      {/* Live marquee letterboard — anchored to the bottom of the hero.
          The marquee renders its own scalloped canopy at its top edge. */}
      <div className="relative z-10">
        <HeroMarquee items={marqueeItems} />
      </div>
    </section>
  );
}

/** Decorative bullet dot for the eyebrow */
function Bullet({ color = "bg-bron-coral" }: { color?: string }) {
  return (
    <span className={`inline-block w-1.5 h-1.5 rounded-full ${color}`} />
  );
}

/** Tiny 4-point sparkle — tropical pop accent, used in the decorative row */
function Sparkle({ color }: { color: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="w-3 h-3 sm:w-4 sm:h-4"
      style={{ color }}
    >
      <path
        d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Slow-spinning sunburst behind the mark. Sized as a halo around the
 *  type — bounded clamp so it doesn't swallow the tagline or CTAs.
 *  Wrapper handles centering, inner SVG handles rotation. */
function Sunburst() {
  const rays = Array.from({ length: 24 });
  return (
    <div
      aria-hidden
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none w-[clamp(260px,38vw,480px)] aspect-square opacity-90"
    >
      <svg viewBox="-200 -200 400 400" className="w-full h-full sunburst-spin">
        {rays.map((_, i) => {
          const isLong = i % 2 === 0;
          const length = isLong ? 198 : 150;
          const width = isLong ? 11 : 6;
          const fill = isLong ? "#FF8B4D" : "#FF4D8B";
          return (
            <rect
              key={i}
              x={-width / 2}
              y={-length}
              width={width}
              height={length - 92}
              rx={width / 2}
              fill={fill}
              opacity={isLong ? 0.85 : 0.7}
              transform={`rotate(${i * 15})`}
            />
          );
        })}
        {/* Concentric sun disc — yellow / coral / pink / yellow center */}
        <circle r="96" fill="#F6C026" />
        <circle r="78" fill="#FF8B4D" />
        <circle r="58" fill="#FF4D8B" />
        <circle r="36" fill="#F6C026" />
      </svg>
    </div>
  );
}

