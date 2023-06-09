const mongoose = require('mongoose')

const Notes = mongoose.Schema({
    title:{
        type:String,
        required : true,
    },
    description:{
        type: String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    activated: Boolean,
})

module.exports = mongoose.model('Notes' , Notes);