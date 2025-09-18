import { uvIndexCodes } from './utils/uvIndexCodes';
import { visibilityConditions } from './utils/visibilityConditions';
import { weatherCodeDescription } from './utils/weatherCodes';
import { getBeaufortCategory, getWindDirectionFull } from './utils/windConditions';

const BASE_URL = import.meta.env.BASE_URL;

export function setCurrentWeather({ current, location }) {
    setWeatherCondition(current.code);
    setTemp(current.temp, current.unit);
    setGeolocation(location.city, location.country);
    setTime(current.time);
}

export function newSetForecast({ forecast }) {
    const container = document.getElementById('forecastContainer');
    const daysNumberText = document.getElementById('forecastDaysNumber');
    daysNumberText.textContent = `${forecast.length - 1}-days forecast`;
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
    if (forecast.length <= 8) {
        const forecastFooter = document.createElement('span');
        forecastFooter.className =
            'block text-xs text-center opacity-70 hover:opacity-100';
        forecastFooter.textContent = 'Choose more days!';
        container.appendChild(forecastFooter);
    }
}

export function setAdditionalWeatherConditions({ current, forecast }) {
    setUVRadiation(forecast);
    setWindCondition(current);
    setApparentTemp(current);
    setVisibility(current);
    setSunsetSunrise(forecast);
    setHumidity(current);
}

function setUVRadiation(forecast) {
    const currentUVCondition = uvIndexCodes[forecast[0].dailyUV.toFixed(0)];
    const uvIcon = document.getElementById('UVIndexIcon');
    const uvLevel = document.getElementById('UVIndexLevel');
    const uvCategory = document.getElementById('UVIndexCategory');
    const uvHint = document.getElementById('UVIndexHint');

    uvIcon.src = `${BASE_URL}${currentUVCondition.icon}`;
    uvIcon.alt = `${currentUVCondition.alt}`;
    uvLevel.textContent = `${forecast[0].dailyUV.toFixed(0)}`;
    uvCategory.textContent = `${currentUVCondition.category}`;
    uvCategory.classList = `text-md font-bold ${currentUVCondition.color}`;
    uvHint.textContent = `${currentUVCondition.hint}`;
}

function setWindCondition(currentWind) {
    const UIWindIcon = document.getElementById('WindIcon');
    const UIWindSpeed = document.getElementById('WindSpeed');
    const UIWindDirection = document.getElementById('WindDirection');
    const UIWindHint = document.getElementById('WindHint');

    const windPower = getBeaufortCategory(currentWind.windSpeed);

    UIWindIcon.alt = `Level ${windPower.level} on Beaufort scale`;
    UIWindDirection.textContent = getWindDirectionFull(
        currentWind.windDirection
    );
    UIWindSpeed.textContent = `${currentWind.windSpeed} km/h`;
    UIWindHint.textContent = `${windPower.description}`;
}

function setApparentTemp({ temp, apparentTemp }) {
    const UITempIcon = document.getElementById('AppTempIcon');
    const UITempValue = document.getElementById('AppTempValue');
    const UITempHint = document.getElementById('AppTempHint');

    const diff = apparentTemp - temp;

    let iconSrc;
    let categoryText;
    if (diff > 0.5) {
        iconSrc = `${BASE_URL}weather-icons/large/thermometer-warmer.svg`;
        categoryText = 'Feels warmer';
    } else if (diff < -0.5) {
        iconSrc = `${BASE_URL}weather-icons/large/thermometer-colder.svg`;
        categoryText = 'Feels colder';
    } else {
        iconSrc = `${BASE_URL}weather-icons/large/thermometer.svg`;
        categoryText = 'Feels like actual';
    }

    UITempIcon.src = iconSrc;
    UITempIcon.alt = categoryText;
    UITempValue.textContent = `${Math.round(apparentTemp)}°C`;
    UITempHint.textContent = categoryText;
}

function setVisibility(current) {
    const visibilityMeters = current.visibility;
    const valueElement = document.getElementById('VisibilityValue');
    const hintElement = document.getElementById('VisibilityHint');
    const iconElement = document.getElementById('VisibilityIcon');

    const km = (visibilityMeters / 1000).toFixed(1);

    const condition = visibilityConditions.find((c) => km >= c.min);

    valueElement.textContent = `${km} km`;
    hintElement.textContent = condition?.hint ?? '';

    if (condition?.icon) {
        iconElement.setAttribute('data-lucide', condition.icon);
    }
}

function setSunsetSunrise(forecast) {
    const today = forecast[0];

    const sunriseElement = document.getElementById('SunriseTime');
    const sunsetElement = document.getElementById('SunsetTime');
    const hintElement = document.getElementById('SunHint');

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const sunriseTime = formatTime(today.sunrise);
    const sunsetTime = formatTime(today.sunset);

    sunriseElement.textContent = sunriseTime;
    sunsetElement.textContent = sunsetTime;

    const durationMs = new Date(today.sunset) - new Date(today.sunrise);
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMs / (1000 * 60)) % 60);

    hintElement.textContent = `Daylight duration: ${durationHours}h ${durationMinutes}m`;
}

function setHumidity(current) {
    const humidity = current.relativeHumidity;

    const valueElement = document.getElementById('HumidityValue');
    const categoryElement = document.getElementById('HumidityCategory');
    const hintElement = document.getElementById('HumidityHint');

    valueElement.textContent = `${humidity}%`;

    let category = 'Dry';
    let hint = 'Air feels dry';
    let colorClass = 'text-yellow-400';

    if (humidity >= 70) {
        category = 'Humid';
        hint = 'Feels damp and sticky';
        colorClass = 'text-blue-500';
    } else if (humidity >= 40) {
        category = 'Comfortable';
        hint = 'Comfortable for most activities';
        colorClass = 'text-green-400';
    } else if (humidity < 30) {
        category = 'Very Dry';
        hint = 'Skin and lips may dry out';
        colorClass = 'text-red-400';
    }

    categoryElement.textContent = category;
    hintElement.textContent = hint;

    categoryElement.className = `text-md font-bold ${colorClass}`;
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
}

function setGeolocation(city, country_code) {
    const userGeolocation = document.getElementById('user-geolocation');
    userGeolocation.textContent = `${city}, ${country_code}`;
}

function setTime(isoTime) {
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
    userTime.innerHTML =
        `${dateFormatted}<span class="font-bold">, ${timeFormatted}</span>` ||
        '---';
}
