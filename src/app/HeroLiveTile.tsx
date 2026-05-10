/**
 * Visual atom for a hero live-conditions tile (sunset, music, weather,
 * open-status). Server-renderable. Used by both static tiles in HeroLive
 * and the client-fetched weather tile.
 */

export default function HeroLiveTile({
  icon,
  label,
  value,
  sub,
  highlight = false,
}: {
  icon: string;
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`backdrop-blur-sm rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-left transition-colors ${
        highlight
          ? "bg-bron-coral/25 border border-bron-coral/50"
          : "bg-white/8 border border-white/15"
      }`}
    >
      <p className="text-[10px] uppercase tracking-widest text-white/65 font-bold flex items-center gap-1.5">
        <span>{icon}</span>
        <span>{label}</span>
      </p>
      <p className="font-display text-2xl sm:text-3xl font-bold text-white mt-1.5">
        {value}
      </p>
      <p className="text-[11px] text-white/70 mt-0.5 truncate">{sub}</p>
    </div>
  );
}
