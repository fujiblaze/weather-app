import type { Weather } from "../api/types";
import { useFavourites } from "./hooks/useFavourites";
import { Button } from "./ui/button";
import Heart from "./svgs/heart";
import { toast } from "sonner";

interface FavouriteButtonProps {
  data: Weather;
}

const favouriteButton = ({ data }: FavouriteButtonProps) => {
  const { addFavourite, isFavourite, removeFavourites } =
    useFavourites();
  const isCurrentlyFavourite = isFavourite(data.coord.lat, data.coord.lon);

  const handleFavourite = () => {
    if (isCurrentlyFavourite) {
      removeFavourites.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`${data.name} has been removed from favourites.`);
    } else {
        addFavourite.mutate({
            name: data.name,
            lat: data.coord.lat,
            lon: data.coord.lon,
            country: data.sys.country
        })
        toast.success(`${data.name} has been added to favourites.`)
    }
  };

  return (
    <Button
      variant={isCurrentlyFavourite ? "default" : "outline"}
      size={"icon"}
      onClick={handleFavourite}
      className={`cursor-pointer size-12 ${
        isCurrentlyFavourite ? "text-red-400 bg-card" : "hover:text-red-300"
      }`}
    >
      <Heart className="size-6" />
    </Button>
  );
};

export default favouriteButton;
