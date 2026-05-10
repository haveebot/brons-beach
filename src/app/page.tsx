import Link from "next/link";
import { BEACH_PRODUCTS, CART_PRODUCTS, type Product } from "@/data/products";
import { VENUE_ARMS, HOURS, CONTACT } from "@/data/venue";
import BookingForm from "./BookingForm";

export const dynamic = "force-dynamic";

/**
 * Bron's — full digital presence.
 * Beach rentals + golf carts + venue + kitchen + shaved ice, all on one page.
 *
 * Booking flow only handles beach + cart categories (the bookable streams).
 * Venue arms (bar/kitchen/shaved ice) are promoted but not transactional —
 * cross-promotion to drive foot traffic.
 */
export default function HomePage() {
  return (
    <main>
      {/* Hero band — full Bron's */}
      <section className="relative bg-gradient-to-b from-[#3d6e8c] via-[#2a4a63] to-[#1a3a52] text-white">
        <div className="max-w-5xl mx-auto px-6 py-12 sm:py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#f5b35a] font-bold mb-3">
            Port Aransas, TX · 314 E Avenue G
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            Bron&apos;s
          </h1>
          <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-2">
            Beach rentals · Golf carts · Outdoor bar · Kitchen · Shaved ice
          </p>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Five spots, one yard. Everything you need on the island, all in
            one place — set up where you want it, served the way you want it.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="#beach"
              className="px-6 py-3 rounded-full bg-[#e8654a] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#d2553c] transition-colors"
            >
              🏖 Beach setups
            </Link>
            <Link
              href="#carts"
              className="px-6 py-3 rounded-full bg-[#e8654a] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#d2553c] transition-colors"
            >
              🛺 Golf carts
            </Link>
            <Link
              href="#yard"
              className="px-6 py-3 rounded-full border-2 border-white/40 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              🍻 Visit the yard
            </Link>
          </div>
        </div>
      </section>

      {/* Beach Rentals */}
      <section
        id="beach"
        className="max-w-5xl mx-auto px-6 py-12 sm:py-16 scroll-mt-8"
      >
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e8654a] font-bold mb-2">
            🏖 Beach Rentals
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            Set up at your spot
          </h2>
          <p className="text-sm text-[#1a3a52]/70 max-w-xl mx-auto">
            Every beach rental includes setup at your access point and pickup
            at end of day. You don&apos;t haul anything.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {BEACH_PRODUCTS.map((p) => (
            <ProductCard key={p.slug} product={p} bookHref="#book" />
          ))}
        </div>
      </section>

      {/* Cart Rentals */}
      <section
        id="carts"
        className="bg-[#1a3a52]/5 border-y border-[#1a3a52]/10"
      >
        <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16 scroll-mt-8">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#e8654a] font-bold mb-2">
              🛺 Golf Carts
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              Cruise the island
            </h2>
            <p className="text-sm text-[#1a3a52]/70 max-w-xl mx-auto">
              Pick up at our shop on Avenue G or we&apos;ll drop the cart at
              your rental house. Street-legal, full tank, ready to roll.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CART_PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} bookHref="#book" />
            ))}
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section id="book" className="bg-[#1a3a52] text-white py-12 sm:py-16 scroll-mt-8">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2 text-center">
            Reserve your rental
          </h2>
          <p className="text-sm text-white/70 text-center mb-8">
            We confirm by text within an hour. Free cancellation up to 24
            hours before your rental.
          </p>
          <BookingForm />
        </div>
      </section>

      {/* The yard — venue / bar / kitchen / shaved ice */}
      <section id="yard" className="max-w-5xl mx-auto px-6 py-12 sm:py-16 scroll-mt-8">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e8654a] font-bold mb-2">
            The Yard
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            While you&apos;re on the island
          </h2>
          <p className="text-sm text-[#1a3a52]/70 max-w-xl mx-auto">
            Drop your cart at our spot on Avenue G and stay a while. Cold
            beer, hot food, frozen drinks, live music most nights.
          </p>
        </div>

        <div className="space-y-6">
          {VENUE_ARMS.map((arm) => (
            <article
              key={arm.slug}
              className="bg-white rounded-2xl border border-[#1a3a52]/10 p-6 sm:p-8 shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-1">
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-[#f5b35a]/20 to-[#e8654a]/15 border border-[#f5b35a]/30 flex items-center justify-center">
                    <span className="text-7xl">{arm.emoji}</span>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#e8654a] font-bold mb-1">
                    {arm.tagline}
                  </p>
                  <h3 className="font-display text-2xl font-bold mb-3">
                    {arm.label}
                  </h3>
                  <p className="text-sm text-[#1a3a52]/80 leading-relaxed mb-4">
                    {arm.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[#1a3a52]/75">
                    {arm.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="text-[#e8654a]">→</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center bg-[#f5efe2] rounded-2xl p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#1a3a52]/60 font-bold mb-2">
            Come find us
          </p>
          <p className="font-display text-2xl font-bold mb-1">
            {CONTACT.address}
          </p>
          <p className="text-sm text-[#1a3a52]/80 mb-1">{HOURS.weekdays}</p>
          <p className="text-sm text-[#1a3a52]/80 mb-3">{HOURS.weekends}</p>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="inline-block text-[#e8654a] font-bold underline-offset-4 hover:underline"
          >
            {CONTACT.phone}
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#1a3a52]/5 border-t border-[#1a3a52]/10">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="font-display text-2xl font-bold text-center mb-8">
            How rentals work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-bold text-[#1a3a52] mb-2 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#e8654a] text-white text-xs font-bold">
                  1
                </span>
                Reserve online
              </p>
              <p className="text-[#1a3a52]/75 leading-relaxed pl-9">
                Pick your rental, dates, and beach access point or delivery
                address. Pay your reservation in 60 seconds.
              </p>
            </div>
            <div>
              <p className="font-bold text-[#1a3a52] mb-2 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#e8654a] text-white text-xs font-bold">
                  2
                </span>
                We deliver
              </p>
              <p className="text-[#1a3a52]/75 leading-relaxed pl-9">
                Beach setups go up at your access point in the morning. Carts
                are ready at our shop or dropped at your rental.
              </p>
            </div>
            <div>
              <p className="font-bold text-[#1a3a52] mb-2 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#e8654a] text-white text-xs font-bold">
                  3
                </span>
                We handle the rest
              </p>
              <p className="text-[#1a3a52]/75 leading-relaxed pl-9">
                Beach setups break down at end of day — you don&apos;t haul
                anything. Carts return to the shop or get picked up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a3a52] text-white">
        <div className="max-w-5xl mx-auto px-6 py-10 text-center">
          <p className="font-display text-xl font-bold mb-2">Bron&apos;s</p>
          <p className="text-sm text-white/80 mb-1">{CONTACT.address}</p>
          <p className="text-xs text-white/60 mb-3">
            {HOURS.weekdays} · {HOURS.weekends}
          </p>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="inline-block text-[#f5b35a] font-bold text-sm underline-offset-4 hover:underline"
          >
            {CONTACT.phone}
          </a>
          <p className="text-[10px] uppercase tracking-widest text-white/40 mt-8">
            Beach rentals · Golf carts · Outdoor bar · Kitchen · Shaved ice
          </p>
        </div>
      </footer>
    </main>
  );
}

function ProductCard({
  product: p,
  bookHref,
}: {
  product: Product;
  bookHref: string;
}) {
  return (
    <article className="bg-white rounded-2xl border border-[#1a3a52]/10 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-[#f5b35a]/25 via-[#f5b35a]/10 to-[#3d6e8c]/15 border border-[#f5b35a]/30 flex items-center justify-center mb-4">
        <span className="text-7xl drop-shadow-sm">{p.emoji}</span>
      </div>
      <h3 className="font-display text-xl font-bold mb-2">{p.label}</h3>
      <p className="text-sm text-[#1a3a52]/80 leading-relaxed mb-4 flex-1">
        {p.longDescription}
      </p>
      <div className="flex items-baseline justify-between border-t border-[#1a3a52]/10 pt-4">
        <span className="font-display text-3xl font-bold text-[#e8654a]">
          ${(p.dailyTotalCents / 100).toFixed(0)}
        </span>
        <span className="text-xs uppercase tracking-widest text-[#1a3a52]/60">
          per day
        </span>
      </div>
      <Link
        href={bookHref}
        className="mt-4 block text-center px-4 py-2.5 rounded-lg bg-[#e8654a] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#d2553c]"
      >
        Reserve
      </Link>
    </article>
  );
}
