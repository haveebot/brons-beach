/**
 * Sunset / sunrise calculator for Port Aransas, TX (no external deps,
 * no API call). NOAA solar position formula — accurate to within a
 * minute or two for our latitude.
 */

const PORT_A = { lat: 27.834, lon: -97.061 };

export interface SunTimes {
  sunrise: Date; // UTC Date instance
  sunset: Date;
}

export function sunTimesFor(date: Date = new Date()): SunTimes {
  const N = dayOfYear(date);
  const gamma = ((2 * Math.PI) / 365) * (N - 1);

  const eqtime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));

  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const latRad = (PORT_A.lat * Math.PI) / 180;
  const zenithRad = (90.833 * Math.PI) / 180; // 90° + atmospheric refraction

  const cosHa =
    Math.cos(zenithRad) / (Math.cos(latRad) * Math.cos(decl)) -
    Math.tan(latRad) * Math.tan(decl);

  // High-latitude sun-never-sets / sun-never-rises edge case shouldn't
  // happen for Port A but guard anyway.
  if (cosHa < -1 || cosHa > 1) {
    const noon = new Date(date);
    noon.setUTCHours(18, 0, 0, 0); // approx local noon
    return { sunrise: noon, sunset: noon };
  }

  const ha = Math.acos(cosHa);
  const haDeg = (ha * 180) / Math.PI;

  // NOAA: solar noon (UTC minutes from midnight) = 720 − 4·lon − eqtime;
  // sunrise = snoon − 4·ha; sunset = snoon + 4·ha.
  const snoon = 720 - 4 * PORT_A.lon - eqtime;
  const sunsetMin = snoon + 4 * haDeg;
  const sunriseMin = snoon - 4 * haDeg;

  const utcMidnight = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  );
  return {
    sunrise: new Date(utcMidnight + sunriseMin * 60_000),
    sunset: new Date(utcMidnight + sunsetMin * 60_000),
  };
}

/** Day of year (1-366) in UTC. */
function dayOfYear(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  return Math.floor((date.getTime() - start) / 86400000);
}

/** Format a Date as a Port Aransas-local time string ("8:42 PM"). */
export function formatPortATime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "2-digit",
  });
}
