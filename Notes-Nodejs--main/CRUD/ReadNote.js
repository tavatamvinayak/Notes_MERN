const express = require('express');
const router = express.Router();

// middleware
const auth = require('../Middleware/auth');

// models (schemas)
const Notes = require('../models/Notes');

router.get('/',auth ,async(req,res)=>{
    try {
        const notes = await Notes.find({userId : req.userId});
        res.status(200).json(notes)
        console.log("read notes success")
        
    } catch (error) {
        console.error(error)
        res.status(500).json({massage : "creating notes Error"})
    }
})



module.exports = router;