let temperature = document.getElementById("temperature");
let weatherIcon = document.getElementById("weather-icon");
let weatherDesc = document.getElementById("temperature-description");
let icon = "http"
const apiKey = "501ded678d37ebefab2528afbca1766d";
const url = "http://api.openweathermap.org/data/2.5/weather";
const city = "paris";
const unit = "metric";
const weather = {};
const requestURL = url.concat("?q=",city,"&appid=",apiKey,"&units=",unit)

fetch(requestURL)  
    .then(function (response)
    {
        let data = response.json();
        return data;
    })

        .then(function(data)
        {
            weather.temperature = Math.floor(data.main.temp);
            weather.description = data.weather[0].description;
            weather.icon = data.weather[0].icon;
            
        })
        .then(function ()
        {
            showWeather();
        });

function showWeather()
{
    temperature.innerHTML = `${weather.temperature}°<span>C</span>`;
    weatherIcon.innerHTML = `<img src="icons/${weather.icon}.png"/>`;
    weatherDesc.innerHTML = weather.description;
}
    
    // fetch(requestURL)
    //    .then(response => response.json())

    // .then(data => console.log(data));
    
    // {
    //     let temperature = data.main.temp;

    //     let tempElt = document.getElementById("temperature");
    //     tempElt.innerText = temperature;
    // })
    // .catch(error => {
    //     let errorElt = document.getElementById("error")
    //     errorElt.innerText = "Big problem happened, Sorry :(";
    // });
