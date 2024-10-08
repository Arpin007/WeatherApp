const apiKey = "371b356f435fc398a29c96da2ee68a0d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const WeatherIcon = document.querySelector(".weather-icon");
const loadingElement = document.querySelector(".loading"); 
const errorElement = document.querySelector(".error"); 
const weatherElement = document.querySelector(".weather"); 

function showLoading(isLoading) {
    if (!loadingElement) {
        console.error("Loading element not found");
        return;
    }
    if (isLoading) {
        loadingElement.style.display = "block";
        weatherElement.style.display = "none";
        errorElement.style.display = "none";
    } else {
        loadingElement.style.display = "none";
    }
}

async function checkWeather(city) {
    showLoading(true); // Show loading indicator
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status === 404) {
            // alert("City not found. Please enter a valid city name.");
            errorElement.style.display = "block";
            weatherElement.style.display = "none";
        } else {
            const data = await response.json();

            // Update the DOM with weather data
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

            // Update the weather icon based on the weather condition
            const weatherCondition = data.weather[0].main;
            if (weatherCondition === "Clouds") {
                WeatherIcon.src = "Images/cloudy.png";
            } else if (weatherCondition === "Clear") {
                WeatherIcon.src = "Images/clear.png";
            } else if (weatherCondition === "Rain") {
                WeatherIcon.src = "Images/rain.png";
            } else if (weatherCondition === "Drizzle") {
                WeatherIcon.src = "Images/drizzle.png";
            } else if (weatherCondition === "Mist") {
                WeatherIcon.src = "Images/mist.png";
            } 

            // Display the weather information
            weatherElement.style.display = "block";
            errorElement.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching the weather data:", error);
        alert("An error occurred while fetching the weather data. Please try again.");
        errorElement.style.display = "block";
        weatherElement.style.display = "none";
    }
    showLoading(false); // Hide loading indicator
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

// Event listener for the Enter key in the search box
searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        } else {
            alert("Please enter a city name.");
        }
    }
});
