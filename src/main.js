import { getCoordinates, getWeather } from './api';
import { mapWeatherApiResponse } from './apiAdapter';
import { setCurrentWeather, setForecast } from './ui';

lucide.createIcons();

const cityInput = document.getElementById('city-input');

cityInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        const coordinates = await getCoordinates(city);
        const weather = await getWeather(
            coordinates.latitude,
            coordinates.longitude
        );
        const weatherData = mapWeatherApiResponse(weather, coordinates);
        setCurrentWeather(weatherData);
        setForecast(weatherData);
    }
});
