import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultPageLayout } from "./components/ui/layout.js";
import { ThemeProvider } from "./context/theme-provider.js";
import WeatherPage from "./pages/weather-page.js";
import CityPage from "./pages/city-page.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000,
                gcTime: 10 * 60 * 1000,
                retry: false,
                refetchOnWindowFocus: false,
            },
        },
    });
    return (React.createElement(QueryClientProvider, { client: queryClient },
        React.createElement(BrowserRouter, null,
            React.createElement(ThemeProvider, { defaultTheme: "dark" },
                React.createElement(DefaultPageLayout, null,
                    React.createElement(Routes, null,
                        React.createElement(Route, { path: "/", element: React.createElement(WeatherPage, null) }),
                        React.createElement(Route, { path: "/city/:name", element: React.createElement(CityPage, null) })))))));
};
export default App;
