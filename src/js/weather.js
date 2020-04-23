import * as ani from './animation';

// DOMs
const $container = document.querySelector('.container');
const $weatherMain = document.querySelector('.weather-main');
const $weatherBox = document.querySelector('.weather-box');
const $boxTop = document.querySelector('.box-top');
const $weeklyDay = document.querySelector('.weekly-day');
const $weeklyIcon = document.querySelector('.weekly-i');
const $weeklyTemp = document.querySelector('.weekly-temp');

// toggle weather box
const openWeatherBox = weatherbox => {
  ani.fadeIn(weatherbox, 150);
};

const closeWeatherBox = weatherbox => {
  ani.fadeOut(weatherbox, 150);
};

$weatherMain.onclick = () => {
  const weatherBoxCs = window.getComputedStyle($weatherBox);
  const weatherOnOff = weatherBoxCs.getPropertyValue('display');
  weatherOnOff === 'none' ? openWeatherBox($weatherBox) : closeWeatherBox($weatherBox);
};

// Weather API
const API_KEY = 'bbcad54aeb4d627c3798f0773d883830';

// generateNum
const getRandomNum = (num1, num2) => {
  const min = Math.ceil(num1);
  const max = Math.floor(num2);
  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  console.log(randomNum);
  return randomNum;
};

// Background Image Rendering
const bgRender = res => {
  const [{ id: currentId }] = res.current.weather;
  console.log('[currentId]', currentId);
  // clouds
  if (currentId >= 200 && currentId < 300) $container.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../asset/images/clouds/${getRandomNum(25, 29)}.jpg)`;
  // cloud-sun
  if (currentId >= 300 && currentId < 400) $container.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../asset/images/cloud-sun/${getRandomNum(14, 25)}.jpg)`;
  // rain
  if (currentId >= 500 && currentId < 700) $container.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../asset/images/rain/${getRandomNum(29, 33)}.jpg)`;
  // clouds
  if (currentId >= 700 && currentId < 800) $container.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../asset/images/clouds/${getRandomNum(25, 29)}.jpg)`;
  // sun
  if (currentId === 800) $container.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../asset/images/sun/${getRandomNum(0, 14)}.jpg)`;
  // cloud-sun
  if (currentId > 800) $container.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../asset/images/cloud-sun/${getRandomNum(14, 25)}.jpg)`;
};

// Weather Infomation Rendering
const weatherRender = res => {
  const [continent, city] = res.timezone.split('/');
  const temperature = Math.floor(res.current.temp);
  const [{ id: currentId, description }] = res.current.weather;
  const weeklyId = res.daily.map(day => day.weather.reduce((acc, dayW) => (acc + dayW.id), 0));
  const weeklyTemp = res.daily.map(day => [Math.floor(day.temp.min), Math.floor(day.temp.max)]);
  const dayName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  let currentIcon = '';
  if (currentId >= 200 && currentId < 300) currentIcon = 'icon-clouds';
  if (currentId >= 300 && currentId < 400) currentIcon = 'icon-cloud-sun';
  if (currentId >= 500 && currentId < 700) currentIcon = 'icon-rain';
  if (currentId >= 700 && currentId < 800) currentIcon = 'icon-clouds';
  if (currentId === 800) currentIcon = 'icon-sun';
  if (currentId > 800) currentIcon = 'icon-cloud-sun';

  $weatherMain.innerHTML = `
    <i class="${currentIcon}"></i>
    <span class="main-temp">${temperature}</span>
    <i class="icon-celcius main-celcius"></i>
    <div class="main-location">${city}, ${continent}</div>
  `;

  $boxTop.innerHTML = `
    <div class="box-location">${city}, ${continent}</div>
    <div class="box-state">${description}</div>
    <i class="${currentIcon} box-i"></i>
    <span class="box-temp">${temperature}</span>
    <i class="icon-celcius box-celcius"></i>
  `;

  dayName.forEach((_, i, arr) => {
    const today = new Date();
    $weeklyDay.innerHTML += `<span>${arr[(today.getDay() + i) % 7]}</span>`;
  });

  let weeklyIcon = '';
  weeklyId.forEach(dailyId => {
    if (dailyId >= 200 && dailyId < 300) weeklyIcon = 'icon-clouds';
    if (dailyId >= 300 && dailyId < 400) weeklyIcon = 'icon-cloud-sun';
    if (dailyId >= 500 && dailyId < 700) weeklyIcon = 'icon-rain';
    if (dailyId >= 700 && dailyId < 800) weeklyIcon = 'icon-clouds';
    if (dailyId === 800) weeklyIcon = 'icon-sun';
    if (dailyId > 800) weeklyIcon = 'icon-cloud-sun';
    $weeklyIcon.innerHTML += `<i class="${weeklyIcon}"></i>`;
  });

  weeklyTemp.forEach(([min, max]) => {
    $weeklyTemp.innerHTML += `
      <div>
        <span>${max}</span>
        <span>${min}</span>
      </div>
    `;
  });

  $weeklyIcon.removeChild($weeklyIcon.lastElementChild);
  $weeklyTemp.removeChild($weeklyTemp.lastElementChild);
  bgRender(res);
};

// Get weather Object
const getWeather = (lat, lng) => {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(res => {
      weatherRender(res);
    });
};

// Get Coordinate
const succesLocation = position => {
  console.log(position);
  console.log('succes position available');
  const { latitude, longitude } = position.coords;
  getWeather(latitude, longitude);
};

const errorLocation = () => {
  console.log('Sorry, no position available.');
};

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(succesLocation, errorLocation);
};

const weatherInit = () => {
  getLocation();
};

weatherInit();

export {
  openWeatherBox,
  closeWeatherBox,
  weatherInit,
  getLocation,
  succesLocation,
  errorLocation,
  getWeather,
  weatherRender,
  bgRender
};
