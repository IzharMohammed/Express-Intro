const express = require('express');
const router = express.Router();
const userMiddleware = require('../middlewares/user');

// User Routes
// Implement user signup logic
router.post('/signup', (req, res) => {

})

// Implement listing all courses logic
router.get('/courses', (req, res) => {

})

// Implement course purchase logic
router.post('/courses/:courseId', userMiddleware, (req, res) => {

})

// Implement fetching purchased courses logic
router.get('/purchasedCourses', userMiddleware, (req, res) => {

})

module.exports = router;