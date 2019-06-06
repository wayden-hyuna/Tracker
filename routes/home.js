const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');
const path = require('path');
const fs = require('fs');

var accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' })

if(process.env.NODE_ENV == 'development'){
    startupDebugger('Morgan is enabled in home route');
    router.use(morgan('combined', { stream: accessLogStream, /*skip: function (req, res) { return res.statusCode < 400 }*/ }));
}




router.get('/', (req, res) =>{


    
    res.render('index',{title:'Todo Tracker', message: 'Hello mate!'});



});


module.exports = router;