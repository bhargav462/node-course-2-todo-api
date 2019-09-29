// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if(err){
      return console.log('Unable to connect to the mongodb server');
  }
  console.log('Connected to MongoDB server ');
  
//   db.collection('Todos').insertOne({
//      text:'Something to do',
//      completed:false
//   },(err,result) => {
//       if(err){
//           return console.log('Unable to insert todo',err);
//       }

//       console.log(JSON.stringify(result));
//   });

db.collection('UsersOne').insertOne({
  name:'Bhargav',
  age:19,
  location:'Visakhapatnam'
},(err,res) => {
    if(err)
    {
        return console.log('Unable to insert user',err);
    }
    console.log(JSON.stringify(res.ops[0]._id.getTimestamp(),undefined,1));
})

  db.close();
});

//first 4 bytes - timestamp
//3 bytes - machine id
//3 bytes - process id
//3 bytes - random