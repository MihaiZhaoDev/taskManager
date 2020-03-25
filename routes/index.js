const express = require('express');
const router = express.Router();


// Controller
const controller = require('../controllers/task');

// Routes
router.get('/', controller.index);
router.put('/task/add', controller.addTask);
router.post('/task/edit', controller.editTask);
router.delete('/task/delete', controller.deleteTask);
router.put('/task/done', controller.markAsDone);
router.put('/task/undone', controller.markAsNotDone);

module.exports = router;
