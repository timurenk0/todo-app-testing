let tasks = [];

function addTask(text, priority = "Medium") {
    if (!text) return null;
    const task = { text, priority, completed: false, id: Date.now() };
    tasks.push(task);
    return task;
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
}

function toggleComplete(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
}

function editTask(id, newText) {
    tasks = tasks.map(t => t.id === id ? { ...t, text: newText || t.text } : t);
}

function filterTasks(filter) {
    if (filter === "Active") return tasks.filter(t => !t.completed);
    if (filter === "Completed") return tasks.filter(t => t.completed);
    return tasks;
}

function searchTasks(query) {
    return tasks.filter(t => t.text.toLowerCase().includes(query.toLowerCase()));
}

function sortTasks(by) {
    if (by === "priority") {
        const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
        return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (by === "date") {
        return [...tasks].sort((a, b) => a.id - b.id);
    } else {
        throw new Error("Please enter valid parameter (priority / date)");
    }
}

function clearTasks() {
    tasks = [];
}

function getTasks() {
    return tasks;
}

function setTasks(newTasks) {
    tasks = newTasks;
}

export { addTask, deleteTask, toggleComplete, editTask, filterTasks, searchTasks, sortTasks, clearTasks, getTasks, setTasks };