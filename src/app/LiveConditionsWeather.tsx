"use client";

import { useEffect, useState } from "react";
import LiveConditionsTile from "./LiveConditionsTile";

interface WeatherData {
  tempF: number | null;
  condition: string;
  windMph: number | null;
}

/**
 * Client island for live weather. Fetches /api/weather on mount, renders
 * a placeholder while in-flight so the layout doesn't shift, fails
 * quietly if the request errors.
 */
export default function LiveConditionsWeather() {
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

  const value = data?.tempF != null ? `${data.tempF}°` : "—";
  const sub =
    data?.tempF != null
      ? `${data.condition}${data.windMph ? ` · ${data.windMph} mph wind` : ""}`
      : "Reading the breeze…";

  return (
    <LiveConditionsTile
      iconSrc="/images/brons-at-the-beach.svg"
      label="At the beach"
      value={value}
      sub={sub}
      bgClass="bg-bron-pink"
    />
  );
}
