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
    "Carts gassed + ready when you are",
    "Frozen margaritas to-go from the walk-up window",
    "Cold beer · burgers off the flat top",
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
    <>
    <section className="relative bg-bron-cream text-bron-deep-blue overflow-hidden isolate">
      {/* Paper grain — subtle texture overlay across the whole hero */}
      <div
        aria-hidden
        className="absolute inset-0 paper-noise opacity-50 pointer-events-none mix-blend-multiply"
      />

      {/* Rising sun — half-disc at the bottom edge of the hero, rays
          fanning upward and outward through the composition. */}
      <RisingSun />

      {/* Brons silhouette — wide horizontal scene that stretches edge to
          edge across the bottom of the hero (no left/right gap). PNG at
          5828x1092 (5.34:1) so it scales cleanly to any viewport width.
          Includes golf cart, palm + birds, kids running, swings, bar
          scenes, dancers, and the band on the right. Bron-deep-blue.
          Sits in front of the rising sun rays. */}
      <img
        src="/images/brons-hero-silhouette.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 w-full h-auto pointer-events-none z-0"
      />

      {/* Top corner stamp — current local Port A time */}
      <div className="absolute top-20 right-5 sm:top-24 sm:right-8 z-20 text-[10px] uppercase tracking-[0.25em] font-bold text-bron-deep-blue/75 bg-bron-cream/85 backdrop-blur-sm rounded-full px-3 py-1.5 border border-bron-blue/15">
        {stamp} · Port A
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 sm:pt-32 pb-44 sm:pb-56 text-center">
        {/* Eyebrow with alternating tropical bullet dots */}
        <p className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.4em] text-bron-coral font-bold mb-6 sm:mb-8 whitespace-nowrap">
          <Bullet color="bg-bron-teal" />
          <Bullet color="bg-bron-coral hidden sm:inline-block" />
          <span>The yard on Avenue G</span>
          <Bullet color="bg-bron-coral hidden sm:inline-block" />
          <Bullet color="bg-bron-teal" />
        </p>

        {/* The mark — Bison-outlined "BRONS" SVG with the fedora as the
            apostrophe. Sun rays radiate behind from the rising sun below;
            no halo behind the type itself. */}
        <h1 className="sr-only">Bron&apos;s</h1>
        <img
          src="/images/brons-hero-logo.svg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="relative mx-auto block w-[clamp(280px,72vw,820px)] h-auto mark-breath"
        />

        {/* Segments line — punchy declaration of what Bron's actually is */}
        <p className="mt-5 sm:mt-7 font-bold text-xs sm:text-base uppercase tracking-[0.2em] text-bron-deep-blue flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <span>Beach</span>
          <span className="text-bron-coral">·</span>
          <span>Carts</span>
          <span className="text-bron-coral">·</span>
          <span>Bar</span>
          <span className="text-bron-coral">·</span>
          <span>Kitchen</span>
          <span className="text-bron-coral">·</span>
          <span>Music</span>
        </p>

        {/* Brand-promise tagline — both halves italic Fraunces, two-tone
            blue. Light-blue lead, deep-blue payoff. */}
        <p className="mt-3 sm:mt-4 font-display text-xl sm:text-3xl max-w-3xl mx-auto leading-snug">
          <span className="italic text-bron-light-blue">
            Set you up at the beach.
          </span>{" "}
          <span className="italic text-bron-deep-blue">
            See you back at the yard.
          </span>
        </p>

        {/* CTAs — two-tone blue pill buttons. Light-blue primary,
            bron-blue secondary. Both solid, white text. */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-3 flex-wrap">
          <a
            href="#book"
            className="px-8 py-4 rounded-full bg-bron-light-blue text-white font-bold text-sm uppercase tracking-widest hover:brightness-95 transition shadow-xl shadow-bron-light-blue/30"
          >
            Reserve a rental
          </a>
          <a
            href="#yard"
            className="px-8 py-4 rounded-full bg-bron-blue text-white font-bold text-sm uppercase tracking-widest hover:brightness-95 transition shadow-xl shadow-bron-blue/30"
          >
            Visit the yard
          </a>
        </div>
      </div>

    </section>

    {/* Live marquee letterboard — outside the hero section so the
        rising sun can occupy the hero's bottom edge cleanly. */}
    <HeroMarquee items={marqueeItems} />
    </>
  );
}

/** Decorative bullet dot for the eyebrow */
function Bullet({ color = "bg-bron-coral" }: { color?: string }) {
  return (
    <span className={`inline-block w-1.5 h-1.5 rounded-full ${color}`} />
  );
}

/** Rising-sun backdrop — half-disc anchored at the bottom edge of the
 *  hero, rays fanning up and outward through the composition. The disc
 *  sits at the horizon (the seam between hero and marquee); rays fan
 *  upward into the visible area like a sunset.
 *  Wrapper handles centering, inner SVG handles rotation. */
function RisingSun() {
  const rays = Array.from({ length: 28 });
  return (
    <div
      aria-hidden
      className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 -z-10 pointer-events-none w-[clamp(700px,130vw,1500px)] aspect-square opacity-80"
    >
      <svg viewBox="-200 -200 400 400" className="w-full h-full sunburst-spin">
        {rays.map((_, i) => {
          const isLong = i % 2 === 0;
          const length = isLong ? 198 : 152;
          const width = isLong ? 9 : 5;
          const fill = isLong ? "#FF8B4D" : "#FF4D8B";
          return (
            <rect
              key={i}
              x={-width / 2}
              y={-length}
              width={width}
              height={length - 88}
              rx={width / 2}
              fill={fill}
              opacity={isLong ? 0.9 : 0.75}
              transform={`rotate(${(i * 360) / rays.length})`}
            />
          );
        })}
        {/* Concentric sun disc — yellow / coral / pink / yellow center */}
        <circle r="92" fill="#fcdd06" />
        <circle r="74" fill="#FF8B4D" />
        <circle r="56" fill="#FF4D8B" />
        <circle r="34" fill="#fcdd06" />
      </svg>
    </div>
  );
}

