const express = require('express');
const router = express.Router();

// middleware
const auth = require('../Middleware/auth');
// // models (schemas)
const Notes = require('../models/Notes');


// // Express validation
const { body ,  validationResult  } = require("express-validator");
const {CREATE_NOTES_ExpressValidation } = require('./../validators/validation')


router.post('/', auth, CREATE_NOTES_ExpressValidation ,async (req, res) => {

      // express validation errors
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()})
      }


    console.log(`user Id : ${req.userId}`)
    

    const { title, description } = req.body;
    const newNotes = new Notes();
    newNotes.title = title,
    newNotes.description = description,
    newNotes.userId  = req.userId

    try {
        const createNotes = await newNotes.save();
        res.json({createNotes , success:true , message:"Created Note Success"}).status(201);
        console.log("create note success")


    } catch (error) {
        console.error(error)
        res.status(500).json({ success:false ,massage: "creating note Error" })
    }
})



module.exports = router;