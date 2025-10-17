// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory array to hold tasks
    let tasks = [];

    // Load tasks from localStorage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // ensure tasks array reflects stored tasks
        tasks = Array.isArray(storedTasks) ? storedTasks.slice() : [];

        // Render each stored task (do not save again when rendering)
        tasks.forEach(taskText => addTask(taskText, false));
    }

    // Save the in-memory tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Add a task to the DOM and optionally save it to localStorage.
     * @param {string|null} taskText - Text of the task. If null, reads from input field.
     * @param {boolean} save - Whether to save this new task to localStorage (default true).
     */
    function addTask(taskText = null, save = true) {
        // If no taskText provided, take it from input
        if (taskText === null) {
            taskText = taskInput.value.trim();
        } else {
            taskText = String(taskText).trim();
        }

        // Validate
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create list item and remove button
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Attach remove handler
        removeBtn.addEventListener('click', () => {
            // Remove from DOM
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }

            // Remove from tasks array (remove first matching item)
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        });

        // Append remove button and the li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If save flag true, add to in-memory array and persist
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // Clear input if the task came from the input field
        if (taskInput.value.trim() === taskText) {
            taskInput.value = '';
        }
    }

    // Add task on button click
    addButton.addEventListener('click', () => addTask());

    // Add task on Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    });

    // Initially load tasks from localStorage
    loadTasks();
});
