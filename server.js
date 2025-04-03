const express = require('express');
const app = express();
const port = 3000;

// Body parser middleware to handle form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Store todos in memory
let todos = [];

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// API routes
app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (task) {
    const newTodo = { id: todos.length + 1, task, completed: false };
    todos.push(newTodo);
    res.json(newTodo);
  } else {
    res.status(400).send('Task is required');
  }
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.status(200).send(`Todo with id ${id} deleted`);
});

app.patch('/todos/:id/complete', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(todo => todo.id == id);
  if (todo) {
    todo.completed = !todo.completed;
    res.json(todo);
  } else {
    res.status(404).send('Todo not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
