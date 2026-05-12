import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../SiteNav";

export const metadata: Metadata = {
  title: "Live Music & Events",
  description:
    "Live music and events at Bron's Backyard — bands, cornhole tournaments, karaoke, and private parties on Avenue G in Port Aransas.",
};

/**
 * Live Music & Events page — placeholder route so the homepage Right-Now
 * music tile and the Meet-Backyard tile have working destinations.
 * Full month-by-month lineup lands in a follow-up PR (May + June 2026
 * calendar data captured in operator-side desktop screenshots).
 */
export default function MusicEventsPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-20 sm:pt-24 bg-bron-sand min-h-screen">
        <section className="max-w-3xl mx-auto px-6 py-16 sm:py-24 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-3">
            Bron&apos;s Backyard
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-bron-deep-blue mb-5 leading-tight">
            Live Music &amp; Events
          </h1>
          <p className="text-base sm:text-lg text-bron-deep-blue/80 leading-relaxed mb-8">
            Bands most weekends, karaoke Mondays, cornhole Thursdays, and
            private parties on demand. Full month-by-month lineup is on
            the way — sit tight.
          </p>
          <p className="text-sm text-bron-deep-blue/70 mb-10">
            In the meantime: open daily at 5 · Kitchen Wed–Sun · 314 E
            Avenue G, Port Aransas
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-bron-blue text-white font-bold text-sm uppercase tracking-widest hover:brightness-95 transition shadow-md"
          >
            ← Back to Bron&apos;s
          </Link>
        </section>
      </main>
    </>
  );
}
