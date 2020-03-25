const mongoose = require('mongoose');
const Task = require('../models/task');

exports.index = (req, res, next) => {
    Task.find({}, function (err, tasks) {
        res.render('index', {title: 'Task Manager', tasks});
    })
};

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
        Task.findById(_id, function (err, task) {
            if (task) {

                name ? task.name = name : null;
                dueDate ? task.dueDate = dueDate : null;
                completionDate ?  task.completionDate = completionDate : null;
                status ? task.status = status : null;

                task.save(function (err, save) {
                    if (err) return console.error(err);

                    return res.json({success: true, message: 'Task edited.'})
                })
            }
        })
    }
};

exports.deleteTask = (req, res, next) => {
    const {_id} = req.body;
    if (mongoose.Types.ObjectId.isValid(_id)) {
        Task.deleteOne({_id: _id}, function (err, done) {
            if (err) return console.log(err);

            return res.json({success: true, message: 'Task deleted.'});
        })
    }
};

exports.markAsDone = (req, res, next) => {
    const {_id} = req.body;
    if (mongoose.Types.ObjectId.isValid(_id)) {
        Task.findById(_id, function (err, task) {
            if (err) return console.log(err);

            if (task) {
                task.completionDate = new Date();
                task.status = true;

                return res.json({success: true, message: 'Task marked as done.'})
            }
        });
    }
};


exports.markAsNotDone = (req, res, next) => {
    const {_id} = req.body;
    if (mongoose.Types.ObjectId.isValid(_id)) {
        Task.findById(_id, function (err, task) {
            if (err) return console.log(err);

            if (task) {
                task.completionDate = null;
                task.status = false;
                return res.json({success: true, message: 'Task marked as NOT done.'});
            }
        });
    }
};