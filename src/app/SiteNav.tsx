"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Sticky top navigation. Solid bron-blue throughout (was lighter at top
 * before scroll — Collie flagged in v3 review). Wordmark "BRON'S" in
 * Bison Demibold (white) on the left, section anchors center, Reserve
 * CTA right. The circle BRON'S BEACH CARTS logo lives lower on the page
 * now (between rental tiles and Right-now-on-the-island) — a too-small
 * 36px logo in the nav was undermining the brand identity.
 */
export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        scrolled
          ? "bg-bron-blue backdrop-blur-md border-b border-white/10"
          : "bg-bron-blue backdrop-blur-md"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        <Link
          href="/"
          aria-label="Bron's home"
          className="flex items-center group"
        >
          <span
            className="font-[family-name:var(--font-marquee)] text-white text-2xl sm:text-[26px] tracking-wide leading-none group-hover:text-bron-yellow transition-colors"
            style={{ letterSpacing: "0.03em" }}
          >
            BRON&apos;S
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-[13px] uppercase tracking-widest font-bold text-white/85">
          <a href="#beach" className="hover:text-bron-orange transition">
            Beach
          </a>
          <a href="#carts" className="hover:text-bron-orange transition">
            Carts
          </a>
          <a href="#yard" className="hover:text-bron-orange transition">
            The Yard
          </a>
          <a href="#events" className="hover:text-bron-orange transition">
            Events
          </a>
        </div>

        <a
          href="#book"
          className="px-4 py-2 rounded-full bg-bron-coral text-white font-bold text-xs uppercase tracking-widest hover:bg-bron-coral-dark transition shadow-lg"
        >
          Reserve
        </a>
      </div>
    </nav>
  );
}
