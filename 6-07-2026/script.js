const apiKey = "30d02f07240380280338dc2969238b1d";
async function getWeather() {

    try {
        let city = document.getElementById("city").value.trim();
        if (city === "") {
            document.getElementById("weather").innerText = "Please enter a city name.";
            return;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        let response = await fetch(url);
        let data = await response.json();
        if (!response.ok) {
            document.getElementById("weather").innerText = data.message;
            return;
        }
        document.getElementById("weather").innerHTML = `
            <h2>${data.name}</h2>
            <h3>${data.weather[0].main}</h3>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <p>🌡 Temperature: ${data.main.temp} °C</p>
            <p>🤒 Feels Like: ${data.main.feels_like} °C</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind: ${data.wind.speed} m/s</p>`;
            document.body.style.backgroundColor = "rgb(255, 165, 0)";
    } catch (Exception) {
        document.getElementById("weather").innerHTML = "Error Exception";
    }
}

function clearTheData() {
    document.getElementById("city").value = "";
    document.getElementById("weather").innerHTML = "";
}