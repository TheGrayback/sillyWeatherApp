import { weatherCodeDescription } from './utils/weatherCodes';

const BASE_URL = import.meta.env.BASE_URL;

export function setTemp(temperatureValue, temperatureUnit) {
    const tempValue = document.getElementById('temperature-value');
    tempValue.innerHTML =
        `${temperatureValue}<sup>${temperatureUnit}</sup>` || '---';
}

export function setWeatherCondition(code) {
    const weatherDesc = document.getElementById(
        'weather-condition-description'
    );
    const weatherIconLarge = document.getElementById(
        'weather-condition-icon-large'
    );
    const weatherIcon = document.getElementById('weather-condition-icon');
    weatherDesc.textContent =
        weatherCodeDescription[code].day.description || '---';
    weatherIcon.setAttribute(
        'data-lucide',
        weatherCodeDescription[code].day.icon
    );
    weatherIconLarge.src = `${BASE_URL}${weatherCodeDescription[code].day.largeIcon}`;
    lucide.createIcons();
}

export function setGeolocation(city, country_code) {
    const userGeolocation = document.getElementById('user-geolocation');
    userGeolocation.textContent = `${city}, ${country_code}`;
}

export function setTime(isoTime) {
    const userTime = document.getElementById('user-time');
    const date = new Date(isoTime);
    const dateOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    const timeOptions = {
        hours: '2-digit',
        minutes: '2-digit',
    };
    const dateFormatted = _formatTime('en-Gb', dateOptions, date);
    const timeFormatted = _formatTime('en-Gb', timeOptions, date);
    userTime.innerHTML =
        `${dateFormatted}<span class="font-bold">, ${timeFormatted}</span>` ||
        '---';
}

export function setForecast(forecastDate, forecastTempMax, forecastTempMin, weatherCode) {
    const day = document.querySelectorAll('[day-data]');
    day.forEach((forecastDay, dayIndex) => {
        const dataIndex = dayIndex + 1;
        const date = new Date(forecastDate[dataIndex]);
        const dateOptions = {
            day: 'numeric',
            month: 'long',
        };
        const weekdayOptions = {
            weekday: 'long',
        };
        const dateFormatted = _formatTime('en-Gb', dateOptions, date);
        const weekdayFormatted = _formatTime('en-Gb', weekdayOptions, date);
        forecastDay.querySelector('.forecast-icon').src = `${BASE_URL}${weatherCodeDescription[weatherCode[dataIndex]].day.largeIcon}`
        forecastDay.querySelector('.forecast-day-month').textContent =
            dateFormatted;
        forecastDay.querySelector('.forecast-weekday').textContent =
            weekdayFormatted;
        forecastDay.querySelector('.forecast-temp-max').innerHTML =
            `${Math.round(forecastTempMax[dataIndex])}<sup>&deg;c</sup>`;
        forecastDay.querySelector('.forecast-temp-min').innerHTML =
            `${Math.round(forecastTempMin[dataIndex])}<sup>&deg;c</sup>`;
    });
}

// Silly useless function but it itched my brain
function _formatTime (locale = 'en-GB', options, baseDate) {
    return new Intl.DateTimeFormat(locale, options).format(baseDate)
}
