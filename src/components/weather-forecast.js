import React from 'react';
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
const WeatherForecast = ({ data }) => {
    const dailyForecasts = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
        if (!acc[date]) {
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt,
            };
        }
        else {
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }
        return acc;
    }, {});
    // Get next 5 days
    const nextDays = Object.values(dailyForecasts).slice(1, 6);
    // Format temperature
    const formatTemp = (temp) => `${Math.round(temp)}°`;
    return (React.createElement(Card, null,
        React.createElement(CardHeader, null,
            React.createElement(CardTitle, null, "5-Day Forecast")),
        React.createElement(CardContent, null,
            React.createElement("div", { className: "grid gap-4" }, nextDays.map((day) => (React.createElement("div", { key: day.date, className: "grid grid-cols-3 items-center gap-4 rounded-lg border p-4" },
                React.createElement("div", null,
                    React.createElement("p", { className: "font-medium" }, format(new Date(day.date * 1000), "EEE, MMM d")),
                    React.createElement("p", { className: "text-sm text-muted-foreground capitalize" }, day.weather.description)),
                React.createElement("div", { className: "flex justify-center gap-4" },
                    React.createElement("span", { className: "flex items-center text-blue-500" },
                        React.createElement(ArrowDown, { className: "mr-1 h-4 w-4" }),
                        formatTemp(day.temp_min)),
                    React.createElement("span", { className: "flex items-center text-red-500" },
                        React.createElement(ArrowUp, { className: "mr-1 h-4 w-4" }),
                        formatTemp(day.temp_max))),
                React.createElement("div", { className: "flex justify-end gap-4" },
                    React.createElement("span", { className: "flex items-center gap-1" },
                        React.createElement(Droplets, { className: "h-4 w-4 text-blue-500" }),
                        React.createElement("span", { className: "text-sm" },
                            day.humidity,
                            "%")),
                    React.createElement("span", { className: "flex items-center gap-1" },
                        React.createElement(Wind, { className: "h-4 w-4 text-blue-500" }),
                        React.createElement("span", { className: "text-sm" },
                            day.wind,
                            "m/s"))))))))));
};
export default WeatherForecast;
