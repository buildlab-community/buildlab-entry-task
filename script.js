// ================================
// STUDENT TASK MANAGER
// ================================


// Get elements from the HTML
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");

const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const emptyState = document.getElementById("emptyState");
const formError = document.getElementById("formError");

const modalOverlay = document.getElementById("modalOverlay");
const openModalBtn = document.getElementById("openModalBtn");
const emptyAddBtn = document.getElementById("emptyAddBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");


// ================================
// TASK DATA
// ================================

let tasks = JSON.parse(localStorage.getItem("studentTasks")) || [];


// ================================
// SAVE TASKS
// ================================

function saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
}


// ================================
// OPEN MODAL
// ================================

function openModal() {
    modalOverlay.classList.add("show");
    taskInput.focus();
    formError.textContent = "";
}


// ================================
// CLOSE MODAL
// ================================

function closeModal() {
    modalOverlay.classList.remove("show");
    taskForm.reset();
    formError.textContent = "";
}


// ================================
// CREATE TASK
// ================================

function addTask(title) {

    const newTask = {
        id: Date.now(),
        title: title,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    renderTasks();

    updateStats();

    closeModal();
}


// ================================
// DELETE TASK
// ================================

function deleteTask(taskId) {

    const confirmed = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
        return;
    }

    tasks = tasks.filter(function(task) {
        return task.id !== taskId;
    });

    saveTasks();

    renderTasks();

    updateStats();
}


// ================================
// TOGGLE TASK STATUS
// ================================

function toggleTask(taskId) {

    tasks = tasks.map(function(task) {

        if (task.id === taskId) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks();

    renderTasks();

    updateStats();
}


// ================================
// GET FILTERED TASKS
// ================================

function getFilteredTasks() {

    const searchText = searchInput.value
        .trim()
        .toLowerCase();

    const selectedFilter = filterSelect.value;

    return tasks.filter(function(task) {

        const matchesSearch =
            task.title.toLowerCase().includes(searchText);

        const matchesFilter =
            selectedFilter === "all" ||
            (selectedFilter === "completed" && task.completed) ||
            (selectedFilter === "pending" && !task.completed);

        return matchesSearch && matchesFilter;
    });
}


// ================================
// DISPLAY TASKS
// ================================

function renderTasks() {

    const filteredTasks = getFilteredTasks();

    taskList.innerHTML = "";

    if (filteredTasks.length === 0) {

        const searchText = searchInput.value.trim();

        const message = searchText
            ? "No tasks match your search."
            : "No tasks found for this filter.";

        taskList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⌕</div>

                <h3>${message}</h3>

                <p>
                    Try changing your search or filter.
                </p>
            </div>
        `;

        return;
    }


    filteredTasks.forEach(function(task) {

        const taskElement = document.createElement("div");

        taskElement.className = "task-item";

        if (task.completed) {
            taskElement.classList.add("completed-task");
        }


        taskElement.innerHTML = `
            <div class="task-left">

                <button
                    class="task-check ${task.completed ? "completed" : ""}"
                    data-action="toggle"
                    data-id="${task.id}"
                    aria-label="Change task status"
                >
                    ${task.completed ? "✓" : ""}
                </button>

                <div>
                    <div class="task-title">
                        ${escapeHTML(task.title)}
                    </div>

                    <span class="task-status">
                        ${task.completed ? "Completed" : "Pending"}
                    </span>
                </div>

            </div>


            <div class="task-actions">

                <button
                    data-action="toggle"
                    data-id="${task.id}"
                >
                    ${task.completed ? "Reopen" : "Complete"}
                </button>

                <button
                    class="delete-btn"
                    data-action="delete"
                    data-id="${task.id}"
                >
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(taskElement);
    });
}


// ================================
// UPDATE STATISTICS
// ================================

function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    totalCount.textContent = total;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}


// ================================
// ESCAPE HTML
// ================================

function escapeHTML(text) {

    const element = document.createElement("div");

    element.textContent = text;

    return element.innerHTML;
}


// ================================
// FORM SUBMISSION
// ================================

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const title = taskInput.value.trim();


    if (title === "") {

        formError.textContent =
            "Please enter a task title.";

        taskInput.focus();

        return;
    }


    addTask(title);
});


// ================================
// TASK BUTTON ACTIONS
// ================================

taskList.addEventListener("click", function(event) {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const taskId = Number(button.dataset.id);

    const action = button.dataset.action;


    if (action === "toggle") {
        toggleTask(taskId);
    }


    if (action === "delete") {
        deleteTask(taskId);
    }
});


// ================================
// SEARCH
// ================================

searchInput.addEventListener("input", function() {

    renderTasks();
});


// ================================
// FILTER
// ================================

filterSelect.addEventListener("change", function() {

    renderTasks();
});


// ================================
// MODAL EVENTS
// ================================

openModalBtn.addEventListener("click", openModal);

emptyAddBtn.addEventListener("click", openModal);

closeModalBtn.addEventListener("click", closeModal);

cancelBtn.addEventListener("click", closeModal);


// Close modal when clicking outside it
modalOverlay.addEventListener("click", function(event) {

    if (event.target === modalOverlay) {
        closeModal();
    }
});


// Close modal with Escape key
document.addEventListener("keydown", function(event) {

    if (
        event.key === "Escape" &&
        modalOverlay.classList.contains("show")
    ) {
        closeModal();
    }
});


// ================================
// INITIAL LOAD
// ================================

renderTasks();

updateStats();


// ================================
// WELCOME SCREEN
// ================================

window.addEventListener("load", function () {

    setTimeout(function () {

        const welcomeScreen =
            document.getElementById("welcomeScreen");

        welcomeScreen.remove();

    }, 3800);

});