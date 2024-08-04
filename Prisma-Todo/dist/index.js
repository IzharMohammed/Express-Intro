"use strict";
const express = require('express');
const userRouter = require('./routes/user');
const bodyParser = require('body-parser');
const app = express();
// app.use(express.json());
app.use(bodyParser.json());
app.use('/user', userRouter);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is up on ${PORT}`);
});
