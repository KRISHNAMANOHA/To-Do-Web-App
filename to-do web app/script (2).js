const taskInput = document.getElementById("taskInput");
const taskDateTime = document.getElementById("taskDateTime");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

addBtn.addEventListener("click", addTask);

function addTask() {
  const text = taskInput.value.trim();
  const dateTime = taskDateTime.value;

  if (!text) {
    alert("Please enter a task description.");
    return;
  }

  const task = {
    id: Date.now(),
    text,
    dateTime,
    completed: false
  };

  tasks.push(task);
  renderTasks();

  taskInput.value = "";
  taskDateTime.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const infoDiv = document.createElement("div");
    infoDiv.className = "task-info";
    infoDiv.innerHTML = `<strong>${task.text}</strong> ${
      task.dateTime ? `<small>${task.dateTime}</small>` : ""
    }`;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "task-buttons";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.onclick = () => toggleComplete(task.id);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(task.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(task.id);

    buttonsDiv.append(completeBtn, editBtn, deleteBtn);

    li.append(infoDiv, buttonsDiv);
    taskList.appendChild(li);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    const newText = prompt("Edit task description:", task.text);
    const newDateTime = prompt(
      "Edit date & time (YYYY-MM-DDTHH:MM):",
      task.dateTime
    );
    if (newText !== null) {
      task.text = newText.trim() || task.text;
    }
    if (newDateTime !== null) {
      task.dateTime = newDateTime || task.dateTime;
    }
    renderTasks();
  }
}
