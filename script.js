var addButton = document.getElementById("add-button");
addButton.addEventListener("click", function(event) {
    event.preventDefault(); // ini penting
    addToDoItem();
});

var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

function newToDoItem(itemText, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

function addToDoItem() {
    var itemText = document.getElementById("todo-entry-box").value;
    var itemDate = document.getElementById("todo-date-box").value;

    if (!itemText) return; // validasi kosong
    var fulltext = itemText + " (" + itemDate + ")";

    newToDoItem(fulltext, false);
    saveList();

     // reset input setelah ditambahkan
    document.getElementById("todo-entry-box").value = "";
    document.getElementById("todo-date-box").value = "";
}

function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
    saveList();
}

function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
    saveList();
}

function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
    saveList();
}

var myArray = [];
myArray.push("something to store");
myArray.push("something else to store");
alert(myArray[0]);
//This will alert "something to store"

var toDoInfo = {
    "task": "Thing I need to do",
    "completed": false
};

function saveList() {
    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
    console.log("masuk kesini ya")
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

loadList();