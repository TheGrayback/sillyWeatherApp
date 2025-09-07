import { weatherCodeDescription } from './utils/weatherCodes';

export function SetTemp(temperatureValue, temperatureUnit) {
    const tempValue = document.getElementById('temperature-value');
    tempValue.innerHTML =
        `${temperatureValue}<sup>${temperatureUnit}</sup>` || '---';
}

export function SetWeatherCondition(code) {
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
    weatherIconLarge.setAttribute(
        'src',
        weatherCodeDescription[code].day.largeIcon
    );
    lucide.createIcons();
}

export function SetGeolocation(city, country_code) {
    const userGeolocation = document.getElementById('user-geolocation');
    userGeolocation.textContent = `${city}, ${country_code}`;
}

export function setTime(ISOTime) {
    const userTime = document.getElementById('user-time');
    const date = new Date(ISOTime);
    const dateOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    const timeOptions = {
        hours: '2-digit',
        minutes: '2-digit',
    };
    const dateFormatted = new Intl.DateTimeFormat('en-GB', dateOptions).format(
        date
    );
    const timeFormatted = new Intl.DateTimeFormat('en-Gb', timeOptions).format(
        date
    );
    userTime.innerHTML =
        `${dateFormatted}<span class="font-bold">, ${timeFormatted}</span>` ||
        '---';
}

export function setForecast(forecastDate, forecastTempMax, forecastTempMin) {
    const day = document.querySelectorAll('[day-data]');
    console.log(day);
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
        const dateFormatted = new Intl.DateTimeFormat(
            'en-GB',
            dateOptions
        ).format(date);
        const weekdayFormatted = new Intl.DateTimeFormat(
            'en-GB',
            weekdayOptions
        ).format(date);
        forecastDay.querySelector('.forecast-day-month').textContent =
            dateFormatted;
        forecastDay.querySelector('.forecast-weekday').textContent =
            weekdayFormatted;
        forecastDay.querySelector('.forecast-temp-max').innerHTML =
            `${Math.round(forecastTempMax[dataIndex])}<sup>&deg;c</sup>`;
        forecastDay.querySelector('.forecast-temp-min').innerHTML =
            `${Math.round(forecastTempMin[dataIndex])}<sup>&deg;c</sup>`;
            console.log({dateFormatted, weekdayFormatted});
    });
}
