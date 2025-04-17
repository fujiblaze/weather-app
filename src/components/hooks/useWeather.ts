import type { Coordinates } from "../../api/types";
import { weatherAPI } from "../../api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search: (query: string) => ["search", query] as const,
} as const;

export function useWeather(coords: Coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coords ?? { lat: 0, lon: 0 }),
    queryFn: () => {
      if (!coords) {
        throw new Error("Coordinates are required");
      }
      return weatherAPI.getWeather(coords);
    },
    enabled: !!coords,
  });
}

export function useForecast(coords: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coords ?? { lat: 0, lon: 0 }),
    queryFn: () => {
      if (!coords) {
        throw new Error("Coordinates are required");
      }
      return weatherAPI.getForecast(coords);
    },
    enabled: !!coords,
  });
}

export function useGeoLocation(coords: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coords ?? { lat: 0, lon: 0 }),
    queryFn: () => {
      if (!coords) {
        throw new Error("Coordinates are required");
      }
      return weatherAPI.getGeoLocation(coords);
    },
    enabled: !!coords,
  });
}

export function useSearchLocations(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherAPI.searchLocations(query),
    enabled: query.length >= 3,
  });
}
