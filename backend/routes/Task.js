const express = require('express');

const Tasks = require('../controllers/Tasks');
const { TaskUpdate, TaskCreate } = require('../validations/Task');

const router = express.Router();

router.get('/', Tasks.get);
router.post('/create', TaskCreate, Tasks.create);
router.put('/update/:id', TaskUpdate, Tasks.update);
router.delete('/delete/:id', Tasks.deleteTask);

module.exports = router;