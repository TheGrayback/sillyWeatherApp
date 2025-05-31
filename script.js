// import { createIcons, icons } from 'lucide';
// createIcons({ icons });

lucide.createIcons();

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const openWeatherSettings = document.getElementById("weather-menu");
const weatherSettingsModalWindow = document.getElementById("weather-settings-modal");
const closeWeatherSettings = document.querySelector(".modal-close-btn");

searchButton.addEventListener("click", () => {
    if (cityInput.style.visibility === "hidden") {
        cityInput.style.visibility = "visible";
    } else {
        cityInput.style.visibility = "hidden";
    }
});

function closeModal () {
    weatherSettingsModalWindow.classList.remove("open");
}

function openModal () {
    weatherSettingsModalWindow.classList.add("open");
}

openWeatherSettings.addEventListener("click", () => {
    if (weatherSettingsModalWindow.classList.contains("open")) {
        closeModal();
    } else {
        openModal();
    }
})

closeWeatherSettings.addEventListener("click", () => {
    closeModal();
})

async function getWeather(city) {
    const url = "";
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error");
        return null;
    }
}

getWeather()