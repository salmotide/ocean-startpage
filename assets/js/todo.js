const openTodo = document.getElementById("open-todo");
const closeTodo = document.getElementById("close-todo");
const todoPanel = document.getElementById("todo-panel");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoColor = document.getElementById("todo-color");
const todoList = document.getElementById("todo-list");
const priorityTasks = document.getElementById("priority-tasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTodo() {
  todoPanel.classList.toggle("active");

  if (todoPanel.classList.contains("active")) {
    openTodo.textContent = "Close Tasks";
  } else {
    openTodo.textContent = "Open Tasks";
  }
}

openTodo.addEventListener("click", toggleTodo);
closeTodo.addEventListener("click", toggleTodo);

function renderTasks() {
  todoList.innerHTML = "";

  tasks.forEach((task, index) => {
  const li = document.createElement("li");
    li.className = `todo-card ${task.color}`;

    li.innerHTML = `
      <p>${task.text}</p>

      <div class="todo-actions">
        <button onclick="togglePriority(${index})">
          ${task.priority ? "Unpin" : "Priority"}
        </button>

        <button onclick="deleteTask(${index})">Remove</button>
      </div>
    `;

    todoList.appendChild(li);
  });
  renderPriorityTasks();
}

function renderPriorityTasks() {
  const priority = tasks
  .filter(task => task.priority)
  .slice(0, 3);

  priorityTasks.innerHTML = "";

  if(priority.length === 0) {
    priorityTasks.innerHTML = "<li>No priority tasks yet</li>";
    return;
  }

  priority.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    priorityTasks.appendChild(li);
  });
}

function togglePriority(index) {
  tasks[index].priority = !tasks[index].priority;
  saveTasks();
  renderTasks();
}
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}


todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();

  if(!text) return;

  tasks.push({
    text: text,
    color: todoColor.value,
    priority: false
  });

  saveTasks();

  todoInput.value = "";
  renderTasks();
});

renderTasks();
