const {ObjectID} = require('mongodb');

const mongoose = require('../server/db/mongoose');
const {todo} = require('../server/models/todo');
const {user} = require('../server/models/todo');

// todo.remove({}).then((res) => {
//     console.log(res);
// });
var id = '5d90ae57e8b99a095ee5d293';
// todo.findOneAndRemove({
//     _id : id
// }).then((todo) => {
//     console.log(JSON.stringify(todo,undefined,2));
// });

todo.findByIdAndRemove(id).then((todo) => {
    console.log('todo',JSON.stringify(todo,undefined,2));
})

