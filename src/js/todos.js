let todos = [];
let navState = 'all';
const $todoList = document.querySelector('.todolist-body');
const $inputTodo = document.querySelector('.input-todo');
const $nav = document.querySelector('.todolist-menu');
const $todolistIcon = document.querySelector('.icon-th-list');
// 현재 선택된 nav 상태(현재 active 상태인 nav 요소의 자식 요소의 id)

const render = () => {
  console.log('4.axios.js');
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
  console.log('getTodos START');
  axios.get('/todos')
    .then(({ data }) => { 
      console.log('[[[DATA]]]', data);
      todos = data; })
    .then(render)
    .catch(err => console.error(err));
};

const addTodo = content => {
  axios.post('/todos', { id: generateId(), content, completed: false })
  .then(({ data }) => { 
    console.log(data);
    todos = data; })
  .then(render)
    .catch(err => console.error(err));
};

const toggleCompleted = id => {
  const completed = !todos.find(todo => todo.id === +id).completed;
  axios.patch(`/todos/${id}`, { completed })
    .then(({ data }) => { todos = data; })
    .then(render)
    .catch(err => console.error(err));
};
const removeTodo = id => {
  axios.delete(`/todos/${id}`)
  .then(({ data }) => { todos = data; })
  .then(render)
  .catch(err => console.error(err));
};
const changeNav = id => {
  // $navItem의 id가 e.target의 id와 같으면 active 클래스를 추가하고 아니면 active 클래스를 제거
  [...$nav.children].forEach($navItem => {
    $navItem.classList.toggle('active', $navItem.id === id);
  });
  navState = id;
  console.log('[navState]', navState);
  render();
};

$inputTodo.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (!content || keyCode !== 13) return;
  target.value = '';
  addTodo(content);
  $todolistIcon.classList.toggle('shake');
};

$todoList.onchange = ({ target }) => {
  toggleCompleted(target.parentNode.parentNode.id);
};

$todoList.onclick = ({ target }) => {
  if (!target.matches('.icon-cancel')) return;
  removeTodo(target.parentNode.parentNode.id);
};

$nav.onclick = ({ target }) => {
  if (!target.matches('.todolist-menu > li')) return;
  changeNav(target.id);
};

export { render, getTodos };


