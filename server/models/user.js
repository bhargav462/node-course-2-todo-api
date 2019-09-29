var mongoose = require('mongoose');
console.log('beginning');
var user = mongoose.model('user',{
    username:{
        type:String,
        required:true,
        trim:true
    }
});
console.log('iser');
module.exports = {user};