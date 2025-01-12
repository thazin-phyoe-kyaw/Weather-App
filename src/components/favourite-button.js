import React from 'react';
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFavorites } from '@/hooks/useFavourites';
const FavouriteButton = ({ data }) => {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);
    const handleToggleFavorite = () => {
        if (isCurrentlyFavorite) {
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from Favorites`);
        }
        else {
            addFavorite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country,
            });
            toast.success(`Added ${data.name} to Favorites`);
        }
    };
    return (React.createElement(Button, { variant: isCurrentlyFavorite ? "default" : "outline", size: "icon", onClick: handleToggleFavorite, className: isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : "" },
        React.createElement(Star, { className: `h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}` })));
};
export default FavouriteButton;
