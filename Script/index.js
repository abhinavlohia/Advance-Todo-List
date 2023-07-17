let lists = document.getElementsByClassName("list-item");
let todoList = document.getElementById("todo-list");
let underDevList = document.getElementById("underDev-list");

for (lists of lists) {
  lists.addEventListener("dragstart", function (e) {
    let selected = e.target;

    underDevList.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    underDevList.addEventListener("drop", function (e) {
      underDevList.appendChild(selected);
      selected = null;
    });

    todoList.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    todoList.addEventListener("drop", function (e) {
      todoList.appendChild(selected);
      selected = null;
    });
  });
}
