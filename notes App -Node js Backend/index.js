// // env access
require('dotenv').config()
// // imports
const express = require('express');
const cors =require('cors')


const app = express();

const Port = process.env.PORT ||  8080 

// // db connect
const dbconnect = require('./db')
dbconnect();

//  /// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// // routes
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));


// /// // CURD 
app.use('/notes',require('./CRUD/CreateNote'));  // // post     //  create Notes
app.use('/notes',require('./CRUD/ReadNote'));    // // get      //  read notes
app.use('/notes',require('./CRUD/UpdateNote'));  // // put      //  update notes
app.use('/notes',require('./CRUD/DeleteNote'));  // // delete   //  delete notes
app.use('/notes',require('./CRUD/OnlyOneNote'));  // // OnlyOneNote   //  OnlyOneNote notes




// // testing perpuse
app.get('/',(req,res)=>{
res.send('server is running')
})

app.listen(Port,()=>{
    console.log("8080");
})


