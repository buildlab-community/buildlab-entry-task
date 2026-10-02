Student Task Manager

A simple and responsive Student Task Manager built with HTML, CSS, and JavaScript.

The application allows students to create and manage their tasks easily.

Features

- Add tasks
- Complete and reopen tasks
- Edit tasks
- Delete tasks
- Search tasks
- Case-insensitive search
- Filter tasks by All, Pending, and Completed
- Display task counters
- Set task priority
- Add due dates
- Responsive design

Technologies Used

- HTML
- CSS
- JavaScript
- LocalStorage

LocalStorage

LocalStorage is used to save the user's tasks in the browser.

When a task is added, edited, completed, or deleted, the updated task data is saved to LocalStorage.

This allows the tasks to remain available even after the page is refreshed or the browser is closed and opened again.

The application uses "JSON.stringify()" to store the tasks and "JSON.parse()" to retrieve them.

How it works

User manages tasks
       ↓
JavaScript updates the tasks
       ↓
Tasks are saved to LocalStorage
       ↓
Page is refreshed
       ↓
Tasks are loaded from LocalStorage
       ↓
Tasks appear again

LocalStorage acts as the browser's local storage for the application's task data. It is not a backend database.

Project Structure

student-task-manager/
├── index.html
├── style.css
├── script.js
└── README.md

How to Run

Open "index.html" in a web browser.

built by Abba Dadi

Built for the BuildLab Entry Challenge.