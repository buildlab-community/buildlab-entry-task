


// ---------- HTML ELEMENTS ----------

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");
const taskForm = document.getElementById("taskForm");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const formHeading = document.getElementById("formHeading");
const formModeLabel = document.getElementById("formModeLabel");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const taskCountBadge = document.getElementById("taskCountBadge");

const errorMessage = document.getElementById("errorMessage");

const emptyState = document.getElementById("emptyState");
const emptyTitle = document.getElementById("emptyTitle");
const emptyText = document.getElementById("emptyText");

const filterButtons = document.querySelectorAll(".filter-btn");


// ---------- APPLICATION STATE ----------

function loadTasks() {
    try {
        const savedTasks = JSON.parse(
            localStorage.getItem("studentTasks") || "[]"
        );

        if (!Array.isArray(savedTasks)) {
            return [];
        }

        return savedTasks.filter(function (task) {
            return task && typeof task === "object";
        }).map(function (task) {
            const priority = ["low", "medium", "high"].includes(task.priority)
                ? task.priority
                : "medium";

            return {
                ...task,
                title: typeof task.title === "string" ? task.title : "",
                completed: Boolean(task.completed),
                priority: priority,
                dueDate: typeof task.dueDate === "string" ? task.dueDate : ""
            };
        });
    } catch (error) {
        return [];
    }
}

let tasks = loadTasks();

let currentFilter = "all";
let editingTaskId = null;


function saveTasks() {

    localStorage.setItem(
        "studentTasks",
        JSON.stringify(tasks)
    );
}

function submitTask(event) {
    event.preventDefault();

    const title = taskInput.value.trim();


    // Prevent empty task
    if (title === "") {

        errorMessage.textContent =
            "Please enter a task before adding it.";

        taskInput.focus();

        return;
    }


    // Clear error
    errorMessage.textContent = "";


    if (editingTaskId !== null) {
        const task = tasks.find(function (item) {
            return item.id === editingTaskId;
        });

        if (task) {
            task.title = title;
            task.priority = priorityInput.value;
            task.dueDate = dueDateInput.value;
        }
    } else {
        tasks.push({
            id: Date.now(),
            title: title,
            description: "",
            completed: false,
            priority: priorityInput.value,
            dueDate: dueDateInput.value
        });
    }


    // Save task
    saveTasks();


    resetTaskForm();


    // Update interface
    renderTasks();


    // Put cursor back in input
    taskInput.focus();
}

function beginEdit(task) {
    editingTaskId = task.id;
    taskInput.value = task.title;
    priorityInput.value = task.priority;
    dueDateInput.value = task.dueDate;
    addTaskBtn.innerHTML = "Save Changes";
    formHeading.textContent = "Edit task";
    formModeLabel.textContent = "UPDATE TASK";
    cancelEditBtn.hidden = false;
    errorMessage.textContent = "";
    taskInput.focus();
}

function resetTaskForm() {
    editingTaskId = null;
    taskForm.reset();
    priorityInput.value = "medium";
    addTaskBtn.innerHTML = "<span>+</span> Add Task";
    formHeading.textContent = "Add a task";
    formModeLabel.textContent = "NEW TASK";
    cancelEditBtn.hidden = true;
    errorMessage.textContent = "";
}

function getTodayDate() {
    const today = new Date();
    const timezoneOffset = today.getTimezoneOffset() * 60000;
    return new Date(today.getTime() - timezoneOffset).toISOString().slice(0, 10);
}


