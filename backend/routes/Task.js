const express = require('express');

const Tasks = require('../controllers/Tasks');
const TaskValidation = require('../validations/Task');

const router = express.Router();

router.get('/', Tasks.get);
router.post('/create', TaskValidation, Tasks.create);

module.exports = router;