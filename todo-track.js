require('express-async-errors');
const error = require('./middleware/error')
const winston = require ('winston');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const boom = require('express-boom');
const tasks = require('./routes/tasks');
const home = require('./routes/home');
const auth = require('./routes/auth')
const registers = require('./routes/users')
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const hbs = require("express-handlebars");


process.on('uncaughtException', (ex) =>{
    console.log('WE GOT AN UNCAUGHT EXCEPTION');
    winston.error(ex.message, ex);
})


//Middleware
app.engine(
    "hbs",
    hbs({
      extname: "hbs",
      defaultLayout: "layout",
      layoutsDir: __dirname + "/public/views/layouts"
    })
  );
  app.set("views", path.join(__dirname, "/public/views"));
  app.set("view engine", "hbs");
  
app.set('views', './public/views');
app.use(boom());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
app.use('/api/auth', auth);
app.use('/api/users', registers);
app.use('/api/tasks', tasks);
app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/views"));
app.use(express.static(__dirname + "/public/js"));
app.use(express.static(__dirname));


app.use(error);

//Configuration
//setting private key in the environment using export=tracker_jwtPrivateKey=mySecureKey

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
console.log('Application Name: ' + config.get('name'));



const port = process.env.PORT || 8080;
app.listen(port, () => startupDebugger(`Gator listening on port ${port}`));


var accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'), { flags: 'a' })


if(process.env.NODE_ENV === 'development'){
  startupDebugger('Morgan is enabled');
  app.use(morgan('combined', { stream: accessLogStream, /*skip: function (req, res) { return res.statusCode < 400 }*/ }));
}

mongoose.connect('mongodb://localhost/todo-trackerDB', {useNewUrlParser: true})
.then(() => dbDebugger('Connected to MongoDB...'))
.catch((err) => console.error('Could not connect to MongoDB \n', err));


//route params for necessary info
//query string params for any additional data
//When using debugging, you have to set the environment variable to the namespace for that particular debugger....export DEBUG=app:startup etc. or multiple DEBUG=app:startup,app:db OR use wild card DEBUG=app:*
