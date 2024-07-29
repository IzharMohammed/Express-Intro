const jwt = require('jsonwebtoken');
const jwtPassword = 'secret'
function adminMiddleware(req, res, next) {

    try {
        const token = req.headers.token;
        const response = jwt.verify(token, jwtPassword);
        if (response) {
            next();
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Invalid token'
        })
    }

}

module.exports = adminMiddleware;