export function mapWeatherApiResponse(weatherResponse, coordinates) {
    return {
        current: {
            temp: weatherResponse.current.temperature_2m,
            apparentTemp: weatherResponse.current.apparent_temperature,
            unit: weatherResponse.current_units.temperature_2m,
            code: weatherResponse.current.weather_code,
            time: weatherResponse.current.time,
            windDirection: weatherResponse.current.wind_direction_10m,
            windSpeed: weatherResponse.current.wind_speed_10m,
            visibility: weatherResponse.current.visibility,
            relativeHumidity: weatherResponse.current.relative_humidity_2m,
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
        hourly: weatherResponse.hourly.time.map((time, index) => ({
            time,
            temp: weatherResponse.hourly.temperature_2m[index],
            code: weatherResponse.hourly.weather_code[index],
        })),
    };
}
