import { useTheme } from "@/context/theme-provider";
import React from "react";
import { Link } from "react-router-dom";
import ToggleTheme from "../theme-toggle";
import SearchCity from "../search-city";
const Header = () => {
    const { theme, setTheme } = useTheme();
    return (React.createElement("header", { className: "sticky top-0 z-50 w-full shadow-sm shadow-gray-200  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2" },
        React.createElement("div", { className: "container mx-auto flex h-16 items-center justify-between px-4" },
            React.createElement(Link, { to: "/" }, "Weather Forecast"),
            React.createElement("div", { className: "flex gap-4" },
                React.createElement(SearchCity, null),
                React.createElement(ToggleTheme, null)))));
};
export default Header;
