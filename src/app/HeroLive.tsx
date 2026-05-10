/**
 * Magazine-cover hero. Massive Fraunces "Bron's" rendered huge over an
 * ambient SVG sun rising at the bottom edge. No tiles in the hero — the
 * live conditions become a thin status strip below (HeroStatusStrip).
 *
 * Server-rendered. The strip handles its own data; this file is pure
 * presentation.
 */
export default function HeroLive() {
  return (
    <section className="relative bg-bron-navy text-white overflow-hidden">
      {/* Ambient sun — half-rises from the bottom edge, slow pulse.
          Pure SVG so it scales perfectly at any size. */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f5b35a" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#e8654a" stopOpacity="0.7" />
              <stop offset="80%" stopColor="#1a3a52" stopOpacity="0" />
              <stop offset="100%" stopColor="#1a3a52" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="horizonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a3a52" stopOpacity="0" />
              <stop offset="100%" stopColor="#0d1f2c" stopOpacity="1" />
            </linearGradient>
          </defs>
          {/* Horizon dunes — soft silhouette band at the bottom */}
          <rect
            x="0"
            y="600"
            width="1200"
            height="200"
            fill="url(#horizonGrad)"
          />
          {/* Sun — centered, large, rising from below the fold */}
          <g className="hero-sun">
            <circle cx="600" cy="780" r="520" fill="url(#sunGrad)" />
          </g>
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-24 sm:pt-32 pb-20 sm:pb-32 text-center">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.4em] text-bron-gold font-bold mb-8 sm:mb-10">
          <span className="opacity-90">Port Aransas, TX</span>
          <span className="mx-3 opacity-50">·</span>
          <span className="opacity-90">314 E Avenue G</span>
        </p>

        {/* The mark — proper-case Fraunces, optical-sized, set huge.
            clamp() makes it fluidly responsive: 5rem on phone up to ~16rem
            on widescreen. Letter-spacing tightened (handled in globals.css
            on .font-display). */}
        <h1 className="font-display font-bold leading-[0.9] mb-6 sm:mb-8 text-[clamp(5rem,18vw,16rem)]">
          Bron&apos;s
        </h1>

        <p className="font-display text-xl sm:text-3xl text-white/90 max-w-2xl mx-auto leading-snug mb-10 sm:mb-12 italic">
          The whole island stop, in one yard.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href="#book"
            className="px-8 py-4 rounded-full bg-bron-coral text-white font-bold text-sm uppercase tracking-widest hover:bg-bron-coral-dark transition-colors shadow-xl shadow-bron-coral/25"
          >
            Reserve a rental
          </a>
          <a
            href="#yard"
            className="px-8 py-4 rounded-full border-2 border-white/40 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            Visit the yard
          </a>
        </div>
      </div>
    </section>
  );
}
