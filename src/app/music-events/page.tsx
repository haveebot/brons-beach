import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../SiteNav";

export const metadata: Metadata = {
  title: "Live Music & Events",
  description:
    "Live music and events at Bron's Backyard in Port Aransas — bands Friday and Saturday, Karaoke Mondays, Cornhole Tournaments Thursdays. May + June 2026 lineup.",
};

type EventType = "music" | "karaoke" | "cornhole" | "private";

interface DayEvent {
  date: number;
  dayOfWeek: "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
  act?: string;
  notes?: string;
  type: EventType;
}

const MAY_2026: DayEvent[] = [
  { date: 1, dayOfWeek: "Fri", act: "HarmonX", notes: "Cornhole Tournament", type: "music" },
  { date: 2, dayOfWeek: "Sat", act: "Ruben V", type: "music" },
  { date: 8, dayOfWeek: "Fri", act: "John Elijah Band", notes: "Cornhole Tournament", type: "music" },
  { date: 9, dayOfWeek: "Sat", act: "Palacios Bros", type: "music" },
  { date: 14, dayOfWeek: "Thu", act: "Cornhole Tournament", type: "cornhole" },
  { date: 15, dayOfWeek: "Fri", act: "Dreaming in Color", type: "music" },
  { date: 16, dayOfWeek: "Sat", act: "Jerry Ward & Dirty Birds", type: "music" },
  { date: 17, dayOfWeek: "Sun", act: "Private Party", type: "private" },
  { date: 21, dayOfWeek: "Thu", act: "Cornhole Tournament", type: "cornhole" },
  { date: 22, dayOfWeek: "Fri", act: "Flying Free", type: "music" },
  { date: 23, dayOfWeek: "Sat", act: "Riptide", type: "music" },
  { date: 24, dayOfWeek: "Sun", act: "Darren McGill", type: "music" },
  { date: 25, dayOfWeek: "Mon", act: "Karaoke", notes: "Memorial Day", type: "karaoke" },
  { date: 26, dayOfWeek: "Tue", act: "Ty Dietz", type: "music" },
  { date: 27, dayOfWeek: "Wed", act: "John Cortez", type: "music" },
  { date: 28, dayOfWeek: "Thu", act: "Brad Ethridge", notes: "Cornhole Tournament", type: "music" },
  { date: 29, dayOfWeek: "Fri", act: "Cruise Control", type: "music" },
  { date: 30, dayOfWeek: "Sat", act: "Brandon Michael", type: "music" },
  { date: 31, dayOfWeek: "Sun", act: "Riptide", type: "music" },
];

const JUNE_2026: DayEvent[] = [
  { date: 1, dayOfWeek: "Mon", act: "Karaoke", type: "karaoke" },
  { date: 2, dayOfWeek: "Tue", act: "Austin Forrest", type: "music" },
  { date: 3, dayOfWeek: "Wed", act: "Brandon Michael", type: "music" },
  { date: 4, dayOfWeek: "Thu", act: "Billy Snipes", type: "music" },
  { date: 5, dayOfWeek: "Fri", act: "Back Pew Revival", type: "music" },
  { date: 6, dayOfWeek: "Sat", act: "David Florez Duo", type: "music" },
  { date: 7, dayOfWeek: "Sun", act: "Brandon Michael Band", type: "music" },
  { date: 8, dayOfWeek: "Mon", act: "Karaoke", type: "karaoke" },
  { date: 9, dayOfWeek: "Tue", act: "Ty Dietz", type: "music" },
  { date: 10, dayOfWeek: "Wed", act: "Jerry Ward Duo", type: "music" },
  { date: 11, dayOfWeek: "Thu", act: "Brad Ethridge", type: "music" },
  { date: 12, dayOfWeek: "Fri", act: "Dreaming in Color", type: "music" },
  { date: 13, dayOfWeek: "Sat", act: "Private Party", type: "private" },
  { date: 14, dayOfWeek: "Sun", act: "Tate Mitchell", type: "music" },
  { date: 15, dayOfWeek: "Mon", act: "Karaoke", type: "karaoke" },
  { date: 16, dayOfWeek: "Tue", act: "Chris Wright", type: "music" },
  { date: 17, dayOfWeek: "Wed", act: "Mantle Jennings Duo", type: "music" },
  { date: 18, dayOfWeek: "Thu", act: "Brad Ethridge", type: "music" },
  { date: 19, dayOfWeek: "Fri", act: "Austin Forrest", type: "music" },
  { date: 20, dayOfWeek: "Sat", act: "Heavy Soul", type: "music" },
  { date: 21, dayOfWeek: "Sun", act: "Brandon Michael Band", type: "music" },
  { date: 22, dayOfWeek: "Mon", act: "Karaoke", type: "karaoke" },
  { date: 23, dayOfWeek: "Tue", act: "Ty Dietz", type: "music" },
  { date: 24, dayOfWeek: "Wed", act: "Jerry Ward Duo", type: "music" },
  { date: 25, dayOfWeek: "Thu", act: "Brad Ethridge", type: "music" },
  { date: 26, dayOfWeek: "Fri", act: "Chanklas", type: "music" },
  { date: 27, dayOfWeek: "Sat", act: "Austin Forrest", type: "music" },
  { date: 28, dayOfWeek: "Sun", act: "Tate Mitchell", type: "music" },
  { date: 29, dayOfWeek: "Mon", act: "Karaoke", type: "karaoke" },
  { date: 30, dayOfWeek: "Tue", act: "Brandon Michael", type: "music" },
];

