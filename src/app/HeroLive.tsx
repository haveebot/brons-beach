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

      {/* Bron's townscape — Seaside-FL-style architectural silhouette
          runner across the bottom of the hero: cart shack, bar pavilion,
          stage, kitchen, sno-cone kiosk, palms, boardwalk + wave. */}
      <BronsTownscape />

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

        {/* Brand-promise tagline — Bron's hospitality formula */}
        <p className="mt-3 sm:mt-4 font-display italic text-xl sm:text-3xl text-bron-deep-blue/85 max-w-2xl mx-auto leading-snug">
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
            className="px-8 py-4 rounded-full border-2 border-bron-blue text-bron-deep-blue font-bold text-sm uppercase tracking-widest hover:bg-bron-blue hover:text-bron-cream transition-colors"
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

/** Bron's townscape — Seaside-style continuous block silhouette. v3
 *  packs every structure flush so the runner reads as ONE unbroken
 *  beach-town skyline (no scattered objects, no random shapes in the
 *  gaps). Each shape carries meaning by its silhouette alone — same
 *  vocabulary as actual Seaside Style merch.
 */
function BronsTownscape() {
  return (
    <svg
      viewBox="0 0 1600 220"
      preserveAspectRatio="xMidYEnd slice"
      className="absolute inset-x-0 bottom-0 w-full h-[clamp(140px,18vw,240px)] z-0 pointer-events-none"
    >
      <g fill="#1f2844">
        {/* Ground baseline */}
        <rect x="0" y="218" width="1600" height="2" />

        {/* Continuous festoon string lights — sweeps edge to edge,
            attaching to the rooftops + palm crowns of a continuous block */}
        <path
          d="M 0 100
             Q 30 115 100 60
             Q 150 80 195 75
             Q 280 105 335 35
             Q 500 100 565 35
             Q 650 100 700 70
             Q 740 90 770 90
             Q 800 90 825 75
             Q 870 100 935 70
             Q 1010 110 1080 145
             Q 1280 165 1600 165"
          stroke="#1f2844"
          strokeWidth="1.6"
          fill="none"
        />
        {[
          [16, 108], [42, 108], [70, 96], [92, 75],
          [122, 64], [152, 76], [180, 78],
          [225, 88], [265, 95], [305, 75],
          [375, 76], [430, 75], [480, 71], [535, 65],
          [595, 73], [625, 80], [665, 85],
          [710, 78], [745, 88], [785, 88], [820, 78],
          [855, 84], [890, 85], [920, 80],
          [970, 95], [1020, 115], [1060, 135], [1140, 158],
          [1230, 162], [1340, 164], [1450, 165], [1560, 166],
        ].map(([x, y], i) => (
          <circle key={`bulb-${i}`} cx={x} cy={y} r="2.2" />
        ))}

        {/* 1 · Cart Rental Shack — packed at the left edge */}
        <g transform="translate(20 0)">
          <rect x="0" y="118" width="100" height="102" />
          {/* dome roof */}
          <path d="M -8 122 Q 50 70 108 122 L 108 130 L -8 130 Z" />
          {/* sign band */}
          <rect x="22" y="146" width="56" height="13" />
        </g>

        {/* 2 · Tall Palm — sits between cart shack and bar pavilion */}
        <Palm x={155} scale={1.6} variant="tall" />

        {/* 3 · Bar Pavilion — packed flush against palm 1 / stage */}
        <g transform="translate(195 0)">
          {/* arched roof — broad single sweep */}
          <path d="M -8 108 Q 140 30 288 108 L 288 118 L -8 118 Z" />
          {/* center pennant */}
          <rect x="138" y="38" width="3" height="22" />
          <polygon points="141,40 157,46 141,52" />
          {/* posts */}
          {[0, 92, 188, 277].map((cx) => (
            <rect key={cx} x={cx} y="118" width="11" height="102" />
          ))}
          {/* counter */}
          <rect x="-6" y="178" width="294" height="42" />
        </g>

        {/* 4 · Stage / Band-shell — packed flush against bar pavilion */}
        <g transform="translate(495 0)">
          {/* arched palm-thatch roof */}
          <path d="M -8 154 Q 100 30 208 154 Z" />
          {/* stage platform */}
          <rect x="0" y="180" width="200" height="40" />
          {/* support poles */}
          <rect x="0" y="148" width="8" height="34" />
          <rect x="192" y="148" width="8" height="34" />
          {/* Bongo drums — Bron's signal */}
          <g transform="translate(86 164)">
            <rect x="0" y="2" width="8" height="14" rx="1" />
            <rect x="9" y="0" width="10" height="16" rx="1" />
            <rect x="6" y="5" width="5" height="2" />
          </g>
        </g>

        {/* 5 · Kitchen — packed flush against stage */}
        <g transform="translate(710 0)">
          <rect x="0" y="148" width="78" height="72" />
          <path d="M -8 150 Q 39 90 86 150 L 86 158 L -8 158 Z" />
          {/* chimney */}
          <rect x="54" y="80" width="14" height="40" />
          {/* one smoke puff */}
          <circle cx="61" cy="60" r="6" opacity="0.55" />
        </g>

        {/* 6 · Sno-cone / To-go Bar — packed flush against kitchen */}
        <g transform="translate(800 0)">
          <rect x="0" y="170" width="58" height="50" />
          <path d="M -8 172 Q 29 130 66 172 L 66 178 L -8 178 Z" />
          {/* flag */}
          <rect x="27" y="110" width="3" height="22" />
          <polygon points="30,112 44,118 30,124" />
        </g>

        {/* 7 · Smaller Palm — bridges sno-cone and cabana */}
        <Palm x={875} scale={1.15} variant="short" />

        {/* 8 · Family Cabana — packed flush after palm 2 */}
        <g transform="translate(910 0)">
          <path d="M -6 138 Q 70 80 146 138 L 146 144 L -6 144 Z" />
          {[0, 47, 91, 134].map((cx) => (
            <rect key={cx} x={cx} y="144" width="6" height="76" />
          ))}
        </g>

        {/* 9 · Beach Umbrella + chair — packed flush after cabana,
              transitions from yard to beach */}
        <g transform="translate(1075 0)">
          {/* umbrella canopy */}
          <path d="M 0 168 A 36 36 0 0 1 72 168 Z" />
          <rect x="34" y="168" width="3" height="48" />
          <ellipse cx="36" cy="216" rx="22" ry="4" />
          <g transform="translate(66 196)">
            <rect x="0" y="0" width="24" height="3" />
            <rect x="0" y="3" width="3" height="14" />
            <rect x="20" y="3" width="3" height="14" />
            <polygon points="20,0 4,-12 6,-12 24,0" />
          </g>
        </g>

        {/* 10 · Boardwalk ramp — packed flush, leading to the wave */}
        <g transform="translate(1185 0)">
          <polygon points="0,205 80,180 80,188 0,213" />
          <rect x="20" y="190" width="3" height="22" />
          <rect x="50" y="184" width="3" height="22" />
        </g>

        {/* 11 · Wave — closes the runner, bleeds past right edge */}
        <path d="M 1265 198 Q 1330 178 1395 198 Q 1460 218 1525 198 Q 1590 178 1655 198 L 1655 220 L 1265 220 Z" />

        {/* Pelican silhouette flying over the wave */}
        <g transform="translate(1430 64)">
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


