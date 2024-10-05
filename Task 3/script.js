// Selecting elements
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-desc');
const addTaskButton = document.getElementById('addTask');
const pendingTasksList = document.getElementById('pending-tasks-list');
const completedTasksList = document.getElementById('completed-tasks-list');

let tasks = [];
let currentTaskId = null; // Track the currently edited task

// Add a new task or update an existing task
addTaskButton.addEventListener('click', function () {
    const taskTitle = taskTitleInput.value;
    const taskDesc = taskDescInput.value;

    if (taskTitle && taskDesc) {
        if (currentTaskId) {
            // Update existing task
            const taskToUpdate = tasks.find(t => t.id === currentTaskId);
            taskToUpdate.title = taskTitle;
            taskToUpdate.description = taskDesc;
            currentTaskId = null; // Reset current task ID after update
        } else {
            // Add new task
            const newTask = {
                title: taskTitle,
                description: taskDesc,
                dateAdded: new Date().toLocaleString(),
                isCompleted: false,
                id: Date.now()
            };
            tasks.push(newTask);
        }
        renderTasks();
        taskTitleInput.value = '';
        taskDescInput.value = '';
    } else {
        alert("Please fill out the title and description fields.");
    }
});

// Render tasks to the respective lists
function renderTasks() {
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.isCompleted ? task.dateCompleted : task.dateAdded}</td>
            <td>
                <button class="delete-btn" onclick="deleteTask(${task.id})">X</button>
                ${!task.isCompleted ? `<button class="complete-btn" onclick="completeTask(${task.id})">Complete</button>` : ''}
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
            </td>
        `;
        if (task.isCompleted) {
            completedTasksList.appendChild(row);
        } else {
            pendingTasksList.appendChild(row);
        }
    });
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

// Mark task as completed
function completeTask(id) {
    const task = tasks.find(t => t.id === id);
    task.isCompleted = true;
    task.dateCompleted = new Date().toLocaleString();
    renderTasks();
}

// Edit a task
function editTask(id) {
    const taskToEdit = tasks.find(t => t.id === id);
    taskTitleInput.value = taskToEdit.title;
    taskDescInput.value = taskToEdit.description;
    currentTaskId = id; // Set the current task ID to be updated
}
