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

/**
 * Per-arm config for the "Meet us at Bron's Backyard" tiles — icon
 * asset + destination page. Keyed by VenueArm.slug from data/venue.ts.
 */
const YARD_TILE_CONFIG: Record<string, { iconSrc: string; href: string }> = {
  backyard: {
    iconSrc: "/images/brons-music-pink.svg",
    href: "/music-events",
  },
  kitchen: {
    iconSrc: "/images/brons-food-pink.svg",
    href: "/kitchen-menu",
  },
  "shaved-ice": {
    iconSrc: "/images/brons-drink-pink.svg",
    href: "/shaved-ice-menu",
  },
};

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main className="pb-20 md:pb-0">
        <HeroLive />

        {/* Pick your rental — bold solid tiles, custom icons, no photos */}
        <section id="rentals" className="bg-bron-sand scroll-mt-16">
          <div className="max-w-5xl mx-auto px-6 py-14 sm:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <RentalCommandTile
                href="#book"
                eyebrow="Beach Rentals"
                title="Rent the Beach"
                sub="Cabanas, umbrellas, chairs, coolers – delivered to the sand. Just show up, and you're ready to beach."
                bg="bg-bron-pink"
                iconSrc="/images/brons-chairs.svg"
              />
              <RentalCommandTile
                href="#book"
                eyebrow="Golf Carts"
                title="Rent your Carts"
                sub="Ready to roll for 4 or 6, street-legal, full tank — pick up on Ave. G or we drop at your rental."
                bg="bg-bron-teal"
                iconSrc="/images/carts-icon.png"
              />
            </div>
          </div>
        </section>

        {/* BRON'S BEACH CARTS circle mark — section divider band in
            bron-blue between the rental tiles (bron-sand) and the
            Right-now block. Logo straddles the seam between the sand
            section above and the blue band, with breathing room above
            and below per Collie's homepage v3 mockup. */}
        <div className="bg-bron-blue py-12 sm:py-16 relative">
          <div className="flex justify-center">
            <Image
              src="/images/bron-logo.png"
              alt="Bron's Beach Carts"
              width={180}
              height={180}
              className="w-32 h-32 sm:w-44 sm:h-44 drop-shadow-lg relative -mt-20 sm:-mt-24"
            />
          </div>
        </div>

        {/* Live Conditions — sunset, music, weather, open status */}
        <LiveConditionsBlock />

        {/* Booking form — desktop: 2 photo boxes (golf cart + beach) on
            the left, form on the right. Mobile: form first/centered (big
            tap targets), then the two photo boxes side-by-side smaller
            below. Each photo box has the BRON'S BEACH CARTS circle logo
            overlay + orange outline border. */}
        <section
          id="book"
          className="bg-bron-blue text-white py-14 sm:py-20 scroll-mt-16"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl sm:text-5xl font-bold mb-2">
                Reserve your rental
              </h2>
              <p className="text-sm text-white/70">
                We confirm by text within an hour. Free cancellation up to
                24 hours before your rental.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
              {/* Photo boxes column. On mobile: 2 cols side-by-side AFTER
                  the form. On desktop: stacked vertically BEFORE the form. */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 order-2 md:order-1">
                <ReservePhotoBox
                  src="/images/brons-cart.png"
                  alt="Bron's golf cart on the beach"
                />
                <ReservePhotoBox
                  src="/images/brons-beach.png"
                  alt="Bron's beach setup with cabanas and chairs"
                />
              </div>

              {/* Form column. On mobile: first + centered. On desktop:
                  right column. */}
              <div className="order-1 md:order-2 w-full max-w-md mx-auto md:max-w-none md:mx-0">
                <BookingForm />
              </div>
            </div>
          </div>
        </section>

        {/* Welcome to Bron's Beach — two-column moment. Left: big pink
            "Bron knows the Beach." headline + Bron's line caricature.
            Right: deep-blue panel with sunburst icon, italic "Welcome to
            Bron's Beach" header, and the brand origin story. */}
        <section className="bg-bron-sand">
          <div className="max-w-6xl mx-auto px-6 py-14 sm:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left: Bron character SVG + headline */}
              <div className="text-center md:text-left">
                <img
                  src="/images/brons-character.svg"
                  alt="Bron"
                  className="mx-auto md:mx-0 mb-6 w-[220px] sm:w-[280px] h-auto"
                />
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-bron-pink leading-tight">
                  Bron knows
                  <br />
                  the Beach.
                </h2>
              </div>

              {/* Right: deep-blue welcome panel with welcome-sun SVG + story */}
              <div className="relative bg-bron-deep-blue text-white rounded-3xl px-7 py-10 sm:px-10 sm:py-12 shadow-xl border-2 border-bron-coral/60">
                <img
                  src="/images/welcome-to-brons-sun.svg"
                  alt=""
                  aria-hidden="true"
                  className="block mx-auto mb-4 h-16 sm:h-20 w-auto"
                />
                <h3 className="font-display italic text-2xl sm:text-3xl text-bron-coral text-center mb-5 leading-tight">
                  Welcome to Bron&apos;s Beach
                </h3>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
                  Bron&apos;s started as a few golf carts on Avenue G and
                  grew into the full island stop you see today: beach
                  setups delivered to your sand, carts ready when you are,
                  an outdoor bar with live music most weekends, a kitchen
                  and a walk-up window for frozen margaritas, daiquiris,
                  and shaved ice.
                </p>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                  Locally owned, family-run, friendly as a Texas afternoon.
                  We set you up at the beach and see you back at the yard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet us at Bron's Backyard — was "The Yard" section. Header
            renamed per Collie's mockup. Replaces the 3-stacked venue-arm
            cards with 3 compact side-by-side tiles (Backyard, Kitchen,
            Shaved Ice) that link to dedicated pages. Tile icons use
            Collie's pink-on-navy SVG marks. */}
        <section
          id="yard"
          className="relative bg-bron-deep-blue text-white overflow-hidden scroll-mt-16"
        >
          {/* Decorative palm silhouettes for atmosphere */}
          <div aria-hidden className="absolute inset-0 opacity-25 pointer-events-none">
            <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <g fill="#0d1f2c">
                <path d="M 80 400 Q 78 280 90 200 Q 70 180 50 170 Q 80 175 95 195 Q 92 165 80 140 Q 100 160 105 195 Q 120 165 145 155 Q 130 180 110 200 Q 130 210 158 215 Q 130 215 105 215 L 110 400 Z" />
                <path d="M 1100 400 Q 1098 290 1110 220 Q 1085 195 1060 185 Q 1095 188 1115 210 Q 1110 175 1098 145 Q 1118 168 1125 205 Q 1145 175 1170 165 Q 1150 195 1130 215 Q 1155 225 1185 225 Q 1150 228 1125 228 L 1130 400 Z" />
              </g>
            </svg>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 sm:py-20">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-bron-yellow leading-tight mb-3">
                Meet us at Bron&apos;s Backyard
              </h2>
              <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto">
                Drop your cart at our spot on Ave G and stay awhile. Cold
                beer, hot food, frozen drinks, and live music most nights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {VENUE_ARMS.map((arm) => {
                const config = YARD_TILE_CONFIG[arm.slug];
                if (!config) return null;
                return (
                  <Link
                    key={arm.slug}
                    href={config.href}
                    className="group bg-bron-sand text-bron-deep-blue rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col"
                  >
                    {/* Navy icon header — pink-on-navy SVG mark centered.
                        SVG bg matches container bg so its own corners
                        blend invisibly. */}
                    <div className="bg-bron-deep-blue flex items-center justify-center py-10 sm:py-12">
                      <img
                        src={config.iconSrc}
                        alt=""
                        aria-hidden="true"
                        className="w-24 h-24 sm:w-28 sm:h-28"
                      />
                    </div>
                    {/* Sand content area — title, description, highlights */}
                    <div className="p-5 sm:p-6 flex-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-bron-coral font-bold mb-1">
                        {arm.tagline}
                      </p>
                      <h3 className="font-display text-xl sm:text-2xl font-bold mb-2 group-hover:text-bron-coral transition-colors">
                        {arm.label}
                      </h3>
                      <p className="text-sm text-bron-deep-blue/80 leading-relaxed mb-3">
                        {arm.description}
                      </p>
                      <ul className="space-y-1 text-xs text-bron-deep-blue/75">
                        {arm.highlights.slice(0, 3).map((h) => (
                          <li key={h} className="flex gap-2">
                            <span className="text-bron-coral">→</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Private events */}
        <section
          id="events"
          className="bg-bron-blue text-white scroll-mt-16"
        >
          <div className="max-w-5xl mx-auto px-6 py-14 sm:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-bron-orange font-bold mb-2">
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
                  src="/images/brons-party-pic.jpg"
                  alt="Bron's Backyard party scene"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-bron-blue/[0.04] border-y border-bron-blue/10">
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
                  className="bg-white rounded-xl border border-bron-blue/10 p-5 sm:p-6"
                >
                  <dt className="font-bold text-bron-deep-blue mb-1.5">{q.q}</dt>
                  <dd className="text-sm text-bron-deep-blue/80 leading-relaxed">
                    {q.a}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-center text-sm text-bron-deep-blue/70 mt-8">
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
      <p className="text-sm sm:text-base text-bron-deep-blue/70 max-w-xl mx-auto">
        {sub}
      </p>
    </div>
  );
}

function Step({ num, title, body }: { num: number; title: string; body: string }) {
  return (
    <div>
      <p className="font-bold text-bron-deep-blue mb-2 flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-bron-coral text-white text-xs font-bold">
          {num}
        </span>
        {title}
      </p>
      <p className="text-bron-deep-blue/75 leading-relaxed pl-9">{body}</p>
    </div>
  );
}

function LiveMusicPanel() {
  const acts = upcomingActs().slice(0, 4);
  const tonightLabel = "Tonight";

  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-br from-bron-blue to-bron-light-blue text-white p-6 sm:p-7 shadow-md">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-bron-orange font-bold">
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
                    dayLabel === tonightLabel ? "text-bron-orange" : "text-white/60"
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

/**
 * Reserve-section photo box — the golf cart / beach photos on the left
 * side of the Reserve section. Photo fills the box, circle BRON'S BEACH
 * CARTS logo overlays at top-left, and the box gets a coral outline.
 */
function ReservePhotoBox({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-bron-orange shadow-lg">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 25vw, 50vw"
        className="object-cover"
      />
      <Image
        src="/images/bron-logo.png"
        alt=""
        aria-hidden
        width={96}
        height={96}
        className="absolute top-3 left-3 w-14 h-14 sm:w-20 sm:h-20 drop-shadow-md"
      />
    </div>
  );
}

function RentalCommandTile({
  href,
  eyebrow,
  title,
  sub,
  bg,
  iconSrc,
}: {
  href: string;
  eyebrow: string;
  title: string;
  sub: string;
  bg: string;
  iconSrc: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative aspect-[5/4] sm:aspect-[6/5] rounded-3xl overflow-hidden block shadow-xl shadow-bron-blue/15 ring-1 ring-bron-blue/10 hover:shadow-2xl hover:shadow-bron-blue/30 transition-shadow ${bg}`}
    >
      {/* Icon — Collie's flat illustration (yellow chair+umbrella for
          Beach, pink golf cart for Carts). Right-anchored, vertically
          centered. The icon's PNG bg color matches the tile's CSS bg
          exactly so the image blends seamlessly. */}
      <img
        src={iconSrc}
        alt=""
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 h-[82%] w-auto pointer-events-none group-hover:scale-105 transition-transform duration-500 origin-right"
      />

      {/* Text content — bottom-left anchored */}
      <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-end max-w-[58%] text-white">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold mb-3 text-white">
          {eyebrow}
        </p>
        <h3 className="font-display text-4xl sm:text-6xl font-bold mb-3 leading-none">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-white/95 leading-snug mb-5">
          {sub}
        </p>
        <span className="inline-flex items-center gap-2 self-start text-xs uppercase tracking-widest font-bold bg-bron-blue text-white rounded-full px-5 py-2.5 group-hover:gap-3 transition-all shadow-md">
          Reserve <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

function SiteFooter() {
  const directionsHref = `https://maps.apple.com/?address=${encodeURIComponent(CONTACT.address)}`;

  return (
    <footer className="bg-bron-blue text-white">
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
            <p className="text-xs uppercase tracking-widest text-bron-orange font-bold mb-3">
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
              className="inline-block text-bron-orange text-sm font-bold underline-offset-4 hover:underline"
            >
              Get directions →
            </a>
          </div>

          {/* Reach us */}
          <div>
            <p className="text-xs uppercase tracking-widest text-bron-orange font-bold mb-3">
              Reach us
            </p>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="block text-base font-bold text-white hover:text-bron-orange mb-2"
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
