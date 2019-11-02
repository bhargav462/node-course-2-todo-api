const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {todo} = require('./../../models/todo');
const {user} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id:userOneId,
    email:'bhargav462@gmail.com',
    password:'abc123',
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:userOneId,access:'auth'},process.env.JWT_SECRET).toString()
    }]
},{
    _id: userTwoId,
    email:'bhargav462@gmail.com',
    password:'abc321',
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:userTwoId,access:'auth'},process.env.JWT_SECRET).toString()
    }]
}];

const todos = [{
    _id : new ObjectID(),
    text : 'First test case',
    _creator:userOneId
},{
    _id : new ObjectID(),
    text : 'Second test case',
    completed:true,
    completedAt:333,
    _creator:userTowId
}];

const populateTodos = (done) => {
    todo.remove({}).then(() => {
      return todo.insertMany(todos);
    }).then(() => done()) ;
  };

  const populateUsers = (done) => {
      user.remove({}).then(() => {
          var userOne = new user(users[0].save());
          var userTwo = new user(users[1].save());
          
         return Promise.all([userOne,userTwo])
      }).then(() => done());
  }

  module.exports = {todos,populateTodos,users,populateUsers};