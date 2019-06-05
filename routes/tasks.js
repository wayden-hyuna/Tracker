const express = require('express');
const router = express.Router();
const crud = require('../mongo-crud/crudMongo')
const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');


//for getting all
router.get('/', (req, res) =>{

    crud.getTasks(req, res);

});


//for getting 1
router.get('/:id', (req, res) => {

    crud.getTaskById(req, res);

});

//for adding
router.post('/', (req, res) =>{

    crud.createTask(req, res);

});


//for updating
router.put('/:id', (req, res) => {
    
    crud.updateTask(req, res);

});

//for deleting
router.delete('/:id', (req, res) => {

    crud.deleteOne(req, res);

});

router.delete('/', (req, res) => {

    crud.deleteAll(req, res);
    res.sendStatus(200);

});


module.exports = router;
