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
    $currentForm.setAttribute('action', 'https://www.google.com/search?q=');
  }
  if (e.target.className === 'naver') {
    $currentBox.firstElementChild.setAttribute('src', './asset/logo/naver.png');
    $currentForm.firstElementChild.setAttribute('name', 'query');
    $currentForm.setAttribute('action', 'https://search.naver.com/search.naver?q=');
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

const startClock = () => {
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
    $digitalClock.textContent = `${hour}:${min}`
    $hour.style.transform = `rotate(${hour % 12 * 30}deg)`
    $minute.style.transform = `rotate(${min % 60 * 6}deg)`
    $second.style.transform = `rotate(${sec % 60 * 6}deg)`
  }, 1000);
}


// const now = new Date();
// let hour = now.getHours();
// let greeting = (hour < 12 ) ? 'Good morning' : (hour >= 12 && hour <= 17) ? 'Good evening' : 'Good afternoon';

// let greeting;
// if (hour < 12){
//   greeting = 'Good morning';
// } else if(hour >= 12 && hour <= 17) {
//   greeting = 'Good evening';
// } else if(hour >= 17 && hour <= 24){
//   greeting = 'Good afternoon';
// } else {
//   greeting = 'Good night';
// }

const $greeting = document.querySelector('.greeting .good');
const greeting = [
  [0, 4, 'Good night'], 
  [5, 11, 'Good morning'],
  [12, 17, 'Good afternoon'],
  [18, 24, 'Good night']
];

const hour = new Date().getHours();

for (let i = 0; i < greeting.length; i++) {
  if (hour >= greeting[i][0] && hour <= greeting[i][1]) {
    $greeting.textContent = `${greeting[i][2]}, `;
    break;
  }
}

const $quote = document.querySelector('.quote-sec');
const saying = [
  "If you don't study, you work in hot weather and cold weather.",
  'The beginning is not half, but the beginning is just the beginning.',
  'Handsome men pay for their faces, and ugly men pay for their looks.',
  'The enemy meets at the company.',
  "You don't have to do what you can do tomorrow today.",
  'A migraine inevitably follows pain.',
  "Avoid it if you can't enjoy it",
  'Be comfortable to give up.',
  'Beer and chicken at dawn are 0 calories.',
  'Early birds are tired, Early worms are eaten.'
];

  const select = Math.floor(Math.random() * saying.length);
  const todayPick = saying.splice(select, 1);

  // let todayPick = saying.splice(Math.floor(Math.random()), 1)[0];
  $quote.innerHTML = '<q>' + '"' + todayPick + '"' + '</q>';
  
  // console.log('todayPick:', todayPick);
  let todos = [];
  const active = 'All';

  const $todoList = document.querySelector('.todolist-body');
  const $inputTodo = document.querySelector('.input-todo');
  const $activeTodos = document.getElementById('active');
  const $completedTodos = document.getElementById('completed');

  // <li>
  //   <label for="added-todo">
  //   <i class="icon-check-empty"></i>
  //   <input type="checkbox" id="added-todo">
  //   <span class="added-todo-text"></span>
  //   <i class="icon-cancel"></i>
  //   </label>
  // </li>

  
const render = () => {
  let html = '';

  const _todos = [...todos].filter(todo => (active === 'All' ? true : (active === 'Active' ? !todo.completed : todo.completed)));
  // 왜 let 이 아니라 const를 쓰는 지?

  _todos.forEach(todo => {
    html += ` <li>
                <label for="added-todo">
                  <i class="icon-check-empty"></i>
                  <input type="checkbox" id="added-todo">
                  <span class="added-todo-text">${todo.content}</span>
                  <i class="icon-cancel"></i>
                </label>
              </li>`;
  });

  $todoList.innerHTML = html;

  // completedTodos();
  // activeTodos();
};


const getTodos = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'css', completed: true },
    { id: 3, content: 'Javascript', completed: false },
  ].sort((todo1, todo2) => todo2.id - todo1.id);

  render();
};

// window.onload = getTodos; // 호출의 상하관계 알 것


$inputTodo.onkeyup = e => {
  if (e.keyCode !== 13 || $inputTodo.value === '') return;

  const newId = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  const newTodo = { id: newId, content: $inputTodo.value, completed: false };
  todos = [newTodo, ...todos];

  $inputTodo.value = '';
  render();
};


export {
  openSearchProvider,
  closeSearchProvider,
  openTodoList,
  closeTodoList,
  startClock
};
