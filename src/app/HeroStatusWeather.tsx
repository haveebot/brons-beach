"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  tempF: number | null;
  condition: string;
  windMph: number | null;
}

/**
 * Inline weather span for the status strip. Hydrates client-side from
 * /api/weather; renders "—" while loading; fails quietly.
 */
export default function HeroStatusWeather() {
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/weather")
      .then((r) => r.json() as Promise<WeatherData>)
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {
        if (!cancelled) setData({ tempF: null, condition: "—", windMph: null });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const label =
    data?.tempF != null
      ? `${data.tempF}°${data.condition && data.condition !== "—" ? ` · ${data.condition}` : ""}`
      : "—";

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="opacity-90">🌡</span>
      <span>At the beach {label}</span>
    </span>
  );
}
