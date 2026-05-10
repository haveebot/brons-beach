"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Cinematic hero carousel — three of Bron's branded photos crossfade on a
 * 6-second cycle, each with a subtle Ken Burns zoom. The branded aerial
 * (with "BRON'S BEACH CARTS" text overlay) leads; supporting shots add
 * depth. First slide is priority-loaded, others lazy.
 *
 * Honors prefers-reduced-motion: settles to a static image.
 */

const SLIDES = [
  {
    src: "/images/bron-halo.jpg",
    alt: "Bron's Beach Carts — aerial view of the boardwalk to the beach in Port Aransas",
    motion: "ken-burns-center",
  },
  {
    src: "/images/bron-design.png",
    alt: "Bron's branded golf cart parked on the beach",
    motion: "ken-burns-up",
  },
  {
    src: "/images/bron-cart-beach.jpg",
    alt: "Aerial view of Bron's boardwalk crossing the dunes to the beach",
    motion: "ken-burns-down",
  },
] as const;

const SLIDE_MS = 6000;
const FADE_MS = 1200;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      SLIDE_MS,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0">
      {SLIDES.map((s, i) => {
        const visible = reduceMotion ? i === 0 : i === index;
        return (
          <div
            key={s.src}
            aria-hidden={!visible}
            className="absolute inset-0 transition-opacity ease-in-out"
            style={{
              opacity: visible ? 1 : 0,
              transitionDuration: `${FADE_MS}ms`,
            }}
          >
            <div
              className={`absolute inset-0 ${reduceMotion ? "" : s.motion}`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        );
      })}
      {/* Bottom legibility gradient — keeps any overlay text readable */}
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-bron-navy/40 to-transparent pointer-events-none" />
    </div>
  );
}
