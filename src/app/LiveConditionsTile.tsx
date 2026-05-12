import Link from "next/link";

/**
 * Visual atom for a live-conditions tile (sunset, weather, music, live cams).
 * Each tile is a solid brand color (deep-blue / pink / orange / teal),
 * with a custom SVG icon and optional href for tiles that link out.
 *
 * Server-renderable. Used by both the server-rendered tiles and the
 * client-fetched weather tile.
 */
export default function LiveConditionsTile({
  iconSrc,
  label,
  value,
  sub,
  bgClass,
  href,
  external = false,
}: {
  iconSrc: string;
  label: string;
  value: string;
  sub: string;
  bgClass: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/85 font-bold mb-2">
        {label}
      </p>
      <div className="flex items-center gap-2.5 mb-1">
        <img src={iconSrc} alt="" aria-hidden="true" className="w-7 h-7 sm:w-8 sm:h-8" />
        <p className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
          {value}
        </p>
      </div>
      <p className="text-xs sm:text-sm text-white/85 mt-1.5">{sub}</p>
    </>
  );

  const className = `relative block rounded-2xl px-5 py-5 sm:px-6 sm:py-6 ${bgClass} ${href ? "hover:brightness-95 transition" : ""}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener" className={className}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
}
