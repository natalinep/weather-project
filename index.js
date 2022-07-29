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

function getRelevantIcon(icon) {
  if (icon === "01d") {
    return "https://cdn-icons-png.flaticon.com/512/1163/1163662.png";
  }
  if (icon === "01n") {
    return "https://cdn-icons-png.flaticon.com/512/581/581601.png";
  }

  if (icon === "02d") {
    return "https://cdn-icons-png.flaticon.com/512/1146/1146856.png";
  }
  if (icon === "02n") {
    return "https://cdn-icons-png.flaticon.com/512/1146/1146900.png";
  }
  if (icon === "03d" || icon === "03n") {
    return "https://cdn-icons-png.flaticon.com/512/1146/1146880.png";
  }
  if (icon === "04d" || icon === "04n") {
    return "https://cdn-icons-png.flaticon.com/512/1146/1146881.png";
  }
  if (icon === "09d" || icon === "09n") {
    return "https://cdn-icons-png.flaticon.com/512/1146/1146858.png";
  }
  if (icon === "10d") {
    return "https://cdn-icons-png.flaticon.com/512/1146/1146915.png";
  }
  if (icon === "10n") {
    return "https://cdn-icons-png.flaticon.com/512/5903/5903792.png";
  }
  if (icon === "11d" || icon === "11n") {
    return "https://cdn-icons-png.flaticon.com/512/1146/1146861.png";
  }
  if (icon === "13d" || icon === "13n") {
    return "https://cdn-icons-png.flaticon.com/512/1146/1146899.png";
  }
  if (icon === "50d" || icon === "50n") {
    return "https://cdn-icons-png.flaticon.com/512/305/305834.png";
  }
}

function getRelevantImg(icon) {
  let iconElement = document.querySelector("#icon");
  if (icon === "01d") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1163/1163662.png"
    );
  }
  if (icon === "01n") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/581/581601.png"
    );
  }

  if (icon === "02d") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146856.png"
    );
  }
  if (icon === "02n") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146900.png"
    );
  }
  if (icon === "03d" || icon === "03n") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146880.png"
    );
  }
  if (icon === "04d" || icon === "04n") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146881.png"
    );
  }
  if (icon === "09d" || icon === "09n") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146858.png"
    );
  }
  if (icon === "10d") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146915.png"
    );
  }
  if (icon === "10n") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/5903/5903792.png"
    );
  }
  if (icon === "11d" || icon === "11n") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146861.png"
    );
  }
  if (icon === "13d" || icon === "13n") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146899.png"
    );
  }
  if (icon === "50d" || icon === "50n") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/305/305834.png"
    );
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="days-forecast">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="day__block">
        <p class="day">${formatDay(forecastDay.dt)}</p>
        <div class="day__frame">  
        <img src="${getRelevantIcon(
          forecastDay.weather[0].icon
        )}" alt="" class="weather__icon" id="icon" />
      <p class="day__temperature">${Math.round(
        forecastDay.temp.max
      )}° <span>${Math.round(forecastDay.temp.min)}°</span></p>
    </div></div>
    `;
      // getRelevantImg(forecastDay.weather[0].icon);
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "3f08bfa61b58c72a1282fd754e1f43b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  https: axios.get(apiUrl).then(displayForecast);
}

function showRelevantInformation(response) {
  let currentTemp = document.querySelector("#temperature");
  celsiusTemperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = celsiusTemperature;

  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;

  let infoFeels = document.querySelector("#feelsLike");
  feelsLike = Math.round(response.data.main.feels_like);
  infoFeels.innerHTML = feelsLike;

  let infoHumidity = document.querySelector("#humidity");
  infoHumidity.innerHTML = Math.round(response.data.main.humidity);

  let infoWind = document.querySelector("#wind");
  infoWind.innerHTML = Math.round(response.data.wind.speed);

  let condition = document.querySelector(".condition");
  condition.innerHTML = response.data.weather[0].main;

  let date = document.querySelector("#time");
  date.innerHTML = currentDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getRelevantImg(response.data.weather[0].icon);

  getForecast(response.data.coord);
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

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);

  let infoFeels = document.querySelector("#feelsLike");
  infoFeels.innerHTML = Math.round((feelsLike * 9) / 5 + 32);

  let degree = document.querySelector("#degree");
  degree.innerHTML = "°F";

  let degreeFeels = document.querySelector("#degreeFeels");
  degreeFeels.innerHTML = "°F";
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let infoFeels = document.querySelector("#feelsLike");
  infoFeels.innerHTML = Math.round(feelsLike);

  let degree = document.querySelector("#degree");
  degree.innerHTML = "°C";

  let degreeFeels = document.querySelector("#degreeFeels");
  degreeFeels.innerHTML = "°C";
}

let celsiusTemperature = null;
let feelsLike = null;

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

getAPI("Kyiv");
