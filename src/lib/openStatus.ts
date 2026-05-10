import { HOURS_BY_DAY } from "@/data/venue";

/**
 * Day-of-week + time-aware open/close status for the yard.
 *
 * Returns "open until X" when currently open, "closed — opens X" when
 * currently closed. All times are evaluated against America/Chicago
 * regardless of where the request is served from.
 */

export interface OpenStatus {
  isOpen: boolean;
  /** Friendly label suitable for the hero tile. */
  label: string;
  /** Period of day for the time-of-day-adaptive UI. */
  partOfDay: "dawn" | "day" | "dusk" | "night";
}

interface ChicagoNow {
  dow: number; // 0-6 (Sun-Sat)
  hour: number; // 0-23
  minute: number; // 0-59
  decimalHour: number; // hour + minute/60
}

function chicagoNow(now: Date = new Date()): ChicagoNow {
  // Pull individual fields from the Chicago zone via Intl
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value || "";
  const weekdayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  const dow = weekdayMap[get("weekday")] ?? 0;
  // Intl with hour12:false returns "24" at midnight on some locales — coerce
  let hour = parseInt(get("hour"), 10);
  if (hour === 24) hour = 0;
  const minute = parseInt(get("minute"), 10);
  return { dow, hour, minute, decimalHour: hour + minute / 60 };
}

export function openStatus(now: Date = new Date()): OpenStatus {
  const c = chicagoNow(now);
  const [openH, closeH] = HOURS_BY_DAY[c.dow] ?? [10, 23];

  // Currently within today's window?
  const isOpen = c.decimalHour >= openH && c.decimalHour < closeH;

  // Build a friendly close-time label (5pm, 11pm, midnight, 1am)
  const closeHourMod = closeH % 24;
  const closeIsMidnight = closeH === 24;
  const closeLabel = closeIsMidnight
    ? "midnight"
    : formatHour(closeHourMod);
  const openLabel = formatHour(openH);

  let label: string;
  if (isOpen) {
    label = `Open until ${closeLabel}`;
  } else if (c.decimalHour < openH) {
    // Before today's open
    label = `Closed — opens ${openLabel}`;
  } else {
    // After today's close — show tomorrow's open
    const tomorrowDow = (c.dow + 1) % 7;
    const [tOpenH] = HOURS_BY_DAY[tomorrowDow] ?? [10, 23];
    label = `Closed — opens ${formatHour(tOpenH)} tomorrow`;
  }

  // Bucket the hour into a part-of-day for the UI gradient palette.
  // Boundaries are sun-life-rough not exact astronomy; the gradient
  // shifts with hour-of-day rather than precise sunset.
  let partOfDay: OpenStatus["partOfDay"];
  if (c.decimalHour >= 5 && c.decimalHour < 9) partOfDay = "dawn";
  else if (c.decimalHour >= 9 && c.decimalHour < 16) partOfDay = "day";
  else if (c.decimalHour >= 16 && c.decimalHour < 20) partOfDay = "dusk";
  else partOfDay = "night";

  return { isOpen, label, partOfDay };
}

function formatHour(h24: number): string {
  // 0 → 12am, 12 → 12pm, 13 → 1pm, etc.
  if (h24 === 0) return "12am";
  if (h24 === 12) return "noon";
  if (h24 < 12) return `${h24}am`;
  return `${h24 - 12}pm`;
}
