const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let users = [
  {
    userId: 1, online: false, name: 'Park', email: 'park@gmail.com', pw: 'Aa12345678!', hint: 'what is your favorite movie?', answer: 'lionking'
  },
  {
    userId: 2, online: false, name: 'Kim', email: 'kim@gmail.com', pw: 'Aa12345678!', hint: 'what is your favorite movie?', answer: 'lionking'
  },
  {
    userId: 3, online: false, name: 'Choi', email: 'choi@gmail.com', pw: 'Aa12345678!', hint: 'what is your favorite movie?', answer: 'lionking'
  },
];

let todos = [
  {
    userId: 1,
    userTodos: [
      { id: 3, content: 'Javascript', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'HTML', completed: false }
    ]
  },
  {
    userId: 2,
    userTodos: [
      { id: 3, content: 'React', completed: true },
      { id: 2, content: 'TypeScript', completed: true },
      { id: 1, content: 'SCSS', completed: false }
    ]
  },
  {
    userId: 3,
    userTodos: [
      { id: 3, content: 'Angular', completed: false },
      { id: 2, content: 'Webpack', completed: false },
      { id: 1, content: 'Babel', completed: true }
    ]
  },
];

let settings = [
  {
    userId: 1, weather: true, todo: true, search: true, quote: true
  },
  {
    userId: 2, weather: false, todo: true, search: false, quote: true
  },
  {
    userId: 3, weather: true, todo: false, search: true, quote: false
  }
];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.send(`<h1>${req.protocol}://${req.get('host')}${req.originalUrl}</h1>`));

// /users -> users 
app.get('/users', (req, res) => {
  console.log('[/users]');
  res.send(users);
});

// /users/check -> 해당이메일이 있는지 Filter한 배열의 length를 보내줌
app.post('/users', (req, res) => {
  console.log('[/users]');
  res.send(users.filter(user => user.email === req.body.email));
});


app.get('/todos', (req, res) => {
  console.log('[GET]');
  res.send(todos);
});

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  console.log('[GET] req.params.id => ', req.params.id);

  res.send(todos.filter(todo => todo.id === +id));
});

app.post('/todos', (req, res) => {
  const { id, content, completed } = req.body;
  console.log('[POST] req.body => ', req.body);

  todos = [{ id, content, completed }, ...todos];
  res.send(todos);
});

app.delete('/todos/:id([0-9]+)', (req, res) => {
  const { id } = req.params;
  console.log('[DELETE] req.params.id => ', req.params.id);

  todos = todos.filter(todo => todo.id !== +id);
  res.send(todos);
});

app.delete('/todos/completed', (req, res) => {
  console.log('[DELETE] completed');

  todos = todos.filter(todo => !todo.completed);
  res.send(todos);
});

// PATCH : 리스소의 일부를 UPDATE
app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  console.log('[PATCH] req.params.id => ', req.params.id);
  const { completed } = req.body;
  console.log('[PATCH] req.body => ', completed);

  todos = todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  res.send(todos);
});

// PATCH : 리스소의 일부를 UPDATE
// 전체 일괄 갱신
app.patch('/todos', (req, res) => {
  const { completed } = req.body;
  console.log('[PATCH] req.body => ', completed);

  todos = todos.map(todo => ({ ...todo, completed }));
  res.send(todos);
});

app.listen(9000, () => console.log('Simple Rest API Server listening on port 9000'));
