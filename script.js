<<<<<<< HEAD
const STORAGE_KEY = "buildlab-student-task-manager";

let tasks = loadTasks();
let currentFilter = "all";
let currentSearch = "";

const taskForm = document.querySelector("#task-form");
const taskTitleInput = document.querySelector("#task-title");
const formFeedback = document.querySelector("#form-feedback");
const taskSearchInput = document.querySelector("#task-search");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const emptyTitle = document.querySelector("#empty-title");
const emptyMessage = document.querySelector("#empty-message");
const taskCountLabel = document.querySelector("#task-count-label");

function loadTasks() {
  try {
    const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(savedTasks)) return [];

    return savedTasks.filter((task) => (
      task && typeof task.id === "string" &&
      typeof task.title === "string" && task.title.trim() &&
      typeof task.completed === "boolean"
    ));
  } catch {
=======
const STORAGE_KEY = "student-task-manager-v1";

const state = {
  tasks: loadTasks(),
  filter: "all",
  query: ""
};

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const feedback = document.getElementById("feedback");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");

const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
>>>>>>> upstream/main
    return [];
  }
}

function saveTasks() {
<<<<<<< HEAD
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    formFeedback.textContent = "Tasks could not be saved in this browser.";
  }
}

function renderTasks() {
  const visibleTasks = searchTasks(filterTasks(tasks));
  taskList.replaceChildren();

  visibleTasks.forEach((task) => {
    const row = document.createElement("li");
    row.className = `task-row${task.completed ? " is-completed" : ""}`;

    const toggleButton = document.createElement("button");
    toggleButton.className = "toggle-button";
    toggleButton.type = "button";
    toggleButton.setAttribute("aria-label", `${task.completed ? "Reopen" : "Complete"} ${task.title}`);
    toggleButton.setAttribute("aria-pressed", String(task.completed));
    toggleButton.innerHTML = '<span class="checkmark" aria-hidden="true"></span>';
    toggleButton.addEventListener("click", () => toggleTask(task.id));

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const status = document.createElement("span");
    status.className = "status-badge";
    status.textContent = task.completed ? "Completed" : "Pending";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", `Delete ${task.title}`);
    deleteButton.title = "Delete task";
    deleteButton.textContent = "×";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    actions.append(status, deleteButton);
    row.append(toggleButton, title, actions);
    taskList.append(row);
  });

  updateEmptyState(visibleTasks.length);
  updateSummary();
}

function addTask(event) {
  event.preventDefault();
  const title = taskTitleInput.value.trim();

  if (!title) {
    formFeedback.textContent = "Please enter a task title.";
    taskTitleInput.setAttribute("aria-invalid", "true");
    taskTitleInput.focus();
    return;
  }

  tasks.unshift({ id: createTaskId(), title, completed: false });
  formFeedback.textContent = "";
  taskTitleInput.removeAttribute("aria-invalid");
  taskForm.reset();
  saveTasks();
  renderTasks();
  taskTitleInput.focus();
}

function toggleTask(taskId) {
  tasks = tasks.map((task) => (
    task.id === taskId ? { ...task, completed: !task.completed } : task
  ));
  saveTasks();
=======
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
}

function setFeedback(message, isError = false) {
  feedback.textContent = message;
  feedback.style.color = isError ? "#d93b4f" : "#1f9d68";
}

function getFilteredTasks() {
  const query = state.query.trim().toLowerCase();

  return state.tasks.filter((task) => {
    const matchesFilter =
      state.filter === "all" ||
      (state.filter === "pending" && !task.completed) ||
      (state.filter === "completed" && task.completed);

    const matchesQuery =
      query === "" ||
      task.title.toLowerCase().includes(query);

    return matchesFilter && matchesQuery;
  });
}

function updateSummary() {
  const total = state.tasks.length;
  const pending = state.tasks.filter((task) => !task.completed).length;
  const completed = state.tasks.filter((task) => task.completed).length;

  totalCount.textContent = total;
  pendingCount.textContent = pending;
  completedCount.textContent = completed;
}

