// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if(err){
      return console.log('Unable to connect to the mongodb server');
  }
  console.log('Connected to MongoDB server ');
   
  // db.collection('Todos').findOneAndUpdate({
  //   _id:new ObjectID("5d5e9c9c3f457c437194c90e")
  // },{
  //   $set:{
  //     text:'new text',
  //     completed:true
  //   }},{
  //     returnOriginal:false
  //   }
  // ).then((res) => {
  //   console.log(res);
  // });  

  db.collection('UsersOne').updateMany({
    name:'Bhargav'
  },{
    $inc:{
      age:-2
    }
  },{
    returnOriginal:false
  }).then((res) => {
    console.log(res);
  })

  // db.close();
});

//first 4 bytes - timestamp
//3 bytes - machine id
//3 bytes - process id
//3 bytes - random