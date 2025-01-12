import React from 'react';
import Header from "./header";
export function DefaultPageLayout({ children }) {
    return (React.createElement("div", { className: " bg-gradient-to-br from-background to-muted w-screen" },
        React.createElement(Header, null),
        React.createElement("main", { className: "min-h-screen container mx-auto px-4 py-8" }, children)));
}
