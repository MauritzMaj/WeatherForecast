var APIKey ='63d64bea4f5e8205dae8e60d2ba0af05';
var cityInputEl = document.getElementById("city");
var searchBtn = document.getElementById("searchbtn");
var currentWeatherContainerEl = document.querySelector('#current-weather');
var forecastContainerEl = document.querySelector('#forecast'); 
var cityName = cityInputEl.value.trim();



var SearchHandler = function (event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();

    if (cityName !=="") {
      getWeather();
      //getForecast();
      //saveSearch();
      //RenderSearch();

    } else {
      alert('Please enter a valid city name');
    }
  }


function getWeather() {
    var cityName = cityInputEl.value.trim();
    var weatherQueryurl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

    fetch(weatherQueryurl)

    .then(function (response) {
        return response.json();
    })

    .then(function (data) {

        currentWeatherContainerEl.textContent = "";

        var cardHeader = document.createElement("h3");
        cardHeader.className = "card-title";
        cardHeader.textContent = data.name + " - " + dayjs().format('MMM,DD,YYYY')

        var container = document.createElement("div");
        container.className = "card";

        var card = document.createElement("div");
        card.className = "card-body";

        var windSpeed = document.createElement("p");
        windSpeed.className = "card-text";
        windSpeed.textContent = "Wind Speed" + data.wind.speed + "mph";

        var humidity = document.createElement("p");
        humidity.className = "card-text";
        humidity.textContent = "Humidity: " + data.main.humidity + "%";

        var temperature = document.createElement("p");
        temperature.className = "card-text";
        temperature.textContent = "Temperature: " + data.main.temp + "°F";


       

    var imgEl = document.createElement("img");
    var weatherIcon = data.weather[0].icon;
    imgEl.setAttribute("src", "http://openweathermap.org/img/w/" + weatherIcon + ".png");

    cardHeader.appendChild(imgEl);
    card.appendChild(cardHeader);
    card.appendChild(temperature);
    card.appendChild(humidity);
    card.appendChild(windSpeed);
    container.appendChild(card);
    currentWeatherContainerEl.appendChild(container);

    

    })}

    function getForecast() {
    
        var forecastQueryurl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" + APIKey + "&units=imperial";
    
        fetch(forecastQueryurl)
    
        .then(function (response) {
            return response.json();
        })
    
        .then(function (data) {

            

        })}
    /*
    var saveSearch = function (){

    var searchHistory;
    if(JSON.parse(localStorage.getItem("history")) != null)
    searchHistory = JSON.parse(localStorage.getItem("history"));
    else    
    searchHistory = [];

    if(!searchHistory.includes(cityName)){
        searchHistory.push(cityName);
        localStorage.setItem("history", JSON.stringify(searchHistory));

    
    }}

    var RenderSearch = function(){
        searchHistory.forEach(cityName => {

            var historybutton = document.createElement("li");
            historybutton.textContent = cityName;
            document.getElementById("history").appendChild(historybutton);

            historybutton.addEventListener("click", 
            weatherSearch(),
            forecastSearch()
            )

        */





searchBtn.addEventListener('click', SearchHandler);