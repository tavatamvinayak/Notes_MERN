const express = require('express');
const router = express.Router();

// middleware
const auth = require('../Middleware/auth');

// models (schemas)
const Notes = require('../models/Notes');

router.delete('/:noteId', auth, async (req, res) => {
    const id = req.params.noteId;

    try {
        const RemoveNotes = await Notes.findByIdAndRemove(id)
        res.status(202).json(RemoveNotes);
        console.log("removed notes")

    } catch (error) {
        console.error(error)
        res.status(500).json({ massage: "remove notes Error" })
    }

})



module.exports = router;