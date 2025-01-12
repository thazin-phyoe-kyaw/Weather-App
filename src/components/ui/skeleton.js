import { cn } from "@/lib/utils";
import React from 'react';
function Skeleton({ className, ...props }) {
    return (React.createElement("div", { className: cn("animate-pulse rounded-md bg-neutral-900/10 dark:bg-neutral-50/10", className), ...props }));
}
export { Skeleton };
