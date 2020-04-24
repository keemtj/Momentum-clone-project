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
      Clock: true,
      Todo: true,
      Search: true,
      Weather: false,
      Quote: false
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
    email: 'j@gmail.com',
    pw: '1',
    hint: 'what is your favorite food?',
    answer: 'Pizza',
    todos: [
      { id: 3, content: 'Javascript', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'HTML', completed: false }
    ],
    settings: {
      Clock: true,
      Todo: false,
      Search: false,
      Weather: true,
      Quote: true
    }
  }
];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => res.send(`<h1>${req.protocol}://${req.get('host')}${req.originalUrl}</h1>`));


const generateUserId = () => (users.length ? Math.max(...users.map($user => $user.userId)) + 1 : 1);

app.get('/users', (req, res) => {
  onUser = users.find(user => user.online);
  res.send(onUser);
});

app.get('/logout', (req, res) => {
  users.forEach(user => {
    user.online = false;
  });
  onUser = {};
  res.send(onUser);
});

app.post('/users', (req, res) => {
  const { online, name, email, pw, hint, answer } = req.body;
  if (users.find($users => $users.email === email)) {
    res.send(false);
  } else {
    const todos = [];
    const settings = {
      Clock: true,
      Todo: true,
      Search: true,
      Weather: true,
      Quote: true
    };
    users = [{
      userId: generateUserId(), online, name, email, pw, hint, answer, todos, settings
    }, ...users];
    res.send(users);
  }
});

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

app.post('/users/forgot_pw', (req, res) => {
  const { email } = req.body;
  const userFound = users.find($user => $user.email === email);
  if (!userFound) {
    res.send(false);
  } else {
    res.send(userFound);
  }
});


app.patch('/users/reset_pw', (req, res) => {
  const { email, pw } = req.body;
  const resetPwUser = users.find($user => $user.email === email);
  resetPwUser.pw = pw;
  users.map($user => (resetPwUser.email === $user.email ? resetPwUser : $user));
  res.send(users);
});

app.get('/users', (req, res) => {
  onUser = users.find(user => user.online);
  res.send(onUser.settings);
});

app.patch('/settings', (req, res) => {
  const { digital, weather, todo, quote, search } = req.body;
  onUser.settings = { digital, weather, todo, quote, search };
  users = users.map(user => (user.userId === onUser.userId ? onUser : user));
  res.send(onUser);
});

app.get('/todos', (req, res) => {
  onUser = users.find(user => user.online);  
  res.send(onUser.todos);
});

app.post('/todos', (req, res) => {
  const { id, content, completed } = req.body;
  onUser = users.find(user => user.online);
  onUser.todos = [{ id, content, completed }, ...onUser.todos];
  users = users.map(user => (user.userId === onUser.userId ? onUser : user));
  res.send(onUser.todos);
});

app.delete('/todos/:id([0-9]+)', (req, res) => {
  const { id } = req.params;
  onUser = users.find(user => user.online);
  onUser.todos = onUser.todos.filter(todo => todo.id !== +id);
  users = users.map(user => (user.userId === onUser.userId ? onUser : user));
  res.send(onUser.todos);
});

app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  onUser = users.find(user => user.online);
  onUser.todos = onUser.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  res.send(onUser.todos);
});

app.listen(9000, () => console.log('Simple Rest API Server listening on port 9000'));
