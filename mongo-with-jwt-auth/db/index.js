const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://izharmohammed21:nqyh0LyUHN7GXxKZ@cluster0.jywwa6q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/course_app_jwt');

const AdminSchema = mongoose.Schema({
    username: String,
    password: String
})

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    courseTaken: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const CourseSchema = mongoose.Schema({
    title: String,
    description: String,
    price: String,
    imageLink: String,
})

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}