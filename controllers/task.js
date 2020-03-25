const mongoose = require('mongoose');
const Task = require('../models/task');
const moment = require('moment');

exports.index = (req, res, next) => {
    Task.find({}, function (err, tasks) {
        res.render('index', {title: 'Task Manager', tasks});
    })
};

/**
 * addTask
 * Add a new task to the database (please refer to task model)
 * @param req
 * @param res
 * @param next
 */
exports.addTask = (req, res, next) => {
    const {name, dueDate, completionDate, status} = req.body;

    const newTask = new Task({
        name: name,
        dueDate: dueDate,
        formattedDueDate: moment(dueDate).format('LL'),
        completionDate: completionDate,
        status: status
    });

    console.log(newTask);

    newTask.save(function (err, save) {
        if (err) return console.error(err);

        res.json({
            success: true,
            message: 'Task has been saved.'
        });

    })
};

/**
 * editTask
 * Edits the existing task in the database (provide _id and new data)
 * @param req
 * @param res
 * @param next
 */
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

/**
 * deleteTask
 * Delete an existing task in the database (provide _id)
 * @param req
 * @param res
 * @param next
 */
exports.deleteTask = (req, res, next) => {
    const {_id} = req.body;
    if (mongoose.Types.ObjectId.isValid(_id)) {
        Task.deleteOne({_id: _id}, function (err, done) {
            if (err) return console.log(err);

            return res.json({success: true, message: 'Task deleted.'});
        })
    }
};

/**
 * markAsDone
 * Mark a task as done (provide _id)
 * @param req
 * @param res
 * @param next
 */
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

/**
 * markAsNotDone
 * Marks the task as not done (provide _id)
 * @param req
 * @param res
 * @param next
 */
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