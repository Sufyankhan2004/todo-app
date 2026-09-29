const assert = require("assert");
const { addTask, toggleTask, deleteTask, filterTasks, clearCompleted } = require("../logic.js");

let t = addTask([], "Buy milk");
   assert.strictEqual(t.length, 2, "addTask should add a task");
   assert.strictEqual(addTask(t, "   ").length, 1, "blank tasks must be rejected");

t = toggleTask(t, t[0].id);
assert.strictEqual(t[0].done, true, "toggleTask should mark done");
assert.strictEqual(filterTasks(t, "done").length, 1);
assert.strictEqual(filterTasks(t, "active").length, 0);

assert.strictEqual(clearCompleted(t).length, 0, "clearCompleted should remove done tasks");
assert.strictEqual(deleteTask(t, t[0].id).length, 0, "deleteTask should remove the task");

console.log("All tests passed");
