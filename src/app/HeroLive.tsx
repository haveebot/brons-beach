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

      {/* Bron's townscape — Seaside-FL-style architectural silhouette
          runner across the bottom of the hero: cart shack, bar pavilion,
          stage, kitchen, sno-cone kiosk, palms, boardwalk + wave. */}
      <BronsTownscape />

      {/* Top corner stamp — current local Port A time */}
      <div className="absolute top-20 right-5 sm:top-24 sm:right-8 z-20 text-[10px] uppercase tracking-[0.25em] font-bold text-bron-navy/75 bg-bron-cream/85 backdrop-blur-sm rounded-full px-3 py-1.5 border border-bron-navy/15">
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

/** Seaside-FL-style Bron's townscape silhouette running across the
 *  bottom of the hero. v2: full Bron's facet vocabulary (cart shack +
 *  parked golf cart, open-air bar pavilion with stools + tiki torches,
 *  band-shell stage with mic and speakers, picnic table, cornhole,
 *  kitchen with chimney + smoke, sno-cone walk-up kiosk, family cabana
 *  with shade cloth, beach umbrella + chair setup, lifeguard chair,
 *  dunes, wave, pelican overhead) joined by picket fences and string
 *  lights. Better palms — curved trunks, drooping multi-frond crowns.
 *
 *  Wider viewBox (1900) so there's room for the full vocabulary; slice
 *  preservation lets it bleed past edges on narrow viewports while
 *  showing more on wide screens.
 */
