const express = require('express');
const router = express.Router();

// // env access
require('dotenv').config()

// // bcrypt password
const bcrypt = require('bcryptjs');

/// Jwt
const jwt = require('jsonwebtoken');

// /// Schema
const Users = require('../models/User');

// // express validation 
const { body, validationResult } = require("express-validator");
const { LOGIN_ExpressValidation } = require('./../validators/validation')


router.post('/', LOGIN_ExpressValidation, async (req, res) => {

    // express validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const Logins = new Users();
    // request body login
    const { Email, Password } = req.body
    Logins.Email = Email;
    Logins.Password = Password;

    try {
        /// /// Email checks Exist or Not
        const FindEmail = await Users.findOne({ Email: Email })

        // // Exist or Not Email
        if (FindEmail != null) {  // req.body Email

            /// /// bcryptJS Password
            // Load hash from your password DB.
            const Compare_Password = bcrypt.compareSync(Password, FindEmail.Password);
            if (Compare_Password) {
                console.log("Login success & password is corrected")

                // // JWT
                const Token = jwt.sign({id: FindEmail._id ,Email: FindEmail.Email }, process.env.TOKEN_SCRETE_KEY);
                console.log(`Login token : ${Token} `)
                res.json({ success: true, user: { Email: FindEmail.Email }, token: Token })


            } else {
                console.log("PassWord invalid")
                res.json({ success: false, errors: 'Email &  Password invalid', Password: 'Password invalid' }).status(401)
            }

        } else {
            console.log("Email invalid ")
            res.json({ success: false, errors: 'Email &  Password invalid', Email: "Email invalid" }).status(401)
        }

    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


module.exports = router;
