function addTask() {
    var taskText = document.getElementById('taskinput').value;
    var taskDate = document.getElementById('dateinput').value;
    var dateReg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;

    if (!taskDate.match(dateReg)) {
        alert("Invalid date");
    } else if (taskText == '') {
        alert("All fields are required");
    } else {
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
}

var addBtn = document.getElementById('addbtn');
addBtn.addEventListener('click', addTask);


/* var tempTasks = getTasksFromLocalStorage();
        for (var i = 0; i < tempTasks.length; i++) {
            if (tempTasks[i].date === n.date && tempTasks[i].text === n.text) {
                tempTasks.splice(i, 1);
                localStorage.setItem("tasks", JSON.stringify(tempTasks));
            }
        }*/