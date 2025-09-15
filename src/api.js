import axios from 'axios';

export async function getCoordinates(city) {
    const response = await axios.get(
        'https://geocoding-api.open-meteo.com/v1/search',
        {
            params: {
                name: city,
                count: 1,
                language: 'en',
                format: 'json',
            },
        }
    );
    console.log('Geolocation data: ', response.data.results[0]);
    const { country_code, name, latitude, longitude } =
        response.data.results[0];
    return { country_code, name, latitude, longitude };
}

export async function getWeather(lat, lon, forecastDays = 8) {
    forecastDays++;
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
            latitude: lat,
            longitude: lon,
            current: 'weather_code,temperature_2m',
            forecast_days: forecastDays,
            timezone: 'auto',
            daily: 'temperature_2m_max,temperature_2m_min,weather_code',
        },
    });
    console.log('Weather data: ', response.data);
    return response.data;
}
