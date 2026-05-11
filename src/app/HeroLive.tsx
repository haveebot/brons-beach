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

        {/* Continuous festoon string lights — sweeps edge to edge,
            attaching to rooftops + palm crowns + cabana, with bulbs
            hanging at intervals */}
        <path
          d="M 0 110
             Q 70 130 125 42
             Q 215 90 305 55
             Q 430 110 545 60
             Q 700 105 850 55
             Q 1060 110 1280 80
             Q 1315 100 1350 105
             Q 1380 110 1416 100
             Q 1480 130 1540 132
             Q 1605 138 1670 135
             Q 1790 145 1900 148"
          stroke="#0d1f2c"
          strokeWidth="1.6"
          fill="none"
        />
        {/* Bulbs hanging from the string at regular intervals */}
        {[
          [27, 116], [54, 112], [79, 99], [102, 77],
          [161, 62], [197, 71], [232, 74], [269, 70],
          [355, 77], [404, 86], [451, 87], [498, 80],
          [606, 78], [667, 85], [729, 84], [790, 75],
          [934, 78], [1020, 89], [1106, 94], [1192, 93],
          [1315, 100], [1382, 110], [1453, 120],
          [1492, 130], [1605, 140], [1739, 144], [1832, 149],
        ].map(([x, y], i) => (
          <circle key={`bulb-${i}`} cx={x} cy={y} r="2.2" />
        ))}

        {/* — Picket fence start ————————————————————————————————— */}
        {[10, 17, 24, 31, 38, 45, 52].map((x) => (
          <rect key={`pf1-${x}`} x={x} y="192" width="3" height="28" />
        ))}
        <rect x="10" y="200" width="45" height="3" />

        {/* 1 · Cart Rental Shack — tiki version with palm-thatch roof */}
        <g transform="translate(70 0)">
          {/* body */}
          <rect x="0" y="118" width="105" height="102" />
          {/* Palm-thatch roof — three small fronds peaks */}
          <path d="M -10 122 Q -2 110, 18 80 Q 36 112, 52 70 Q 70 112, 88 80 Q 108 110, 115 122 L 115 132 L -10 132 Z" />
          {/* Frond fringe along the eaves */}
          {Array.from({ length: 13 }).map((_, i) => (
            <polygon
              key={`f1-${i}`}
              points={`${-8 + i * 10},132 ${-2 + i * 10},132 ${-5 + i * 10},140`}
            />
          ))}
          {/* Sign band */}
          <rect x="20" y="148" width="65" height="14" />
        </g>

        {/* 2 · Parked Golf Cart — proportions fixed (smaller wheels) */}
        <g transform="translate(198 0)">
          {/* canopy with palm-thatch hint */}
          <path d="M -2 158 Q 35 152, 70 158 L 70 162 L -2 162 Z" />
          {/* canopy posts */}
          <rect x="3" y="162" width="2.5" height="22" />
          <rect x="64" y="162" width="2.5" height="22" />
          {/* body chassis with rounded corners */}
          <rect x="-2" y="184" width="74" height="20" rx="4" />
          {/* seat backs */}
          <rect x="8" y="170" width="22" height="14" rx="2" />
          <rect x="42" y="170" width="22" height="14" rx="2" />
          {/* wheels — smaller, more proportional */}
          <circle cx="14" cy="206" r="5.5" />
          <circle cx="56" cy="206" r="5.5" />
          {/* steering wheel hint */}
          <rect x="35" y="176" width="2" height="8" />
          <circle cx="36" cy="174" r="2" />
        </g>

        {/* 3 · Tall Palm Tree ————————————————————————————————————— */}
        <Palm x={295} scale={1.6} variant="tall" />

        {/* — Tiki torch ——————————————————————————————————————————— */}
        <TikiTorch x={385} />

        {/* 4 · Tiki Bar Pavilion — palm-thatch roof, bamboo posts, stools */}
        <g transform="translate(415 0)">
          {/* Palm-thatch roof — multi-peak wave across the wide bar */}
          <path
            d="
              M -16 108
              Q -8 96, 8 78
              Q 32 102, 60 60
              Q 95 102, 130 50
              Q 165 102, 200 60
              Q 228 102, 252 78
              Q 268 96, 276 108
              L 276 118
              L -16 118
              Z
            "
          />
          {/* Frond fringe along the eaves */}
          {Array.from({ length: 30 }).map((_, i) => (
            <polygon
              key={`fb-${i}`}
              points={`${-14 + i * 10},118 ${-8 + i * 10},118 ${-11 + i * 10},127`}
            />
          ))}
          {/* roof pennant on center peak */}
          <rect x="128" y="32" width="3" height="22" />
          <polygon points="131,34 147,40 131,46" />
          {/* bamboo posts (slightly tapered) */}
          {[0, 80, 170, 252].map((cx) => (
            <g key={cx}>
              <rect x={cx} y="127" width="11" height="93" />
              {/* bamboo node bands */}
              <rect x={cx - 1} y="155" width="13" height="2" fill="#faf3e3" opacity="0.5" />
              <rect x={cx - 1} y="185" width="13" height="2" fill="#faf3e3" opacity="0.5" />
            </g>
          ))}
          {/* counter band */}
          <rect x="-6" y="178" width="280" height="42" />
          {/* bar stools — circles on stems along the counter */}
          {[28, 60, 92, 124, 156, 188, 220, 252].map((sx) => (
            <g key={sx}>
              <rect x={sx - 1.5} y="178" width="3" height="22" />
              <circle cx={sx} cy="172" r="6" />
            </g>
          ))}
        </g>

        {/* — Tiki torch ——————————————————————————————————————————— */}
        <TikiTorch x={715} />

        {/* 5 · Tiki Stage / Band-shell — palm-thatch arched roof */}
        <g transform="translate(750 0)">
          {/* stage platform */}
          <rect x="0" y="180" width="200" height="40" />
          {/* Palm-thatch arched roof — center taller, fronds at peaks */}
          <path
            d="
              M -10 154
              Q -2 138, 18 110
              Q 45 138, 70 80
              Q 100 138, 130 80
              Q 158 138, 182 110
              Q 202 138, 210 154
              Z
            "
          />
          {/* Frond fringe along the eaves */}
          {Array.from({ length: 24 }).map((_, i) => (
            <polygon
              key={`fs-${i}`}
              points={`${-8 + i * 9},154 ${-2 + i * 9},154 ${-5 + i * 9},161`}
            />
          ))}
          {/* support poles — bamboo */}
          <rect x="0" y="160" width="8" height="22" />
          <rect x="194" y="160" width="8" height="22" />
          {/* speaker stacks at sides of stage */}
          <rect x="6" y="158" width="14" height="22" />
          <rect x="180" y="158" width="14" height="22" />
          {/* mic stand */}
          <rect x="98" y="158" width="3" height="22" />
          <circle cx="99.5" cy="156" r="4" />
          {/* drum kit hint — small kick + cymbal */}
          <circle cx="120" cy="172" r="6" />
          <rect x="125" y="160" width="2" height="12" />
          <ellipse cx="128" cy="158" rx="6" ry="1.5" />
          {/* Bongo drums — Bron plays the bongo (stage left) */}
          <g transform="translate(60 164)">
            {/* macho — smaller drum on the left */}
            <rect x="0" y="2" width="8" height="14" rx="1" />
            {/* hembra — larger drum on the right */}
            <rect x="9" y="0" width="10" height="16" rx="1" />
            {/* connecting bridge between the two drums */}
            <rect x="6" y="5" width="5" height="2" />
            {/* small drum head highlights */}
            <ellipse cx="4" cy="2" rx="4" ry="1" />
            <ellipse cx="14" cy="0" rx="5" ry="1" />
          </g>
        </g>

        {/* — Picket fence transition ——————————————————————————————— */}
        {[975, 982, 989, 996, 1003, 1010, 1017].map((x) => (
          <rect key={`pf2-${x}`} x={x} y="192" width="3" height="28" />
        ))}
        <rect x="975" y="200" width="45" height="3" />

        {/* 6 · Picnic Table ————————————————————————————————————— */}
        <g transform="translate(1030 0)">
          {/* table top */}
          <rect x="0" y="180" width="70" height="6" />
          {/* benches */}
          <rect x="-6" y="195" width="14" height="3" />
          <rect x="62" y="195" width="14" height="3" />
          {/* legs */}
          <rect x="6" y="186" width="3" height="34" />
          <rect x="61" y="186" width="3" height="34" />
          {/* bench supports */}
          <rect x="-2" y="198" width="2" height="22" />
          <rect x="68" y="198" width="2" height="22" />
        </g>

        {/* 7 · Tiki Totem (replaces cornhole boards) ——————————————— */}
        <g transform="translate(1130 0)">
          {/* base */}
          <ellipse cx="14" cy="218" rx="14" ry="3" />
          {/* pole */}
          <rect x="9" y="172" width="10" height="48" />
          {/* totem head — square with simple carved eyes + mouth */}
          <rect x="2" y="138" width="24" height="38" />
          {/* hat / headdress */}
          <polygon points="0,138 14,124 28,138" />
          {/* eye cutouts (cream shows through) */}
          <rect x="6" y="148" width="4" height="3" fill="#faf3e3" />
          <rect x="18" y="148" width="4" height="3" fill="#faf3e3" />
          {/* nose ridge */}
          <rect x="13" y="152" width="2" height="9" />
          {/* mouth cutout */}
          <rect x="6" y="164" width="16" height="3" fill="#faf3e3" />
          {/* small fangs */}
          <polygon points="9,167 11,167 10,170" fill="#faf3e3" />
          <polygon points="17,167 19,167 18,170" fill="#faf3e3" />
        </g>

        {/* 8 · Tropical Kitchen — palm-thatch over an open grill */}
        <g transform="translate(1210 0)">
          {/* body */}
          <rect x="0" y="148" width="90" height="72" />
          {/* Palm-thatch roof */}
          <path d="M -8 150 Q 0 138, 22 108 Q 45 140, 68 108 Q 90 138, 98 150 L 98 158 L -8 158 Z" />
          {/* Frond fringe along eaves */}
          {Array.from({ length: 11 }).map((_, i) => (
            <polygon
              key={`fk-${i}`}
              points={`${-6 + i * 9.5},158 ${-1 + i * 9.5},158 ${-3 + i * 9.5},165`}
            />
          ))}
          {/* chimney / grill smoke stack */}
          <rect x="62" y="80" width="14" height="40" />
          {/* smoke puffs */}
          <circle cx="71" cy="65" r="5" opacity="0.55" />
          <circle cx="64" cy="55" r="4" opacity="0.4" />
          <circle cx="58" cy="44" r="3" opacity="0.3" />
          {/* order window cutout */}
          <rect x="62" y="170" width="20" height="14" fill="#faf3e3" />
          {/* small awning over the order window */}
          <polygon points="60,170 84,168 84,170" />
        </g>

        {/* 9 · Sno-cone / To-go Bar — palm-thatch walk-up window */}
        <g transform="translate(1320 0)">
          <rect x="0" y="170" width="64" height="50" />
          {/* Palm-thatch roof */}
          <path d="M -10 172 Q -2 162, 14 138 Q 32 162, 50 138 Q 66 162, 74 172 L 74 178 L -10 178 Z" />
          {/* Frond fringe */}
          {Array.from({ length: 9 }).map((_, i) => (
            <polygon
              key={`fsc-${i}`}
              points={`${-8 + i * 10},178 ${-3 + i * 10},178 ${-5 + i * 10},184`}
            />
          ))}
          {/* shutter window cutout (cream shows through) */}
          <rect x="10" y="186" width="44" height="14" fill="#faf3e3" />
          {/* shutter prop */}
          <polygon points="-10,186 -28,200 -10,214" />
          {/* "frozen" cup with straw on the counter */}
          <rect x="22" y="184" width="9" height="13" fill="#0d1f2c" />
          <rect x="25" y="174" width="2" height="10" />
          {/* flag on top */}
          <rect x="30" y="110" width="3" height="22" />
          <polygon points="33,112 47,118 33,124" />
        </g>

        {/* 10 · Smaller Palm Tree ————————————————————————————————— */}
        <Palm x={1410} scale={1.15} variant="short" />

        {/* 11 · Family Cabana — palm-thatch shade roof + bamboo posts */}
        <g transform="translate(1465 0)">
          {/* Palm-thatch roof — multi-peak across 150 wide */}
          <path d="M -6 138 Q 4 128, 22 108 Q 48 130, 75 100 Q 102 130, 128 108 Q 146 128, 156 138 L 156 144 L -6 144 Z" />
          {/* Frond fringe — long droopy fringe like a palapa */}
          {Array.from({ length: 16 }).map((_, i) => (
            <polygon
              key={`fc-${i}`}
              points={`${-4 + i * 10},144 ${1 + i * 10},144 ${-1.5 + i * 10},152`}
            />
          ))}
          {/* bamboo posts (with node bands) */}
          {[0, 50, 94, 144].map((cx) => (
            <g key={cx}>
              <rect x={cx} y="152" width="6" height="68" />
              <rect x={cx - 1} y="172" width="8" height="2" fill="#faf3e3" opacity="0.5" />
              <rect x={cx - 1} y="195" width="8" height="2" fill="#faf3e3" opacity="0.5" />
            </g>
          ))}
          {/* chairs inside the cabana */}
          <rect x="22" y="190" width="14" height="22" />
          <rect x="42" y="190" width="14" height="22" />
          <rect x="98" y="190" width="14" height="22" />
        </g>

        {/* — Hammock between the small palm and the cabana ————————— */}
        <g>
          {/* hammock bowed cord (slight catenary curve) */}
          <path
            d="M 1430 162 Q 1448 196, 1466 180"
            stroke="#0d1f2c"
            strokeWidth="2.5"
            fill="none"
          />
          {/* hammock body — concave drape */}
          <path d="M 1430 162 Q 1450 200, 1466 180 Q 1450 188, 1430 168 Z" />
          {/* attachment knots */}
          <circle cx="1430" cy="162" r="2.2" />
          <circle cx="1466" cy="180" r="2.2" />
        </g>

        {/* 12 · Beach Umbrella + chair set ————————————————————————— */}
        <g transform="translate(1635 0)">
          {/* umbrella canopy — half circle */}
          <path d="M 0 168 A 38 38 0 0 1 76 168 Z" />
          {/* fluted canopy edge — small triangles */}
          {Array.from({ length: 6 }).map((_, i) => {
            const cx = 6 + i * 13;
            return (
              <polygon
                key={i}
                points={`${cx},168 ${cx + 6},168 ${cx + 3},173`}
              />
            );
          })}
          {/* pole */}
          <rect x="36" y="168" width="3" height="48" />
          {/* sand base mound */}
          <ellipse cx="38" cy="216" rx="22" ry="4" />
          {/* beach chairs */}
          <g transform="translate(-12 196)">
            <rect x="0" y="0" width="24" height="3" />
            <rect x="0" y="3" width="3" height="14" />
            <rect x="20" y="3" width="3" height="14" />
            <polygon points="0,0 16,-12 18,-12 4,0" />
          </g>
          <g transform="translate(70 196)">
            <rect x="0" y="0" width="24" height="3" />
            <rect x="0" y="3" width="3" height="14" />
            <rect x="20" y="3" width="3" height="14" />
            <polygon points="20,0 4,-12 6,-12 24,0" />
          </g>
        </g>

        {/* 13 · Boardwalk ramp ——————————————————————————————————— */}
        <g transform="translate(1735 0)">
          <polygon points="0,205 70,180 70,188 0,213" />
          <rect x="16" y="190" width="3" height="22" />
          <rect x="44" y="184" width="3" height="22" />
        </g>

        {/* 14 · Lifeguard chair ————————————————————————————————— */}
        <g transform="translate(1750 0)">
          {/* chair box up high */}
          <rect x="20" y="138" width="32" height="24" />
          {/* roof */}
          <polygon points="14,138 36,124 58,138" />
          {/* legs forming an A-frame */}
          <line x1="22" y1="162" x2="6" y2="218" stroke="#0d1f2c" strokeWidth="3.5" />
          <line x1="50" y1="162" x2="66" y2="218" stroke="#0d1f2c" strokeWidth="3.5" />
          {/* cross brace */}
          <line x1="14" y1="190" x2="58" y2="190" stroke="#0d1f2c" strokeWidth="2.5" />
          {/* small flag on the roof */}
          <rect x="35" y="106" width="2" height="20" />
          <polygon points="37,108 47,112 37,116" />
        </g>

        {/* 15 · Dunes + Wave + Pelican (right-edge beach scene) ——— */}
        <g transform="translate(1810 0)">
          {/* dune mounds */}
          <path d="M -10 218 Q 20 192 50 218 Z" opacity="0.85" />
          <path d="M 30 218 Q 60 198 90 218 Z" opacity="0.7" />
        </g>
        {/* Wave that closes the runner — extends past 1900 to bleed */}
        <path
          d="M 1860 196 Q 1900 180 1940 196 Q 1980 212 2020 196 L 2020 220 L 1860 220 Z"
        />
        <path
          d="M 1900 200 Q 1930 190 1960 200 Q 1990 210 2020 200 L 2020 220 L 1900 220 Z"
          opacity="0.6"
        />
        {/* Pelican silhouette flying above the wave */}
        <g transform="translate(1825 70)">
          <path d="M 0 0 Q 8 -8 16 0 Q 24 -8 32 0 Q 28 4 16 4 Q 4 4 0 0 Z" />
          {/* small body */}
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

/** Tiki torch — pole + flame on top */
function TikiTorch({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`} fill="#0d1f2c">
      {/* pole */}
      <rect x="0" y="160" width="3" height="60" />
      {/* fuel reservoir */}
      <polygon points="-4,160 1.5,150 7,160" />
      {/* flame */}
      <path d="M 1.5 148 Q -2 142 -1 134 Q 1.5 138 1.5 132 Q 4 138 5 134 Q 5 142 1.5 148 Z" />
    </g>
  );
}

