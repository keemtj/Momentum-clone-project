import * as ani from './animation';

let compliments = [
  'Good job!', 'Great Work!', 'Excellent!',
  'Keep it up!', 'Perfect!', 'Awesome!', 'Bravo!',
  'Hooray~', 'There you go!', 'Nice!'
];
let latestId = 0;
let todos = [];
let navState = 'all';
const $todoList = document.querySelector('.todolist-body');
const $inputTodo = document.querySelector('.input-todo');
const $nav = document.querySelector('.todolist-menu');
const $todolistIcon = document.querySelector('.icon-th-list');
const $todoBefore = document.querySelector('.todo-focus-before');
const $todoAfter = document.querySelector('.todo-focus-after');
const $latestTodoText = document.querySelector('.latest-todo-text');
const $compliment = document.querySelector('.compliment');
const $checkIcon = document.querySelector('.main-sec .check-icon');
const $icon = $checkIcon.firstElementChild;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const render = () => {
  const _todos = todos.filter(({ completed }) => (navState === 'all' ? true : navState === 'active' ? !completed : completed));
  let html = '';
  _todos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}">
              <label for="added-todo-${id}">
              <i class="icon-check${completed ? '' : '-empty'}"></i>
              <input type="checkbox" class="added-todo-checkbox" ${completed ? ' checked' : ''} id="added-todo-${id}">
              <span class="added-todo-text">${content}</span>
              <i class="icon-cancel"></i>
              </label>
            </li>`;
  });
  $todoList.innerHTML = html;
};

const generateId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);

const getTodos = () => {
  axios.get('/todos')
    .then(({ data }) => { 
      todos = data; })
    .then(render)
    .catch(err => console.error(err));
};

const addTodo = content => {
  axios.post('/todos', { id: generateId(), content, completed: false })
  .then(({ data }) => { 
    todos = data; })
  .then(render)
  .then(() => {
    $latestTodoText.textContent = $todoList.firstElementChild.querySelector('.added-todo-text').textContent;
  })
  .then(() => {
    ani.movePage($todoBefore, $todoAfter);
  })
  .catch(err => console.error(err));
};

const toggleCompleted = id => {
  const completed = !todos.find(todo => todo.id === +id).completed;
  axios.patch(`/todos/${id}`, { completed })
    .then(({ data }) => { todos = data; })
    .then(render)
    .catch(err => console.error(err));
};

const toggleCompFromTodos = id => {
  const completed = !todos.find(todo => todo.id === +id).completed;
  axios.patch(`/todos/${id}`, { completed })
    .then(({ data }) => { todos = data; })
    .then(render)
    .then(() => {
      $icon.className = todos[0].completed ? 'icon-check-empty' : 'icon-check';
      if ($icon.className === 'icon-check-empty') {
        $icon.classList.toggle('icon-check-empty');
        $icon.classList.toggle('icon-check');
        $latestTodoText.classList.add('text-linethru');
        $compliment.textContent = compliments[getRandomInt(0, 10)];
        if (+id === (generateId() - 1)) {
          ani.fadeIn($compliment, 200);
        }
      } else {
        $icon.classList.toggle('icon-check-empty');
        $icon.classList.toggle('icon-check');
        $latestTodoText.classList.remove('text-linethru');

        if (+id === (generateId() - 1)) {
          ani.fadeOut($compliment, 200);
        }
      }
    })
    .catch(err => console.error(err));
};

const removeTodo = id => {
  axios.delete(`/todos/${id}`)
  .then(({ data }) => { todos = data; })
  .then(render)
  .catch(err => console.error(err));
};

const removeTodoFromTodos = id => {
  $compliment.textContent = '';
  axios.delete(`/todos/${id}`)
  .then(({ data }) => { todos = data; })
  .then(render)
  .then(() => {
    $latestTodoText.textContent = todos[0].content;
    $latestTodoText.classList.toggle('text-linethru', todos[0].completed);
    $icon.classList.toggle('icon-check', todos[0].completed);
    $icon.classList.toggle('icon-check-empty', !todos[0].completed);
    if (todos[0].completed && (+id === todos[0].id)) {
      $compliment.textContent = compliments[getRandomInt(0, 10)];
      ani.fadeIn($compliment, 200);
    } else {
      ani.fadeOut($compliment, 200);
    }
  })
  .catch(err => console.error(err));
};

const changeNav = id => {
  [...$nav.children].forEach($navItem => {
    $navItem.classList.toggle('active', $navItem.id === id);
  });
  navState = id;
  render();
};

$inputTodo.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (!content || keyCode !== 13) return;
  target.value = '';
  addTodo(content);
  $todolistIcon.classList.toggle('shake');
  setTimeout(() => $todolistIcon.className = 'icon-th-list', 1000);
};

$todoList.onchange = ({ target }) => {
  toggleCompFromTodos(target.parentNode.parentNode.id);
};

$todoList.onclick = ({ target }) => {
  if (!target.matches('.icon-cancel')) return;
  removeTodoFromTodos(target.parentNode.parentNode.id);
};

$nav.onclick = ({ target }) => {
  if (!target.matches('.todolist-menu > li')) return;
  changeNav(target.id);
};

const $addTodoBtn = document.querySelector('.main-sec .add-todo');
$addTodoBtn.onclick = () => {
  $icon.className = 'icon-check-empty';
  $compliment.classList.remove('fade-in');
  ani.movePage($todoAfter, $todoBefore);
  $latestTodoText.classList.toggle('text-linethru', false);
};


$checkIcon.onclick = () => {
  if ($icon.className === 'icon-check-empty') {
    $icon.classList.toggle('icon-check-empty');
    $icon.classList.toggle('icon-check');
    $compliment.textContent = compliments[getRandomInt(0, 10)];
    $latestTodoText.classList.add('text-linethru');
    ani.fadeIn($compliment, 200);
    toggleCompleted(generateId() - 1);
  } else {
    $icon.classList.toggle('icon-check-empty');
    $icon.classList.toggle('icon-check');
    $latestTodoText.classList.remove('text-linethru');
    ani.fadeOut($compliment, 200);
    toggleCompleted(generateId() - 1);
  }
};

const $deleteIcon = document.querySelector('.delete-icon');
$deleteIcon.onclick = () => { 
  const deleteIconText = $deleteIcon.previousElementSibling.textContent;
  const deleteId = todos.find(todo => todo.content === deleteIconText).id;
  console.log(deleteId);
  removeTodoFromTodos(deleteId);
};

export { render, getTodos };


