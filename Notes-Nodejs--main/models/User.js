const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    Fname : String,
    Email : String,
    Password : String
});

module.exports = mongoose.model('users' ,Users);