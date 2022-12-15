var APIKey ='63d64bea4f5e8205dae8e60d2ba0af05';
var cityInputEl = document.getElementById("city");
var searchBtn = document.getElementById("searchbtn");
var currentWeatherContainerEl = document.querySelector('#current-weather');
var forecastContainerEl = document.querySelector('#forecast'); 
var historyContainerEl = document.querySelector("#history");
var searchedCities = document.querySelector(".search-history");
var cityName = cityInputEl.value.trim();
var searchHistory;
    if(JSON.parse(localStorage.getItem("history")) != null)
    searchHistory = JSON.parse(localStorage.getItem("history"));
    else    
    searchHistory = [];

var historybutton = document.createElement("button");


var saveSearch= function(){
    var cityName = cityInputEl.value.trim();

    if(!searchHistory.includes(cityName)){
        searchHistory.push(cityName);
        localStorage.setItem("history", JSON.stringify(searchHistory))
    }
}

var renderSearch = function(){
    searchHistory.forEach(cityName => {
    var item = document.createElement('li')
    item.classList.add("list-group-item")
    item.textContent = cityName
    item.addEventListener('click', clickableLists)
    searchedCities.appendChild(item)
})}

var clearSearch = function(){
    forecastContainerEl.innerHTML='';
    searchedCities.innerHTML='';

}

function clickableLists(event) {
    const City = event.target.textContent;
    let cards = document.querySelectorAll('.card-body');
    for (i = 0; i < cards.length; i++) {
        cards[i].innerHTML = '';
        forecastContainerEl.innerHTML='';
    }
    getWeather(City);
    getForecast(City);
}

renderSearch();

var SearchHandler = function (event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();

    if (cityName !=="") {
      getWeather(cityName);
      getForecast(cityName);
      clearSearch();
      saveSearch();
      renderSearch();
      

    } else {
      alert('Please enter a valid city name');
    }
  }


function getWeather(cityName) {
    //var cityName = cityInputEl.value.trim();
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
        container.className = "card bg-light";

        var card = document.createElement("div");
        card.className = "card-body";

        var temperature = document.createElement("p");
        temperature.className = "card-text";
        temperature.textContent = "Temperature: " + data.main.temp + "°F";

        var windSpeed = document.createElement("p");
        windSpeed.className = "card-text";
        windSpeed.textContent = "Wind Speed: " + data.wind.speed + "mph";

        var humidity = document.createElement("p");
        humidity.className = "card-text";
        humidity.textContent = "Humidity: " + data.main.humidity + "%";

       

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



    function getForecast(cityName) {
        //var cityName = cityInputEl.value.trim();
        var weatherQueryurl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

        fetch(weatherQueryurl)

        .then(function (response) {
            return response.json();
        })
    
        .then(function (data) {
            var lat =data.coord.lat
            var lon = data.coord.lon
            var forecastQueryurl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
    
    
            fetch(forecastQueryurl)
        
            .then(function (response) {
                return response.json();
            })
        
            .then(function (data) {for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.includes("12:00:00")) {
                var cards = document.createElement('div');

                var cardContainer = document.createElement('div');
                cardContainer.className = "card bg-primary text-white";

                var card = document.createElement('div');
                card.className = "card-body p-2";

               var cardHeader = document.createElement('h3');
                cardHeader.className = "card-title";
                cardHeader.textContent =  dayjs(data.list[i].dt_txt).format("MMM, DD, YYYY");

                var temperature = document.createElement('p');
                temperature.className = "card-text"
                temperature.textContent = "Temperature : " + data.list[i].main.temp_max + "°F";


                var wind = document.createElement('p');
                wind.className = "card-text";
                wind.textContent = "Wind Speed: " + data.list[i].wind.speed + "MPH";

                var humidity = document.createElement('p');
                humidity.className = "card-text"
                humidity.textContent = "Humidity : " + data.list[i].main.humidity + "%";

                
                var icon = document.createElement('img');
                icon.setAttribute('src', `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`);

                card.appendChild(cardHeader);
                card.appendChild(icon);
                card.appendChild(temperature);
                card.appendChild(wind);
                card.appendChild(humidity);
                cardContainer.appendChild(card);
                cards.appendChild(cardContainer);
                forecastContainerEl.appendChild(cardContainer);
            
            }}})})


        }
            



searchBtn.addEventListener('click', SearchHandler);