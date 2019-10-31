var config = require('./config/config');

const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {user} = require('./models/user');

var app = express();
const port = process.env.PORT||3000;

app.use(bodyParser.json());

app.post('/todos',(req,res) => {
    var todo1 = new todo({
        text:req.body.text
    });

    todo1.save().then((doc) => {
         res.send(doc);
    },(e) => {
         res.status(400).send(e);
    });
});

app.get('/todos',(req,res) => {
  todo.find().then((todos) => {
      res.send({todos});
},(e) => {
    res.status(400).send(e);
 });
});

//GET /todos/1234324

app.get('/todos/:id',(req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        console.log('Invalid id');
        return res.status(404).send();
    }

    todo.findById({
        _id:id
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

app.delete('/todos/:id',(req,res) => {
 var id = req.params.id;

 if(!ObjectID.isValid(id)){
     return res.status(404).send('Invalid is');
 }

 todo.findByIdAndRemove(id).then((todo) => {
     if(!todo)
     return res.status(404).send('No data');
     
     res.send({todo});
 },(e) => {
     res.status(400).send(todo);
 });
});

app.patch('/todos/:id',(req,res) => {
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

   todo.findByIdAndUpdate(id,{
       $set: body
   },{new:true}).then((todo) => {
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
    newUser.save().then(() => {

        res.header('x-auth',token).send(newUser);

    }).catch((e) => {
       
        res.status(400).send({name:'Bhargav'});
    }); 
   }).catch((e) => {
    res.status(400).send({name:'solved'});
});
});

app.listen(port,() => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};