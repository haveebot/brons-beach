import Image from "next/image";
import LiveConditionsTile from "./LiveConditionsTile";
import LiveConditionsWeather from "./LiveConditionsWeather";
import { sunTimesFor, formatPortATime } from "@/lib/sunCalc";
import { upcomingActs, todayInPortA } from "@/data/live-music";

/**
 * "Right now on the island" — attractive live-conditions block. Sits
 * between the rental tiles and the booking form. Shows sunset, music,
 * weather, and current open-status as an editorial moment, not a
 * dashboard strip. Server-rendered for fast paint; weather hydrates as
 * a client island.
 *
 * Background: navy with an ambient sun glow off-center for atmosphere
 * (small echo of the hero rising sun without competing).
 */
export default function LiveConditionsBlock() {
  const now = new Date();
  const sun = sunTimesFor(now);

  const today = todayInPortA();
  const upcoming = upcomingActs();
  const tonight = upcoming.find((a) => a.date === today);
  const next = tonight ?? upcoming[0];

  let musicValue: string;
  if (tonight) {
    musicValue = tonight.artist;
  } else if (next) {
    musicValue = next.artist;
  } else {
    musicValue = "Coming Soon";
  }

  // Now-as-of stamp (Chicago-local) so the block visibly feels live
  const stamp = now.toLocaleString("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "2-digit",
  });

  // Music tile: links to /music-events. The fourth tile is now Port A
  // Live Cams (deep-link to theportalocal.com/live) — replaces the old
  // "yard open/closed" tile per Collie's homepage v3 mockup.
  const musicLabel = tonight ? "Band Tonight" : "Next Up";

  return (
    <section className="relative text-white overflow-hidden isolate">
      {/* Beach photo background — aerial view of the boardwalk + dunes
          + Gulf at golden hour. Softer overlay than before since the
          new photo is gentler/cleaner than the prior brons-beach.png. */}
      <Image
        src="/images/right-now-bg.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority={false}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-bron-blue/55 mix-blend-multiply pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-bron-deep-blue/40 via-transparent to-bron-deep-blue/50 pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-14 sm:py-20">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[11px] uppercase tracking-[0.35em] text-bron-orange font-bold mb-3">
            Live from Avenue G · {stamp} Port A
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            Right now on the island.
          </h2>
          <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto mt-3">
            Updates by the minute. So you know what to wear, when to head
            down, what the water looks like, and what&apos;s live at the
            Yard tonight.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <LiveConditionsTile
            iconSrc="/images/brons-sunset.svg"
            label="Sunset"
            value={formatPortATime(sun.sunset)}
            sub="Beach time on the Gulf"
            bgClass="bg-bron-deep-blue"
          />
          <LiveConditionsWeather />
          <LiveConditionsTile
            iconSrc="/images/brons-music.svg"
            label={musicLabel}
            value={musicValue}
            sub="Check out music & events at the Yard"
            bgClass="bg-bron-orange"
            href="/music-events"
          />
          <LiveConditionsTile
            iconSrc="/images/brons-wave.svg"
            label="Right Now"
            value="Port A Live Cams"
            sub="Check out the island in real time"
            bgClass="bg-bron-teal"
            href="https://theportalocal.com/live"
            external
          />
        </div>
      </div>
    </section>
  );
}
