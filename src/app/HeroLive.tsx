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

/** Seaside-FL-style townscape silhouette running across the bottom of
 *  the hero. Each shape represents a facet of Bron's: cart rental shack,
 *  open-air bar pavilion with peaked roof, stage band-shell, kitchen
 *  with chimney, sno-cone walk-up kiosk, palms as accents, boardwalk
 *  ramp leading to a wave that closes the runner. All baseline-aligned,
 *  solid deep-navy silhouette — graphic and architectural, not clip-art.
 *
 *  preserveAspectRatio="xMidYEnd slice" anchors the bottom edge and
 *  scales width-first so the runner always reaches edge-to-edge.
 */
function BronsTownscape() {
  return (
    <svg
      viewBox="0 0 1200 220"
      preserveAspectRatio="xMidYEnd slice"
      className="absolute inset-x-0 bottom-0 w-full h-[clamp(120px,17vw,220px)] z-0 pointer-events-none"
    >
      <g fill="#0d1f2c">
        {/* Ground line — subtle baseline that ties everything together */}
        <rect x="0" y="218" width="1200" height="2" />

        {/* 1 · Cart Rental Shack ──────────────────────────────────────── */}
        <g transform="translate(40 0)">
          {/* body */}
          <rect x="0" y="115" width="100" height="105" />
          {/* peaked roof */}
          <polygon points="-8,118 50,82 108,118" />
          {/* signboard topper */}
          <rect x="20" y="60" width="60" height="20" />
          <rect x="48" y="80" width="4" height="35" />
        </g>

        {/* picket fence */}
        {[148, 154, 160, 166, 172, 178, 184, 190, 196, 202].map((x) => (
          <rect key={x} x={x} y="190" width="3" height="30" />
        ))}
        <rect x="148" y="200" width="58" height="3" />

        {/* 2 · Palm tree (curved trunk + crown) ─────────────────────── */}
        <g transform="translate(230 0)">
          <path d="M 0 220 Q -3 175 6 130 L 14 130 Q 7 175 10 220 Z" />
          <g transform="translate(7 130)">
            <path d="M 0 0 Q -28 -22 -50 -10 Q -32 -6 0 5 Z" />
            <path d="M 0 0 Q -12 -32 -28 -50 Q -10 -22 6 0 Z" />
            <path d="M 0 0 Q 12 -32 30 -50 Q 12 -22 -4 0 Z" />
            <path d="M 0 0 Q 28 -22 50 -10 Q 32 -6 0 5 Z" />
          </g>
          {/* coconuts */}
          <circle cx="4" cy="132" r="3" />
          <circle cx="11" cy="135" r="2.5" />
        </g>

        {/* 3 · Bar Pavilion ───────────────────────────────────────── */}
        <g transform="translate(310 0)">
          {/* gable roof */}
          <polygon points="-12,90 115,55 242,90" />
          <rect x="-12" y="90" width="254" height="14" />
          {/* columns */}
          <rect x="0" y="104" width="11" height="116" />
          <rect x="68" y="104" width="11" height="116" />
          <rect x="151" y="104" width="11" height="116" />
          <rect x="219" y="104" width="11" height="116" />
          {/* counter band */}
          <rect x="-5" y="172" width="240" height="48" />
          {/* small pennant on roof peak */}
          <rect x="113" y="38" width="3" height="22" />
          <polygon points="116,40 132,46 116,52" />
        </g>

        {/* 4 · Stage / Band-shell ─────────────────────────────────── */}
        <g transform="translate(580 0)">
          {/* stage platform */}
          <rect x="0" y="180" width="170" height="40" />
          {/* arched roof shell */}
          <path d="M -8 140 Q 85 56 178 140 L 178 152 L -8 152 Z" />
          {/* support poles */}
          <rect x="0" y="148" width="8" height="32" />
          <rect x="162" y="148" width="8" height="32" />
          {/* mic stand silhouette on stage */}
          <rect x="82" y="160" width="3" height="22" />
          <circle cx="83.5" cy="158" r="4" />
        </g>

        {/* 5 · Kitchen with chimney ───────────────────────────────── */}
        <g transform="translate(770 0)">
          {/* body */}
          <rect x="0" y="135" width="80" height="85" />
          {/* peaked roof */}
          <polygon points="-6,138 40,108 86,138" />
          {/* chimney */}
          <rect x="55" y="80" width="14" height="40" />
          {/* awning */}
          <polygon points="-6,158 -26,168 -6,178" />
          {/* small smoke puff */}
          <circle cx="63" cy="68" r="4" opacity="0.55" />
          <circle cx="58" cy="58" r="3" opacity="0.4" />
        </g>

        {/* 6 · Sno-cone / To-go bar walk-up kiosk ─────────────────── */}
        <g transform="translate(880 0)">
          {/* body */}
          <rect x="0" y="160" width="58" height="60" />
          {/* striped awning peak */}
          <polygon points="-8,160 29,128 66,160" />
          {/* shutter window */}
          <polygon points="-8,176 -22,188 -8,200" />
          {/* small flag */}
          <rect x="27" y="108" width="3" height="22" />
          <polygon points="30,110 42,116 30,122" />
        </g>

        {/* 7 · Palm tree (smaller) ────────────────────────────────── */}
        <g transform="translate(970 0)">
          <path d="M 0 220 Q 4 175 -3 135 L 4 135 Q 0 175 6 220 Z" />
          <g transform="translate(2 135)">
            <path d="M 0 0 Q -22 -16 -40 -8 Q -24 -4 0 4 Z" />
            <path d="M 0 0 Q -8 -26 -20 -42 Q -6 -18 4 0 Z" />
            <path d="M 0 0 Q 10 -26 24 -40 Q 8 -18 -4 0 Z" />
            <path d="M 0 0 Q 22 -16 40 -8 Q 24 -4 0 4 Z" />
          </g>
        </g>

        {/* 8 · Boardwalk ramp + wave to beach ────────────────────── */}
        <g transform="translate(1030 0)">
          {/* ramp */}
          <polygon points="0,200 60,176 60,184 0,210" />
          {/* posts */}
          <rect x="14" y="186" width="3" height="22" />
          <rect x="38" y="180" width="3" height="22" />
          {/* wave silhouette closing to the right edge */}
          <path d="M 60 184 Q 95 168 130 184 Q 165 200 200 184 L 200 220 L 60 220 Z" />
          {/* second wave crest */}
          <path d="M 130 184 Q 155 174 180 184 Q 195 192 200 188 L 200 220 L 130 220 Z" opacity="0.6" />
        </g>
      </g>
    </svg>
  );
}

