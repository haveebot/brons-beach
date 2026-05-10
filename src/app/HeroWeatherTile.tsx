"use client";

import { useEffect, useState } from "react";
import HeroLiveTile from "./HeroLiveTile";

interface WeatherData {
  tempF: number | null;
  condition: string;
  windMph: number | null;
}

/**
 * Pulls live current weather from /api/weather (Open-Meteo proxy) on mount.
 * Renders a placeholder while in-flight so the hero layout doesn't shift.
 * Fails quietly if the request errors.
 */
export default function HeroWeatherTile() {
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

  return (
    <HeroLiveTile
      icon="🌡"
      label="At the beach"
      value={data?.tempF != null ? `${data.tempF}°` : "—"}
      sub={data?.condition ?? "Reading the breeze…"}
    />
  );
}
