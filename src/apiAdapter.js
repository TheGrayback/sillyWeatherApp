export function mapWeatherApiResponse(weatherResponse, coordinates) {
    return {
        current: {
            temp: weatherResponse.current.temperature_2m,
            unit: weatherResponse.current_units.temperature_2m,
            code: weatherResponse.current.weather_code,
            time: weatherResponse.current.time,
        },
        location: {
            city: coordinates.name,
            country: coordinates.country_code,
        },
        forecast: weatherResponse.daily.time.map((date, index) => ({
            date,
            tempMax: weatherResponse.daily.temperature_2m_max[index],
            tempMin: weatherResponse.daily.temperature_2m_min[index],
            code: weatherResponse.daily.weather_code[index],
            dailyUV: weatherResponse.daily.uv_index_max[index],
            sunrise: weatherResponse.daily.sunrise[index],
            sunset: weatherResponse.daily.sunset[index],
        })),
    };
}
