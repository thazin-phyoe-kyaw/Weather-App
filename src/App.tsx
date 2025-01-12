import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultPageLayout } from "./components/ui/layout.js";
import { ThemeProvider } from "./context/theme-provider.js";
import WeatherPage from "./pages/weather-page.js";
import CityPage from "./pages/city-page.js";

const App = () => {
  return (
    
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <DefaultPageLayout>
          <Routes>
            <Route path="/" element={<WeatherPage/>}></Route>
            <Route path="/city/:name" element={<CityPage/>}></Route>
          </Routes>
        </DefaultPageLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
