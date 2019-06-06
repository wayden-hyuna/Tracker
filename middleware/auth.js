const jwt = require("jsonwebtoken");
const config  = require('config');


module.exports = function (req,res,next){

    const token = req.header('x-auth-token');
   if(!token) return res.boom.unauthorized('access denied. No token provided').redirect('/login');

   try{
       
       const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
       req.user = decoded;
       next();
   }
   catch(ex){
    res.boom.badRequest('Invalid Token.');
    }   
}
