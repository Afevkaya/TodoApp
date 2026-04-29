const STORAGE_KEY = "todo-app-tasks";
const tasks = loadTasks();
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");

// Notification container (top-right)
let notificationContainer = document.querySelector("#notification-container");
if (!notificationContainer) {
  notificationContainer = document.createElement("div");
  notificationContainer.id = "notification-container";
  notificationContainer.style.position = "fixed";
  notificationContainer.style.top = "1rem";
  notificationContainer.style.right = "1rem";
  notificationContainer.style.zIndex = "9999";
  notificationContainer.style.display = "flex";
  notificationContainer.style.flexDirection = "column";
  notificationContainer.style.gap = "0.5rem";
  document.body.appendChild(notificationContainer);
}

function showNotification(message, type = "info", duration = 3000) {
  const notif = document.createElement("div");
  notif.textContent = message;
  notif.style.minWidth = "200px";
  notif.style.padding = "0.6rem 0.9rem";
  notif.style.borderRadius = "4px";
  notif.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  notif.style.color = "#fff";
  notif.style.opacity = "0";
  notif.style.transition = "opacity 0.2s ease, transform 0.2s ease";
  notif.style.transform = "translateY(-6px)";
  if (type === "error") notif.style.background = "#dc3545";
  else if (type === "success") notif.style.background = "#28a745";
  else notif.style.background = "#17a2b8";
  notificationContainer.appendChild(notif);
  requestAnimationFrame(() => {
    notif.style.opacity = "1";
    notif.style.transform = "translateY(0)";
  });
  setTimeout(() => {
    notif.style.opacity = "0";
    notif.style.transform = "translateY(-10px)";
    setTimeout(() => notif.remove(), 300);
  }, duration);
}

function loadTasks() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTodoElement(task) {
  const li = document.createElement("li");
  li.classList.add("list-group-item");
  if (task.completed) {
    li.classList.add("completed");
    li.style.backgroundColor = "#d4edda";
  }

  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = task.text;
  if (task.completed) {
    span.style.textDecoration = "line-through";
  }

  const tick = document.createElement("span");
  tick.classList.add("tick");
  tick.textContent = "✔";
  tick.style.display = "none";
  tick.style.marginRight = "0.5rem";
  tick.style.color = "#155724";
  tick.style.fontWeight = "700";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add(
    "btn",
    "btn-danger",
    "btn-sm",
    "float-end",
    "delete-btn",
  );
  deleteButton.setAttribute("aria-label", "Sil");
  deleteButton.textContent = "×";

  li.appendChild(tick);
  li.appendChild(span);
  li.appendChild(deleteButton);
  return li;
}

function addTodo(event) {
  event.preventDefault();
  const todoText = todoInput.value.trim();

  if (!todoText) {
    showNotification("Lütfen bir görev girin!", "error");
    return;
  }
  if (tasks.some((task) => task.text === todoText)) {
    showNotification("Bu görev zaten eklenmiş!", "error");
    return;
  }
  if (todoText.length > 100) {
    showNotification("Görev metni 100 karakteri geçemez!", "error");
    return;
  }

  tasks.push({ text: todoText, completed: false });
  saveTasks();
  const li = createTodoElement({ text: todoText, completed: false });
  todoList.appendChild(li);
  todoInput.value = "";
  showNotification("Görev eklendi.", "success");
}

// Event delegation for delete buttons and toggling completed state
todoList.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".delete-btn");
  if (deleteBtn) {
    const li = deleteBtn.closest("li");
    if (!li) return;
    const text = li.querySelector(".task-text").textContent;
    const index = tasks.findIndex((task) => task.text === text);
    if (index > -1) {
      tasks.splice(index, 1);
      saveTasks();
    }
    renderPage();
    showNotification("Görev silindi.", "success");
    return;
  }

  const li = event.target.closest("li");
  if (li && todoList.contains(li)) {
    const text = li.querySelector(".task-text").textContent;
    const task = tasks.find((item) => item.text === text);
    if (!task) return;

    task.completed = !task.completed;
    saveTasks();

    const wasCompleted = li.classList.contains("completed");
    const textSpan = li.querySelector(".task-text");
    const tick = li.querySelector(".tick");
    if (!wasCompleted) {
      li.classList.add("completed");
      li.style.backgroundColor = "#d4edda"; // light green
      textSpan.style.textDecoration = "line-through";
      if (tick) tick.style.display = "inline-block";
    } else {
      li.classList.remove("completed");
      li.style.backgroundColor = "";
      textSpan.style.textDecoration = "";
      if (tick) tick.style.display = "none";
    }
  }
});

function renderPage() {
  todoList.innerHTML = "";
  tasks.forEach((task) => {
    todoList.appendChild(createTodoElement(task));
  });
}

todoForm.addEventListener("submit", addTodo);
window.addEventListener("load", renderPage);
