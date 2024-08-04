"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const jwtPassword = 'secret';
const zod = require('zod');
const jwt = require('jsonwebtoken');
const userMiddleware = require('../../dist/Middlewares/user');
const { PrismaClient } = require("@prisma/client");
const router = Router();
const prisma = new PrismaClient();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstName, lastName } = req.body;
    const emailSchema = zod.string().email();
    const passwordSchema = zod.string().min(6);
    const emailResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);
    if (!emailResponse.success) {
        return res.json({
            msg: 'Invalid username'
        });
    }
    if (!passwordResponse.success) {
        return res.json({
            msg: 'Minimum 6 letters in password'
        });
    }
    const response = yield prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        }
    });
    res.json({
        msg: `user successfully created`
    });
}));
router.post('/signin', (req, res) => {
    const username = req.body.username;
    //const response = from prisma
    let token = null;
    if (username) {
        token = jwt.sign({ username }, jwtPassword);
    }
    else {
        res.status(404).json('User not found');
    }
    res.json({
        token: token
    });
});
function getId(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = jwt.decode(token);
        const getUserId = yield prisma.user.findFirst({
            where: {
                username: data.username
            },
            select: {
                id: true
            }
        });
        return getUserId.id;
    });
}
router.post('/addTodos', userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    const getUserId = yield getId(token);
    const { title, description, done } = req.body;
    yield prisma.todos.create({
        data: {
            title,
            description,
            done,
            user_Id: getUserId
        }
    });
    res.json({
        msg: 'Todo added successfully !!!'
    });
}));
router.get('/getTodos', userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    const getUserId = yield getId(token);
    const todos = yield prisma.todos.findMany({
        where: {
            user_Id: getUserId
        }
    });
    res.json({
        Todos: todos
    });
}));
module.exports = router;
