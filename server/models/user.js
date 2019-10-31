const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            validator: validator.isEmail ,
            message:'{VALUE} is not a valid email'
        }
    },
        password:{
            type:String,
            required:true,
            minlength:6
        },
        tokens: [{
            access:{
                type:String,
                required :true
            },
            token:{
                 type:String,
                 required:true
            }
        }]
});

userSchema.methods.toJSON = function(){
    var newUser = this;
    var userObject = newUser.toObject();

    return _.pick(userObject,['_id','email']);
};

userSchema.methods.generateAuthToken = function(){
    
    var newUser = this;
    var access = "auth";
    var token = jwt.sign({_id:newUser._id.toHexString(),access},'abc123').toString();
    
    newUser.tokens.push({access,token});

    return newUser.save().then(() => {
        //console.log(newUser);
           return token;
    }).catch((e) => {
        res.status(400).send();
    });
};

var user = mongoose.model('user',userSchema);

module.exports = {user};