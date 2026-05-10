/**
 * Bron's Backyard — live music lineup.
 *
 * Source-of-truth options (none wired yet — all need source agreement
 * with Bron post-deal-close):
 *
 *   1. Static seed below — manual edit, redeploy. Fine for low-cadence
 *      weeks.
 *
 *   2. Bron's Backyard Facebook page events — FB Graph API call with
 *      a Page Access Token. PAL uses this pattern for /live-music; the
 *      same FB page would just need to grant brons-beach app access.
 *      Approx 30 min wire-in once we have the Page ID.
 *
 *   3. Bron's Wix calendar / events module on bronsbeachcarts.com —
 *      scrape parser (medium fragility). The /live-music page on his
 *      Wix site is the visible source.
 *
 *   4. Operator-edited JSON in `/public/data/live-music.json` — no
 *      redeploy required; could pair with a /admin/live-music editor.
 *
 * Until one of those is wired, the empty state below renders ("Live
 * music most weekends — watch this space"). Add seed entries here to
 * test the rendering or to run a one-off announcement.
 */

export interface LiveAct {
  /** YYYY-MM-DD — local date in Port Aransas (America/Chicago). */
  date: string;
  /** Casual time string — "7pm", "9:30pm", "afternoon", etc. */
  time: string;
  /** Artist or band name. */
  artist: string;
  /** Optional stage / arm. Defaults to "Bron's Backyard". */
  stage?: string;
  /** Optional external link — artist site, FB event, etc. */
  url?: string;
}

/**
 * Seed data — edit and redeploy. Empty default ships the empty-state UI.
 * Uncomment + edit when you have an act to announce.
 */
export const LIVE_MUSIC: LiveAct[] = [
  // {
  //   date: "2026-05-15",
  //   time: "7pm",
  //   artist: "Mykel Martin",
  //   stage: "Bron's Backyard",
  // },
];

/**
 * Returns acts on or after the given date (default: today in America/Chicago),
 * sorted ascending. Trims older entries naturally — no need to clean the seed.
 */
export function upcomingActs(
  acts: LiveAct[] = LIVE_MUSIC,
  fromDate?: string,
): LiveAct[] {
  const today = fromDate || todayInPortA();
  return acts
    .filter((a) => a.date >= today)
    .sort((a, b) =>
      a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date),
    );
}

/** Today's date in America/Chicago as YYYY-MM-DD (Port Aransas timezone). */
export function todayInPortA(): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(new Date());
}

/** Friendly day label for an act date — "Tonight", "Tomorrow", "Fri Jun 5". */
export function actDayLabel(date: string, today?: string): string {
  const t = today || todayInPortA();
  if (date === t) return "Tonight";
  const next = nextDay(t);
  if (date === next) return "Tomorrow";
  const d = new Date(date + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function nextDay(yyyymmdd: string): string {
  const d = new Date(yyyymmdd + "T12:00:00");
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().split("T")[0];
}
