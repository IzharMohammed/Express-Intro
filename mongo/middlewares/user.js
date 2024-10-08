const { User } = require("../db");

function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    User.findOne({
        username,
        password
    }).then(function (value) {
        if (value) {
            next();
        } else {
            res.status(403).json({
                msg: 'user not found'
            })
        }
    })
}

module.exports = userMiddleware;