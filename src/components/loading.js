import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
const Loading = () => {
    return (React.createElement("div", { className: "space-y-6" },
        React.createElement("div", { className: "grid gap-6" },
            React.createElement(Skeleton, { className: "h-[300px] w-full rounded-lg" }),
            React.createElement(Skeleton, { className: "h-[300px] w-full rounded-lg" }),
            React.createElement("div", { className: "grid gap-6 md:grid-cols-2" },
                React.createElement(Skeleton, { className: "h-[300px] w-full rounded-lg" }),
                React.createElement(Skeleton, { className: "h-[300px] w-full rounded-lg" })))));
};
export default Loading;
