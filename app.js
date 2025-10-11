// === Todo App using Fetch API ===
// Backend base URL
const BASE_URL = "http://localhost:8080/users/myras/todos";

// === DOM Elements ===
const todoForm = document.getElementById("todo-form");
const descriptionInput = document.getElementById("description");
const dateInput = document.getElementById("targetDate");
const todoBody = document.getElementById("todo-body");

// === 1. READ: Fetch and display all todos ===
async function fetchTodos() {
  const response = await fetch(BASE_URL);
  const todos = await response.json();

  todoBody.innerHTML = ""; // clear previous rows

  todos.forEach(todo => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${todo.id}</td>
      <td>${todo.description}</td>
      <td>${todo.targetDate}</td>
      <td>${todo.done ? "✅" : "❌"}</td>
      <td class="actions">
        <button onclick="editTodo(${todo.id}, '${todo.description}', '${todo.targetDate}', ${todo.done})">Edit</button>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
      </td>
    `;
    todoBody.appendChild(row);
  });
}

// === 2. CREATE: Add a new todo ===
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newTodo = {
    description: descriptionInput.value,
    targetDate: dateInput.value,
    done: false,
    username: "myras"
  };

  await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo)
  });

  todoForm.reset();
  fetchTodos(); // refresh list
});

// === 3. UPDATE: Edit an existing todo ===
async function editTodo(id, oldDesc, oldDate, oldDone) {
  const newDesc = prompt("Edit description:", oldDesc);
  const newDate = prompt("Edit target date (YYYY-MM-DD):", oldDate);
  const newDone = confirm("Mark as done? (OK = Yes, Cancel = No)");

  const updatedTodo = {
    id,
    username: "myras",
    description: newDesc || oldDesc,
    targetDate: newDate || oldDate,
    done: newDone
  };

  await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo)
  });

  fetchTodos();
}

// === 4. DELETE: Remove a todo ===
async function deleteTodo(id) {
  if (confirm("Are you sure you want to delete this todo?")) {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    fetchTodos();
  }
}

// === Load todos when page opens ===
fetchTodos();
