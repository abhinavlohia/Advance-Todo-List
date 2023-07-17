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

// Restore the task positions from browser storage on page load
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
  for (const taskId in tasks) {
    const column = tasks[taskId];
    const task = document.getElementById(taskId);
    document.getElementById(column).appendChild(task);
  }
};

let taskIdCounter = 1; // Counter to generate unique task IDs

function addNewTask() {
  const taskText = prompt("Enter the task description:"); // Prompt the user for task description
  if (taskText) {
    const taskId = "task" + taskIdCounter++; // Generate unique task ID
    const taskElement = document.createElement("div"); // Create a new task element
    taskElement.className = "list-item";
    taskElement.draggable = true;
    taskElement.ondragstart = drag;
    taskElement.id = taskId;
    taskElement.innerText = taskText;
    
    document.getElementById("todo").appendChild(taskElement); // Add the new task to the TODO column
  }
}
