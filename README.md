const STORAGE_KEY = "student-task-manager.tasks";

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const searchInput = document.getElementById("search-input");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const formFeedback = document.getElementById("form-feedback");
const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

const state = {
  tasks: loadTasks(),
  filter: "all",
  search: "",
};

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (error) {
    console.error("Unable to load tasks from localStorage:", error);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
}

function showFeedback(message, type = "error") {
  formFeedback.textContent = message;
  formFeedback.className = `feedback show ${type}`;
}

function clearFeedback() {
  formFeedback.textContent = "";
  formFeedback.className = "feedback";
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createTaskId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getFilteredTasks() {
  const normalizedSearch = state.search.trim().toLowerCase();

  return state.tasks.filter((task) => {
    const matchesSearch =
      normalizedSearch === "" || task.title.toLowerCase().includes(normalizedSearch);

    const matchesFilter =
      state.filter === "all" ||
      (state.filter === "pending" && !task.completed) ||
      (state.filter === "completed" && task.completed);

    return matchesSearch && matchesFilter;
  });
}

function renderSummary() {
  const total = state.tasks.length;
  const completed = state.tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  totalCount.textContent = String(total);
  pendingCount.textContent = String(pending);
  completedCount.textContent = String(completed);
}

function renderTasks() {
  const visibleTasks = getFilteredTasks();

  taskList.innerHTML = "";

  if (!visibleTasks.length) {
    const hasAnyTasks = state.tasks.length > 0;
    emptyState.textContent = hasAnyTasks
      ? "No tasks match your search. Try a different keyword or change the filter."
      : "No tasks yet. Add your first task to get started.";
    emptyState.classList.add("visible");
  } else {
    emptyState.classList.remove("visible");
  }

  visibleTasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = `task-item ${task.completed ? "is-complete" : ""}`;
    listItem.innerHTML = `
      <label class="task-check">
        <input type="checkbox" ${task.completed ? "checked" : ""} aria-label="Mark ${escapeHtml(task.title)} as complete" />
      </label>
      <div class="task-content">
        <p class="task-title">${escapeHtml(task.title)}</p>
        <span class="task-status">${task.completed ? "Completed" : "Pending"}</span>
      </div>
      <button class="delete-btn" type="button" aria-label="Delete task: ${escapeHtml(task.title)}">
        Delete
      </button>
    `;

    const checkbox = listItem.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", (event) => {
      const taskId = task.id;
      const isChecked = event.target.checked;
      state.tasks = state.tasks.map((currentTask) =>
        currentTask.id === taskId ? { ...currentTask, completed: isChecked } : currentTask,
      );
      saveTasks();
      render();
    });

    const deleteButton = listItem.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
      state.tasks = state.tasks.filter((currentTask) => currentTask.id !== task.id);
      saveTasks();
      render();
    });

    taskList.appendChild(listItem);
  });

  renderSummary();
}

function render() {
  renderTasks();
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === state.filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function addTask(title) {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    showFeedback("Please enter a task title before saving.", "error");
    return;
  }

  state.tasks.unshift({
    id: createTaskId(),
    title: trimmedTitle,
    completed: false,
    createdAt: new Date().toISOString(),
  });

  saveTasks();
  taskInput.value = "";
  clearFeedback();
  render();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(taskInput.value);
});

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    render();
  });
});

render();
