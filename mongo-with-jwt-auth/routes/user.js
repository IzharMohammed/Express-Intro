const { Router } = require("express");
const router = Router();
const userMiddleware = require('../middlewares/user');
const { User, Course } = require("../db");
const jwt = require('jsonwebtoken');
const jwtPassword = 'secret'
// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username,
        password
    })

    res.json({
        msg: 'User created successfully !!!'
    })
});

router.post('/signin', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const response = await User.findOne({ username });
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

    res.json({
        token: token
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const token = req.headers.token;
    const decoded = jwt.decode(token);
    const username = decoded.username;
    const response = await Course.find({ _id: courseId });
    console.log(response);
    console.log('decoded', decoded);
    await User.updateOne(
        { username },
        { $push: { courseTaken: courseId } }
    )

    res.json({
        msg: `Course purchased successfully !!!`
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const token = req.headers.token;
    const decoded = jwt.decode(token);
    const username = decoded.username;
    const response = await User.findOne({ username });
    const courses = await Course.find({ _id: response.courseTaken })
    console.log(courses);
    res.json({
        coursesTaken: courses
    })

});

module.exports = router;