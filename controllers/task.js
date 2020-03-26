// Tools
const mongoose = require('mongoose');
const moment = require('moment');
const handle = require('../tools/handler');

// Models
const Task = require('../models/task');

/**
 *  index
 *  Renders the index view
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.index = async (req, res, next) => {
    try {
        const undoneTasks = await Task.find({status: false});
        const doneTasks = await Task.find({status: true});

        res.render('index', {title: 'Task Manager', undoneTasks: undoneTasks, doneTasks: doneTasks});
    } catch (e) {
        handle.error(e, req, res);
    }
};

/**
 * addTask
 * Add a new task to the database (please refer to task model)
 * @param req
 * @param res
 * @param next
 */
exports.addTask = (req, res, next) => {
    try {
        const {name, dueDate, completionDate, status} = req.body;

        const newTask = new Task({
            name: name,
            dueDate: dueDate,
            formattedDueDate: moment(dueDate).format('LL'),
            completionDate: null,
            status: false
        });

        newTask.save(function (err, save) {
            if (err) return console.error(err);

            res.json({
                _id: newTask._id,
                success: true,
                message: 'Task has been saved.'
            });

        })
    }
    catch (e) {
        handle.error(e, req ,res);
    }

};

/**
 * editTask
 * Edits the existing task in the database (provide _id and new data)
 * @param req
 * @param res
 * @param next
 */
exports.editTask = (req, res, next) => {
    try {
        const {_id, name, dueDate, completionDate, status} = req.body;
        if (mongoose.Types.ObjectId.isValid(_id)) {
            Task.findById(_id, function (err, task) {
                if (task) {

                    name ? task.name = name : null;
                    dueDate ? task.dueDate = dueDate : null;
                    completionDate ? task.completionDate = completionDate : null;
                    status ? task.status = status : null;

                    task.save(function (err, save) {
                        if (err) return console.error(err);

                        return res.json({success: true, message: 'Task edited.'})
                    })
                }
            })
        }
    } catch(e) {
        handle.error(e, req, res);
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
    try {
        const {_id} = req.body;
        if (mongoose.Types.ObjectId.isValid(_id)) {
            Task.deleteOne({_id: _id}, function (err, done) {
                if (err) return console.log(err);

                return res.json({success: true, message: 'Task deleted.'});
            })
        }
    } catch(e) {
        handle.error(e, req, res);
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
    try {
        const {_id} = req.body;
        if (mongoose.Types.ObjectId.isValid(_id)) {
            Task.findById(_id, function (err, task) {
                if (err) return console.log(err);

                if (task) {
                    task.completionDate = new Date();
                    task.status = true;

                    task.save(function(err, done){
                        if (err) return console.log(err);

                        return res.json({success: true, message: 'Task marked as done.'})

                    });
                }
            });
        }
    } catch (e) {
        handle.error(e, req, res);
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
    try {
        const {_id} = req.body;
        if (mongoose.Types.ObjectId.isValid(_id)) {
            Task.findById(_id, function (err, task) {
                if (err) return console.log(err);

                if (task) {
                    task.completionDate = null;
                    task.status = false;

                    task.save(function(err, done){
                        if (err) return console.log(err);

                        return res.json({success: true, message: 'Task marked as undone.'})

                    });
                }
            });
        }
    } catch (e) {
        handle.error(e, req, res);
    }
};