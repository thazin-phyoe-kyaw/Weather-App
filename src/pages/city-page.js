import Loading from '@/components/loading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForecastQuery, useWeatherQuery } from '@/hooks/use-weather';
import { AlertTriangle } from 'lucide-react';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import CurrentWeather from './current-weather';
import TemperatureHour from './temperature-per-hour';
import WeatherDetail from './weather-detail';
import WeatherForecast from '@/components/weather-forecast';
import FavouriteButton from '@/components/favourite-button';
const CityPage = () => {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lon = parseFloat(searchParams.get("lon") || "0");
    const coordinates = { lat, lon };
    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    if (weatherQuery.error || forecastQuery.error) {
        return (React.createElement(Alert, { variant: "destructive" },
            React.createElement(AlertTriangle, { className: "h-4 w-4" }),
            React.createElement(AlertDescription, null, "Failed to load weather data. Please try again.")));
    }
    if (!weatherQuery.data || !forecastQuery.data || !params.name) {
        return React.createElement(Loading, null);
    }
    return (React.createElement("div", { className: "space-y-6" },
        React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("h1", { className: "text-3xl font-bold tracking-tight" },
                params.name,
                ", ",
                weatherQuery.data.sys.country),
            React.createElement("div", { className: "flex gap-2" },
                React.createElement(FavouriteButton, { data: { ...weatherQuery.data, name: params.name } }))),
        React.createElement("div", { className: "grid gap-6" },
            React.createElement(CurrentWeather, { data: weatherQuery.data }),
            React.createElement(TemperatureHour, { data: forecastQuery.data }),
            React.createElement("div", { className: "grid gap-6 md:grid-cols-2 items-start" },
                React.createElement(WeatherDetail, { data: weatherQuery.data }),
                React.createElement(WeatherForecast, { data: forecastQuery.data })))));
};
export default CityPage;
