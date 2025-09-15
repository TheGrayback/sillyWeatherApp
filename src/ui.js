import { weatherCodeDescription } from './utils/weatherCodes';

const BASE_URL = import.meta.env.BASE_URL;

export function setCurrentWeather({ current, location }) {
    setWeatherCondition(current.code);
    setTemp(current.temp, current.unit);
    setGeolocation(location.city, location.country);
    setTime(current.time);
}

export function setForecast({ forecast }) {
    const day = document.querySelectorAll('[day-data]');
    day.forEach((forecastDay, dayIndex) => {
        const dataIndex = dayIndex + 1;
        const date = new Date(forecast[dataIndex].date);
        const dateOptions = {
            day: 'numeric',
            month: 'short',
        };
        const weekdayOptions = {
            weekday: 'short',
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

export function newSetForecast({ forecast }) {
    console.log(forecast);
    const container = document.getElementById('forecastContainer');
    container.innerHTML = '';
    forecast.slice(1).forEach((dayData) => {
        const date = new Date(dayData.date);
        const dateOptions = {
            day: 'numeric',
            month: 'short',
        };
        const weekdayOptions = {
            weekday: 'short',
        };
        const dateFormatted = _formatTime('en-Gb', dateOptions, date);
        const weekdayFormatted = _formatTime('en-Gb', weekdayOptions, date);
        const forecastRow = document.createElement('div');
        forecastRow.className =
            'grid-cols-forecast grid items-center justify-evenly gap-2';
        forecastRow.innerHTML = `
        <!-- Weather forecast icon -->
        <img
            class="forecast-icon h-15 w-15"
            src="${BASE_URL}${weatherCodeDescription[dayData.code].day.largeIcon}"
            alt="${weatherCodeDescription[dayData.code].day.description}"
        />
        <!-- Weather forecast temps -->
        <span
            class="forecast-temp-max text-end text-2xl leading-tight"
        >
            ${Math.round(dayData.tempMax)}<sup>&deg;c</sup>
        </span>
        /
        <span
            class="forecast-temp-min text-start text-xl leading-tight text-gray-400"
            >${Math.round(dayData.tempMin)}<sup>&deg;c</sup>
        </span>
        <!-- Weather forecast date -->
        <!-- Day/Month -->
        <span
            class="forecast-day-month text-center text-sm text-gray-300"
        >
            ${dateFormatted}
        </span>
        <!-- Day of the week -->
        <span
            class="forecast-weekday text-center text-sm text-gray-300"
        >
            ${weekdayFormatted}
        </span>
        `;
        container.appendChild(forecastRow);
    });
}

// Silly useless function but it itched my brain
function _formatTime(locale = 'en-GB', options, baseDate) {
    return new Intl.DateTimeFormat(locale, options).format(baseDate);
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
    ).format(date);
    console.log(timeFormatted, dateFormatted, testTimeFormatted);
    userTime.innerHTML =
        `${dateFormatted}<span class="font-bold">, ${timeFormatted}</span>` ||
        '---';
}