function BronsTownscape() {
  return (
    <svg
      viewBox="0 0 1900 220"
      preserveAspectRatio="xMidYEnd slice"
      className="absolute inset-x-0 bottom-0 w-full h-[clamp(140px,18vw,240px)] z-0 pointer-events-none"
    >
      <g fill="#0d1f2c">
        {/* Ground baseline */}
        <rect x="0" y="218" width="1900" height="2" />

        {/* Continuous festoon string lights — sweeps edge to edge */}
        <path
          d="M 0 110
             Q 70 130 125 70
             Q 215 90 305 55
             Q 430 110 545 70
             Q 700 105 850 55
             Q 1060 110 1280 80
             Q 1330 105 1380 110
             Q 1416 100 1465 130
             Q 1605 138 1670 135
             Q 1790 145 1900 148"
          stroke="#0d1f2c"
          strokeWidth="1.6"
          fill="none"
        />
        {[
          [27, 116], [54, 112], [82, 98], [108, 85],
          [161, 62], [197, 71], [232, 74], [269, 70],
          [355, 77], [404, 86], [451, 87], [498, 80],
          [606, 78], [667, 85], [729, 84], [790, 75],
          [934, 78], [1020, 89], [1106, 94], [1192, 93],
          [1310, 100], [1360, 110], [1430, 110],
          [1492, 130], [1605, 140], [1739, 144], [1832, 149],
        ].map(([x, y], i) => (
          <circle key={`bulb-${i}`} cx={x} cy={y} r="2.2" />
        ))}

        {/* 1 · Cart Rental Shack — simple silhouette + dome roof */}
        <g transform="translate(70 0)">
          <rect x="0" y="118" width="105" height="102" />
          {/* simple dome roof — single curve, no fringe */}
          <path d="M -10 122 Q 52 70 115 122 L 115 130 L -10 130 Z" />
          {/* sign band */}
          <rect x="20" y="146" width="65" height="14" />
        </g>

        {/* 2 · Parked Golf Cart — clean silhouette */}
        <g transform="translate(198 0)">
          {/* canopy */}
          <rect x="-2" y="156" width="74" height="6" rx="2" />
          {/* canopy posts */}
          <rect x="3" y="162" width="2.5" height="22" />
          <rect x="64" y="162" width="2.5" height="22" />
          {/* body chassis */}
          <rect x="-2" y="184" width="74" height="20" rx="4" />
          {/* seat backs */}
          <rect x="8" y="170" width="22" height="14" rx="2" />
          <rect x="42" y="170" width="22" height="14" rx="2" />
          {/* wheels — small */}
          <circle cx="14" cy="206" r="5.5" />
          <circle cx="56" cy="206" r="5.5" />
          {/* steering wheel */}
          <rect x="35" y="176" width="2" height="8" />
          <circle cx="36" cy="174" r="2" />
        </g>

        {/* 3 · Tall Palm Tree */}
        <Palm x={295} scale={1.6} variant="tall" />

        {/* 4 · Bar Pavilion — wide, single-arch palm-thatch, 4 posts */}
        <g transform="translate(415 0)">
          {/* simple arched roof — one broad sweep, no peaks no fringe */}
          <path d="M -16 108 Q 130 30 276 108 L 276 118 L -16 118 Z" />
          {/* roof pennant on center */}
          <rect x="128" y="38" width="3" height="22" />
          <polygon points="131,40 147,46 131,52" />
          {/* posts */}
          {[0, 80, 170, 252].map((cx) => (
            <rect key={cx} x={cx} y="118" width="11" height="102" />
          ))}
          {/* counter band — clean, no stools */}
          <rect x="-6" y="178" width="280" height="42" />
        </g>

        {/* 5 · Stage / Band-shell — single arched palm-thatch + bongo */}
        <g transform="translate(750 0)">
          {/* stage platform */}
          <rect x="0" y="180" width="200" height="40" />
          {/* arched palm-thatch roof — single sweep, taller in middle */}
          <path d="M -10 154 Q 100 40 210 154 Z" />
          {/* support poles */}
          <rect x="0" y="148" width="8" height="34" />
          <rect x="194" y="148" width="8" height="34" />
          {/* Bongo drums — Bron's signal on stage */}
          <g transform="translate(86 164)">
            <rect x="0" y="2" width="8" height="14" rx="1" />
            <rect x="9" y="0" width="10" height="16" rx="1" />
            <rect x="6" y="5" width="5" height="2" />
          </g>
        </g>

        {/* 6 · Kitchen — body + dome roof + chimney with one smoke puff */}
        <g transform="translate(1210 0)">
          <rect x="0" y="148" width="90" height="72" />
          <path d="M -8 150 Q 45 90 98 150 L 98 158 L -8 158 Z" />
          {/* chimney */}
          <rect x="62" y="80" width="14" height="40" />
          {/* one smoke puff */}
          <circle cx="69" cy="60" r="6" opacity="0.55" />
        </g>

        {/* 7 · Sno-cone / To-go Bar — body + dome roof + flag */}
        <g transform="translate(1320 0)">
          <rect x="0" y="170" width="64" height="50" />
          <path d="M -10 172 Q 32 130 74 172 L 74 178 L -10 178 Z" />
          {/* flag */}
          <rect x="30" y="110" width="3" height="22" />
          <polygon points="33,112 47,118 33,124" />
        </g>

        {/* 8 · Smaller Palm Tree */}
        <Palm x={1410} scale={1.15} variant="short" />

        {/* 9 · Family Cabana — single arched thatch + 4 posts (clean) */}
        <g transform="translate(1465 0)">
          <path d="M -6 138 Q 75 80 156 138 L 156 144 L -6 144 Z" />
          {[0, 50, 94, 144].map((cx) => (
            <rect key={cx} x={cx} y="144" width="6" height="76" />
          ))}
        </g>

        {/* — Hammock slung between the small palm and the cabana — */}
        <g>
          <path
            d="M 1430 168 Q 1450 200, 1467 184"
            stroke="#0d1f2c"
            strokeWidth="2.5"
            fill="none"
          />
          <path d="M 1430 168 Q 1450 202, 1467 184 Q 1450 192, 1430 174 Z" />
        </g>

        {/* 10 · Beach Umbrella + chair set — simplified */}
        <g transform="translate(1635 0)">
          {/* umbrella canopy — clean half circle */}
          <path d="M 0 168 A 38 38 0 0 1 76 168 Z" />
          {/* pole */}
          <rect x="36" y="168" width="3" height="48" />
          {/* sand mound */}
          <ellipse cx="38" cy="216" rx="22" ry="4" />
          {/* one beach chair */}
          <g transform="translate(70 196)">
            <rect x="0" y="0" width="24" height="3" />
            <rect x="0" y="3" width="3" height="14" />
            <rect x="20" y="3" width="3" height="14" />
            <polygon points="20,0 4,-12 6,-12 24,0" />
          </g>
        </g>

        {/* 11 · Boardwalk ramp + wave + pelican (beach edge) */}
        <g transform="translate(1735 0)">
          <polygon points="0,205 70,180 70,188 0,213" />
          <rect x="16" y="190" width="3" height="22" />
          <rect x="44" y="184" width="3" height="22" />
        </g>
        {/* Single wave that closes the runner */}
        <path d="M 1810 198 Q 1860 178 1910 198 Q 1960 218 2010 198 L 2010 220 L 1810 220 Z" />
        {/* Pelican silhouette overhead */}
        <g transform="translate(1820 70)">
          <path d="M 0 0 Q 8 -8 16 0 Q 24 -8 32 0 Q 28 4 16 4 Q 4 4 0 0 Z" />
          <ellipse cx="16" cy="6" rx="4" ry="2" />
        </g>
      </g>
    </svg>
  );
}

