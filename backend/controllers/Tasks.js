const TaskModel = require('../Models/Task.js');
const { validationResult } = require('express-validator');

const create = (req, res) => {
    // validate input for create task
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(500).send({
            status: 'error',
            status_code: 500,
            message: Object.keys(result.mapped()).join(',') + " this fields are invalid."
        });
    }

    const { title, description, status } = req.body;
    // create task
    TaskModel.create({
        title,
        description,
        status
    }).then((response) => {
        res.send({
            status: 'success',
            status_code: 200,
            data: response
        });
    }).catch((error) => {
        res.status(500).send({
            status: 'error',
            status_code: 500,
            message: error.message
        })
    });
}

const get = async (req, res) => {
    const { page = 1, size = 10, statusFilter } = req.query;

    // fetch tasks with pagination
    let filters = null;
    if(statusFilter) {
        filters = {status: statusFilter}
    }
    const tasks = TaskModel.find(filters).limit(size).skip((page - 1) * size).exec();

    // get count of all tasks
    const count = await TaskModel.countDocuments(filters);

    tasks.then((response) => {
        res.send({
            status: 'success',
            status_code: 200,
            data: {
                page: page,
                size: size,
                totalPages: Math.ceil(count / size),
                totalElements: count,
                result: response
            }
        });
    }).catch((error) => {
        res.send({
            status: 'error',
            status_code: 500,
            message: error
        })
    });
}

const update = (req, res) => {
    // validate input for update task
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(500).send({
            status: 'error',
            status_code: 500,
            message: Object.keys(result.mapped()).join(',') + " this fields are invalid."
        });
    }

    const { title, description, status } = req.body;
    // update task
    TaskModel.findByIdAndUpdate(req.params.id, {
        title, description, status
    })
    .then((response) => {
        res.send({
            status: 'success',
            status_code: 200,
            data: response
        });
    }).catch((error) => {
        res.send({
            status: 'error',
            status_code: 500,
            message: error
        })
    });
}

const deleteTask = (req, res) => {
    // find and delete task
    TaskModel.findByIdAndDelete(req.params.id)
    .then((response) => {
        res.send({
            status: 'success',
            status_code: 200,
            data: response
        });
    }).catch((error) => {
        res.send({
            status: 'error',
            status_code: 500,
            message: error
        })
    });
}

module.exports = { create, get, update, deleteTask };