const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middlewares/admin');
const { Admin, Course } = require('../db');

// Admin Routes
// Implement admin signup logic
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Method - 1 (Async,await syntax)
    await Admin.create({
        username,
        password
    })

    res.json({
        message: 'Admin created successfully'
    })

    /*
    // Method - 2 (Promise based syntax)
         Admin.create({
        username,
        password
    }).then(
        res.json({
            message: 'Admin created successfully'
        })
    )
    */

})

// Implement course creation logic
router.post('/courses', adminMiddleware, async (req, res) => {
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
})

// Implement fetching all courses logic
router.get('/courses', adminMiddleware, async (req, res) => {
    const response = await Course.find({});
    res.json({
        courses: response
    })
})

module.exports = router;