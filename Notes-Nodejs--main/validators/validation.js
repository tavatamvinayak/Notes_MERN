// // express validation 
const { body ,  validationResult  } = require("express-validator");



const SIGNUP_ExpressValidation = [
    body('Fname' , 'Enter a valid Full Name').isLength({min:5}),
    body('Email' , 'Enter a valid Email').isEmail(),
    body('Password' , 'Password must be atleast 8 character').isLength({min:8}),
]

const LOGIN_ExpressValidation = [
    body('Email' , 'Enter a valid Email').isEmail(),
    body('Password' , 'Password must be atleast 8 character').isLength({min:8}),
]

const CREATE_NOTES_ExpressValidation =[
    body('title' , 'Enter a valid title ').isLength({min:5}),
    body('description' , 'Enter a valid description ').isLength({min:5}),
]

module.exports = {SIGNUP_ExpressValidation , LOGIN_ExpressValidation ,CREATE_NOTES_ExpressValidation }