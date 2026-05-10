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
        {/* String of "lights" along the top edge — vintage venue signage */}
        <Lights />

        <div className="marquee-track py-3.5 sm:py-4">
          <MarqueeRow items={items} />
          <MarqueeRow items={items} aria-hidden />
        </div>
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
          <span className="font-[family-name:var(--font-marquee)] text-sm sm:text-base uppercase tracking-[0.18em] whitespace-nowrap">
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
    <span aria-hidden className="text-bron-yellow text-lg leading-none select-none">
      ✦
    </span>
  );
}

/** Row of small "bulbs" along the top edge of the marquee. */
function Lights() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 top-1 flex justify-between px-2"
    >
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className={`block w-1 h-1 rounded-full ${
            i % 3 === 0
              ? "bg-bron-yellow"
              : i % 3 === 1
                ? "bg-bron-coral"
                : "bg-bron-pink"
          }`}
        />
      ))}
    </div>
  );
}
