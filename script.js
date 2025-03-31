lucide.createIcons();

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
    if (cityInput.style.visibility === "hidden") {
        cityInput.style.visibility = "visible";
    } else {
        cityInput.style.visibility = "hidden";
    }
});
