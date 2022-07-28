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
  console.log(response.data);

  let iconElement = document.querySelector("#icon");
  if (response.data.weather[0].icon === "01d") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1163/1163662.png"
    );
  }
  if (response.data.weather[0].icon === "01n") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/581/581601.png"
    );
  }

  if (response.data.weather[0].icon === "02d") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146856.png"
    );
  }
  if (response.data.weather[0].icon === "02n") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146900.png"
    );
  }
  if (
    response.data.weather[0].icon === "03d" ||
    response.data.weather[0].icon === "03n"
  ) {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146880.png"
    );
  }
  if (
    response.data.weather[0].icon === "04d" ||
    response.data.weather[0].icon === "04n"
  ) {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146881.png"
    );
  }
  if (
    response.data.weather[0].icon === "09d" ||
    response.data.weather[0].icon === "09n"
  ) {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146858.png"
    );
  }
  if (response.data.weather[0].icon === "10d") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146915.png"
    );
  }
  if (response.data.weather[0].icon === "10n") {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/5903/5903792.png"
    );
  }
  if (
    response.data.weather[0].icon === "11d" ||
    response.data.weather[0].icon === "11n"
  ) {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146861.png"
    );
  }
  if (
    response.data.weather[0].icon === "13d" ||
    response.data.weather[0].icon === "13n"
  ) {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/1146/1146899.png"
    );
  }
  if (
    response.data.weather[0].icon === "50d" ||
    response.data.weather[0].icon === "50n"
  ) {
    iconElement.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/305/305834.png"
    );
  }
  // iconElement.setAttribute(
  //   "src",
  //   `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  // );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
