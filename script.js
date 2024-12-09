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

//We have Set an interval to update the background image based on the current hour every 60 seconds
setInterval(() => {
  let currTime = new Date();
  let currHours = currTime.getHours();
  changeBackground(currHours);
}, 60000);

// this function is used to change the background image based on the current hour
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
    let url = `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lon}`;
    // getWeatherInfo(url);
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
      'x-rapidapi-key': 'f7dc614926msh90cfc1454493b1fp188b93jsna7c2f23998f6',
		'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
    }
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    placeName.textContent = result.name+","+result.sys.country;
    longitude.textContent = result.coord.lon;
    latitude.textContent = result.coord.lat;
    temperature.textContent = (result.main.temp-273).toFixed(2);
    desc.textContent = result.weather[0].description;
    feelsliketemp.textContent = (result.main.feels_like-273.15).toFixed(2);
    wind.textContent = result.wind.speed;
    // wdir.textContent = result.current.wind_dir;
    pressure.textContent = result.main.pressure;
    humidity.textContent = result.main.humidity;
    visibility.textContent = result.visibility;
    clouds.textContent = result.clouds.all;
    let url2 = `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${result.coord.lon}/${result.coord.lat}`;
    getWeatherForecast(url2);
  } 
  catch (error) {
	  console.error(error);
  }
};
let getWeatherForecast= async(url)=>{
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'f7dc614926msh90cfc1454493b1fp188b93jsna7c2f23998f6',
		'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    date1.textContent = new Date(result.list[8].dt_txt).toLocaleDateString();
    temp1.textContent = await ((282-result.list[8].main.temp).toFixed(2)-20);
    text1.textContent = await result.list[8].weather[0].description;
    let iconCode = await result.list[22].weather[0].icon;
    icon1.src=`https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    date2.textContent = new Date(result.list[15].dt_txt).toLocaleDateString();
    temp2.textContent = await ((282-result.list[15].main.temp).toFixed(2)-20);
    text2.textContent = await result.list[15].weather[0].description;
    let iconCode2 = await result.list[22].weather[0].icon;
    icon2.src=`https://openweathermap.org/img/wn/${iconCode2}@2x.png`;

    date3.textContent = new Date(result.list[22].dt_txt).toLocaleDateString();
    temp3.textContent = await ((282-result.list[22].main.temp).toFixed(2)-20);
    text3.textContent = await result.list[22].weather[0].description;
    let iconCode3 = await result.list[22].weather[0].icon;
    icon3.src=`https://openweathermap.org/img/wn/${iconCode3}@2x.png`;
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
  let url = `https://open-weather13.p.rapidapi.com/city/${city}/EN`;
  getWeatherInfo2(url);
});

let getWeatherInfo2 = async (url) =>{
  
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'f7dc614926msh90cfc1454493b1fp188b93jsna7c2f23998f6',
		'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
    }
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    placeName.textContent = result.name+","+result.sys.country;
    longitude.textContent = result.coord.lon;
    latitude.textContent = result.coord.lat;
    temperature.textContent = (((result.main.temp-32)*5)/9).toFixed(2);
    desc.textContent = result.weather[0].description;
    feelsliketemp.textContent = (((result.main.feels_like-32)*5)/9).toFixed(2);
    wind.textContent = result.wind.speed;
    // wdir.textContent = result.current.wind_dir;
    pressure.textContent = result.main.pressure;
    humidity.textContent = result.main.humidity;
    visibility.textContent = result.visibility;
    clouds.textContent = result.clouds.all;
    let url2 = `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${result.coord.lon}/${result.coord.lat}`;
    getWeatherForecast(url2);
  } 
  catch (error) {
	  console.error(error);
  }
};
// Thought of the day