const TYPE_STYLES: Record<EventType, { accent: string; pill: string; pillText: string; label: string }> = {
  music: {
    accent: "text-bron-pink",
    pill: "bg-bron-pink/15",
    pillText: "text-bron-pink",
    label: "Live music",
  },
  karaoke: {
    accent: "text-bron-yellow",
    pill: "bg-bron-yellow/20",
    pillText: "text-bron-deep-blue",
    label: "Karaoke",
  },
  cornhole: {
    accent: "text-bron-orange",
    pill: "bg-bron-orange/15",
    pillText: "text-bron-orange",
    label: "Cornhole",
  },
  private: {
    accent: "text-bron-light-blue",
    pill: "bg-bron-light-blue/15",
    pillText: "text-bron-light-blue",
    label: "Private event",
  },
};

function MonthCard({ name, year, events }: { name: string; year: number; events: DayEvent[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="bg-bron-deep-blue text-white px-6 sm:px-8 py-5 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold">
          {name} <span className="text-bron-yellow">{year}</span>
        </h2>
      </div>
      <ul>
        {events.map((e) => {
          const style = TYPE_STYLES[e.type];
          return (
            <li
              key={`${name}-${e.date}`}
              className="flex items-center gap-4 sm:gap-5 px-5 sm:px-8 py-4 border-b border-bron-deep-blue/10 last:border-b-0"
            >
              <div className="shrink-0 w-12 sm:w-16 text-center">
                <p className="text-[10px] uppercase tracking-widest text-bron-deep-blue/55 font-bold">
                  {e.dayOfWeek}
                </p>
                <p className={`font-display text-2xl sm:text-3xl font-bold ${style.accent}`}>
                  {e.date}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-bron-deep-blue text-sm sm:text-base">
                  {e.act}
                </p>
                {e.notes && (
                  <p className="text-xs text-bron-deep-blue/70 mt-0.5">{e.notes}</p>
                )}
              </div>
              <span
                className={`hidden sm:inline-block text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${style.pill} ${style.pillText} whitespace-nowrap`}
              >
                {style.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const WEEKLY_PROGRAM = [
  {
    day: "Mondays",
    label: "Karaoke Night",
    body: "Open mic, takeover the stage. Grab a drink, grab the mic, see what happens.",
    accent: "bg-bron-yellow",
  },
  {
    day: "Thursdays",
    label: "Cornhole Tournament",
    body: "Bags fly at 6:30. Sign up at the bar — bring a partner or get paired up.",
    accent: "bg-bron-orange",
  },
  {
    day: "Fri & Sat",
    label: "Live Bands",
    body: "Music kicks off at 7pm. Different artist every night — see the lineup below.",
    accent: "bg-bron-pink",
  },
];

export default function MusicEventsPage() {
  return (
    <>
      <SiteNav />
      <main className="bg-bron-sand min-h-screen">
        {/* Hero */}
        <section className="bg-bron-deep-blue text-white pt-24 sm:pt-32 pb-14 sm:pb-20 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-bron-pink font-bold mb-3">
              Bron&apos;s Backyard · 314 E Avenue G
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-bold mb-4 leading-tight">
              Live Music &amp; Events
            </h1>
            <p className="font-display italic text-xl sm:text-2xl text-bron-light-blue mb-2">
              Cornhole at 6:30 · Live music at 7pm
            </p>
            <p className="text-sm sm:text-base text-white/80">
              Backyard bar open daily at 5 · Kitchen Wed–Sun at 5
            </p>
          </div>
        </section>

        {/* Weekly program highlights */}
        <section className="bg-bron-sand py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-2">
                Every week
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-bron-deep-blue">
                Standing nights
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {WEEKLY_PROGRAM.map((w) => (
                <div
                  key={w.day}
                  className={`${w.accent} rounded-2xl p-6 sm:p-7 shadow-md text-bron-deep-blue`}
                >
                  <p className="text-xs uppercase tracking-widest font-bold mb-1">
                    {w.day}
                  </p>
                  <h3 className="font-display text-2xl font-bold mb-3">
                    {w.label}
                  </h3>
                  <p className="text-sm leading-relaxed">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Monthly calendars */}
        <section className="bg-bron-cream py-14 sm:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-2">
                The lineup
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-bron-deep-blue">
                Coming up at the Yard
              </h2>
            </div>

            <div className="space-y-8 sm:space-y-10">
              <MonthCard name="May" year={2026} events={MAY_2026} />
              <MonthCard name="June" year={2026} events={JUNE_2026} />
            </div>

            <p className="text-center text-sm text-bron-deep-blue/70 mt-10 italic">
              Lineup subject to change. Best way to know what&apos;s on tonight
              — pop in.
            </p>
          </div>
        </section>

        {/* Private events callout */}
        <section className="bg-bron-blue text-white py-14 sm:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-bron-yellow font-bold mb-3">
              Private events
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              Book the yard for your party.
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-6">
              Birthdays, bachelorette weekends, family reunions, rehearsal
              dinners, beach cookouts — the yard, the bar, the kitchen, the
              music. We&apos;ll work out the size and the menu, you just
              bring the people.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="sms:+13612907143"
                className="px-6 py-3 rounded-full bg-bron-coral text-white font-bold text-sm uppercase tracking-widest hover:bg-bron-coral-dark transition-colors"
              >
                Text us about your party
              </a>
              <a
                href="tel:+13612907143"
                className="px-6 py-3 rounded-full border-2 border-white/40 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                Or call (361) 290-7143
              </a>
            </div>
          </div>
        </section>

        {/* Back to home */}
        <section className="bg-bron-deep-blue text-white py-14 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-sm text-white/85 mb-6">
              Bron&apos;s Backyard · 314 E Avenue G, Port Aransas
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-full bg-bron-coral text-white font-bold text-sm uppercase tracking-widest hover:bg-bron-coral-dark transition shadow-md"
            >
              ← Back to Bron&apos;s
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
