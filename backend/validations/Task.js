const { checkSchema } = require('express-validator');

const TaskValidation = checkSchema({
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

module.exports = TaskValidation;