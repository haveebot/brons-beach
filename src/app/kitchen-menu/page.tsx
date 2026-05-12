import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../SiteNav";

export const metadata: Metadata = {
  title: "Kitchen Menu",
  description:
    "Bron's Kitchen menu — burgers off the flat top, crispy fries, and island comfort food in Port Aransas, TX.",
};

/**
 * Bron's Kitchen menu page — placeholder route so the Meet-Backyard
 * Kitchen tile has a working destination. Full menu transcription
 * (from operator-side desktop PNGs) lands in a follow-up PR.
 */
export default function KitchenMenuPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-20 sm:pt-24 bg-bron-sand min-h-screen">
        <section className="max-w-3xl mx-auto px-6 py-16 sm:py-24 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-3">
            Bron&apos;s Kitchen
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-bron-deep-blue mb-5 leading-tight">
            Kitchen Menu
          </h1>
          <p className="text-base sm:text-lg text-bron-deep-blue/80 leading-relaxed mb-8">
            Burgers off the flat top, fries done right, island flavor
            comfort food. The kitchen runs whenever the bar&apos;s open —
            no need to leave to eat. Full menu coming soon.
          </p>
          <p className="text-sm text-bron-deep-blue/70 mb-10">
            Hours: Wed–Sun · 5pm onward · 314 E Avenue G, Port Aransas
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
