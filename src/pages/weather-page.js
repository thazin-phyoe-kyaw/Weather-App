import Loading from '@/components/loading';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useGeolocation } from '@/hooks/use-geolocation';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import { AlertTriangle, MapPin, RefreshCcw, RefreshCw } from 'lucide-react';
import React from 'react';
import CurrentWeather from './current-weather';
import TemperatureHour from './temperature-per-hour';
import WeatherDetail from './weather-detail';
import WeatherForecast from '@/components/weather-forecast';
import FavouriteCities from '@/components/favourite-cities';
const WeatherPage = () => {
    const { coordinates, error: locationError, isLoading: locationLoading, getLocation, } = useGeolocation();
    console.log(coordinates);
    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);
    console.log(weatherQuery.data);
    console.log(forecastQuery.data);
    console.log(locationQuery.data);
    const handleRefresh = () => {
        getLocation();
        if (coordinates) {
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        }
    };
    if (locationLoading) {
        return React.createElement(Loading, null);
    }
    if (locationError) {
        return (React.createElement(Alert, { variant: "destructive" },
            React.createElement(AlertTriangle, { className: "h-4 w-4" }),
            React.createElement(AlertTitle, null, "Location Error"),
            React.createElement(AlertDescription, { className: "flex flex-col gap-4" },
                React.createElement("p", null, locationError),
                React.createElement(Button, { variant: "outline", onClick: getLocation, className: "w-fit" },
                    React.createElement(MapPin, { className: "mr-2 h-4 w-4" }),
                    "Enable Location"))));
    }
    if (!coordinates) {
        return (React.createElement(Alert, null,
            React.createElement(MapPin, { className: "h-4 w-4" }),
            React.createElement(AlertTitle, null, "Location Required"),
            React.createElement(AlertDescription, { className: "flex flex-col gap-4" },
                React.createElement("p", null, "Please enable location access to see your local weather."),
                React.createElement(Button, { variant: "outline", onClick: getLocation, className: "w-fit" },
                    React.createElement(MapPin, { className: "mr-2 h-4 w-4" }),
                    "Enable Location"))));
    }
    const locationName = locationQuery.data?.[0];
    if (weatherQuery.error || forecastQuery.error) {
        return (React.createElement(Alert, { variant: "destructive" },
            React.createElement(AlertTriangle, { className: "h-4 w-4" }),
            React.createElement(AlertTitle, null, "Error"),
            React.createElement(AlertDescription, { className: "flex flex-col gap-4" },
                React.createElement("p", null, "Failed to fetch weather data. Please try again."),
                React.createElement(Button, { variant: "outline", onClick: handleRefresh, className: "w-fit" },
                    React.createElement(RefreshCcw, { className: "mr-2 h-4 w-4" }),
                    "Retry"))));
    }
    if (!weatherQuery.data || !forecastQuery.data) {
        return React.createElement(Loading, null);
    }
    return (React.createElement("div", { className: "space-y-4" },
        React.createElement(FavouriteCities, null),
        React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("h1", { className: "text-xl font-bold tracking-tight" }, "My Location"),
            React.createElement(Button, { variant: "outline", size: "icon", onClick: handleRefresh, disabled: weatherQuery.isFetching || forecastQuery.isFetching },
                React.createElement(RefreshCw, { className: `h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}` }))),
        React.createElement("div", { className: "grid gap-6" },
            React.createElement("div", { className: "flex flex-col lg:flex-row gap-4" },
                React.createElement(CurrentWeather, { data: weatherQuery.data, locationName: locationName }),
                React.createElement(TemperatureHour, { data: forecastQuery.data })),
            React.createElement("div", { className: "grid gap-6 md:grid-cols-2 items-start" },
                React.createElement(WeatherDetail, { data: weatherQuery.data }),
                React.createElement(WeatherForecast, { data: forecastQuery.data })))));
};
export default WeatherPage;
