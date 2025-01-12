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
  
  return (
    <QueryClientProvider  client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
