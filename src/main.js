import { getCoordinates, getWeather } from './api';
import { mapWeatherApiResponse } from './apiAdapter';
import { newSetForecast, setCurrentWeather } from './ui';

lucide.createIcons();

const cityInput = document.getElementById('city-input');

cityInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const forecastDaysNumber =
            document.getElementById('forecastSize').value;
        console.log(forecastDaysNumber);
        const city = cityInput.value.trim();
        const coordinates = await getCoordinates(city);
        const weather = await getWeather(
            coordinates.latitude,
            coordinates.longitude,
            forecastDaysNumber
        );
        const weatherData = mapWeatherApiResponse(weather, coordinates);
        setCurrentWeather(weatherData);
        newSetForecast(weatherData);
    }
});
