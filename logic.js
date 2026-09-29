// Pure functions (testable without a browser)
function addTask(tasks, text) {
  const clean = String(text || "").trim();
  if (!clean) return tasks;
  return tasks.concat([{ id: Date.now() + Math.random(), text: clean, done: false }]);
}
function toggleTask(tasks, id) {
  return tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
}
function deleteTask(tasks, id) {
  return tasks.filter(t => t.id !== id);
}
function filterTasks(tasks, filter) {
  if (filter === "active") return tasks.filter(t => !t.done);
  if (filter === "done") return tasks.filter(t => t.done);
  return tasks;
}
function clearCompleted(tasks) {
  return tasks.filter(t => !t.done);
}
if (typeof module !== "undefined") {
  module.exports = { addTask, toggleTask, deleteTask, filterTasks, clearCompleted };
}
