/**
 * Visual atom for a live-conditions tile (sunset, music, weather, open).
 * Each tile is a solid brand color (deep-blue / pink / orange / teal),
 * passed in via bgClass — set by LiveConditionsBlock per topic.
 *
 * Server-renderable. Used by both the server-rendered tiles and the
 * client-fetched weather tile.
 */
export default function LiveConditionsTile({
  icon,
  label,
  value,
  sub,
  bgClass,
}: {
  icon: string;
  label: string;
  value: string;
  sub: string;
  bgClass: string;
}) {
  return (
    <div className={`relative rounded-2xl px-5 py-5 sm:px-6 sm:py-6 ${bgClass}`}>
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/85 font-bold flex items-center gap-2 mb-2">
        <span className="text-base">{icon}</span>
        <span>{label}</span>
      </p>
      <p className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
        {value}
      </p>
      <p className="text-xs sm:text-sm text-white/85 mt-1.5 truncate">{sub}</p>
    </div>
  );
}
