'use strict';

function Task(text, date) {
    this.text = text;
    this.date = date;
}

function validate() {
    var taskText = document.getElementById('taskinput').value;
    var taskDate = document.getElementById('dateinput').value;
    var dateReg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;

    if (!taskDate.match(dateReg)) {
        alert("Invalid date");
    } else if (taskText == '') {
        alert("All fields are required");
    } else {
        return true;
    }
}

function createTask() {
    var n = new Task(document.getElementById('taskinput').value, document.getElementById('dateinput').value);

    if (validate(n)) {
        showTask(n);
        addToLocalStorage(n);
    }
}

function showTask(n) {
    var taskText = n.text;
    var taskDate = n.date;

    var taskDel = document.createElement('i');
    taskDel.className = 'erase glyphicon glyphicon-trash';

    var newTask = document.createElement('div');
    newTask.innerHTML = '<br />' + taskText + '<br />' + taskDate + "<br />" + "<br />" + "<br />";
    newTask.appendChild(taskDel);
    newTask.className = 'col-xs-2 task';
    newTask.classList.toggle('fade-in')

    var taskPlace = document.getElementById('taskarea');
    taskPlace.appendChild(newTask);

    taskDel.addEventListener('click', function () {
        newTask.parentNode.removeChild(newTask);
    });
}

function addToLocalStorage(n) {
    var storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks == null) {
        storedTasks = [];
    }
    var taskText = n.text;
    var taskDate = n.date;
    var task1 = {
        'text': taskText,
        'date': taskDate
    };
    localStorage.setItem("task", JSON.stringify(task1));
    storedTasks.push(task1);

    localStorage.setItem("tasks", JSON.stringify(storedTasks));
};

function getTasksFromLocalStorage() {
    var a = JSON.parse(localStorage.getItem("tasks"));
    return a;
}

(function begin() {
    var addBtn = document.getElementById('addbtn');
    addBtn.addEventListener('click', createTask);
    load();
})()

function load() {
    var oldTasks = getTasksFromLocalStorage();
    for (var i = 0; i < oldTasks.length; i++) {
        showTask(oldTasks[i]);
    }
}
