const mongoose = require('mongoose');
const Task = require('../models/task');

exports.addTask = (req, res, next) => {
    const {name, dueDate, completionDate, status} = req.body;

    const newTask = new Task({
        name: name,
        dueDate: dueDate,
        completionDate: completionDate,
        status: status
    });

    newTask.save(function (err, save) {
        if (err) return console.error(err);

        res.json({
            success: true,
            message: 'Task has been saved.'
        });

    })
};

exports.editTask = (req, res, next) => {
    const {_id, name, dueDate, completionDate, status} = req.body;
    if (mongoose.Types.ObjectId.isValid(_id)) {
        Task.findById(_id, function(err, task) {
            if(task) {
                task = {
                    name: name,
                    dueDate: dueDate,
                    completionDate: completionDate,
                    status: status
                };

                task.save(function(err, save){
                    if(err) return console.error(err);

                    return res.json({success: true, message: 'Task edited.'})
                })
            }
        })
    }
};

exports.deleteTask = (req, res, next) => {
    const {_id, name, dueDate, completionDate, status} = req.body;
    if (mongoose.Types.ObjectId.isValid(_id)) {
        Task.findById(_id, function(err, task) {
            if(task) {
                task = {
                    name: name,
                    dueDate: dueDate,
                    completionDate: completionDate,
                    status: status
                };

                task.save(function(err, save){
                    if(err) return console.error(err);

                    return res.json({success: true, message: 'Task edited.'})
                })
            }
        })
    }
};