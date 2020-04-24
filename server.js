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
    online: true,
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
      Clock: true,
      Todo: false,
      Search: false,
      Weather: true,
      Quote: true
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

// 로그아웃 
app.get('/logout', (req, res) => {
  users.forEach(user => {
    user.online = false; 
  });
  onUser = {};
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

// 유저가 비밀번호 찾을때 이메일을 입력하면 
// 이메일이 존재하는지 확인 -> 
// 존재하면 그 유저 객체를 보내줌
// 전역변수 userFound 에다가 저장하고 다음 페이지에서 그 userFound의 이메일과 힌트 비교함
// 존재하지 않으면 falsy값 리턴하고 존재하지 않는 이메일 msg 표시해줌
app.post('/users/forgot_pw', (req, res) => {
  const { email } = req.body;
  const userFound = users.find($user => $user.email === email);
  if (!userFound) {
    res.send(false);
  } else {
    res.send(userFound);
  }
});

// resetPw
// 이메일과 패스워드를 받고
// 패스워드 바꾸고
// 전체 users return함
app.patch('/users/reset_pw', (req, res) => {
  const { email, pw } = req.body;
  const resetPwUser = users.find($user => $user.email === email);
  resetPwUser.pw = pw;
  users.map($user => (resetPwUser.email === $user.email ? resetPwUser : $user));
  res.send(users);
});

// ===========================



// ========settings===========
// settings로 요청하면 객체 형식({ digital: true, weather: true, ...})으로 응답함
<<<<<<< HEAD
app.get('/users', (req, res) => {
  console.log('[GET front-req settings]');
  onlineUser = users.find(user => user.online);
  res.send(onlineUser.settings);
  console.log('[GET back-res settings]', onlineUser.settings);
});

// app.patch('/users', (req, res) => {
//   console.log('[PATCH front-req settings] =>', req.body);
//   const { checked } = req.body;
//   console.log('[PATCH] req.body => ', checked);
//   onlineUser = users.find(user => user.online);
//   console.log(onlineUser.settings);
//   onlineUser.settings.Clock !== checked ? onlineUser.settings = { ...onlineUser.settings, Clock: checked } : onlineUser.settings.Clock;
//   console.log({ ...onlineUser.settings, Clock: checked });
//   res.send(onlineUser.settings);
//   console.log('[PATCH back-res settings]', onlineUser.settings);
// });
=======
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
>>>>>>> 29c54f6fc92700a2c8cbe8b1127cc4d85be22c1f
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
  const { completed } = req.body;
  console.log('[PATCH] req.body => ', completed);
  onUser = users.find(user => user.online);
  onUser.todos = onUser.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  res.send(onUser.todos);
});

// =======================
app.listen(9000, () => console.log('Simple Rest API Server listening on port 9000'));
