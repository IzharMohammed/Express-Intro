const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middlewares/admin');

// Admin Routes
// Implement admin signup logic
router.post('/signup', (req, res) => {

})

// Implement course creation logic
router.post('/courses', adminMiddleware, (req, res) => {

})

// Implement fetching all courses logic
router.get('/courses', adminMiddleware, (req, res) => {

})

module.exports = router;