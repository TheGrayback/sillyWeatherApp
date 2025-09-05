import { GetCoordinates, GetWeather } from './api';
import { SetGeolocation, SetTemp, setTime, SetWeatherCondition } from './ui';

lucide.createIcons();

const cityInput = document.getElementById('city-input');

cityInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        const coordinates = await GetCoordinates(city);
        const weather = await GetWeather(coordinates.latitude, coordinates.longitude);
        SetTemp(
            weather.current.temperature_2m,
            weather.current_units.temperature_2m
        );
        SetWeatherCondition(weather.current.weather_code);
        SetGeolocation(coordinates.name, coordinates.country_code);
        setTime(weather.current.time);
    }
});
