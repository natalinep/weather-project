function findPosition(event) {
  event.preventDefault();
  function retrievePosition(position) {
    let apiKey = "3f08bfa61b58c72a1282fd754e1f43b2";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showRelevantInformation);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let searchLocation = document.querySelector(".search__location");
searchLocation.addEventListener("click", findPosition);

function currentDate(timestamp) {
  let now = new Date(timestamp);
  function zero(value) {
    if (value < 10) {
      value = "0" + value;
    }
    return value;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return day + " " + hours + ":" + minutes;
}

function showRelevantInformation(response) {
  let currentTemp = document.querySelector("#temperature");
  celsiusTemperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = celsiusTemperature;

  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;

  let infoFeels = document.querySelector("#feelsLike");
  infoFeels.innerHTML = Math.round(response.data.main.feels_like);

  let infoHumidity = document.querySelector("#humidity");
  infoHumidity.innerHTML = Math.round(response.data.main.humidity);

  let infoWind = document.querySelector("#wind");
  infoWind.innerHTML = Math.round(response.data.wind.speed);

  let condition = document.querySelector(".condition");
  condition.innerHTML = response.data.weather[0].main;

  let date = document.querySelector("#time");
  date.innerHTML = currentDate(response.data.dt * 1000);
}

function getAPI(city) {
  let apiKey = "3f08bfa61b58c72a1282fd754e1f43b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showRelevantInformation);
}

function showCityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search__field").value;
  getAPI(cityInput);
}

let form = document.querySelector(".search__button");
form.addEventListener("click", showCityName);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let degree = document.querySelector("#degree");
  degree.innerHTML = "°F";
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let degree = document.querySelector("#degree");
  degree.innerHTML = "°C";
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

getAPI("Kyiv");
