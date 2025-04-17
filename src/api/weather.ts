import { API_CONFIG } from "./config";
import type { Coordinates, Forecast, GeoLocation, Weather } from "./types";

class WeatherAPI {
  private createLink(path: string, params: Record<string, string>) {
    const search = new URLSearchParams({
      appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
      ...params,
    });

    return `${path}?${search.toString()}`;
  }

  private async fetchData(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `OpenWeather API Error code ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  }

  async getWeather({ lat, lon }: Coordinates): Promise<Weather> {
    const url = this.createLink(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.PARAMS.units,
    });

    return this.fetchData(url);
  }

  async getForecast({ lat, lon }: Coordinates): Promise<Forecast> {
    const url = this.createLink(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.PARAMS.units,
    });

    return this.fetchData(url);
  }

  async getGeoLocation({ lat, lon }: Coordinates): Promise<GeoLocation[]> {
    const url = this.createLink(`${API_CONFIG.GEO_URL}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: "1",
    });

    return this.fetchData(url);
  }

  async searchLocations(query: string): Promise<GeoLocation[]> {
    const url = this.createLink(`${API_CONFIG.GEO_URL}/direct`, {
      q: query,
      limit: "5",
    });

    return this.fetchData(url);
  }
}

export const weatherAPI = new WeatherAPI();
