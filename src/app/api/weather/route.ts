import { NextResponse } from "next/server";

/**
 * Open-Meteo current-weather proxy for Port Aransas. No API key required;
 * free tier; cached for 10 minutes server-side so we don't hammer their
 * service. Returns a small shape suitable for the hero tile.
 */

const PORT_A = { lat: 27.834, lon: -97.061 };

interface OpenMeteoResponse {
  current?: {
    time?: string;
    temperature_2m?: number;
    weather_code?: number;
    wind_speed_10m?: number;
  };
}

interface WeatherTile {
  tempF: number | null;
  condition: string;
  windMph: number | null;
}

export async function GET() {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${PORT_A.lat}&longitude=${PORT_A.lon}&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`;

  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) {
      return NextResponse.json<WeatherTile>(
        { tempF: null, condition: "—", windMph: null },
        { status: 200 },
      );
    }
    const data = (await res.json()) as OpenMeteoResponse;
    const c = data.current ?? {};
    const tile: WeatherTile = {
      tempF: typeof c.temperature_2m === "number" ? Math.round(c.temperature_2m) : null,
      condition: weatherLabel(c.weather_code),
      windMph: typeof c.wind_speed_10m === "number" ? Math.round(c.wind_speed_10m) : null,
    };
    return NextResponse.json(tile);
  } catch (err) {
    console.error("[Weather] fetch failed:", err);
    return NextResponse.json<WeatherTile>(
      { tempF: null, condition: "—", windMph: null },
      { status: 200 },
    );
  }
}

function weatherLabel(code?: number): string {
  if (code === undefined) return "—";
  if (code === 0) return "Clear";
  if (code === 1) return "Mostly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 55) return "Drizzle";
  if (code >= 61 && code <= 65) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95 && code <= 99) return "Stormy";
  return "—";
}
