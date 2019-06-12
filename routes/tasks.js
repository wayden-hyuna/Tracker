const express = require('express');
const router = express.Router();
const crud = require('../mongo-crud/crudMongo')
const startupDebugger = require('debug')('app:startup');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');


var accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' })

if(process.env.NODE_ENV == 'development'){
    startupDebugger('Morgan is enabled in tasks route');
    router.use(morgan('combined', { stream: accessLogStream, /*skip: function (req, res) { return res.statusCode < 400 }*/ }));
}


//for getting all
router.get('/', auth, async (req, res) =>{

    crud.getTasks(req, res);

});


//for getting 1
router.get('/:id', auth, async(req, res) => {

    crud.getTaskById(req, res);

});

//for adding
router.post('/', auth, async(req, res) =>{

    crud.createTask(req, res);

});


//for updating
router.put('/:id', auth, async(req, res) => {
    
    crud.updateTask(req, res);

});

//for deleting
router.delete('/:id', auth, async(req, res) => {

    crud.deleteOne(req, res);

});

router.delete('/', auth, async(req, res) => {

    crud.deleteAll(req, res);
    res.sendStatus(200);

});


module.exports = router;
