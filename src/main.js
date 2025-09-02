import { GetCoordinates, GetWeather } from './api';
import { SetGeolocation, SetTemp, SetWeatherCondition } from './ui';

lucide.createIcons();

const cityInput = document.getElementById('city-input');

cityInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        const coords = await GetCoordinates(city);
        const weather = await GetWeather(coords.latitude, coords.longitude);
        SetTemp(weather.current.temperature_2m, weather.current_units.temperature_2m);
        SetWeatherCondition(weather.current.weather_code)
        SetGeolocation(coords.name, coords.country_code)
    }
});
