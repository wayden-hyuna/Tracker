const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const startupDebugger = require('debug')('app:startup');
const config = require('config');

module.exports = function(app) {


    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
      }
    
  var accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' })
  
  if(process.env.NODE_ENV === 'development'){
    startupDebugger('Morgan is enabled');
    app.use(morgan('combined', { stream: accessLogStream /*skip: function (req, res) { return res.statusCode < 400 }*/ }));
  }
      
}


  //Configuration
  //setting private key in the environment using export=tracker_jwtPrivateKey=mySecureKey
  

  //route params for necessary info
  //query string params for any additional data
  //When using debugging, you have to set the environment variable to the namespace for that particular debugger....export DEBUG=app:startup etc. or multiple DEBUG=app:startup,app:db OR use wild card DEBUG=app:*
  
