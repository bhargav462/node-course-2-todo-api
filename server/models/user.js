const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
        console.log('newUser');
           return token;
    });
};

userSchema.methods.removeToken =function(token){
  
    var newUser = this;

    return newUser.update({
        $pull:{
            tokens:{ token }
        }
    });

};

userSchema.statics.findByToken = function(token){
  

    var newUser = this;
    var decoded;

    try{
      decoded = jwt.verify(token,'abc123');
    }catch(e){
       
       return Promise.reject();
    }
  
    return newUser.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
};

userSchema.statics.findByCredentials = function(email,password){

  var newUser = this;
  
  return newUser.findOne({email}).then((user1) => {

      if(!user1){
          return Promise.reject('intention');
      }

      

      return new Promise((resolve,reject) => {

         bcrypt.compare(password,user1.password,(err,res) => {
             
            if(res){
                
               resolve(user1);
            }else{
                console.log('incorrect password');
                reject();
            }


         });

      });
  });
};

userSchema.pre('save',function(next){
  
    var newUser = this;
    if(newUser.isModified('password')){

        bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(newUser.password,salt,(err,hash) => {
                newUser.password = hash;
                next();
            });
        });

    }else{
        next();
    }

});

var user = mongoose.model('user',userSchema);

module.exports = {user};