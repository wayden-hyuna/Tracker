const auth = require('../middleware/auth')
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
    startupDebugger('Morgan is enabled in users route');
    router.use(morgan('combined', { stream: accessLogStream, /*skip: function (req, res) { return res.statusCode < 400 }*/ }));
}


router.get('/me', auth, async (req, res) =>{

    const user = await User.findById(req.user._id).select('-password')
    res.send(user);
});

router.post('/', async (req, res) =>{
    
    try{

        const {error} = validateUser(req.body);
            
        if (error){return res.boom.badRequest(error.details[0].message)}

        let user = await User.findOne({email: req.body.email});

        if(user){return res.boom.badRequest('User already registered.')}

        user = new User(_.pick(req.body, ['name', 'email', 'password']));

        //underscore/lodash allows for formatting of several data types, check documentation...dbDebugger.it is used with the object here and an array to pull out specific attributes by name rather than using req.body


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        const result = await user.save();
        dbDebugger(result); 

        const token = user.generateAuthToken();
        
        //for custom headers defined in app we should prefix them with 'x-' then we give it an arbitrary name followed by the value(item being sent)
        //in the client we can look at the header and use the token in there and store it and next time a request is sent we can send the token to the server
        return res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    }
    
    catch(ex){ for(field in ex.errors) dbDebugger(ex.error[field]);
        return res.boom.notFound('task with given id not found.');

    }   

});

module.exports = router;