function renderTasks() {

    taskList.innerHTML = "";


    // Get search text
    const searchTerm =
        searchInput.value.trim().toLowerCase();


    // Filter tasks
    const filteredTasks = tasks.filter(function (task) {


        // Convert task title to lowercase
        // This makes searching case-insensitive
        const taskTitle =
            task.title.toLowerCase();


        // Search match
        const matchesSearch =
            taskTitle.includes(searchTerm);


        // Filter match
        const matchesFilter =
            currentFilter === "all" ||

            (
                currentFilter === "pending" &&
                !task.completed
            ) ||

            (
                currentFilter === "completed" &&
                task.completed
            );


        return matchesSearch && matchesFilter;
    });


    // Update counters
    updateStats();


    // Update task badge
    updateTaskBadge(filteredTasks.length);


    // Show empty state
    if (filteredTasks.length === 0) {

        showEmptyState(searchTerm);

        return;
    }


    // Hide empty state
    emptyState.style.display = "none";


    // Create each task
    filteredTasks.forEach(function (task) {

        const listItem =
            document.createElement("li");

        listItem.classList.add("task-item");
        listItem.id = `task-${task.id}`;
        listItem.tabIndex = -1;


        // Add completed class
        if (task.completed) {

            listItem.classList.add("completed");
        }

        const isOverdue =
            !task.completed && task.dueDate !== "" && task.dueDate < getTodayDate();

        if (isOverdue) {
            listItem.classList.add("overdue");
        }


        // Task content
        const taskContent =
            document.createElement("div");

        taskContent.classList.add("task-content");


        // Checkbox
        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("task-checkbox");

        checkbox.checked = task.completed;

        checkbox.setAttribute(
            "aria-label",
            `Mark ${task.title} as complete`
        );


        const taskDetails =
            document.createElement("div");

        taskDetails.classList.add("task-details");

        // Task title
        const taskTitle =
            document.createElement("span");

        taskTitle.classList.add("task-title");

        taskTitle.textContent = task.title;

        const taskMetadata =
            document.createElement("div");

        taskMetadata.classList.add("task-metadata");

        const priorityLabel =
            document.createElement("span");

        priorityLabel.classList.add("priority-label", `priority-${task.priority}`);
        priorityLabel.textContent = `${task.priority[0].toUpperCase()}${task.priority.slice(1)} priority`;
        taskMetadata.appendChild(priorityLabel);

        if (task.dueDate) {
            const dueDateLabel = document.createElement("span");
            dueDateLabel.classList.add("due-date-label");
            dueDateLabel.textContent = `Due ${new Date(`${task.dueDate}T00:00:00`).toLocaleDateString()}`;

            if (isOverdue) {
                dueDateLabel.textContent += " · Overdue";
                dueDateLabel.setAttribute("aria-label", `Due ${task.dueDate}, overdue`);
            }

            taskMetadata.appendChild(dueDateLabel);
        }


        // Delete button
        const deleteButton =
            document.createElement("button");

        deleteButton.type = "button";

        deleteButton.classList.add("delete-btn");

        deleteButton.textContent = "Delete";

        deleteButton.setAttribute(
            "aria-label",
            `Delete ${task.title}`
        );

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.classList.add("edit-btn");
        editButton.textContent = "Edit";
        editButton.setAttribute("aria-label", `Edit ${task.title}`);


        // Complete / uncomplete task
        checkbox.addEventListener(
            "change",
            function () {

                task.completed =
                    checkbox.checked;

                saveTasks();

                renderTasks();
            }
        );


        // Delete task
        deleteButton.addEventListener(
            "click",
            function () {

                tasks = tasks.filter(
                    function (item) {

                        return item.id !== task.id;
                    }
                );

                saveTasks();

                renderTasks();
            }
        );

        editButton.addEventListener("click", function () {
            beginEdit(task);
        });


        // Build task
        taskContent.appendChild(checkbox);

        taskDetails.appendChild(taskTitle);
        taskDetails.appendChild(taskMetadata);
        taskContent.appendChild(taskDetails);

        listItem.appendChild(taskContent);

        const taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");
        taskActions.appendChild(editButton);
        taskActions.appendChild(deleteButton);
        listItem.appendChild(taskActions);

        taskList.appendChild(listItem);
    });
}


function updateStats() {

    const total = tasks.length;


    const completed =
        tasks.filter(function (task) {

            return task.completed;

        }).length;


    const pending =
        total - completed;


    totalTasks.textContent = total;

    pendingTasks.textContent = pending;

    completedTasks.textContent = completed;
}

function updateTaskBadge(count) {

    taskCountBadge.textContent =
        `${count} ${count === 1 ? "task" : "tasks"}`;
}


function showEmptyState(searchTerm) {

    emptyState.style.display = "block";


    if (searchTerm !== "") {

        emptyTitle.textContent =
            "No matching tasks";

        emptyText.textContent =
            "Try a different search term.";
    }

    else if (currentFilter === "pending") {

        emptyTitle.textContent =
            "No pending tasks";

        emptyText.textContent =
            "You're all caught up!";
    }

    else if (currentFilter === "completed") {

        emptyTitle.textContent =
            "No completed tasks";

        emptyText.textContent =
            "Complete a task and it will appear here.";
    }

    else {

        emptyTitle.textContent =
            "No tasks yet";

        emptyText.textContent =
            "Add your first task above and start making progress.";
    }
}


filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {


                // Remove active state
                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove("active");
                        btn.setAttribute("aria-pressed", "false");
                    }
                );


                // Activate clicked button
                button.classList.add("active");
                button.setAttribute("aria-pressed", "true");


                // Get selected filter
                currentFilter =
                    button.dataset.filter;


                // Render filtered tasks
                renderTasks();
            }
        );
    }
);


function searchTasks() {

    renderTasks();

    const firstResult = taskList.querySelector(".task-item");

    if (firstResult) {
        firstResult.scrollIntoView({ behavior: "smooth", block: "center" });
        firstResult.focus({ preventScroll: true });
    }
}


// Search button
searchBtn.addEventListener(
    "click",
    searchTasks
);


// Press Enter to search
searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchTasks();
        }
    }
);


taskForm.addEventListener("submit", submitTask);

cancelEditBtn.addEventListener("click", function () {
    resetTaskForm();
    taskInput.focus();
});


saveTasks();
renderTasks();