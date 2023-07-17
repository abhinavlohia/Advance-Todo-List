let role = "developer";

function switchRole() {
  role = document.getElementById("role-selector").value;
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

let processCompleted = false;
function drop(event, column) {

  processCompleted = false;
  event.preventDefault();
  const taskId = event.dataTransfer.getData("text");
  const task = document.getElementById(taskId);

  // Check if the task can be moved based on the role and current column
  const currentColumn = task.parentNode.id;

  if (role === "developer") {
    if (currentColumn === "todo" && column === "in-dev") {
      document.getElementById(column).appendChild(task);
      processCompleted = true;
    } else if (currentColumn === "in-dev" && column === "in-testing") {
      document.getElementById(column).appendChild(task);
      processCompleted = true;
    } else if (currentColumn === "in-testing" && column === "in-dev") {
      document.getElementById(column).appendChild(task);
      processCompleted = true;
    } else if (currentColumn === "in-dev" && column === "todo") {
      document.getElementById(column).appendChild(task);
      processCompleted = true;
    }
  } else if (role === "tester") {
    if (currentColumn === "in-testing" && column === "completed") {
      document.getElementById(column).appendChild(task);
      processCompleted = true;
    } else if (currentColumn === "completed" && column === "in-testing") {
      document.getElementById(column).appendChild(task);
      processCompleted = true;
    }
  }

  if (processCompleted) {
    // Update the task's status in the browser storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    tasks[taskId] = column;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

let taskIdCounter = parseInt(localStorage.getItem("taskIdCounter")) || 1; // Counter to generate unique task IDs

function addNewTask() {
  // const taskText = prompt("Enter the task description:"); // Prompt the user for task description
  if (1) {
    const taskId = "Task " + taskIdCounter++; // Generate unique task ID

    const taskElement = document.createElement("div"); // Create a new task element
    taskElement.className = "list-item";
    taskElement.draggable = true;
    taskElement.ondragstart = drag;
    taskElement.id = taskId;

    const taskTextElement = document.createElement("span"); // Create a span for the task text
    taskTextElement.innerText = taskId;

    const deleteButton = document.createElement("button"); // Create a delete button
    deleteButton.className = "deleteTaskbtn";
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    deleteButton.addEventListener("click", deleteTask);

    taskElement.appendChild(taskTextElement); // Add the task text to the task element
    taskElement.appendChild(deleteButton); // Add the delete button to the task element

    const todoColumn = document.getElementById("todo"); // Get the TODO column
    todoColumn.appendChild(taskElement); // Add the new task to the TODO column

    // Update the task's status in the browser storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    tasks[taskId] = "todo";
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Store the updated taskIdCounter in the local storage
    localStorage.setItem("taskIdCounter", taskIdCounter.toString());
  }
}

function deleteTask(event) {
  const taskElement = event.target.closest(".list-item"); // Find the closest parent task element
  const taskId = taskElement.id;

  // Remove the task element from the DOM
  if (taskElement.parentNode.id === 'todo') {
    taskElement.remove();

    // Remove the task from the browser storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    delete tasks[taskId];
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

}

// Restore the task positions from browser storage on page load
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
  for (const taskId in tasks) {
    const column = tasks[taskId];
    const taskElement = document.createElement("div"); // Create a new task element
    taskElement.className = "list-item";
    taskElement.draggable = true;
    taskElement.ondragstart = drag;
    taskElement.id = taskId;

    const taskTextElement = document.createElement("span"); // Create a span for the task text
    taskTextElement.innerText = taskId;

    const deleteButton = document.createElement("button"); // Create a delete button
    deleteButton.className = "deleteTaskbtn";
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    deleteButton.addEventListener("click", deleteTask);

    taskElement.appendChild(taskTextElement); // Add the task text to the task element
    taskElement.appendChild(deleteButton); // Add the delete button to the task element

    const columnElement = document.getElementById(column);
    if (columnElement) {
      columnElement.appendChild(taskElement);
    }
  }
};


function deleteAllTask() {
  localStorage.clear();
  location.reload();
}
