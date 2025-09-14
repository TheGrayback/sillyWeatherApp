import { weatherCodeDescription } from './utils/weatherCodes';

const BASE_URL = import.meta.env.BASE_URL;

export function setCurrentWeather({current, location}) {
    setWeatherCondition(current.code);
    setTemp(current.temp, current.unit);
    setGeolocation(location.city, location.country);
    setTime(current.time);
}

function setTemp(temperatureValue, temperatureUnit) {
    const tempValue = document.getElementById('temperature-value');
    tempValue.innerHTML =
        `${temperatureValue}<sup>${temperatureUnit}</sup>` || '---';
}

function setWeatherCondition(code) {
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

function setGeolocation(city, country_code) {
    const userGeolocation = document.getElementById('user-geolocation');
    userGeolocation.textContent = `${city}, ${country_code}`;
}

function setTime(isoTime) {
    console.log(isoTime);
    const userTime = document.getElementById('user-time');
    const date = new Date(`${isoTime}`);
    const dateOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };
    const dateFormatted = _formatTime('en-Gb', dateOptions, date);
    const timeFormatted = _formatTime('en-Gb', timeOptions, date);
    const testTimeFormatted = new Intl.DateTimeFormat(
        'en-GB',
        timeOptions
    ).format(date)
    console.log(timeFormatted, dateFormatted, testTimeFormatted);
    userTime.innerHTML =
        `${dateFormatted}<span class="font-bold">, ${timeFormatted}</span>` ||
        '---';
}

export function setForecast({forecast}) {
    const day = document.querySelectorAll('[day-data]');
    day.forEach((forecastDay, dayIndex) => {
        const dataIndex = dayIndex + 1;
        const date = new Date(forecast[dataIndex].date);
        const dateOptions = {
            day: 'numeric',
            month: 'long',
        };
        const weekdayOptions = {
            weekday: 'long',
        };
        const dateFormatted = _formatTime('en-Gb', dateOptions, date);
        const weekdayFormatted = _formatTime('en-Gb', weekdayOptions, date);
        forecastDay.querySelector('.forecast-icon').src =
            `${BASE_URL}${weatherCodeDescription[forecast[dataIndex].code].day.largeIcon}`;
        forecastDay.querySelector('.forecast-day-month').textContent =
            dateFormatted;
        forecastDay.querySelector('.forecast-weekday').textContent =
            weekdayFormatted;
        forecastDay.querySelector('.forecast-temp-max').innerHTML =
            `${Math.round(forecast[dataIndex].tempMax)}<sup>&deg;c</sup>`;
        forecastDay.querySelector('.forecast-temp-min').innerHTML =
            `${Math.round(forecast[dataIndex].tempMin)}<sup>&deg;c</sup>`;
    });
}

// Silly useless function but it itched my brain
function _formatTime(locale = 'en-GB', options, baseDate) {
    return new Intl.DateTimeFormat(locale, options).format(baseDate);
}
