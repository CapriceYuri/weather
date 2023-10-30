"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const clock2 = document.querySelector(".currentTime2");
function updateTime2() {
    const now = new Date();
    let hours = now.getHours().toString();
    let minutes = now.getMinutes().toString();
    let seconds = now.getSeconds().toString();
    let ampm;
    if (+hours >= 12) {
        ampm = "PM";
    }
    else {
        ampm = "AM";
    }
    if (!(+hours % 12)) {
        hours = hours;
    }
    else {
        hours = (+hours % 12).toString();
    }
    if (minutes.length < 2) {
        minutes = `0${minutes}`;
        ;
    }
    if (seconds.length < 2) {
        seconds = `0${seconds}`;
        ;
    }
    // Format the string with leading zeroes
    const clockStr = `${hours}:${minutes}:${seconds} ${ampm}`;
    clock2.innerText = `Current Time: ` + clockStr;
}
updateTime2();
setInterval(updateTime2, 1000);
// MAIN CONTENT
const currentLocation = document.querySelector(".currentLocation");
const currentTemp = document.querySelector(".currentTemp");
const currentTime = document.querySelector(".currentTime");
const refreshBtn = document.querySelector(".refresh");
// Data Entry
const windValue = document.querySelector(".wind-value");
const humidValue = document.querySelector(".humid-value");
const weatherIcon = document.querySelector(".weather-icon");
const apiKey = "077dd367c6a0acb81c8216125b655788";
const lat = "40.7143";
const lon = "-74.006";
const forecast = `http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}`;
function checkWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(forecast + `&appid=${apiKey}`);
        const data = yield response.json();
        console.log(data);
        currentLocation.textContent = data.name;
        currentTemp.textContent = (data.main.temp).toString() + `°F`;
        let timeRightNow = new Date();
        currentTime.textContent = `Last Updated: ` + timeRightNow.toLocaleTimeString();
        windValue.textContent = `${data.wind.speed} mph`;
        humidValue.textContent = `${data.main.humidity}%`;
        weatherIcon.setAttribute("src", `images/${data.weather[0].icon}.png`);
    });
}
checkWeather();
refreshBtn === null || refreshBtn === void 0 ? void 0 : refreshBtn.addEventListener("click", checkWeather);
setInterval(checkWeather, 900000);
