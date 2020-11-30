const notificationElement = document.querySelector(".notification")
const iconElement = document.querySelector(".weather-icon")
const Element = document.querySelector(".temperature-value p")
const Element = document.querySelector(".temperature-description p")
const Element = document.querySelector(".location p")

const weather = {
    temperature: {
        value: 18,
        unit: "celsius"
    },
    description: "few clouds",
    iconId: "01d",
    city: "London",
    country: "GB"
};

displayWeather = () => {

    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;

    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;

    iconElement.innerHTML = weather.description;

    iconElement.innerHTML = `${weather.city}, ${weather.country}`;

}

celsiusToFahrenheit = (temperature) => {

    return (temperature * 9 / 5) + 32;

}

tempElement.addEventListener("click", () => {

    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit === "celsius") {

        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);

        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}° <span>F</span>`;

        weather.temperature.unit = "fahrenheit";

    } else {

        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;

        weather.temperature.unit = "celsius";
    }
});

/*getCurrentPosition(setPosition, error);

setPosition(position)
position.coords.latitude
position.coords.longitude

error(error)
error.message*/

if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(setPosition, showError);

} else {

    notificationElement.getElementsByClassName.display = "block";

    notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>"
}


setPosition = (position) => {

    let latitude = position.coords.latitude;

    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

showError = (error) => {

    notificationElement.getElementsByClassName.display = "block";

    notificationElement.innerHTML = `<p> ${error.message} </p>`;

}