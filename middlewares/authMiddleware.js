const Cliente = require("../models/clienteModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.cliente = await Cliente.findById(decoded.id).select('-password') // assuming 'id' in token's payload
        // you might want to exclude password and other sensitive info

        if (!req.cliente) throw new Error('Not authorized, no user found with this id')
        next() 
    } else {
        res.status(401)
        throw new Error("Not authorized, no token")
    }   
})

module.exports = { authMiddleware }