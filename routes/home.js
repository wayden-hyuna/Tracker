const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');


router.get('/', (req, res) =>{
    res.render('index',{title:'My Express App', message: 'Hello'});
});


module.exports = router;