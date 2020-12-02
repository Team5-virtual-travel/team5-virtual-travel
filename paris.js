// SELECT ELEMENTS
const restaurantsElement = document.querySelector("#restaurants");

/*var latitude = 48.8566;
var longitude = 2.3522;*/

let restaurants = [];


getRestaurants(48.864716, 2.349014);


// GET RESTAURANTS FROM API PROVIDER
function getRestaurants(latitude, longitude) {
    let api = `https://developers.zomato.com/api/v2.1/search?apikey=61bfdd81202a25034b43d924547686cb&start=${10}&count=3&lat=${latitude}&lon=${longitude}&sort=rating`;

    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            console.log(data)
            restaurants = data.restaurants;
        })
        .then(function() {
            displayRestaurants();
        });
}

// DISPLAY RESTAURANTS TO UI
function displayRestaurants() {
    restaurants.map((restaurant) => {
        restaurantsElement.innerHTML = restaurantsElement.innerHTML + `<div class="restaurantcard">
        <div class="fore">
            <img class="image" src="${restaurant.restaurant.featured_image ? restaurant.restaurant.featured_image : "assets/images/restaurant/1.jpg"}" alt="${restaurant.restaurant.name}">
        </div>
        <div class="back">
            <h2 class="title">${restaurant.restaurant.name}</h2>
            <p class="description"> Rating: ${restaurant.restaurant.user_rating.aggregate_rating} from 5</p>
            <p class="description"> ${restaurant.restaurant.user_rating.rating_text} </p>
            <p class="description">Average cost for two: ${restaurant.restaurant.average_cost_for_two} $</p>
            <p class="description">Open from: ${restaurant.restaurant.timings} </p>
            <div class="backcardbtn">
                <a href="${restaurant.restaurant.menu_url}" class="brbtn" target="blank">Menu</a>
                <a href="${restaurant.restaurant.url}" class="brbtn" target="blank">Websit</a>
            </div>
        </div>
    </div>`
    }).join("")
}