const dbDebugger = require('debug')('app:db');


module.exports = function(err, req, res, next){

        //log the exception
    dbDebugger(err.stack);
    res.boom.notFound('task with given id not found.');

}