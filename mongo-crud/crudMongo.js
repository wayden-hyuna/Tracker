
const dbDebugger = require('debug')('app:db');
const {Task, validateNewTask, validatetask} = require('../models/tasks')

module.exports = {


    getTasks: async function (req, res){


        try{
            const tasks = await Task 
                .find();
            return res.send(tasks);
        }
        catch(ex){
            dbDebugger(ex.stack);
                return res.boom.notFound('task with given id not found.');
        }


    },

    getTaskById: async function (req, res){

        try{    
            let task = await Task.findById(req.params.id);
            if(!task){return res.boom.notFound('task with given id not found.')}; 
            return res.send(task);
        }

        catch(ex){
                dbDebugger(ex.stack);
                return res.boom.notFound('task with given id not found.');
        }
    
        //dbDebugger(task);

    },


    createTask: async function (req, res){

        const {error} = validateNewTask(req.body);
        
        if (error){return res.boom.badRequest(error.details[0].message)}

        const task = new Task( {

            title: req.body.title,
            description: req.body.description,
            status: req.body.status, 

        });

        try{
            const result = await task.save();
            dbDebugger(result);
            return res.send(task);
        }
        catch(ex){ for(field in ex.errors) dbDebugger(ex.error[field]);}   

    },


    updateTask: async function (req, res){
        
        // object destructuring --- allows you to access the properties of an object directly when an object is return to it from a function or method
        const {error} = validatetask(req.body);
        if (error){return res.boom.badRequest(error.details[0].message)}
        
        try{
        const task = await Task.findById(req.params.id);

        dbDebugger(task);
        if(!task){dbDebugger(ex.stack); return res.boom.notFound('task with given id not found.')}

        task.description = req.body.description;
        task.status = req.body.status;
        if(task.status){task.completed = Date();}

            const result = await task.save();
            dbDebugger(result);
            return res.send(task);
        }
        catch(ex){ for(field in ex.errors) dbDebugger(ex.error[field]); res.boom.badImplementation('Something failed.')}     

        
    },


    deleteOne: async function (req, res){
        try{
            const result = await Task.findByIdAndDelete(req.params.id);
            if(!result){return res.boom.notFound('task with given id not found.')}; 
            return res.send(result);
        }
        catch(ex){
            dbDebugger(ex.stack);
            return res.boom.notFound('task with given id not found.');
        }
    },

    deleteAll: async function (req, res){
        try{
            return (Task.deleteMany({}, err => {dbDebugger(err);}))
        } 
        catch(ex){
            dbDebugger(ex.stack);
            return res.boom.notFound('task with given id not found.');
        }
    }
};