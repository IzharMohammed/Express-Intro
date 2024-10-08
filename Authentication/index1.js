const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL);

const User = mongoose.model('Users',
    {
        name: String,
        email: String,
        password: String
    });

app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const existingUser = await User.findOne({ email: username });
    if (existingUser) {
        return res.status(400).send('username already exists');
    }
    const user = new User({
        name: 'izhar',
        email: 'izhar@test.com',
        password: '123'
    })
    user.save();
    user.json({
        msg: 'user successfully created !!!'
    })

})

