const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
let onUser = {};
let users = [
  {
    userId: 3,
    online: false,
    name: 'Jiyeon',
    email: 'a@gmail.com',
    pw: 'a',
    hint: 'what is your favorite book?',
    answer: 'Harry Potter',
    todos: [
      { id: 3, content: 'Angular', completed: false },
      { id: 2, content: 'Webpack', completed: false },
      { id: 1, content: 'Babel', completed: true }
    ],
    settings: {
      digital: true, todo: false, search: true, weather: true, quote: false
    }
  },
  {
    userId: 2,
    online: false,
    name: 'Taejin',
    email: 'kim@gmail.com',
    pw: 'Qwerty1234!',
    hint: 'what is your favorite movie?',
    answer: 'Lion King',
    todos: [
      { id: 3, content: 'React', completed: true },
      { id: 2, content: 'TypeScript', completed: true },
      { id: 1, content: 'SCSS', completed: false }
    ],
    settings: {
      digital: false, todo: true, search: false, weather: false, quote: true
    }
  },
  {
    userId: 1,
    online: false,
    name: 'Jimmy',
    email: 'a@gmail.com',
    pw: '1',
    hint: 'what is your favorite food?',
    answer: 'Pizza',
    todos: [
      { id: 3, content: 'Javascript', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'HTML', completed: false }
    ],
    settings: {
      digital: true, todo: true, search: true, weather: true, quote: true
    }
  }
];
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => res.send(`<h1>${req.protocol}://${req.get('host')}${req.originalUrl}</h1>`));
// ========users===========
// 회원가입할때 userId 만들어주는 함수 
const generateUserId = () => (users.length ? Math.max(...users.map($user => $user.userId)) + 1 : 1);
// /users -> users 
app.get('/users', (req, res) => {
  onUser = users.find(user => user.online);
  console.log('[/users]');
  res.send(onUser);
});
// /users 아이디 등록
app.post('/users', (req, res) => {
  console.log('[/users]');
  const { online, name, email, pw, hint, answer } = req.body;
  if (users.find($users => $users.email === email)) {
    res.send(false);
  } else {
    const todos = [];
    const settings = {
      digital: true, todo: true, search: true, weather: true, quote: true
    };
    users = [{
      userId: generateUserId(), online, name, email, pw, hint, answer, todos, settings }, ...users];
    res.send(users);
  }
});
// 유저가 로그인할때 아이디 존재여부와 비밀번호 일치 확인
app.post('/users/login', (req, res) => {
  const { email, pw } = req.body;
  const userFound = users.find($user => $user.email === email);
  const userPw = userFound ? userFound.pw : '';
  if (!userFound || (pw !== userPw)) {
    res.send(false);
  } else {
    users.forEach(user => {
      user.online = user.email === userFound.email;
    });
    onUser = userFound;
    res.send(userFound);
  }
});
// ===========================
// ========settings===========
// settings로 요청하면 객체 형식({ digital: true, weather: true, ...})으로 응답함
app.get('/settings', (req, res) => {
  console.log('[GET settings]');
  res.send(onUser);
});
app.patch('/settings', (req, res) => {
  // const { id } = req.params;
  const { digital, weather, todo, quote, search } = req.body;
  console.log('[PATCH] req.digital => ', digital);
  console.log('[PATCH] req.weather => ', weather);
  console.log('[PATCH] req.todo => ', todo);
  console.log('[PATCH] req.quote => ', quote);
  console.log('[PATCH] req.search => ', search);
  onUser.settings = { digital, weather, todo, quote, search };
  users = users.map(user => (user.userId === onUser.userId ? onUser : user));
  res.send(onUser);
});
// ===========================
// ========todos===========
// todos 요청
// get방식으로 ('/todos'를 요청)하면 현재 로그인된 유저(onUser, 객체)를 보내줌
// payload: 없음
// return: onUser 객체
// 프론트에서 해야할 일: main.js에 있는 onUser를 서버에서 보내준 값으로 재할당한다
// 재할당된 onUser를 가지고 render 함수를 호출한다
app.get('/todos', (req, res) => {
  console.log('[GET todos]');
  onUser = users.find(user => user.online);
  console.log(onUser);
  
  res.send(onUser.todos);
});
// todo 추가
// payload: { id: (number), content: (string), completed: (boolean)}
// return: update된 onUser 객체
// 프론트에서 해야할 일: main.js에 있는 onUser를 서버에서 보내준 값으로 재할당한다
// 재할당된 onUser를 가지고 render 함수를 호출한다
app.post('/todos', (req, res) => {
  const { id, content, completed } = req.body;
  onUser = users.find(user => user.online);
  onUser.todos = [{ id, content, completed }, ...onUser.todos];
  users = users.map(user => (user.userId === onUser.userId ? onUser : user));
  res.send(onUser.todos);
});
// todo 삭제(클릭된 todo 삭제)
// 클릭된 요소의 아이디(id)를 찾아서 delete 방식으로 '/todos/id'를 요청함
// payload: 없음
// 프론트에서 해야할 일: main.js에 있는 onUser를 서버에서 보내준 값으로 재할당한다
// 재할당된 onUser를 가지고 render 함수를 호출한다
app.delete('/todos/:id([0-9]+)', (req, res) => {
  const { id } = req.params;
  console.log('[DELETE] req.params.id => ', req.params.id);
  onUser = users.find(user => user.online);
  onUser.todos = onUser.todos.filter(todo => todo.id !== +id);
  users = users.map(user => (user.userId === onUser.userId ? onUser : user));
  res.send(onUser.todos);
});
// PATCH : 리스소의 일부를 UPDATE
// 클릭한 todo의 completed값 toggle시킴
// payload: { id: (number), content: (string), completed: (boolean)}
// return: update된 onUser 객체
// 프론트에서 해야할 일: main.js에 있는 onUser를 서버에서 보내준 값으로 재할당한다
// 재할당된 onUser를 가지고 render 함수를 호출한다
app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  console.log('[PATCH] req.params.id => ', req.params.id);
  const { completed } = req.body;
  console.log('[PATCH] req.body => ', completed);
  onUser = users.find(user => user.online);
  onUser.todos = onUser.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  res.send(onUser.todos);
});
// =======================
app.listen(9000, () => console.log('Simple Rest API Server listening on port 9000'));