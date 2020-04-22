import * as ani from './animation';

// search provider
const $searchProvider = document.querySelector('.search-provider');
const $currentBox = document.querySelector('.current-box');
const $currentForm = document.querySelector('.search');

const openSearchProvider = searchProvider => {
  ani.fadeIn(searchProvider, 150);
};

const closeSearchProvider = searchProvider => {
  ani.fadeOut(searchProvider, 150);
};

$currentBox.onclick = () => {
  const providerCs = window.getComputedStyle($searchProvider);
  const providerOnOff = providerCs.getPropertyValue('display');
  providerOnOff === 'none' ? openSearchProvider($searchProvider) : closeSearchProvider($searchProvider);
};

$searchProvider.onclick = e => {
  if (e.target.className === 'youtube') {
    $currentBox.firstElementChild.setAttribute('src', './asset/logo/youtube.png');
    $currentForm.setAttribute('action', 'https://www.youtube.com/results?search_query=');
  }
  if (e.target.className === 'google') {
    $currentBox.firstElementChild.setAttribute('src', './asset/logo/google.ico');
    $currentForm.setAttribute('action', 'https://www.google.com/search?q=')
  }
  if (e.target.className === 'naver') {
    $currentBox.firstElementChild.setAttribute('src', './asset/logo/naver.png');
    $currentForm.setAttribute('action', 'https://search.naver.com/search.naver?query=');
  }
  ani.fadeOut($searchProvider, 150);
};

// todolist button
const openTodoList = todoList => {
  ani.fadeIn(todoList, 150);
};

const closeTodoList = todoList => {
  ani.fadeOut(todoList, 150);
};

const $digitalClock = document.querySelector('.current-time');
const $second = document.querySelector('.second');
const $minute = document.querySelector('.minute');
const $hour = document.querySelector('.hour');
const clock = setInterval(() => {
  const now = new Date();
  let hour = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();
  sec = sec <= 9 ? sec = '0' + sec : sec;
  min = min <= 9 ? min = '0' + min : min;
  hour = hour <= 9 ? hour = '0' + hour : hour;
  // $digitalClock.innerHTML = `${hour}:${min}`
  $hour.style.transform = `rotate(${hour % 12 * 30}deg)`
  $minute.style.transform = `rotate(${min % 60 * 6}deg)`
  $second.style.transform = `rotate(${sec % 60 * 6}deg)`
}, 1000);


export {
  openSearchProvider, 
  closeSearchProvider,
  openTodoList, 
  closeTodoList
};
