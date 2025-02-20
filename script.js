
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM Elements
const taskInput = document.getElementById('taskInput');
const timeInput = document.getElementById('timeInput');
const taskList = document.getElementById('taskList');
const noTasks = document.getElementById('noTasks');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');

// Set default time to current hour:minute
const now = new Date();
timeInput.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

function saveTask() {
    const taskText = taskInput.value.trim();
    const taskTime = timeInput.value;

    if (!taskText) {
        shake(taskInput);
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        time: taskTime,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.unshift(newTask);
    saveTasks();
    renderTasks();
    
    
    taskInput.value = '';
    timeInput.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function renderTasks(taskList = tasks) {
    const filteredTasks = filterTasks(taskList);
    const taskListElement = document.getElementById('taskList');
    
    taskListElement.innerHTML = '';
    
    if (filteredTasks.length === 0) {
        noTasks.style.display = 'block';
    } else {
        noTasks.style.display = 'none';
        
        filteredTasks.forEach(task => {
            const taskElement = createTaskElement(task);
            taskListElement.appendChild(taskElement);
        });
    }
}
 //Javascript need to enabled by your end//
