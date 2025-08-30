import axios from 'axios';

lucide.createIcons();

const cityInput = document.getElementById('city-input');

cityInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        const coords = await GetCoordinates(city);
        const weather = await GetWeather(coords.latitude, coords.longitude);
        SetTemp(weather.current.temperature_2m);
    }
});

async function GetCoordinates(city) {
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
    const { admin1, country, name, latitude, longitude } =
        response.data.results[0];
    return { admin1, country, name, latitude, longitude };
}

async function GetWeather(lat, lon) {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
            latitude: lat,
            longitude: lon,
            current: 'temperature_2m',
        },
    });
    console.log(response.data);
    return response.data;
}

function SetTemp(temp) {
    const tempValue = document.getElementById('temperature-value');
    tempValue.innerHTML = `${temp}<sup>&deg;c</sup>`;
}
