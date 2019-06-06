

module.exports = function(err, req, res, next){

        //log the exception
    dbDebugger(ex.stack);
    res.boom.notFound('task with given id not found.');

}