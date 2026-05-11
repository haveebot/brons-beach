import Image from "next/image";
import { BEACH_PRODUCTS, CART_PRODUCTS, type Product } from "@/data/products";
import { VENUE_ARMS, HOURS, CONTACT } from "@/data/venue";
import {
  upcomingActs,
  actDayLabel,
  type LiveAct,
} from "@/data/live-music";
import BookingForm from "./BookingForm";
import HeroLive from "./HeroLive";
import SiteNav from "./SiteNav";
import MobileCtaBar from "./MobileCtaBar";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main className="pb-20 md:pb-0">
        <HeroLive />

        {/* Beach Rentals */}
        <section
          id="beach"
          className="max-w-5xl mx-auto px-6 py-14 sm:py-20 scroll-mt-16"
        >
          <SectionHeading
            eyebrow="🏖 Beach Rentals"
            title="Set up at your spot"
            sub="Every beach rental includes setup at your access point and pickup at end of day. You don't haul anything."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BEACH_PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        {/* Cart Rentals */}
        <section
          id="carts"
          className="bg-bron-navy/[0.04] border-y border-bron-navy/10"
        >
          <div className="max-w-5xl mx-auto px-6 py-14 sm:py-20 scroll-mt-16">
            <SectionHeading
              eyebrow="🛺 Golf Carts"
              title="Cruise the island"
              sub="Pick up at our shop on Avenue G or we'll drop the cart at your rental house. Street-legal, full tank, ready to roll."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CART_PRODUCTS.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Booking form */}
        <section
          id="book"
          className="bg-bron-navy text-white py-14 sm:py-20 scroll-mt-16"
        >
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-2 text-center">
              Reserve your rental
            </h2>
            <p className="text-sm text-white/70 text-center mb-8">
              We confirm by text within an hour. Free cancellation up to 24
              hours before your rental.
            </p>
            <BookingForm />
          </div>
        </section>

        {/* The yard */}
        <section
          id="yard"
          className="max-w-5xl mx-auto px-6 py-14 sm:py-20 scroll-mt-16"
        >
          <SectionHeading
            eyebrow="The Yard"
            title="While you're on the island"
            sub="Drop your cart at our spot on Avenue G and stay a while. Cold beer, hot food, frozen drinks, live music most nights."
          />
          <LiveMusicPanel />
          <div className="space-y-6">
            {VENUE_ARMS.map((arm) => (
              <article
                key={arm.slug}
                className="bg-white rounded-2xl border border-bron-navy/10 p-6 sm:p-8 shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="sm:col-span-1">
                    <div className="aspect-square rounded-xl bg-gradient-to-br from-bron-gold/20 to-bron-coral/15 border border-bron-gold/30 flex items-center justify-center">
                      <span className="text-7xl">{arm.emoji}</span>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-bron-coral font-bold mb-1">
                      {arm.tagline}
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                      {arm.label}
                    </h3>
                    <p className="text-sm text-bron-navy/80 leading-relaxed mb-4">
                      {arm.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-bron-navy/75">
                      {arm.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="text-bron-coral">→</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* About — Bron's portrait + the yard story */}
        <section className="bg-bron-sand">
          <div className="max-w-4xl mx-auto px-6 py-14 sm:py-20 text-center">
            <Image
              src="/images/bron-caricature.jpg"
              alt="Bron"
              width={180}
              height={228}
              className="mx-auto mb-6"
              priority={false}
            />
            <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-2">
              Meet Bron
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-5">
              The whole island stop, in one yard.
            </h2>
            <p className="text-base sm:text-lg text-bron-navy/85 leading-relaxed max-w-2xl mx-auto">
              Bron&apos;s started as a few golf carts on Avenue G and grew into
              the full island stop you see today: beach setups delivered to
              your sand, carts ready when you are, an outdoor bar with live
              music most weekends, a kitchen running the same hours as the bar,
              and a walk-up window for frozen margaritas, daiquiris, and
              shaved ice.
            </p>
            <p className="text-base sm:text-lg text-bron-navy/85 leading-relaxed max-w-2xl mx-auto mt-4">
              Locally owned, family-run, friendly as a Texas afternoon. We set
              you up at the beach and see you back at the yard.
            </p>
          </div>
        </section>

        {/* Private events */}
        <section
          id="events"
          className="bg-bron-navy text-white scroll-mt-16"
        >
          <div className="max-w-5xl mx-auto px-6 py-14 sm:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-bron-gold font-bold mb-2">
                  Private events
                </p>
                <h2 className="font-display text-3xl sm:text-5xl font-bold mb-5">
                  Book the yard for your party.
                </h2>
                <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-6">
                  Birthdays, bachelorette weekends, family reunions, rehearsal
                  dinners, beach cookouts — the yard, the bar, the kitchen,
                  the music. We&apos;ll work out the size and the menu, you
                  just bring the people.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`sms:${CONTACT.phoneTel}`}
                    className="px-6 py-3 rounded-full bg-bron-coral text-white font-bold text-sm uppercase tracking-widest hover:bg-bron-coral-dark transition-colors"
                  >
                    Text us about your party
                  </a>
                  <a
                    href={`tel:${CONTACT.phoneTel}`}
                    className="px-6 py-3 rounded-full border-2 border-white/40 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
                  >
                    Or call {CONTACT.phone}
                  </a>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-first md:order-last">
                <Image
                  src="/images/bron-cart-beach.jpg"
                  alt="Bron's beach carts on the boardwalk"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-bron-navy/[0.04] border-y border-bron-navy/10">
          <div className="max-w-5xl mx-auto px-6 py-14">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10">
              How rentals work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
              <Step
                num={1}
                title="Reserve online"
                body="Pick your rental, dates, and beach access point or delivery address. Pay your reservation in 60 seconds."
              />
              <Step
                num={2}
                title="We deliver"
                body="Beach setups go up at your access point in the morning. Carts are ready at our shop or dropped at your rental."
              />
              <Step
                num={3}
                title="We handle the rest"
                body="Beach setups break down at end of day — you don't haul anything. Carts return to the shop or get picked up."
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-bron-sand">
          <div className="max-w-3xl mx-auto px-6 py-14 sm:py-20">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10">
              Common questions
            </h2>
            <dl className="space-y-6">
              {FAQ.map((q) => (
                <div
                  key={q.q}
                  className="bg-white rounded-xl border border-bron-navy/10 p-5 sm:p-6"
                >
                  <dt className="font-bold text-bron-navy mb-1.5">{q.q}</dt>
                  <dd className="text-sm text-bron-navy/80 leading-relaxed">
                    {q.a}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-center text-sm text-bron-navy/70 mt-8">
              More questions?{" "}
              <a
                href={`sms:${CONTACT.phoneTel}`}
                className="text-bron-coral font-bold hover:underline underline-offset-4"
              >
                Text us
              </a>
              {" or "}
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="text-bron-coral font-bold hover:underline underline-offset-4"
              >
                give us a call
              </a>
              .
            </p>
          </div>
        </section>

        {/* Footer */}
        <SiteFooter />
      </main>
      <MobileCtaBar />
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="text-center mb-10 sm:mb-12">
      <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-2">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl sm:text-5xl font-bold mb-3 tracking-tight">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-bron-navy/70 max-w-xl mx-auto">
        {sub}
      </p>
    </div>
  );
}

function Step({ num, title, body }: { num: number; title: string; body: string }) {
  return (
    <div>
      <p className="font-bold text-bron-navy mb-2 flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-bron-coral text-white text-xs font-bold">
          {num}
        </span>
        {title}
      </p>
      <p className="text-bron-navy/75 leading-relaxed pl-9">{body}</p>
    </div>
  );
}

function LiveMusicPanel() {
  const acts = upcomingActs().slice(0, 4);
  const tonightLabel = "Tonight";

  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-br from-bron-navy via-[#2a4a63] to-bron-sky text-white p-6 sm:p-7 shadow-md">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-bron-gold font-bold">
          🎶 Live music · Bron&apos;s Backyard
        </p>
        <p className="text-[10px] uppercase tracking-widest text-white/50">
          most weekends
        </p>
      </div>
      {acts.length === 0 ? (
        <p className="text-sm sm:text-base text-white/85 leading-relaxed">
          Watch this space for tonight&apos;s lineup. Live music plays most
          weekends — pull up a chair and stay a while.
        </p>
      ) : (
        <ul className="space-y-2.5">
          {acts.map((a: LiveAct, i) => {
            const dayLabel = actDayLabel(a.date);
            const isFirst = i === 0;
            return (
              <li
                key={`${a.date}-${a.time}-${a.artist}`}
                className="flex items-baseline gap-3 flex-wrap"
              >
                <span
                  className={`text-[10px] uppercase tracking-widest font-bold ${
                    dayLabel === tonightLabel ? "text-bron-gold" : "text-white/60"
                  } w-20 shrink-0`}
                >
                  {dayLabel}
                </span>
                <span className="text-white/70 text-sm w-16 shrink-0">
                  {a.time}
                </span>
                <span
                  className={`font-display ${isFirst ? "text-lg sm:text-xl" : "text-base"} font-bold text-white`}
                >
                  {a.artist}
                </span>
                {a.stage && a.stage !== "Bron's Backyard" && (
                  <span className="text-xs text-white/50">{a.stage}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="bg-white rounded-2xl border border-bron-navy/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group">
      <div className="aspect-[16/9] relative bg-gradient-to-br from-bron-gold/25 via-bron-gold/10 to-bron-sky/15 overflow-hidden">
        {p.imageUrl ? (
          <Image
            src={p.imageUrl}
            alt={p.label}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl drop-shadow-sm">{p.emoji}</span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">
          {p.label}
        </h3>
        <p className="text-sm text-bron-navy/80 leading-relaxed mb-4 flex-1">
          {p.longDescription}
        </p>
        <div className="flex items-baseline justify-between border-t border-bron-navy/10 pt-4">
          <span className="font-display text-3xl font-bold text-bron-coral">
            ${(p.dailyTotalCents / 100).toFixed(0)}
          </span>
          <span className="text-xs uppercase tracking-widest text-bron-navy/60">
            per day
          </span>
        </div>
        <a
          href="#book"
          className="mt-4 block text-center px-4 py-2.5 rounded-lg bg-bron-coral text-white font-bold text-xs uppercase tracking-widest hover:bg-bron-coral-dark transition-colors"
        >
          Reserve
        </a>
      </div>
    </article>
  );
}

function SiteFooter() {
  const directionsHref = `https://maps.apple.com/?address=${encodeURIComponent(CONTACT.address)}`;

  return (
    <footer className="bg-bron-navy text-white">
      <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Brand block */}
          <div className="sm:col-span-1">
            <Image
              src="/images/bron-logo.png"
              alt="Bron's Beach Carts logo"
              width={84}
              height={84}
              className="mb-4"
            />
            <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
              The full island stop
            </p>
            <p className="text-sm text-white/80 leading-relaxed">
              Beach rentals · Golf carts · Outdoor bar · Kitchen · Shaved ice
            </p>
          </div>

          {/* Visit */}
          <div>
            <p className="text-xs uppercase tracking-widest text-bron-gold font-bold mb-3">
              Visit
            </p>
            <p className="text-sm text-white/85 mb-1">{CONTACT.address}</p>
            <p className="text-xs text-white/65 mb-4">
              {HOURS.weekdays}
              <br />
              {HOURS.weekends}
            </p>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener"
              className="inline-block text-bron-gold text-sm font-bold underline-offset-4 hover:underline"
            >
              Get directions →
            </a>
          </div>

          {/* Reach us */}
          <div>
            <p className="text-xs uppercase tracking-widest text-bron-gold font-bold mb-3">
              Reach us
            </p>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="block text-base font-bold text-white hover:text-bron-gold mb-2"
            >
              {CONTACT.phone}
            </a>
            <a
              href={`sms:${CONTACT.phoneTel}`}
              className="block text-sm text-white/70 hover:text-white mb-1"
            >
              Text us anytime
            </a>
            <a
              href="#book"
              className="inline-block mt-3 px-4 py-2 rounded-full bg-bron-coral text-white font-bold text-xs uppercase tracking-widest hover:bg-bron-coral-dark transition-colors"
            >
              Reserve a rental
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:justify-between">
          <p className="text-[11px] text-white/45">
            © {new Date().getFullYear()} Bron&apos;s · Port Aransas, TX
          </p>
          <p className="text-[11px] text-white/45">
            Free cancellation up to 24 hours · Crew on call all day
          </p>
        </div>
      </div>
    </footer>
  );
}

const FAQ: { q: string; a: string }[] = [
  {
    q: "When does my beach setup go up?",
    a: "Crew sets up before you arrive — usually within an hour of sunrise. We text you the morning of with the exact window so you know when to head down.",
  },
  {
    q: "What if the weather turns?",
    a: "Free cancellation up to 24 hours before your rental start time. Day-of weather calls happen on a case-by-case basis — text us, we'll work it out.",
  },
  {
    q: "Do I need to be at the beach for setup?",
    a: "No. Tell us your access point and we'll set up exactly where you ask. End of day, the crew swings back to break it down. You don't haul anything.",
  },
  {
    q: "Can I extend a cart rental day-of?",
    a: "Just text us. Carts are usually flexible if there's nobody right behind you on the schedule. Same for changing pickup or return windows.",
  },
  {
    q: "Where are the golf carts allowed?",
    a: "Within Port Aransas city streets, the harbor, and the beach access roads. There are a few off-limit zones (no Hwy 361 south of Ave G, no driving in the dunes or water, no public sidewalks) — we cover those when you pick up.",
  },
  {
    q: "Do you handle group bookings?",
    a: "Yes. Multiple carts, big cabana setups, family-reunion-sized orders — text us with what you need and we'll get it dialed in. Private events in the yard are a thing too.",
  },
];
