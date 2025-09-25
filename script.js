import { addTask, deleteTask, toggleComplete, editTask, getTasks, setTasks } from './todo.js';

// DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const prioritySelect = document.getElementById("prioritySelect");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const sortSelect = document.getElementById("sortSelect");

// Load tasks from localStorage
const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
setTasks(storedTasks);
renderTasks();

// Add Task
addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    const priority = prioritySelect.value;
    if (!text) return;

    addTask(text, priority);
    saveTasks();
    renderTasks();
    taskInput.value = "";
});

// Filter, Search, Sort
searchInput.addEventListener("input", renderTasks);
filterSelect.addEventListener("change", renderTasks);
sortSelect.addEventListener("change", renderTasks);

function renderTasks() {
    // Start with all tasks
    let currentTasks = [...getTasks()];

    // 1. Filter
    const filter = filterSelect.value;
    if (filter === "Active") {
        currentTasks = currentTasks.filter(t => !t.completed);
    } else if (filter === "Completed") {
        currentTasks = currentTasks.filter(t => t.completed);
    }

    // 2. Search
    const query = searchInput.value.toLowerCase();
    if (query) {
        currentTasks = currentTasks.filter(t => t.text.toLowerCase().includes(query));
    }

    // 3. Sort
    const sortBy = sortSelect.value;
    if (sortBy === "priority") {
        const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
        currentTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else {
        currentTasks.sort((a, b) => a.id - b.id); // sort by date
    }

    // Render
    taskList.innerHTML = "";
    currentTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `${task.completed ? "completed" : ""} priority-${task.priority}`;

        const span = document.createElement("span");
        span.textContent = `[${task.priority}] ${task.text}`;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.className = "complete";
        completeBtn.addEventListener("click", () => {
            toggleComplete(task.id);
            saveTasks();
            renderTasks();
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "✎";
        editBtn.className = "edit";
        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit task:", task.text);
            if (newText !== null) {
                editTask(task.id, newText.trim());
                saveTasks();
                renderTasks();
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.className = "delete";
        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
            saveTasks();
            renderTasks();
        });

        actions.append(completeBtn, editBtn, deleteBtn);
        li.appendChild(span);
        li.appendChild(actions);
        taskList.appendChild(li);
    });
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(getTasks()));
}
