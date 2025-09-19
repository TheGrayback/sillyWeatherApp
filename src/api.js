import axios from 'axios';

export async function getCityList(city) {
    const response = await axios.get(
        'https://geocoding-api.open-meteo.com/v1/search',
        {
            params: {
                name: city,
                count: 10,
                language: 'en',
                format: 'json',
            },
        }
    );
    return response.data.results;
}

export async function getWeather(
    lat,
    lon,
    forecastDays = 8,
    forecast_hours = 12
) {
    forecastDays++;
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
            latitude: lat,
            longitude: lon,
            current:
                'weather_code,temperature_2m,wind_speed_10m,wind_direction_10m,apparent_temperature,visibility,relative_humidity_2m',
            forecast_days: forecastDays,
            forecast_hours: forecast_hours,
            timezone: 'auto',
            daily: 'temperature_2m_max,temperature_2m_min,weather_code,uv_index_max,sunrise,sunset',
            hourly: 'temperature_2m,weather_code',
        },
    });
    return response.data;
}

export async function getCityByLatLon(latitude, longitude) {
    const response = await axios.get(
        'http://api.openweathermap.org/geo/1.0/reverse',
        {
            params: {
                lat: latitude,
                lon: longitude,
                limit: 10,
                appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
            },
        }
    );
    return response.data[0]
}
