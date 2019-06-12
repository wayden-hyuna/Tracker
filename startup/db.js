const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {

    mongoose.connect('mongodb://localhost/todo-trackerDB', {useNewUrlParser: true})
    .then(() => winston.info('Connected to MongoDB...'));   
    mongoose.set('useCreateIndex', true);

}