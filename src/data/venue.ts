/**
 * Bron's — non-bookable promotional content for the venue arms.
 *
 * Bron's Backyard, Kitchen, and Shaved Ice & To-Go Bar are part of the
 * full Bron's organization but are NOT transactional through this
 * platform. They're featured here for cross-promotion — every Bron's
 * URL surfaces every Bron's arm.
 */

export interface VenueArm {
  slug: string;
  emoji: string;
  label: string;
  tagline: string;
  description: string;
  highlights: string[];
}

export const VENUE_ARMS: VenueArm[] = [
  {
    slug: "backyard",
    emoji: "🍻",
    label: "Bron's Backyard",
    tagline: "Outdoor bar · live music · yard games",
    description:
      "Cold beer, frozen cocktails, live music most nights, and a yard built for staying all afternoon. Cornhole, giant Jenga, ping pong, and a deck under the umbrellas. The kind of place you stumble into and don't leave.",
    highlights: [
      "Live music most weekends",
      "Cornhole · giant Jenga · ping pong",
      "Outdoor seating + deck",
      "Movie nights on the lawn",
      "Private events welcome",
    ],
  },
  {
    slug: "kitchen",
    emoji: "🍔",
    label: "Bron's Kitchen",
    tagline: "Sizzling burgers · crispy fries · island comfort food",
    description:
      "Burgers off the flat top, fries done right, and island flavor comfort food. The kitchen runs whenever the bar's open — no need to leave to eat.",
    highlights: [
      "Open kitchen during all bar hours",
      "Burgers, fries, island plates",
      "No-fuss menu, fast service",
    ],
  },
  {
    slug: "shaved-ice",
    emoji: "🍧",
    label: "Bron's Shaved Ice & To-Go Bar",
    tagline: "Frozen margaritas · daiquiris · shaved ice — walk-up, to-go",
    description:
      "Walk-up window for frozen margaritas, daiquiris, tropical cocktails, and shaved ice — built for the beach, the cart, the rental, or ten feet to the patio. No table, no wait.",
    highlights: [
      "Frozen margaritas to-go",
      "Daiquiris + tropical cocktails",
      "Shaved ice — every flavor",
      "Walk-up window, no wait",
    ],
  },
];

export const HOURS = {
  weekdays: "Mon–Thu · Sun · 10am–11pm",
  weekends: "Fri–Sat · 10am–midnight",
};

/**
 * Structured open hours by day-of-week (0=Sun, 1=Mon, ..., 6=Sat).
 * Pair = [openHour, closeHour] in 24h local time. closeHour=24 means
 * midnight; >24 means past-midnight closing (e.g. 25 = 1am next day).
 *
 * Drives the live "Open until X" / "Closed — opens X" status tile and
 * any future hours-aware logic.
 */
export const HOURS_BY_DAY: Record<number, [number, number]> = {
  0: [10, 23], // Sun  10am – 11pm
  1: [10, 23], // Mon
  2: [10, 23], // Tue
  3: [10, 23], // Wed
  4: [10, 23], // Thu
  5: [10, 24], // Fri  10am – midnight
  6: [10, 24], // Sat  10am – midnight
};

export const CONTACT = {
  phone: "(361) 290-7143",
  phoneTel: "+13612907143",
  address: "314 E Avenue G, Port Aransas, TX 78373",
  addressShort: "314 E Avenue G",
};
