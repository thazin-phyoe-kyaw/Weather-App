import React from 'react';
// src/components/weather/favorite-cities.tsx
import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "@/hooks/use-weather";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
useFavorites;
import { toast } from "sonner";
import { useFavorites } from '@/hooks/useFavourites';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
function FavoriteCityTablet({ id, name, lat, lon, onRemove, }) {
    const navigate = useNavigate();
    const { data: weather, isLoading } = useWeatherQuery({ lat, lon });
    const handleClick = () => {
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    };
    return (React.createElement("div", { onClick: handleClick, className: "relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md", role: "button", tabIndex: 0 },
        React.createElement(Button, { variant: "ghost", size: "icon", className: "absolute right-1 top-1 h-6 w-6 rounded-full p-0  hover:text-destructive-foreground group-hover:opacity-100", onClick: (e) => {
                e.stopPropagation();
                onRemove(id);
                toast.error(`Removed ${name} from Favorites`);
            } },
            React.createElement(X, { className: "h-4 w-4" })),
        isLoading ? (React.createElement("div", { className: "flex h-8 items-center justify-center" },
            React.createElement(Loader2, { className: "h-4 w-4 animate-spin" }))) : weather ? (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "flex items-center gap-2" },
                React.createElement("img", { src: `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`, alt: weather.weather[0].description, className: "h-8 w-8" }),
                React.createElement("div", null,
                    React.createElement("p", { className: "font-medium" }, name),
                    React.createElement("p", { className: "text-xs text-muted-foreground" }, weather.sys.country))),
            React.createElement("div", { className: "ml-auto text-right" },
                React.createElement("p", { className: "text-xl font-bold" },
                    Math.round(weather.main.temp),
                    "\u00B0"),
                React.createElement("p", { className: "text-xs capitalize text-muted-foreground" }, weather.weather[0].description)))) : null));
}
const FavouriteCities = () => {
    const { favorites, removeFavorite } = useFavorites();
    if (!favorites.length) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", { className: "text-xl font-bold tracking-tight" }, "Favorites"),
        React.createElement(ScrollArea, { className: "w-full pb-4" },
            React.createElement("div", { className: "flex gap-4" }, favorites.map((city) => (React.createElement(FavoriteCityTablet, { key: city.id, ...city, onRemove: () => removeFavorite.mutate(city.id) })))),
            React.createElement(ScrollBar, { orientation: "horizontal", className: "mt-2" }))));
};
export default FavouriteCities;
