const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let searchQuery = '';

const taskForm = document.querySelector('#taskForm');
const taskInput = document.querySelector('#taskInput');
const errorMessage = document.querySelector('#errorMessage');
const totalTasks = document.querySelector('#totalTasks');
const pendingTasks = document.querySelector('#pendingTasks');
const completedTasks = document.querySelector('#completedTasks');
const searchInput = document.querySelector('#searchInput');
const filterButtons = document.querySelectorAll('[data-filter]');
const taskList = document.querySelector('#taskList');
const emptyState = document.querySelector('#emptyState');

function saveTasks() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
	const completedCount = tasks.filter((task) => task.completed).length;
	const pendingCount = tasks.length - completedCount;

	filterButtons.forEach((button) => {
		const isActive = button.dataset.filter === currentFilter;
		button.classList.toggle('active', isActive);
		button.setAttribute('aria-pressed', String(isActive));
	});

	totalTasks.textContent = tasks.length;
	pendingTasks.textContent = pendingCount;
	completedTasks.textContent = completedCount;

	const filteredTasks = tasks.filter((task) => {
		const matchesFilter = currentFilter === 'all'
			|| (currentFilter === 'pending' && !task.completed)
			|| (currentFilter === 'completed' && task.completed);
		const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());

		return matchesFilter && matchesSearch;
	});

	taskList.replaceChildren();

	filteredTasks.forEach((task) => {
		const listItem = document.createElement('li');
		const status = document.createElement('span');
		const text = document.createElement('span');
		const toggleButton = document.createElement('button');
		const deleteButton = document.createElement('button');

		listItem.classList.toggle('completed', task.completed);
		status.className = 'task-status';
		status.textContent = task.completed ? 'Completed' : 'Pending';
		text.className = 'task-text';
		text.textContent = task.text;

		toggleButton.type = 'button';
		toggleButton.dataset.action = 'toggle';
		toggleButton.dataset.id = task.id;
		toggleButton.textContent = task.completed ? 'Reopen' : 'Complete';

		deleteButton.type = 'button';
		deleteButton.dataset.action = 'delete';
		deleteButton.dataset.id = task.id;
		deleteButton.textContent = 'Delete';

		listItem.append(status, text, toggleButton, deleteButton);
		taskList.append(listItem);
	});

	if (tasks.length === 0) {
		emptyState.textContent = 'No tasks yet. Add a task to get started.';
	} else if (filteredTasks.length === 0) {
		emptyState.textContent = 'No tasks match your current search or filter.';
	} else {
		emptyState.textContent = '';
	}
}

taskForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const text = taskInput.value.trim();

	if (!text) {
		errorMessage.textContent = 'Please enter a task.';
		taskInput.focus();
		return;
	}

	errorMessage.textContent = '';
	tasks.push({ id: Date.now(), text, completed: false });
	saveTasks();
	taskForm.reset();
	render();
});

taskList.addEventListener('click', (event) => {
	const button = event.target.closest('button[data-action]');

	if (!button) {
		return;
	}

	const taskId = Number(button.dataset.id);
	const taskIndex = tasks.findIndex((task) => task.id === taskId);

	if (taskIndex === -1) {
		return;
	}

	if (button.dataset.action === 'toggle') {
		tasks[taskIndex].completed = !tasks[taskIndex].completed;
	} else if (button.dataset.action === 'delete') {
		tasks.splice(taskIndex, 1);
	}

	saveTasks();
	render();
});

searchInput.addEventListener('input', () => {
	searchQuery = searchInput.value;
	render();
});

filterButtons.forEach((button) => {
	button.addEventListener('click', () => {
		currentFilter = button.dataset.filter;
		render();
	});
});

render();
