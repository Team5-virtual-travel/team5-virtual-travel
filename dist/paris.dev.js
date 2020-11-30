"use strict";

// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0
// SELECT ELEMENTS
var iconElement = document.querySelector(".weather-icon");
var tempElement = document.querySelector(".temperature-value p");
var descElement = document.querySelector(".temperature-description p");
var locationElement = document.querySelector(".location p");
var notificationElement = document.querySelector(".notification"); // App data

var weather = {};
weather.temperature = {
  unit: "celsius"
}; // APP CONSTS AND VARS

var KELVIN = 273; // API KEY

var key = "82005d27a116c2880c8f0fcb866998a0"; // CHECK IF BROWSER SUPPORTS GEOLOCATION

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
} // SET USER'S POSITION


function setPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  getWeather(latitude, longitude);
} // SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE


function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p> ".concat(error.message, " </p>");
} // GET WEATHER FROM API PROVIDER


function getWeather(latitude, longitude) {
  var api = "http://api.openweathermap.org/data/2.5/weather?lat=".concat(latitude, "&lon=").concat(longitude, "&appid=").concat(key);
  fetch(api).then(function (response) {
    var data = response.json();
    return data;
  }).then(function (data) {
    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
  }).then(function () {
    displayWeather();
  });
} // DISPLAY WEATHER TO UI


function displayWeather() {
  iconElement.innerHTML = "<img src=\"icons/".concat(weather.iconId, ".png\"/>");
  tempElement.innerHTML = "".concat(weather.temperature.value, "\xB0<span>C</span>");
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = "".concat(weather.city, ", ").concat(weather.country);
} // C to F conversion


function celsiusToFahrenheit(temperature) {
  return temperature * 9 / 5 + 32;
} // WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET


tempElement.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius") {
    var fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);
    tempElement.innerHTML = "".concat(fahrenheit, "\xB0<span>F</span>");
    weather.temperature.unit = "fahrenheit";
  } else {
    tempElement.innerHTML = "".concat(weather.temperature.value, "\xB0<span>C</span>");
    weather.temperature.unit = "celsius";
  }
});