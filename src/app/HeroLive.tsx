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
      <div className="absolute top-20 right-5 sm:top-24 sm:right-8 z-20 text-[10px] uppercase tracking-[0.25em] font-bold text-bron-navy/55">
        {stamp} · Port A
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 sm:pt-32 pb-40 sm:pb-48 text-center">
        {/* Eyebrow with decorative dots */}
        <p className="flex items-center justify-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.4em] text-bron-coral font-bold mb-6 sm:mb-8">
          <Bullet />
          <span>The yard on Avenue G</span>
          <Bullet />
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

        {/* Tagline — a real magazine cover line, not a corporate subhead */}
        <p className="mt-6 sm:mt-8 font-display italic text-xl sm:text-3xl text-bron-navy/85 max-w-2xl mx-auto leading-snug">
          Five spots, one yard,{" "}
          <span className="text-bron-pink not-italic font-bold">
            no part of the trip you have to leave for.
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

      {/* Scalloped canopy edge above the marquee letterboard */}
      <Scallop />

      {/* Live marquee letterboard — anchored to the bottom of the hero */}
      <div className="relative z-10">
        <HeroMarquee items={marqueeItems} />
      </div>
    </section>
  );
}

/** Decorative bullet dot for the eyebrow */
function Bullet() {
  return (
    <span className="inline-block w-1.5 h-1.5 rounded-full bg-bron-coral" />
  );
}

/** Slow-spinning sunburst behind the mark. Pure SVG, scales with viewport. */
function Sunburst() {
  // 18 alternating-length rays for visual rhythm
  const rays = Array.from({ length: 18 });
  return (
    <svg
      aria-hidden
      viewBox="-200 -200 400 400"
      className="absolute inset-0 m-auto w-[180%] h-[180%] -z-10 pointer-events-none sunburst-spin"
      style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
    >
      {rays.map((_, i) => {
        const isLong = i % 2 === 0;
        const length = isLong ? 175 : 130;
        const width = isLong ? 8 : 5;
        return (
          <rect
            key={i}
            x={-width / 2}
            y={-length}
            width={width}
            height={length - 80}
            rx={width / 2}
            fill="#F6C026"
            transform={`rotate(${i * 20})`}
          />
        );
      })}
      {/* Inner sun disc — coral over yellow, matches the brand pop */}
      <circle r="78" fill="#F6C026" />
      <circle r="64" fill="#FF8B4D" />
      <circle r="48" fill="#FF4D8B" opacity="0.85" />
    </svg>
  );
}

/** Scalloped canopy — half-circles in a row, evokes a venue marquee tent. */
function Scallop() {
  const count = 22;
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 z-10 flex justify-around"
      style={{ bottom: "calc(var(--marquee-h, 60px) + 0px)" }}
    >
      <svg
        viewBox={`0 0 ${count * 30} 24`}
        preserveAspectRatio="none"
        className="w-full h-6"
      >
        {Array.from({ length: count }).map((_, i) => (
          <circle
            key={i}
            cx={15 + i * 30}
            cy={20}
            r={14}
            fill="#1a3a52"
          />
        ))}
      </svg>
    </div>
  );
}
