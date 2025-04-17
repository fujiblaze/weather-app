import { useNavigate } from "react-router-dom";
import { useFavourites } from "./hooks/useFavourites";
import { ScrollArea } from "./ui/scroll-area";
import { useWeather } from "./hooks/useWeather";
import { Button } from "./ui/button";
import Delete from "./svgs/delete";
import { toast } from "sonner";
import Loading from "./svgs/loading";

interface FavouriteCityTooltip {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

const Favourites = () => {
  const { favourites, removeFavourites } = useFavourites();

  if (!favourites.length) return null;

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Favourites</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {favourites.map((city) => {
            return (
              <FavouriteCityTooltip
                key={city.id}
                {...city}
                onRemove={() => removeFavourites.mutate(city.id)}
              />
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
};

function FavouriteCityTooltip({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavouriteCityTooltip) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeather({ lat, lon });

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/location/${name}?lat=${lat}&lon=${lon}`)}
      className="relative flex min-w-[250px] cursor-pointer items-center gap-4 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
    >
      <Button
        className="bg-card absolute right-1 top-1 size-6 rounded-full p-0 hover:text-destructive group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`${name} has been removed from favourites.`);
        }}
      >
        <Delete className="size-5 text-red-300" />
      </Button>

      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loading className="size-5 animate-spin" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-2">
            <img
              className="size-8"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Icon"
            />
            <div>
              <p className="text-xl font-medium">{name}</p>
              <p className="text-md text-muted-foreground">
                {weather.sys.country}
              </p>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-bold">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="text-md capitalize text-muted-foreground">
              {weather.weather[0].description}
            </p>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Favourites;
