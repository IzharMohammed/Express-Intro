"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
function userMiddleware(req, res, next) {
    try {
        const token = req.headers.token;
        console.log('token', token);
        if (!token) {
            return res.status(401).json({
                msg: 'No token provided'
            });
        }
        const response = jwt.verify(token, jwtPassword);
        if (response) {
            next();
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Invalid token'
        });
    }
}
module.exports = userMiddleware;