function renderTasks() {
  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
      <li class="empty-state">
        ${state.tasks.length === 0
          ? "No tasks yet. Add your first task to get started."
          : "No matching tasks found for your search."}
      </li>
    `;
    return;
  }

  taskList.innerHTML = filteredTasks
    .map((task) => `
      <li class="task-item ${task.completed ? "completed" : ""}" data-id="${task.id}">
        <div class="task-main">
          <span class="task-status" aria-hidden="true"></span>
          <span class="task-text">${escapeHtml(task.title)}</span>
        </div>

        <div class="task-meta">
          <button
            class="task-toggle"
            type="button"
            data-action="toggle"
            data-id="${task.id}"
          >
            ${task.completed ? "Mark Pending" : "Mark Done"}
          </button>
          <button
            class="task-delete"
            type="button"
            data-action="delete"
            data-id="${task.id}"
          >
            Delete
          </button>
        </div>
      </li>
    `)
    .join("");
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function addTask(title) {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    setFeedback("Task title cannot be empty.", true);
    return;
  }

  const newTask = {
    id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}-${Math.random()}`,
    title: trimmedTitle,
    completed: false
  };

  state.tasks.unshift(newTask);
  saveTasks();
  updateSummary();
  renderTasks();
  taskInput.value = "";
  taskInput.focus();
  setFeedback("Task added successfully.");
}

function toggleTask(taskId) {
  state.tasks = state.tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasks();
  updateSummary();
>>>>>>> upstream/main
  renderTasks();
}

function deleteTask(taskId) {
<<<<<<< HEAD
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
}

function searchTasks(taskItems) {
  const query = currentSearch.trim().toLocaleLowerCase();
  if (!query) return taskItems;
  return taskItems.filter((task) => task.title.toLocaleLowerCase().includes(query));
}

function filterTasks(taskItems) {
  if (currentFilter === "all") return taskItems;
  return taskItems.filter((task) => (
    currentFilter === "completed" ? task.completed : !task.completed
  ));
}

function updateSummary() {
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  document.querySelector("#total-count").textContent = tasks.length;
  document.querySelector("#pending-count").textContent = pendingCount;
  document.querySelector("#completed-count").textContent = completedCount;
  taskCountLabel.textContent = `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`;
}

function updateEmptyState(visibleCount) {
  emptyState.hidden = visibleCount > 0;
  if (visibleCount > 0) return;

  if (tasks.length === 0) {
    emptyTitle.textContent = "A clear page is a fresh start.";
    emptyMessage.textContent = "Add your first task above and make today count.";
  } else if (currentSearch.trim()) {
    emptyTitle.textContent = "No search results.";
    emptyMessage.textContent = "Try a different word or adjust your filters.";
  } else {
    emptyTitle.textContent = "Nothing in this filter yet.";
    emptyMessage.textContent = "Choose another view or add a new task above.";
  }
}

function createTaskId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

taskForm.addEventListener("submit", addTask);
taskTitleInput.addEventListener("input", () => {
  if (taskTitleInput.value.trim()) {
    formFeedback.textContent = "";
    taskTitleInput.removeAttribute("aria-invalid");
  }
});
taskSearchInput.addEventListener("input", () => {
  currentSearch = taskSearchInput.value;
  renderTasks();
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
=======
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  saveTasks();
  updateSummary();
  renderTasks();
  setFeedback("Task deleted.");
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(taskInput.value);
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderTasks();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn === button);
    });

>>>>>>> upstream/main
    renderTasks();
  });
});

<<<<<<< HEAD
renderTasks();
=======
taskList.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  const taskId = target.dataset.id;
  const action = target.dataset.action;

  if (action === "toggle") {
    toggleTask(taskId);
  }

  if (action === "delete") {
    deleteTask(taskId);
  }
});

function initialize() {
  updateSummary();
  renderTasks();
}

initialize();
>>>>>>> upstream/main
