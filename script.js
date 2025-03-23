document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const Weatherinfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const TemperatureInfo = document.getElementById("temperature");
    const Description = document.getElementById("description");
    const ErrMsg = document.getElementById("error-message");
    const API_KEY = "773fea2b07234f6ce81a9bf93adc5545";

    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const WeatherData = await fetchWeatherData(city);
            displayWeatherData(WeatherData);
        } catch (error) {
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        
        const response = await fetch(url);
        console.log(typeof response)
        console.log("Respose",response)
        if(!response.ok){
            throw new Error("city not found")
        }
        const data = await response.json()
        return data
    }

    function showError() {
        Weatherinfo.classList.remove("hidden");
        ErrMsg.classList.add("hidden");
    }
    function displayWeatherData(weatherData){
        console.log(weatherData)
        const {name,main,weather} = weatherData
        cityName.textContent = name
        ErrMsg.classList.add("hidden")
        TemperatureInfo.textContent = `Temperature: ${(main.temp - 273.15).toFixed(2)}°C`;
        Description.textContent = `Weather : ${weather[0].description}`

    }
});