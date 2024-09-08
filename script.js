const placeName = document.querySelector(".placeName");
const latitude = document.querySelector(".latitude");
const longitude = document.querySelector(".longitude");
const temperature = document.querySelector(".temperature");
const desc = document.querySelector(".desc");
const feelsliketemp = document.querySelector(".feelsliketemp");
const wind = document.querySelector(".wind");
const wdir = document.querySelector(".wdir");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility");
const clouds = document.querySelector(".clouds");
const date1 = document.querySelector(".date1");
const temp1 = document.querySelector(".temp1");
const text1 = document.querySelector(".text1");
const icon1 = document.querySelector(".icon1");
const date2 = document.querySelector(".date2");
const temp2 = document.querySelector(".temp2");
const text2 = document.querySelector(".text2");
const icon2 = document.querySelector(".icon2");
const date3 = document.querySelector(".date3");
const temp3 = document.querySelector(".temp3");
const text3 = document.querySelector(".text3");
const icon3 = document.querySelector(".icon3");

// Set an interval to update the background image based on the current hour every 60 seconds
setInterval(() => {
  let currTime = new Date();
  let currHours = currTime.getHours();
  changeBackground(currHours);
}, 60000);
// Function to change the background image based on the current hour
function changeBackground(currHours) {
  console.log(currHours);
  let body = document.querySelector("body");
  if (currHours >= 5 && currHours <= 10) {
    body.style.backgroundImage = "url(assets/morning.jpg)";
  } else if (currHours >= 11 && currHours <= 15) {
    body.style.backgroundImage = "url(assets/afternoon.jpeg)";
  } else if (currHours >= 16 && currHours <= 18) {
    body.style.backgroundImage = "url(assets/evening.webp)";
  } else {
    body.style.backgroundImage = "url(assets/night.jpg)";
  }
  body.style.backgroundSize = "cover";
}
// Initial call to set the background image based on the current hour
changeBackground(new Date().getHours());


//To get Location
let lat, lon;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log("Latitude: " + lat + ", Longitude: " + lon);
    let url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat}%2C${lon}`;
    getWeatherInfo(url);
  }, function(error) {
    console.log("Error occurred. Error code: " + error.code);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}

//Get Weather Information
let getWeatherInfo = async (url) =>{
  
  const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '5bae2b20b3mshfa5923da98afd77p138521jsnce7c2c61fc0e',
		'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
	}
};
try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
  placeName.textContent = result.location.name+", "+result.location.region+", "+result.location.country;
  longitude.textContent = result.location.lon;
  latitude.textContent = result.location.lat;
  temperature.textContent = result.current.temp_c;
  desc.textContent = result.current.condition.text;
  feelsliketemp.textContent = result.current.feelslike_c;
  wind.textContent = result.current.wind_kph;
  wdir.textContent = result.current.wind_dir;

  pressure.textContent = result.current.pressure_mb;
  humidity.textContent = result.current.humidity;
  visibility.textContent = result.current.vis_km;
  clouds.textContent = result.current.cloud;
  let url2 = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${result.location.name}&days=3`;
  getWeatherForecast(url2);
} catch (error) {
	console.error(error);
}
};
let getWeatherForecast= async(url)=>{
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '5bae2b20b3mshfa5923da98afd77p138521jsnce7c2c61fc0e',
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    date1.textContent = await result.forecast.forecastday[0].date;
    temp1.textContent = await result.forecast.forecastday[0].day.avgtemp_c + "° C";
    text1.textContent = await result.forecast.forecastday[0].day.condition.text;
    icon1.src = await result.forecast.forecastday[0].day.condition.icon;

    date2.textContent = await result.forecast.forecastday[1].date;
    temp2.textContent = await result.forecast.forecastday[1].day.avgtemp_c + "° C";
    text2.textContent = await result.forecast.forecastday[1].day.condition.text;
    icon2.src = await result.forecast.forecastday[1].day.condition.icon;

    date3.textContent = await result.forecast.forecastday[2].date;
    temp3.textContent = await result.forecast.forecastday[2].day.avgtemp_c + "° C";
    text3.textContent = await result.forecast.forecastday[2].day.condition.text;
    icon3.src = await result.forecast.forecastday[2].day.condition.icon;
    console.log(result.forecast);
  } catch (error) {
    console.error(error);
  }
}
const searchBtn = document.querySelector(".searchBtn");
let city = "";
let result;
searchBtn.addEventListener('click',()=>{
  const search = document.querySelector(".search");
  city = search.value;
  let url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
  getWeatherInfo(url);
});

// Thought of the day
async function findThought() {
  const urlThought = "https://thought-of-the-day.p.rapidapi.com/thought";
  const optionsThought = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "5bae2b20b3mshfa5923da98afd77p138521jsnce7c2c61fc0e",
      "x-rapidapi-host": "thought-of-the-day.p.rapidapi.com",
    },
  };

  try {
    const thought = await fetch(urlThought, optionsThought);
    const resultThought = await thought.json();
    const quote = document.querySelector(".quote");
    quote.textContent = resultThought.data;
    console.log(resultThought.data);
  } catch (error) {
    console.error(error);
  }
}
findThought();


