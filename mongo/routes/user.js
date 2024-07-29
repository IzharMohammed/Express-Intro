const express = require('express');
const router = express.Router();
const userMiddleware = require('../middlewares/user');
const { User, Course } = require('../db');

// User Routes
// Implement user signup logic
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
        username,
        password
    })

    res.json({
        message: 'User created successfully'
    })

    /*    
        // Method - 2
        User.create({
            username,
            password
        }).then(
            res.json({
                message: 'user created successfully'
            })
        ) */

})

// Implement listing all courses logic
router.get('/courses', async (req, res) => {
    const response = await Course.find({});

    res.json({
        course: response
    })
})

// Implement course purchase logic
router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const id = req.params.courseId;
    const username = req.headers.username;
    await User.updateOne(
        { username },
        {
            $push: {
                courseTaken: id
            }
        }
    )

    res.json({
        msg: `Course purchased by ${username}`
    })
})

// Implement fetching purchased courses logic
router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    //  jo bhi username hai uske andar ke courseTaken ko populate krna hai 
    const response = await User.findOne({ username: req.headers.username })
    console.log('courses', response.courseTaken);
            const course = await  Course.find({_id : response.courseTaken});
            console.log(course);
    res.json({
        course
    })

})

module.exports = router;