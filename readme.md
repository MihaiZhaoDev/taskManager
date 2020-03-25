Simple Todo list made with Node.js

Task Model:

_id: type: ObjectID;

name: type: String;

dueDate: type: Date;

completionDate: type: Date;

status: type: Boolean;

Controllers actions:

addTask -> Add a new task (please reffer to Task Model);

editTask -> Update a task data (please reffer to Task Model);

deleteTask -> Delete a task (it needs the _id);

markAsDone -> Marks the task as done (it needs the _id);

markAsUndone -> Marks the task as undone (it needs the _id);