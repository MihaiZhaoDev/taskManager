const {check, validationResult} = require('express-validator');
const handle = require('./handler');
const mongoose = require('mongoose');

// Validate incoming data from user
exports.newTask = [
    check('name').exists().isLength({min: 1, max: 100}).withMessage('Must be between 1 and 100 chars long'),
    check('dueDate').optional({checkFalsy: true}).isLength({min: 1, max: 100}).isISO8601().toDate().withMessage('Invalid date'),
    verify
];
exports.editTask = [
    check('name').optional({checkFalsy: true}).isLength({min: 1, max: 100}).withMessage('Must be between 1 and 100 chars long'),
    check('dueDate').optional({checkFalsy: true}).isLength({min: 1, max: 100}).isISO8601().toDate().withMessage('Invalid date'),
    check('completionDate').optional({checkFalsy: true}).isLength({min: 1, max: 100}).isISO8601().toDate().withMessage('Invalid date'),
    check('status').optional({checkFalsy: true}).isLength({min: 1, max: 100}),
    verify
];
exports.deleteTask = [
    check('_id').exists().isLength({min: 1, max: 100}).custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid task ID'),
    verify
];
exports.markAsDoneTask = [
    check('_id').exists().isLength({min: 1, max: 100}).custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid task ID'),
    verify
];exports.markAsNotDoneTask = [
    check('_id').exists().isLength({min: 1, max: 100}).custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid task ID'),
    verify
];

function verify(req, res, next) {

    // Get the results
    const errors = validationResult(req);

    // Check if  are any errors
    if (!errors.isEmpty()) {

        // Create the error message
        let message = 'There are some errors in the request. Errors: ';

        // Get all errors and add them to the message
        errors.array().forEach(function (el) {
            message = `${message} ${el.msg} (${el.param}) ;`;
        });

        // Handle the errors
        handle.validationErrors(message, req, res);

    } else {
        next()
    }
}