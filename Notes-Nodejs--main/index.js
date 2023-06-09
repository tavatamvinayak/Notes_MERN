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


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// // routes
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));


// /// // CURD 
app.use('/notes',require('./CRUD/CreateNote'));  // // post     //  create Notes
app.use('/notes',require('./CRUD/ReadNote'));    // // get      //  read notes
app.use('/notes',require('./CRUD/UpdateNote'));  // // put      //  update notes
app.use('/notes',require('./CRUD/DeleteNote'));  // // delete   //  delete notes


app.get('/data',(req,res)=>{
    res.json(
        [{name:"vishal" , last:"tavatam"},
        
    ])
    
    console.log("data sended success ")
})


app.listen(Port,()=>{
    console.log("8080");
})


