const clock2 = document.querySelector(".currentTime2") as HTMLElement;

function updateTime2() {
    const now = new Date();
    let hours = now.getHours().toString();
    let minutes = now.getMinutes().toString();
    let seconds = now.getSeconds().toString();

    let ampm: string;

    if (+hours >= 12) {
        ampm = "PM";
    } else {
        ampm = "AM";
    }

    if (!(+hours % 12)) {
        hours = hours;
    } else {
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

const currentLocation = document.querySelector(".currentLocation") as HTMLLIElement;
const currentTemp = document.querySelector(".currentTemp") as HTMLElement;
const currentTime = document.querySelector(".currentTime") as HTMLElement;
const refreshBtn = document.querySelector(".refresh");

// Data Entry
const windValue = document.querySelector(".wind-value") as HTMLElement;
const humidValue = document.querySelector(".humid-value") as HTMLElement;
const weatherIcon = document.querySelector(".weather-icon") as HTMLElement;

const sunriseT = document.querySelector(".sunrise-time") as HTMLElement;
const sunsetT = document.querySelector(".sunset-time") as HTMLElement;

const apiKey = "077dd367c6a0acb81c8216125b655788";
const lat = "40.7143"
const lon = "-74.006"

const forecast = `http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}`


async function checkWeather() {
    const response = await fetch(forecast + `&appid=${apiKey}`);
    const data = await response.json()

    console.log(data)
    currentLocation.textContent = data.name;
    currentTemp.textContent = (data.main.temp).toString() + `°F`;
    let timeRightNow = new Date();
    currentTime.textContent = `Last Updated: ` + timeRightNow.toLocaleTimeString();

    windValue.textContent = `${data.wind.speed} mph`
    humidValue.textContent = `${data.main.humidity}%`

    weatherIcon.setAttribute("src", `images/${data.weather[0].icon}.png`)

    let sunriseUnix = data.sys.sunrise;
    let tempToJS = new Date(sunriseUnix * 1000);
    let finalized = tempToJS.toLocaleString();

    let sunsetUnix = data.sys.sunset;
    let tempToJS2 = new Date(sunsetUnix * 1000);
    let finalized2 = tempToJS2.toLocaleString();

    sunriseT.textContent = `${finalized.substring(11, 16)} ${finalized.substring(20)}`;
    sunsetT.textContent = `${finalized2.substring(11, 16)} ${finalized.substring(20)}`;
    // sunsetT.textContent = (data.sys.sunset).toLocaleTimeString();
}

checkWeather();
refreshBtn?.addEventListener("click", checkWeather);
setInterval(checkWeather, 900000)
