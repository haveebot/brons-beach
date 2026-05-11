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
    <section className="relative bg-bron-cream text-bron-navy overflow-hidden isolate">
      {/* Paper grain — subtle texture overlay across the whole hero */}
      <div
        aria-hidden
        className="absolute inset-0 paper-noise opacity-50 pointer-events-none mix-blend-multiply"
      />

      {/* Rising sun — half-disc at the bottom edge of the hero, rays
          fanning upward and outward through the composition. */}
      <RisingSun />

      {/* Palm silhouettes peeking in from the bottom corners — Key West
          tropical framing. Hidden on small screens where they'd crowd. */}
      <PalmFrame />

      {/* Top corner stamp — current local Port A time */}
      <div className="absolute top-20 right-5 sm:top-24 sm:right-8 z-20 text-[10px] uppercase tracking-[0.25em] font-bold text-bron-navy/75 bg-bron-cream/85 backdrop-blur-sm rounded-full px-3 py-1.5 border border-bron-navy/15">
        {stamp} · Port A
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 sm:pt-32 pb-32 sm:pb-40 text-center">
        {/* Eyebrow with alternating tropical bullet dots */}
        <p className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.4em] text-bron-coral font-bold mb-6 sm:mb-8 whitespace-nowrap">
          <Bullet color="bg-bron-teal" />
          <Bullet color="bg-bron-coral hidden sm:inline-block" />
          <span>The yard on Avenue G</span>
          <Bullet color="bg-bron-coral hidden sm:inline-block" />
          <Bullet color="bg-bron-teal" />
        </p>

        {/* The mark — sun rays radiate behind it from the rising sun
            below, no halo behind the type itself */}
        <h1
          className="relative font-[family-name:var(--font-mark)] leading-none text-bron-navy text-[clamp(4.5rem,16vw,13rem)] tracking-tight mark-breath"
          style={{ wordSpacing: "-0.05em" }}
        >
          Bron&apos;s
        </h1>

        {/* Tagline — captures the real operating model: beach delivery
            + yard hangouts. Yard gets the brand-color emphasis. */}
        <p className="mt-6 sm:mt-8 font-display italic text-xl sm:text-3xl text-bron-navy/85 max-w-2xl mx-auto leading-snug">
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
        <circle r="92" fill="#F6C026" />
        <circle r="74" fill="#FF8B4D" />
        <circle r="56" fill="#FF4D8B" />
        <circle r="34" fill="#F6C026" />
      </svg>
    </div>
  );
}

/** Palm-frond crowns peeking in from the bottom corners. Banana-curved
 *  fronds with pinnate sub-leaflet detail — actually palm-shaped, not
 *  pot-leaf-shaped. Fronds spread including some that droop horizontally
 *  / down-outward (real palm crown behavior). */
function PalmFrame() {
  return (
    <>
      <div className="hidden md:block absolute left-[-2rem] bottom-1 w-56 lg:w-72 z-0 pointer-events-none">
        <PalmFronds flip={false} />
      </div>
      <div className="hidden md:block absolute right-[-2rem] bottom-1 w-56 lg:w-72 z-0 pointer-events-none">
        <PalmFronds flip={true} />
      </div>
    </>
  );
}

function PalmFronds({ flip }: { flip: boolean }) {
  // Crown peeking from the LEFT corner — fronds spread up + to the right
  // (into the scene), with one drooping further right and one peeking
  // back off-screen. flip=true mirrors via scaleX for the right corner.
  const fronds: { angle: number; length: number }[] = [
    { angle: -55, length: 0.85 }, // up-left, mostly off-screen
    { angle: -20, length: 1.05 }, // mostly up, slight lean
    { angle: 20, length: 1.1 },   // up-right, longest
    { angle: 60, length: 1.0 },   // right
    { angle: 100, length: 0.85 }, // drooping right (horizontal+)
    { angle: 135, length: 0.7 },  // drooping further (sweeping down)
  ];
  return (
    <svg
      viewBox="-160 -170 320 200"
      className="w-full h-auto"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      {fronds.map((f, i) => (
        <g key={i} transform={`rotate(${f.angle})`}>
          {/* Banana-curved frond — wider in the middle, tapered tip,
              arches outward then curls back. */}
          <path
            d={`
              M 0 0
              Q ${22 * f.length} ${-45 * f.length}, ${18 * f.length} ${-95 * f.length}
              Q ${10 * f.length} ${-130 * f.length}, 0 ${-140 * f.length}
              Q ${-10 * f.length} ${-130 * f.length}, ${-18 * f.length} ${-95 * f.length}
              Q ${-22 * f.length} ${-45 * f.length}, 0 0
              Z
            `}
            fill="#0d1f2c"
            opacity={0.9}
          />
          {/* Pinnate sub-leaflet veins — short tick lines along the
              central rachis, giving the feathered palm-frond texture. */}
          {[0.25, 0.42, 0.58, 0.74, 0.86].map((p) => {
            const y = -140 * f.length * p;
            const x = 9 * f.length * (1 - p * 0.5);
            return (
              <g key={p}>
                <line
                  x1="0"
                  y1={y}
                  x2={x}
                  y2={y - 6 * f.length}
                  stroke="#1a3a52"
                  strokeWidth="1.2"
                  opacity="0.55"
                  strokeLinecap="round"
                />
                <line
                  x1="0"
                  y1={y}
                  x2={-x}
                  y2={y - 6 * f.length}
                  stroke="#1a3a52"
                  strokeWidth="1.2"
                  opacity="0.55"
                  strokeLinecap="round"
                />
              </g>
            );
          })}
        </g>
      ))}
      {/* Coconut cluster at the base */}
      <circle cx="-4" cy="-4" r="5" fill="#0d1f2c" opacity="0.92" />
      <circle cx="5" cy="-3" r="4" fill="#0d1f2c" opacity="0.92" />
      <circle cx="0" cy="-12" r="3.5" fill="#0d1f2c" opacity="0.92" />
    </svg>
  );
}

