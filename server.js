const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let onlineUser = {};
let users = [
  {
    userId: 3,
    online: false,
    name: 'Jiyeon',
    email: 'jang@gmail.com',
    pw: 'Qwerty1234!',
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
    email: 'joo@gmail.com',
    pw: 'Qwerty1234!',
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

// /users -> users 
app.get('/users', (req, res) => {
  onlineUser = users.find(user => user.online);
  console.log('[/users]');
  res.send(onlineUser);
});

// /users 아이디 등록
app.post('/users', (req, res) => {
  console.log('[/users]');
  const { userId, online, name, email, pw, hint, answer } = req.body;
  if (users.find($users => $users.email === email)) {
    res.send(false);
  } else {
    const todos = [];
    const settings = {
      digital: true, todo: true, search: true, weather: true, quote: true
    };
    users = [{
      userId, online, name, email, pw, hint, answer, todos, settings }, ...users];
    console.log('users', users);
    res.send(users);
  }
});

app.post('/users/login', (req, res) => {
  console.log('[/usersLogin]');
  const { email, pw } = req.body;
  console.log('/usersLogin...email: ', email);
  console.log('/usersLogin...pw: ', pw);
  const userFound = users.find($users => $users.email === email);
  console.log('/usersLogin...userFound: ', userFound);
  console.log('/usersLogin...!userFound: ', !userFound);
  const userPw = userFound ? userFound.pw : '';
  console.log('/usersLogin...userPw: ', userPw);
  console.log('=====');
  if (!userFound || (pw !== userPw)) {
    res.send(false);
  } else {
    users.forEach(user => {
      user.online = user.email === userFound.email;
    });
    res.send(userFound);
  }
});

// ===========================



// ========settings===========
// settings로 요청하면 객체 형식({ digital: true, weather: true, ...})으로 응답함
app.get('/settings', (req, res) => {
  console.log('[GET settings]');
  onlineUser = users.find(user => user.online);
  res.send(onlineUser.settings);
});

app.patch('/settings', (req, res) => {
  const { completed } = req.body;
  console.log('[PATCH] req.body => ', completed);
  onlineUser = users.find(user => user.online);
  onlineUser.todos = onlineUser.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  res.send(onlineUser.todos);
});
// ===========================



// ========todos===========
app.get('/todos', (req, res) => {
  console.log('[GET todos]');
  onlineUser = users.find(user => user.online);
  res.send(onlineUser.todos);
});

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  console.log('[GET] req.params.id => ', req.params.id);
  onlineUser = users.find(user => user.online);
  // const { todos } = users.find(user => user.online);
  res.send(onlineUser.todos.filter(todo => todo.id === +id));
});

app.post('/todos', (req, res) => {
  const { id, content, completed } = req.body;
  console.log('[POST] req.body => ', req.body);
  onlineUser = users.find(user => user.online);
  onlineUser.todos = [{ id, content, completed }, ...onlineUser.todos];
  users = users.map(user => (user.userId === onlineUser.userId ? onlineUser : user));
  res.send(onlineUser.todos);
});

app.delete('/todos/:id([0-9]+)', (req, res) => {
  const { id } = req.params;
  console.log('[DELETE] req.params.id => ', req.params.id);
  onlineUser = users.find(user => user.online);
  onlineUser.todos = onlineUser.todos.filter(todo => todo.id !== +id);
  users = users.map(user => (user.userId === onlineUser.userId ? onlineUser : user));
  res.send(onlineUser.todos);
});

// PATCH : 리스소의 일부를 UPDATE
app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  console.log('[PATCH] req.params.id => ', req.params.id);
  const { completed } = req.body;
  console.log('[PATCH] req.body => ', completed);
  onlineUser = users.find(user => user.online);
  onlineUser.todos = onlineUser.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  res.send(onlineUser.todos);
});

// =======================

// PATCH : 리스소의 일부를 UPDATE
// 전체 일괄 갱신
// app.patch('/todos', (req, res) => {
//   const { completed } = req.body;
//   console.log('[PATCH] req.body => ', completed);

//   todos = todos.map(todo => ({ ...todo, completed }));
//   res.send(todos);
// });

app.listen(9000, () => console.log('Simple Rest API Server listening on port 9000'));
