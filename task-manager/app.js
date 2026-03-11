/**
 * Task Manager – app.js
 *
 * Features:
 *  - Add tasks (title + optional description)
 *  - View all tasks
 *  - Toggle complete / incomplete
 *  - Delete individual tasks
 *  - Filter: All | Active | Completed
 *  - Show remaining-task count
 *  - Clear all completed tasks at once
 *  - Persist tasks in localStorage
 */

/* ================================================================
   Constants & state
   ================================================================ */

const STORAGE_KEY = 'task-manager-tasks';

/** @type {{ id: string, title: string, description: string, completed: boolean }[]} */
let tasks = [];

/** @type {'all' | 'active' | 'completed'} */
let currentFilter = 'all';

/* ================================================================
   DOM references
   ================================================================ */

const taskTitleInput     = document.getElementById('task-title-input');
const taskDescInput      = document.getElementById('task-desc-input');
const addTaskBtn         = document.getElementById('add-task-btn');
const taskList           = document.getElementById('task-list');
const emptyState         = document.getElementById('empty-state');
const taskCountEl        = document.getElementById('task-count');
const clearCompletedBtn  = document.getElementById('clear-completed-btn');
const filterBtns         = document.querySelectorAll('.filter-btn');

/* ================================================================
   Persistence helpers
   ================================================================ */

/** Load tasks from localStorage (gracefully handles parse errors). */
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : [];
  } catch {
    tasks = [];
  }
}

/** Save the current tasks array to localStorage. */
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/* ================================================================
   Task helpers
   ================================================================ */

/** Generate a simple unique ID. */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/**
 * Add a new task.
 * @param {string} title
 * @param {string} description
 */
function addTask(title, description) {
  const task = {
    id:          generateId(),
    title:       title.trim(),
    description: description.trim(),
    completed:   false,
  };
  tasks.push(task);
  saveTasks();
}

/**
 * Toggle the completed state of a task.
 * @param {string} id
 */
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
  }
}

/**
 * Delete a task by id.
 * @param {string} id
 */
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
}

/** Remove all completed tasks. */
function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
}

/* ================================================================
   Rendering
   ================================================================ */

/**
 * Return the subset of tasks matching the active filter.
 * @returns {typeof tasks}
 */
function getFilteredTasks() {
  switch (currentFilter) {
    case 'active':    return tasks.filter(t => !t.completed);
    case 'completed': return tasks.filter(t =>  t.completed);
    default:          return tasks;
  }
}

/**
 * Build and return a <li> element for a single task.
 * @param {{ id: string, title: string, description: string, completed: boolean }} task
 * @returns {HTMLLIElement}
 */
function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = 'task-item' + (task.completed ? ' completed' : '');
  li.dataset.id = task.id;

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type      = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.checked   = task.completed;
  checkbox.setAttribute('aria-label', `Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`);

  checkbox.addEventListener('change', () => {
    toggleTask(task.id);
    render();
  });

  // Task body
  const body = document.createElement('div');
  body.className = 'task-body';

  const titleEl = document.createElement('span');
  titleEl.className   = 'task-title';
  titleEl.textContent = task.title;
  body.appendChild(titleEl);

  if (task.description) {
    const descEl = document.createElement('p');
    descEl.className   = 'task-description';
    descEl.textContent = task.description;
    body.appendChild(descEl);
  }

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className        = 'btn btn-icon';
  deleteBtn.textContent      = '✕';
  deleteBtn.setAttribute('aria-label', `Delete task "${task.title}"`);

  deleteBtn.addEventListener('click', () => {
    deleteTask(task.id);
    render();
  });

  li.appendChild(checkbox);
  li.appendChild(body);
  li.appendChild(deleteBtn);

  return li;
}

/** Re-render the task list, counter, and empty state. */
function render() {
  const filtered = getFilteredTasks();

  // Clear and repopulate the list
  taskList.innerHTML = '';
  filtered.forEach(task => taskList.appendChild(createTaskElement(task)));

  // Empty state visibility
  emptyState.hidden = filtered.length > 0;

  // Remaining count (always based on ALL tasks, not the filtered subset)
  const remaining = tasks.filter(t => !t.completed).length;
  taskCountEl.textContent = remaining === 1 ? '1 task remaining' : `${remaining} tasks remaining`;

  // Show/hide "Clear Completed" button
  const hasCompleted = tasks.some(t => t.completed);
  clearCompletedBtn.style.visibility = hasCompleted ? 'visible' : 'hidden';
}

/* ================================================================
   Event handlers
   ================================================================ */

/** Handle the "Add Task" button / Enter key. */
function handleAddTask() {
  const title = taskTitleInput.value.trim();

  if (!title) {
    // Briefly highlight the input to signal it is required
    taskTitleInput.classList.add('input-error');
    taskTitleInput.focus();
    setTimeout(() => taskTitleInput.classList.remove('input-error'), 1000);
    return;
  }

  addTask(title, taskDescInput.value);
  taskTitleInput.value = '';
  taskDescInput.value  = '';
  taskTitleInput.focus();
  render();
}

// "Add Task" button click
addTaskBtn.addEventListener('click', handleAddTask);

// Allow pressing Enter in the title field to add the task
taskTitleInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleAddTask();
});

// Filter button clicks
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;

    // Update active style
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    render();
  });
});

// "Clear Completed" button
clearCompletedBtn.addEventListener('click', () => {
  clearCompleted();
  render();
});

/* ================================================================
   Inline style for input-error (avoids touching CSS for a transient state)
   ================================================================ */
(function injectErrorStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .task-input.input-error {
      border-color: #ef4444 !important;
      box-shadow: 0 0 0 3px rgba(239,68,68,.2) !important;
    }
  `;
  document.head.appendChild(style);
})();

/* ================================================================
   Bootstrap
   ================================================================ */

loadTasks();
render();
