var container = document.createElement("div");
container.className = "container";

var row = document.createElement("div");
row.classList.add("row", "m-3");

container.append(row);
document.body.append(container);

var res = fetch("https://restcountries.com/v3.1/all");
res
  .then((data) => data.json())
  .then((data1) => {
    foo(data1);
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });

function fetchWeather(countryName) {
  fetch("https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=6e35edc8a5d8227ad77d7d1e146ea317")
    .then((response) => response.json())
    .then((weatherData) => {
      console.log(weatherData);
    })
    .catch((error) => {
      console.log("Error fetching weather data:", error);
    });
}

function foo(data1) {
  for (var i = 0; i < data1.length; i++) {
    var card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card border-primary mb-3 " style="width: 18rem;">
        <img src="${data1[i].flags.svg}" class="card-img-top" alt="country flags">
        <div class="card-body">
          <h5>${data1[i].name.common}</h5>
          <h6>Capital: ${data1[i].capital}</h6>
          <h6>Region: ${data1[i].region}</h6>
          <h6>Country Code: ${data1[i].cca2}</h6>
          <button class="btn btn-primary btn-sm weather-btn" data-country="${data1[i].name.common}">Weather</button>
          <p class="card-text"></p>
        </div>
      </div>
    `;

    row.appendChild(card);
  }

 
  document.querySelectorAll(".weather-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      var countryName = this.getAttribute("data-country");
      fetchWeather(countryName);
    });
  });
}
