/**
 * Live letterboard — a venue/marquee strip scrolling continuously across
 * the bottom of the hero. Server-rendered (items computed at request time
 * by the parent), animated via CSS so no client JS for the scroll itself.
 *
 * The track contains the items twice in sequence and animates translate-X
 * by -50% — when the first set scrolls off, the second set is exactly in
 * place, giving a seamless infinite loop.
 *
 * Hover to pause.
 */

export default function HeroMarquee({ items }: { items: string[] }) {
  return (
    <div className="relative">
      {/* Scalloped canopy edge — venue tent curve at the top of the marquee */}
      <Scallop />
      <div className="bg-bron-deep text-bron-cream border-b-4 border-bron-coral overflow-hidden relative">
        {/* String lights — top + bottom edges, big bulbs, multi-color */}
        <Lights position="top" />

        <div className="marquee-track py-5 sm:py-6">
          <MarqueeRow items={items} />
          <MarqueeRow items={items} aria-hidden />
        </div>

        <Lights position="bottom" />
      </div>
    </div>
  );
}

/** Scalloped canopy — circles peek down from above the marquee like the
 *  edge of a venue tent. Negative top margin so they overlap the cream
 *  hero above by exactly half their radius. */
function Scallop() {
  const count = 24;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${count * 30} 28`}
      preserveAspectRatio="none"
      className="absolute inset-x-0 -top-4 w-full h-7 z-10"
    >
      {Array.from({ length: count }).map((_, i) => (
        <circle key={i} cx={15 + i * 30} cy={28} r={16} fill="#0d1f2c" />
      ))}
    </svg>
  );
}

function MarqueeRow({
  items,
  ...rest
}: { items: string[] } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="flex items-center gap-x-10 sm:gap-x-14 pr-10 sm:pr-14 shrink-0"
      {...rest}
    >
      {items.map((it, i) => (
        <div
          key={i}
          className="flex items-center gap-x-10 sm:gap-x-14 shrink-0"
        >
          <span className="font-[family-name:var(--font-marquee)] text-base sm:text-lg uppercase tracking-[0.16em] whitespace-nowrap">
            {it}
          </span>
          <Pip />
        </div>
      ))}
    </div>
  );
}

/** Decorative diamond/star separator between marquee items. */
function Pip() {
  return (
    <span
      aria-hidden
      className="text-bron-yellow text-xl leading-none select-none"
    >
      ✦
    </span>
  );
}

/** Row of bulbs along the top OR bottom edge of the marquee — vintage
 *  venue signage. Bigger + more saturated than the previous version,
 *  each bulb gets a soft glow ring via box-shadow. */
function Lights({ position }: { position: "top" | "bottom" }) {
  const colors = [
    "bg-bron-yellow",
    "bg-bron-coral",
    "bg-bron-pink",
    "bg-bron-teal",
  ];
  const glows = [
    "0 0 8px rgba(246,192,38,0.7)",
    "0 0 8px rgba(232,101,74,0.7)",
    "0 0 8px rgba(255,77,139,0.7)",
    "0 0 8px rgba(46,196,182,0.7)",
  ];
  return (
    <div
      aria-hidden
      className={`absolute inset-x-0 flex justify-between px-3 z-10 ${
        position === "top" ? "top-1.5" : "bottom-1.5"
      }`}
    >
      {Array.from({ length: 64 }).map((_, i) => {
        const idx = i % colors.length;
        return (
          <span
            key={i}
            className={`block w-1.5 h-1.5 rounded-full ${colors[idx]}`}
            style={{ boxShadow: glows[idx] }}
          />
        );
      })}
    </div>
  );
}
