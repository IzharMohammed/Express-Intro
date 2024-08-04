"use strict";
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
// interface AuthenticatedRequest {
//         token : string;
// }
function userMiddleware(req, res, next) {
    try {
        const token = req.headers.token;
        console.log('Token',token);
        
        const response = jwt.verify(token, jwtPassword);
        console.log('token response', response);
        
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
