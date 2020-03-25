// app/models/user.js

// Tools
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

// Schema for User Model
var taskSchema = mongoose.Schema({

    name: {type: String},
    dueDate: {type: Date},
    completionDate: {type: Date},
    status: {type: String}

}, {timestamps: true});

// ==============
// Methods
// ==============

// Create the model and expose to the app
module.exports = mongoose.model('Task', taskSchema);
