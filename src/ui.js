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
    const dateFormatted = new Intl.DateTimeFormat('en-GB', dateOptions).format(
        date
    );
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const timeFormatted = `${hours}:${minutes}`;
    userTime.innerHTML =
        `${dateFormatted}<span class="font-bold">, ${timeFormatted}</span>` ||
        '---';
}
