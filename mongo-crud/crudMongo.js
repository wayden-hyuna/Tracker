
const dbDebugger = require('debug')('app:db');
const {Task, validateNewTask, validatetask} = require('../models/tasks')

module.exports = {


    getTasks: async function (req, res){

        const tasks = await Task 
            .find({owner: req.user});
        return res.send(tasks);

    },

    getTaskById: async function (req, res, next){
   
        let task = await Task.findById(req.params.id);
        if(!task){return res.boom.notFound('task with given id not found.')}; 
        return res.send(task);
    
    },


    createTask: async function (req, res){

        const {error} = validateNewTask(req.body);
       
        if (error){return res.boom.badRequest(error.details[0].message)}
        

        const task = new Task( {

            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            owner: req.user 

        });

        const result = await task.save();
        dbDebugger(result);
        return res.send(task);
        
    },

    updateTask: async function (req, res){
        
        // object destructuring --- allows you to access the properties of an object directly when an object is return to it from a function or method
        const {error} = validatetask(req.body);
        if (error){return res.boom.badRequest(error.details[0].message)}
        
 
        const task = await Task.findById(req.params.id);

        dbDebugger(task);
        if(!task){dbDebugger(ex.stack); return res.boom.notFound('task with given id not found.')}

        task.description = req.body.description;
        task.status = req.body.status;
        if(task.status){task.completed = Date();}

        const result = await task.save();
        dbDebugger(result);
        return res.send(task);
       
    },


    deleteOne: async function (req, res){
 
        const result = await Task.findByIdAndDelete(req.params.id);
        if(!result){return res.boom.notFound('task with given id not found.')}; 
        return res.send(result);
    
    },

    deleteAll: async function (req, res){
  
        return (Task.deleteMany({owner: req.user}, err => {dbDebugger(err); throw err;}))
       
    }
};

