const express = require('express');
const router = express.Router();

// middleware
const auth = require('../Middleware/auth');

// models (schemas)
const Notes = require('../models/Notes');


// // Express validation
const { body ,  validationResult  } = require("express-validator");
const {CREATE_NOTES_ExpressValidation } = require('./../validators/validation')


router.put('/:noteId', auth, CREATE_NOTES_ExpressValidation, async (req, res) => {
   
          // express validation errors
          const errors = validationResult(req);
          if(!errors.isEmpty()){
              return res.status(400).json({errors:errors.array()})
          }
   
    const id = req.params.noteId;

    const { title, description } = req.body;
    const newNotes = {
        title: title,
        description: description,
        userId: req.userId
    }

    try {
        const updateNote = await Notes.findByIdAndUpdate(id , newNotes,{new:true})
        res.json({ updateNote , success:true }).status(200);
        console.log("update note success")

    } catch (error) {
        console.error(error)
        res.status(500).json({ massage: "update notes Error" })
    }


})



module.exports = router;