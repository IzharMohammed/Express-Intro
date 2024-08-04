const jwt = require("jsonwebtoken");
const jwtPassword = process.env.jwtPassword;
import { Request, Response, NextFunction } from 'express';


function userMiddleware(req : Request, res : Response, next : NextFunction) {
    try {
        const token = req.headers.token ;
        console.log('token',token);
        
        if (!token) {
            return res.status(401).json({
                msg: 'No token provided'
            });
        }
        const response = jwt.verify(token, jwtPassword);
        if(response){
            next();
    }
    } catch (error) {
        res.status(500).json({
            msg: 'Invalid token'
        })
    }
}

module.exports = userMiddleware;