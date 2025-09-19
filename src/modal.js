export function renderCityList(cities, onCitySelected) {
    const cityListContainer = document.getElementById('cityList');
    cityListContainer.innerHTML = ''; // очищаем старый список

    cities.forEach((city) => {
        const cityItem = document.createElement('div');
        cityItem.className = `
            flex items-center justify-between p-2 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer text-center
        `;

        const flagImg = document.createElement('img');
        flagImg.src = `https://hatscripts.github.io/circle-flags/flags/${city.country_code.toLowerCase()}.svg`;
        flagImg.alt = city.country;
        flagImg.className = 'w-6 h-6 rounded-full mr-2';

        const cityName = document.createElement('span');
        cityName.textContent = `${city.name}, ${city.admin1 || city.country}`;
        cityName.className = 'text-center text-white font-medium';

        cityItem.addEventListener('click', () => {
            onCitySelected(city);
        });

        cityItem.appendChild(flagImg);
        cityItem.appendChild(cityName);

        cityListContainer.appendChild(cityItem);
    });
}

export function closeCityModal() {
    document.getElementById('cityModal').classList.add('hidden');
}

export function openCityModal() {
    document.getElementById('cityModal').classList.remove('hidden');
}
