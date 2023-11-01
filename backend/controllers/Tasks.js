const TaskModel = require('../Models/Task.js');
const Validate = require('../validations/Validate.js')

const create = (req, res) => {

    const result = Validate(req);
    if (!result.isEmpty()) {
        res.json({
            status: 'error',
            status_code: 500,
            data: result.mapped()
        });
    }

    const { title, description, status } = req.body;

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
        res.send({
            status: 'error',
            status_code: 500,
            error: error.message
        });
    });
}

const get = (req, res) => {
    TaskModel.find()
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
            data: error
        })
    });
}

const update = (req, res) => {
    const result = Validate(req);

    if (!result.isEmpty()) {
        res.json({
            status: 'error',
            status_code: 500,
            data: result.mapped()
        });
    }

    const { title, description, status } = req.body;

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
            data: error
        })
    });
}

const deleteTask = (req, res) => {
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
            data: error
        })
    });
}

module.exports = { create, get, update, deleteTask };