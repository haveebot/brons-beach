"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Sticky top navigation. Transparent over the hero (the aerial photo
 * looks better unobstructed) and snaps to opaque navy on scroll past
 * the hero. Logo on left, section anchors center, Reserve CTA right.
 *
 * Mobile collapses to logo + Reserve CTA only — section anchors live
 * in the bottom sticky bar.
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
          className="flex items-center gap-2 group"
        >
          <Image
            src="/images/bron-logo.png"
            alt=""
            width={36}
            height={36}
            className="rounded-full ring-2 ring-white/30 group-hover:ring-bron-orange transition"
            priority
          />
          <span className="font-display text-white text-lg font-bold tracking-tight hidden sm:inline">
            Bron&apos;s
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
