# BuildLab Student Task Manager

A lightweight task manager for students to organize coursework, see what is pending, and track completed work. The app is entirely client-side: tasks live in the browser's LocalStorage and are not sent to a server.

## Features

- Create tasks with a required, trimmed title
- Mark tasks complete and reopen them as pending
- Delete tasks immediately
- Search titles dynamically without regard to letter case
- Combine search with All, Pending, and Completed filters
- Live total, pending, and completed counts
- Helpful empty, filtered, search, and invalid-input states
- Responsive layout and keyboard-accessible controls
- Local persistence across page refreshes and browser restarts

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Browser LocalStorage

No frameworks, libraries, backend, API, or database are used.

## Run the project

Open `index.html` in a modern web browser. No installation, build step, server, or account is required. For the most consistent browser storage behavior, keep using the same browser and local file location.

## How LocalStorage works

On startup, `script.js` reads the `buildlab-student-task-manager` key and parses its JSON value into the task array. When a task is added, toggled, or deleted, the app serializes the updated array with `JSON.stringify()` and saves it with `localStorage.setItem()`. Search and filter selections only affect the current view and are not saved. If stored data is malformed, the app safely starts with an empty task list.

## Testing performed

- Checked the HTML, CSS, and JavaScript for editor diagnostics
- Verified form validation, task creation, completion/reopening, deletion, counters, search, filters, and LocalStorage persistence in the browser
- Checked the combined search and filter behavior and the empty states
- Inspected desktop, tablet, and mobile layouts in the browser

## AI usage

GitHub Copilot was used to assist with generating and structuring the HTML, CSS, JavaScript, and README; explaining implementation choices; checking code; debugging issues; and improving accessibility and responsive behavior. The project was then reviewed and tested in the browser.

## Challenges encountered

Keeping task changes, LocalStorage, displayed rows, and summary counts synchronized was the main implementation concern. The app handles this by routing every task mutation through save-and-render steps, while search and filtering are applied together to the same task array.

## Known limitations

- Data is stored only in the current browser's LocalStorage; it does not sync between devices or browsers.
- Clearing browser site data removes saved tasks.
- Browser privacy settings or storage restrictions may prevent persistence.
- There is no undo action or task export/import feature.
