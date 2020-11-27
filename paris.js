const apiKey = "e67cf100b2dea20b1cb1d453505d5859";
const url = "https://api.openweathermap.org/data/2.5/weather";
const city = "Paris";
const unit = "metric";

const requestURL = url.concat("?q",city,"&appid=",apiKey,"&units=",unit)
fetch(requestURL)
  .then(response => response.json())
  .then(data => console.log(data));