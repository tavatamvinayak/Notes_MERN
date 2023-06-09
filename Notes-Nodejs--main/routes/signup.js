const express = require('express');
const router = express.Router();

// // env access
require('dotenv').config()

// // bcrypt password
const bcrypt = require('bcryptjs');

/// Jwt
const jwt = require('jsonwebtoken');

// /// Schema
const Users = require('../models/User')

// // express validation 
const { body, validationResult } = require("express-validator");
const { SIGNUP_ExpressValidation } = require('./../validators/validation')

router.post('/', SIGNUP_ExpressValidation, async (req, res) => {

    // express validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }



    const { Fname, Email, Password } = req.body;

    const SignUp = new Users();
    SignUp.Fname = Fname;
    SignUp.Email = Email;

    try {
        // /// bcrypt password save database  
        //bcryptJS require line :4
        const salt = bcrypt.genSaltSync(10);
        const hash_Password = bcrypt.hashSync(Password, salt);// // password encrypt  

        console.log("🚀 bcryptJS_password:", hash_Password)

        SignUp.Password = hash_Password;

        // /// Find a Email Already signup Check ( Already exist Or Not)
        const FindEmail = await Users.findOne({ Email: Email })
        console.log(`Find Email ${FindEmail}`)

        if (!FindEmail) {
            const SaveData = await SignUp.save(); // save data in database

            // // JWT
            const Token = jwt.sign({ Email: SaveData.Email, id: SaveData._id }, process.env.TOKEN_SCRETE_KEY);

            res.status(201).json({ success: true, message:"Create successfully", user: {Email : SaveData.Email}, token: Token })
            console.log({ user: SaveData, token: Token })


        } else {
            // // user Already Created & Existed then user directly login
            const Compare_Password = bcrypt.compareSync(Password, FindEmail.Password);
            if (Compare_Password) {
                console.log("Login success & password is corrected")
            
                // // JWT
                const Token = jwt.sign({ Email: FindEmail.Email, id: FindEmail._id }, process.env.TOKEN_SCRETE_KEY);
                console.log(Token)
                res.json({ success: true , message:"user Already Created & existed then  user directly login" ,user: {Email : FindEmail.Email}, token: Token })
            } else {
                console.log("Email & Password invalid")
                res.json({success : false , errors :'Email &  Password invalid'}).status(401)
            }
       }


    } catch (error) {
        console.error(error)
        res.send("something wrong")
    }



})

module.exports = router;