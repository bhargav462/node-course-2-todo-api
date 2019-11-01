var {user} = require('./../models/user');

var authenticate = (req,res,next) => {

    var token = req.header('x-auth');
    console.log('head',token);
    user.findByToken(token).then((newUser) => {
      //console.log('newUser',JSON.stringify(newUser,undefined,2));

       if(!newUser){
         return Promise.reject();  
       }
       
       req.newUser = newUser;
       req.token = token;
       next();
       
    }).catch((e) => {
        res.status(401).send();
    });

};

module.exports = {authenticate};