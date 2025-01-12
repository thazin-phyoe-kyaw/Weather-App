import { useTheme } from "@/context/theme-provider";
import React from "react";
import { Link } from "react-router-dom";
import ToggleTheme from "../theme-toggle";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full  border-b-[1px]  border-b-gray-500 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>Weather Forecast</Link>
        <div className="flex gap-4">
            {/* <CitySearch /> */}
            <ToggleTheme/>

        </div>
      </div>
    </header>
  );
};

export default Header;
