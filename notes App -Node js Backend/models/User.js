const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    FullName : {
        type:String,
    },
    Email : {
        type:String,
        required : true,
    },
    Password :  {
        type:String,
        required : true,
    }
});

module.exports = mongoose.model('users' ,Users);