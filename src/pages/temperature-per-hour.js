import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const TemperatureHour = ({ data }) => {
    const chartData = data.list
        .slice(0, 8) // Get next 24 hours (3-hour intervals)
        .map((item) => ({
        time: format(new Date(item.dt * 1000), "ha"),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
    }));
    return (React.createElement(Card, { className: "flex-1" },
        React.createElement(CardHeader, null,
            React.createElement(CardTitle, null, "Today's Temperature")),
        React.createElement(CardContent, null,
            React.createElement("div", { className: "h-[200px] w-full" },
                React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
                    React.createElement(LineChart, { data: chartData },
                        React.createElement(XAxis, { dataKey: "time", stroke: "#888888", fontSize: 12, tickLine: false, axisLine: false }),
                        React.createElement(YAxis, { stroke: "#888888", fontSize: 12, tickLine: false, axisLine: false, tickFormatter: (value) => `${value}°` }),
                        React.createElement(Tooltip, { content: ({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (React.createElement("div", { className: "rounded-lg border bg-background p-2 shadow-sm" },
                                        React.createElement("div", { className: "grid grid-cols-2 gap-2" },
                                            React.createElement("div", { className: "flex flex-col" },
                                                React.createElement("span", { className: "text-[0.70rem] uppercase text-muted-foreground" }, "Temperature"),
                                                React.createElement("span", { className: "font-bold" },
                                                    payload[0].value,
                                                    "\u00B0")),
                                            React.createElement("div", { className: "flex flex-col" },
                                                React.createElement("span", { className: "text-[0.70rem] uppercase text-muted-foreground" }, "Feels Like"),
                                                React.createElement("span", { className: "font-bold" },
                                                    payload[1].value,
                                                    "\u00B0")))));
                                }
                                return null;
                            } }),
                        React.createElement(Line, { type: "monotone", dataKey: "temp", stroke: "#2563eb", strokeWidth: 2, dot: false }),
                        React.createElement(Line, { type: "monotone", dataKey: "feels_like", stroke: "#64748b", strokeWidth: 2, dot: false, strokeDasharray: "5 5" })))))));
};
export default TemperatureHour;
