let lists = document.getElementsByClassName("list-item");
let underDevList = document.getElementById("underDev-list");
let underTestList = document.getElementById("underTest-list");

for (lists of lists) {
  lists.addEventListener("dragstart", function (e) {
    let selected = e.target;

    underTestList.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    underTestList.addEventListener("drop", function (e) {
      underTestList.appendChild(selected);
      selected = null;
    });

    underDevList.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    underDevList.addEventListener("drop", function (e) {
      underDevList.appendChild(selected);
      selected = null;
    });
  });
}
