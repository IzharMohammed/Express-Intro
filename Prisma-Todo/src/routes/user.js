const { Router } = require("express");
const jwtPassword = 'secret';
const zod = require('zod');
const jwt = require('jsonwebtoken');
//const userMiddleware = require('../Middlewares/user');
const { PrismaClient } = require("@prisma/client");
const router = Router();
const prisma = new PrismaClient();

router.post('/signup', async (req, res) => {
    const { username, password, firstName, lastName } = req.body;
    
    const emailSchema = zod.string().email();
    const passwordSchema = zod.string().min(6);

    const emailResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

    if (emailResponse.success && passwordResponse.success) {
        const res = await prisma.user.create({
            data: {
                username,
                password,
                firstName,
                lastName
            }
        })
        console.log(res);

    }else{
        console.log('something went wrong');
        
    }

    res.json({
        msg: `user successfully created`
    })

});

router.post('/signin', (req, res) => {
    const username = req.body.username;
    //const response = from prisma
    let token = null;
    if (resonse) {
        token = jwt.sign({ username }, jwtPassword);
    } else {
        res.status(404).json('User not found');
    }

    res.json({
        token: token
    })
});


router.post('/addTodos',async (req, res) => {
const {title , description , done} = req.body;
        await prisma.todos.create({
            title,
            description,
            done
        })
});

router.get('/getTodos', (req, res) => {

});

module.exports = router;