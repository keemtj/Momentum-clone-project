import * as ani from './animation';

let setData = {};
let viewData = {};

const $settingBtn = document.querySelector('.setting-sec > i');
const $settingList = document.querySelector('.setting-list');
const $todolistSection = document.querySelector('.todolist-sec');
const $searchSection = document.querySelector('.search-sec');
const $searchInput = document.querySelector('.search-area');
const $weatherSection = document.querySelector('.weather-sec');
const $quoteSection = document.querySelector('.quote-sec');
const $digitalSection = document.querySelector('.digital-clock');
const $analogSection = document.querySelector('.analog-clock');

// setting button Render
const settingRender = () => {
  let setHtml = `<li class="title">
    <h2>Setting</h2>
  </li>`;
  setData = Object.entries(setData);
  setData.forEach(set => {
    const [setCtgr, checked] = set;
    setHtml += `<li>
      <h3>${setCtgr}</h3>
      <div class="toggle-box">
        <input class="toggle toggle-input" id="${setCtgr}" type="checkbox" ${checked ? 'checked' : ''}/>
        <label class="btn-toggle" data-tg-off="${setCtgr === 'Clock' ? 'ANALOG' : 'OFF'}" data-tg-on="${setCtgr === 'Clock' ? 'DIGITAL' : 'ON'}" for="${setCtgr}"></label>
      </div>
    </li>`;
  });
  setHtml += `<li class="logout">
    <h3>LOGOUT</h3>
  </li>`;
  $settingList.innerHTML = setHtml;
};

const getSettings = () => {
  axios.get('/users')
    .then(({ data }) => {
      setData = data.settings;
    })
    .then(settingRender)
    .then(getView);
};
const openSettingBox = settinglist => {
  ani.fadeIn(settinglist, 150);
};

const closeSettingBox = settinglist => {
  ani.fadeOut(settinglist, 150);
};

$settingBtn.onclick = () => {
  $settingBtn.classList.toggle('clicked');
  const settingListCs = window.getComputedStyle($settingList);
  const settingOnOff = settingListCs.getPropertyValue('display');
  settingOnOff === 'none' ? openSettingBox($settingList) : closeSettingBox($settingList);
};

const clockToggle = ({ target }) => {
  if (!target.matches('#Clock')) return;
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

const todoToggle = ({ target }) => {
  if (!target.matches('#Todo')) return;
  const todolistCs = window.getComputedStyle($todolistSection);
  const todoDisplay = todolistCs.getPropertyValue('display');
  if (todoDisplay === 'block') ani.fadeOut($todolistSection, 300);
  if (todoDisplay === 'none') {
    $todolistSection.lastElementChild.classList.remove('fade-in');
    ani.fadeIn($todolistSection, 300);
  }
};

const searchToggle = ({ target }) => {
  if (!target.matches('#Search')) return;
  const searchCs = window.getComputedStyle($searchSection);
  const searchDisplay = searchCs.getPropertyValue('display');
  if (searchDisplay === 'flex') ani.fadeOut($searchSection, 300);
  if (searchDisplay === 'none') {
    $searchSection.lastElementChild.classList.remove('fade-in');
    ani.fadeIn($searchSection, 300);
    $searchInput.value = '';
  }
};

const weatherToggle = ({ target }) => {
  if (!target.matches('#Weather')) return;
  const weatherCs = window.getComputedStyle($weatherSection);
  const weatherDisplay = weatherCs.getPropertyValue('display');
  if (weatherDisplay === 'block') ani.fadeOut($weatherSection, 300);
  if (weatherDisplay === 'none') {
    $weatherSection.lastElementChild.classList.remove('fade-in');
    ani.fadeIn($weatherSection, 300);
  }
};

const quoteToggle = ({ target }) => {
  if (!target.matches('#Quote')) return;
  const quoteCs = window.getComputedStyle($quoteSection);
  const quoteDisplay = quoteCs.getPropertyValue('display');
  quoteDisplay === 'flex' ? ani.fadeOut($quoteSection, 300) : ani.fadeIn($quoteSection, 300);
};

// View Render
const clockRender = () => {
  if (!viewData.Clock) {
    ani.fadeOut($digitalSection, 300);
    setTimeout(() => {
      ani.fadeIn($analogSection, 300);
    }, 300);
  }
  if (viewData.Clock) {
    ani.fadeOut($analogSection, 300);
    setTimeout(() => {
      ani.fadeIn($digitalSection, 300);
    }, 300);
  }
};

const todoRender = () => {
  if (viewData.Todo) {
    $todolistSection.lastElementChild.classList.remove('fade-in');
    ani.fadeIn($todolistSection, 300);
  }
  if (!viewData.Todo) ani.fadeOut($todolistSection, 300);
};

const searchRender = () => {
  if (viewData.Search) {
    $searchSection.lastElementChild.classList.remove('fade-in');
    ani.fadeIn($searchSection, 300);
    $searchInput.value = '';
  }
  if (!viewData.Search) ani.fadeOut($searchSection, 300);
};

const weatherRender = () => {
  if (!viewData.Weather) ani.fadeOut($weatherSection, 300);
  if (viewData.Weather) {
    $weatherSection.lastElementChild.classList.remove('fade-in');
    ani.fadeIn($weatherSection, 300);
  }
};

const quoteRender = () => {
  !viewData.Quote ? ani.fadeOut($quoteSection, 300) : ani.fadeIn($quoteSection, 300);
};

const getView = () => {
  axios.get('/users')
    .then(({ data }) => {
      viewData = data.settings;
    })
    .then(clockRender)
    .then(todoRender)
    .then(searchRender)
    .then(weatherRender)
    .then(quoteRender);
};

$settingList.addEventListener('click', clockToggle);
$settingList.addEventListener('change', todoToggle);
$settingList.addEventListener('change', searchToggle);
$settingList.addEventListener('change', weatherToggle);
$settingList.addEventListener('change', quoteToggle);

export {
  getSettings,
  settingRender,
};
