// https://api.openweathermap.org/data/2.5/onecall?
// lat={lat}&lon={lon}&exclude={part}&appid={API key}
"use strict"
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

    //CLICK Function assoc w the find button that changes map pos & card info based on that map pos
    // $("#find").keydown('keydown', logkey){
    // }
    $("#find").click(function (e){
        e.preventDefault();
        //need geo code
        // console.log($("#search").val());// .val allows us to accept value being put in any element
        geocode($("#search").val(), mapboxgl.accessToken)
            .then(function (coordinates) {
                long = coordinates[0];
                lati = coordinates[1];
                console.log(coordinates)
                weatherOptions.lat = lati;// making change here to affect var outside of this function
                weatherOptions.lon = long;
                // map.setCenter(coordinates);// ################ chekc this out again
                $(".currentCity").html(`Current City: ${$("#search").val()}`)

                // "current city" + $("#search").val()
                // marker.setLngLat() // this was causing an error with the fly-to call

                // flys to a location vs jumping with this
                map.flyTo({
                    center: [
                        long,
                        lati
                    ],
                    zoom: 10,
                    essential: true
                });
                marker.setLngLat(coordinates)// have to set something inside here to work

                weatherData()// reset after each call
            })
    })

    // reverseGeocode(
    //     {lng: -98.4861, lat: 29.4260}, accessToken).then(function(results) {
    //
    // })




    //
    // var popup = new mapboxgl.Popup()
    //     .setLngLat([-98.4916, 29.4252])// san antonio popup
    //     .setHTML(`<p>WEATHER MAP!</p>`)
    //     .addTo(map);
    //
    // marker.setPopup(popup)// attaches popup to marker
})// end of document

//TODO: think about things in terms of the map & the weather seperately