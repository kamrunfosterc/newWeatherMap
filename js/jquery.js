$.get("http://api.openweathermap.org/data/2.5/weather",{
    APPID:OPEN_WEATHER_API_KEY,
    q: "San Antonio, US"
});

$.get("http://api.openweathermap.org/data/2.5/weather", {
    APPID: OPEN_WEATHER_API_KEY,
    q:     "San Antonio, US"
}).done(function(data) {
    console.log(data);
});

// {
//     "coord": {
//     "lon": -98.49,
//         "lat": 29.42
// },
//     "sys": {
//     "type": 3,
//         "id": 60540,
//         "message": 0.008,
//         "country": "United States of America",
//         "sunrise": 1425473734,
//         "sunset": 1425515734
// },
//     "weather": [{
//     "id": 804,
//     "main": "Clouds",
//     "description": "overcast clouds",
//     "icon": "04n"
// }],
//     "base": "cmc stations",
//     "main": {
//     "temp": 287.55,
//         "humidity": 95,
//         "pressure": 1013.102,
//         "temp_min": 287.55,
//         "temp_max": 287.55
// },
//     "wind": {
//     "speed": 2.12,
//         "deg": 178.5
// },
//     "rain": {
//     "3h": 0
// },
//     "clouds": {
//     "all": 92
// },
//     "dt": 1425430669,
//     "id": 4726206,
//     "name": "San Antonio",
//     "cod": 200
// }