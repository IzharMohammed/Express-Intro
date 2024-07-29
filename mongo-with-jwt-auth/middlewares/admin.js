const zod = require('zod');
const jwt = require('jsonwebtoken');
const jwtPassword = 'secret'
function adminMiddleware() {
    const username = req.body.username;
    const password = req.body.password;
    const usernameSchema = zod.string().email();
    const passwordSchema = zod.string().min(4);
    const usernameResponse = usernameSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);
    if (usernameResponse.success && passwordResponse.success) {
        const token = jwt.sign({
            username
        }, jwtPassword);
        req.token = token
    }

}

module.exports = adminMiddleware;