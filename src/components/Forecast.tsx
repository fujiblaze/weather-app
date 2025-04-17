import { format } from "date-fns";
import type { Forecast } from "../api/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import ArrowUp from "./svgs/arrowUp";
import ArrowDown from "./svgs/arrowDown";
import Droplets from "./svgs/droplets";
import Wind from "./svgs/wind";

interface ForecastData {
  data: Forecast;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const Forecast = ({ data }: ForecastData) => {
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  const upcomingDays = Object.values(dailyForecasts).slice(0, 5);

  return (
    <Card>
      <CardHeader className="text-2xl font-bold">5-day Forecast</CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {upcomingDays.map((daily) => {
            return (
              <div
                key={daily.date}
                className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
              >
                <div>
                  <p className="text-[15px] font-medium">
                    {format(new Date(daily.date * 1000), "EEEE, MMMM d")}
                  </p>
                  <p className="text-xl text-muted-foreground capitalize">
                    {daily.weather.description}
                  </p>
                </div>

                <div className="flex justify-center gap-5">
                  <span className="flex items-center text-blue-300">
                    <ArrowUp className="mr-1 size-7" />
                    <span className="text-xl font-medium">
                      {daily.temp_max.toFixed(1)}°C
                    </span>
                  </span>
                  <span className="flex items-center text-red-300">
                    <ArrowDown className="mr-1 size-7" />
                    <span className="text-xl font-medium">
                      {daily.temp_min.toFixed(1)}°C
                    </span>
                  </span>
                </div>

                <div className="flex justify-end gap-5">
                  <span className="flex items-center gap-2">
                    <Droplets className="size-7 text-blue-300" />
                    <span className="text-sm font-medium">
                      {daily.humidity}%
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Wind className="size-7 text-yellow-200" />
                    <span className="text-sm font-medium">
                      {daily.wind.toFixed(1)} m/s
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default Forecast;
