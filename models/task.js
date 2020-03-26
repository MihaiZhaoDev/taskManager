// app/models/task.js

// Use only the necessary to save some time at the execution
const {Schema, model, set} = require('mongoose');

set('useFindAndModify', false);

// Schema for User Model
const taskSchema = Schema({

    name: {type: String},
    dueDate: {type: Date},
    formattedDueDate: {type: String}, // To display on front-end
    completionDate: {type: Date},
    status: {type: Boolean}

}, {timestamps: true});

// ==============
// Methods
// ==============

// Create the model and expose to the app
module.exports = model('Task', taskSchema);
