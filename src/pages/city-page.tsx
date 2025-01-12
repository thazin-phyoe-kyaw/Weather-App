import Loading from '@/components/loading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForecastQuery, useWeatherQuery } from '@/hooks/use-weather';
import { AlertTriangle } from 'lucide-react';
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import CurrentWeather from './current-weather';
import TemperatureHour from './temperature-per-hour';
import WeatherDetail from './weather-detail';
import WeatherForecast from '@/components/weather-forecast';
import FavouriteButton from '@/components/favourite-button';

const CityPage = () => {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lon = parseFloat(searchParams.get("lon") || "0");

    const coordinates = { lat, lon };
  
    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
  
    if (weatherQuery.error || forecastQuery.error) {
      return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to load weather data. Please try again.
          </AlertDescription>
        </Alert>
      );
    }
  
    if (!weatherQuery.data || !forecastQuery.data || !params.name) {
      return <Loading />;
    }
  return (
  
    <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">
        {params.name}, {weatherQuery.data.sys.country}
      </h1>
      <div className="flex gap-2">
        <FavouriteButton
          data={{ ...weatherQuery.data, name: params.name }}
        />
      </div>
    </div>

    <div className="grid gap-6">
      <CurrentWeather data={weatherQuery.data} />
      <TemperatureHour data={forecastQuery.data} />
      <div className="grid gap-6 md:grid-cols-2 items-start">
        <WeatherDetail data={weatherQuery.data} />
        <WeatherForecast data={forecastQuery.data} />
      </div>
    </div>
  </div>
  )
}

export default CityPage