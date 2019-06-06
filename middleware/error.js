const dbDebugger = require('debug')('app:db');
const winston = require('winston');

module.exports = function(err, req, res, next){

    winston.error(err.message, err);
    res.boom.badImplementation("Something happened");

}