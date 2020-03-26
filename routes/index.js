// Tools
const express = require('express');
const router = express.Router();

// Validator
const validator = require('../tools/validator');

// Controller
const controller = require('../controllers/task');

// Routes
router.get('/', controller.index);
router.put('/task/add', validator.newTask, controller.addTask);
router.post('/task/edit', validator.editTask, controller.editTask);
router.delete('/task/delete', validator.deleteTask, controller.deleteTask);
router.put('/task/done', validator.markAsDoneTask, controller.markAsDone);
router.put('/task/undone', validator.markAsNotDoneTask, controller.markAsNotDone);

// Export the router to the app
module.exports = router;
