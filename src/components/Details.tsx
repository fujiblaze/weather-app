import type { Weather } from "../api/types";
import { format } from "date-fns";
import Sunrise from "./svgs/sunrise";
import Sunset from "./svgs/sunset";
import Compass from "./svgs/compass";
import Pressure from "./svgs/pressure";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherDetails {
  data: Weather;
}

const Details = ({ data }: WeatherDetails) => {
  const { wind, main, sys } = data;

  const formatTime = (time: number) => {
    return format(new Date(time * 1000), "h:mm a");
  };

  const getWindDirection = (degrees: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45);
    return directions[index % 8];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-300",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-purple-300",
    },
    {
      title: "Wind",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-blue-300",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Pressure,
      color: "text-green-300",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => {
            return (
              <div
                key={detail.title}
                className="flex items-center gap-6 rounded-lg border p-4"
              >
                <detail.icon className={`size-7 ${detail.color}`} />
                <div>
                  <p className="text-xl font-medium leading-none">
                    {detail.title}
                  </p>
                  <p className="text-xl text-muted-foreground">
                    {detail.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default Details;
