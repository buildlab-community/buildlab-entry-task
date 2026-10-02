


// ---------- HTML ELEMENTS ----------

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

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

let tasks = JSON.parse(
    localStorage.getItem("studentTasks")
) || [];

let currentFilter = "all";


function saveTasks() {

    localStorage.setItem(
        "studentTasks",
        JSON.stringify(tasks)
    );
}

function addTask() {

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


    // Create task object
    const newTask = {

        id: Date.now(),

        title: title,

        completed: false
    };


    // Add task
    tasks.push(newTask);


    // Save task
    saveTasks();


    // Clear input
    taskInput.value = "";


    // Update interface
    renderTasks();


    // Put cursor back in input
    taskInput.focus();
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


        // Add completed class
        if (task.completed) {

            listItem.classList.add("completed");
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


        // Task title
        const taskTitle =
            document.createElement("span");

        taskTitle.classList.add("task-title");

        taskTitle.textContent = task.title;


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


        // Build task
        taskContent.appendChild(checkbox);

        taskContent.appendChild(taskTitle);

        listItem.appendChild(taskContent);

        listItem.appendChild(deleteButton);

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
                    }
                );


                // Activate clicked button
                button.classList.add("active");


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


addTaskBtn.addEventListener(
    "click",
    addTask
);


taskInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            addTask();
        }
    }
);


renderTasks();