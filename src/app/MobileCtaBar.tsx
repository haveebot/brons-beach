"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only sticky bottom action bar. Two side-by-side actions: Reserve
 * (primary, scrolls to booking form) + Call (tel: link). Hides on desktop
 * where the top nav handles both. Auto-hides briefly when the booking
 * form is in view so the buttons don't sit on top of the form's CTA.
 */
export default function MobileCtaBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("book");
    if (!target) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setHidden(e.isIntersecting);
      },
      { threshold: 0.25 },
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-30 transition-transform duration-200 ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="bg-bron-blue/95 backdrop-blur-md border-t border-white/10 px-3 py-3 grid grid-cols-2 gap-2">
        <a
          href="#book"
          className="text-center py-3 rounded-lg bg-bron-coral text-white font-bold text-sm uppercase tracking-widest active:bg-bron-coral-dark"
        >
          Reserve
        </a>
        <a
          href="tel:+13612907143"
          className="text-center py-3 rounded-lg border-2 border-white/40 text-white font-bold text-sm uppercase tracking-widest active:bg-white/10"
        >
          Call
        </a>
      </div>
    </div>
  );
}
