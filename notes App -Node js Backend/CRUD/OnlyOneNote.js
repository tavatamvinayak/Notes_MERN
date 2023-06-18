const express = require('express');
const router = express.Router();

// middleware
const auth = require('../Middleware/auth');

// models (schemas)
const Notes = require('../models/Notes');


router.get('/:noteId', auth, async (req, res) => {
    const id = req.params.noteId;

    try {
        const onlyOneNote = await Notes.findById(id)
        res.json({ onlyOneNote , success:true }).status(200);
        console.log("onlyOneNote note success")

    } catch (error) {
        console.error(error)
        res.status(500).json({ massage: "onlyOneNote notes Error" })
    }
})

module.exports = router;