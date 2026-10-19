const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

// Counter elements
const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

// Function to update the numbers automatically
function updateCounters() {
    const allTasks = taskList.getElementsByTagName("li");
    let total = allTasks.length;
    let completed = 0;

    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].classList.contains("completed")) {
            completed++;
        }
    }

    let pending = total - completed;

    // Update the HTML text
    if (totalCount) totalCount.textContent = total;
    if (pendingCount) pendingCount.textContent = pending;
    if (completedCount) completedCount.textContent = completed;
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskTitle = taskInput.value.trim();

    if (taskTitle === "") {
        alert("Please enter a task!");
        return;
    }

    // 1. Create the list item (li)
    const listItem = document.createElement("li");
    listItem.textContent = taskTitle + " ";

    // 2. Add a click event to toggle completion
    listItem.addEventListener("click", function() {
        listItem.classList.toggle("completed");
        updateCounters(); // Update numbers when completed status changes
    });

    // 3. Create a Delete button for this specific task
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    // Stop click from triggering completion when clicking delete
    deleteButton.addEventListener("click", function(event) {
        event.stopPropagation();
        taskList.removeChild(listItem);
        updateCounters(); // Update numbers when task is deleted
    });

    // 4. Attach delete button inside list item
    listItem.appendChild(deleteButton);

    // 5. Add finished list item into the main task list
    taskList.appendChild(listItem);

    // 6. Clear input box and update counters
    taskInput.value = "";
    updateCounters();
});

// Search functionality
searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.toLowerCase();
    const tasks = taskList.getElementsByTagName("li");

    for (let i = 0; i < tasks.length; i++) {
        const taskText = tasks[i].textContent.toLowerCase();
        
        if (taskText.includes(searchTerm)) {
            tasks[i].style.display = "";
        } else {
            tasks[i].style.display = "none";
        }
    }
});
