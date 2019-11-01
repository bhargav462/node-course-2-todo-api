const expect = require('expect');
const request = require('supertest');
const ObjectID = require('mongodb');

const {app} = require('./../server');
const {todo} = require('./../models/todo');
const {todos,populateTodos,users,populateUsers} = require('./seed/seed');


beforeEach(populateUsers);
beforeEach(populateTodos);

// describe('POST /todos', () => {
//     if('should create a new todo', (done) => {
//        var text = 'Test todo text';

//        request(app)
//        .post('/todos')
//        .send({text})
//        .expect(200)
//        .expect((res) => {
//            expect(res.body.text).toBe(text);
//        })
//        .end((err,res) => {
//            if(err) {
//                return done(err);
//            }

//            todo.find().then((todos) => {
//                expect(todos.length).toBe(2);
//                expect(todos[0].text).toBe(text);
//                done();
//            }).catch((e) => done(e));
//        });
//     });
// });

// describe('GET /todos/:id',() => {
//     it('should return todo doc',(done) => {
//         request(app)
//         .get(`/todos/${todos[0]._id.toHexString()}`)
//         .expect(200)
//         .expect((res) => {
//             expect(res.body.todo.text).toBe(todos[0].text);
//         })
//         .end(done);
//     });
// });

// describe('DELETE /todos/:id', () => {
//     it('should remove a todo',(done) => {
//       var hexId = todos[1]._id.toHexString();

//       request(app).delete(`/todos/${hexId}`)
//       .expect(200)
//       .expect((res) => {
//          expect(res.body.todo._id).toBe(hexId);
//       })
//       .end((err,res) => {
//         if(err){
//             return done(err);
//         }

//         todo.findById(hexId).then((todo) => {
//             expect(todo).toNotExist();
//             done();
//         }).catch((e) => done(e));
//       });
//     });

//     // it('should return 4-4 if todo not found ',(done) => {

//     // });

//     // it('should return 404 if object id is invalid',(done) => {

//     // });
// });