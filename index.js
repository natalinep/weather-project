// Change the current Day and Time
// -------------------------------

function zero(value) {
  if (value < 10) {
    value = "0" + value;
  }
  return value;
}
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date();
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = zero(now.getMinutes());

  return day + " " + hours + ":" + minutes;
}

document.querySelector(".time").innerHTML = formatDate();

// Change the Temperature using API
// --------------------------------
var apiKey = "3f08bfa61b58c72a1282fd754e1f43b2";

function showTemperature(response) {
  let currentTemp = document.querySelector(".temperature");
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data);
  currentTemp.innerHTML = temperature + "°C";

  let infoFeels = document.querySelector(".info__feels");
  let feelsLike = Math.round(response.data.main.feels_like);
  infoFeels.innerHTML = "Feels like: " + feelsLike + "°C";

  let infoHumidity = document.querySelector(".humidity");
  let humidity = Math.round(response.data.main.humidity);
  infoHumidity.innerHTML = "Humidity: " + humidity + "%";

  let infoWind = document.querySelector(".info__wind");
  let speed = Math.round(response.data.wind.speed);
  infoWind.innerHTML = "Wind: " + speed + "m/s";

  let condition = document.querySelector(".condition");
  let main = response.data.weather[0].main;
  condition.innerHTML = main;
}

function getApi() {
  let city = document.querySelector(".search__field").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector(".search__field");
  let h1 = document.querySelector(".info__city");
  getApi();

  if (city.value) {
    h1.innerHTML =
      city.value.charAt(0).toUpperCase() + city.value.slice(1).toLowerCase();
  } else {
    alert("Enter a City, please!");
  }
  document.querySelector(".time").innerHTML = formatDate();
}

let form = document.querySelector(".search__button");
form.addEventListener("click", showCity);

// Change the Temperature
// -----------------------

function convertToF(event) {
  event.preventDefault();

  let temToday = document.querySelector(".temperature");
  temToday.innerHTML = Math.floor((9 / 5) * 17 + 32) + "°F";
}

function convertToC(event) {
  event.preventDefault();
  let temToday = document.querySelector(".temperature");
  temToday.innerHTML = Math.floor((5 / 9) * (62.6 - 32)) + "°C";
}

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", convertToF);

let celcius = document.querySelector(".celsius");
celcius.addEventListener("click", convertToC);

// Show Current position
// --------------------

function findPosition(event) {
  event.preventDefault();

  function showWeather(response) {
    let h1 = document.querySelector(".info__city");
    h1.innerHTML = response.data.name;
    showTemperature(response);
  }

  function retrievePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let localBtn = document.querySelector(".search__location");
localBtn.addEventListener("click", findPosition);
