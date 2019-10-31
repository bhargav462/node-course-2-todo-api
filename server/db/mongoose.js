var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
// var Todo = mongoose.model('Todo',{
//     text:{
//         type:String
//     },
//     completed:{
//         type:Boolean
//     },
//     completedAt:{
//         type:Number
//     }
// });

// var newTodo = new Todo({
//     text:'node js',
//     completed:false,
//     completedAt:1100
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo',doc);
// },(e) => {
//     console.log('Unable to save todo');
// })
module.exports = {mongoose};

