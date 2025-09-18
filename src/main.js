import { getCoordinates, getWeather } from './api';
import { mapWeatherApiResponse } from './apiAdapter';
import { newSetForecast, setAdditionalWeatherConditions, setCurrentWeather } from './ui';

lucide.createIcons();

const cityInput = document.getElementById('city-input');

cityInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const forecastDaysNumber =
            document.getElementById('forecastSize').value;
        const city = cityInput.value.trim();
        const coordinates = await getCoordinates(city);
        const weather = await getWeather(
            coordinates.latitude,
            coordinates.longitude,
            forecastDaysNumber
        );
        const weatherData = mapWeatherApiResponse(weather, coordinates);
        console.log(weatherData);
        setCurrentWeather(weatherData);
        newSetForecast(weatherData);
        setAdditionalWeatherConditions(weatherData)
        lucide.createIcons();
    }
});
