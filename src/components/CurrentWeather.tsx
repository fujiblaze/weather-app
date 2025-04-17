import type { Weather, GeoLocation } from "../api/types";
import { Card, CardContent } from "./ui/card";
import ArrowUp from "./svgs/arrowUp";
import ArrowDown from "./svgs/arrowDown";
import Droplets from "./svgs/droplets";
import Wind from "./svgs/wind";
import Gust from "./svgs/gust";
import { format } from "date-fns";

interface CurrentWeatherProps {
  data: Weather;
  locationName?: GeoLocation;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed, gust },
  } = data;

  const formatTemp = (temp: number, round: boolean = true) =>
    `${round ? Math.round(temp) : temp.toFixed(1)}°C`;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-9">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              {/* location name info */}
              <div className="flex items-end gap-1">
                <h2 className="text-4xl font-bold tracking-tighter">
                  {locationName?.name}
                </h2>
                {locationName?.state && (
                  <span className="text-muted-foreground text-2xl">
                    , {locationName?.state}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-5">
                <p className="text-muted-foreground text-2xl">
                  {locationName?.country}
                </p>

                {/* last updated */}
                <p className="text-muted-foreground text-[15px]">
                  (Last updated: {format(new Date(data.dt * 1000), "h:mm a")})
                </p>
              </div>
            </div>

            {/* current temp */}
            <div className="flex items-center gap-2">
              <p className="text-8xl font-bold tracking-tighter">
                {formatTemp(temp)}
              </p>

              {/* feels like and high and low */}
              <div className="ml-6 space-y-1">
                <p className="text-2xl font-medium text-muted-foreground">
                  Feels like {formatTemp(feels_like)}
                </p>
                <div className="flex gap-2 text-xl font-medium">
                  <span className="flex items-center gap-1 text-red-300">
                    <ArrowUp className="size-7" /> {formatTemp(temp_max, false)}
                  </span>
                  <span className="flex items-center gap-1 text-blue-300">
                    <ArrowDown className="size-7" />{" "}
                    {formatTemp(temp_min, false)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* humidity */}
              <div className="flex items-center gap-4">
                <Droplets className="size-7 text-blue-300" />
                <div className="flex flex-col space-y-0.5">
                  <p className="text-xl font-medium">Humidity</p>
                  <p className="text-xl text-muted-foreground">{humidity}%</p>
                </div>
              </div>

              {/* wind */}
              <div className="flex items-center gap-4">
                <Wind className="size-7 text-yellow-200" />
                <div className="flex flex-col space-y-0.5">
                  <p className="text-xl font-medium">Wind</p>
                  <p className="text-xl text-muted-foreground">{speed} m/s</p>
                </div>
              </div>

              {/* gust */}
              <div className="flex items-center gap-4">
                <Gust className="size-7 text-pink-300" />
                <div className="flex flex-col space-y-0.5">
                  <p className="text-xl font-medium">Gust</p>
                  <p className="text-xl text-muted-foreground">{gust} m/s</p>
                </div>
              </div>
            </div>
          </div>

          {/* weather icon */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
              <img
                src={`http://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt="Icon"
                className="size-full object-contain"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-xl font-medium capitalize">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
