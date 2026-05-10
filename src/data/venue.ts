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
    tagline: "Tropical cocktails · frozen daiquiris · shaved ice",
    description:
      "Walk-up shaved ice and frozen daiquiris to-go. Take it to the beach, take it back to the rental, or take it ten feet to the patio. No wait, no fuss.",
    highlights: [
      "Shaved ice — every flavor",
      "Frozen daiquiris to-go",
      "Tropical cocktails",
      "Quick walk-up service",
    ],
  },
];

export const HOURS = {
  weekdays: "Mon–Thu · Sun · 10am–11pm",
  weekends: "Fri–Sat · 10am–midnight",
};

export const CONTACT = {
  phone: "(361) 290-7143",
  phoneTel: "+13612907143",
  address: "314 E Avenue G, Port Aransas, TX 78373",
  addressShort: "314 E Avenue G",
};
