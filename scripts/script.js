let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateTime() {
  let now = new Date();
  let currentDay = days[now.getDay()];
  let today = document.getElementById("todays-day");
  today.innerHTML = currentDay;

  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();
  let hoursElement = document.getElementById("hours");
  let minutesElement = document.getElementById("minutes");

  if (currentMinute < 10) {
    currentMinute = "0" + currentMinute;
  }
  minutesElement.innerHTML = currentMinute;
  hoursElement.innerHTML = currentHour;
}

updateTime();
setInterval(updateTime, 1000);

let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=b9aaeaaf97004f2a03afob830bt63baf&units=imperial`;

function displayWeather(response) {
  console.log(response.data);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  temperatureElement.style.display = "inline";

  let degreeElement = document.querySelector(".degree");
  degreeElement.style.display = "inline";

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.src = response.data.condition.icon_url;
}

function getWeather(city) {
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=b9aaeaaf97004f2a03afob830bt63baf&units=imperial`;
  axios
    .get(url)
    .then(displayWeather)
    .catch(function (error) {
      console.error("Error fetching the weather data:", error);
    });
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".city").value;
  let capitalizedCity = capitalizeFirstLetter(cityInput);
  let currentCity = document.querySelector("h1.current-city");
  currentCity.innerHTML = capitalizedCity;

  getWeather(cityInput);
}

let searchForm = document.querySelector(".form");
searchForm.addEventListener("submit", showCity);
