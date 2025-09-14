import { getCoordinates, getWeather } from './api';
import { setForecast, setGeolocation, setTemp, setTime, setWeatherCondition } from './ui';

lucide.createIcons();

const cityInput = document.getElementById('city-input');

cityInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        const coordinates = await getCoordinates(city);
        const weather = await getWeather(coordinates.latitude, coordinates.longitude);
        setTemp(
            weather.current.temperature_2m,
            weather.current_units.temperature_2m
        );
        setWeatherCondition(weather.current.weather_code);
        setGeolocation(coordinates.name, coordinates.country_code);
        setTime(weather.current.time);
        setForecast(weather.daily.time, weather.daily.temperature_2m_max, weather.daily.temperature_2m_min, weather.daily.weather_code);
    }
});
