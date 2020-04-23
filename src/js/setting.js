import * as ani from './animation';

const $settingBtn = document.querySelector('.setting-sec > i');
const $settingBox = document.querySelector('.setting-list');
const $toggleClock = document.getElementById('clock');
const $toggleTodo = document.getElementById('todo');
const $toggleSearch = document.getElementById('search');
const $toggleWeather = document.getElementById('weather');
const $toggleQuote = document.getElementById('quote');
const $digitalSection = document.querySelector('.digital-clock');
const $analogSection = document.querySelector('.analog-clock');

const openSettingBox = settingbox => {
  ani.fadeIn(settingbox, 150)
};

const closeSettingBox = settingbox => {
  ani.fadeOut(settingbox, 150)
};

$settingBtn.onclick = () => {
  $settingBtn.classList.toggle('clicked');
  const settingBoxCs = window.getComputedStyle($settingBox);
  const settingOnOff = settingBoxCs.getPropertyValue('display');
  settingOnOff === 'none' ? openSettingBox($settingBox) : closeSettingBox($settingBox);
};

$toggleClock.onchange = () => {
  const digitalCs = window.getComputedStyle($digitalSection);
  const analogCs = window.getComputedStyle($analogSection);
  const digitalToggle = digitalCs.getPropertyValue('display');
  const analogToggle = analogCs.getPropertyValue('display');
  if (digitalToggle === 'block' && analogToggle === 'none') {
    ani.fadeOut($digitalSection, 300);
    setTimeout(() => {
      ani.fadeIn($analogSection, 300);
    }, 300);
  }
  if (analogToggle === 'block' && digitalToggle === 'none') {
    ani.fadeOut($analogSection, 300);
    setTimeout(() => {
      ani.fadeIn($digitalSection, 300);
    }, 300);
  }
};

const $todolistSection = document.querySelector('.todolist-sec');
$toggleTodo.onchange = () => {
  const todolistCs = window.getComputedStyle($todolistSection);
  const todoToggle = todolistCs.getPropertyValue('display');
  if (todoToggle === 'block') ani.fadeOut($todolistSection, 300);
  if (todoToggle === 'none') {
    $todolistSection.lastElementChild.classList.remove('fade-in');
    ani.fadeIn($todolistSection, 300);
  }
};

const $searchSection = document.querySelector('.search-sec');
const $searchInput = document.querySelector('.search-area');
$toggleSearch.onchange = () => {
  const searchCs = window.getComputedStyle($searchSection);
  const searchToggle = searchCs.getPropertyValue('display');
  if (searchToggle === 'flex') ani.fadeOut($searchSection, 300);
  if (searchToggle === 'none') {
    $searchSection.lastElementChild.classList.remove('fade-in');
    ani.fadeIn($searchSection, 300);
    $searchInput.value = '';
  }
};

const $weatherSection = document.querySelector('.weather-sec');
$toggleWeather.onchange = () => {
  const weatherCs = window.getComputedStyle($weatherSection);
  const weatherToggle = weatherCs.getPropertyValue('display');
  if (weatherToggle === 'block') ani.fadeOut($weatherSection, 300);
  if (weatherToggle === 'none') {
    $weatherSection.lastElementChild.classList.remove('fade-in');
    ani.fadeIn($weatherSection, 300);
  }
};

const $quoteSection = document.querySelector('.quote-sec');
$toggleQuote.onchange = () => {
  const quoteCs = window.getComputedStyle($quoteSection);
  const quoteToggle = quoteCs.getPropertyValue('display');
  quoteToggle === 'flex' ? ani.fadeOut($quoteSection, 300) : ani.fadeIn($quoteSection, 300); 
};
