const openSearchProvider = searchProvider => {
  searchProvider.style.display = 'block';
};

const closeSearchProvider = searchProvider => {
  searchProvider.style.display = 'none';
};

const openTodoList = todoList => {
  todoList.style.display = 'block';
};

const closeTodoList = todoList => {
  todoList.style.display = 'none';
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
  $digitalClock.innerHTML = `${hour}:${min}`
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
