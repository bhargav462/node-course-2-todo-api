// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if(err){
      return console.log('Unable to connect to the mongodb server');
  }
  console.log('Connected to MongoDB server ');
 
//   db.collection('Todos').find({completed:false}).toArray().then((docs) => {
//     console.log('Todos');
//     console.log(JSON.stringify(docs,undefined,2));
//   },(err) => {
//       console.log("Unable to connect to the mongo",err);
//   });

db.collection('UsersOne').find({name:'Bhargav'}).toArray().then((res) => {
    console.log('Todos');
    console.log(JSON.stringify(res,undefined,2));
  },(err) => {
      console.log("Unable to connect to the mongo",err);
  });

  db.close();
});

//first 4 bytes - timestamp
//3 bytes - machine id
//3 bytes - process id
//3 bytes - random