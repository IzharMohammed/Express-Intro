const { Router } = require("express");
const jwtPassword = 'secret';
const zod = require('zod');
const jwt = require('jsonwebtoken');
const userMiddleware = require('../../dist/Middlewares/user')
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

    } else {
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
    if (username) {
        token = jwt.sign({ username }, jwtPassword);
    } else {
        res.status(404).json('User not found');
    }

    res.json({
        token: token
    })
});


router.post('/addTodos', userMiddleware, async (req, res) => {
    const token = req.headers.token;
    const data = jwt.decode(token);
    console.log(data);

    const getUserId = await prisma.user.findFirst({
        where: {
            username: data.username
        },
        select: {
            id: true
        }
    })
    console.log('Id', getUserId);

    const { title, description, done } = req.body;
    console.log('title', title);

    await prisma.todos.create({
        data: {
            title,
            description,
            done,
            user_Id: getUserId.id
        }
    })
    res.json({
        msg: 'Todo added successfully !!!'
    })
});

router.get('/getTodos', (req, res) => {

});

module.exports = router;