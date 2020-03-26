const {check, validationResult} = require('express-validator');
const handle = require('./handler');

// Validate incoming data from user
exports.newTask = [
    check('name').exists().isLength({min: 1, max: 100}),
    check('dueDate').optional({checkFalsy: true}).isLength({min: 1, max: 100}),
    verify
];
exports.editTask = [
    check('name').optional({checkFalsy: true}).isLength({min: 1, max: 100}),
    check('dueDate').optional({checkFalsy: true}).isLength({min: 1, max: 100}),
    check('completionDate').optional({checkFalsy: true}).isLength({min: 1, max: 100}),
    check('status').optional({checkFalsy: true}).isLength({min: 1, max: 100}),
    verify
];
exports.deleteTask = [
    check('_id').exists().isLength({min: 1, max: 100}),
    verify
];
exports.markAsDoneTask = [
    check('_id').exists().isLength({min: 1, max: 100}),
    verify
];exports.markAsNotDoneTask = [
    check('_id').exists().isLength({min: 1, max: 100}),
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
            message = `${message} ${el.msg}(${el.param}) ;`;
        });

        // Handle the errors
        handle.validationErrors(message, req, res);

    } else {
        next()
    }
}