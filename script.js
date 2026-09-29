let tasks = [];
let filter = "all";
try { tasks = JSON.parse(localStorage.getItem("tasks")) || []; } catch (e) { tasks = []; }

const list = document.getElementById("taskList");
const input = document.getElementById("taskInput");
const counter = document.getElementById("counter");
const empty = document.getElementById("empty");

function save() { try { localStorage.setItem("tasks", JSON.stringify(tasks)); } catch (e) {} }

function render() {
  list.innerHTML = "";
  const visible = filterTasks(tasks, filter);
  visible.forEach(t => {
    const li = document.createElement("li");
    if (t.done) li.className = "done";
    const cb = document.createElement("input");
    cb.type = "checkbox"; cb.checked = t.done;
    cb.onchange = () => { tasks = toggleTask(tasks, t.id); save(); render(); };
    const span = document.createElement("span");
    span.textContent = t.text;
    const del = document.createElement("button");
    del.className = "del"; del.textContent = "Delete";
    del.onclick = () => { tasks = deleteTask(tasks, t.id); save(); render(); };
    li.append(cb, span, del);
    list.appendChild(li);
  });
  const left = tasks.filter(t => !t.done).length;
  counter.textContent = tasks.length ? `${left} of ${tasks.length} tasks left` : "No tasks yet";
  empty.style.display = visible.length ? "none" : "block";
}

function add() {
  tasks = addTask(tasks, input.value);
  input.value = ""; save(); render(); input.focus();
}
document.getElementById("addBtn").onclick = add;
input.addEventListener("keydown", e => { if (e.key === "Enter") add(); });
document.getElementById("clearBtn").onclick = () => { tasks = clearCompleted(tasks); save(); render(); };
document.querySelectorAll(".filters button").forEach(b => {
  b.onclick = () => {
    filter = b.dataset.filter;
    document.querySelectorAll(".filters button").forEach(x => x.classList.toggle("active", x === b));
    render();
  };
});
render();
