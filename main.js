'use strict';

function Task(text, date) {
    this.text = text;
    this.date = date;
}

// using RegEx for a strict date-time format as requested; simpler option would be to set input type to 'date' in the HTML
function validate() {
    var taskText = document.getElementById('taskinput').value;
    var taskDate = document.getElementById('dateinput').value;
    var dateReg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;

    if (!taskDate.match(dateReg)) {
        alert("Invalid date!");
    } else if (taskText == '') {
        alert("No text!");
    } else {
        return true;
    }
}

function createTask() {
    var n = new Task(document.getElementById('taskinput').value, document.getElementById('dateinput').value);

    if (validate(n)) {
        showTask(n);
        store().addStorage(n);
    }
}

// task display function includes erase and edit options which affect the local storage
function showTask(n) {
    var taskText = n.text;
    var taskDate = n.date;

    var taskDel = document.createElement('i');
    taskDel.className = 'erase glyphicon glyphicon-trash';
    
    var taskEd = document.createElement('i');
    taskEd.className = 'edit glyphicon glyphicon-pencil';

    var newTask = document.createElement('div');
    newTask.innerHTML = '<br />' + taskText + '<br />' + taskDate + "<br />" + "<br />" + "<br />";
    newTask.appendChild(taskDel);
    newTask.appendChild(taskEd);
    newTask.className = 'col-xs-2 task';
    setTimeout(function () {
        newTask.classList.add('fade');}, 1);

    var taskPlace = document.getElementById('taskarea');
    taskPlace.appendChild(newTask);
    
    document.getElementById('taskinput').value = "";
    document.getElementById('dateinput').value = "";

    taskDel.addEventListener('click', function () {
        var tempTasks;
        newTask.style.opacity = '0';
        setTimeout(function() {newTask.parentNode.removeChild(newTask);}, 1000);
        tempTasks = store().getFromStorage();
        for (var i = 0; i < tempTasks.length; i++) {
            if (tempTasks[i].date === n.date && tempTasks[i].text === n.text) {
                tempTasks.splice(i, 1);
                localStorage.setItem("tasks", JSON.stringify(tempTasks));
            }
        }
    });
    
   taskEd.addEventListener('click', function() {
        var edTask = prompt("Change your text");
        newTask.innerHTML = '<br />' + edTask + '<br />' + taskDate + "<br />" + "<br />" + "<br />";
        newTask.appendChild(taskDel);
        newTask.appendChild(taskEd);
        var tempTasks = store().getFromStorage();
        
       for (var i = 0; i < tempTasks.length; i++) {            
            if (tempTasks[i].date === n.date && tempTasks[i].text === n.text) {
                tempTasks.splice(i);
                var b = new Task(edTask, taskDate);
                tempTasks.push(b);
                localStorage.setItem("tasks", JSON.stringify(tempTasks));
            }
        }
    });
}

// local storage functionality
var store = function () {
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
    }

    function getTasksFromLocalStorage() {
        var a = JSON.parse(localStorage.getItem("tasks"));
        return a;
    }
    
    return {
        addStorage: addToLocalStorage,
        getFromStorage: getTasksFromLocalStorage
    }
};

// retrieve old tasks from storage on reload
(function begin() {
    var addBtn = document.getElementById('addbtn');
    addBtn.addEventListener('click', createTask);
    load();
})()

function load() {
    var oldTasks = store().getFromStorage();
    for (var i = 0; i < oldTasks.length; i++) {
        showTask(oldTasks[i]);
    }
}
