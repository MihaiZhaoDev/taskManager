//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivty so the user can manage daily tasks.

var taskInput = document.getElementById("new-task-name"); //new-task
var taskDueDateInput = document.getElementById("new-task-dueDate"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List Item
var createNewTaskElement = async function (taskString, dueDate) {
    return new Promise(async (resolve, reject)=> {
        var taskData = {
            name: taskString,
            dueDate: dueDate
        };

        await $.ajax({
            url: '/task/add',
            type: 'PUT',
            data: taskData,
        }).then(response => {
            console.log(response);
            if (response.success) {
                toastr.success(response.message);

                //Create List Item
                var listItem = document.createElement("li");

                //input (checkbox)
                var checkBox = document.createElement("input"); // checkbox
                //label
                var label = document.createElement("label");

                var small = document.createElement("small");
                //input (text)
                var editInput = document.createElement("input"); // text
                //button.edit
                var editButton = document.createElement("button");
                //button.delete
                var deleteButton = document.createElement("button");

                //Each element needs modifying

                checkBox.setAttribute('data-id', response._id);
                editButton.setAttribute('data-id', response._id);
                deleteButton.setAttribute('data-id', response._id);

                checkBox.type = "checkbox";
                editInput.type = "text";

                editButton.innerText = "Edit";
                editButton.className = "edit";
                deleteButton.innerText = "Delete";
                deleteButton.className = "delete";

                label.innerHTML = taskString;
                small.innerHTML = '</br></br>' + moment(dueDate).format('LL');

                //Each element needs appending
                listItem.appendChild(checkBox);
                listItem.appendChild(label);
                listItem.appendChild(small);
                listItem.appendChild(editInput);
                listItem.appendChild(editButton);
                listItem.appendChild(deleteButton);

                resolve( listItem);
            } else {
                toastr.error(response.message);
            }

        });
    }) ;

};

//Add a new task
var addTask = async function () {
    //Create a new list item with the text from #new-task:
    var listItem = await createNewTaskElement(taskInput.value, taskDueDateInput.value);
    //Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

//Edit an existing task
var editTask = function () {
    var id = $(this).attr('data-id');
    var listItem = this.parentNode;

    var editInput = listItem.querySelector("input[type=text");
    var label = listItem.querySelector("label");

    var containsClass = listItem.classList.contains("editMode");

    //if the class of the parent is .editMode
    if (containsClass) {
        //Switch from .editMode
        //label text become the input's value
        label.innerText = editInput.value;

        var taskData = {
            _id: id,
            name: editInput.value
        };

        $.ajax({
            url: '/task/edit',
            type: 'POST',
            data: taskData,
        }).then(response => {
            console.log(response);
            toastr.info(response.message);
        });
    } else {
        //Switch to .editMode
        //input value becomes the label's text
        editInput.value = label.innerText;


    }

    //Toggle .editMode on the list item
    listItem.classList.toggle("editMode");

};

//Delete an existing task
var deleteTask = function () {
    var id = $(this).attr('data-id');
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    var taskData = {
        _id: id
    };

    $.ajax({
        url: '/task/delete',
        type: 'DELETE',
        data: taskData,
    }).then(response => {
        console.log(response);
        toastr.error(response.message);
    });

    //Remove the parent list item from the ul
    ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function () {
    var id = $(this).attr('data-id');

    var taskData = {
        _id: id,
    };

    $.ajax({
        url: '/task/done',
        type: 'PUT',
        data: taskData,
    }).then(response => {
        console.log(response);
        toastr.success(response.message);
    });
    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function () {
    var id = $(this).attr('data-id');

    var taskData = {
        _id: id,
    };

    $.ajax({
        url: '/task/undone',
        type: 'PUT',
        data: taskData,
    }).then(response => {
        console.log(response);
        toastr.warning(response.message);
    });
    //Append the task list item to the #incomplete-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    //select taskListItem's children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    //bind editTask to edit button
    editButton.onclick = editTask;

    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;

    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function () {
}

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list item's children (taskIncomplete)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}