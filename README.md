# Student Task Manager 📝

A lightweight, responsive web application designed for students to organize, track, and manage their daily tasks efficiently. Built from scratch with pure vanilla web technologies to demonstrate core JavaScript DOM manipulation, state-driven UI rendering, and browser storage persistence.

---

## 1. What the Project Is

The **Student Task Manager** is a single-page application (SPA) created as an entry project for the **BuildLab Software Engineering Community**. 

It provides an intuitive interface where students can add tasks, track their status, filter through pending or completed items, search by keywords, and view live statistics on their workload. The app operates entirely client-side, requiring no external libraries, frameworks, or backend infrastructure.

---

## 2. Features

- **Task Creation:** Quickly add new tasks with real-time validation to prevent empty submissions.
- **Task Viewing & Status Management:** View all tasks clearly and toggle status between **Pending** and **Completed** with a single click.
- **Task Deletion:** Remove individual tasks seamlessly from the list.
- **Case-Insensitive Search:** Instantly query tasks by title regardless of capitalization (e.g., searching `assignment`, `Assignment`, or `ASSIGNMENT` yields identical results).
- **Task Filtering:** Filter tasks dynamically by status (`All`, `Pending`, or `Completed`).
- **Live Summary Counters:** Dynamic statistics showing real-time metrics for **Total Tasks**, **Pending Tasks**, and **Completed Tasks**.
- **Data Persistence:** Tasks remain saved across browser sessions and page refreshes.
- **Responsive Design:** Optimized user experience across Mobile, Tablet, and Desktop screens.
- **User Feedback & Edge Cases:** Friendly empty-state indicators when no tasks exist or when search filters yield zero results.

---

## 3. How to Run It

Since this project is built using native web technologies, no installation, dependencies, or local server setups (`npm install` / `node`) are required.

### Options to Launch:

1. **Direct File Execution:**
   - Clone or download this repository.
   - Locate `index.html` in the root folder.
   - Double-click `index.html` (or right-click and open with your preferred browser: Chrome, Edge, Firefox, Safari).

2. **VS Code Live Server (Optional):**
   - Open the project folder in **VS Code**.
   - Right-click `index.html` and select **Open with Live Server**.

---

## 4. How Data Is Stored

This application uses the browser's native **`LocalStorage` API** to store task data locally on the user's device.

### Implementation Details:
- **Data Model:** Tasks are represented as an array of objects:
  ```json
  [
    {
      "id": 1710000000000,
      "text": "Complete Software Engineering Assignment",
      "completed": false
    }
  ]