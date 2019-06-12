const mongoose = require('mongoose');
const Joi = require('joi');



const Task = mongoose.model('Task', new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    status:{
        type: Boolean,
        required: true
    },
    created: {
        type: Date,
        default: Date.now,
    },
    completed: {type: Date, default: null},

    owner:{type: String, required: true }
}));



    function validatetask (task) {

        const schema = {
            description: Joi.string().min(3).max(200),
            status: Joi.bool().required(),
        }
    
        return Joi.validate(task, schema);
    
    }

    function validateNewTask (task) {
        
        const schema = {
            title: Joi.string().required(),
            description: Joi.string().min(3).max(200),
            status: Joi.bool().required(),
        }

        return Joi.validate(task, schema);

    }

exports.Task = Task;
exports.validatetask = validatetask;
exports.validateNewTask = validateNewTask;