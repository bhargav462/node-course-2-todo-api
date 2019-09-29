const {ObjectID} = require('mongodb');

const mongoose = require('../server/db/mongoose');
const {todo} = require('../server/models/todo');
const {user} = require('../server/models/todo');

var id = '5d8f8fee1c7ffde434842ba011';

if(!ObjectID.isValid(id)){
    console.log('ID not valid');
}
// todo.find({
//     _id: id
// }).then((todos) => {
//   console.log('Todos',JSON.stringify(todos,undefined,2));
// });

// todo.findOne({
//     _id:id
// }).then((todo) => {
//     console.log('Todo',JSON.stringify(todo,undefined,2));
// });

// todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found ');
//     }
//     console.log('Todo by id',JSON.stringify(todo,undefined,2));
// }).catch((e) => console.log('error',e));