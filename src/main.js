import { getCityByLatLon, getCityList, getWeather } from './api';
import { mapWeatherApiResponse } from './apiAdapter';
import { closeCityModal, openCityModal, renderCityList } from './modal';
import {
    setForecast,
    setAdditionalWeatherConditions,
    setCurrentWeather,
    setHourlyForecast,
} from './ui';

lucide.createIcons();

const geolocateBtn = document.getElementById('geolocationRequestBtn');
const closeModalButton = document.getElementById('closeCityModalBtn');
const openModalButton = document.getElementById('openCityModalBtn');
const cityInput = document.getElementById('cityInputBtn');
const cityModal = document.getElementById('cityModal');

cityModal.addEventListener('click', (e) => {
    if (e.target === cityModal) {
        closeCityModal();
    }
});

closeModalButton.addEventListener('click', () => {
    closeCityModal();
});

openModalButton.addEventListener('click', () => {
    openCityModal();
});

cityInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        const cityList = await getCityList(city);
        renderCityList(cityList, handleCitySelection);
    }
});

geolocateBtn.addEventListener('click', async () => {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const forecastDaysNumber =
                document.getElementById('weeklyForecastSize').value;
            const forecastHoursNumber =
                document.getElementById('hourlyForecastSize').value;
            const { latitude, longitude } = position.coords;
            const coordinates = await getCityByLatLon(latitude, longitude);
            cityInput.value = coordinates.name;
            const weather = await getWeather(
                latitude,
                longitude,
                forecastDaysNumber,
                forecastHoursNumber
            );
            const weatherData = mapWeatherApiResponse(weather, coordinates);
            setCurrentWeather(weatherData);
            setForecast(weatherData);
            setAdditionalWeatherConditions(weatherData);
            setHourlyForecast(weatherData);
            lucide.createIcons();
        },
        (error) => {
            console.error(error);
            alert('Unable to get your location');
        }
    );
    closeCityModal();
});

async function handleCitySelection(city) {
    const forecastDaysNumber =
        document.getElementById('weeklyForecastSize').value;
    const forecastHoursNumber =
        document.getElementById('hourlyForecastSize').value;
    const weather = await getWeather(
        city.latitude,
        city.longitude,
        forecastDaysNumber,
        forecastHoursNumber
    );
    const weatherData = mapWeatherApiResponse(weather, city);
    console.log(weather, weatherData);
    setCurrentWeather(weatherData);
    setForecast(weatherData);
    setAdditionalWeatherConditions(weatherData);
    setHourlyForecast(weatherData);
    lucide.createIcons();
    closeCityModal();
}
