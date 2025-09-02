import axios from 'axios';

export async function GetCoordinates(city) {
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

export async function GetWeather(lat, lon) {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
            latitude: lat,
            longitude: lon,
            current: 'weather_code,temperature_2m',
            forecast_days: 1,
        },
    });
    console.log('Weather data: ', response.data);
    return response.data;
}
