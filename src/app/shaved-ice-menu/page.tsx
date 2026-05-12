import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../SiteNav";

export const metadata: Metadata = {
  title: "Shaved Ice & To-Go Bar",
  description:
    "Bron's Shaved Ice & To-Go Bar — frozen margaritas, daiquiris, tropical cocktails, and shaved ice from the walk-up window in Port Aransas.",
};

/**
 * Bron's Shaved Ice & To-Go Bar menu page — placeholder route so the
 * Meet-Backyard Shaved Ice tile has a working destination. Full menu
 * lands in a follow-up PR.
 */
export default function ShavedIceMenuPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-20 sm:pt-24 bg-bron-sand min-h-screen">
        <section className="max-w-3xl mx-auto px-6 py-16 sm:py-24 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-3">
            Bron&apos;s Shaved Ice &amp; To-Go Bar
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-bron-deep-blue mb-5 leading-tight">
            Shaved Ice &amp; To-Go
          </h1>
          <p className="text-base sm:text-lg text-bron-deep-blue/80 leading-relaxed mb-8">
            Walk-up window for frozen margaritas, daiquiris, tropical
            cocktails, and shaved ice — built for the beach, the cart,
            the rental, or ten feet to the patio. No table, no wait.
            Full flavor menu coming soon.
          </p>
          <p className="text-sm text-bron-deep-blue/70 mb-10">
            Walk-up window · same hours as the bar · 314 E Avenue G, Port
            Aransas
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
