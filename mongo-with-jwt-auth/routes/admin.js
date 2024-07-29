const { Router } = require("express");
const adminMiddleware = require('../middlewares/admin');
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require('jsonwebtoken');
const jwtPassword = 'secret'

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username,
        password
    })

    res.json({
        msg: 'Admin created successfully !!!'
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const response = await Admin.findOne({ username });
    let token = null;
    if (response) {
        token = jwt.sign({
            username
        }, jwtPassword);
    } else {
        res.status(404).json({
            msg: 'User not found'
        })
    }
    console.log(response);


    res.json({
        token: token
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink,
    })

    res.json(
        { message: 'Course created successfully', courseId: newCourse._id }
    )
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
  const response = courses = await Course.find({});
console.log(response);
  res.json({
    courses : response
  })
});

module.exports = router;