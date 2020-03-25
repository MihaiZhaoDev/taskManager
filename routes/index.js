const express = require('express');
const router = express.Router();


const controller = require('../controllers/task')

/* GET home page. */
router.get('/', controller.index);
router.put('/task/add', controller.addTask);
router.post('/task/edit', controller.editTask);
router.delete('/task/delete', controller.deleteTask);
router.put('/task/done', controller.markAsDone);
router.put('/task/undone', controller.markAsNotDone);

module.exports = router;
