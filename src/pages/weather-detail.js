import React from 'react';
import { Sunrise, Sunset, Compass, Gauge } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const WeatherDetail = ({ data }) => {
    const { wind, main, sys } = data;
    // Format time using date-fns
    const formatTime = (timestamp) => {
        return format(new Date(timestamp * 1000), "h:mm a");
    };
    // Convert wind degree to direction
    const getWindDirection = (degree) => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
        return directions[index];
    };
    const details = [
        {
            title: "Sunrise",
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500",
        },
        {
            title: "Sunset",
            value: formatTime(sys.sunset),
            icon: Sunset,
            color: "text-blue-500",
        },
        {
            title: "Wind Direction",
            value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
            icon: Compass,
            color: "text-green-500",
        },
        {
            title: "Pressure",
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: "text-purple-500",
        },
    ];
    return (React.createElement(Card, null,
        React.createElement(CardHeader, null,
            React.createElement(CardTitle, null, "Weather Details")),
        React.createElement(CardContent, null,
            React.createElement("div", { className: "grid gap-6 sm:grid-cols-2" }, details.map((detail) => (React.createElement("div", { key: detail.title, className: "flex items-center gap-3 rounded-lg border p-4" },
                React.createElement(detail.icon, { className: `h-5 w-5 ${detail.color}` }),
                React.createElement("div", null,
                    React.createElement("p", { className: "text-sm font-medium leading-none" }, detail.title),
                    React.createElement("p", { className: "text-sm text-muted-foreground" }, detail.value)))))))));
};
export default WeatherDetail;
