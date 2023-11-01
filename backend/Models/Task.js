const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do'
    },
}, { timestamps: true });

const TaskModel = mongoose.model('tasks', TaskSchema);
module.exports = TaskModel;

