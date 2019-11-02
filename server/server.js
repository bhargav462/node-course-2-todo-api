var config = require('./config/config');

const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {user} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT||3000;

app.use(bodyParser.json());

app.post('/todos',authenticate,(req,res) => {
    var todo1 = new todo({
        text:req.body.text,
        _creator: req.newUser._id
    });

    todo1.save().then((doc) => {
         res.send(doc);
    },(e) => {
         res.status(400).send(e);
    });
});

app.get('/todos',authenticate,(req,res) => {
    console.log(JSON.stringify(req.newUser,undefined,2));
  todo.find({
      _creator:req.newUser._id
  }).then((todos) => {
      console.log('todos',todos);
      res.send({todos});
},(e) => {
    res.status(400).send(e);
 });
});

//GET /todos/1234324

app.get('/todos/:id',authenticate,(req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        console.log('Invalid id');
        return res.status(404).send();
    }

    todo.findOne({
        _id:id,
        _creator:req.newUser._id
    }).then((todos) => {
        if(!todos)
        return res.status(404).send('no todos');
        console.log('Todos was found');
       res.send({   todos});
    },(e) => {
        console.log(e);
        res.status(400).send();
    });
});

app.delete('/todos/:id',authenticate,(req,res) => {
 var id = req.params.id;

 if(!ObjectID.isValid(id)){
     return res.status(404).send('Invalid is');
 }

 todo.findOneAndRemove({
     _id:id,
     _creator:req.newUser._id
    }).then((todo) => {
     if(!todo)
     return res.status(404).send('No data');
     
     res.send({todo});
 },(e) => {
     res.status(400).send(todo);
 });
});

app.patch('/todos/:id',authenticate,(req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);
 
  if(!ObjectID.isValid(id)){
      return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
      body.completedAt = new Date().getTime();
  }else{
      body.completed = false;
      body.completedAt = null;
  }

   todo.findOneAndUpdate({
       _id:id,
       _creator:req.user._id
   },{
       $set: body
   },{
       new:true
    }
   ).then((todo) => {
      if(!todo){
          return res.status(404).send();
      }
      res.send({todo});
   }).catch((e) => {
       res.status(404).send();
    });
});

//POST /users
app.post('/users',(req,res) => {
    console.log('hi');
   var body = _.pick(req.body,['email','password']);
   var newUser = new user(body);
  
   newUser.generateAuthToken().then((token) =>{
       console.log('token',token);
    newUser.save().then(() => {

        res.header('x-auth',token).send(newUser);

    }).catch((e) => {
       
        res.status(400).send({name:'Bhargav'});
    }); 
   }).catch((e) => {
    res.status(400).send({name:'solved'});
});
});



app.get('/users/me',authenticate,(req,res) => {
    

    res.send(req.newUser);
});

app.post('/users/login',(req,res) => {

  var body = _.pick(req.body,['email','password']);
  
  user.findByCredentials(body.email,body.password).then((newUser) => {
     
        var access = "auth";
        var token =  jwt.sign({_id:newUser._id.toHexString(),access},process.env.JWT_SECRET).toString();
          res.header('x-auth',token).send(newUser);
     
    

  }).catch((e) => {
      
     res.status(400).send();
  });

});

app.delete('/users/me/token',authenticate,(req,res) => {

    console.log('app',req.token);
   req.newUser.removeToken(req.token).then(() => {
     res.status(200).send();
   },() => {
       res.status(400).send();
   });

});

app.listen(port,() => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};