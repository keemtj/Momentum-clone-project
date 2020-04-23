import * as ani from './animation';

const $settingBtn = document.querySelector('.setting-sec > i');
const $settingBox = document.querySelector('.setting-list');

const openSettingBox = settingbox => {
  ani.fadeIn(settingbox, 150)
};

const closeSettingBox = settingbox => {
  ani.fadeOut(settingbox, 150)
};

$settingBtn.onclick = () => {
  const settingBoxCs = window.getComputedStyle($settingBox);
  const settingOnOff = settingBoxCs.getPropertyValue('display');
  console.log(settingOnOff);
  settingOnOff === 'none' ? openSettingBox($settingBox) : closeSettingBox($settingBox);
};

const $toggleClock = document.getElementById('clock');
const $toggleTodo = document.getElementById('todo');
const $toggleSearch = document.getElementById('search');
const $toggleWeather = document.getElementById('weather');
const $toggleQuote = document.getElementById('quote');

const $todolistSection = document.querySelector('.todolist-sec');
$toggleTodo.onchange = () => {
  const todolistCs = window.getComputedStyle($todolistSection);
  const todoToggle = todolistCs.getPropertyValue('display');
  if (todoToggle === 'block') ani.fadeOut($todolistSection, 300);
  if (todoToggle === 'none') {
    $todolistSection.lastElementChild.classList.remove('fade-in');
    ani.fadeIn($todolistSection, 300);
  }
  // todoToggle === 'block' ? ani.fadeOut($todolistSection, 300) : ani.fadeIn($todolistSection, 300);
};

const $searchSection = document.querySelector('.search-sec');
$toggleSearch.onchange = ({ target }) => {
  console.log('[target]: ', target);
  
  console.log('[search.checked]: ', target.checked);
  
  const searchCs = window.getComputedStyle($searchSection);
  const searchToggle = searchCs.getPropertyValue('display');
  searchToggle === 'flex' ? ani.fadeOut($searchSection, 300) : ani.fadeIn($searchSection, 300); 
};

const $weatherSection = document.querySelector('.weather-sec');
$toggleWeather.onchange = () => {
  const weatherCs = window.getComputedStyle($weatherSection);
  const weatherToggle = weatherCs.getPropertyValue('display');
  weatherToggle === 'block' ? ani.fadeOut($weatherSection, 300) : ani.fadeIn($weatherSection, 300); 
};

const $quoteSection = document.querySelector('.quote-sec');
$toggleQuote.onchange = () => {
  const quoteCs = window.getComputedStyle($quoteSection);
  const quoteToggle = quoteCs.getPropertyValue('display');
  quoteToggle === 'flex' ? ani.fadeOut($quoteSection, 300) : ani.fadeIn($quoteSection, 300); 
};
