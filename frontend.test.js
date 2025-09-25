/**
 * @jest-environment jsdom
 */

import fs from "fs";
import path from "path";

import { addTask, toggleComplete, editTask, deleteTask, getTasks, clearTasks } from "./todo.js";

describe("To-Do App Frontend (DOM Tests)", () => {
  beforeEach(() => {
    clearTasks();
    
    const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf-8");
    document.documentElement.innerHTML = html;
  });

  test("prioritySelect should change value when user selects option", () => {
    const prioritySelect = document.getElementById("prioritySelect");

    expect(prioritySelect.value).toBe("Low"); // because "Low" is the default value

    prioritySelect.value = "High";

    expect(prioritySelect.value).toBe("High");
  });

  test("filterSelect should change value when user selects option", () => {
    const filterSelect = document.getElementById("filterSelect");

    expect(filterSelect.value).toBe("All"); // because "All" is the default value

    filterSelect.value = "Completed";

    expect(filterSelect.value).toBe("Completed");
  });

  test("sortSelect should change value when user selects option", () => {
    const sortSelect = document.getElementById("sortSelect");

    expect(sortSelect.value).toBe("date"); // because "Date" is the default value

    sortSelect.value = "priority";

    expect(sortSelect.value).toBe("priority");
  });

  test("task input should accept text", () => {
    const input = document.getElementById("taskInput");
    input.value = "New Task";
    expect(input.value).toBe("New Task");
  });

  test("add button should create a new task in JS state", () => {
    const input = document.getElementById("taskInput");
    const addBtn = document.getElementById("addTaskBtn");

    input.value = "Learn Jest";

    addBtn.addEventListener("click", () => {
      addTask(input.value);
    });
    addBtn.click();

    const tasks = getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].text).toBe("Learn Jest");
  });

  test("task complete button toggles completion", () => {
    const task = addTask("Complete me");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click", () => toggleComplete(task.id));
    completeBtn.click();

    expect(getTasks()[0].completed).toBe(true);

    completeBtn.click();
    expect(getTasks()[0].completed).toBe(false);
  });

  test("task edit button changes task text", () => {
    const task = addTask("Old text");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTask(task.id, "New text"));
    editBtn.click();

    expect(getTasks()[0].text).toBe("New text");
  });

  test("task delete button removes task", () => {
    const task = addTask("Delete me");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));
    deleteBtn.click();

    expect(getTasks()).toHaveLength(0);
  });
});
