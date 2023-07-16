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
  const taskHeading = prompt("Enter the task heading:"); // Prompt the user for task heading
  if (taskHeading) {
    const taskDescription = prompt("Enter the task description:"); // Prompt the user for task description
    if (taskDescription) {
      const taskId = "Task " + taskIdCounter++; // Generate unique task ID

      const taskElement = document.createElement("div"); // Create a new task element
      taskElement.className = "list-item";
      taskElement.draggable = true;
      taskElement.ondragstart = drag;
      taskElement.id = taskId;

      const taskHeadingElement = document.createElement("h4"); // Create an element for the task heading
      // taskHeadingElement.innerText = taskHeading;
      taskHeadingElement.innerText = taskHeading;

      const viewButton = document.createElement("button"); // Create a view button
      viewButton.className = "viewTaskbtn";
      viewButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
      viewButton.addEventListener("click", function () {
        openPopup(taskHeading, taskDescription);
      });

      const deleteButton = document.createElement("button"); // Create a delete button
      deleteButton.className = "deleteTaskbtn";
      deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      deleteButton.addEventListener("click", deleteTask);

      taskElement.appendChild(taskHeadingElement); // Add the task heading to the task element
      taskElement.appendChild(viewButton); // Add the view button to the task element
      taskElement.appendChild(deleteButton); // Add the view button to the task element

      const todoColumn = document.getElementById("todo"); // Get the TODO column
      todoColumn.appendChild(taskElement); // Add the new task to the TODO column

      // Update the task's status and details in the browser storage
      const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
      tasks[taskId] = "todo";
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Store the updated taskIdCounter in the local storage
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

// Restore the task positions and details from browser storage on page load
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
  for (const taskId in tasks) {
    const column = tasks[taskId];
    const taskElement = document.createElement("div"); // Create a new task element
    taskElement.className = "list-item";
    taskElement.draggable = true;
    taskElement.ondragstart = drag;
    taskElement.id = taskId;

    const taskHeadingElement = document.createElement("h4"); // Create an element for the task heading
    taskHeadingElement.innerText = taskId;

    const viewButton = document.createElement("button"); // Create a view button
    viewButton.className = "viewTaskbtn";
    viewButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
    viewButton.addEventListener("click", function () {
      const taskDetails = tasks[taskId];
      openPopup(taskDetails.heading, taskDetails.description);
    });

    const deleteButton = document.createElement("button"); // Create a delete button
    deleteButton.className = "deleteTaskbtn";
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    deleteButton.addEventListener("click", deleteTask);

    taskElement.appendChild(taskHeadingElement); // Add the task heading to the task element
    taskElement.appendChild(viewButton); // Add the view button to the task element
    taskElement.appendChild(deleteButton); // Add the view button to the task element

    const columnElement = document.getElementById(column);
    if (columnElement) {
      columnElement.appendChild(taskElement);
    }
  }
};

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


function deleteAllTask() {
  localStorage.clear();
  location.reload();
}