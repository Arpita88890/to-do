// Fetch and display all todos from the server
function loadTodos() {
  fetch('/todos')
    .then(response => response.json())
    .then(data => {
      const todoList = document.getElementById('todo-list');
      todoList.innerHTML = '';
      data.forEach(todo => {
        const li = document.createElement('li');
        li.classList.toggle('completed', todo.completed);
        li.innerHTML = `
          <span>${todo.task}</span>
          <div>
            <button class="complete-btn" onclick="toggleComplete(${todo.id})">
              ${todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
          </div>
        `;
        todoList.appendChild(li);
      });
    })
    .catch(err => console.log(err));
}

// Add a new todo
function addTodo(event) {
  event.preventDefault();

  const taskInput = document.getElementById('task-input');
  const task = taskInput.value.trim();

  if (task) {
    fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    })
      .then(response => response.json())
      .then(() => {
        taskInput.value = ''; // Clear input field
        loadTodos(); // Reload todos
      })
      .catch(err => console.log(err));
  } else {
    alert("Task cannot be empty!");
  }
}

// Delete a todo
function deleteTodo(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    fetch(`/todos/${id}`, { method: 'DELETE' })
      .then(() => loadTodos()) // Reload todos after deletion
      .catch(err => console.log(err));
  }
}

// Toggle completion status of a todo
function toggleComplete(id) {
  fetch(`/todos/${id}/complete`, { method: 'PATCH' })
    .then(response => response.json())
    .then(() => loadTodos()) // Reload todos after toggle
    .catch(err => console.log(err));
}

// Attach event listeners
document.getElementById('todo-form').addEventListener('submit', addTodo);

// Initial load of todos
loadTodos();
