import { addTask, deleteTask, toggleComplete, editTask, filterTasks, searchTasks, sortTasks, clearTasks, getTasks, setTasks } from './todo.js';


beforeEach(() => {
    clearTasks();
});

// test 1
test("should add task with text", () => {
    const task = addTask("test task");
    expect(task.text).toBe("test task");
});

// test 2
test("should add task with text and priority", () => {
    const lowTask = addTask("low priority task", "Low");
    const mediumTask = addTask("medium priority task", "Medium");
    const highTask = addTask("high priority task", "High");

    expect(getTasks()[0].priority).toBe("Low");
    expect(getTasks()[1].priority).toBe("Medium");
    expect(getTasks()[2].priority).toBe("High");
})

// test 3
test("should delete task", () => {
    const task = addTask("test task to delete");
    deleteTask(task.id);
    expect(getTasks()).toHaveLength(0);
});

// test 4
test("shuold toggle task complete", () => {
    const task = addTask("test task to complete");
    toggleComplete(task.id);
    expect(getTasks()[0].completed).toBe(true);
});

// test 5
test("should edit task", () => {
    const task = addTask("test task to edit");
    const oldTaskText = task.text;
    editTask(task.id, "new task text");
    expect(getTasks()[0].text).not.toBe(oldTaskText);
    expect(getTasks()[0].text).toBe("new task text");
});

// test 6
test("shuold filter tasks by complete/incomplete check", async () => {
    const task1 = addTask("incomplete task");

    // add wait because task id's are dependent on Date object and can conflict when created in bulk.
    await new Promise(r => setTimeout(r, 1));
    
    const task2 = addTask("complete task");
    toggleComplete(task2.id);

    const activeTasks = filterTasks("Active");
    const completedTasks = filterTasks("Completed");
    expect(activeTasks).toHaveLength(1);
    expect(completedTasks).toHaveLength(1);
});

// test 7
test("should search tasks by name", () => {
    const task1 = addTask("some text");
    const task2 = addTask("unusual text");

    const generalQuery = searchTasks("text");
    const specificQuery = searchTasks("unusual");

    expect(generalQuery).toHaveLength(2);
    expect(specificQuery).toHaveLength(1);
});

// test 8
test("should sort tasks by priority", () => {
    const task1 = addTask("low priority task", "Low");
    const task2 = addTask("medium priority task", "High");
    const task3 = addTask("high priority task", "Medium");

    const sortedTasks = sortTasks("priority");
    
    expect(sortedTasks[0].priority).toBe("High");
    expect(sortedTasks[1].priority).toBe("Medium");
    expect(sortedTasks[2].priority).toBe("Low");
});

// test 9
test("should sort tasks by creationd date", () => {
    const task1 = addTask("task 1");
    const task2 = addTask("task 2");
    const task3 = addTask("task 3");

    const sortedTasks = sortTasks("date");

    expect(sortedTasks[0].text).toBe("task 1");
    expect(sortedTasks[1].text).toBe("task 2");
    expect(sortedTasks[2].text).toBe("task 3");
});

test("should throw an error if invalid parameter to filter function is passed", () => {
    const task1 = addTask("task 1");
    const task2 = addTask("task 2");
    const task3 = addTask("task 3");

    expect(() => sortTasks("invalid param")).toThrow("Please enter valid parameter (priority / date)")
})

// test 10
test("should clear all tasks", () => {
    const task1 = addTask("task 1");
    const task2 = addTask("task 2");
    const task3 = addTask("task 3");
    const task4 = addTask("task 4");

    clearTasks();

    expect(getTasks()).toHaveLength(0);
});