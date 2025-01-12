import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Search, Loader2, Clock, Star, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useSearchHistory } from '@/hooks/useSearch';
import { useFavorites } from '@/hooks/useFavourites';
const SearchCity = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { data: locations, isLoading } = useLocationSearch(query);
    const { favorites } = useFavorites();
    const { history, clearHistory, addToHistory } = useSearchHistory();
    const handleSelect = (cityData) => {
        const [lat, lon, name, country] = cityData.split("|");
        // Add to search history
        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country,
        });
        setOpen(false);
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { variant: "outline", className: "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64", onClick: () => setOpen(true) },
            React.createElement(Search, { className: "mr-2 h-4 w-4" }),
            "Search cities..."),
        React.createElement(CommandDialog, { open: open, onOpenChange: setOpen },
            React.createElement(Command, null,
                React.createElement(CommandInput, { placeholder: "Search cities...", value: query, onValueChange: setQuery }),
                React.createElement(CommandList, null,
                    query.length > 2 && !isLoading && (React.createElement(CommandEmpty, null, "No cities found.")),
                    favorites.length > 0 && (React.createElement(CommandGroup, { heading: "Favorites" }, favorites.map((city) => (React.createElement(CommandItem, { key: city.id, value: `${city.lat}|${city.lon}|${city.name}|${city.country}`, onSelect: handleSelect },
                        React.createElement(Star, { className: "mr-2 h-4 w-4 text-yellow-500" }),
                        React.createElement("span", null, city.name),
                        city.state && (React.createElement("span", { className: "text-sm text-muted-foreground" },
                            ", ",
                            city.state)),
                        React.createElement("span", { className: "text-sm text-muted-foreground" },
                            ", ",
                            city.country)))))),
                    history.length > 0 && (React.createElement(React.Fragment, null,
                        React.createElement(CommandSeparator, null),
                        React.createElement(CommandGroup, null,
                            React.createElement("div", { className: "flex items-center justify-between px-2 my-2" },
                                React.createElement("p", { className: "text-xs text-muted-foreground" }, "Recent Searches"),
                                React.createElement(Button, { variant: "ghost", size: "sm", onClick: () => clearHistory.mutate() },
                                    React.createElement(XCircle, { className: "h-4 w-4" }),
                                    "Clear")),
                            history.map((item) => (React.createElement(CommandItem, { key: item.id, value: `${item.lat}|${item.lon}|${item.name}|${item.country}`, onSelect: handleSelect },
                                React.createElement(Clock, { className: "mr-2 h-4 w-4 text-muted-foreground" }),
                                React.createElement("span", null, item.name),
                                item.state && (React.createElement("span", { className: "text-sm text-muted-foreground" },
                                    ", ",
                                    item.state)),
                                React.createElement("span", { className: "text-sm text-muted-foreground" },
                                    ", ",
                                    item.country),
                                React.createElement("span", { className: "ml-auto text-xs text-muted-foreground" }, format(item.searchedAt, "MMM d, h:mm a")))))))),
                    React.createElement(CommandSeparator, null),
                    locations && locations.length > 0 && (React.createElement(CommandGroup, { heading: "Suggestions" },
                        isLoading && (React.createElement("div", { className: "flex items-center justify-center p-4" },
                            React.createElement(Loader2, { className: "h-4 w-4 animate-spin" }))),
                        locations?.map((location) => (React.createElement(CommandItem, { key: `${location.lat}-${location.lon}`, value: `${location.lat}|${location.lon}|${location.name}|${location.country}`, onSelect: handleSelect },
                            React.createElement(Search, { className: "mr-2 h-4 w-4" }),
                            React.createElement("span", null, location.name),
                            location.state && (React.createElement("span", { className: "text-sm text-muted-foreground" },
                                ", ",
                                location.state)),
                            React.createElement("span", { className: "text-sm text-muted-foreground" },
                                ", ",
                                location.country)))))))))));
};
export default SearchCity;
