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
  event.preventDefault();
  const taskId = event.dataTransfer.getData("text");
  const taskElement = document.getElementById(taskId);

  const currentColumn = taskElement.parentNode.id;

  if (role === "developer") {
    if (currentColumn === "todo" && column === "in-dev") {
      document.getElementById(column).appendChild(taskElement);
      updateTaskColumn(taskId, column);
    } else if (currentColumn === "in-dev" && column === "in-testing") {
      document.getElementById(column).appendChild(taskElement);
      updateTaskColumn(taskId, column);
    } else if (currentColumn === "in-testing" && column === "in-dev") {
      document.getElementById(column).appendChild(taskElement);
      updateTaskColumn(taskId, column);
    } else if (currentColumn === "in-dev" && column === "todo") {
      document.getElementById(column).appendChild(taskElement);
      updateTaskColumn(taskId, column);
    }
  } else if (role === "tester") {
    if (currentColumn === "in-testing" && column === "completed") {
      document.getElementById(column).appendChild(taskElement);
      updateTaskColumn(taskId, column);
    } else if (currentColumn === "completed" && column === "in-testing") {
      document.getElementById(column).appendChild(taskElement);
      updateTaskColumn(taskId, column);
    }
  }
}

function updateTaskColumn(taskId, column) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
  tasks[taskId].column = column;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



let taskIdCounter = parseInt(localStorage.getItem("taskIdCounter")) || 1;
function addNewTask() {
  const taskHeading = prompt("Enter the task heading:");
  if (taskHeading) {
    const taskDescription = prompt("Enter the task description:");
    if (taskDescription) {
      const taskId = "Task " + taskIdCounter++;

      const taskElement = document.createElement("div");
      taskElement.className = "list-item";
      taskElement.draggable = true;
      taskElement.ondragstart = drag;
      taskElement.id = taskId;

      const taskHeadingElement = document.createElement("h4");
      taskHeadingElement.innerText = taskHeading;

      const viewButton = document.createElement("button");
      viewButton.className = "viewTaskbtn";
      viewButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
      viewButton.addEventListener("click", function () {
        openPopup(taskHeading, taskDescription);
      });

      const deleteButton = document.createElement("button");
      deleteButton.className = "deleteTaskbtn";
      deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      deleteButton.addEventListener("click", deleteTask);

      taskElement.appendChild(taskHeadingElement);
      taskElement.appendChild(viewButton);
      taskElement.appendChild(deleteButton);

      const todoColumn = document.getElementById("todo");
      todoColumn.appendChild(taskElement);

      const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
      tasks[taskId] = {
        column: "todo",
        heading: taskHeading,
        description: taskDescription,
      };
      localStorage.setItem("tasks", JSON.stringify(tasks));

      localStorage.setItem("taskIdCounter", taskIdCounter.toString());
    }
  }
}


function openPopup(heading, description) {
  const popup = document.getElementById("popup");
  const popupHeading = document.getElementById("popup-heading");
  const popupDescription = document.getElementById("popup-description");

  popupHeading.innerText = heading;
  popupDescription.innerText = description;
  popup.style.display = "block";
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

window.onload = function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
  const taskKeys = Object.keys(tasks);
  let maxTaskId = 0;
  for (const taskId of taskKeys) {
    const task = tasks[taskId];
    const taskColumn = task.column;
    const taskHeading = task.heading;
    const taskDescription = task.description;

    const taskElement = document.createElement("div");
    taskElement.className = "list-item";
    taskElement.draggable = true;
    taskElement.ondragstart = drag;
    taskElement.id = taskId;

    const taskHeadingElement = document.createElement("h4");
    taskHeadingElement.innerText = taskHeading;

    const viewButton = document.createElement("button");
    viewButton.className = "viewTaskbtn";
    viewButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
    viewButton.addEventListener("click", function () {
      openPopup(taskHeading, taskDescription);
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteTaskbtn";
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    deleteButton.addEventListener("click", deleteTask);

    taskElement.appendChild(taskHeadingElement);
    taskElement.appendChild(viewButton);
    taskElement.appendChild(deleteButton);

    const columnElement = document.getElementById(taskColumn);
    if (columnElement) {
      columnElement.appendChild(taskElement);
    }

    const taskIdNumber = parseInt(taskId.replace("Task ", ""));
    if (taskIdNumber > maxTaskId) {
      maxTaskId = taskIdNumber;
    }
  }

  let taskIdCounter = maxTaskId + 1;
  if (!Number.isFinite(taskIdCounter)) {
    taskIdCounter = 1;
  }
  localStorage.setItem("taskIdCounter", taskIdCounter.toString());
};


function deleteTask(event) {
  const taskElement = event.target.closest(".list-item");
  const taskId = taskElement.id;

  if (taskElement.parentNode.id === 'todo') {
    taskElement.remove();

    const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    delete tasks[taskId];
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

}


function deleteAllTask() {
  localStorage.clear();
  location.reload();
}