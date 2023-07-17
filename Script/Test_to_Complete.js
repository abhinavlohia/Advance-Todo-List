let lists = document.getElementsByClassName("list-item");
let underTestList = document.getElementById("underTest-list");
let completedList = document.getElementById("completed-list");

for (lists of lists) {
  lists.addEventListener("dragstart", function (e) {
    let selected = e.target;

    completedList.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    completedList.addEventListener("drop", function (e) {
      completedList.appendChild(selected);
      selected = null;
    });

    underTestList.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    underTestList.addEventListener("drop", function (e) {
      underTestList.appendChild(selected);
      selected = null;
    });
  });
}
