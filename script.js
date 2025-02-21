const apiKey = '1b4ff52a6344cc2070129ac3cfbf1e0f'; // Temporary API key for testing
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const tempDisplay = document.getElementById('temp');
const cityDisplay = document.getElementById('city');
const humidityDisplay = document.getElementById('humidity');
const windDisplay = document.getElementById('wind');
const weatherIcon = document.getElementById('weather-icon');

// Add event listener for search button
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name!');
    }
});

// Function to fetch weather data from OpenWeatherMap
async function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found. Please enter a valid city name.');
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
    }
}



// Function to update the weather details in the UI
function updateWeatherUI(data) {
    tempDisplay.textContent = `${Math.round(data.main.temp)}°C`;
    cityDisplay.textContent = data.name;
    humidityDisplay.textContent = `${data.main.humidity}%`;
    windDisplay.textContent = `${data.wind.speed} km/h`;

    // Update the weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
}
