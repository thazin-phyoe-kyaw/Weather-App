import React from 'react';
import { useTheme } from '../context/theme-provider';
import { Moon, Sun } from 'lucide-react';
const ToggleTheme = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";
    return (React.createElement("div", { onClick: () => setTheme(isDark ? "light" : "dark"), className: `flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}` },
        isDark ? (React.createElement(Sun, { className: "h-6 w-6 text-yellow-500 rotate-0 transition-all" })) : (React.createElement(Moon, { className: "h-6 w-6 text-blue-500 rotate-0 transition-all" })),
        React.createElement("span", { className: "sr-only" }, "Toggle theme")));
};
export default ToggleTheme;
