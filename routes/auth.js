
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const dbDebugger = require('debug')('app:db');
const {User, validateUser, validateLogin} = require('../models/user');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');
const path = require('path');
const fs = require('fs');


var accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' })

if(process.env.NODE_ENV == 'development'){
    startupDebugger('Morgan is enabled in auth route');
    router.use(morgan('combined', { stream: accessLogStream, /*skip: function (req, res) { return res.statusCode < 400 }*/ }));
}




router.post('/', async (req, res) =>{

    try{
        const {error} = validateLogin(req.body);
        if (error){return res.boom.badRequest(error.details[0].message)}

        let user = await User.findOne({email: req.body.email});
    // dbDebugger(user);

        if(!user){return res.boom.badRequest('Invalid email or password')}
        const validPassword = await bcrypt.compare(req.body.password, user.password); 
        if(!validPassword){return res.boom.badRequest('Invalid email or password')}

        const token = user.generateAuthToken();
        res.send(token);
    }catch(ex){
        dbDebugger(ex.stack);
        return res.boom.notFound('task with given id not found.');
    }
});

//Setting private key into the environment variable

module.exports = router;