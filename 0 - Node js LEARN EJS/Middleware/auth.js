const jwt = require('jsonwebtoken');


// // env access
require('dotenv').config()


const auth = async (req, res, next) => {
    try {

        let Token = req.headers.authorization; // // add  Headers in Athorization = value : bearer (bearer and token space is IMP )Token 
        if (Token) {
            Token = Token.split(" ")[1]
            let user = jwt.verify(Token, process.env.TOKEN_SCRETE_KEY) // // Token = user data 
            req.userId = user.id; /// signup & login  line : 52 & 55  user.id
            console.log("token verify success middleware")
        }
        else {
            return res.status(401).json({ message: "unauthorized User OR middleware error" })
        }
        next();

    } catch (error) {

        // console.error(error)
        setTimeout(() => {
            console.log("  client logout || error is client JWT TOKEN removed and pages refesh   ")
        }, 4000)
        res.status(401).json({ message: "error User" })
    }
}

module.exports = auth;