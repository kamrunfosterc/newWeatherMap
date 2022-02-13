'use strict'


$(document).ready(function (){
    let long = -98.4916; //default longitude
    let lati = 29.4252; // default latitude

    mapboxgl.accessToken = MAP_BOX_API_KEY;
})



//TODO THIS IS from previous Version

// https://api.openweathermap.org/data/2.5/onecall?
// lat={lat}&lon={lon}&exclude={part}&appid={API key}
var weatherOptions = {
    appid: OPEN_WEATHER_API_KEY,
    lat: "",// will add later, until then will get error
    lon: "",// will add later, until then will get error
    exclude: "",// will add later, until then will get error
    units: "imperial",
}
var weatherURL = `https://api.openweathermap.org/data/2.5/onecall`
// var map = new mapboxgl.Map({// initial load out location
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v9',
//     zoom: 14,//zoom: 15, zoom: 20, zoom: 10,
//     center: [-98.4916, 29.4252]// san antonio
// });

$(document).ready(function (data) {
    console.log(data);// produces array of object
    // mapboxgl.accessToken = mapboxAPIKey;
    $.get(weatherURL, weatherOptions);
    $.get(`.card`).html()
})






//TODO ********** ************** Weather JS Mid Section ************ ***************

$(document).ready(function () {
    var long = -98.4916;//default longitude
    var lati = 29.4252;//default latitude

    //Map.setCenter(coordinates) play
    mapboxgl.accessToken = mapboxAPIKey;
    var map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [long, lati], // starting position [lng, lat] [-98.4916, 29.4252]
        zoom: 14 // starting zoom
    });

    var marker = new mapboxgl.Marker()// fixed marker set
        .setLngLat([long, lati])// san antonio marker
        .addTo(map);


//TODO ********** ************** Weather JS Bottom Section ************ ***************

var weatherOptions = {
    appid: OPEN_WEATHER_API_KEY,
    lat: lati,
    lon: long,
    units: "imperial",
}
var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?`//? is a query operator
// var weatherIcon = `http://openweathermap.org/img/wn/10d@2x.png`;
// mapboxgl.accessToken = OPEN_WEATHER_API_KEY;// conflicting entries,
weatherData()// does initial run of function

//  function will display 5day forecast and info in each card dynamically
function weatherData() {
    $.get(weatherURL, weatherOptions).done(function (data) {
        // console.log(data.daily);
        $(".card-deck").empty();// will start new card-deck each time we run/ search for new location vs continuous stacking it

        data.daily.forEach(function (day, index) {//index creates one for each element like or i in fori
            console.log(day);
            if (index < 5) {
                // var iconCode = day.weather[0].icon;
                // var weatherIcon = `http://openweathermap.org/img/wn/10d@2x/.png`;

                var date = new Date((day.dt)*1000).toDateString();// date conversion part numerically then to a string

                var html = "";// as we loop through we add to html starting with this empty string
                html = `<div class="card" style="width: 18rem;"> 
                                  <div class="card-header">
                                    <strong>${date}</strong><!--need to convert-->
                                  </div>
                                  <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                    High ${day.temp.max}/Low ${day.temp.min}
                                    <img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="weather indicator">
                                    </li>
                                    <li class="list-group-item"><strong>Description:</strong> ${day.weather[0].description}</li>
                                    <li class="list-group-item"><strong>Humidity:</strong> ${day.humidity}</li>
                                    <li class="list-group-item"><strong>Wind:</strong> ${day.wind_speed}mph</li>
                                    <li class="list-group-item"><strong>Pressure:</strong> ${day.pressure}hPa</li>
                                  </ul>                        
                            </div>`// section covers adding to html our bootstrap cards
                //${} tells to put in dynamic data, variable, property anything

                $(".card-deck").append(html);// adds card into our html for display on site using specified id
            }
        })
    });// used to get weather data from api
}


