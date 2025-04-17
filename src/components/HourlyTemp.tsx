import type { Forecast } from "../api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { format } from "date-fns";

interface HourlyTemp {
  data: Forecast;
}

const HourlyTemp = ({ data }: HourlyTemp) => {
  const chartData = data.list.slice(0, 12).map((hour) => ({
    time: format(hour.dt * 1000, "h:mm"),
    temp: Math.round(hour.main.temp),
    feels_like: Math.round(hour.main.feels_like),
  }));

  return (
    <div>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-2xl">Hourly Temperature</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[380px] w-full">
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <LineChart data={chartData}>
                <XAxis
                  dataKey="time"
                  stroke="#888888"
                  tickLine={false}
                  axisLine={false}
                  fontSize={15}
                />
                <YAxis
                  dataKey="temp"
                  stroke="#888888"
                  tickLine={false}
                  axisLine={false}
                  fontSize={15}
                  tickFormatter={(value) => `${value}°C`}
                />

                {/* tooltip */}
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-xl">
                          <div className="grid grid-cols-2 mx-4">
                            <div className="flex flex-col items-start">
                              <span className="text-[1.1rem] text-muted-foreground">
                                Temperature
                              </span>
                              <span className="text-2xl font-bold">
                                {payload[0].value}°C
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-[1.1rem] text-muted-foreground">
                                Feels Like
                              </span>
                              <span className="text-2xl font-bold">
                                {payload[1].value}°C
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#e6c38c"
                  strokeWidth={2}
                  dot={true}
                />

                <Line
                  type="monotone"
                  dataKey="feels_like"
                  stroke="#e0abbc"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="7 7"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HourlyTemp;
