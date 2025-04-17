import { useState } from "react";
import { useSearchLocations } from "./hooks/useWeather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "./hooks/useSearchHistory";
import { useFavourites } from "./hooks/useFavourites";

// Components
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

// Icons
import Search from "./svgs/search";
import Loading from "./svgs/loading";
import Delete from "./svgs/delete";
import Clock from "./svgs/clock";
import Heart from "./svgs/heart";

const SearchLocation = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: locations, isLoading } = useSearchLocations(query);
  const { history, addHistory, removeHistory } = useSearchHistory();

  const handleSelector = (location: string) => {
    const [lat, lon, name, country] = location.split("|");

    // Search history
    addHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    navigate(`/location/${name}?lat=${lat}&lon=${lon}`);
  };

  const { favourites } = useFavourites();

  return (
    <>
      <Button
        variant={"outline"}
        className="relative w-full justify-start text-md text-muted-foreground sm:pr-12 md:w-40 lg:w-64 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 size-6" />
        <p>Search locations..</p>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search for locations"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length < 3 && !isLoading && (
            <CommandEmpty>No results found</CommandEmpty>
          )}

          {favourites.length > 0 && (
              <CommandGroup heading="Favourites">
                {favourites.map((location) => (
                  <CommandItem
                    key={location.id}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelector}
                  >
                    <Heart className="mr-2 size-5 text-red-400" />
                    <span>{location.name}</span>
                    {location.state && `, ${location.state}`}
                    <span className="text-muted-foreground ml-auto">
                      {location.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
          )}

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 py-2">
                  <p className="text-md text-muted-foreground">Recent Locations</p>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => removeHistory.mutate()}
                  >
                    <Delete className="size-5" />
                  </Button>
                </div>

                {history.map((location) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelector}
                  >
                    <Clock className="mr-2 size-5" />
                    <span>{location.name}</span>
                    {location.state && `, ${location.state}`}
                    <span className="text-muted-foreground ml-auto">
                      {location.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loading className="size-5 animate-spin" />
                </div>
              )}
              {locations.map((location) => (
                <CommandItem
                  key={`${location.lat}-${location.lon}`}
                  value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                  onSelect={handleSelector}
                >
                  <Search className="mr-2 size-5" />
                  <span>{location.name}</span>
                  {location.state && `, ${location.state}`}
                  <span className="text-muted-foreground ml-auto">
                    {location.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchLocation;
