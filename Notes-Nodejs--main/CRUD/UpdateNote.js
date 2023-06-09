const express = require('express');
const router = express.Router();

// middleware
const auth = require('../Middleware/auth');

// models (schemas)
const Notes = require('../models/Notes');



router.put('/:noteId', auth, async (req, res) => {
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