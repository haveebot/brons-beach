import Image from "next/image";
import Link from "next/link";
import { VENUE_ARMS, HOURS, CONTACT } from "@/data/venue";
import {
  upcomingActs,
  actDayLabel,
  type LiveAct,
} from "@/data/live-music";
import BookingForm from "./BookingForm";
import HeroLive from "./HeroLive";
import LiveConditionsBlock from "./LiveConditionsBlock";
import SiteNav from "./SiteNav";
import MobileCtaBar from "./MobileCtaBar";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main className="pb-20 md:pb-0">
        <HeroLive />

        {/* Pick your rental — two commanding tiles with Bron as mascot */}
        <section id="rentals" className="bg-bron-sand scroll-mt-16">
          <div className="max-w-5xl mx-auto px-6 py-14 sm:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <RentalCommandTile
                href="#book"
                eyebrow="🏖 Beach Rentals"
                title="Rent the Beach"
                sub="Cabanas, umbrellas, chairs, coolers — delivered to your sand, broken down at end of day."
                gradient="bg-gradient-to-br from-bron-sky via-bron-gold/70 to-bron-coral"
              />
              <RentalCommandTile
                href="#book"
                eyebrow="🛺 Golf Carts"
                title="Rent Carts"
                sub="4 or 6 passenger, street-legal, full tank — pick up on Avenue G or we drop at your rental."
                gradient="bg-gradient-to-br from-bron-coral via-bron-pink to-bron-navy"
              />
            </div>
          </div>
        </section>

        {/* Live Conditions — sunset, music, weather, open status */}
        <LiveConditionsBlock />

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

function RentalCommandTile({
  href,
  eyebrow,
  title,
  sub,
  gradient,
}: {
  href: string;
  eyebrow: string;
  title: string;
  sub: string;
  gradient: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative aspect-[6/5] rounded-3xl overflow-hidden block shadow-xl shadow-bron-navy/15 ring-1 ring-bron-navy/10 hover:shadow-2xl hover:shadow-bron-navy/25 transition-shadow ${gradient}`}
    >
      {/* Subtle paper-grain noise across the gradient for warmth */}
      <div
        aria-hidden
        className="absolute inset-0 paper-noise opacity-30 mix-blend-overlay pointer-events-none"
      />

      {/* Bron mascot — anchored to bottom-right, hand gesturing toward
          the headline on the left. Group-hover scales him slightly to
          add liveliness on hover. */}
      <Image
        src="/images/bron-mascot.png"
        alt=""
        width={460}
        height={572}
        priority={false}
        className="absolute -right-4 -bottom-3 sm:-right-2 sm:-bottom-2 w-[58%] sm:w-[55%] h-auto pointer-events-none drop-shadow-[0_8px_24px_rgba(13,31,44,0.25)] group-hover:scale-105 transition-transform duration-500 origin-bottom-right"
      />

      {/* Text content — top-left anchored, leaves room for Bron on right */}
      <div className="relative z-10 p-6 sm:p-8 max-w-[55%] text-white">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-bron-cream font-bold mb-2 drop-shadow-md">
          {eyebrow}
        </p>
        <h3 className="font-display text-3xl sm:text-5xl font-bold mb-3 leading-none drop-shadow-md">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-white/95 leading-snug mb-4 drop-shadow-md">
          {sub}
        </p>
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-bron-cream bg-bron-navy/30 backdrop-blur-sm rounded-full px-4 py-2 group-hover:gap-3 group-hover:bg-bron-navy/50 transition-all">
          Reserve <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
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
