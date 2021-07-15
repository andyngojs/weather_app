const APPID = "a6bd6008fdc2e15b4a23cd33828fd8bd";
const DEFAULT_VALUE = "--";

const WEATHER_DATA_KEY = "WEATHER_DATA_LOCAL";

const $ = document.querySelector.bind(document);

const searchInput = $("#search-input");
const cityName = $(".city-name");
const weatherState = $(".weather-state");
const weatherIcon = $(".weather-icon");
const temperature = $(".temperature");

const sunrise = $(".sunrise");
const sunset = $(".sunset");
const humidity = $(".humidity");
const windSpeed = $(".wind-speed");

searchInput.addEventListener("change", (e) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APPID}&units=metric&lang=vi`
  ).then(async (res) => {
    const data = await res.json();
    const srcIcon = data.weather[0].icon;

    cityName.innerHTML = data.name || DEFAULT_VALUE;
    setConfig("cityName", data.name);

    weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
    setConfig("weatherState", data.weather[0].description);

    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${srcIcon}@2x.png`
    );
    setConfig("icon", `http://openweathermap.org/img/wn/${srcIcon}@2x.png`);

    temperature.innerHTML = Math.floor(data.main.temp) || DEFAULT_VALUE;
    setConfig("temp", Math.floor(data.main.temp));

    sunrise.innerHTML =
      moment.unix(data.sys.sunrise).format("H:mm") || DEFAULT_VALUE;
    setConfig("sunrise", moment.unix(data.sys.sunrise).format("H:mm"));

    sunset.innerHTML =
      moment.unix(data.sys.sunset).format("H:mm") || DEFAULT_VALUE;
    setConfig("sunrise", moment.unix(data.sys.sunset).format("H:mm"));

    humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
    windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;

    setConfig("humidity", data.main.humidity);
    setConfig("windSpeed", data.wind.speed);
  });
});

const config = JSON.parse(localStorage.getItem(WEATHER_DATA_KEY)) || {};

console.log(config.cityName);

function setConfig(key, value) {
  config[key] = value;
  localStorage.setItem(WEATHER_DATA_KEY, JSON.stringify(config));
}
