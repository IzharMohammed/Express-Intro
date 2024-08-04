const { Router } = require("express");
const jwtPassword = 'secret';
const zod = require('zod');
const jwt = require('jsonwebtoken');
const userMiddleware = require('../../dist/Middlewares/user')
const { PrismaClient } = require("@prisma/client");
const router = Router();
const prisma = new PrismaClient();
import { Request, Response } from 'express';


router.post('/signup', async (req : Request, res : Response) => {
    const { username, password, firstName, lastName } = req.body;

    const emailSchema = zod.string().email();
    const passwordSchema = zod.string().min(6);

    const emailResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);
    if (!emailResponse.success) {
        return res.json({
            msg: 'Invalid username'
        })
    }
    if (!passwordResponse.success) {
        return res.json({
            msg: 'Minimum 6 letters in password'
        })
    }
    const response = await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        }
    })



    res.json({
        msg: `user successfully created`
    })

});

router.post('/signin', (req : Request, res : Response) => {
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

async function getId(token: string) : Promise<number> {
    const data = jwt.decode(token);

    const getUserId = await prisma.user.findFirst({
        where: {
            username: data.username
        },
        select: {
            id: true
        }
    })
    return getUserId.id;
}

router.post('/addTodos', userMiddleware, async (req : Request, res : Response) => {

    const token = req.headers.token as string | undefined;
    if(!token){
        return res.status(401).json({msg : 'No token provided'})
    }

    const getUserId = await getId(token);
    const { title, description, done } = req.body;

    await prisma.todos.create({
        data: {
            title,
            description,
            done,
            user_Id: getUserId
        }
    })
    res.json({
        msg: 'Todo added successfully !!!'
    })
});

router.get('/getTodos', userMiddleware, async (req: Request , res : Response) => {
    const token = req.headers.token as string | undefined;
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    const getUserId = await getId(token);
    const todos = await prisma.todos.findMany({
        where: {
            user_Id: getUserId
        }
    });
    res.json({
        Todos: todos
    })
});

module.exports = router;