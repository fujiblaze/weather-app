import { useParams, useSearchParams } from "react-router-dom";
import { useForecast, useWeather } from "../components/hooks/useWeather";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertTriangle } from "lucide-react";
import LoadingSkeleton from "../components/LoadingSkeleton";
import CurrentWeather from "../components/CurrentWeather";
import HourlyTemp from "../components/HourlyTemp";
import Details from "../components/Details";
import Forecast from "../components/Forecast";
import FavouriteButton from "../components/favouriteButton";
import Favourites from "../components/Favourites";

const LocationPage = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coords = { lat, lon }

  const queries = {
    weather: useWeather(coords),
    forecast: useForecast(coords),
  };

  if (queries.weather.error || queries.forecast.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="size-4" />
        <AlertTitle className="text-2xl">Error fetching weather</AlertTitle>
        <AlertDescription className="flex flex-col gap-4 text-xl">
          <p>Failed to fetch weather data for your location.</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!queries.weather.data || !queries.forecast.data || !params.cityName) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* favourites */}
      <Favourites />

      {/* main layout */}
      <section className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-muted-foreground">
          {params.cityName}, {queries.weather.data.sys.country}
        </h1>

        <div>
          <FavouriteButton data={{ ...queries.weather.data, name: params.cityName }} />
        </div>
      </section>

      {/* current and hourly */}
      <section className="grid gap-6">
        <div className="flex flex-col gap-4">
          {/* current weather */}
          <CurrentWeather
            data={queries.weather.data}
          />
          {/* hourly temp */}
          <HourlyTemp data={queries.forecast.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* details */}
          <Details data={queries.weather.data} />
          {/* forecast */}
          <Forecast data={queries.forecast.data} />
        </div>
      </section>
    </div>
  );
};

export default LocationPage;
