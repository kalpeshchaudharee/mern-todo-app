const { checkSchema } = require('express-validator');

const TaskCreate = checkSchema({
    title: {
        notEmpty: {
            errorMessage: 'Title is required'
        },
    },
    description: {
        notEmpty: {
            errorMessage: 'Description is required'
        },
    },
    status: {
        notEmpty: {
            errorMessage: 'Status is required'
        },
        isIn: {
            options: [['To Do', 'In Progress', 'Done']],
            errorMessage: 'To Do, In Progress, Done only these status are allowed'
        },
    }
});

const TaskUpdate = checkSchema({
    title: {
        optional: true,
        notEmpty: {
            errorMessage: 'Title is required'
        },
        exists: true
    },
    description: {
        optional: true,
        notEmpty: {
            errorMessage: 'Description is required'
        },
    },
    status: {
        optional: true,
        notEmpty: {
            errorMessage: 'Status is required'
        },
        isIn: {
            options: [['To Do', 'In Progress', 'Done']],
            errorMessage: 'To Do, In Progress, Done only these status are allowed'
        },
    }
});

module.exports = { TaskCreate, TaskUpdate };