const express = require('express');
const router = express.Router();


const controller = require('../controllers/task')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Task Manager'});
});

router.post('/task/add', controller.addTask);
router.post('/task/edit', controller.editTask);
router.post('/task/delete', controller.deleteTask);

module.exports = router;
