
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

function createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskDiv.dataset.id = task.id;

    taskDiv.innerHTML = `
        <div class="task-content">
            <div class="task-text">${escapeHtml(task.text)}</div>
            <div class="task-time">At ${formatTime(task.time)}</div>
        </div>
        <div class="task-actions">
            <button class="task-btn complete-btn" onclick="toggleComplete(${task.id})">
                <i class="fas ${task.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
            </button>
            <button class="task-btn delete-btn" onclick="deleteTask(${task.id})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    return taskDiv;
}

function toggleComplete(taskId) {
    tasks = tasks.map(task => 
        task.id === taskId 
            ? {...task, completed: !task.completed}
            : task
    );
    saveTasks();
    renderTasks();
}

function deleteTask(taskId) {
    const taskElement = document.querySelector(`.task-item[data-id="${taskId}"]`);
    
    taskElement.classList.add('fall');
    taskElement.addEventListener('transitionend', () => {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    });
}

function searchTasks() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm)
    );
    renderTasks(filteredTasks);
}

function filterTasks(taskList = tasks) {
    const filterValue = filterSelect.value;
    
    switch(filterValue) {
        case 'completed':
            return taskList.filter(task => task.completed);
        case 'active':
            return taskList.filter(task => !task.completed);
        default:
            return taskList;
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function shake(element) {
    element.classList.add('shake');
    element.addEventListener('animationend', () => {
        element.classList.remove('shake');
    });
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        saveTask();
    }
});


renderTasks();

//Darkmode toggle//
function darkmode() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
  
    if (isDarkMode) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light'); 
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark'); 
    }
  }
  
  document.getElementsByClassName('toggle-button').addEventListener('click', toggleTheme);

  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.add(`${savedTheme}-mode`);
    } else {
      document.body.classList.add('light-mode'); // Default theme
    }
  });

  //Your Github link here//
  function github() {
    window.location.href= "https://github.com/sg264";
  }