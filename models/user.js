const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1
  };


const User = mongoose.model('User', new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }

}));



    function validateLogin (user) {

        const schema = {
            email: Joi.string().min(3).max(200),
            password: new PasswordComplexity(complexityOptions)
        }
    
        return Joi.validate(user, schema);
    
    }

    function validateUser (user) {
        
        const schema = {
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().min(5).max(255).required(),
            password: new PasswordComplexity(complexityOptions)
        }

        return Joi.validate(user, schema);

    }

exports.User = User;
exports.validateLogin = validateLogin;
exports.validateUser = validateUser;
