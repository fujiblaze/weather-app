// Data hooks
import { useLocation } from "../components/hooks/useLocation";
import { useForecast, useGeoLocation, useWeather } from "../components/hooks/useWeather";

// Components
import { Button } from "../components/ui/button";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

// Icons
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import Reload from "../components/svgs/reload";

// Data
import CurrentWeather from "../components/CurrentWeather";
import HourlyTemp from "../components/HourlyTemp";
import Details from "../components/Details";
import Forecast from "../components/Forecast";
import Favourites from "../components/Favourites";

const Dashboard = () => {
  const {
    coordinates,
    error: LocationError,
    getLocation,
    isLoading: LocationLoading,
  } = useLocation();

  const queries = {
    weather: useWeather(coordinates ?? { lat: 0, lon: 0 }),
    forecast: useForecast(coordinates ?? { lat: 0, lon: 0 }),
    location: useGeoLocation(coordinates ?? { lat: 0, lon: 0 }),
  };

  const handleRefresh = () => {
    getLocation();
    if (!coordinates) return;

    queries.weather.refetch();
    queries.forecast.refetch();
    queries.location.refetch();
  };

  if (LocationLoading) {
    return <LoadingSkeleton />;
  }

  if (LocationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="size-4" />
        <AlertTitle className="text-2xl">Error fetching location</AlertTitle>
        <AlertDescription className="flex flex-col gap-4 text-xl">
          {LocationError}
          <Button
            onClick={getLocation}
            variant={"destructive"}
            className="w-fit cursor-pointer"
          >
            <MapPin className="mr-1 size-4" />
            <p className="text-xl">Enable location</p>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="size-4" />
        <AlertTitle className="text-2xl">Error fetching location</AlertTitle>
        <AlertDescription className="flex flex-col gap-4 text-xl">
          <p>Please enable location access to check your local weather</p>
          <Button
            onClick={getLocation}
            variant={"destructive"}
            className="w-fit cursor-pointer"
          >
            <MapPin className="mr-1 size-4" />
            <p className="text-xl">Enable location</p>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = queries.location.data?.[0];

  if (queries.weather.error || queries.forecast.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="size-4" />
        <AlertTitle className="text-2xl">Error fetching weather</AlertTitle>
        <AlertDescription className="flex flex-col gap-4 text-xl">
          <p>
            There was an error fetching the weather for{" "}
            {locationName?.name ?? "your location"}
          </p>
          <Button
            onClick={handleRefresh}
            variant={"destructive"}
            className="w-fit cursor-pointer"
          >
            <RefreshCw className="mr-1 size-4" />
            <p className="text-xl">Refresh</p>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!queries.weather.data || !queries.forecast.data) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* favourites */}
      <Favourites />

      {/* main layout */}
      <section className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-muted-foreground">Current Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={queries.weather.isFetching || queries.forecast.isFetching}
          className="cursor-pointer size-12"
        >
          <Reload
            className={`size-6 ${
              queries.weather.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </section>

      {/* current and hourly */}
      <section className="grid gap-6">
        <div className="flex flex-col gap-4">
          {/* current weather */}
          <CurrentWeather
            data={queries.weather.data}
            locationName={locationName}
          />
          {/* hourly temp */}
          <HourlyTemp data={queries.forecast.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* details */}
          <Details data={queries.weather.data} />
          {/* forecast */}
          <Forecast data={queries.forecast.data}/>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
