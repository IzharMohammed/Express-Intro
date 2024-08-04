const jwt = require("jsonwebtoken");
const jwtPassword = "secret";

// interface AuthenticatedRequest {
//         token : string;
// }

function userMiddleware(req : any, res : any, next : any) {
    try {
        const token = req.body.token ;
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