// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if(err){
      return console.log('Unable to connect to the mongodb server');
  }
  console.log('Connected to MongoDB server ');
   
//  deleteMany  
//    db.collection('Todos').deleteMany({text:'eat the lunch'}).then((result) => {
//        console.log(result);
//    });

//deleteOne
    //   db.collection('Todos').deleteOne({text:'Eat lunch'}).then((res) => {
    //       console.log(res);
    //   });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed:false}).then((res) => {
    //     console.log(res);
    // });

  // db.close();
});

//first 4 bytes - timestamp
//3 bytes - machine id
//3 bytes - process id
//3 bytes - random