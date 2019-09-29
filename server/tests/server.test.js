const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {todo} = require('./../models/todo');

const todos = [{
    text : 'First test case'
},{
    text : 'Second test case'
}];

beforeEach((done) => {
  todo.remove({}).then(() => {
    return todo.insertMany(todos);
  }).then(() => done()) ;
});

describe('POST /todos', () => {
    if('should create a new todo', (done) => {
       var text = 'Test todo text';

       request(app)
       .post('/todos')
       .send({text})
       .expect(200)
       .expect((res) => {
           expect(res.body.text).toBe(text);
       })
       .end((err,res) => {
           if(err) {
               return done(err);
           }

           todo.find().then((todos) => {
               expect(todos.length).toBe(2);
               expect(todos[0].text).toBe(text);
               done();
           }).catch((e) => done(e));
       });
    });
});