const express = require('express');
const tasks = require('../routes/tasks');
const home = require('../routes/home');
const auth = require('../routes/auth');
const registers = require('../routes/users');
const hbs = require("express-handlebars");
const error = require('../middleware/error');
const path = require('path');
const boom = require('express-boom');

module.exports = function (app) {

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
    app.use('/', home);
    app.use('/api/auth', auth);
    app.use('/api/users', registers);
    app.use('/api/tasks', tasks);
    app.use(express.static(__dirname + "/public/css"));
    app.use(express.static(__dirname + "/public/views"));
    app.use(express.static(__dirname + "/public/js"));
    app.use(express.static(__dirname));
    app.use(error);
    
}