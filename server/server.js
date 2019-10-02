const {ObjectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');

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

app.listen(port,() => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};