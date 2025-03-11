document.addEventListener("DOMContentLoaded", loadTasks); // Load tasks on page load

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");

    let task = {
        text: taskText,
        completed: false
    };

    saveTaskToLocalStorage(task);

    createTaskElement(task);

    taskInput.value = "";
}

function createTaskElement(task) {
    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.classList.add("task-checkbox");

    let taskTextElement = document.createElement("span");
    taskTextElement.textContent = task.text;
    taskTextElement.classList.add("task-text");
    
    if (task.completed) {
        taskTextElement.classList.add("completed");
    }

    checkbox.onclick = function () {
        taskTextElement.classList.toggle("completed", checkbox.checked);
        updateTaskStatus(task.text, checkbox.checked);
    };

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () {
        li.remove();
        removeTaskFromLocalStorage(task.text);
    };

    li.appendChild(checkbox);
    li.appendChild(taskTextElement);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
}

// Store tasks in local storage
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage when page refreshes
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(createTaskElement);
}

// Update task completion status in local storage
function updateTaskStatus(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        if (task.text === taskText) {
            task.completed = isCompleted;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove a task from local storage
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