/** Reusable palm — curved trunk + multi-frond drooping crown. The
 *  fronds spread 360° (some droop low) which is the giveaway palm
 *  silhouette vs an agave/pot leaf. */
function Palm({
  x,
  scale = 1,
  variant = "tall",
}: {
  x: number;
  scale?: number;
  variant?: "tall" | "short";
}) {
  const trunkH = (variant === "tall" ? 130 : 90) * scale;
  const baseY = 220;
  const topY = baseY - trunkH;
  const trunkLean = variant === "tall" ? 6 : 3;
  return (
    <g transform={`translate(${x} 0)`}>
      {/* Curved trunk — gentle lean, slightly thicker at base */}
      <path
        d={`
          M ${-2.5 * scale} ${baseY}
          Q ${-1 * scale} ${baseY - trunkH * 0.4}, ${trunkLean * scale * 0.3} ${baseY - trunkH * 0.7}
          Q ${trunkLean * scale * 0.6} ${baseY - trunkH * 0.9}, ${trunkLean * scale} ${topY}
          L ${(trunkLean + 4) * scale} ${topY}
          Q ${(trunkLean + 3) * scale * 0.85} ${baseY - trunkH * 0.9}, ${(trunkLean + 2) * scale * 0.5} ${baseY - trunkH * 0.7}
          Q ${(trunkLean + 1) * scale * 0.5} ${baseY - trunkH * 0.4}, ${4.5 * scale} ${baseY}
          Z
        `}
      />
      {/* Crown of fronds — 7 banana-curve fronds spreading 360° */}
      <g transform={`translate(${(trunkLean + 2) * scale} ${topY})`}>
        {/* upper-left arching */}
        <path
          d={`M 0 0 Q ${-22 * scale} ${-22 * scale} ${-44 * scale} ${-26 * scale} Q ${-32 * scale} ${-12 * scale} 0 ${2 * scale} Z`}
        />
        {/* upper frond (back-arching) */}
        <path
          d={`M 0 0 Q ${-6 * scale} ${-26 * scale} ${-14 * scale} ${-44 * scale} Q ${0} ${-50 * scale} ${14 * scale} ${-44 * scale} Q ${6 * scale} ${-26 * scale} 0 0 Z`}
        />
        {/* upper-right arching */}
        <path
          d={`M 0 0 Q ${22 * scale} ${-22 * scale} ${44 * scale} ${-26 * scale} Q ${32 * scale} ${-12 * scale} 0 ${2 * scale} Z`}
        />
        {/* right horizontal/drooping */}
        <path
          d={`M 0 0 Q ${28 * scale} ${-2 * scale} ${48 * scale} ${8 * scale} Q ${32 * scale} ${12 * scale} 0 ${4 * scale} Z`}
        />
        {/* left horizontal/drooping */}
        <path
          d={`M 0 0 Q ${-28 * scale} ${-2 * scale} ${-48 * scale} ${8 * scale} Q ${-32 * scale} ${12 * scale} 0 ${4 * scale} Z`}
        />
        {/* lower-right droop */}
        <path
          d={`M 0 0 Q ${20 * scale} ${10 * scale} ${36 * scale} ${22 * scale} Q ${22 * scale} ${20 * scale} 0 ${4 * scale} Z`}
        />
        {/* lower-left droop */}
        <path
          d={`M 0 0 Q ${-20 * scale} ${10 * scale} ${-36 * scale} ${22 * scale} Q ${-22 * scale} ${20 * scale} 0 ${4 * scale} Z`}
        />
      </g>
      {/* Coconut cluster under the crown */}
      <circle cx={(trunkLean + 1) * scale} cy={topY + 4 * scale} r={2.5 * scale} />
      <circle cx={(trunkLean + 4) * scale} cy={topY + 6 * scale} r={2 * scale} />
      <circle cx={(trunkLean + 2.5) * scale} cy={topY + 8 * scale} r={2 * scale} />
    </g>
  );
}


